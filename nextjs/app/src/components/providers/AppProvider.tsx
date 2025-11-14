import { CircularProgress, CssBaseline, Typography } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "@/libs/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Readonly<AppProviderProps>) => {
  return (
    <>
      <CssBaseline />
      <ErrorBoundary
        fallback={<Typography>予期しないエラーが発生しました。</Typography>}
      >
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<CircularProgress aria-label="読み込み中" />}>
            {children}
          </Suspense>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
};
