import { BaseLayout, Footer } from "@/components/ui";

export type LogoutLayoutProps = {
  children: React.ReactNode;
};

export const LogoutLayout = ({ children }: Readonly<LogoutLayoutProps>) => {
  return (
    <BaseLayout>
      {children}
      <Footer />
    </BaseLayout>
  );
};
