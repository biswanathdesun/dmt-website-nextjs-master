import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getNoticeListAsync = createAsyncThunk(
    "getNotice/getNoticeList",
    async (data: any, toolkit) =>
        AxiosClient({
            toolkit,
            url: "/admin/notice/web",
            method: "post",
        })
);
export const markAsReadNoticeAsync = createAsyncThunk(
    "markNotice/markAsReadNotice",
    async (data: any, toolkit) =>
        AxiosClient({
            toolkit,
            url: "/admin/notice/update",
            method: "patch",
            data,
        })
);
