import type { Meta, StoryObj } from "@storybook/react";
import { delay, HttpResponse, http } from "msw";
import { AppProvider } from "@/components/providers/AppProvider";
import type LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";

const meta = {
  component: SignupPage,
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
        signup: [
          http.post("http://localhost:8000/api/auth/signup", async () => {
            await delay(1000);

            return HttpResponse.json(
              {
                detail: "登録に成功しました。",
              },
              { status: 200 },
            );
          }),
        ],
      },
    },
  },
};

export const NameIsAlreadyInUse: Story = {
  parameters: {
    msw: {
      handlers: {
        signup: [
          http.post("http://localhost:8000/api/auth/signup", async () => {
            await delay(1000);

            return HttpResponse.json(
              {
                detail: "名前は既に使われています。",
              },
              { status: 409 },
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
        signup: [
          http.post("http://localhost:8000/api/auth/signup", async () => {
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
