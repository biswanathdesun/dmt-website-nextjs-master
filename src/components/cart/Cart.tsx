/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
// import sum from "lodash/sum";
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  TableContainer,
  TableBody,
  Table,
  Container,
  CircularProgress,
  Box
} from "@mui/material";

import EmptyContent from "@components/empty-content/EmptyContent";
import emptyCartImage from "@public/images/illustration_empty_cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import CheckoutCartProduct from "./CheckoutCartProduct";
import CartSummary from "./CartSummary";
import { AppDispatch } from "@/redux/store";
import Navbar from "../common/navbar/Navbar";
import Scrollbar from "../common/scrollbar/Scrollbar";
import {
  cartCountAsync,
  deleteCartAsync,
  getCartAsync,
  paymentSummaryAsync,
  updateCartAsync
} from "@/redux/services/cart";
import { TableHeadCustom } from "../common/table";

// ----------------------------------------------------------------------

interface HeadCell {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
  minWidth?: string;
}
interface CartItem {
  _id: string;
  quantity: number;
  price: number;
  totalPrice: number;
  productTypes: string;
  bookType?: string;
  languageId?: string;
  productId?: string; // Add any missing properties here based on your actual data structure
}

const TABLE_HEAD: readonly HeadCell[] = [
  { id: "product", label: "Product" },
  { id: "price", label: "Price" },
  { id: "quantity", label: "Quantity" },
  { id: "totalPrice", label: "Total Price", align: "right" },
  { id: "", label: "" },
] as const;

export default function CheckoutCart() {
  const dispatch: AppDispatch = useDispatch();

  const [changeCount, setChangeCount] = useState(false);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [cartItemQuantity, setCartItemQuantity] = useState<number[]>([]);
  const [changeStatus, setChangeStatus] = useState(false);
  const [couponValue, setCouponValue] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [rowData, setRowData] = useState<CartItem | null>(null);
  const { cartDetails, isLoading, summary, updateLoading, isWalletAdded } =
    useSelector((store: any) => store?.cart);
  const [checked, setChecked] = useState(isWalletAdded || false);
  useEffect(() => {
    const cartValue = isLoggedIn
      ? cartDetails
      : JSON.parse(localStorage.getItem("cart") ?? "[]") || [];
    setCartData(cartValue);
  }, [cartDetails]);

  const totalItems = cartData?.length;

  const isEmptyCart = !cartData?.length;

  const onDeleteRow = async (row: CartItem) => {
    if (isLoggedIn) {
      const id = row?._id;
      dispatch(deleteCartAsync(id)).then((res) => {
        if (res?.payload?.statusCode === 200) {
          setOpenConfirm(false);
          dispatch(getCartAsync()).then((res: any) => {
            if (res?.payload?.statusCode === 200) {
              setCartData(res?.payload?.data);
            }
          });
            dispatch(paymentSummaryAsync({isWallet:checked}));
          dispatch(cartCountAsync());
        }
      });
    } else {
      const updatedCartData = cartData?.filter(
        (item) => item.productId !== row.productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartData));
      setCartData(updatedCartData);
      setChangeCount(!changeCount);
      setOpenConfirm(false);
      toast.success("Item Deleted from cart Successfully!", {
        position: "top-right"
      });
    }
  };
  const totalCartPrice =
    cartData?.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    ) ?? 0;

  const token = localStorage?.getItem("token") ?? "";
  const isLoggedIn = token && token !== "null" && token !== "undefined";

  const onIncreaseQuantity = (row: CartItem) => {
    if (isLoggedIn) {
      const data = { quantity: row?.quantity + 1 };
      dispatch(updateCartAsync({ id: row?._id, data })).then(() => {
        dispatch(getCartAsync()).then((res: any) => {
          setCartData(res?.payload?.data);
          setChangeStatus(!changeStatus);
        });
        dispatch(paymentSummaryAsync({isWallet:checked}));
      });
    } else {
      const existingCartData =
        JSON.parse(localStorage.getItem("cart") ?? "[]") || [];
      const existingItemIndex = existingCartData.findIndex(
        (cartItem: any) => cartItem.productId === row?.productId
      );

      if (existingItemIndex !== -1) {
        existingCartData[existingItemIndex].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(existingCartData));
        setCartData(existingCartData);
        setChangeCount(!changeCount);
      }
    }
  };

  const onDecreaseQuantity = (row: CartItem) => {
    if (isLoggedIn) {
      const data = { quantity: row?.quantity - 1 };
      dispatch(updateCartAsync({ id: row?._id, data })).then(() => {
        dispatch(getCartAsync()).then((res: any) => {
          setCartData(res?.payload?.data);
          setChangeStatus(!changeStatus);
        });
        dispatch(paymentSummaryAsync({isWallet:checked}));
      });
    } else {
      const existingCartData =
        JSON.parse(localStorage.getItem("cart") ?? "[]") || [];
      const existingItemIndex = existingCartData.findIndex(
        (cartItem: any) => cartItem.productId === row?.productId
      );

      if (existingItemIndex !== -1) {
        existingCartData[existingItemIndex].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(existingCartData));
        setCartData(existingCartData);
        setChangeCount(!changeCount);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCartAsync());
      dispatch(paymentSummaryAsync({isWallet:checked})).then((res) => {
        if (res?.payload?.couponCode) {
          setCouponValue(res?.payload?.couponCode?.code);
        }
      });
    }
  }, [isLoggedIn, dispatch]);
  
  return (
    <>
      <Navbar />
      {isLoading ? (
        <Box
          sx={{
            height: "70vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Container sx={{ mt: "30px !important" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  mb: 3,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
                  borderRadius: 4
                }}
              >
                <CardHeader
                  title={
                    <Typography variant="h6">
                      Cart
                      <Typography
                        component="span"
                        sx={{ color: "text.secondary" }}
                      >
                        &nbsp;({totalItems} item)
                      </Typography>
                    </Typography>
                  }
                  sx={{ mb: 3 }}
                />

                {!isEmptyCart ? (
                  <TableContainer sx={{ overflow: "unset" }}>
                    <Scrollbar>
                      <Table sx={{ minWidth: 720 }}>
                        <TableHeadCustom
                          headLabel={TABLE_HEAD}
                          sx={{ backgroundColor: " #F8F8F8" }}
                        />

                        <TableBody>
                          {cartData?.map((row, index) => (
                            <CheckoutCartProduct
                              key={index}
                              row={row}
                              setCartItemQuanity={setCartItemQuantity}
                              cartItemQuanity={cartItemQuantity}
                              isDeleting={false} // changes required after api
                              isLoggedIn={isLoggedIn}
                              isLoading={updateLoading} 
                              rowData={rowData}
                              setRowData={setRowData}
                              onDelete={(item) => onDeleteRow(item)}
                              onDecrease={() => onDecreaseQuantity(row)}
                              onIncrease={() => onIncreaseQuantity(row)}
                              setOpenConfirm={setOpenConfirm}
                              openConfirm={openConfirm}
                              setCartdata={setCartData}
                              couponValue={couponValue}
                              setCouponValue={setCouponValue}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </Scrollbar>
                  </TableContainer>
                ) : (
                  <EmptyContent
                    title="Cart is empty"
                    description="Look's like you have no items in your shopping cart."
                    img={emptyCartImage}
                  />
                )}
              </Card>
            </Grid>

            {/* ------------------------------- cart Summary -------------------- */}
            <Grid item xs={12} md={4}>
              {!isEmptyCart && (
                <CartSummary
                  isEmptyCart={isEmptyCart}
                  isLoggedin={isLoggedIn}
                  totalCartPrice={totalCartPrice}
                  paymentSummary={summary}
                  couponValue={couponValue}
                  setCouponValue={setCouponValue}
                    productType={cartData[0]?.productTypes}
                    checked={checked}
                    setChecked={setChecked}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
