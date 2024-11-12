import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getUploadSongOrderAsync = createAsyncThunk(
  "getReleases/getUploadSongOrderAsync",
  async (params: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/orders/upload-song",
      method: "get",
      params,
    })
);

export const createUploadAudioAsync = createAsyncThunk(
  "createReleases/createUploadSongOrderAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/orders/newReleases",
      method: "post",
      data,
    })
);

export const createAudioDetailsAsync = createAsyncThunk(
  "createReleases/createAudioDetailsAsync",
  async ({ data, id }: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/orders/newReleaseUpdateFirst/${id}`,
      method: "put",
      data
    })
);

export const getUploadAudioAsync = createAsyncThunk(
  "getReleases/getUploadSongOrderAsync",
  async (_, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/orders/newReleases",
      method: "get",
    })
);


export const postPlatformDataAsync = createAsyncThunk(
  "getReleases/getUploadSongOrderAsync",
  async ({ id, data }: { id: string, data: any }, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/orders/newReleasesUpdateThird/${id}`,
      method: "put",
      data
    })
);

export const postChecklistDataAsync = createAsyncThunk(
  "getReleases/getUploadSongOrderAsync",
  async ({ id, data }: { id: string; data: any }, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/orders/${id}/declaration`,
      method: "put",
      data
    })
);

export const getOrderByIdAsync = createAsyncThunk(
  "getReleases/getOrderByIdAsync",
  async ({ id }: { id: string }, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/orders/orderById/${id}`,
      method: "get",
    })
);

export const postTakeDownAsync = createAsyncThunk(
  "getReleases/getUploadSongOrderAsync",
  async ({ id, data }: { id: string; data: any }, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/orders/${id}/takedown-payment`,
      method: "post",
      data
    })
);