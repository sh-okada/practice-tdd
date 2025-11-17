import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { LoginForm, type LoginFormData } from "@/components/ui";
import { renderApp } from "@/libs/rtl";

describe("入力された値でクリックイベントを実行する", () => {
  let expected: LoginFormData;

  const renderComponent = () =>
    renderApp(
      <LoginForm
        onSubmit={(formData) => {
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

describe("フォームステータスによるエラーメッセージの表示", () => {
  describe("エラーの場合", () => {
    test("エラーメッセージが表示されること", async () => {
      const { findByTestId } = renderApp(
        <LoginForm
          formStatus={{
            isError: true,
            message: "メールアドレスまたはパスワードが間違っています",
          }}
          onSubmit={(_) => {}}
        />,
      );

      const formStatusMessage = await findByTestId("form-status-message");
      expect(formStatusMessage).toHaveTextContent(
        "メールアドレスまたはパスワードが間違っています",
      );
    });
  });

  describe("エラーでない場合", () => {
    test("エラーメッセージが表示されないこと", () => {
      const { queryByTestId } = renderApp(
        <LoginForm formStatus={{ isError: false }} onSubmit={(_) => {}} />,
      );

      const formStatusMessage = queryByTestId("form-status-message");
      expect(formStatusMessage).toBeNull();
    });
  });

  describe("それ以外の場合", () => {
    test("エラーメッセージが表示されないこと", () => {
      const { queryByTestId } = renderApp(<LoginForm onSubmit={(_) => {}} />);

      const formStatusMessage = queryByTestId("form-status-message");
      expect(formStatusMessage).toBeNull();
    });
  });
});

describe("サブミット中のログインボタンの活性・非活性", () => {
  const renderComponent = () =>
    renderApp(
      <LoginForm
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }}
      />,
    );

  describe("サブミット中の場合", () => {
    test("ログインボタンが非活性であること", async () => {
      const { findByText } = renderComponent();

      const loginButton = await findByText("ログイン");
      await userEvent.click(loginButton);

      expect(loginButton).toBeDisabled();
    });
  });

  describe("サブミット中でない場合", () => {
    test("ログインボタンが活性であること", async () => {
      const { findByText } = renderComponent();

      const loginButton = await findByText("ログイン");
      await userEvent.click(loginButton);

      await waitFor(() => {
        expect(loginButton).toBeEnabled();
      });
    });
  });
});
