import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDropDown } from "AII-GB/app/libs/types/dropDown";
import { ISideNavBar } from "AII-GB/app/libs/types/sidebar";

const initialState: ISideNavBar = {
  isSidebarOpen: false,
  isNavbarOpen: false,
  dropDownList: [],
};

const sideNavBarSlice = createSlice({
  name: "sideNavBar",
  initialState,
  reducers: {
    openSidebar(state) {
      state.isSidebarOpen = true;
    },

    openNavbar(state) {
      state.isNavbarOpen = true;
    },

    closeSidebar(state) {
      state.isSidebarOpen = false;
    },

    closeNavbar(state) {
      state.isSidebarOpen = false;
      state.isNavbarOpen = false;
    },

    setSidebarEntries(state, action: PayloadAction<IDropDown[]>) {
      state.dropDownList = action.payload;
    },
  },
});

export const sideNavBarActions = sideNavBarSlice.actions;

export default sideNavBarSlice.reducer;
