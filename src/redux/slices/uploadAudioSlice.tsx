import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createUploadAudioAsync, getOrderByIdAsync, postTakeDownAsync } from "../services/uploadAudio";
interface UploadAudio {
  couponLoader: boolean;
  orderData: any;
  removeLoader: boolean;
  loaderById: boolean;
  orderDataById: any;
  isSubmitting: boolean
}

const initialState: UploadAudio = {
  couponLoader: false,
  orderData: [],
  removeLoader: false,
  loaderById: false,
  orderDataById: {},
  isSubmitting: false,
};

const uploadAudioSlice = createSlice({
  name: "newRelease",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // First Page Upload Audio
    builder.addMatcher(isAnyOf(createUploadAudioAsync.pending), (state) => {
      state.couponLoader = true;
    });
    builder.addMatcher(
      isAnyOf(createUploadAudioAsync.fulfilled),
      (state, { payload }) => {
        state.couponLoader = false;
        state.orderData = payload?.data;

      }
    );
    builder.addMatcher(isAnyOf(createUploadAudioAsync.rejected), (state) => {
      state.couponLoader = false;
      state.orderData = [];
    });


    // distribution order by id
    builder.addMatcher(isAnyOf(getOrderByIdAsync.pending), (state) => {
      state.loaderById = true;
    });
    builder.addMatcher(
      isAnyOf(getOrderByIdAsync.fulfilled),
      (state, { payload }) => {
        state.loaderById = false;
        state.orderDataById = payload?.data
      }
    );
    builder.addMatcher(isAnyOf(getOrderByIdAsync.rejected), (state) => {
      state.loaderById = false;
      state.orderDataById = {};

    });

    // postTakeDownAsync

    builder.addMatcher(isAnyOf(postTakeDownAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(postTakeDownAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(postTakeDownAsync.rejected), (state) => {
      state.isSubmitting = false;
    });
  },
});

// export const {  } = usersSlice.actions;
export default uploadAudioSlice.reducer;
