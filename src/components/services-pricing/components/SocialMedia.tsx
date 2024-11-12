"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Grid,
  Box,
  Stack,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CardContent, Typography, Card, CardMedia } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addToCartAsync,
  cartCountAsync,
  getCartAsync,
} from "@/redux/services/cart";
import { AppDispatch } from "@/redux/store";
import { setCartCount } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import CustomHeading from "@/components/common/CustomHeading";
import ParagraphText from "@components/common/Paragraph";
import SocialPop from "./SocialPop";
import { Token } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";

const SocialMedia = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const token = localStorage?.getItem("token");
  const [cartItems, setCartItems] = useState(false);
  const isLoggedIn = token && token !== "null" && token !== "undefined";
  const [cartLoading, setCartLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false); // State to control the popup
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  const getCart = () => {
    if (isLoggedIn) {
      dispatch(getCartAsync()).then((res: any) => {
        const itemsInCart = res?.payload?.data?.some(
          (item: any) => item.productId === "10"
        );
        setCartItems(itemsInCart);
      });
    } else {
      const itemsInCart = cartData.some((item: any) => item.productId === "10");
      setCartItems(itemsInCart);
    }
  };

  const handleAddtoCart = () => {
    const productId = "10";
    setCartLoading(true);
    if (!isLoggedIn) {
      const payload = {
        productName: "",
        productId: "10",
        price: 24999,
        totalprice: 24999,
        quantity: 1,
        productTypes: "Social Media Management",
      };

      cartData.push(payload);
      localStorage.setItem("cart", JSON.stringify(cartData));
      const totalItems = cartData?.length;
      getCart();
      dispatch(setCartCount(totalItems));
      toast.success("Item Added to Cart Successfully!", {
        position: "top-right",
      });
      setCartLoading(false);
      setOpenPopup(true); // Open the popup
      return;
    }

    const payload = {
      products: [
        {
          productId: "10",
          price: 24999,
        },
      ],
    };

    dispatch(addToCartAsync(payload))
      .then((res) => {
        if (res?.payload?.statusCode === 200) {
          getCart();
          dispatch(cartCountAsync());
          setCartLoading(false);
          toast.success("Item Added to Cart Successfully!", {
            position: "top-right",
          });
          setOpenPopup(true); // Open the popup
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCartLoading(false);
      });
  };

  useEffect(() => {
    const video1 = videoRef1.current;
    if (video1) {
      video1.muted = true;
      video1.play().catch((error) => {
        console.error("Error attempting to play video:", error);
      });
    }
  }, []);

  let arr = [
    {
      url: "/images/10x.png",
      title: "10x Growth",
      content: "In Playlist Feature & Exposure",
    },
    {
      url: "/images/8x.png",
      title: "8x Increase",
      content: "In social media followers & Engagement",
    },
    {
      url: "/images/5x.png",
      title: "5x Boost",
      content: "In overall fanbase and online interactions",
    },
  ];

  return (
    <>
      <Container>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingX: { xs: 0, sm: 6 },
            marginY: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <CustomHeading
            customStyles={{ textAlign: "center" }}
            text={"Social Media Management"}
          />
        </Grid>
        <Grid container spacing={4} sx={{ px: { xs: "1rem", md: "0px" }  }}>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
                color: "#555555",
                marginY:2,
                textAlign: { xs: "justify", sm: "flex-start" },
              }}
            >
              Imagine having a vibrant, engaging online persona that
              consistently attracts new followers and keeps existing fans
              excited. With tailored content and strategic engagement, your
              music can reach further than ever before. Regular updates and
              professional-looking profiles make it easier for listeners to
              discover and connect with your work.
            </Typography>
          </Grid>
          <Grid item md={1}></Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            <video
              width="100%"
              preload="auto"
              autoPlay
              loop
              muted
              playsInline
              src="https://delivertune.s3.ap-south-1.amazonaws.com/videos/SocialMedia.mp4"
            >
              source
            </video>
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginY: 3,
        }}
      >
        {arr.map((c, index) => (
          <Card key={index} sx={{ maxWidth: 350, margin: "15px" }}>
            <CardMedia
              component="img"
              height="200"
              image={c.url}
              alt={c.title}
              style={{ width: "100%", height: "auto" }}
            />
            <CardContent>
              <Typography
                gutterBottom
                component="div"
                sx={{
                  fontFamily: "Raleway",
                  fontWeight: "600",
                  fontSize: "3rem",
                  cololr: "#000000",
                }}
              >
                {c.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "1.5rem",
                  color: "#555555",
                }}
              >
                {c.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
      <Container sx={{ marginY: 4 }}>
        <Card
          sx={{
            backgroundColor: "#0B0C10",
            borderRadius: "20px",
            flexDirection: "column",
            textAlign: "start",
            padding: 5,
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "40px",
              color: "#FFFFFF",
              marginBottom: "12px",
              fontFamily: "Raleway",
              [theme.breakpoints.down("xs")]: {
                fontSize: "30px", // Adjust font size for xs screen
                wordBreak: "break-word",
                whiteSpace: "normal",
              },
            }}
          >
            Starting with ₹{" "}
            <span style={{ fontFamily: "Poppins" }}>24,999/</span>
            {isXs ? <br /> : " "}
            month
          </Typography>
          <Box
            sx={{
              display: { md: "flex", xs: "grid" },
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "17px",
                color: "#FFFFFF",
                marginBottom: "24px",
                float: "left",
                marginTop: 1,
              }}
            >
              Let Deliver My Tune help you boost your music career
            </Typography>
            <Stack spacing={2} direction={{ md: "row", xs: "column" }}>
              <Box>
                <LoadingButton
                  variant="outlined"
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                    border: "2px solid white",
                    borderRadius: "50px",
                    "&:hover": {
                      color: "#0B0C10",
                      border: "2px solid white",
                      backgroundColor: "white",
                    },
                    ...(cartLoading && {
                      backgroundColor: "#252430",
                      color: "white",
                    }),
                  }}
                  loading={cartLoading}
                  loadingIndicator={
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  }
                  onClick={() =>
                    cartItems ? router.push("/cart") : handleAddtoCart()
                  }
                >
                  {cartItems ? "Go To Cart" : "Add To Cart"}
                </LoadingButton>
              </Box>
              <Box>
                {token ? null : (
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      textTransform: "capitalize",
                      border: "2px solid white",
                      borderRadius: "50px",
                      "&:hover": {
                        color: "#0B0C10",
                        border: "2px solid white",
                        backgroundColor: "white",
                      },
                    }}
                  >
                    Sign Up Now
                  </Button>
                )}
              </Box>
            </Stack>
          </Box>
        </Card>
      </Container>
      <Dialog open={openPopup} maxWidth="lg">
        <DialogTitle>Services Offered</DialogTitle>
        <DialogContent>
          <SocialPop />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => setOpenPopup(false)}
              variant="contained"
              color="primary"
              sx={{ color: "#fff" }}
            >
              Continue
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialMedia;
