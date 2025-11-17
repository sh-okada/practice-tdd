import { Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { delay, HttpResponse, http } from "msw";
import { axiosClient } from "@/libs/axios";
import { server } from "@/libs/msw";
import { renderApp } from "@/libs/rtl";

const ChildComponent = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["/tests"],
    queryFn: () =>
      axiosClient.get<{ message: string }>("/tests").then((res) => res.data),
  });

  return <Typography data-testid="message-text">{data.message}</Typography>;
};

const renderComponent = () => renderApp(<ChildComponent />);

describe("API実行ステータスによる表示制御", () => {
  describe("APIでデータを取得中の場合", () => {
    test("ローディングが表示されること", async () => {
      server.use(
        http.get("http://localhost:8000/api/tests", async () => {
          await delay(1000);

          return HttpResponse.json(
            { message: "Hello, World!" },
            { status: 200 },
          );
        }),
      );

      const { findByLabelText } = renderComponent();

      const loading = await findByLabelText("読み込み中");
      expect(loading).toBeInTheDocument();
    });
  });

  describe("APIでデータを取得完了した場合", () => {
    test("データが表示されること", async () => {
      server.use(
        http.get("http://localhost:8000/api/tests", () => {
          return HttpResponse.json(
            { message: "Hello, World!" },
            { status: 200 },
          );
        }),
      );

      const { findByText } = renderComponent();

      const message = await findByText("Hello, World!");
      expect(message).toBeInTheDocument();
    });
  });

  describe("APIでデータ取得に失敗した場合", () => {
    test("エラーが表示されること", async () => {
      server.use(
        http.get("http://localhost:8000/api/tests", () => {
          return HttpResponse.json(
            { detail: "サーバーでエラーが発生しました。" },
            { status: 500 },
          );
        }),
      );

      const { findByText } = renderComponent();

      const message = await findByText("予期しないエラーが発生しました。");
      expect(message).toBeInTheDocument();
    });
  });
});

describe("エラーが発生した場合、エラー画面を表示する", () => {
  describe("コンポーネントでエラーが発生した場合", () => {
    test("エラーが表示されること", async () => {
      const ErrorComponent = () => {
        throw new Error();
      };

      const { findByText } = renderApp(<ErrorComponent />);

      const message = await findByText("予期しないエラーが発生しました。");
      expect(message).toBeInTheDocument();
    });
  });
});
