import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createCartPaymentAsync, verifyPaymentAsync } from "../services/createPayment";
interface UsersState {
    isSubmitting: boolean;
    isVerifying: boolean;
}

const initialState: UsersState = {
    isSubmitting: false,
    isVerifying: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add payment ----------
    builder.addMatcher(isAnyOf(createCartPaymentAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(createCartPaymentAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(createCartPaymentAsync.rejected), (state) => {
      state.isSubmitting = false;
    });

    //verify payment
    builder.addMatcher(isAnyOf(verifyPaymentAsync.pending), (state) => {
      state.isVerifying = true;
    });
    builder.addMatcher(isAnyOf(verifyPaymentAsync.fulfilled), (state) => {
      state.isVerifying = false;
    });
    builder.addMatcher(isAnyOf(verifyPaymentAsync.rejected), (state) => {
      state.isVerifying = false;
    });
 

  }
});

// export const {  } = usersSlice.actions;
export default paymentSlice.reducer;
