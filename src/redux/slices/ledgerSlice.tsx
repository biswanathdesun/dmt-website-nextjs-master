import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { applyCouponAsync, removeCouponAsync } from "../services/coupon";
import { getCoinsAsync, getLedgerAsync } from "../services/ledger";
interface couponState {
  ledgerLoader: boolean;
  coinsLoader: boolean;
  ledgerData: any[];
  ledgerCoinData: any[];
  removeLoader: boolean;
}

const initialState: couponState = {
  ledgerLoader: false,
  coinsLoader: false,
  ledgerData: [],
  ledgerCoinData: [],
  removeLoader: false,
};

const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // 4 Ledeger Tabs
    builder.addMatcher(isAnyOf(getLedgerAsync.pending), (state) => {
      state.ledgerLoader = true;
    });
    builder.addMatcher(
      isAnyOf(getLedgerAsync.fulfilled),
      (state, { payload }) => {
        state.ledgerLoader = false;
        state.ledgerData = payload;
      }
    );
    builder.addMatcher(isAnyOf(getLedgerAsync.rejected), (state) => {
      state.ledgerLoader = false;
      state.ledgerData = [];
    });
    // ----------------

    // 4 Ledeger Tabs
    builder.addMatcher(isAnyOf(getCoinsAsync.pending), (state) => {
      state.coinsLoader = true;
    });
    builder.addMatcher(
      isAnyOf(getCoinsAsync.fulfilled),
      (state, { payload }) => {
        state.coinsLoader = false;
        state.ledgerCoinData = payload;
      }
    );
    builder.addMatcher(isAnyOf(getCoinsAsync.rejected), (state) => {
      state.coinsLoader = false;
      state.ledgerCoinData = [];
    });
    // ----------------
  },
});

// export const {  } = usersSlice.actions;
export default ledgerSlice.reducer;
