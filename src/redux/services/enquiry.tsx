import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getEnquiryAsync = createAsyncThunk(
  "getMaster/getMasterAudio",
  async (id: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/creative/check/${id}`,
      method: "get",
    })
);