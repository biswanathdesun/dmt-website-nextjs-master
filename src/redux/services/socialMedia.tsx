import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";



export const createSocialMediaAsync = createAsyncThunk(
  "socialMedia/createSocialMediaAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/artist-social-media/create",
      method: "post",
      data
    })
);


export const getSocialMediaByIdAsync = createAsyncThunk(
  "socialMedia/getSocialMediaIdAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/artist-social-media/byUserId`,
      method: "get",
      data
    })
);


export const createSocialMediaOrderAsync = createAsyncThunk(
  "socialMedia/createSocialMediaOrderAsync",
  async (data : object, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/artist-social-media/orders-process`,
      method: "post",
      data
    })
);

export const verifySocialMediaOrderAsync = createAsyncThunk(
  "socialMedia/verifySocialMediaOrderAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/artist-social-media/transaction-process`,
      method: "post",
      data
    })
);

