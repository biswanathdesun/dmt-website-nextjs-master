import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getMasterAudioAsync } from "../services/masteredAudio";
interface MasterAudioSlice {
  isLoading: boolean;
  masterAudioList: any[];
  count: number;
}

const initialState: MasterAudioSlice = {
  isLoading: false,
  masterAudioList: [],
  count: 0,
};

const MasterAudioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    clearAlert(state) {},
  },
  extraReducers: (builder) => {
    // Add User ----------
    builder.addMatcher(
      isAnyOf(getMasterAudioAsync.pending),
      (state, { payload }) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(getMasterAudioAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.count = payload?.count;
        //  state.alert = {
        //    type: "success",
        //    message: "Assignment data fetched successfully.",
        //  };
        state.masterAudioList = payload?.data;
      }
    );
    builder.addMatcher(
      isAnyOf(getMasterAudioAsync.rejected),
      (state, { payload }) => {
        state.isLoading = false;
        //  state.alert = {
        //    type: "error",
        //    message: "Something went wrong.",
        //  };
        state.masterAudioList = [];
      }
    );
  },
});

export const { clearAlert } = MasterAudioSlice.actions;

export default MasterAudioSlice.reducer;
