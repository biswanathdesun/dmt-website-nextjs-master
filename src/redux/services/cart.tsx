import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../utils/axios";

export const addToCartAsync = createAsyncThunk(
  "users/addToCartAsync",
  async (data: any, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/admin/cart/addToCart",
      method: "post",
      data
    })
);

export const getCartAsync = createAsyncThunk(
  "users/getCartAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/admin/cart/getCart",
      method: "get",
      data
    })
);

export const deleteCartAsync = createAsyncThunk(
  "users/deleteCartAsync",
  async (id: string, toolkit) => {
    return AxiosClient({
      toolkit,
      url: `/admin/cart/deleteCart/${id}`,
      method: "delete"
    });
  }
);

export const updateCartAsync = createAsyncThunk(
  "users/updateCartAsync",
  async ({ id, data }: { id: string; data: object }, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/admin/cart/updateCart/${id}`,
      method: "put",
      data
    })
);


export const paymentSummaryAsync = createAsyncThunk(
  "users/paymentSummaryAsync",
  async ( data:object , toolkit) =>
    AxiosClient({
      toolkit,
      url: `/paymentSummary`,
      method: "post",
      data
    })
);

export const cartCountAsync = createAsyncThunk(
  "users/cartCountAsync",
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/admin/cart/cartCount`,
      method: "get",
      data
    })
);