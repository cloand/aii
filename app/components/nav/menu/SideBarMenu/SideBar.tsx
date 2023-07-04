import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import SideNav from "./SideNav";
import { sideNavBarActions } from "AII-GB/app/store/reducers/sideNavBar-slice";
import { ISideNavBarRootState } from "AII-GB/app/libs/types/sidebar";
import { Box } from "@mui/material";
import Image from "next/image";
import { ICONS } from "AII-GB/app/utils";

const SideBar = () => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isNavbarOpen = useSelector(
    (state: ISideNavBarRootState) => state.sideNavBar?.isNavbarOpen
  );
  const closeNav = () => {
    dispatch(sideNavBarActions.closeNavbar());
  };

  const openNavBar = () => {
    dispatch(sideNavBarActions.openNavbar());
  };

  return (
    <Box sx={{ display: { md: "none" } }}>
      <div onClick={openNavBar}>
       <Image src={ICONS.hamburger} alt="hamburger" width={20} height={20}/>
      </div>
      <Transition
        nodeRef={nodeRef}
        in={isNavbarOpen!}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {(state) => {
          return (
            <>
              <SideNav ref={nodeRef} state={state} onClose={closeNav} />
              <Box
                sx={{
                  position: "fixed",
                  top: 0, 
                  right: 0, 
                  bottom: 0, 
                  left: 0, 
                  zIndex: 999,
                  backgroundColor: "rgba(0, 0, 0, 0.6)", 
                  opacity: state === "entered" ? 1 : 0, 
                  transition: "opacity 300ms",
                }}
                onClick={closeNav}
              ></Box>
            </>
          );
        }}
      </Transition>
    </Box>
  );
};

export default SideBar;
