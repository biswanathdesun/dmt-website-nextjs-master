import BillingDetails from "@/components/common/BillingDetails";
import { getPlansByTypeAsync } from "@/redux/services/plans";
import { createSocialMediaOrderAsync, verifySocialMediaOrderAsync } from "@/redux/services/socialMedia";
import { AppDispatch, RootState } from "@/redux/store";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  InputLabel,
  TextField,
  Checkbox,
  Card
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRazorpay from "react-razorpay";
import toast from "react-hot-toast";

interface priceProps {
  activeTab: number;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
}

const Price: React.FC<priceProps> = ({
  activeTab,
  handleBack,
  steps,
  handleNext
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [Razorpay] = useRazorpay();
  const { plans } = useSelector((state: RootState) => state?.plans);
  const { users } = useSelector((state: RootState) => state?.users);
  const [payWithSubscription, setPayWithSubscription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubscription = users?.productCounts?.socialMediaUnit > 0;
  const [payWithWallet, setPayWithWallet] = useState(false);
  const isButtonDisabled =
    (users?.productCounts?.socialMediaUnit > 0 && !payWithSubscription) ;
  const { socialData, socialDataByUserId } = useSelector(
    (state: RootState) => state?.socialMedia
  );
  const totalPrice = users?.productCounts?.socialMediaUnit < 1 ? plans[0]?.price : 0;
  const handleContinue = () => {
    handleNext();
  };

  const handlePayWithCoin = (e: any) => {
    setPayWithWallet(e.target.checked);
  };
  const GrandTotal = grandTotal();

  function grandTotal() {
    let total = 0;
    if (users?.productCounts?.socialMediaUnit < 1) {
       total = plans[0]?.price ?? 0;
      if (payWithWallet) {
        total = Math.max(total - users?.wallet, 0);

      }
    }
    return total;
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    const payload = {
      productId: plans[0]?._id,
      type: isSubscription ? "subscription" : "plan",
      artistSocialMediaId: socialData?._id,
      // artistSocialMediaId: "66b75ba55949e5ca68781d8e",
      isWallet: payWithWallet
    };
    dispatch(createSocialMediaOrderAsync(payload)).then((res) => {
      // console.log(res, 'res')
      if (res?.payload?.statusCode === 200) {
        if (res?.payload?.data) {
          const options: any = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: res?.payload?.data?.amount,
            currency: "INR",
            name: "DMT",
            description: "RazorPay",
            order_id: res?.payload?.data?.id,
            handler: function (response: any) {
              const paymentData = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              };
               dispatch(verifySocialMediaOrderAsync(paymentData))
                 .then((value: any) => {
                   if (value?.payload?.statusCode === 200) {
                     toast.success("Payment verified successfully", {
                       position: "top-right"
                     });
                     handleNext();
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
            setIsSubmitting(false);
          });
          rzp.open();
        } else {
          handleNext();
          setIsSubmitting(false);
        }
      } else {
        setIsSubmitting(false);
      }
    });
  };

  useEffect(() => {
    const params = {
      types: "Social Media Management"
    };
    dispatch(getPlansByTypeAsync(params));
  }, []);
  return (
    <>
      <Container>
        {!isSubscription && (
          <Box
            sx={{
              backgroundColor: "#ff7f00",
              color: "white",
              borderRadius: 2,
              width: 300,
              padding: 3,
              textAlign: "center",
              boxShadow: 3
            }}
          >
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
              INR {plans[0]?.price} per month
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#333" },
                color: "white",
                borderRadius: "20px",
                width: "80%"
              }}
            >
              Choose Plan
            </Button>
          </Box>
        )}
      </Container>
      <Box sx={{ my: 5 }}>
        <Typography variant="h5">Billing Summary</Typography>
        <Box
          sx={{ my: 2 }}
          rowGap={2}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)"
          }}
        >
          <BillingDetails userData={users} />
          <Box>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6">Order Details</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Subtotal</Typography>
                <InputLabel>{ totalPrice}</InputLabel>
              </Box>
              {payWithWallet && (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Applied Coins</Typography>
                  <InputLabel>
                    - {Math.min(GrandTotal, users?.wallet)}
                  </InputLabel>
                </Box>
              )}
              <Divider sx={{ my: 2 }} />

              {users?.productCounts?.socialMediaUnit >= 1 && (
                <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                  <Checkbox
                    checked={payWithSubscription}
                    onChange={(e) => setPayWithSubscription(e.target.checked)}
                  />
                  <Typography>Pay With Subscription:</Typography>
                  <Typography>
                    <InputLabel
                      sx={{
                        ml: 1,
                        color: "orange",
                        whiteSpace: "normal",
                        wordBreak: "break-word"
                      }}
                    >
                      {users?.productCounts?.socialMediaUnit} unit
                    </InputLabel>
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <Checkbox
                  checked={payWithWallet}
                  disabled={
                    users?.wallet === 0 || (!payWithWallet && GrandTotal == 0)
                  }
                  onChange={(e) => {
                    handlePayWithCoin(e);
                  }}
                />
                <Typography>Pay With Coins</Typography>
                <Typography>
                  <InputLabel
                    sx={{
                      ml: 1,
                      color: "orange",
                      whiteSpace: "normal",
                      wordBreak: "break-word"
                    }}
                  >
                    [Coin Balance: ₹ {users?.wallet}]
                  </InputLabel>
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Grand Total</Typography>
                <InputLabel>₹ {GrandTotal}</InputLabel>
              </Box>
            </Card>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2, pb: 4 }}>
          <Button
            color="inherit"
            variant="contained"
            disabled={activeTab === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <LoadingButton
            type={steps[activeTab].content === "form" ? "submit" : "button"}
            variant="contained"
            loading={isSubmitting}
            sx={{ mr: 1, color: "white", backgroundColor: "black" }}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Proceed To Payment
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default Price;
