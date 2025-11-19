import type { Meta, StoryObj } from "@storybook/react";
import { ErrorFallback } from "@/components/ui";

const meta = {
  component: ErrorFallback,
} satisfies Meta<typeof ErrorFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
