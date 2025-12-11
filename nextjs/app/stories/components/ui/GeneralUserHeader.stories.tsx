import type { Meta, StoryObj } from "@storybook/react";
import { GeneralUserHeader } from "@/components/ui";

const meta = {
  component: GeneralUserHeader,
} satisfies Meta<typeof GeneralUserHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
