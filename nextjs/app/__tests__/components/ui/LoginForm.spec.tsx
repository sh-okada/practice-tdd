import userEvent from "@testing-library/user-event";
import { LoginForm, type LoginFormData } from "@/components/ui";
import { renderApp } from "@/libs/rtl";

describe("入力された値でクリックイベントを実行する", () => {
  let expected: LoginFormData;

  const renderComponent = () =>
    renderApp(
      <LoginForm
        onClick={(formData) => {
          expected = formData;
        }}
      />,
    );

  test("入力されたメールアドレスでクリックイベントが実行されること", async () => {
    const { findByLabelText, findByText } = renderComponent();

    const emailField = await findByLabelText("メールアドレス");
    await userEvent.type(emailField, "hoge@example.com");

    const loginButton = await findByText("ログイン");
    await userEvent.click(loginButton);

    expect(expected).toStrictEqual({
      email: "hoge@example.com",
      password: "",
    });
  });

  test("入力されたパスワードでクリックイベントが実行されること", async () => {
    const { findByLabelText, findByText } = renderComponent();

    const passwordField = await findByLabelText("パスワード");
    await userEvent.type(passwordField, "password");

    const loginButton = await findByText("ログイン");
    await userEvent.click(loginButton);

    expect(expected).toStrictEqual({
      email: "",
      password: "password",
    });
  });
});

describe("フォームステータスによるメッセージ表示", () => {
  describe("フォームステータスが正常の場合", () => {
    test("エラーメッセージが表示されないこと", () => {
      const { queryByTestId } = renderApp(
        <LoginForm formStatus={{ isError: false }} onClick={(_) => {}} />,
      );

      const formStatusMessage = queryByTestId("form-status-message");
      expect(formStatusMessage).toBeNull();
    });
  });

  describe("フォームステータスがエラーの場合", () => {
    test("エラーメッセージが表示されること", async () => {
      const { findByTestId } = renderApp(
        <LoginForm
          formStatus={{
            isError: true,
            message: "メールアドレスまたはパスワードが間違っています",
          }}
          onClick={(_) => {}}
        />,
      );

      const formStatusMessage = await findByTestId("form-status-message");
      expect(formStatusMessage).toHaveTextContent(
        "メールアドレスまたはパスワードが間違っています",
      );
    });
  });

  describe("それ以外の場合", () => {
    test("エラーメッセージが表示されないこと", () => {
      const { queryByTestId } = renderApp(<LoginForm onClick={(_) => {}} />);

      const formStatusMessage = queryByTestId("form-status-message");
      expect(formStatusMessage).toBeNull();
    });
  });
});
