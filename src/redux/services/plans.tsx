import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getPlansByTypeAsync = createAsyncThunk(
  "plans/getPlansByTypeAsync",
  async (params: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/admin/cart/planByType",
      method: "get",
      params
    })
);


export const getMasteringPlansByTypeAsync = createAsyncThunk(
  "plans/getMasteringPlansByTypeAsync",
  async (params: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/admin/cart/planByType",
      method: "get",
      params
    })
);

export const getPlanDetailAsync = createAsyncThunk(
  "plans/getPlanDetailAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/plans/user-plan-details",
      method: "post",
      data
    })
);