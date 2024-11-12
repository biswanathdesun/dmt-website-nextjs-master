"use client";
import FormProvider from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import type { AppDispatch } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUserAsync, verifyOtpAsync } from "@/redux/services/user";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { addToCartAsync } from "@/redux/services/cart";

interface OTPFormProps {
  userData: object;
  setIsOtp: any;
}
const NewUserSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is required"),
});

export default function OTPForm({ userData, setIsOtp }: OTPFormProps) {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(90);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const defaultValues = useMemo(
    () => ({
      otp: "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const { control, reset, handleSubmit } = methods;
  const onSubmit = (data: any) => {
    setIsLoading(true);
    const payload = {
      ...userData,
      otp: data?.otp,
    };
    dispatch(verifyOtpAsync(payload))
      .then((res) => {
        if (res?.payload?.error === false) {
          toast.success(
            "Thank you so much for signing up, login to access your dashboard",
            {
              position: "top-right",
            }
          );
          setIsLoading(false);
          localStorage.setItem("token", res?.payload?.user?.token);
          localStorage.setItem(
            "userData",
            JSON.stringify(res?.payload?.user?.user)
          );
          const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
          const FinalcartData = {
            products: cartData.map((item: any) => {
              const { totalPrice, ...restOfItem } = item;
              return restOfItem;
            }),
          };
          if (cartData && cartData?.length) {
            dispatch(addToCartAsync(FinalcartData)).then((res: any) => {
              if (res?.payload?.statusCode === 200) {
                localStorage.removeItem("cart");
              }
            });
          }    if (redirect) {
            router.push(redirect as string);
          } else {
            router.push("/dashboard/main");
          }
          // router.push("/dashboard/main");
          // return;
        } else {
          setIsLoading(false);
          toast.error(res?.payload?.message, {
            position: "top-right",
          });
          setIsOtp(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime: number) => prevTime - 1);
      }, 1000); // Update the timer every 1 second (1000 ms)

      return () => {
        clearInterval(timer); // Clean up the timer when the component unmounts
      };
    }
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const handleResendOtp = () => {
    dispatch(addUserAsync(userData));
    setTime(90);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4} direction="column">
        <Typography
          color="#555555"
          sx={{ fontSize: { xs: 16, sm: 18 }, mt: { xs: -2, sm: -3, md: -4 } }}
        >
          We’ve sent an OTP to your phone number & email id.
        </Typography>
        <Stack sx={{ gap: "0.85rem" }}>
          <Typography variant="body1" color="initial">
            One Time Password
          </Typography>
          <Controller
            name="otp"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                size="small"
                {...field}
                placeholder="Enter OTP"
                type="text" // Changed to "text" to avoid number-specific UI elements
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                error={!!error}
                fullWidth
                helperText={error?.message}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Validate that input is numeric and within the allowed length
                  const numericValue = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                  if (numericValue.length <= 6) {
                    field.onChange(numericValue);
                  } else {
                    field.onChange(numericValue.slice(0, 6));
                  }
                }}
              />
            )}
          />
        </Stack>

        <LoadingButton
          type="submit"
          variant="contained"
          sx={{
            textTransform: "capitalize",
            color: "white",
            borderRadius: "50px",
          }}
          loading={isLoading}
        >
          Verify OTP
        </LoadingButton>
        <Typography>
          Didn&apos;t receive the code!{" "}
          {minutes === 0 && seconds === 0 ? (
            <Button
              sx={{
                p: 0,
                // ,textTransform:'lowercase'
              }}
              onClick={() => handleResendOtp()}
            >
              Resend
            </Button>
          ) : (
            `Resend OTP in ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds
            }`
          )}
        </Typography>
        <Divider sx={{ paddingTop: 2 }}>
          <Typography variant="body1" color="gray">
            Or
          </Typography>
        </Divider>

        {/* <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={2}
          display="flex"
          justifyContent="center"
        >
          <Button
            variant="outlined"
            sx={{ color: "black", borderColor: "grey.500" }}
          >
            <Icon icon="logos:google-icon" />
            <Typography paddingX={1} textTransform="capitalize">
              Sign up With Google
            </Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "black", borderColor: "grey.500" }}
          >
            <Icon icon="ri:facebook-fill" color="#0e27e1" />
            <Typography paddingX={1} textTransform="capitalize">
              Sign up With Facebook
            </Typography>
          </Button>
        </Stack> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Already have an account?</Typography>{" "}
          &nbsp;
          <Link href="/auth/login" style={{ color: "#ff8B00" }}>
            <Typography>Login</Typography>
          </Link>
        </Box>
      </Stack>
    </FormProvider>
  );
}
