import { waitFor } from "@testing-library/dom";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import { server } from "@/libs/msw";
import { renderApp } from "@/libs/rtl";
import LoginPage from "@/pages/login";

describe("ログイン状態によるアクセス制御", () => {
  describe("ログインしている場合", () => {
    test("ホームページにリダイレクトされること", async () => {
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
    test("ホームページにリダイレクトされないこと", async () => {
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
