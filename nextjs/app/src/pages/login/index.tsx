import { useRouter } from "next/router";
import { AuthProvider } from "@/components/providers";
import { paths } from "@/configs";

export default function LoginPage() {
  const router = useRouter();

  return (
    <AuthProvider>
      {(isAuthed) => (isAuthed ? router.replace(paths.home.getHref()) : <></>)}
    </AuthProvider>
  );
}
