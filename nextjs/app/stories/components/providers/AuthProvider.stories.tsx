import { Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { delay, HttpResponse, http } from "msw";
import { AppProvider } from "@/components/providers/AppProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

const meta = {
  component: AuthProvider,
  decorators: [
    (Story) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
  args: {
    children: (isAuthed) =>
      isAuthed ? (
        <Typography>ログインしている場合のコンポーネントを表示</Typography>
      ) : (
        <Typography>ログインしていない場合のコンポーネントを表示</Typography>
      ),
  },
} satisfies Meta<typeof AuthProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Authorized: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:8000/api/users/me", async () => {
          await delay(1000);

          return HttpResponse.json(
            {
              id: "8415e241-9a24-4502-847a-abe348e84535",
              email: "hoge@example.com",
              name: "hoge",
            },
            { status: 200 },
          );
        }),
      ],
    },
  },
};

export const Unauthorized: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:8000/api/users/me", async () => {
          await delay(1000);

          return HttpResponse.json(
            {
              detail: "認証していません。",
            },
            { status: 401 },
          );
        }),
      ],
    },
  },
};

export const APIError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:8000/api/users/me", async () => {
          await delay(1000);

          return HttpResponse.json(
            {
              detail: "サーバーでエラーが発生しました。",
            },
            { status: 500 },
          );
        }),
      ],
    },
  },
};
