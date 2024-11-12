import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const updateUsersDetailsAsync = createAsyncThunk(
  "/updateusers",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/users",
      method: "put",
      data,
    })
);

export const getUsersDetailsAsync = createAsyncThunk(
  "/getusers",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/users",
      method: "get",
      data,
    })
);
