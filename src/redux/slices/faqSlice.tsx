
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {  getFAQCategoryAsync, getFAQListByIdAsync } from '../services/faq';

const initialState = {
    isLoading: false,
    isFAQLoading: false,
    alert: {
        type: '',
        message: '',
    },
    totalCount: 0,
    getFAQCategory: [],
    getFAQListById:[],
};

const faqSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {
        clearAlert(state) {
            state.alert = {
                type: '',
                message: '',
            };
        },
    },
    extraReducers: (builder) => {
        // get Faq ----------
        builder.addMatcher(isAnyOf(getFAQCategoryAsync.pending), (state, { payload }) => {
            state.isLoading = true;
        });
        builder.addMatcher(isAnyOf(getFAQCategoryAsync.fulfilled), (state, { payload }) => {
            state.isLoading = false;
            state.totalCount = payload?.count;
            state.getFAQCategory = payload?.data;
        });
        builder.addMatcher(isAnyOf(getFAQCategoryAsync.rejected), (state, { payload }) => {
            state.isLoading = false;
            state.getFAQCategory = [];
        });
        // Get faq By Id ----------

        builder.addMatcher(isAnyOf(getFAQListByIdAsync.pending), (state, { payload }) => {
            state.isFAQLoading = true;
        });
        builder.addMatcher(isAnyOf(getFAQListByIdAsync.fulfilled), (state, { payload }) => {
            state.isFAQLoading = false;
            state.getFAQListById = payload?.data;
        });
        builder.addMatcher(isAnyOf(getFAQListByIdAsync.rejected), (state, { payload }) => {
            state.isFAQLoading = false;
            state.getFAQListById = [];
        });
      
    },
});

export const { clearAlert } = faqSlice.actions;
export default faqSlice.reducer;
