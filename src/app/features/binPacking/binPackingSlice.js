import { createSlice } from "@reduxjs/toolkit";

export const [tableWidth, tableHeight] = [1440, 1800];
export const [width, height] = [1830, 3630];

const initialState = {
  paper: {
    width: Math.round(tableHeight * (width / height)),
    height: Math.round(tableWidth / (width / height)),
  },
  aspectRatioPaper: width / height,
  bins: [
    [
      Math.round(tableHeight * (width / height)),
      Math.round(tableWidth / (width / height)),
    ],
  ],
  boxes: [],
  boxAspect: width / Math.round(tableHeight * (width / height)),
  space: 1,
  uniqColor: [],
  sortAlgorithm: "maxside",
  tableWidth,
  tableHeight,
  width,
  height,
};

const binPackingSlice = createSlice({
  name: "binPacking",
  initialState,
  reducers: {
    setAspectRatio: (state) => {
      state.aspectRatioPaper = state.paper.width / state.paper.height;
    },
    setBoxesSlice: (state, { payload }) => {
      state.boxes = payload;
    },
    setUniqColor: (state, { payload }) => {
      state.uniqColor.push(payload);
    },
    deleteBox: (state, { payload }) => {
      state.boxes = state.boxes.filter((box) => box.id !== payload);
    },
    increment: (state) => {
      state.space += 1;
    },
    decrement: (state) => {
      state.space -= 1;
    },

    changeSpace: (state, { payload }) => {
      state.space = payload;
    },
    setSort: (state, {payload}) => {
      state.sortAlgorithm = payload
    },
  },
});

export const {
  setBoxesSlice,
  setUniqColor,
  deleteBox,
  increment,
  decrement,
  changeSpace,
  setSort,
} = binPackingSlice.actions;

export const selectBinPacking = state => state.binPacking;

export default binPackingSlice.reducer;
