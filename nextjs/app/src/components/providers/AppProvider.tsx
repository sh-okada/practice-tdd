import { CircularProgress, CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ui";
import { getQueryClient } from "@/libs/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Readonly<AppProviderProps>) => {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={getQueryClient()}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<CircularProgress aria-label="読み込み中" />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
};
