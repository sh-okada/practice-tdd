import userEvent from "@testing-library/user-event";
import { SignupForm } from "@/components/ui/SignupForm";
import { generateString, renderApp } from "@/libs/rtl";

describe("onBlurでバリデーションを実行する", () => {
  const renderComponent = () => renderApp(<SignupForm />);

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
});
