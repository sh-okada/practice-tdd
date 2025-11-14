import { Typography } from "@mui/material";
import { render, screen } from "@testing-library/react";
import AxiosMockApdapter from "axios-mock-adapter";
import { AuthProvider } from "@/components/providers";
import { axiosClient } from "@/libs/axios";

describe("認証ステータスを返す", () => {
  let axiosClientMock: AxiosMockApdapter;

  beforeEach(() => {
    axiosClientMock = new AxiosMockApdapter(axiosClient);
  });

  afterEach(() => {
    axiosClientMock.restore();
  });

  describe("認証している場合", () => {
    test("認証ステータスは認証済みであること", async () => {
      axiosClientMock.onGet("/users/me").reply(200, {
        id: "",
        name: "Shohei Ohtani",
        email: "shohei-ohtani@example.com",
      });

      render(
        <AuthProvider>
          {(isAuthed) => (
            <Typography data-testid="auth-status">
              {isAuthed ? "認証しています" : "認証していません"}
            </Typography>
          )}
        </AuthProvider>,
      );

      expect(await screen.findByTestId("auth-status")).toHaveTextContent(
        "認証しています",
      );
    });
  });

  describe("認証していない場合", () => {
    test("認証ステータスは未認証であること", async () => {
      axiosClientMock.onGet("/users/me").reply(401, {
        detail: "認証されていません。",
      });

      render(
        <AuthProvider>
          {(isAuthed) => (
            <Typography data-testid="auth-status">
              {isAuthed ? "認証しています" : "認証していません"}
            </Typography>
          )}
        </AuthProvider>,
      );

      expect(await screen.findByTestId("auth-status")).toHaveTextContent(
        "認証していません",
      );
    });
  });
});
