import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "@/components/ui";

const meta = {
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
