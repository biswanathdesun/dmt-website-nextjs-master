import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const applyCouponAsync = createAsyncThunk(
  "users/applyCoupon",
  async (data: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/paymentSummary/applyCoupon",
      method: "post",
      data
    })
);

export const removeCouponAsync = createAsyncThunk(
  "users/applyCoupon",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/paymentSummary/removeCoupon",
      method: "put",
      data
    })
);

