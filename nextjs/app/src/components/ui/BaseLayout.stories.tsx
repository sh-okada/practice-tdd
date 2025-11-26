import { Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { BaseLayout } from "@/components/ui";

const meta = {
  component: BaseLayout,
} satisfies Meta<typeof BaseLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHeader: Story = {
  render: () => {
    return (
      <BaseLayout>
        <Typography>ヘッダー</Typography>
        <Typography>コンテンツ</Typography>
        <Typography>フッター</Typography>
      </BaseLayout>
    );
  },
};

export const WithoutHeader: Story = {
  render: () => {
    return (
      <BaseLayout>
        <Typography>コンテンツ</Typography>
        <Typography>フッター</Typography>
      </BaseLayout>
    );
  },
};
