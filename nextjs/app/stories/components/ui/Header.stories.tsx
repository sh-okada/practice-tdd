import type { Meta, StoryObj } from "@storybook/react";
import { Header, Menu } from "@/components/ui";

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithChildren: Story = {
  args: {
    children: <Menu />,
  },
};
