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
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
        http.post("http://localhost:8000/api/auth/login", async () => {
          await delay(5000);

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
};
