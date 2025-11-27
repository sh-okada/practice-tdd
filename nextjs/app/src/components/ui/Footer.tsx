import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box component="footer" textAlign="center">
      <Typography variant="caption">
        © {new Date().getFullYear()} Shuta Okada. All rights reserved.
      </Typography>
    </Box>
  );
};
