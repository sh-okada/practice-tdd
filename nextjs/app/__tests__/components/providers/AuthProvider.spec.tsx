import { Typography } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "@/components/providers";

describe("認証ステータスでコンポーネントを切り替えて表示する", () => {
  describe("認証している場合", () => {
    test("認証ステータスは認証済みであること", async () => {
      render(
        <AuthProvider>
          {(isAuthed) => (
            <Typography>
              {isAuthed ? "認証しています" : "認証していません"}
            </Typography>
          )}
        </AuthProvider>,
      );

      expect(await screen.findByText("認証しています")).toBeInTheDocument();
    });
  });

  describe("認証していない場合", () => {
    test("認証ステータスは未認証であること", async () => {
      render(
        <AuthProvider>
          {(isAuthed) => (
            <Typography>
              {isAuthed ? "認証しています" : "認証していません"}
            </Typography>
          )}
        </AuthProvider>,
      );

      expect(await screen.findByText("認証していません")).toBeInTheDocument();
    });
  });
});
