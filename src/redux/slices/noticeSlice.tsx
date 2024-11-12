import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getNoticeListAsync, markAsReadNoticeAsync } from "../services/notice";
interface NoticeSlice {
    isNoticeLoading: boolean;
    noticeList: any[];
    isNoticeUpdating: boolean;
}

const initialState: NoticeSlice = {
    isNoticeLoading: false,
    noticeList: [],
    isNoticeUpdating: false,
};

const NoticeSlice = createSlice({
    name: "notice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Get Notice Data
        builder.addMatcher(
            isAnyOf(getNoticeListAsync.pending),
            (state, { payload }) => {
                state.isNoticeLoading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(getNoticeListAsync.fulfilled),
            (state, { payload }) => {
                state.isNoticeLoading = false;
                state.noticeList = payload?.data;
            }
        );
        builder.addMatcher(
            isAnyOf(getNoticeListAsync.rejected),
            (state, { payload }) => {
                state.isNoticeLoading = false;
                state.noticeList = [];
            }
        );

        // Notice Mark As Read
        builder.addMatcher(
            isAnyOf(markAsReadNoticeAsync.pending),
            (state) => {
                state.isNoticeUpdating = true;
            }
        );
        builder.addMatcher(
            isAnyOf(markAsReadNoticeAsync.fulfilled),
            (state) => {
                state.isNoticeUpdating = false;
            }
        );
        builder.addMatcher(
            isAnyOf(markAsReadNoticeAsync.rejected),
            (state) => {
                state.isNoticeUpdating = false;
            }
        );
    },
});

export default NoticeSlice.reducer;
