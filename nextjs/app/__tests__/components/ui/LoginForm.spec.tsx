import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm, type LoginFormData } from "@/components/ui";

describe("ログインボタンをクリックすると入力された値でクリックイベントが実行される", () => {
  let expected: LoginFormData;
  beforeEach(() => {
    render(
      <LoginForm
        onClick={(formData) => {
          expected = formData;
        }}
      />,
    );
  });

  test("入力されたメールアドレスでクリックイベントが実行されること", () => {
    const emailField = screen.getByLabelText("メールアドレス");
    fireEvent.change(emailField, { target: { value: "hoge@example.com" } });

    const loginButton = screen.getByText("ログイン");
    fireEvent.click(loginButton);

    expect(expected).toStrictEqual({
      email: "hoge@example.com",
      password: "",
    });
  });

  test("入力されたパスワードでクリックイベントが実行されること", () => {
    const passwordField = screen.getByLabelText("パスワード");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const loginButton = screen.getByText("ログイン");
    fireEvent.click(loginButton);

    expect(expected).toStrictEqual({
      email: "",
      password: "password",
    });
  });
});

describe("フォームのステータスを受け取り、エラーメッセージを表示する", () => {
  describe("フォームステータスが正常の場合", () => {
    test("エラーメッセージが表示されないこと", () => {
      const { queryByTestId } = render(
        <LoginForm formStatus={{ isError: false }} onClick={(_) => {}} />,
      );

      const formStatusMessage = queryByTestId("form-status-message");
      expect(formStatusMessage).toBeNull();
    });
  });

  describe("フォームステータスがエラーの場合", () => {
    test("エラーメッセージが表示されること", () => {
      const { getByTestId } = render(
        <LoginForm
          formStatus={{
            isError: true,
            message: "メールアドレスまたはパスワードが間違っています",
          }}
          onClick={(_) => {}}
        />,
      );

      const formStatusMessage = getByTestId("form-status-message");
      expect(formStatusMessage).toHaveTextContent(
        "メールアドレスまたはパスワードが間違っています",
      );
    });
  });

  describe("それ以外の場合", () => {
    test("エラーメッセージが表示されないこと", () => {
      const { queryByTestId } = render(<LoginForm onClick={(_) => {}} />);

      const formStatusMessage = queryByTestId("form-status-message");
      expect(formStatusMessage).toBeNull();
    });
  });
});
