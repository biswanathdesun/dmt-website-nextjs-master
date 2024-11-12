import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getMainDashbordAsync = createAsyncThunk(
    "main/dashboard",
    async (data, toolkit) =>
        AxiosClient({
            toolkit,
            url: "/royalty/user-dashboard",
            method: "get",
            data,
        })
);