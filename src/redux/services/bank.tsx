import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const createBankDetailsAsync = createAsyncThunk(
  "/users/bank",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/users/bank",
      method: "put",
      data,
    })
);
export const getBankDetailsAsync = createAsyncThunk(
  "/users/getBankDetails",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "admin/artists/bank-details",
      method: "post",
      data,
    })
);
export const getAadharOtpRequestAsync = createAsyncThunk(
  "/users/getAadharOtpRequest",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "admin/artists/aadhaar/kyc/otp-request",
      method: "post",
      data,
    })
);
export const getVerifyAadharotpAsync = createAsyncThunk(
  "/users/getVerifyAadharotp",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "admin/artists/kyc/aadhaar-verify",
      method: "post",
      data,
    })
);
