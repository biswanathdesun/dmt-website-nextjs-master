import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { applyCouponAsync, removeCouponAsync } from "../services/coupon";
interface couponState {
  couponLoader: boolean;
    couponData: any[];
    removeLoader: boolean;
}

const initialState: couponState = {
  couponLoader: false,
  couponData: [],
  removeLoader: false
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(applyCouponAsync.pending), (state) => {
      state.couponLoader = true;
    });
    builder.addMatcher(
      isAnyOf(applyCouponAsync.fulfilled),
      (state, { payload }) => {
        state.couponLoader = false;
        state.couponData = payload;
      }
    );
    builder.addMatcher(isAnyOf(applyCouponAsync.rejected), (state) => {
      state.couponLoader = false;
      state.couponData = [];
    });
    // // login user
      builder.addMatcher(isAnyOf(removeCouponAsync.pending), (state) => {
       state.removeLoader = true; 
    });
    builder.addMatcher(
      isAnyOf(removeCouponAsync.fulfilled),
      (state, { payload }) => {
     state.removeLoader = false;
      }
    );
    builder.addMatcher(isAnyOf(removeCouponAsync.rejected), (state) => {
    state.removeLoader = false;
    });
  }
});

// export const {  } = usersSlice.actions;
export default couponSlice.reducer;
