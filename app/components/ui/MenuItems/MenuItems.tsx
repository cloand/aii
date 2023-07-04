import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { List } from "@mui/material";
// import { ChevronRight } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { IDropDown } from "AII-GB/app/libs/types/dropDown";
import { megaMenuActions } from "AII-GB/app/store/reducers/megaMenu-slice";
import { IActiveMenuItemRootState } from "AII-GB/app/libs/types/activeMenuItem";
import { useWindowDimensions } from "AII-GB/app/middleware/useWindowDimensions";

import CustomizedAccordions from "AII-GB/app/[slugs]/[products]/sidebar";

const useStyles = makeStyles(() => ({
  listItem: {
    padding: "12px 16px",
    transition: "color 300ms",
    "&:hover": {
      color: "primary",
    },
  },
  listItemText: {
    fontWeight: "bold",
  },
}));

interface Props {
  onClick?: (
    submenu: IDropDown[] | undefined,
    activeItemName: string,
    index: number
  ) => void;
  onMouseOver?: (
    submenu: IDropDown[] | undefined,
    index: number,
    activeItemName: string
  ) => void;
}

const MenuItems: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  function onMenuItemClickHandler(
    productsGroup: IDropDown[] | undefined,
    category: string,
    index: number
  ) {
    props.onClick && props.onClick(productsGroup, category, index);
    width >= 768 && dispatch(megaMenuActions.closeMegaMenu());
  }

  const activeMenuItemIndex = useSelector(
    (state: IActiveMenuItemRootState) =>
      state.activeMenuItem.activeMenuItemIndex
  );

  return (
    <List component="ul" >
      <CustomizedAccordions type="nav"/>
    </List>
  );
};

export default MenuItems;
