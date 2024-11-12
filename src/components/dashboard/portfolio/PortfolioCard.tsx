"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  addToCartAsync,
  cartCountAsync,
  getCartAsync,
} from "@/redux/services/cart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { getEnquiryAsync } from "./../../../redux/services/enquiry";
import { useSelector } from "react-redux";

const Imagecard1 = "/images/portfolio/Imagecard1.png";
const Imagecard3 = "/images/portfolio/Imagecard3.png";
const Imagecard2 = "/images/portfolio/Imagecard2.png";

interface Inquiry {
  name: string;
  email: string;
  mobile: string;
}

interface CartItem {
  price: number;
  productId?: string;
}

interface CartLoadingState {
  [productId: string]: boolean;
}

export default function PortfolioCard() {
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());
  const [showTable, setShowTable] = useState(false);
  const [cartLoading, setCartLoading] = useState<CartLoadingState>({});
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { enquiryList } = useSelector((state: RootState) => state?.enquiry);
  const handleToggle = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };

  const getStoredAuth = () => {
    const storedAuth = localStorage.getItem("userData");
    if (storedAuth) {
      try {
        return JSON.parse(storedAuth);
      } catch (e) {
        console.error("Failed to parse auth data from localStorage", e);
        return null;
      }
    }
    return null;
  };

  const userData = getStoredAuth();
  const getCart = () => {
    dispatch(getCartAsync()).then((res: any) => {
      setCartItems(
        new Set(res.payload.data.map((item: any) => item.productId))
      );
    });
  };

  const handleAddtoCart = (item: CartItem) => {
    const productId = item.productId as string;
    setCartLoading((prevState) => ({ ...prevState, [productId]: true }));
    const payload = {
      products: [
        {
          productId: item.productId,
          price: item.price,
        },
      ],
    };

    dispatch(addToCartAsync(payload))
      .then((res) => {
        if (res?.payload?.statusCode === 200) {
          getCart();
          dispatch(cartCountAsync());
          setCartLoading((prevState) => ({ ...prevState, [productId]: false }));
          toast.success("Item Added to Cart Successfully!", {
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCartLoading((prevState) => ({ ...prevState, [productId]: false }));
      });
  };

   useEffect(()=>{
    getCart();
   },[])

  useEffect(() => {
    if(showTable){
    dispatch(getEnquiryAsync(userData?._id));
    }
  }, [showTable]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={3.5} margin={2}>
          <Image
            src={Imagecard1}
            alt="Portfolio Image"
            layout="responsive"
            width={500}
            height={300}
          />
          <Box sx={{ textAlign: "center" }}>
            <LoadingButton
              loading={cartLoading["4"]}
              sx={{
                border: "0.7px solid #FB8E0B",
                margin: { xs: 1, md: 0, lg: 1 },
                marginY: { md: 1 },
                color: "#000",
                background: "#FB8E0B",
                width: "200px",
                textTransform: "none",
                borderRadius: "25px",
              }}
              onClick={() =>
                cartItems.has("4")
                  ? router.push("/cart")
                  : handleAddtoCart({ price: 1999, productId: "4" })
              }
            >
              {cartItems.has("4") ? "Go to Cart" : "Purchase Now At ₹1999"}
            </LoadingButton>
            <Button
              onClick={() =>
                router.push("/portfolio/creativeprofessionals-first")
              }
              sx={{
                border: "0.1px solid #FB8E0B",
                margin: { xs: 1, md: 0, lg: 1 },
                marginY: { md: 1 },
                color: "#000",
                background: "#FB8E0B",
                width: "200px",
                borderRadius: "25px",
                textTransform: "none",
              }}
            >
              View Sample Preview
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={3.5} margin={2}>
          <Image
            src={Imagecard2}
            alt="Portfolio Image"
            layout="responsive"
            width={500}
            height={300}
          />
          <Box sx={{ textAlign: "center" }}>
            <LoadingButton
              loading={cartLoading["5"]}
              sx={{
                border: "0.7px solid #FB8E0B",
                margin: { xs: 1, md: 0, lg: 1 },
                marginY: { md: 1 },
                color: "#000",
                background: "#FB8E0B",
                width: "200px",
                textTransform: "none",
                borderRadius: "25px",
              }}
              onClick={() =>
                cartItems.has("5")
                  ? router.push("/cart")
                  : handleAddtoCart({ price: 2999, productId: "5" })
              }
            >
              {cartItems.has("5") ? "Go to Cart" : "Purchase Now At ₹2999"}
            </LoadingButton>
            <Button
              onClick={() =>
                router.push("/portfolio/creativeprofessionals-second")
              }
              sx={{
                border: "0.1px solid #FB8E0B",
                margin: { xs: 1, md: 0, lg: 1 },
                marginY: { md: 1 },
                color: "#000",
                background: "#FB8E0B",
                width: "200px",
                borderRadius: "25px",
                textTransform: "none",
              }}
            >
              View Sample Preview
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={3.5} margin={2}>
          <Image
            src={Imagecard3}
            alt="Portfolio Image"
            layout="responsive"
            width={500}
            height={300}
          />
          <Box sx={{ textAlign: "center" }}>
            <LoadingButton
              loading={cartLoading["6"]}
              sx={{
                border: "0.7px solid #FB8E0B",
                margin: { xs: 1, md: 0, lg: 1 },
                marginY: { md: 1 },
                color: "#000",
                background: "#FB8E0B",
                width: "200px",
                textTransform: "none",
                borderRadius: "25px",
              }}
              onClick={() =>
                cartItems.has("6")
                  ? router.push("/cart")
                  : handleAddtoCart({ price: 3999, productId: "6" })
              }
            >
              {cartItems.has("6") ? "Go to Cart" : "Purchase Now At ₹3999"}
            </LoadingButton>
            <Button
              onClick={() =>
                router.push("/portfolio/creativeprofessionals-third")
              }
              sx={{
                border: "0.1px solid #FB8E0B",
                margin: { xs: 1, md: 0, lg: 1 },
                marginY: { md: 1 },
                color: "#000",
                background: "#FB8E0B",
                width: "200px",
                borderRadius: "25px",
                textTransform: "none",
              }}
            >
              View Sample Preview
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", marginY: 2 }}>
        <Button
          onClick={handleToggle}
          sx={{
            border: "0.1px solid #FB8E0B",
            margin: 1,
            color: "#000",
            background: "#FB8E0B",
            width: "200px",
            borderRadius: "25px",
            textTransform: "none",
          }}
        >
          {showTable ? "Hide Enquiries" : "Show Enquiries"}
        </Button>
      </Box>
      {showTable && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enquiryList?.map((inquiry, index) => (
                <TableRow key={index}>
                  <TableCell>{inquiry.name}</TableCell>
                  <TableCell>{inquiry.email}</TableCell>
                  <TableCell>{inquiry.mobile}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
