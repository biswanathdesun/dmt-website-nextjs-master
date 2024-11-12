import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getOneOrderDetailAsyn = createAsyncThunk(
    "dashboard/order-detail",
    async ({ id, data }: { id: string, data: any }, toolkit) =>
        AxiosClient({
            toolkit,
            url: `/purchase/orderDetails/${id}`,
            method: "get",
            data
        })
);