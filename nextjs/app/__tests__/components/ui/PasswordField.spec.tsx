import { fireEvent, render } from "@testing-library/react";
import { PasswordField } from "@/components/ui/PasswordField";

describe("目のアイコンでパスワードの表示・非表示を切り替えられる", () => {
  describe("パスワードを非表示にしている場合", () => {
    test("目のアイコンをクリックするとパスワードが表示されること", () => {
      const { getByLabelText } = render(
        <PasswordField value="password" label="パスワード" />,
      );

      const showPasswordIconButton = getByLabelText("パスワードを表示する");
      fireEvent.click(showPasswordIconButton);

      const passwordField = getByLabelText("パスワード");
      expect(passwordField).toHaveAttribute("type", "text");
    });
  });

  describe("パスワードを表示している場合", () => {
    test("目のアイコンをクリックするとパスワードが非表示になること", () => {
      const { getByLabelText } = render(
        <PasswordField value="password" label="パスワード" />,
      );

      const showPasswordIconButton = getByLabelText("パスワードを表示する");
      fireEvent.click(showPasswordIconButton);

      const hidePasswordIconButton = getByLabelText("パスワードを非表示にする");
      fireEvent.click(hidePasswordIconButton);

      const passwordField = getByLabelText("パスワード");
      expect(passwordField).toHaveAttribute("type", "password");
    });
  });
});
