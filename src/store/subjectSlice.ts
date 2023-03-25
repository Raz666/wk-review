import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { SubjectResource } from "../api/models";

export type CounterState = {
  subject?: SubjectResource;
};

const initialState: CounterState = {};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    getSubject: (state, action: PayloadAction<SubjectResource>) => {
      state.subject = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSubject } = subjectSlice.actions;

export default subjectSlice.reducer;
