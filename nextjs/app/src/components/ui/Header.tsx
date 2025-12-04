import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

export type HeaderProps = {
  children?: React.ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Sample App</Typography>
            {children}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
