import React from "react";
import SideBar from "./SideBar";
import { Box } from "@mui/material";

const index = () => {
  return (
    <Box sx={{ display: { md: "none" } }}>
      <SideBar />
    </Box>
  );
};

export default index;
