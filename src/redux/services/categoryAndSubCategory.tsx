import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "@/utils/axios";

// Get Category By Type for Help And Video ------------------------
export const getCategoryByTypeAsync = createAsyncThunk(
  "getHelpCategory/getCategoryByType",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/category/type",
      method: "post",
      data,
    })
);

// Get Sub-Category By Type ------------------------
export const getSubCategoryByCategoryAsync = createAsyncThunk(
  "subCategory/getSubCategoryByCategory",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/category/sub-category/type-list",
      method: "post",
      data,
    })
);
