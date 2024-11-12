"use client";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useState } from "react";
import {
  Box,
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
import { forgotPasswordAsync, loginUserAsync } from "@/redux/services/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const NewUserSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

export default function AuthForgetPassword() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { isSubmitting } = useSelector((state: RootState) => state?.users);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const defaultValues = useMemo(
    () => ({
      email: "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;
  const onSubmit = (values: any) => {
    console.log(values);
    const payload = {
      email: values.email,
    };
    dispatch(forgotPasswordAsync(payload)).then((res) => {
      if (res?.payload?.error === false) {
        toast.success("An email has been sent to your account if it exist!", {
          position: "top-right",
        });
        localStorage.setItem("token", res?.payload?.user?.token);
        // localStorage.setItem(
        //   "userData",
        //   JSON.stringify(res?.payload?.user?.user)
        // );
        // router.push("/auth/reset-password");
      } else {
        toast.error(res?.payload?.message, { position: "top-right" });
      }
    });
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4} direction="column">
        <Typography pt={2}
          color="#555555"
          sx={{ fontSize: { xs: 16, sm: 18 }, mt: { xs: -2, sm: -3, md: -4 } }}
        >
          Enter the e-mail that you used to create a account and we will
          instruction you how to reset password.
        </Typography>
        <Stack sx={{ gap: "0.85rem" }}>
          <Typography variant="body1" color="initial">
            Email
          </Typography>
          <RHFTextField placeholder="Enter Email" name="email" size="small" />
        </Stack>

        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          sx={{
            textTransform: "capitalize",
            color: "white",
            borderRadius: "50px",
          }}
        >
          Send Email
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
