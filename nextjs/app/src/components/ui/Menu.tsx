import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton, Typography } from "@mui/material";
import React from "react";

export const Menu = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer component="nav" onClose={toggleDrawer(false)} open={open}>
        <Typography>aaa</Typography>
      </Drawer>
    </>
  );
};
