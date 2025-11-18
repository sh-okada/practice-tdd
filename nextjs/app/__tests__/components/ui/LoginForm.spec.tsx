import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/components/ui";
import type { LoginFormData } from "@/libs/rhf";
import { renderApp } from "@/libs/rtl";

describe("onBlurでバリデーションを実行する", () => {
  const renderComponent = () => renderApp(<LoginForm onSubmit={() => {}} />);

  describe("メールアドレスは必須入力", () => {
    describe("入力していない場合", () => {
      test("エラーメッセージが表示されること", async () => {
        const { findByLabelText, findByText } = renderComponent();

        const emailField = await findByLabelText("メールアドレス");
        await userEvent.click(emailField);
        await userEvent.tab();

        expect(
          await findByText("メールアドレスを入力してください"),
        ).toBeInTheDocument();
      });
    });

    describe("入力している場合", () => {
      test("エラーメッセージが表示されないこと", async () => {
        const { findByLabelText, queryByText } = renderComponent();

        const emailField = await findByLabelText("メールアドレス");
        await userEvent.type(emailField, "hoge@example.com");

        expect(queryByText("メールアドレスを入力してください")).toBeNull();
      });
    });
  });

  describe("パスワードは必須入力", () => {
    describe("入力していない場合", () => {
      test("エラーメッセージが表示されること", async () => {
        const { findByLabelText, findByText } = renderComponent();

        const passwordField = await findByLabelText("パスワード");
        await userEvent.click(passwordField);
        await userEvent.tab();

        expect(
          await findByText("パスワードを入力してください"),
        ).toBeInTheDocument();
      });
    });

    describe("入力している場合", () => {
      test("エラーメッセージが表示されないこと", async () => {
        const { findByLabelText, queryByText } = renderComponent();

        const passwordField = await findByLabelText("パスワード");
        await userEvent.type(passwordField, "password");

        expect(queryByText("パスワードを入力してください")).toBeNull();
      });
    });
  });
});

describe("ログインボタンでonSubmitを実行する", () => {
  test("入力した値を引数にしてonSubmitが実行されること", async () => {
    let expected: LoginFormData | undefined;

    const { findByLabelText, findByText } = renderApp(
      <LoginForm
        onSubmit={(formData) => {
          expected = formData;
        }}
      />,
    );

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

describe("onSubmitの多重実行を防止する", () => {
  const renderComponent = () =>
    renderApp(
      <LoginForm
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }}
      />,
    );

  describe("onSubmit実行中の場合", () => {
    test("ログインボタンが非活性であること", async () => {
      const { findByLabelText, findByText } = renderComponent();

      const emailField = await findByLabelText("メールアドレス");
      await userEvent.type(emailField, "hoge@example.com");

      const passwordField = await findByLabelText("パスワード");
      await userEvent.type(passwordField, "password");

      const loginButton = await findByText("ログイン");
      await userEvent.click(loginButton);

      expect(loginButton).toBeDisabled();
    });
  });

  describe("onSubmit実行完了の場合", () => {
    test("ログインボタンが活性であること", async () => {
      const { findByLabelText, findByText } = renderComponent();

      const emailField = await findByLabelText("メールアドレス");
      await userEvent.type(emailField, "hoge@example.com");

      const passwordField = await findByLabelText("パスワード");
      await userEvent.type(passwordField, "password");

      const loginButton = await findByText("ログイン");
      await userEvent.click(loginButton);

      await waitFor(() => {
        expect(loginButton).toBeEnabled();
      });
    });
  });
});

describe("エラーステータスでエラーメッセージを表示する", () => {
  describe("エラーの場合", () => {
    test("エラーメッセージが表示されること", async () => {
      const { findByText } = renderApp(
        <LoginForm
          formStatus={{ isError: true, message: "エラーだよ" }}
          onSubmit={() => {}}
        />,
      );

      expect(await findByText("エラーだよ")).toBeInTheDocument();
    });
  });

  describe("エラーでない場合", () => {
    test("エラーメッセージが表示されないこと", () => {
      const { queryByText } = renderApp(
        <LoginForm formStatus={{ isError: false }} onSubmit={() => {}} />,
      );

      expect(queryByText("エラーだよ")).toBeNull();
    });
  });
});
