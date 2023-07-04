import React, { forwardRef } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import SideNavContent from "./SideNavContent";
import { ICONS } from "AII-GB/app/utils";
import Image from "next/image";
import { Box } from "@mui/material";
import Link from "next/link";

interface Props {
  state?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  sideNav: {
    maxWidth: "380px",
    width: "90%",
    height: "100vh",
    position: "fixed",
    overflowY: "scroll",
    top: 0,
    left: 0,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    // backgroundColor: "#E5E7EB",
    backgroundColor: "rgba(252, 251, 255,1)",
    transform: "translateX(-100%)",
    transition: "transform 300ms",
    "&.entered": {
      transform: "translateX(0)",
    },
    "&::-webkit-scrollbar": {
      width: "5px",
    },

    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#EB010E",
      outline: "1px solid slategrey",
    }
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "4rem",
    cursor: "pointer",
    zIndex: 1,
  },
  logoContainer: {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: theme.direction === "ltr" ? "10px" : 0,
    paddingRight: theme.direction === "rtl" ? "10px" : 0,
    cursor: "pointer",
  },
  hr: {
    border: "none",
    borderBottom: `1px solid #000`,
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const SideNav = forwardRef<HTMLDivElement, Props>(({ state, onClose }, ref) => {
  const classes = useStyles();

  return (
    <div
      ref={ref}
      className={`${classes.sideNav} ${state === "entered" ? "entered" : ""}`}
    >
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 10px 0 0"
      }}>
        <Link href="/">
          <Image src={ICONS.logo2} alt="logo" width={70} height={40} onClick={onClose} />
        </Link>

        <Image src={ICONS.close} alt="close" width={20} height={20} onClick={onClose} />
      </Box>

      <hr className={classes.hr} />
      <SideNavContent />
    </div>
  );
});

SideNav.displayName = "SideNav";

export default SideNav;
