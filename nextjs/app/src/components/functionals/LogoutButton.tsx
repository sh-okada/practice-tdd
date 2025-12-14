import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useErrorBoundary } from "react-error-boundary";
import { logout } from "@/api/auth";
import { paths } from "@/configs";

export const LogoutButton = () => {
  const router = useRouter();
  const { showBoundary } = useErrorBoundary();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () =>
      await logout()
        .then(() => {
          router.replace(paths.login.getHref());
        })
        .catch((error) => {
          showBoundary(error);
        }),
  });

  return (
    <Button
      loading={isPending}
      onClick={async () => await mutateAsync()}
      variant="outlined"
    >
      ログアウト
    </Button>
  );
};
