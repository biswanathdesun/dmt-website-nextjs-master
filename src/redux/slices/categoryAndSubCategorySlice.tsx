import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getCategoryByTypeAsync,
  getSubCategoryByCategoryAsync,
} from "../services/categoryAndSubCategory";

interface categoryAndSubCategoryState {
  isLoading: boolean;
  isSubmitting: boolean;
  getCategoryByType: any[];
  getSubCategoryByCategory: any[];
}

const initialState: categoryAndSubCategoryState = {
  isLoading: false,
  isSubmitting: false,
  getCategoryByType: [],
  getSubCategoryByCategory: [],
};

const categoryAndSubCategorySlice = createSlice({
  name: "categoryAndSubCategory",
  initialState,
  reducers: {
    clearAlert(state) {
      // state.alert = {
      //   type: "",
      //   message: "",
      // };
    },
  },
  extraReducers: (builder) => {
    // get ----------
    builder.addMatcher(
      isAnyOf(getCategoryByTypeAsync.pending),
      (state, { payload }) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(getCategoryByTypeAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.getCategoryByType = payload?.data;
      }
    );
    builder.addMatcher(
      isAnyOf(getCategoryByTypeAsync.rejected),
      (state, { payload }) => {
        state.isLoading = false;
        state.getCategoryByType = [];
      }
    );

    // Get Sub-Category by Category
    builder.addMatcher(
      isAnyOf(getSubCategoryByCategoryAsync.pending),
      (state, { payload }) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(getSubCategoryByCategoryAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.getSubCategoryByCategory = payload?.data;
      }
    );
    builder.addMatcher(
      isAnyOf(getSubCategoryByCategoryAsync.rejected),
      (state, { payload }) => {
        state.isLoading = false;
        state.getSubCategoryByCategory = [];
      }
    );
  },
});

export const { clearAlert } = categoryAndSubCategorySlice.actions;
export default categoryAndSubCategorySlice.reducer;
