import { Box } from "@mui/material";
import { Loading } from "@/components/ui";

export const LoadingFallback = () => {
  return (
    <Box textAlign="center">
      <Loading />
    </Box>
  );
};
