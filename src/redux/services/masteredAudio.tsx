import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getMasterAudioAsync = createAsyncThunk(
  "getMaster/getMasterAudio",
  async (params: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/mastered",
      method: "get",
      params
    })
);
