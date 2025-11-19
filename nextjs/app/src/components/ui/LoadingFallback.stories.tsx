import type { Meta, StoryObj } from "@storybook/react";
import { LoadingFallback } from "@/components/ui";

const meta = {
  component: LoadingFallback,
} satisfies Meta<typeof LoadingFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
