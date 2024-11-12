/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CustomHeading from "@/components/common/CustomHeading";
import { addToCartAsync, cartCountAsync, getCartAsync } from "@/redux/services/cart";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { setCartCount } from "@/redux/slices/cartSlice";
import { LoadingButton } from "@mui/lab";
// import Contactus from "@/components/services/components/prices/footer/Contactus";

interface cartItem {
  type: string;
  price: number;
  productId?: string;
}
interface CartLoadingState {
  [productId: string]: boolean;
}
const Portfolio = () => {
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
        productTypes: "Portfolio"
      };

      // Add the new item to the cart
      cartData.push(payload);

      // Stringify the updated cart data and store it back in localStorage
      localStorage.setItem("cart", JSON.stringify(cartData));
      const totalItems = cartData?.length
      getCart();
      dispatch(setCartCount(totalItems));
      toast.success("Item Added to Cart Successfully!", {
        position: "top-right"
      });
      setCartLoading((prevState) => ({
        ...prevState,
        [productId]: false
      }));
      return;
    }
    const payload = {
      products: [
        {
          productId: item?.productId,
          price: item?.price
        }
      ]
    };

    dispatch(addToCartAsync(payload))
      .then((res) => {
        if (res?.payload?.statusCode === 200) {
          getCart()
          dispatch(cartCountAsync());
          setCartLoading((prevState) => ({
            ...prevState,
            [productId]: false
          }));
          toast.success("Item Added to Cart Successfully!", {
            position: "top-right"
          });
        }
      })
      .catch((err) => {
        console.error(err); // Handle the error properly
      })
      .finally(() => {
        setCartLoading((prevState) => ({
          ...prevState,
          [productId]: false
        }));
      });
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      {" "}
      <Grid
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingX: { xs: 0, sm: 6 },
          marginY: { xs: 2, sm: 4, md: 6 }
        }}
      >
        <CustomHeading
          customStyles={{
            textAlign: "center"
          }}
          text={"Portfolio"}
        />

        <Grid item xs={12} sx={{ px: { xs: "1rem", md: "90px" } }}>
          <Typography
            // variant="body1"
            sx={{
              fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
              color: "#555555",
              marginY: 4,
              textAlign: { xs: "justify", sm: "center" }
            }}
          >
            Unveil your talent with our one-page Artist Portfolio. This sleek,
            professional hub is designed to engage your audience and showcase
            your artistic journey. With everything beautifully organized in one
            place, your fans will stay connected and captivated.
          </Typography>
        </Grid>

        {/* <Box> */}
        <Grid container marginY={{ xs: 1, sm: 1, md: 4 }} spacing={1}>
          {portfolioData.map((item, index) => (
            <Grid
              item
              lg={4}
              xs={12}
              sm={12}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
                alignItems: "center",
                backgroundColor: "#fff4e7",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  rowGap: 2,
                  textAlign: "center", // Center text
                  pt: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: {
                      xs: "1.5rem", // Smaller font size on extra small screens
                      md: "1.875rem" // Default font size on medium and larger screens
                    },
                    lineHeight: "2.198rem"
                  }}
                >
                  ₹{item?.price}/Year
                </Typography>
                <LoadingButton
                  loading={cartLoading[item?.productId]}
                  sx={{
                    fontWeight: "500",
                    fontSize: "0.75rem",
                    backgroundColor: "#000000",
                    borderRadius: "74.99px",
                    color: "#FFFFFF",
                    marginY: "15px", // Added margin for better spacing
                    "&:hover": {
                      backgroundColor: "#FB8E0B"
                    }
                  }}
                  loadingIndicator={
                    <CircularProgress
                      size={24}
                      sx={{ color: "#F17D10" }}
                    />
                  }
                  onClick={() =>
                    cartItems.has(item.productId || "")
                      ? router.push("/cart")
                      : handleAddtoCart(item)
                  }
                >
                  {cartItems.has(item.productId || "")
                    ? "Go to Cart"
                    : "Add to Cart"}
                </LoadingButton>
              </Box>
              {/* <Card
                  sx={{
                    width: "100%",
                    height: "auto",
                    border: "0.75px solid #E6E9F5",
                    backgroundColor: "#FFFFFF",
                    boxSizing: "border-box"
                  }}
                >
                  <video
                    controls
                    preload="none"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  >
                    <source src="/path/to/video.mp4" type="video/mp4" />
                  </video>
                </Card> */}
            </Grid>
          ))}
        </Grid>
        {/* </Box> */}
        {/* <Contactus />  */}
      </Grid>
    </>
  );
};

export default Portfolio;


const portfolioData = [
  {
    price: 1999,
    productId: "4",
    type: "Standard"
  },
  {
    price: 2999,
    productId: "5",
    type: "Professional"
  },
  {
    price: 3999,
    productId: "6",
    type: "Pro"
  }
];