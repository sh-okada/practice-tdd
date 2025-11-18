import { CircularProgress, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ui";
import { queryConfig } from "@/libs/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Readonly<AppProviderProps>) => {
  const [queryClient] = React.useState(() => new QueryClient(queryConfig));

  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<CircularProgress aria-label="読み込み中" />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
};
