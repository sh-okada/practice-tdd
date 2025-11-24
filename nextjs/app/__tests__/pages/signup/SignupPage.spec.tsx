import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import { server } from "@/libs/msw";
import { renderApp } from "@/libs/rtl";
import SignupPage from "@/pages/signup";

describe("ログインしていない場合のみアクセスできる", () => {
  describe("ログインしている場合", () => {
    test("/ にリダイレクトされること", async () => {
      server.use(
        http.get("http://localhost:8000/api/users/me", () => {
          return HttpResponse.json(
            {
              id: "8415e241-9a24-4502-847a-abe348e84535",
              email: "hoge@example.com",
              name: "hoge",
            },
            { status: 200 },
          );
        }),
      );

      const mockReplace = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        replace: mockReplace,
      });
      renderApp(<SignupPage />);

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith("/");
      });
    });
  });

  describe("ログインしていない場合", () => {
    test("/ にリダイレクトされないこと", async () => {
      server.use(
        http.get("http://localhost:8000/api/users/me", () => {
          return HttpResponse.json(
            {
              detail: "認証してません。",
            },
            { status: 401 },
          );
        }),
      );

      const mockReplace = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        replace: mockReplace,
      });

      renderApp(<SignupPage />);

      await waitFor(() => {
        expect(mockReplace).not.toHaveBeenCalled();
      });
    });
  });
});

describe("サインアップAPIでログインする", () => {
  beforeEach(() => {
    server.use(
      http.get("http://localhost:8000/api/users/me", () => {
        return HttpResponse.json(
          {
            detail: "認証してません。",
          },
          { status: 401 },
        );
      }),
    );
  });

  describe("ステータスコードが200の場合", () => {
    test("/login にリダイレクトされること", async () => {
      server.use(
        http.post("http://localhost:8000/api/auth/signup", () => {
          return HttpResponse.json(
            {
              detail: "登録に成功しました。",
            },
            { status: 200 },
          );
        }),
      );

      const mockPush = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
      });

      const { findByLabelText, findByText } = renderApp(<SignupPage />);

      const nameField = await findByLabelText("名前");
      await userEvent.type(nameField, "大谷 翔平");

      const emailField = await findByLabelText("メールアドレス");
      await userEvent.type(emailField, "hoge@example.com");

      const passwordField = await findByLabelText("パスワード");
      await userEvent.type(passwordField, "Password123");

      const loginButton = await findByText("登録");
      await userEvent.click(loginButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/login");
      });
    });
  });

  describe("ステータスコードが409の場合", () => {
    test("エラーメッセージが表示されること", async () => {
      server.use(
        http.post("http://localhost:8000/api/auth/signup", () => {
          return HttpResponse.json(
            {
              detail: "名前は既に使われています。",
            },
            { status: 409 },
          );
        }),
      );

      const { findByLabelText, findByText } = renderApp(<SignupPage />);

      const nameField = await findByLabelText("名前");
      await userEvent.type(nameField, "大谷 翔平");

      const emailField = await findByLabelText("メールアドレス");
      await userEvent.type(emailField, "hoge@example.com");

      const passwordField = await findByLabelText("パスワード");
      await userEvent.type(passwordField, "Password123");

      const loginButton = await findByText("登録");
      await userEvent.click(loginButton);

      expect(await findByText("名前は既に使われています")).toBeInTheDocument();
    });
  });

  describe("それ以外の場合", () => {
    test("エラーが表示されること", async () => {
      server.use(
        http.post("http://localhost:8000/api/auth/signup", () => {
          return HttpResponse.json(
            {
              detail: "サーバーでエラーが発生しました。",
            },
            { status: 500 },
          );
        }),
      );

      const { findByLabelText, findByText } = renderApp(<SignupPage />);

      const nameField = await findByLabelText("名前");
      await userEvent.type(nameField, "大谷 翔平");

      const emailField = await findByLabelText("メールアドレス");
      await userEvent.type(emailField, "hoge@example.com");

      const passwordField = await findByLabelText("パスワード");
      await userEvent.type(passwordField, "Password123");

      const loginButton = await findByText("登録");
      await userEvent.click(loginButton);

      const message = await findByText("予期しないエラーが発生しました。");
      expect(message).toBeInTheDocument();
    });
  });
});
