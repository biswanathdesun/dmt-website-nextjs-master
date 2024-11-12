"use client";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import RHFTextField from "@/components/hook-form/RHFTextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUserByIdAsync, loginUserAsync } from "@/redux/services/user";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { addToCartAsync } from "@/redux/services/cart";
import axios from "axios";

const NewUserSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function AuthLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const dispatch: AppDispatch = useDispatch();
  const { isSubmitting } = useSelector((state: RootState) => state?.users);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = (values: any) => {
    const payload = {
      email: values.email,
      password: values.password,
      remember: rememberMe,
    };
    dispatch(loginUserAsync(payload)).then((res) => {
      if (res?.payload?.error === false) {
        toast.success("Login Successfully!", { position: "top-right" });
        localStorage.setItem("token", res?.payload?.user?.token);
        localStorage.setItem(
          "userData",
          JSON.stringify(res?.payload?.user?.user)
        );
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        const FinalcartData = {
          products: cartData.map((item: any) => {
            const { totalprice, ...restOfItem } = item;
            return restOfItem;
          }),
        };
        if (cartData && cartData?.length) {
          dispatch(addToCartAsync(FinalcartData)).then((res: any) => {
            if (res?.payload?.statusCode === 200) {
              localStorage.removeItem("cart");
            }
          });
        }
        if (redirect) {
          router.push(redirect as string);
        } else {
          router.push("/dashboard/main");
        }
      } else {
        toast.error(res?.payload?.message, { position: "top-right" });
      }
    });
  };
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_KEY}users`,
            config
          );
          if (response?.data?.error !== true) {
            localStorage.setItem("token", token);
            localStorage.setItem(
              "userData",
              JSON.stringify(response?.data?.data)
            );
            // Required Later
            //  const orderResponse = await axios.get(
            //  `${process.env.NEXT_PUBLIC_API_KEY}admin/orders/copyright/${response.data.data._id}`,config
            //  );

            //  if (orderResponse.data.data.length < 2) {
            
            router.push("/dashboard/main");

            //  }

            // Required Later
            //  else if (orderResponse.data.data.length > 3) {
            //    toast.error("Account Blocked");
            //    setTimeout(() => {
            //      router.push("/signup/artist");
            //    }, 800);
            //  } else if (
            //    orderResponse.data.data.length === 2 ||
            //    orderResponse.data.data.length === 3
            //  ) {
            //    localStorage.setItem(
            //      "caution",
            //      JSON.stringify(
            //        "CAUTION! You have attempted to upload copyrighted song twice on dashboard. After 3 failed attempts, This account will be blocked from distribution permanently *DeliverMyTune reserves the right to admission and seizer of royalty distribution"
            //      )
            //    );
            //  router.push("/artist/dashboard");
            //  }
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchUserData();
    }
  }, [dispatch, router, token]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4} direction="column">
        <Stack sx={{ gap: "0.85rem" }}>
          <Typography variant="body1" color="initial">
            Email
          </Typography>
          <RHFTextField placeholder="Enter Email" name="email" size="small" />
        </Stack>
        <Stack sx={{ gap: "0.85rem" }}>
          <Typography variant="body1" color="initial">
            Password
          </Typography>
          <RHFTextField
            size="small"
            name="password"
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Icon
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
      <Box sx={{ m: 5, display: "flex", justifyContent: "center", gap: 2 }}>
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          sx={{
            textTransform: "capitalize",
            color: "white",
            borderRadius: "50px",
            flexGrow: 1,
            width: "auto",
            px: 4,
          }}
        >
          Login
        </LoadingButton>
        <Button
          type="submit"
          variant="outlined"
          LinkComponent="a"
          href="/"
          sx={{
            textTransform: "capitalize",
            borderRadius: "50px",
            flexGrow: 1,
            width: "auto",
            px: 4, // Adjust padding for better button width
          }}
        >
          Go Back
        </Button>
      </Box>
      <Box
        sx={{
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack sx={{ display: "block" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            }
            label="Remember me"
          />
        </Stack>

        <Stack sx={{ display: "block" }}>
          <Link href="/auth/forgetpassword" style={{ color: "black" }}>
            <Typography variant="body1">Forgot Password?</Typography>
          </Link>
        </Stack>
      </Box>

      <Divider sx={{ pb: 2 }}>
        <Typography variant="body1" color="gray">
          Or
        </Typography>
      </Divider>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="body1">New here?</Typography> &nbsp;
        <Link href="/auth/create-account" style={{ color: "#ff8B00" }}>
          <Typography>Create a New Account</Typography>
        </Link>
      </Box>
    </FormProvider>
  );
}
