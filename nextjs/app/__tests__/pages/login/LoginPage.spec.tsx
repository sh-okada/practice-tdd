import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import { server } from "@/libs/msw";
import { renderApp } from "@/libs/rtl";
import LoginPage from "@/pages/login";

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
      renderApp(<LoginPage />);

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

      renderApp(<LoginPage />);

      await waitFor(() => {
        expect(mockReplace).not.toHaveBeenCalled();
      });
    });
  });
});

describe("ログインAPIでログインする", () => {
  const renderComponent = async () => {
    const rendered = renderApp(<LoginPage />);
    const { findByLabelText, findByText } = rendered;

    const emailField = await findByLabelText("メールアドレス");
    await userEvent.type(emailField, "hoge@example.com");

    const passwordField = await findByLabelText("パスワード");
    await userEvent.type(passwordField, "password");

    const loginButton = await findByText("ログイン");
    await userEvent.click(loginButton);

    return rendered;
  };

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
    test("/ にリダイレクトされること", async () => {
      server.use(
        http.post("http://localhost:8000/api/auth/login", () => {
          return HttpResponse.json(
            {
              detail: "ログインに成功しました。",
            },
            { status: 200 },
          );
        }),
      );

      const mockReplace = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        replace: mockReplace,
      });

      await renderComponent();

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith("/");
      });
    });
  });

  describe("ステータスコードが400の場合", () => {
    test("エラーメッセージが表示されること", async () => {
      server.use(
        http.post("http://localhost:8000/api/auth/login", () => {
          return HttpResponse.json(
            {
              detail: "ログインに失敗しました。",
            },
            { status: 400 },
          );
        }),
      );

      const { findByText } = await renderComponent();

      expect(
        await findByText("メールアドレスまたはパスワードが間違っています"),
      ).toBeInTheDocument();
    });
  });

  describe("それ以外の場合", () => {
    test("エラーが表示されること", async () => {
      server.use(
        http.post("http://localhost:8000/api/auth/login", () => {
          return HttpResponse.json(
            {
              detail: "サーバーでエラーが発生しました。",
            },
            { status: 500 },
          );
        }),
      );

      const { findByText } = await renderComponent();

      expect(
        await findByText("予期しないエラーが発生しました。"),
      ).toBeInTheDocument();
    });
  });
});
