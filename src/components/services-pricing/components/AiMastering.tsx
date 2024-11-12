/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomHeading from "@/components/common/CustomHeading";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  addToCartAsync,
  cartCountAsync,
  getCartAsync,
} from "@/redux/services/cart";
import toast from "react-hot-toast";
import { prices } from "@/components/common/JSONFolder/prices";
import { LoadingButton } from "@mui/lab";
import { setCartCount } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";

const aiMastering = "/gifs/AI-Mastering.gif";

interface cartItem {
  type: string;
  price?: number;
  productId?: string;
}
interface CartLoadingState {
  [productId: string]: boolean;
}

const arra = [
  {
    text: "Upload your song and let our AI do the magic.",
  },
  {
    text: "Enjoy a polished, high-quality sound.",
  },
  {
    text: "Enhanced Listening Experience.",
  },
  {
    text: "Make your music stand out.",
  },
];

const AiMastering = () => {
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());
  const token = localStorage?.getItem("token") ?? "";
  const isLoggedIn = token && token !== "null" && token !== "undefined";
  const [cartLoading, setCartLoading] = useState<CartLoadingState>({});
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const cartData = JSON.parse(localStorage.getItem("cart") || "[]");

  const getCart = () => {
    if (isLoggedIn) {
      dispatch(getCartAsync()).then((res: any) => {
        setCartItems(
          new Set(res.payload.data.map((item: any) => item.productId))
        );
      });
    } else {
      setCartItems(new Set(cartData.map((item: any) => item.productId)));
    }
  };

  const handleAddtoCart = (item: cartItem) => {
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
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingX: { xs: 0, sm: 6 },
          marginY: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <CustomHeading
          customStyles={{
            textAlign: "center",
          }}
          text={"AI Mastering"}
        />

        <Grid item xs={12} sx={{ px: { xs: "1rem", md: "90px" } }}>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
              color: "#555555",
              marginY: 4,
              textAlign: { xs: "justify", sm: "center" },
            }}
          >
            Enhance your music effortlessly with our AI Mastering tool. Just
            upload your song, and our advanced AI software will take care of the
            rest, elevating the sound quality to professional standards.
            Experience a richer, more polished final product that captivates
            your audience and enhances their listening experience. Let
            technology bring out the best in your music, making every note sound
            perfect
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <Grid container sx={{ gap: 1 }}>
          <Grid item xs={12} md={5.5}>
            <video
              width="100%"
              height="100%"
              autoPlay
              loop
              muted
              playsInline
              src="https://delivertune.s3.ap-south-1.amazonaws.com/videos/AIMastering.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              className="MainTitle"
              sx={{
                fontSize: { xs: 22, sm: 26, lg: 30 },
                textAlign: { sm: "left", md: "center", lg: "left" },
                pl: { xs: 0, sm: 3 },
                marginBottom: { xs: 1.5 },
              }}
            >
              Get your mastered track in no time
            </Typography>
            {arra.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: { xs: 2, md: 1, lg: 1 },
                  pl: { xs: 0, sm: 3.5 },
                  rowGap: { xs: 2, sm: 0 },
                  alignItems: "center",
                  fontSize: {
                    xs: "18px",
                    sm: "32px",
                    md: "20px",
                    lg: "32px",
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: "inherit",
                    margin: { md: 0.5, lg: 1 },
                  }}
                >
                  <Icon
                    icon="simple-line-icons:check"
                    style={{
                      color: "#FB8E0B",
                    }}
                  />
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "15px", md: "17px", lg: "25px" },
                    rowGap: { xs: 7, sm: 4, md: 2 },
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ marginY: 8, width: "100%", height: "100%" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="pricing table">
          <TableHead>
            <TableRow>
              {prices.map((item, index) => (
                <TableCell key={index} align="center" padding="none">
                  <Box
                    sx={{
                      backgroundColor: "#fff4e7",
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
                    {item.price && (
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
                            : handleAddtoCart(item);
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
    </Container>
  );
};

export default AiMastering;
