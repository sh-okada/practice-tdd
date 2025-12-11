import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Container, Dialog, IconButton, Toolbar } from "@mui/material";
import React from "react";

export type MenuProps = {
  children?: React.ReactNode;
};

export const Menu = ({ children }: Readonly<MenuProps>) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <MenuIcon />
      </IconButton>
      <Dialog fullScreen onClose={handleClose} open={open}>
        <Toolbar>
          <Container maxWidth="md">
            <Box textAlign="end">
              <IconButton color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
        <Container maxWidth="md">{children}</Container>
      </Dialog>
    </>
  );
};
