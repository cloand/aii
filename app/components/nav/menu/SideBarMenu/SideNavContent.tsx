import { useDispatch } from "react-redux";
import { sideNavBarActions } from "AII-GB/app/store/reducers/sideNavBar-slice";
import { activeMenuItemActions } from "AII-GB/app/store/reducers/activeMenuItem-slice";
import { IDropDown } from "AII-GB/app/libs/types/dropDown";

import { Box, Typography } from "@mui/material";
import { THEMES } from "AII-GB/app/utils";
import MenuItems from "AII-GB/app/components/ui/MenuItems/MenuItems";

const SideNavContent = () => {

  const dispatch = useDispatch();
  const openNav = (
    sidebarSideContent: IDropDown[] = [],
    activeItemName: string,
    activeItemIndex: number
  ) => {
    dispatch(sideNavBarActions.setSidebarEntries(sidebarSideContent));
    dispatch(sideNavBarActions.openSidebar());
    dispatch(activeMenuItemActions.setActiveMenuItemText(activeItemName));
    dispatch(activeMenuItemActions.setActiveMenuItemIndex(activeItemIndex));
  };
  return (
    <Box sx={{ position: 'absolute', width: '100%', mt:2 }}>
      <Typography variant="h5"
        sx={{
          fontSize: THEMES.DISPLAY_RESOLUTION.SUB_TITLE,
          pl: 2
        }}>
        All Products
      </Typography>
      <MenuItems onClick={openNav} />
    </Box>

  );
};

export default SideNavContent;
