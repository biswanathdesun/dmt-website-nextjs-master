import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getOneOrderDetailAsyn } from "../services/oneOrderDetail";
import { ReactNode } from "react";
interface Plan {
  quantity: ReactNode;
  _id: string;
  productName: string;
  price: number;
  planType: string;
  validity?: string;
  validityType?: string;
}

interface OrderDetail {
  orderId: string;
  dateOfPurchase: string;
  paymentStatus: string;
  subTotal: number;
  discountedAmount: number;
  total: number;
  donation: number;
  userName: string;
  userPhone: string;
  userEmail: string;
  couponCode: string | null;
  plans: Plan[];
}

interface OrderDetailState {
  isLoading: boolean;
  oneOrderDetail: { data?: OrderDetail };
  count: number;
}

const initialState: OrderDetailState = {
  isLoading: false,
  oneOrderDetail: { data: undefined },
  count: 0,
};

const OneOrderDetailSlice = createSlice({
  name: "oneOrderDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getOneOrderDetailAsyn.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getOneOrderDetailAsyn.fulfilled),
      (state, action) => {
        state.isLoading = false;
        state.oneOrderDetail = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(getOneOrderDetailAsyn.rejected), (state) => {
      state.isLoading = false;
    });
  },
});

export default OneOrderDetailSlice.reducer;
