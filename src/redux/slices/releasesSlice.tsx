import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { deleteReleaseOrderAsync, getReleasesOrderAsync } from "../services/releases";
interface ReleasesSlice {
  isLoading: boolean;
  isDeleting: boolean;
  releasesList: any[];
  count: number;
}

const initialState: ReleasesSlice = {
  isLoading: false,
  isDeleting: false,
  releasesList: [],
  count: 0,
};

const releasesSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearAlert(state) {
      //   state.alert = {
      //     type: "",
      //     message: "",
      //   };
    },
  },
  extraReducers: (builder) => {
    // Add User ----------
    builder.addMatcher(
      isAnyOf(getReleasesOrderAsync.pending),
      (state, { payload }) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(getReleasesOrderAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.count = payload?.count;
        //  state.alert = {
        //    type: "success",
        //    message: "Assignment data fetched successfully.",
        //  };
        state.releasesList = payload?.data?.results;
      }
    );
    builder.addMatcher(
      isAnyOf(getReleasesOrderAsync.rejected),
      (state, { payload }) => {
        state.isLoading = false;
        //  state.alert = {
        //    type: "error",
        //    message: "Something went wrong.",
        //  };
        state.releasesList = [];
      }
    );

    // --------Delete Song-----------
    builder.addMatcher(
      isAnyOf(deleteReleaseOrderAsync.pending),
      (state) => {
        state.isDeleting = true;
      }
    );
    builder.addMatcher(
      isAnyOf(deleteReleaseOrderAsync.fulfilled),
      (state) => {
        state.isDeleting = false;
      }
    );
    builder.addMatcher(
      isAnyOf(deleteReleaseOrderAsync.rejected),
      (state) => {
        state.isDeleting = false;
      }
    );
    // ----------------------
  },
});

export const { clearAlert } = releasesSlice.actions;

export default releasesSlice.reducer;
