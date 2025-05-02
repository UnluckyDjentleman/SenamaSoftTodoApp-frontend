import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import FilterString from "../../constants/filterString";

const initialState: { filter: FilterString } = {
  filter: {
    from: undefined,
    to: undefined,
    status: undefined
  },
};

export const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ filter: FilterString }>
    ) => {
      state.filter = action.payload.filter;
    },
  },
});

export const { setFilter } = filterReducer.actions;

export default filterReducer.reducer;