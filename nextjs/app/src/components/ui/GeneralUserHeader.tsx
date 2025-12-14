import { ListItemText, MenuItem, MenuList } from "@mui/material";
import { LogoutButton } from "@/components/functionals";
import { Header, Menu } from "@/components/ui";
import { paths } from "@/configs";

export const GeneralUserHeader = () => {
  return (
    <Header>
      <Menu>
        <MenuList>
          <MenuItem href={paths.applicationList.getHref()}>
            <ListItemText>{paths.applicationList.label}</ListItemText>
          </MenuItem>
          <MenuItem href={paths.application.getHref()}>
            <ListItemText>{paths.application.label}</ListItemText>
          </MenuItem>
        </MenuList>
        <LogoutButton />
      </Menu>
    </Header>
  );
};
