"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import PricingCard from "./PricingCard";
import CustomStepButton from "../../custom/CustomStepButton";
import BillingDetails from "@/components/common/BillingDetails";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUsersDetailsAsync } from "@/redux/services/profile";
import {
  getPlanDetailAsync,
  getPlansByTypeAsync
} from "@/redux/services/plans";
import MasteringPlan from "@/components/dashboard/songMastering/master-new-song/paymentPlan/MasteringPlan";
import {
  createNewReleasePaymentAsync,
  verifyNewReleasePaymentAsync
} from "@/redux/services/createPayment";
import useRazorpay from "react-razorpay";
import toast from "react-hot-toast";
import { applyCouponAsync } from "@/redux/services/coupon";
import { LoadingButton } from "@mui/lab";
interface PaymentPlanProps {
  activeTab: number;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
}

interface PlanData {
  price: number | any;
  title: string;
  productId: string;
  _id: string;
  productName: string;
}

const PaymentPlan: React.FC<PaymentPlanProps> = ({
  activeTab,
  handleBack,
  steps,
  handleNext
}) => {
  const { orderDataById } = useSelector(
    (state: RootState) => state?.newRelease
  );
  const [payWithSubscription, setPayWithSubscription] = useState(false);

  const theme = useTheme();
  const [Razorpay] = useRazorpay();
  const [songMastered, setSongMastered] = React.useState(false);
  const { planDetails } = useSelector((state: RootState) => state?.plans);
  const [payWithSubMastering, setPayWithSubMastering] = useState(false);
  const [planData, setPlanData] = useState<PlanData | any>(null);
  const [masteringData, setMasteringData] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state?.users);
  const { couponLoader } = useSelector((state: any) => state?.couponSlice);
  const [isCoupon, setIsCoupon] = useState(false);
  const [totalCoinApplied, setTotalCoinApplied] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const noOfSongs = orderDataById?.tracks?.length;
  const [couponData, setCouponData] = useState<any>(null);
  // const noOfSongs = 2;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discountPrice, setDiscountPrice] = useState<any>(0);
  const showNote =
    noOfSongs > users?.productCounts?.aIMasteringUnit && !masteringData;
  const [payWithWallet, setPayWithWallet] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>();
const isFreePlan =
  planDetails?.musicDistribution?.length === 1 &&
  planDetails?.musicDistribution?.[0]?.name ==='starter' ;
  const handleCardClick = (item: any, index: number) => {
    setSongMastered(false)
    setSelectedCard(item);
  };
  const songLeft =
    users?.productCounts?.aIMasteringUnit < noOfSongs &&
    users?.productCounts?.aIMasteringUnit !== 0
      ? Math.abs(noOfSongs - users?.productCounts?.aIMasteringUnit)
      : 0;
  const GrandTotal = calculateGrandTotal();
  const isMasterCardVisible =
    (songMastered && users?.productCounts?.aIMasteringUnit === 0) ||
    (songMastered && users?.productCounts?.aIMasteringUnit < noOfSongs);
  const masteringAmt =
    users?.productCounts?.aIMasteringUnit === 0 &&
    masteringData?.productId === "7"
      ? noOfSongs * masteringData?.price
      : noOfSongs > 10 &&
        users?.productCounts?.aIMasteringUnit < noOfSongs &&
        masteringData?.productId === "8"
      ? songLeft * masteringData?.price
      : users?.productCounts?.aIMasteringUnit < noOfSongs &&
        masteringData?.productId === "7"
      ? songLeft * masteringData?.price
      : masteringData?.price ?? 0;

  const { musicDistribution } = planDetails;

  function amountTotal() {
    let grandAmount = 0;
    const diff = Math.abs(noOfSongs - users?.productCounts?.aIMasteringUnit);
    if (songMastered) {
      if (users?.productCounts?.aIMasteringUnit === 0) {
        if (masteringData?.productId === "7") {
          grandAmount += diff * (masteringData[0]?.price ?? 999);
        } else {
          grandAmount += masteringData?.price ?? 0;
        }
      }
      if (users?.productCounts?.aIMasteringUnit > 0) {
        if (users?.productCounts?.aIMasteringUnit < noOfSongs) {
          if (noOfSongs > 10 && masteringData?.productId === "8") {
            grandAmount += songLeft * masteringData[0]?.price;
          }
          if (masteringData?.productId === "7") {
            grandAmount += songLeft * (masteringData[0]?.price ?? 999);
          } else {
            grandAmount += masteringData?.price ?? 0;
          }
        }
      }
    }

    grandAmount += planData?.price ?? 0;

    return grandAmount;
  }

  function totalAmountWithDiscount() {
    let amount = amountTotal();
    amount -= discountPrice;
    return amount;
  }

  function calculateGrandTotal() {
    let grandTotal = totalAmountWithDiscount();
    if (payWithWallet) {
      grandTotal = Math.max(grandTotal - users?.wallet, 0);
    }

    return grandTotal;
  }

  const handlePayWithCoin = (e: any) => {
    setPayWithWallet(e.target.checked);
    const maxApplicableCoins = Math.min(GrandTotal, users?.wallet);
    setTotalCoinApplied(maxApplicableCoins);
  };

  const handleSelectPlan = (plan: PlanData) => {
    setPlanData(plan);
    setPayWithWallet(false);
    setCouponCode("");
    setIsCoupon(false);
    setDiscountPrice(0);
  };

  const handleCheckboxChange = () => {
    setSongMastered(!songMastered);
    setMasteringData(null);
    setPayWithSubMastering(false);
    setPayWithWallet(false);
    setCouponCode("");
    setIsCoupon(false);
  };

  const onSubmit = () => {
    setIsSubmitting(true);
    const data: {
      musicDistributionType: string;
      isWallet: boolean;
      musicDistributionId?: string;
      orderId?: string;
      aiMasteringId?: string;
      masteringType?: string;
      isMastering: boolean;
      planCount?: number;
      couponCode?: string;
    } = {
      musicDistributionType: planData ? "plan" : "subscription",
      isWallet: payWithWallet,
      musicDistributionId: planData?._id || selectedCard?._id,
      orderId: orderDataById?._id,
      aiMasteringId: masteringData?._id,
      masteringType:
        users?.productCounts?.aIMasteringUnit !== 0 &&
        users?.productCounts?.aIMasteringUnit < noOfSongs
          ? "bundled"
          : masteringData && songLeft == 0
          ? "plan"
          : "subscription",
      isMastering: songMastered,
      planCount: songLeft,
      couponCode
    };

    if (!songMastered) {
      delete data.planCount;
      delete data.masteringType;
      delete data.aiMasteringId;
    }

    if (data?.masteringType !== "bundled") {
      delete data.planCount;
    }
    if (
      data?.masteringType === "plan" ||
      data?.masteringType === "subscription"
    ) {
      delete data?.planCount;
    }

    if (!isCoupon) {
      delete data?.couponCode;
    }

    dispatch(createNewReleasePaymentAsync(data)).then((res: any) => {
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
              dispatch(verifyNewReleasePaymentAsync(paymentData))
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
    dispatch(getUsersDetailsAsync()).then((res) => {
      if (res?.payload?.error === false) {
        if (res?.payload?.data?.productCounts?.musicDistributionUnit == 0) {
          const params = {
            types: "Music Distribution"
          };
          dispatch(getPlansByTypeAsync(params));
        }
      }
    });
  }, [dispatch]);

  const isPaymentButtonEnabled = () => {
    // Case 1: User has music distribution units
    if (users?.productCounts?.musicDistributionUnit > 0) {
      if (!songMastered && payWithSubscription) {
        return true;
      }
      if (songMastered && payWithSubscription) {
        if (users?.productCounts?.aIMasteringUnit > 0) {
          // if (payWithSubMastering && songLeft == 0) {
          //   return true;
          // }
          // if (payWithSubMastering && songLeft > 0) {
          //   if (masteringData !== null) {
          //     return true;
          //   }
          //   return false;
          // }
          if (payWithSubMastering) {
            if (users?.productCounts?.aIMasteringUnit >= noOfSongs) {
              return true;
            }
            if (users?.productCounts?.aIMasteringUnit < noOfSongs) {
              if (masteringData !== null) {
                return true;
              }
            }
            return false;
          }

          return false;
        }
        if (users?.productCounts?.aIMasteringUnit == 0) {
          if (masteringData !== null) {
            return true;
          }

          return false;
        }
        return false;
      }
      return false;
    }

    // Case 2: User has no music distribution units
    if (users?.productCounts?.musicDistributionUnit === 0) {
      if (planData !== null) {
        if (!songMastered) {
          return true;
        }
        if (songMastered) {
          if (users?.productCounts?.aIMasteringUnit > 0) {
            if (payWithSubMastering) {
              if (users?.productCounts?.aIMasteringUnit >= noOfSongs) {
                return true;
              }
              if (users?.productCounts?.aIMasteringUnit < noOfSongs) {
                if (masteringData !== null) {
                  return true;
                }
              }
              return false;
            }
            return false;
          }
          if (users?.productCounts?.aIMasteringUnit == 0) {
            if (masteringData !== null) {
              return true;
            }

            return false;
          }
          return false;
        }
      }
      return false;
    }

    return false;
  };

  const handleCouponApply = () => {
    const data = {
      code: couponCode,
      type: "individual"
    };
    dispatch(applyCouponAsync(data)).then((res: any) => {
      if (res?.payload?.statusCode === 200) {
        const couponItem = res?.payload?.data;
        setCouponData(res?.payload?.data);
        if (couponItem.type === "numerical" && GrandTotal < couponItem.value) {
          toast.error("Coupon Value must be greater than total amount", {
            position: "top-right"
          });
          return;
        }
        setIsCoupon(true);
        const discountData = () => {
          if (couponItem.type === "percentile") {
            const discount =
              GrandTotal - GrandTotal * (1 - couponItem.value / 100);
            const formattedDiscount = Number.isInteger(discount)
              ? discount
              : discount.toFixed(2);
            return formattedDiscount;
          }

          if (couponItem.type === "numerical") {
            return couponItem.value;
          }
        };

        setDiscountPrice(discountData);
      }
    });
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setIsCoupon(false);
    setDiscountPrice(0);
    // setPayWithWallet(false);
    setCouponData(null);
  };

  useEffect(() => {
    if (masteringData) {
      setPayWithWallet(false);
      setCouponCode("");
      setIsCoupon(false);
      setDiscountPrice(0);
    }
  }, [masteringData]);

  useEffect(() => {
    if (payWithWallet) {
      let amount = totalAmountWithDiscount();
      const maxApplicableCoins = Math.min(amount, users?.wallet);
      setTotalCoinApplied(maxApplicableCoins);
    }
  }, [isCoupon, payWithWallet]);

  useEffect(() => {
    if (planData) {
      setSongMastered(false);
      setMasteringData(null);
    }
  }, [planData]);

  useEffect(() => {
    if (
      users?.subscriptionCount?.musicDistribution > 0
    ) {
      dispatch(getPlanDetailAsync());
    }
  }, []);

  return (
    <>
      {users?.subscriptionCount?.musicDistribution > 1 && (
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            padding: "20px 10px",
            marginY: "16px"
          }}
        >
          <Typography variant="h5" pb={2} pl={1}>
            Choose Your Subscription Type
          </Typography>
          <Box
            sx={{
              paddingX: 2
            }}
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)"
            }}
          >
            {musicDistribution?.map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  padding: "20px 10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    selectedCard?._id === item?._id ? "orange" : "white",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease"
                }}
                onClick={() => handleCardClick(item, index)}
              >
                {/* Displaying Name and Balance */}
                <Typography variant="h6" textTransform={"capitalize"}>
                  {item.name}
                </Typography>
                <Typography variant="body2">Balance: {item.balance}</Typography>
              </Card>
            ))}
          </Box>
        </Card>
      )}
      {users?.productCounts?.musicDistributionUnit < 1 && (
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            padding: "20px 10px",
            marginY: "16px"
          }}
        >
          <PricingCard planData={planData} setPlanData={handleSelectPlan} />
        </Card>
      )}
      {(planData?.productName !== "starter" && selectedCard?.name !== 'starter' && !isFreePlan)&& (
        <Box my={3}>
          <Card
            sx={{
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
            }}
          >
            <Box p={3}>
              <Typography variant="h5" pb={2}>
                Do you want your tracks to be mastered?
              </Typography>
              <Grid container spacing={3}>
                {/* =================== Before Mastered Audio ====================*/}
                <Grid item lg={6} xs={12}>
                  <Card
                    sx={{
                      borderRadius: "25px",
                      p: 2
                    }}
                  >
                    <Box>
                      <audio controls style={{ width: "100%" }}>
                        <source
                          src="https://delivertune.s3.ap-south-1.amazonaws.com/audios/OriginalAudio.mp3"
                          type="audio/mpeg"
                        />
                        <source
                          src="https://delivertune.s3.ap-south-1.amazonaws.com/audios/OriginalAudio.mp3"
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </Box>
                    <Box my={1}>
                      <Typography
                        fontSize={20}
                        textAlign="center"
                        pb={0.5}
                        fontWeight={600}
                        color={theme.palette.primary.main}
                      >
                        Sample Before Mastered Audio
                      </Typography>
                      <Typography textAlign="center">
                        By selecting below option, your song will be sent for
                        masteringpurpose
                      </Typography>
                    </Box>
                  </Card>
                </Grid>

                {/* ================== Mastered Audio =============== */}
                <Grid item lg={6} xs={12}>
                  <Card
                    sx={{
                      borderRadius: "25px",
                      p: 2
                    }}
                  >
                    <Box>
                      <audio controls style={{ width: "100%" }}>
                        <source
                          src="https://delivertune.s3.ap-south-1.amazonaws.com/audios/MasteredAudio.wav"
                          type="audio/mpeg"
                        />
                        <source
                          src="https://delivertune.s3.ap-south-1.amazonaws.com/audios/MasteredAudio.wav"
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </Box>
                    <Box my={1}>
                      <Typography
                        fontSize={20}
                        textAlign="center"
                        pb={0.5}
                        fontWeight={600}
                        color={theme.palette.primary.main}
                      >
                        Sample After Mastered Audio
                      </Typography>
                      <Typography textAlign="center">
                        Your Mastered audio will be sent to platforms and you
                        can download the same from your dashboard
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
              <FormControlLabel
                sx={{ pt: 2 }}
                control={
                  <Checkbox
                    checked={songMastered}
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Typography fontSize={18}>
                    Yes I Want My Song Mastered
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Box>
      )}

      {songMastered && isMasterCardVisible && (
        <MasteringPlan setPlanData={setMasteringData} />
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
            lg: "repeat(2, 1fr)"
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
                {planData?.productName !== "starter" && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>AI Mastering</Typography>
                    <InputLabel>{masteringAmt | 0}</InputLabel>
                  </Box>
                )}
                {isCoupon && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Discount</Typography>
                    <InputLabel>- {discountPrice}</InputLabel>
                  </Box>
                )}
                {payWithWallet && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Applied Coins</Typography>
                    <InputLabel>- {totalCoinApplied}</InputLabel>
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />

                {users?.productCounts?.musicDistributionUnit >= 1 && (
                  <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                    <Checkbox
                      checked={payWithSubscription}
                      onChange={(e) => setPayWithSubscription(e.target.checked)}
                      disabled={users?.subscriptionCount?.musicDistribution > 1 && !selectedCard}
                    />
                    <Typography>
                      Pay With Subscription (Music Distribution):
                    </Typography>
                    <Typography>
                      <InputLabel
                        sx={{
                          ml: 1,
                          color: "orange",
                          whiteSpace: "normal",
                          wordBreak: "break-word"
                        }}
                      >
                        {users?.productCounts?.musicDistributionUnit} unit
                      </InputLabel>
                    </Typography>
                  </Box>
                )}

                {songMastered &&
                  users?.productCounts?.aIMasteringUnit !== 0 && (
                    <>
                      <Box
                        sx={{ display: "flex", alignItems: "center", my: 2 }}
                      >
                        <Checkbox
                          checked={payWithSubMastering}
                          onChange={(e) =>
                            setPayWithSubMastering(e.target.checked)
                          }
                        />
                        <Typography>
                          Pay With Subscription (AI Mastering):
                        </Typography>
                        <Typography>
                          <InputLabel
                            sx={{
                              ml: 1,
                              color: "orange",
                              whiteSpace: "normal",
                              wordBreak: "break-word"
                            }}
                          >
                            {users?.productCounts?.aIMasteringUnit} unit
                          </InputLabel>
                        </Typography>
                      </Box>
                      {showNote && payWithSubMastering && (
                        <Typography color="error">
                          Note : You don &apos;t have enough unit for mastering
                          , Please select any mastering plan also.{" "}
                        </Typography>
                      )}
                      {!payWithSubMastering && masteringData && (
                        <Typography color="error">
                          Note : To proceed further, also select pay with
                          subscription.
                        </Typography>
                      )}
                    </>
                  )}
                {planData?.productName !== "starter" && (
                  <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                    <Checkbox
                      checked={payWithWallet}
                      disabled={
                        users?.wallet === 0 ||
                        (!payWithWallet && GrandTotal == 0)
                      }
                      onChange={(e) => {
                        handlePayWithCoin(e);
                        handleRemoveCoupon();
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
                )}
                {planData?.productName !== "starter" && (
                  <Box mt={3}>
                    {isCoupon ? (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          bgcolor: "#ebf0ef",
                          p: 1,
                          borderRadius: 1,
                          mb: 1
                        }}
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
                          <Typography
                            sx={{ fontSize: "12px", fontWeight: 600 }}
                          >
                            {" "}
                            {couponCode}{" "}
                          </Typography>
                        </Stack>
                        <Button
                          color="error"
                          onClick={() => handleRemoveCoupon()}
                        >
                          REMOVE
                        </Button>
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          placeholder="Enter your coupon code.."
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <LoadingButton
                          loading={couponLoader}
                          onClick={() => handleCouponApply()}
                          variant="contained"
                          disabled={GrandTotal == 0}
                          color="warning"
                          sx={{ ml: 1 }}
                        >
                          Apply
                        </LoadingButton>
                      </Box>
                    )}
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Grand Total</Typography>
                  <InputLabel>
                    ₹{" "}
                    {Number.isInteger(GrandTotal)
                      ? GrandTotal
                      : GrandTotal.toFixed(2)}
                  </InputLabel>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
        <CustomStepButton
          activeTab={activeTab}
          handleBack={handleBack}
          steps={steps}
          loading={isSubmitting}
          handleNext={onSubmit}
          disabled={!isPaymentButtonEnabled()}
        />
      </Box>
    </>
  );
};

export default PaymentPlan;
