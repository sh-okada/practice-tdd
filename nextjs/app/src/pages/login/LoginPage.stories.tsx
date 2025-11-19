import type { Meta, StoryObj } from "@storybook/react";
import { delay, HttpResponse, http } from "msw";
import { AppProvider } from "@/components/providers/AppProvider";
import LoginPage from "@/pages/login";

const meta = {
  component: LoginPage,
  decorators: [
    (Story) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: {
        getMe: [
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
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: {
        login: [
          http.post("http://localhost:8000/api/auth/login", async () => {
            await delay(1000);

            return HttpResponse.json(
              {
                detail: "ログインに成功しました。",
              },
              { status: 200 },
            );
          }),
        ],
      },
    },
  },
};

export const IncorrentEmailOrPassword: Story = {
  parameters: {
    msw: {
      handlers: {
        login: [
          http.post("http://localhost:8000/api/auth/login", async () => {
            await delay(1000);

            return HttpResponse.json(
              {
                detail: "ログインに失敗しました。",
              },
              { status: 400 },
            );
          }),
        ],
      },
    },
  },
};

export const OtherError: Story = {
  parameters: {
    msw: {
      handlers: {
        login: [
          http.post("http://localhost:8000/api/auth/login", async () => {
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
  },
};
