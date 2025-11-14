import { fireEvent, render, screen } from "@testing-library/react";
import { PasswordField } from "@/components/ui/PasswordField";

describe("目のアイコンでパスワードの表示・非表示を切り替える", () => {
  const renderComponent = () =>
    render(<PasswordField value="password" label="パスワード" />);

  describe("パスワードを非表示にしている場合", () => {
    test("目のアイコンをクリックするとパスワードが表示されること", async () => {
      renderComponent();

      const showPasswordIconButton = await screen.findByLabelText(
        "パスワードを表示する",
      );
      fireEvent.click(showPasswordIconButton);

      const passwordField = await screen.findByLabelText("パスワード");
      expect(passwordField).toHaveAttribute("type", "text");
    });
  });

  describe("パスワードを表示している場合", () => {
    test("目のアイコンをクリックするとパスワードが非表示になること", async () => {
      renderComponent();

      const showPasswordIconButton = await screen.findByLabelText(
        "パスワードを表示する",
      );
      fireEvent.click(showPasswordIconButton);

      const hidePasswordIconButton = await screen.findByLabelText(
        "パスワードを非表示にする",
      );
      fireEvent.click(hidePasswordIconButton);

      const passwordField = await screen.findByLabelText("パスワード");
      expect(passwordField).toHaveAttribute("type", "password");
    });
  });
});
