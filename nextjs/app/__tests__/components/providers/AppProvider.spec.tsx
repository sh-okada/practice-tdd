import { Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HttpResponse, http } from "msw";
import { axiosClient } from "@/libs/axios";
import { server } from "@/libs/msw";
import { renderApp } from "@/libs/rtl";

const ChildComponent = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["/tests"],
    queryFn: () =>
      axiosClient.get<{ message: string }>("/tests").then((res) => res.data),
    retry: false,
  });

  return <Typography>{data.message}</Typography>;
};

const renderComponent = () => renderApp(<ChildComponent />);

describe("データの取得中はローディング画面を表示する", () => {
  beforeEach(() => {
    server.use(
      http.get("http://localhost:8000/api/tests", () => {
        return HttpResponse.json({ message: "Hello, World!" }, { status: 200 });
      }),
    );
  });

  describe("子のコンポーネントでデータを取得している場合", () => {
    test("ローディングが表示されること", async () => {
      const { findByLabelText } = renderComponent();

      const loading = await findByLabelText("読み込み中");

      expect(loading).toBeInTheDocument();
    });
  });

  describe("子のコンポーネントでデータを取得完了している場合", () => {
    test("データが表示されること", async () => {
      const { findByText } = renderComponent();

      const message = await findByText("Hello, World!");

      expect(message).toBeInTheDocument();
    });
  });
});

describe("データ取得中のエラーはエラー画面を表示する", () => {
  describe("子のコンポーネントでデータを取得中にエラーが発生した場合", () => {
    test("エラー画面が表示されること", async () => {
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
