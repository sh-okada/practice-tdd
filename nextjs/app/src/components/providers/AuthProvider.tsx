import type React from "react";
import { useEffect, useState } from "react";
import { getMe } from "@/api/users";

export type AuthProviderProps = {
  children: (isAuthed: boolean) => React.ReactNode;
};

export const AuthProvider = ({ children }: Readonly<AuthProviderProps>) => {
  const [isAuthed, setIsAuthed] = useState<boolean>();

  useEffect(() => {
    getMe()
      .then(() => {
        setIsAuthed(true);
      })
      .catch(() => {
        setIsAuthed(false);
      });
  }, []);

  if (typeof isAuthed === "undefined") {
    return null;
  }

  return <>{children(isAuthed)}</>;
};
