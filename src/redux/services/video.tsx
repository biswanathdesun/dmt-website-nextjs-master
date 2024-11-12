import AxiosClient from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getVideoCategoryAsync = createAsyncThunk('video/category', async (data, toolkit) =>
    AxiosClient({
        toolkit,
        url: 'admin/category',
        method: 'get',
        data,
    })
);

export const getVideoSubCategoryAsync = createAsyncThunk('video/subCategory', async (id: string, toolkit) =>
    AxiosClient({
        toolkit,
        url: `admin/sub-category/${id}`,
        method: 'get',
    })
);

export const getByIdVideoAsync = createAsyncThunk(
    'video/getByIdFaq',
    async (data: any, toolkit) =>
        AxiosClient({
            toolkit,
            url: `admin/video-library/byCategoryId`,
            method: 'post',
            data
        })
);

export const videoListByCategoryIdAsync = createAsyncThunk(
  "video/videoListByCategoryId",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/admin/video-library/byCategoryId",
      method: "post",
      data,
    })
);