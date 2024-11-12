import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Icon,
  CircularProgress,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DiamondIcon from "@mui/icons-material/Diamond";
import useInView from "./useInView";
import toast from "react-hot-toast";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  addToCartAsync,
  cartCountAsync,
  getCartAsync,
} from "@/redux/services/cart";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { sum } from "lodash";
import { setCartCount } from "@/redux/slices/cartSlice";

interface cartItem {
  type: string;
  price: number;
  productId?: string;
}
interface CartLoadingState {
  [productId: string]: boolean;
}

const PricingTable = () => {
  const [setRef, isInView] = useInView({ threshold: 0.1 });
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
          new Set(res?.payload?.data?.map((item: any) => item?.productId))
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
        productTypes: "Music Distribution",
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
    <TableContainer
      component={Paper}
      sx={{ border: 0, borderColor: "grey.400", marginY: "50px" }}
      ref={setRef}
    >
      <Table sx={{ minWidth: "100%", overflow: 'hidden' }}>
        <TableHead sx={{ marginY: 10, minWidth: "100%" }}>
          <TableRow
            sx={{
              border: 1,
              borderColor: "grey.400",
              background: "#FFFFE4",
              fontFamily: "Manrope",
              marginY: 10,
            }}
          >
            <motion.td
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={columnVariants[0]}
              transition={{ duration: 1 }}
              style={{ border: "1px solid grey" }}
            >
              <TableCell
                sx={{
                  fontWeight: "800",
                  fontSize: {
                    xs: "25px", // Small devices (phones)
                    sm: "25px", // Medium devices (tablets)
                    md: "30px", // Large devices (desktops)
                    lg: "35px", // Extra large devices
                  },
                  borderBottom: 0,
                  minWidth: "400px",
                  lineHeight: 1.5
                }}
              >
                Only on Deliver My Tune
              </TableCell>
            </motion.td>
            {plans.map((plan, index) => (
              <motion.td
                key={index}
                style={{ border: "1px solid grey", alignItems: "center" }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={columnVariants[index + 1] || columnVariants[0]}
                transition={{ duration: 1 }}
              >
                <TableCell
                  sx={{
                    borderBottom: 0,
                    fontWeight: "600",
                    fontSize: "27px",
                    marginY: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center", // Center-align the header content
                  }}
                >
                  <div className="plan-header">
                    <div
                      className="plan-price"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "400px",
                        margin: "15px",
                        color: "#F17D10 ",
                      }}
                    >
                      <DiamondIcon />
                      {plan.type}
                    </div>
                    <div
                      className="plan-price"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {plan.price === 0 ? 'Free' : `₹ ${plan.price}`}
                    </div>
                    <LoadingButton
                      loading={cartLoading[plan?.productId]}
                      variant="contained"
                      color="primary"
                      sx={{
                        borderRadius: "70px",
                        mt: 2,
                        background: "black",
                        color: "white",
                        minWidth: "130px",
                      }}
                      loadingIndicator={
                        <CircularProgress size={24} sx={{ color: "#F17D10" }} />
                      }
                      onClick={() => {
                        cartItems.has(plan.productId || "")
                          ? router.push("/cart")
                          : handleAddtoCart(plan);
                      }}
                    >
                      {cartItems.has(plan.productId || "")
                        ? "Go to Cart"
                        : "Add to Cart"}
                    </LoadingButton>
                  </div>
                </TableCell>
              </motion.td>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {featureList.map((feature, index) =>
            feature === "Commonly Service Provided" ? (
              <TableRow
                key={index}
                sx={{
                  border: 1,
                  borderColor: "grey.400",
                }}
              >
                <motion.td
                  colSpan={plans.length + 1}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={columnVariants[0]}
                  transition={{ duration: 1 }}
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  <Box
                    sx={{
                      fontWeight: "500px",
                      textAlign: "center",
                      paddingY: 2,
                    }}
                  >
                    {feature}
                  </Box>
                </motion.td>
              </TableRow>
            ) : (
              <TableRow
                key={index}
                sx={{
                  border: 1,
                  borderColor: "grey.400",
                }}
              >
                <motion.td
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={columnVariants[0]}
                  transition={{ duration: 1 }}
                >
                  <TableCell
                    sx={{
                      borderBottom: 0,
                      fontFamily: "Poppins",
                      fontWeight: "500px",
                      textAlign: "center", // Center-align the body content
                    }}
                  >
                    {feature}
                  </TableCell>
                </motion.td>
                {plans.map((plan, i) => (
                  <motion.td
                    key={i}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{
                      border: "1px solid grey",
                      borderColor: "grey.400",
                    }}
                    variants={columnVariants[i + 1] || columnVariants[0]}
                    transition={{ duration: 1 }}
                  >
                    <TableCell
                      sx={{
                        textAlign: "center",
                        borderBottom: "none",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {plan.features[index] === true ? (
                        <CheckCircleIcon sx={{ color: "#FB8E0B" }} />
                      ) : plan.features[index] === false ? (
                        <CancelIcon sx={{ color: "red" }} />
                      ) : (
                        plan.features[index]
                      )}
                    </TableCell>
                  </motion.td>
                ))}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PricingTable;

const plans = [
  {
    type: "Starters",
    productId: "11",
    originalPrice: "0",
    price: 0,
    features: [
      true,
      true,
      true,
      `No`,
      false,
      "Unlimited",
      "ASAP",
      "ASAP",
      false,
      false,
      false,
      false,
      "Yes",
      "70%",
      "",
      "Yes",
      false,
      "Yes",
      "70%",
      "Yes",
      "Yes"
    ]
  },
  {
    type: "Standard",
    productId: "1",
    price: 1999,
    originalPrice: "0",
    features: [
      true,
      true,
      true,
      true,
      true,
      "1",
      "72 Hours",
      "72 Hours",
      "999",
      "999",
      false,
      false,
      "Yes",
      "70%",
      "",
      "Yes",
      true,
      true,
      "70%",
      true,
      true
    ]
  },
  {
    type: "Professional",
    productId: "2",
    price: 5999,
    features: [
      true,
      true,
      true,
      true,
      true,
      "10(In 1 Year)",
      "48 Hours",
      "48 Hours",
      "1999",
      "1999",
      false,
      false,
      "Yes",
      "70%",
      "",
      "Yes",
      true,
      true,
      "70%",
      true,
      true
    ]
  },
  {
    type: "Pro",
    productId: "3",
    price: 9999,
    features: [
      true,
      true,
      true,
      true,
      true,
      "Unlimited (In 1 Year)",
      "24 Hours",
      "24 Hours",
      "Free",
      "Free",
      true,
      true,
      "Yes",
      "70%",
      "",
      "Yes",
      true,
      true,
      "70%",
      true,
      true
    ]
  }
];

const featureList = [
  "No Hidden Cost",
  "Lifetime Distribution (Don't pay for the same song again)",
  "Unlimited Artists",
  "Customizable Label Name",
  "Social Media Profile Linking",
  "Song/Album Distribution",
  "Artist Care",
  "Distribution Time",
  "Dolby Atom Audio Distribution + Apple Motion Graphics",
  "AI Mastering",
  "Spotify & Apple Verification",
  "Official YouTube Artist Channel Request",
  "International Song registration with different agency",
  "Publishing Royalty",
  "Commonly Service Provided",
  "Official Sales Report",
  "Schedule Your Own Release Date",
  "100+ Platforms",
  "Royalty",
  "Cover Art Creator",
  "Free UPC & Free ISRC",
];

const columnVariants = [
  { hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  { hidden: { y: -100, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  { hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } },
];
