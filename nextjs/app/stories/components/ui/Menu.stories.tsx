import { Divider, ListItemText, MenuItem, MenuList } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "@/components/ui";

const meta = {
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithChildren: Story = {
  args: {
    children: (
      <MenuList>
        <MenuItem>
          <ListItemText>メニュー1</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>メニュー2</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>メニュー3</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>メニュー4</ListItemText>
        </MenuItem>
      </MenuList>
    ),
  },
};
