import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import { LogoutButton } from "@/components/functionals";
import { server } from "@/libs/msw";
import { renderApp } from "@/libs/rtl";

describe("ログアウトAPIでログアウトする", () => {
  const renderComponent = async () => {
    const rendered = renderApp(<LogoutButton />);
    const { findByText } = rendered;

    const logoutButton = await findByText("ログアウト");
    await userEvent.click(logoutButton);

    return rendered;
  };

  describe("ステータスコードが200の場合", () => {
    test("/login にリダイレクトされること", async () => {
      server.use(
        http.post("http://localhost:8000/api/auth/logout", () => {
          return HttpResponse.json(
            {
              detail: "ログアウトに成功しました。",
            },
            { status: 200 },
          );
        }),
      );

      await renderComponent();

      await waitFor(() => {
        const { replace } = useRouter();
        expect(replace).toHaveBeenCalledWith("/login");
      });
    });
  });

  describe("それ以外の場合", () => {
    test("エラーが表示されること", async () => {
      server.use(
        http.post("http://localhost:8000/api/auth/logout", () => {
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

describe("onClickの多重実行を防止する", () => {
  const renderComponent = async () => {
    const { findByText } = renderApp(<LogoutButton />);
    const logoutButton = await findByText("ログアウト");
    await userEvent.click(logoutButton);

    return logoutButton;
  };

  beforeEach(() => {
    server.use(
      http.post("http://localhost:8000/api/auth/logout", async () => {
        await delay(500);

        return HttpResponse.json(
          {
            detail: "ログアウトに成功しました。",
          },
          { status: 200 },
        );
      }),
    );
  });

  describe("onClick実行中の場合", () => {
    test("ログアウトボタンが非活性であること", async () => {
      const logoutButton = await renderComponent();

      expect(logoutButton).toBeDisabled();
    });
  });

  describe("onClick実行完了の場合", () => {
    test("ログアウトボタンが活性であること", async () => {
      const logoutButton = await renderComponent();

      await waitFor(() => {
        expect(logoutButton).toBeEnabled();
      });
    });
  });
});
