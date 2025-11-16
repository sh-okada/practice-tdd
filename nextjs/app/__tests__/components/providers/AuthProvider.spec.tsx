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

describe("認証ステータスでコンポーネントを切り替えて表示する", () => {
  describe("認証している場合", () => {
    test("認証ステータスは認証済みであること", async () => {
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

  describe("認証していない場合", () => {
    test("認証ステータスは未認証であること", async () => {
      server.use(
        http.get("http://localhost:8000/api/users/me", async () => {
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
