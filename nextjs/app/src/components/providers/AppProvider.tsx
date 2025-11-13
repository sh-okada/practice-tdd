import { CssBaseline } from "@mui/material";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Readonly<AppProviderProps>) => {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
};
