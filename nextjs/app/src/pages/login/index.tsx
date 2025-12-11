import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useErrorBoundary } from "react-error-boundary";
import { login } from "@/api/auth";
import { AuthProvider } from "@/components/providers";
import { LoginForm, LogoutLayout } from "@/components/ui";
import { paths } from "@/configs";
import { isBadRequestError } from "@/libs/axios";
import type { LoginFormData } from "@/libs/rhf";

export default function LoginPage() {
  const router = useRouter();
  const { showBoundary } = useErrorBoundary();
  const { mutateAsync, data: formStatus } = useMutation({
    mutationFn: async (formData: LoginFormData) =>
      await login(formData)
        .then(() => {
          router.replace(paths.applicationList.getHref());
          return undefined;
        })
        .catch((error) => {
          if (isBadRequestError(error)) {
            return {
              isError: true,
              message: "メールアドレスまたはパスワードが間違っています",
            };
          }

          showBoundary(error);
        }),
  });

  return (
    <AuthProvider>
      {(isAuthed) =>
        isAuthed ? (
          router.replace(paths.applicationList.getHref())
        ) : (
          <LogoutLayout>
            <LoginForm
              formStatus={formStatus}
              onSubmit={async (formData) => await mutateAsync(formData)}
            />
          </LogoutLayout>
        )
      }
    </AuthProvider>
  );
}
