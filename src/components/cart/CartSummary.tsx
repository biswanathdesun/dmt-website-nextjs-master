import useRazorpay from "react-razorpay";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import theme from "@/components/theme/Theme";
// import { fCurrency } from "@utils/formatNumber";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { paymentSummaryAsync } from "@/redux/services/cart";
import { applyCouponAsync, removeCouponAsync } from "@/redux/services/coupon";
import { useRouter } from "next/navigation";
import {
  createCartPaymentAsync,
  verifyPaymentAsync
} from "@/redux/services/createPayment";
import { Icon } from "@iconify/react/dist/iconify.js";

interface CartSummaryProps {
  isEmptyCart: boolean;
  isLoggedin: any;
  totalCartPrice: number;
  paymentSummary?: {
    totalAmount: number;
    totalPrice: number;
    couponId: {
      code: string;
    };
    discountPrice: number;
    walletAmount: number;
    isCouponApplied: boolean;
  };
  setCouponValue: React.Dispatch<React.SetStateAction<string>>;
  couponValue: string;
  checked: boolean;
  productType: string;
  setChecked: any;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  isEmptyCart,
  isLoggedin,
  totalCartPrice,
  paymentSummary,
  setCouponValue,
  couponValue,
  productType,
  checked,
  setChecked
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [Razorpay] = useRazorpay();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { removeLoader, couponLoader } = useSelector(
    (state: any) => state?.couponSlice
  );
  const handleCheckoutPage = () => {
    if (!isLoggedin) {
      router.push("/auth/login?redirect=/cart");
      return;
    }
    setIsSubmitting(true);
    dispatch(createCartPaymentAsync())
      .then((res) => {
        if (res?.payload?.statusCode === 200) {
          if (res?.payload?.data) {
            const options: any = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
              amount: res?.payload?.data?.totalAmount,
              currency: "INR",
              name: "DMT",
              description: "RazorPay",
              order_id: res?.payload?.data?.id,
              handler: function (response: any) {
                const data = {
                  razorpay_payment_id: response?.razorpay_payment_id,
                  razorpay_order_id: response?.razorpay_order_id,
                  razorpay_signature: response?.razorpay_signature
                };
                dispatch(verifyPaymentAsync(data)).then((value) => {
                  if (value?.payload?.statusCode === 200) {
                    toast.success("Payment verified successfully", {
                      position: "top-right"
                    });
                    setIsSubmitting(false);
                    router.push("/thank-you");
                  }
                });
              },
              notes: {
                address: "Razorpay Corporate Office"
              },
              theme: {
                color: "#121212"
              },
              modal: {
                ondismiss: function () {
                  setIsSubmitting(false);
                }
              }
            };

            const rzp = new Razorpay(options);

            rzp.on("payment.failed", function (response: any) {
              console.error("Payment failed:", response.error);
              toast.error("Payment failed");
            });

            rzp.open();
          } else {
            router.push("/thank-you");
            setIsSubmitting(false);
          }
        } else {
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error in createCartPaymentAsync:", error);
        toast.error("Failed to create payment");
      });
  };
 const handleChangeBox = (event:any) => {
   setChecked(event.target.checked);
   dispatch(paymentSummaryAsync({ isWallet: event.target.checked }));
 };

  const searchCouponFunction = (text: string) => {
    setCouponValue(text);
  };

  const {
    totalAmount,
    totalPrice,
    couponId,
    discountPrice,
    isCouponApplied,
    walletAmount
  } = paymentSummary ?? {};
const {users}=useSelector((state:RootState)=>state?.users)
  const handleApplyCoupon = (value?: string) => {
    if (couponValue !== "") {
      dispatch(
        applyCouponAsync({
          code: couponValue || value,
          type:'web'
        })
      ).then((res: any) => {
        console.log(res,'res')
        if (res?.payload?.statusCode === 200) {
          toast.success(res?.payload?.message, {
            position: "top-right"
          });
          dispatch(paymentSummaryAsync({isWallet:checked}));
        }
      });
    } else {
      toast.error("Please Apply Valid Coupon!", {
        position: "top-right"
      });
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCouponAsync()).then((res) => {
      if (res?.payload?.statusCode === 200) {
        toast.success(res?.payload?.message, {
          position: "top-right"
        });
        dispatch(paymentSummaryAsync({isWallet:checked}));
      }
      setCouponValue("");
    });
  };


  useEffect(() => {
    if (isLoggedin && couponId) {
      handleRemoveCoupon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedin]);

  //  useEffect(() => {
  //    if (isLoggedin && checked) {
  //      dispatch(paymentSummaryAsync({ isWallet: checked })).then((res) => {
  //        if (res?.payload?.statusCode === 200) {
  //          setCouponValue(res?.payload?.data?.couponId?.code);
  //        }
  //      });
  //    }
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  //  }, [checked]);
  return (
    <>
      <Card
        // variant="outlined"
        sx={{
          mb: 3,
          backgroundColor: "#F8F8F8",
          padding: 1,
          borderRadius: 4,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)"
        }}
      >
        <CardHeader title="Your Order" />
        {/* <Divider /> */}
        {!isLoggedin ? (
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Sub Total
                </Typography>
                <Typography variant="subtitle2">{`₹ ${
                  totalCartPrice ?? 0
                }`}</Typography>
              </Stack>

              <Divider />

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1">Total</Typography>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="subtitle1" sx={{ color: "error.main" }}>
                    {`₹ ${totalCartPrice ?? 0}`}
                  </Typography>
                </Box>
              </Stack>

              <LoadingButton
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white"
                  }
                }}
                onClick={handleCheckoutPage}
                loading={isSubmitting}
              >
                I&apos;m Ready to Pay
              </LoadingButton>
            </Stack>
          </CardContent>
        ) : (
          <CardContent>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Total Price</Typography>
                <Typography variant="body2">{`₹ ${
                  totalPrice ?? 0
                }`}</Typography>
              </Box>
              {walletAmount ? (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Applied Coins
                  </Typography>
                  <Typography variant="subtitle2">-{walletAmount}</Typography>
                </Stack>
              ) : (
                ""
              )}
              {/* {couponCode && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton
                  onClick={handleRemoveCoupon}
                  size="small"
                  aria-label="remove coupon"
                  sx={{ ml: 1 }}
                >
                  <Icon icon="bx:bx-x" fontSize="small" color="#FF5722" />
                </IconButton>
              </Box>
            )} */}
              {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Wallet Amount</Typography>
                <Typography variant="body2">

                </Typography>
              </Box> */}
              {discountPrice ? (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Applied Coupon
                  </Typography>
                  <Typography variant="subtitle2">
                    -{`₹ ${discountPrice ?? 0}`}
                  </Typography>
                </Stack>
              ) : (
                ""
              )}
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Total Amount</Typography>
                <Typography variant="subtitle1">{`₹ ${
                  totalAmount ?? 0
                }`}</Typography>
              </Box>
            </Stack>
            <Box mt={3}>
              {couponId ? (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ bgcolor: "#ebf0ef", p: 1, borderRadius: 1 }}
                >
                  <Stack>
                    <Typography
                      sx={{ fontSize: "14px", fontWeight: 600 }}
                      display="flex"
                      alignItems="center"
                    >
                      <span style={{ color: "#ff8B00", marginRight: 6 }}>
                        YAY!
                      </span>
                      You have saved ₹ {discountPrice}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                      {" "}
                      {couponValue}{" "}
                    </Typography>
                  </Stack>
                  <LoadingButton
                    loading={removeLoader}
                    color="error"
                    onClick={() => handleRemoveCoupon()}
                  >
                    REMOVE
                  </LoadingButton>
                </Stack>
              ) : couponLoader ? (
                <LoadingButton
                  loading
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ height: "50px" }}
                >
                  Applying Coupon
                </LoadingButton>
              ) : (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Apply Coupon"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#003D32"
                      }
                    },
                    "& .MuiInputLabel-outlined.Mui-focused": {
                      color: "#003D32"
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LoadingButton
                          //   loading={isSubmitCoupon}
                          onClick={() => handleApplyCoupon()}
                          sx={{ mr: -0.5, color: "#000" }}
                        >
                          {"Apply"}
                        </LoadingButton>
                      </InputAdornment>
                    )
                  }}
                  value={couponValue}
                  onChange={(e) => searchCouponFunction(e.target.value)}
                />
              )}
            </Box>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ bgcolor: "#ebf0ef", p: 1, borderRadius: 1, my: 2 }}
            >
              <Stack>
                <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Total coins
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{ fontSize: "11px", fontWeight: 600 }}
                >
                  1 coins = ₹1
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Stack
                  direction="row"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Icon icon="noto:coin" width={18} height={18} />{" "}
                  <Typography> {users?.wallet ?? 0}</Typography>
                </Stack>
                {/* <Tooltip title="You can use maximum 50% of total coins">
                    <Iconify icon="clarity:info-line" width={19} height={19} />
                  </Tooltip> */}
              </Stack>
            </Stack>
            <Box>
              <FormControlLabel
                label="Pay with Coins"
                control={
                  <Checkbox checked={checked} onChange={handleChangeBox} />
                }
              />
            </Box>

            <Stack spacing={2} direction="column" marginTop={3}>
              <LoadingButton
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white"
                  }
                }}
                onClick={handleCheckoutPage}
                // disabled={isSubmitting}
                loading={isSubmitting}
              >
                I&apos;m Ready to Pay
              </LoadingButton>
            </Stack>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default CartSummary;
