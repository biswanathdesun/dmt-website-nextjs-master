import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getRoyaltyReportByIdAsync, getRoyaltyLedgerByIdAsync } from "../services/royalty";

interface RoyaltyReports {
    royaltyReport: any,
    royaltyLoading: boolean,
    royaltyCount: number,
    royaltyLedger: any,
    ledgerLoading: boolean,
    ledgerCount: number,
}

const initialState: RoyaltyReports = {
    royaltyReport: [],
    royaltyLoading: false,
    royaltyCount: 0,
    royaltyLedger: [],
    ledgerLoading: false,
    ledgerCount: 0
};

const royaltySlice = createSlice({
    name: "royaltyData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Royalty report get //
        builder.addMatcher(isAnyOf(getRoyaltyReportByIdAsync.pending), (state) => {
            state.royaltyLoading = true;
        });
        builder.addMatcher(isAnyOf(getRoyaltyReportByIdAsync.fulfilled), (state, { payload }) => {
            state.royaltyLoading = false;
            state.royaltyReport = payload?.data; // Adjust this line
            state.royaltyCount = payload?.count;
        });
        builder.addMatcher(isAnyOf(getRoyaltyReportByIdAsync.rejected), (state) => {
            state.royaltyLoading = false;
            state.royaltyReport = [];
        });

        // Royalty ledger get //
        builder.addMatcher(isAnyOf(getRoyaltyLedgerByIdAsync.pending), (state) => {
            state.ledgerLoading = true;
        });
        builder.addMatcher(isAnyOf(getRoyaltyLedgerByIdAsync.fulfilled), (state, { payload }) => {
            state.ledgerLoading = false;
            state.royaltyLedger = payload.data; // Adjust this line
            state.ledgerCount = payload?.totalCount;
        });
        builder.addMatcher(isAnyOf(getRoyaltyLedgerByIdAsync.rejected), (state) => {
            state.ledgerLoading = false;
            state.royaltyLedger = [];
        });
    }
});

export default royaltySlice.reducer;
