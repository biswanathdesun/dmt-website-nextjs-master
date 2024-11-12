import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getReleasesOrderAsync = createAsyncThunk(
  "getReleases/getReleasesOrderAsync",
  async (params: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/orders",
      method: "get",
      params,
    })
);

export const deleteReleaseOrderAsync = createAsyncThunk(
  "getReleases/deleteReleaseOrderAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/orders/delete",
      method: "post",
      data,
    })
);