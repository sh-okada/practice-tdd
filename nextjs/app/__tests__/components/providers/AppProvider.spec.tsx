import { Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import AxiosMockAdapter from "axios-mock-adapter";
import { AppProvider } from "@/components/providers";
import { axiosClient } from "@/libs/axios";

const ChildComponent = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["/tests"],
    queryFn: () =>
      axiosClient.get<{ message: string }>("/tests").then((res) => res.data),
  });

  return <Typography>{data.message}</Typography>;
};

const renderComponent = () =>
  render(
    <AppProvider>
      <ChildComponent />
    </AppProvider>,
  );

describe("データの取得中はローディング画面を表示する", () => {
  let axiosClientMock: AxiosMockAdapter;

  beforeEach(() => {
    axiosClientMock = new AxiosMockAdapter(axiosClient);
    axiosClientMock.onGet("/tests").reply(200, { message: "Hello, World!" });
  });

  afterEach(() => {
    axiosClientMock.restore();
  });

  describe("子のコンポーネントでデータを取得している場合", () => {
    test("ローディングが表示されること", async () => {
      renderComponent();

      const loading = await screen.findByLabelText("読み込み中");

      expect(loading).toBeInTheDocument();
    });
  });

  describe("子のコンポーネントでデータを取得完了している場合", () => {
    test("データが表示されること", async () => {
      renderComponent();

      const message = await screen.findByText("Hello, World!");

      expect(message).toBeInTheDocument();
    });
  });
});

describe("データ取得中のエラーはエラー画面を表示する", () => {
  let axiosClientMock: AxiosMockAdapter;

  beforeEach(() => {
    axiosClientMock = new AxiosMockAdapter(axiosClient);
  });

  afterEach(() => {
    axiosClientMock.restore();
  });

  describe("子のコンポーネントでデータを取得中にエラーが発生した場合", () => {
    test("エラー画面が表示されること", async () => {
      axiosClientMock.onGet("/tests").reply(500);

      renderComponent();

      const message = await screen.findByText(
        "予期しないエラーが発生しました。",
      );

      expect(message).toBeInTheDocument();
    });
  });
});
