import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { cartCountAsync, getCartAsync, paymentSummaryAsync, updateCartAsync } from "../services/cart";

interface cartState {
  isLoading: boolean;
  cartDetails: any[];
  summary: object;
  updateLoading: boolean;
  couponLoading: boolean;
  couponData: any[];
  cartCount: number;
  count: number;
  incrementCount: number;
}

const initialState: cartState = {
  isLoading: false,
  cartDetails: [],
  summary: {},
  couponLoading: false,
  couponData: [],
  cartCount: 0,
  count: 0,
  incrementCount: 0,
  updateLoading:false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    incrementCartCount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    }
  },
  extraReducers: (builder) => {
    // Add User ----------
    builder.addMatcher(isAnyOf(getCartAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getCartAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.cartDetails = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(updateCartAsync.rejected), (state) => {
      state.updateLoading = false;
    });

     builder.addMatcher(isAnyOf(updateCartAsync.pending), (state) => {
       state.updateLoading = true;
     });
     builder.addMatcher(
       isAnyOf(getCartAsync.fulfilled),
       (state, { payload }) => {
         state.updateLoading = false;
       }
     );
     builder.addMatcher(isAnyOf(updateCartAsync.rejected), (state) => {
       state.isLoading = false;
       state.cartDetails = [];
     });


    // // payment summary
    builder.addMatcher(isAnyOf(paymentSummaryAsync.pending), (state) => {});
    builder.addMatcher(
      isAnyOf(paymentSummaryAsync.fulfilled),
      (state, { payload }) => {
        state.summary = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(paymentSummaryAsync.rejected), (state) => {
      state.summary = {};
    });
    //cart count
    builder.addMatcher(isAnyOf(cartCountAsync.pending), (state) => {});
    builder.addMatcher(
      isAnyOf(cartCountAsync.fulfilled),
      (state, { payload }) => {
        state.cartCount = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(cartCountAsync.rejected), (state) => {
      state.cartCount = 0;
    });
  }
});

export const { setCartCount, incrementCartCount } = cartSlice.actions;
export default cartSlice.reducer;
