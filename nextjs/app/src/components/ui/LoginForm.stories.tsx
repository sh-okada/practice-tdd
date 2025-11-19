import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "@/components/ui";

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => {
      console.log(data);
    },
  },
};
