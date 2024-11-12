import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getOrdersDetailAsync } from "../services/ordersDetails";

interface OrderDetails {
    isLoading: boolean;
    orderDetailsList: any[];
    count: number;
    statusCode?: number;
    message?: string;
}

const initialState: OrderDetails = {
    isLoading: false,
    orderDetailsList: [],
    count: 0,
    statusCode: undefined,
    message: undefined,
};

const ordersDetailSlice = createSlice({
    name: "orderDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(getOrdersDetailAsync.pending), (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(isAnyOf(getOrdersDetailAsync.fulfilled), (state, {payload}) => {
            state.isLoading = false;
            state.orderDetailsList = payload.data;
            state.count = payload.count;
            state.statusCode = payload.statusCode;
            state.message = payload.message;
        });
        builder.addMatcher(isAnyOf(getOrdersDetailAsync.rejected), (state) => {
            state.isLoading = false;
        });
    },
});

export default ordersDetailSlice.reducer;
