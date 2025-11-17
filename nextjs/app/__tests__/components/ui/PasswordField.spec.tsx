import userEvent from "@testing-library/user-event";
import { PasswordField } from "@/components/ui/PasswordField";
import { renderApp } from "@/libs/rtl";

describe("ボタンをクリックによるパスワードの表示・非表示を切り替え", () => {
  const renderComponent = () =>
    renderApp(<PasswordField value="password" label="パスワード" />);

  describe("ボタンをクリックした場合", () => {
    test("パスワードが表示されること", async () => {
      const { findByLabelText } = renderComponent();

      const showPasswordIconButton = await findByLabelText(
        "パスワードを表示する",
      );
      await userEvent.click(showPasswordIconButton);

      const passwordField = await findByLabelText("パスワード");
      expect(passwordField).toHaveAttribute("type", "text");
    });
  });

  describe("ボタンを2回クリックした場合", () => {
    test("パスワードが非表示になること", async () => {
      const { findByLabelText } = renderComponent();

      const showPasswordIconButton = await findByLabelText(
        "パスワードを表示する",
      );
      await userEvent.click(showPasswordIconButton);

      const hidePasswordIconButton = await findByLabelText(
        "パスワードを非表示にする",
      );
      await userEvent.click(hidePasswordIconButton);

      const passwordField = await findByLabelText("パスワード");
      expect(passwordField).toHaveAttribute("type", "password");
    });
  });
});
