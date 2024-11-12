import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const postReferralsAsync = createAsyncThunk(
    "wallet/referrals",
    async (params: any, toolkit) =>
        AxiosClient({
            toolkit,
            url: "/users/refer_transaction",
            method: "post",
            params
        })
);