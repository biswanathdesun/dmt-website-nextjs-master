import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getEnquiryAsync } from "../services/enquiry";
interface EnquirySlice {
  isLoading: boolean;
  enquiryList: any[];
  count: number;
}

const initialState: EnquirySlice = {
  isLoading: false,
  enquiryList: [],
  count: 0,
};

const EnquirySlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    clearAlert(state) {},
  },
  extraReducers: (builder) => {
    // Add User ----------
    builder.addMatcher(
      isAnyOf(getEnquiryAsync.pending),
      (state, { payload }) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(getEnquiryAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.count = payload?.count;
        //  state.alert = {
        //    type: "success",
        //    message: "Assignment data fetched successfully.",
        //  };
        state.enquiryList = payload?.data;
      }
    );
    builder.addMatcher(
      isAnyOf(getEnquiryAsync.rejected),
      (state, { payload }) => {
        state.isLoading = false;
        //  state.alert = {
        //    type: "error",
        //    message: "Something went wrong.",
        //  };
        state.enquiryList = [];
      }
    );
  },
});

export const { clearAlert } = EnquirySlice.actions;

export default EnquirySlice.reducer;
