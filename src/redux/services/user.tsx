import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const verifyOtpAsync = createAsyncThunk(
  "users/verifyOtpAsync",
  async (data: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/authentication/mobile/verify-register-otp",
      method: "post",
      data,
    })
);

export const addUserAsync = createAsyncThunk(
  "users/addUsersAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/authentication/mobile/send-register-otp",
      method: "post",
      data,
    })
);

export const loginUserAsync = createAsyncThunk(
  "users/loginUserAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/authentication/local",
      method: "post",
      data,
    })
);

export const forgotPasswordAsync = createAsyncThunk(
  "authentication/local/forgot",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/authentication/local/forgot",
      method: "post",
      data,
    })
);

export const resetPasswordAsync = createAsyncThunk(
  "/authentication/local/reset",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/authentication/local/reset",
      method: "post",
      data,
    })
);

export const getUserByIdAsync = createAsyncThunk(
  "users/getUserByIdAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/users",
      method: "get",
      data,
    })
);

export const logoutUserAsync = createAsyncThunk(
  "User/logoutUserAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/authentication/local/logout",
      method: "post",
      data,
    })
);

