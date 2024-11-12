"use client";
import React, { ReactNode, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getOneOrderDetailAsyn } from "@/redux/services/oneOrderDetail";
import { useRouter } from "next/navigation";
import { capitalize } from "lodash";
import dayjs from "dayjs";

interface OrderDetailProps {
  param: {
    id: string;
  };
}

const OrderDetail: React.FC<OrderDetailProps> = ({ param }) => {
  const { isLoading, oneOrderDetail } = useSelector(
    (state: RootState) => state.oneOrderDetail
  );
  const {
    dateOfPurchase,
    paymentStatus,
    total,
    orderId,
    plans,
    subTotal,
    donation,
    userName,
    userPhone,
    userEmail,
    discountedAmount,
  } = oneOrderDetail?.data || {};
  const name = String(userName);
  const purchaseDate = String(dateOfPurchase);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const id = param.id;

  useEffect(() => {
    dispatch(getOneOrderDetailAsyn({ id, data: undefined }));
  }, [param.id, dispatch, id]);

  const handleBack = () => {
    router.push(`/dashboard/orders`);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on medium and larger
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on medium and larger
                alignItems: "center",
                width: { xs: "100%", md: "auto" }, // Full width on small screens, auto on medium and larger
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                }}
              >
                <Typography variant="h6">{orderId}</Typography>

                <Typography>
                  {dayjs(purchaseDate).format("DD MMM YYYY") || "-"}
                </Typography>
              </Box>
              <Box>
                <Chip
                  size="medium"
                  label={capitalize(paymentStatus)}
                  color={
                    paymentStatus === "pending"
                      ? "warning"
                      : paymentStatus === "paid"
                      ? "success"
                      : "error"
                  }
                />
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                marginTop: { xs: "10px", md: "0" },
                color: "#fff",
              }}
              onClick={handleBack}
            >
              Back
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7} order={{ xs: 2, sm: 2, md: 1 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="center">Qty</TableCell>
                      <TableCell align="right">Subtotal</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plans?.map((plan, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="h6" fontWeight={"bold"}>
                            {plan.planType}
                          </Typography>
                          <Typography>
                            <Chip
                              size="small"
                              label={capitalize(plan.productName)}
                              sx={{
                                bgcolor: "#F6D6D6",
                                color: "#E72929",
                              }}
                            />{" "}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{plan.quantity}</TableCell>
                        <TableCell align="right">₹{plan.price}</TableCell>
                        <TableCell align="right">₹{total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box marginY={3}>
                <Grid container spacing={2} direction="column">
                  <Grid item container>
                    <Grid item xs={9}>
                      <Typography textAlign={"right"}>Subtotal</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography textAlign={"right"}> ₹{subTotal}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={9}>
                      <Typography textAlign={"right"}>
                        Applied Coupon Discount
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography textAlign={"right"}>
                        {" "}
                        ₹{discountedAmount}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={9}>
                      <Typography textAlign={"right"}>Donation</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography textAlign={"right"}> ₹{donation}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={9}>
                      <Typography fontWeight={"bold"} textAlign={"right"}>
                        Total
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography fontWeight={"bold"} textAlign={"right"}>
                        ₹{total}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} order={{ xs: 1, sm: 1, md: 2 }}>
              <Card sx={{ marginBottom: "20px" }}>
                <CardHeader title="Customer Info" />
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ height: "40px", width: "40px" }}>
                      {name.charAt(0)}
                    </Avatar>
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      sx={{ marginLeft: "8px" }}
                    >
                      {userName}
                    </Typography>
                  </Box>
                  <Divider sx={{ marginY: "16px" }} />
                  <Typography variant="body2">
                    Phone number: {userPhone}
                  </Typography>
                  <Typography variant="body2">Email: {userEmail}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default OrderDetail;
