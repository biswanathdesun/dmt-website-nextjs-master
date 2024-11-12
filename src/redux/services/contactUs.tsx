import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const postContactAsync = createAsyncThunk(
    "contactus/postContact",
    async (data: any, toolkit) =>
        AxiosClient({
            toolkit,
            url: '/public/contacts',
            method: "post",
            data
        })
);