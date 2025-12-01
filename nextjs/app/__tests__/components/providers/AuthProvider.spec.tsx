import { waitFor } from "@testing-library/dom";
import { HttpResponse, http } from "msw";
import { AuthProvider } from "@/components/providers";
import { server } from "@/libs/msw";
import { renderApp } from "@/libs/rtl";

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
