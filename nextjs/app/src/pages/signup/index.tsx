import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useErrorBoundary } from "react-error-boundary";
import { signup } from "@/api/auth";
import { AuthProvider } from "@/components/providers";
import { LogoutLayout, SignupForm } from "@/components/ui";
import { paths } from "@/configs";
import type { SignupFormData } from "@/libs/rhf";
import { isConflictError } from "../../libs/axios";

export default function SignupPage() {
  const router = useRouter();
  const { showBoundary } = useErrorBoundary();
  const { mutateAsync, data: formStatus } = useMutation({
    mutationFn: async (formData: SignupFormData) =>
      await signup(formData)
        .then(() => {
          router.push(paths.login.getHref());
          return undefined;
        })
        .catch((error) => {
          if (isConflictError(error)) {
            return {
              isError: true,
              message: "名前は既に使われています",
            };
          }

          showBoundary(error);
        }),
  });

  return (
    <AuthProvider>
      {(isAuthed) =>
        isAuthed ? (
          router.replace(paths.home.getHref())
        ) : (
          <LogoutLayout>
            <SignupForm
              formStatus={formStatus}
              onSubmit={async (formData: SignupFormData) => {
                await mutateAsync(formData);
              }}
            />
          </LogoutLayout>
        )
      }
    </AuthProvider>
  );
}
