import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getOrdersDetailAsync = createAsyncThunk(
    "dashboard/order-details",
    async (params: any, toolkit) =>
        AxiosClient({
            toolkit,
            url: "/purchase/orderHistory",
            method: "get",
            params
        })
);