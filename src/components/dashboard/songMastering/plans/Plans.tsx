"use client";
import CustomBreadcrumbs from "@/components/common/CustomBreadcrumbs";
import {
  addToCartAsync,
  cartCountAsync,
  getCartAsync,
} from "@/redux/services/cart";
import { AppDispatch } from "@/redux/store";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { prices } from "@components/common/JSONFolder/prices";
import { setCartCount } from "@/redux/slices/cartSlice";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";

interface Item {
  type: string;
  heading: string;
  productId: string;
  button?: string;
  credits: string;
  validity: string;
  price?: number;
}
interface CartLoadingState {
  [productId: string]: boolean;
}
const Plans = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());
  const token = localStorage?.getItem("token") ?? "";
  const isLoggedIn = token && token !== "null" && token !== "undefined";
  const [cartLoading, setCartLoading] = useState<CartLoadingState>({});
  const dispatch: AppDispatch = useDispatch();
  const cartData = JSON.parse(localStorage.getItem("cart") || "[]");

  const getCart = () => {
    dispatch(getCartAsync()).then((res: any) => {
      setCartItems(
        new Set(res.payload.data.map((item: any) => item.productId))
      );
    });
  };

  const handleAddToCart = (item: Item) => {
    const productId = item.productId as string;
    setCartLoading((prevState) => ({ ...prevState, [productId]: true }));
    if (!isLoggedIn) {
      const payload = {
        productName: item?.type,
        productId: item?.productId,
        price: item?.price,
        totalprice: item?.price,
        quantity: 1,
        productTypes: "AI Mastering",
      };

      // Add the new item to the cart
      cartData.push(payload);

      // Stringify the updated cart data and store it back in localStorage
      localStorage.setItem("cart", JSON.stringify(cartData));
      const totalItems = cartData?.length;
      getCart();
      dispatch(setCartCount(totalItems));
      toast.success("Item Added to Cart Successfully!", {
        position: "top-right",
      });
      setCartLoading((prevState) => ({
        ...prevState,
        [productId]: false,
      }));
      return;
    }
    const payload = {
      products: [
        {
          productId: item?.productId,
          price: item?.price,
        },
      ],
    };

    dispatch(addToCartAsync(payload))
      .then((res) => {
        if (res?.payload?.statusCode === 200) {
          getCart();
          dispatch(cartCountAsync());
          setCartLoading((prevState) => ({
            ...prevState,
            [productId]: false,
          }));
          toast.success("Item Added to Cart Successfully!", {
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        console.error(err); // Handle the error properly
      })
      .finally(() => {
        setCartLoading((prevState) => ({
          ...prevState,
          [productId]: false,
        }));
      });
  };

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomBreadcrumbs
        heading="Plans"
        activeLast
        sx={{ fontSize: "40px", fontWeight: "bolder", marginTop: 5 }}
        links={[]}
      />
      <Box>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", height: "100%" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="pricing table">
            <TableHead>
              <TableRow>
                {prices.map((item, index) => (
                  <TableCell key={index} align="center" padding="none">
                    <Box
                      sx={{
                        backgroundColor: "#fff4e9",
                        padding: "15px 24px",
                        height: "159.01px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "0.75px solid #E6E9F5",
                      }}
                    >
                      {item.heading && (
                        <Typography
                          sx={{
                            fontWeight: "700",
                            fontSize: "1rem",
                            textAlign: "center",
                            minWidth: "250px",
                          }}
                        >
                          {item.heading}
                        </Typography>
                      )}
                      {item.price !== undefined && (
                        <Typography
                          sx={{
                            fontWeight: "700",
                            fontSize: "1.5rem",
                            textAlign: "center",
                            marginY: 2,
                          }}
                        >
                          {`₹ ${item.price}`}
                        </Typography>
                      )}
                      {item.button && (
                        <LoadingButton
                          loading={cartLoading[item?.productId]}
                          variant="contained"
                          color="primary"
                          sx={{
                            width: "130.01px",
                            height: "36px",
                            mt: 2,
                            borderRadius: "75px",
                            backgroundColor: "#252430",
                            color: "#fff",
                            fontWeight: "700",
                            fontSize: "0.60rem",
                            "&:hover": {
                              backgroundColor: "#FB8E0B",
                            },
                          }}
                          loadingIndicator={
                            <CircularProgress
                              size={24}
                              sx={{ color: "#F17D10" }}
                            />
                          }
                          onClick={() => {
                            cartItems.has(item.productId || "")
                              ? router.push("/cart")
                              : handleAddToCart(item);
                          }}
                        >
                          {cartItems.has(item.productId || "")
                            ? "Go to Cart"
                            : "Add to Cart"}
                        </LoadingButton>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {prices.map((item, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ border: "0.75px solid #E6E9F5" }}
                  >
                    <Box
                      sx={{
                        border: "none",
                        padding: "none",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "0.938rem",
                        }}
                      >
                        {item.credits}
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {prices.map((item, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ border: "0.75px solid #E6E9F5" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "0.938rem",
                        }}
                      >
                        {item.validity}
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Plans;
