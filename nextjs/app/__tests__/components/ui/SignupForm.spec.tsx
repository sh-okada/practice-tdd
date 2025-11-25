import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "@/components/ui/SignupForm";
import type { SignupFormData } from "@/libs/rhf";
import { generateString, renderApp } from "@/libs/rtl";

describe("onBlurでバリデーションを実行する", () => {
  const renderComponent = () => renderApp(<SignupForm onSubmit={() => {}} />);

  describe("名前は必須入力", () => {
    describe("入力していない場合", () => {
      test("エラーメッセージが表示されること", async () => {
        const { findByLabelText, findByText } = renderComponent();

        const nameField = await findByLabelText("名前");
        await userEvent.click(nameField);
        await userEvent.tab();

        expect(await findByText("名前を入力してください")).toBeInTheDocument();
      });
    });

    describe("入力している場合", () => {
      test("エラーメッセージが表示されないこと", async () => {
        const { findByLabelText, queryByText } = renderComponent();

        const nameField = await findByLabelText("名前");
        await userEvent.type(nameField, "大谷 翔平");
        await userEvent.tab();

        expect(queryByText("名前を入力してください")).toBeNull();
      });
    });
  });

  describe("名前は50文字以内", () => {
    describe("50文字の場合", () => {
      test("エラーメッセージが表示されないこと", async () => {
        const { findByLabelText, queryByText } = renderComponent();

        const nameField = await findByLabelText("名前");
        await userEvent.type(nameField, generateString(50));
        await userEvent.tab();

        expect(queryByText("名前は50文字以内で入力してください")).toBeNull();
      });
    });

    describe("51文字の場合", () => {
      test("エラーメッセージが表示されること", async () => {
        const { findByLabelText, findByText } = renderComponent();

        const nameField = await findByLabelText("名前");
        await userEvent.type(nameField, generateString(51));
        await userEvent.tab();

        expect(
          await findByText("名前は50文字以内で入力してください"),
        ).toBeInTheDocument();
      });
    });
  });

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
        await userEvent.tab();

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
  });

  describe("パスワードは8文字以上", () => {
    describe("8文字の場合", () => {
      test("エラーメッセージが表示されないこと", async () => {
        const { findByLabelText, queryByText } = renderComponent();

        const passwordField = await findByLabelText("パスワード");
        await userEvent.type(passwordField, "Passw0rd");
        await userEvent.tab();

        expect(
          queryByText("パスワードは8文字以上で入力してください"),
        ).toBeNull();
      });
    });

    describe("7文字の場合", () => {
      test("エラーメッセージが表示されること", async () => {
        const { findByLabelText, findByText } = renderComponent();

        const passwordField = await findByLabelText("パスワード");
        await userEvent.type(passwordField, "Passw0r");
        await userEvent.tab();

        expect(
          await findByText("パスワードは8文字以上で入力してください"),
        ).toBeInTheDocument();
      });
    });
  });

  describe("パスワードは少なくとも大文字・小文字・数字を1つ以上使用", () => {
    describe("大文字・小文字・数字が使用されている場合", () => {
      test("エラーメッセージが表示されないこと", async () => {
        const { findByLabelText, queryByText } = renderComponent();

        const passwordField = await findByLabelText("パスワード");
        await userEvent.type(passwordField, "Password1");
        await userEvent.tab();

        expect(
          queryByText(
            "パスワードには少なくとも大文字・小文字・数字を1つ以上使用してください",
          ),
        ).toBeNull();
      });
    });

    describe("大文字が使用されていない場合", () => {
      test("エラーメッセージが表示されること", async () => {
        const { findByLabelText, findByText } = renderComponent();

        const passwordField = await findByLabelText("パスワード");
        await userEvent.type(passwordField, "password1");
        await userEvent.tab();

        expect(
          await findByText(
            "パスワードには少なくとも大文字・小文字・数字を1つ以上使用してください",
          ),
        ).toBeInTheDocument();
      });
    });

    describe("小文字が使用されていない場合", () => {
      test("エラーメッセージが表示されること", async () => {
        const { findByLabelText, findByText } = renderComponent();

        const passwordField = await findByLabelText("パスワード");
        await userEvent.type(passwordField, "PASSWORD1");
        await userEvent.tab();

        expect(
          await findByText(
            "パスワードには少なくとも大文字・小文字・数字を1つ以上使用してください",
          ),
        ).toBeInTheDocument();
      });
    });

    describe("数字が使用されていない場合", () => {
      test("エラーメッセージが表示されること", async () => {
        const { findByLabelText, findByText } = renderComponent();

        const passwordField = await findByLabelText("パスワード");
        await userEvent.type(passwordField, "Password");
        await userEvent.tab();

        expect(
          await findByText(
            "パスワードには少なくとも大文字・小文字・数字を1つ以上使用してください",
          ),
        ).toBeInTheDocument();
      });
    });
  });
});

describe("登録ボタンでonSubmitを実行する", () => {
  test("入力した値を引数にしてonSubmitが実行されること", async () => {
    let expected: SignupFormData | undefined;
    const { findByLabelText, findByText } = renderApp(
      <SignupForm
        onSubmit={(data) => {
          expected = data;
        }}
      />,
    );

    const nameField = await findByLabelText("名前");
    await userEvent.type(nameField, "大谷 翔平");

    const emailField = await findByLabelText("メールアドレス");
    await userEvent.type(emailField, "hoge@example.com");

    const passwordField = await findByLabelText("パスワード");
    await userEvent.type(passwordField, "Password1");

    const signupButton = await findByText("登録");
    await userEvent.click(signupButton);

    expect(expected).toStrictEqual({
      name: "大谷 翔平",
      email: "hoge@example.com",
      password: "Password1",
    });
  });
});

describe("onSubmitの多重実行を防止する", () => {
  const renderComponent = async () => {
    const { findByLabelText, findByText } = renderApp(
      <SignupForm
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      />,
    );

    const nameField = await findByLabelText("名前");
    await userEvent.type(nameField, "大谷 翔平");

    const emailField = await findByLabelText("メールアドレス");
    await userEvent.type(emailField, "hoge@example.com");

    const passwordField = await findByLabelText("パスワード");
    await userEvent.type(passwordField, "Password1");

    const signupButton = await findByText("登録");
    expect(signupButton).toBeEnabled();

    await userEvent.click(signupButton);

    return signupButton;
  };

  describe("onSubmit実行中の場合", () => {
    test("登録ボタンが非活性であること", async () => {
      const signupButton = await renderComponent();

      expect(signupButton).toBeDisabled();
    });
  });

  describe("onSubmit実行完了の場合", () => {
    test("登録ボタンが活性であること", async () => {
      const signupButton = await renderComponent();

      await waitFor(() => {
        expect(signupButton).toBeEnabled();
      });
    });
  });
});

describe("エラーステータスでエラーメッセージを表示する", () => {
  describe("エラーの場合", () => {
    test("エラーメッセージが表示されること", async () => {
      const { findByText } = renderApp(
        <SignupForm
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
        <SignupForm formStatus={{ isError: false }} onSubmit={() => {}} />,
      );

      expect(queryByText("エラーだよ")).toBeNull();
    });
  });
});
