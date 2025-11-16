import { useSuspenseQuery } from "@tanstack/react-query";
import type React from "react";
import { getMe } from "@/api/users";
import { isUnauthorizedError } from "@/libs/axios";

export type AuthProviderProps = {
  children: (isAuthed: boolean) => React.ReactNode;
};

export const AuthProvider = ({ children }: Readonly<AuthProviderProps>) => {
  const { data } = useSuspenseQuery({
    queryKey: ["/users/me"],
    queryFn: () =>
      getMe()
        .then(() => true)
        .catch((error) => {
          if (isUnauthorizedError(error)) {
            return false;
          }

          return Promise.reject(error);
        }),
  });

  return <>{children(data)}</>;
};
