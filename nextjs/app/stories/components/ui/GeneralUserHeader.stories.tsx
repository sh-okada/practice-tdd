import type { Meta, StoryObj } from "@storybook/react";
import { delay, HttpResponse, http } from "msw";
import { AppProvider } from "@/components/providers";
import { GeneralUserHeader } from "@/components/ui";

const meta = {
  component: GeneralUserHeader,
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
        logout: [
          http.post("http://localhost:8000/api/auth/logout", async () => {
            await delay(1000);

            return HttpResponse.json(
              {
                detail: "ログアウトに成功しました。",
              },
              { status: 200 },
            );
          }),
        ],
      },
    },
  },
} satisfies Meta<typeof GeneralUserHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LogoutError: Story = {
  parameters: {
    msw: {
      handlers: {
        logout: [
          http.post("http://localhost:8000/api/auth/logout", async () => {
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
