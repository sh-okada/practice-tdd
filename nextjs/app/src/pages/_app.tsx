import type { AppProps } from "next/app";
import { AppProvider } from "@/components/providers";

export default function App({ Component, pageProps }: Readonly<AppProps>) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
