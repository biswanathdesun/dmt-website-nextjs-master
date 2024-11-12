import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const getCreateProfessionalFirst = createAsyncThunk(
    "profile/ProfessionalFirst",
    async (_,toolkit) =>
        AxiosClient({
            toolkit,
            url: '/creative/deliver-my-tune',
            method: "get",
        })
);