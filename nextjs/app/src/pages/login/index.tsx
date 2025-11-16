import { useRouter } from "next/router";
import { AuthProvider } from "@/components/providers";

export default function LoginPage() {
  const router = useRouter();

  return (
    <AuthProvider>
      {(isAuthed) => (isAuthed ? router.replace("/") : <>aaa</>)}
    </AuthProvider>
  );
}
