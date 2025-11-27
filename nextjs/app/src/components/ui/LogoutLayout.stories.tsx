import { Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { LogoutLayout } from "@/components/ui";

const meta = {
  component: LogoutLayout,
} satisfies Meta<typeof LogoutLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Typography>コンテンツ</Typography>,
  },
};
