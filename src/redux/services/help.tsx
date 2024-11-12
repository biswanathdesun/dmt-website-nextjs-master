import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "@/utils/axios";

export const getHelpCategoryAsync = createAsyncThunk(
    'HelpCategory/getHelpCategoryList',
    async (
        data: object,
        toolkit
    ) => AxiosClient({
        toolkit,
        url: '/category/type',
        method: 'post',
        data
    })
)

export const helpCenterAsync = createAsyncThunk(
  "HelpCenter/getHelpCenterList",
  async (data: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/category/sub-category/type-list",
      method: "post",
      data
    })
);

export const helpCenterByCategoryIdAsync = createAsyncThunk(
  "HelpCenter/helpCenterByCategoryIdAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "admin/help-center/byCategoryId",
      method: "post",
      data,
    })
);

export const helpCenterContentBySlugAsync = createAsyncThunk(
  "HelpCenter/helpCenterContentBySlug",
  async (data: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/admin/help-center/by-slug",
      method: "post",
      data,
    })
);