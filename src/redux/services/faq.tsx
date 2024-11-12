import AxiosClient from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFAQCategoryAsync = createAsyncThunk('faq/category', async (data, toolkit) =>
    AxiosClient({
        toolkit,
        url: '/category',
        method: 'post',
        data,
    })
);

export const getFAQListByIdAsync = createAsyncThunk(
  "faq/getFAQListById",
  async (params: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/faq`,
      method: "get",
      params,
    })
);