import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const createCartPaymentAsync = createAsyncThunk(
  "cart/createCartPaymentAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/paymentSummary/addOrder",
      method: "post",
      data
    })
);

export const verifyPaymentAsync = createAsyncThunk(
  "cart/verifyPaymentAsync",
  async (data: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/payment/verifyPayment",
      method: "post",
      data
    })
);

export const createMasteringPaymentAsync = createAsyncThunk(
  "mastering/createMasteringPaymentAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/master-song/create-order",
      method: "post",
      data
    })
);

export const verifyMasterPaymentAsync = createAsyncThunk(
  "mastering/verifyMasterPaymentAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/master-song/validate-payment",
      method: "post",
      data
    })
);

export const createNewReleasePaymentAsync = createAsyncThunk(
  "release/createNewReleasePaymentAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/music-distribution/order-initiate",
      method: "post",
      data
    })
);

export const verifyNewReleasePaymentAsync = createAsyncThunk(
  "release/createNewReleasePaymentAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/music-distribution/payment-verification",
      method: "post",
      data
    })
);

