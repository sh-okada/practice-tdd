import { fireEvent } from "@testing-library/react";
import { PasswordField } from "@/components/ui/PasswordField";
import { renderApp } from "@/libs/rtl";

describe("目のアイコンでパスワードの表示・非表示を切り替える", () => {
  const renderComponent = () =>
    renderApp(<PasswordField value="password" label="パスワード" />);

  describe("パスワードを非表示にしている場合", () => {
    test("目のアイコンをクリックするとパスワードが表示されること", async () => {
      const { findByLabelText } = renderComponent();

      const showPasswordIconButton = await findByLabelText(
        "パスワードを表示する",
      );
      fireEvent.click(showPasswordIconButton);

      const passwordField = await findByLabelText("パスワード");
      expect(passwordField).toHaveAttribute("type", "text");
    });
  });

  describe("パスワードを表示している場合", () => {
    test("目のアイコンをクリックするとパスワードが非表示になること", async () => {
      const { findByLabelText } = renderComponent();

      const showPasswordIconButton = await findByLabelText(
        "パスワードを表示する",
      );
      fireEvent.click(showPasswordIconButton);

      const hidePasswordIconButton = await findByLabelText(
        "パスワードを非表示にする",
      );
      fireEvent.click(hidePasswordIconButton);

      const passwordField = await findByLabelText("パスワード");
      expect(passwordField).toHaveAttribute("type", "password");
    });
  });
});
