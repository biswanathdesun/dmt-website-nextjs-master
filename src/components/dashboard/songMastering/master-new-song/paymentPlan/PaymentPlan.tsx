"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  InputLabel,
  Typography
} from "@mui/material";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { LoadingButton } from "@mui/lab";
import BillingDetails from "@/components/common/BillingDetails";
import {
  createMasteringPaymentAsync,
  verifyMasterPaymentAsync
} from "@/redux/services/createPayment";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { getUsersDetailsAsync } from "@/redux/services/profile";
import MasteringPlan from "./MasteringPlan";

interface PlanData {
  price: number | any;
  title: string;
  productId: string;
  _id: string;
}

const PaymentPlan: React.FC = () => {
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [payWithWallet, setPayWithWallet] = useState(false);
  const [payWithSubscription , setPayWithSubscription]= useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [Razorpay] = useRazorpay();
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const masterId = searchParams.get("masterId");
  const { users } = useSelector((state: RootState) => state?.users);

  const grandTotal = payWithWallet
    ? planData
      ? Math.max(planData.price - users.wallet, 0)
      : 0
    : planData?.price ?? 0;
  
  const isButtonDisabled =
    users?.productCounts?.aIMasteringUnit < 1 ? !planData : !payWithSubscription;

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayWithWallet(e.target.checked);
  };

  const handleCreatePayment = () => {
    setIsSubmitting(true);
    const data = {
      masteredId: masterId,
      productTypes: "AI Mastering",
      productId: planData?._id,
      type: planData ? "plan" : 'subscription',
      isWallet: payWithWallet
    };

    if (payWithSubscription || grandTotal === 0) {
      dispatch(createMasteringPaymentAsync(data)).then((res) => {
        if (res?.payload?.statusCode === 200) {
          router.push("payment");
        } else {
          setIsSubmitting(false);
        }
      });
      return;
    }

    dispatch(createMasteringPaymentAsync(data))
      .then((res) => {
        if (res?.payload?.statusCode === 200) {
            const options: any = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
              amount: res.payload.data.amount,
              currency: "INR",
              name: "DMT",
              description: "RazorPay",
              order_id: res.payload.data.id,
              handler: function (response: any) {
                const paymentData = {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature
                };
                dispatch(verifyMasterPaymentAsync(paymentData))
                  .then((value) => {
                    if (value?.payload?.statusCode === 200) {
                      toast.success("Payment verified successfully", {
                        position: "top-right"
                      });
                      router.push("/thank-you");
                    }
                    setIsSubmitting(false);
                  })
                  .catch(() => {
                    setIsSubmitting(false);
                  });
              },
              notes: {
                address: "Razorpay Corporate Office"
              },
              theme: {
                color: "#121212"
              }
            };

            const rzp = new Razorpay(options);
            rzp.on("payment.failed", function (response: any) {
              console.error("Payment failed:", response.error);
              toast.error("Payment failed");
              setIsSubmitting(false);
            });
            rzp.open();
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

  useEffect(() => {
    dispatch(getUsersDetailsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (planData) {
      setPayWithWallet(false);
    }
  }, [planData]);
console.log(payWithSubscription, "payWithSubscription");

  return (
    <Container>
      <Box>
        <Button
          variant="contained"
          sx={{ color: "#fff" }}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </Box>
      {users?.productCounts?.aIMasteringUnit < 1 && (
        <Box
          sx={{
            width: "100%",
            padding: "20px 10px",
            marginY: "16px"
          }}
        >
          <MasteringPlan setPlanData={setPlanData} />
        </Box>
      )}

      <Box sx={{ my: 5 }}>
        <Typography variant="h5">Billing Summary</Typography>
        <Box
          sx={{ my: 2 }}
          rowGap={2}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)"
          }}
        >
          <BillingDetails userData={users} />
          <Box>
            <Box>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6">Order Details</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Subtotal</Typography>
                  <InputLabel>{planData?.price ?? 0}</InputLabel>
                </Box>
                {payWithWallet && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Applied Coins</Typography>
                    <InputLabel>
                      -
                      {users?.wallet >= planData?.price
                        ? planData?.price
                        : users?.wallet}
                    </InputLabel>
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />

                {users?.productCounts?.aIMasteringUnit >= 1 ? (
                  <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                    <Checkbox
                      checked={payWithSubscription}
                      onChange={(e) =>
                        setPayWithSubscription(e?.target.checked)
                      }
                    />
                    <Typography>Pay With Subscription</Typography>
                    <InputLabel sx={{ ml: 1, color: "orange" }}>
                      {users?.productCounts?.aIMasteringUnit} unit
                    </InputLabel>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                    <Checkbox
                      checked={payWithWallet}
                      onChange={handleChangeCheckbox}
                      disabled={!planData}
                    />
                    <Typography>Pay With Coins</Typography>
                    <InputLabel sx={{ ml: 1, color: "orange" }}>
                      [Wallet Balance: ₹ {users?.wallet}]
                    </InputLabel>
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Grand Total</Typography>
                  <InputLabel>₹ {grandTotal}</InputLabel>
                </Box>
                <Box sx={{ my: 2 }}>
                  <LoadingButton
                    variant="contained"
                    fullWidth
                    sx={{ color: "#fff" }}
                    loading={isSubmitting}
                    disabled={isButtonDisabled}
                    onClick={handleCreatePayment}
                  >
                    Checkout
                  </LoadingButton>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PaymentPlan;
