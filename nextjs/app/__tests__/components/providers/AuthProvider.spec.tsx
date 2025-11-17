import { Typography } from "@mui/material";
import { HttpResponse, http } from "msw";
import { AuthProvider } from "@/components/providers";
import { server } from "@/libs/msw";
import { renderApp } from "@/libs/rtl";

const renderComponent = () =>
  renderApp(
    <AuthProvider>
      {(isAuthed) => (
        <Typography>
          {isAuthed ? "認証しています" : "認証していません"}
        </Typography>
      )}
    </AuthProvider>,
  );

describe("ユーザー情報取得APIでログイン状態をチェックし、ログイン状態によってコンポーネントを切り替える", () => {
  describe("ユーザー情報が取得できた場合", () => {
    test("ログイン状態であること", async () => {
      server.use(
        http.get("http://localhost:8000/api/users/me", async () => {
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

      const { findByText } = renderComponent();

      expect(await findByText("認証しています")).toBeInTheDocument();
    });
  });

  describe("認証エラーによってユーザー情報が取得できなかった場合", () => {
    test("ログイン状態でないこと", async () => {
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

      const { findByText } = renderComponent();

      expect(await findByText("認証していません")).toBeInTheDocument();
    });
  });
});
