import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { postReferralsAsync } from "../services/referrals";
import { Key } from "react";

interface ReferralsState {
    isLoading: boolean;
    data: {
        referralCode: string;
        coins: number;
        transaction: {
            _id: Key | null | undefined;
           // _id: Key | null | undefined;
            user: string;
            role: string;
            credit: number;
            amount: number;
            transactionType: string;
        }[];
    } | null;
    count: number;
}

const initialState: ReferralsState = {
    isLoading: false,
    data: null,
    count:0
};

const ReferralSlice = createSlice({
    name: "referrals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(postReferralsAsync.pending), (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(isAnyOf(postReferralsAsync.fulfilled), (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data; // Make sure this path matches your API response
        });
        builder.addMatcher(isAnyOf(postReferralsAsync.rejected), (state) => {
            state.isLoading = false;
        });
    },
});

export default ReferralSlice.reducer;
