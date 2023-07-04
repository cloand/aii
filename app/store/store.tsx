import productsSlice from "./reducers/products";
import megaMenuReducer from "./reducers/megaMenu-slice";
import sideNavBarReducer from "./reducers/sideNavBar-slice";
import activeMenuItemReducer from "./reducers/activeMenuItem-slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    productsSlice,
    megaMenu: megaMenuReducer,
    sideNavBar: sideNavBarReducer,
    activeMenuItem: activeMenuItemReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

