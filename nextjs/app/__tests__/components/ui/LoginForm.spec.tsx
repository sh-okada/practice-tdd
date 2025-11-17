import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/components/ui";
import type { LoginFormData } from "@/libs/rhf";
import { renderApp } from "@/libs/rtl";

describe("入力された値でクリックイベントを実行", () => {
  let expected: LoginFormData;

  const renderComponent = () =>
    renderApp(
      <LoginForm
        onSubmit={(formData) => {
          expected = formData;
        }}
      />,
    );

  describe("バリデーションエラーがある場合", () => {
    test("クリックイベントが実行されないこと", async () => {
      const { findByText } = renderComponent();

      const loginButton = await findByText("ログイン");
      await userEvent.click(loginButton);

      expect(expected).toBeUndefined();
    });
  });

  describe("バリデーションエラーがない場合", () => {
    test("クリックイベントが実行されること", async () => {
      const { findByLabelText, findByText } = renderComponent();

      const emailField = await findByLabelText("メールアドレス");
      await userEvent.type(emailField, "hoge@example.com");

      const passwordField = await findByLabelText("パスワード");
      await userEvent.type(passwordField, "password");

      const loginButton = await findByText("ログイン");
      await userEvent.click(loginButton);

      expect(expected).toStrictEqual({
        email: "hoge@example.com",
        password: "password",
      });
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
  let loginButton: HTMLElement;

  beforeEach(async () => {
    const { findByLabelText, findByText } = renderApp(
      <LoginForm
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }}
      />,
    );

    const emailField = await findByLabelText("メールアドレス");
    await userEvent.type(emailField, "hoge@example.com");

    const passwordField = await findByLabelText("パスワード");
    await userEvent.type(passwordField, "password");

    loginButton = await findByText("ログイン");
    await userEvent.click(loginButton);
  });

  describe("サブミット中の場合", () => {
    test("ログインボタンが非活性であること", async () => {
      expect(loginButton).toBeDisabled();
    });
  });

  describe("サブミット中でない場合", () => {
    test("ログインボタンが活性であること", async () => {
      await waitFor(() => {
        expect(loginButton).toBeEnabled();
      });
    });
  });
});

describe("メールアドレスのバリデーション（blur）", () => {
  describe("未入力の場合", () => {
    test("メッセージが表示されること", async () => {
      const { findByLabelText, findByText } = renderApp(
        <LoginForm onSubmit={() => {}} />,
      );

      const emailField = await findByLabelText("メールアドレス");
      await userEvent.click(emailField);
      await userEvent.tab();

      const message = await findByText("メールアドレスを入力してください");
      expect(message).toBeInTheDocument();
    });
  });

  describe("未入力でない場合", () => {
    test("メッセージが表示されないこと", async () => {
      const { findByLabelText, queryByText } = renderApp(
        <LoginForm onSubmit={() => {}} />,
      );

      const emailField = await findByLabelText("メールアドレス");
      await userEvent.type(emailField, "hoge@example.com");

      const message = queryByText("メールアドレスを入力してください");
      expect(message).toBeNull();
    });
  });
});

describe("パスワードのバリデーション（blur）", () => {
  describe("未入力の場合", () => {
    test("メッセージが表示されること", async () => {
      const { findByLabelText, findByText } = renderApp(
        <LoginForm onSubmit={() => {}} />,
      );

      const passwordField = await findByLabelText("パスワード");
      await userEvent.click(passwordField);
      await userEvent.tab();

      const message = await findByText("パスワードを入力してください");
      expect(message).toBeInTheDocument();
    });
  });

  describe("未入力でない場合", () => {
    test("メッセージが表示されないこと", async () => {
      const { findByLabelText, queryByText } = renderApp(
        <LoginForm onSubmit={() => {}} />,
      );

      const passwordField = await findByLabelText("パスワード");
      await userEvent.type(passwordField, "hoge@example.com");

      const message = queryByText("password");
      expect(message).toBeNull();
    });
  });
});
