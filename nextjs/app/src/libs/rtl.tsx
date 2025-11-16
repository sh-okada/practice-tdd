import { render } from "@testing-library/react";
import { AppProvider } from "@/components/providers";

export const renderApp = (ui: React.ReactNode) =>
  render(ui, {
    wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
  });
