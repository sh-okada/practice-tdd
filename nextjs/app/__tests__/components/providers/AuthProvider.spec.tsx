import { Typography } from "@mui/material";
import { waitFor } from "@testing-library/dom";
import { delay, HttpResponse, http } from "msw";
import { AuthProvider } from "@/components/providers";
import { server } from "@/libs/msw";
import { renderApp } from "@/libs/rtl";

describe("API実行中はローディングを表示する", () => {
  const renderComponent = () =>
    renderApp(
      <AuthProvider>
        {() => <Typography>読み込み完了</Typography>}
      </AuthProvider>,
    );

  beforeEach(() => {
    server.use(
      http.get("http://localhost:8000/api/users/me", async () => {
        await delay(500);

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
  });

  describe("API実行中の場合", () => {
    test("ローディングが表示されること", async () => {
      const { findByLabelText } = renderComponent();

      expect(await findByLabelText("読み込み中"));
    });
  });

  describe("API実行完了の場合", () => {
    test("ローディングが表示されないこと", async () => {
      const { queryByLabelText, findByText } = renderComponent();

      await findByText("読み込み完了");
      expect(queryByLabelText("読み込み中")).toBeNull();
    });
  });
});

describe("ユーザー情報取得APIの結果でログイン状態を判定する", () => {
  let expected: boolean;
  const renderComponent = () =>
    renderApp(
      <AuthProvider>
        {(isAuthed) => {
          expected = isAuthed;

          return null;
        }}
      </AuthProvider>,
    );

  describe("ステータスコードが200の場合", () => {
    test("isAuthedがtrueであること", async () => {
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

      renderComponent();

      await waitFor(() => {
        expect(expected).toBe(true);
      });
    });
  });

  describe("ステータスコードが401の場合", () => {
    test("isAuthedがfalseであること", async () => {
      server.use(
        http.get("http://localhost:8000/api/users/me", () => {
          return HttpResponse.json(
            {
              detail: "認証していません。",
            },
            { status: 401 },
          );
        }),
      );

      renderComponent();

      await waitFor(() => {
        expect(expected).toBe(false);
      });
    });
  });

  describe("それ以外の場合", () => {
    test("エラーが表示されること", async () => {
      server.use(
        http.get("http://localhost:8000/api/users/me", () => {
          return HttpResponse.json(
            {
              detail: "サーバーでエラーが発生しました。",
            },
            { status: 500 },
          );
        }),
      );

      const { findByText } = renderComponent();

      expect(await findByText("予期しないエラーが発生しました。"));
    });
  });
});
