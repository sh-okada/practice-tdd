import type { Meta, StoryObj } from "@storybook/react";
import { PasswordField } from "@/components/ui";

const meta = {
  component: PasswordField,
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
