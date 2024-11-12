import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getMainDashbordAsync } from "../services/mainDashboard";

interface DashboardData {
    earnings: number;
    releasedSongCount: number;
    inReviewSongCount: number;
    rejectSongCount: number;
}

interface UsersState {
    isLoading: boolean;
    mainDashboard: {
        data: DashboardData;
    } | null;
    error: string | null;
}

const initialState: UsersState = {
    isLoading: false,
    mainDashboard: null,
    error: null,
};

const mainDashboardSlice = createSlice({
    name: "mainDashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(getMainDashbordAsync.pending), (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addMatcher(isAnyOf(getMainDashbordAsync.fulfilled), (state, data) => {
            state.isLoading = false;
            state.mainDashboard = data.payload;
        });
        builder.addMatcher(isAnyOf(getMainDashbordAsync.rejected), (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});

export default mainDashboardSlice.reducer;
