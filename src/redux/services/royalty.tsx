import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getRoyaltyReportByIdAsync = createAsyncThunk(
    "getRoyaltyReport/getRoyaltyReportByIdAsync",
    async ({ data }: { data: any }, toolkit) =>
        AxiosClient({
            toolkit,
            url: `/royalty`,
            method: "post",
            data,
        })
);

export const getRoyaltyLedgerByIdAsync = createAsyncThunk(
    "getRoyaltyLedger/getRoyaltyLedgerByIdAsync",
    async ({ id, params }: { id: string, params: any }, toolkit) =>
        AxiosClient({
            toolkit,
            url: `/royalty/ledger/${id}`,
            method: "get",
            params,
        })
);