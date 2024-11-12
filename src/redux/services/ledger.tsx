import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getLedgerAsync = createAsyncThunk(
  "coins/getLedgerAsync",
  async (data:object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/song-transaction/transaction-details",
      method: "post",
      data,
    })
);

export const getCoinsAsync = createAsyncThunk(
  "coins/getCoinsAsync",
  async (params: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/wallet",
      method: "get",
      params,
    })
);
