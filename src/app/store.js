import { configureStore } from "@reduxjs/toolkit";

import binPackingReducer from "./features/binPacking/binPackingSlice";

export const store = configureStore({
  reducer: {
    binPacking: binPackingReducer,
  },
});
