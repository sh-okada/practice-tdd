import type { Meta, StoryObj } from "@storybook/react";
import { SignupForm } from "@/components/ui";

const meta = {
  component: SignupForm,
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};
