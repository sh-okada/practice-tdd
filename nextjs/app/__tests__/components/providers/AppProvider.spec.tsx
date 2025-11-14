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

  return <Typography data-testid="message">{data.message}</Typography>;
};

describe("Suspenseでローディング画面を表示する", () => {
  let axiosClientMock: AxiosMockAdapter;

  beforeEach(() => {
    axiosClientMock = new AxiosMockAdapter(axiosClient, { delayResponse: 500 });
  });

  afterEach(() => {
    axiosClientMock.restore();
  });

  describe("子のコンポーネントでデータを取得している場合", () => {
    test("ローディングが表示されること", async () => {
      axiosClientMock.onGet("/tests").reply(200, { message: "Hello, World!" });

      render(
        <AppProvider>
          <ChildComponent />
        </AppProvider>,
      );

      const loading = await screen.findByLabelText("読み込み中");

      expect(loading).toBeInTheDocument();
    });
  });

  describe("子のコンポーネントでデータを取得完了している場合", () => {
    test("データが表示されること", async () => {
      axiosClientMock.onGet("/tests").reply(200, { message: "Hello, World!" });

      render(
        <AppProvider>
          <ChildComponent />
        </AppProvider>,
      );

      const message = await screen.findByTestId("message");

      expect(message).toHaveTextContent("Hello, World!");
    });
  });
});
