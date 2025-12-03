import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "@/components/ui";

const meta = {
  component: Loading,
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
