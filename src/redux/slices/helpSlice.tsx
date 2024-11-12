import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getHelpCategoryAsync,
  helpCenterAsync,
  helpCenterByCategoryIdAsync,
  helpCenterContentBySlugAsync,
} from "../services/help";

interface Help {
  isHelpCategoryLoading: boolean;
  isSending: boolean;
  isSlugLoading: boolean;
  getHelpCategory: any;
  getHelpCenter: any;
  helpCenterByCategoryId: any;
  helpCenterContentBySlug: any;
}

const initialState: Help = {
  isHelpCategoryLoading: false,
  isSending: false,
  isSlugLoading: false,
  getHelpCategory: [],
  getHelpCenter: [],
  helpCenterByCategoryId: [],
  helpCenterContentBySlug: [],
};

const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getHelpCategoryAsync.pending), (state) => {
      state.isHelpCategoryLoading = true;
    });

    builder.addMatcher(
      isAnyOf(getHelpCategoryAsync.fulfilled),
      (state, { payload }) => {
        state.isHelpCategoryLoading = false;
        state.getHelpCategory = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getHelpCategoryAsync.rejected), (state) => {
      state.isHelpCategoryLoading = false;
      state.getHelpCategory = [];
    });

    // help center list

    builder.addMatcher(isAnyOf(helpCenterAsync.pending), (state) => {
      state.isSending = true;
    });

    builder.addMatcher(
      isAnyOf(helpCenterAsync.fulfilled),
      (state, { payload }) => {
        state.isSending = false;
        state.getHelpCenter = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(helpCenterAsync.rejected), (state) => {
      state.isSending = false;
      state.getHelpCenter = [];
    });

    // Help Center By Category and Sub-Category Id
    builder.addMatcher(
      isAnyOf(helpCenterByCategoryIdAsync.pending),
      (state) => {
        state.isSending = true;
      }
    );

    builder.addMatcher(
      isAnyOf(helpCenterByCategoryIdAsync.fulfilled),
      (state, { payload }) => {
        state.isSending = false;
        state.helpCenterByCategoryId = payload?.data;
      }
    );
    builder.addMatcher(
      isAnyOf(helpCenterByCategoryIdAsync.rejected),
      (state) => {
        state.isSending = false;
        state.helpCenterByCategoryId = [];
      }
    );

    // Get Content by slug url
    builder.addMatcher(
      isAnyOf(helpCenterContentBySlugAsync.pending),
      (state) => {
        state.isSlugLoading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(helpCenterContentBySlugAsync.fulfilled),
      (state, { payload }) => {
        state.isSlugLoading = false;
        state.helpCenterContentBySlug = payload?.data;
      }
    );
    builder.addMatcher(
      isAnyOf(helpCenterContentBySlugAsync.rejected),
      (state) => {
        state.isSlugLoading = false;
        state.helpCenterContentBySlug = [];
      }
    );
  },
});

export default helpSlice.reducer;
