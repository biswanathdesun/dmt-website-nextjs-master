import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { cartCountAsync, getCartAsync, paymentSummaryAsync, updateCartAsync } from "../services/cart";
import { createBankDetailsAsync, getAadharOtpRequestAsync, getBankDetailsAsync } from "../services/bank";

interface bankState {
  isLoading: boolean;
  isSubmitting: boolean;
  bankData: any;
  count: number;
  aadharLoading:boolean;
  aadharData: {
    reference_id: string;
  };
}

const initialState: bankState = {
  isLoading: false,
  isSubmitting: false,
  bankData: [],
  count: 0,
  aadharLoading:false,
  aadharData: {
    reference_id:''
  }
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    incrementCartCount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    },
  
// ---------- Post Bank Details--------
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(createBankDetailsAsync.pending), (state) => {
      state.isSubmitting = true;
    });

    builder.addMatcher(
      isAnyOf(createBankDetailsAsync.fulfilled),
      (state, { payload }) => {
        state.isSubmitting = false;
      }
    );
    builder.addMatcher(isAnyOf(createBankDetailsAsync.rejected), (state) => {
      state.isSubmitting = false;
    });
    //   --------------------
  
      //   Get Bank Details
    builder.addMatcher(isAnyOf(getBankDetailsAsync.pending), (state) => {
      state.isLoading = true;
    });

    builder.addMatcher(
      isAnyOf(getBankDetailsAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.bankData = payload?.data;
      }
    );
    builder.addMatcher(isAnyOf(getBankDetailsAsync.rejected), (state) => {
      state.isLoading = false;
      state.bankData = [];
    });

    //
        builder.addMatcher(
          isAnyOf(getAadharOtpRequestAsync.pending),
          (state) => {
            state.aadharLoading = true;
          }
        );

        builder.addMatcher(
          isAnyOf(getAadharOtpRequestAsync.fulfilled),
          (state, { payload }) => {
            state.aadharLoading = false;
            state.aadharData = payload?.data;
          }
        );
        builder.addMatcher(
          isAnyOf(getAadharOtpRequestAsync.rejected),
          (state) => {
            state.aadharLoading=false;
          }
        );
    
    },
    //   --------------------
  
  

});
export const { setCartCount, incrementCartCount } = bankSlice.actions;
export default bankSlice.reducer;