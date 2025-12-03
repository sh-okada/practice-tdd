import { Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AppProvider } from "@/components/providers/AppProvider";

const ErrorComponent = () => {
  throw new Error("Catch Error from Error Boundary");
};

const SuspenseQueryComponent = async () => {
  const { data } = useSuspenseQuery({
    queryKey: ["suspense-example"],
    queryFn: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      return "Hello World";
    },
  });

  return <Typography>{data}</Typography>;
};

const meta = {
  component: AppProvider,
} satisfies Meta<typeof AppProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorBoundary: Story = {
  args: {
    children: <ErrorComponent />,
  },
};

export const Suspense: Story = {
  args: {
    children: <SuspenseQueryComponent />,
  },
};
