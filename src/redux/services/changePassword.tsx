import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const changePasswordAsync = createAsyncThunk(
    "contactus/postContact",
    async (data: any, toolkit) => {
     
        // Configure AxiosClient with the token in the headers
        return AxiosClient({
            toolkit,
            url: 'users/password',
            method: "put",
            data,
        });
    }
);
