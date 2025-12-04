import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/components/ui";

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithChildren: Story = {
  args: {
    children: (
      <IconButton aria-label="メニュー" color="inherit">
        <MenuIcon />
      </IconButton>
    ),
  },
};
