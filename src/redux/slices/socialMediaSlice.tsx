import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createSocialMediaAsync, getSocialMediaByIdAsync } from "../services/socialMedia";

interface socialState {
  isSubmitting: boolean;
  isLoading: boolean;
  socialData: {
    _id:string
  };
  socialDataByUserId: object
}

const initialState: socialState = {
  isSubmitting: false,
  isLoading: false,
  socialData: {
    _id:''
  },
  socialDataByUserId: {}
};

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(createSocialMediaAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(createSocialMediaAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.socialData = payload?.data; // Add user type here
      }
    );
    builder.addMatcher(isAnyOf(createSocialMediaAsync.rejected), (state) => {
      state.isLoading = false;
    });

    // by user Id

     builder.addMatcher(isAnyOf(getSocialMediaByIdAsync.pending), (state) => {
      //  state.isLoading = true;
     });
     builder.addMatcher(
       isAnyOf(getSocialMediaByIdAsync.fulfilled),
       (state, { payload }) => {
        //  state.isLoading = false;
         state.socialDataByUserId = payload?.data; // Add user type here
       }
     );
     builder.addMatcher(isAnyOf(getSocialMediaByIdAsync.rejected), (state) => {
      //  state.isLoading = false;
       state.socialDataByUserId = [];
     });
  }
});

export default socialMediaSlice.reducer;
