"use client";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
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
import { loginUserAsync, resetPasswordAsync } from "@/redux/services/user";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const NewUserSchema = Yup.object().shape({
  newpassword: Yup.string().required("Password is required"),
  confirmpassword: Yup.string().required("Confirm Password is required"),
});

export default function AuthLoginForm() {
  const router = useRouter() as any;
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { isSubmitting } = useSelector((state: RootState) => state?.users);
  const [showPassword, setShowPassword] = useState(false);
  const defaultValues = useMemo(
    () => ({
      newpassword: "",
      confirmpassword: "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const [Tokenforget, setTokenforget] = useState("");
  const token = searchParams.get("token");

   useEffect(() => {
     if (router?.query?.token) {
       setTokenforget(router.query.token);
     }
   }, [router?.query?.token]); 
  
  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
       const payload = {
         password: values.newpassword,
         token,
       };
    dispatch(resetPasswordAsync(payload)).then((res) => {

      if (res?.payload?.error === false) {
        toast.success("Password Created Successfully!", {
          position: "top-right",
        });
        localStorage.setItem("token", res?.payload?.user?.token);
        localStorage.setItem(
          "userData",
          JSON.stringify(res?.payload?.user?.user)
        );
        router.push("/dashboard/main");
      } else {
        toast.error(res?.payload?.message, { position: "top-right" });
      }
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4} direction="column">
        <Stack sx={{ gap: "0.85rem" }}>
          <Typography variant="body1" color="initial">
            New Password
          </Typography>
          <RHFTextField
            size="small"
            name="newpassword"
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
          />
        </Stack>
        <Stack sx={{ gap: "0.85rem" }}>
          <Typography variant="body1" color="initial">
            Confirm Password
          </Typography>
          <RHFTextField
            size="small"
            name="confirmpassword"
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
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
