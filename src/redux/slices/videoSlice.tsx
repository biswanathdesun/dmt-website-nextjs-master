
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    getByIdVideoAsync,
    getVideoCategoryAsync,
    getVideoSubCategoryAsync,
    videoListByCategoryIdAsync
} from '../services/video';

const initialState = {
  isLoading: false,
  isVideoLoading: false,
  isSubmitting: false,
  alert: {
    type: "",
    message: "",
  },
  totalCount: 0,
  getVideoCategoryList: [],
  videoListByCategoryId: [],
  getVideoSubCategoryList: [],
  videoById: [],
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        clearAlert(state) {
            state.alert = {
                type: '',
                message: '',
            };
        },
    },
    extraReducers: (builder) => {
      // get category ----------
      builder.addMatcher(
        isAnyOf(getVideoCategoryAsync.pending),
        (state, { payload }) => {
          state.isLoading = true;
        }
      );
      builder.addMatcher(
        isAnyOf(getVideoCategoryAsync.fulfilled),
        (state, { payload }) => {
          state.isLoading = false;
          state.totalCount = payload?.count;
          state.getVideoCategoryList = payload?.data;
        }
      );
      builder.addMatcher(
        isAnyOf(getVideoCategoryAsync.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.getVideoCategoryList = [];
        }
      );
      // get sub category ----------
      builder.addMatcher(
        isAnyOf(getVideoCategoryAsync.pending),
        (state, { payload }) => {
          state.isLoading = true;
        }
      );
      builder.addMatcher(
        isAnyOf(getVideoCategoryAsync.fulfilled),
        (state, { payload }) => {
          state.isLoading = false;
          state.totalCount = payload?.count;
          state.getVideoSubCategoryList = payload?.data;
          console.log("subCategory => ", payload?.data);
        }
      );
      builder.addMatcher(
        isAnyOf(getVideoCategoryAsync.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.getVideoSubCategoryList = [];
        }
      );

      // Get faq By Id ----------
      builder.addMatcher(
        isAnyOf(getByIdVideoAsync.pending),
        (state, { payload }) => {
          state.isSubmitting = true;
        }
      );
      builder.addMatcher(
        isAnyOf(getByIdVideoAsync.fulfilled),
        (state, { payload }) => {
          state.isSubmitting = false;
          state.videoById = payload?.data;
        }
      );
      builder.addMatcher(
        isAnyOf(getByIdVideoAsync.rejected),
        (state, { payload }) => {
          state.isSubmitting = false;
          state.videoById = [];
        }
      );

      // Video List By Category and Sub-Category Id
      builder.addMatcher(
        isAnyOf(videoListByCategoryIdAsync.pending),
        (state) => {
          state.isVideoLoading = true;
        }
      );

      builder.addMatcher(
        isAnyOf(videoListByCategoryIdAsync.fulfilled),
        (state, { payload }) => {
          state.isVideoLoading = false;
          state.videoListByCategoryId = payload?.data;
        }
      );
      builder.addMatcher(
        isAnyOf(videoListByCategoryIdAsync.rejected),
        (state) => {
          state.isVideoLoading = false;
          state.videoListByCategoryId = [];
        }
      );
    },
});

export const { clearAlert } = videoSlice.actions;
export default videoSlice.reducer;
