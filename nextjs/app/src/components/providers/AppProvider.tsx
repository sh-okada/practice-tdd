import { CssBaseline, NoSsr } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ui";
import { Loading } from "@/components/ui/Loading";
import { queryConfig } from "@/libs/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Readonly<AppProviderProps>) => {
  const [queryClient] = React.useState(() => new QueryClient(queryConfig));

  return (
    <NoSsr>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </NoSsr>
  );
};
