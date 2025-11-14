import { fireEvent, render } from "@testing-library/react";
import { LoginForm } from "@/components/ui/LoginForm";

test("ログインボタンをクリックするとフォームの値を返すこと", async () => {
  let expected = null;

  const { getByLabelText, getByText } = render(
    <LoginForm
      onClick={(formData) => {
        expected = formData;
      }}
    />,
  );

  const emailField = getByLabelText("メールアドレス");
  fireEvent.change(emailField, { target: { value: "hoge@example.com" } });

  const passwordField = getByLabelText("パスワード");
  fireEvent.change(passwordField, { target: { value: "password" } });

  const loginButton = getByText("ログイン");
  fireEvent.click(loginButton);

  expect(expected).toStrictEqual({
    email: "hoge@example.com",
    password: "password",
  });
});
