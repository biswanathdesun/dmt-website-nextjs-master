import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCreateProfessionalFirst } from "../services/creativeprofessionals";
interface professionalState {
  professionalLoader: boolean;
    professionalDataFirst: any[];
    professionalDataSecond: any[];
    professionalDataThird: any[];
    removeLoader: boolean;
}

const initialState: professionalState = {
  professionalLoader: false,
    professionalDataFirst: [],
  professionalDataSecond: [],
    professionalDataThird: [],
  removeLoader: false
};

const professionalSlice = createSlice({
  name: "professional",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getCreateProfessionalFirst.pending), (state) => {
      state.professionalLoader = true;
    });
    builder.addMatcher(
      isAnyOf(getCreateProfessionalFirst.fulfilled),
      (state, { payload }) => {
        state.professionalLoader = false;
        state.professionalDataFirst = payload;
      }
    );
    builder.addMatcher(isAnyOf(getCreateProfessionalFirst.rejected), (state) => {
      state.professionalLoader = false;
      state.professionalDataFirst = [];
    });
  }
});

export default professionalSlice.reducer;
