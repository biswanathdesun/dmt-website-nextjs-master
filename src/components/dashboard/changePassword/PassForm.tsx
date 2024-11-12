"use client";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import RHFTextField from "@/components/hook-form/RHFTextField";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react/dist/iconify.js";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";
import { useDispatch, useSelector } from "react-redux";
import { addUserAsync } from "@/redux/services/user";
import type { AppDispatch, RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { changePasswordAsync } from "@/redux/services/changePassword";
import { useRouter } from "next/navigation";

const NewUserSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters required"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "Confirm Password must be same as Password"),
});
interface PassFormProps {
  setUserData: any;
  setIsOtp: any;
}

export default function ParentComponent() {
 
  const [userData, setUserData] = useState(null);
  const [isOtp, setIsOtp] = useState(false);



  return (
    <div>
      <PassForm setUserData={setUserData} setIsOtp={setIsOtp} />
    </div>
  );
}

function PassForm({ setUserData, setIsOtp }: PassFormProps) {
  const { isSubmitting } = useSelector((state: RootState) => state?.changePassword);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const { reset, handleSubmit, control } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
    const payload = {
      currentPassword: data?.currentPassword,
      newPassword: data?.newPassword,
      //confirmPassword: data?.confirmPassword,
    };
    console.log(payload, 'payload');

    dispatch(changePasswordAsync(payload)).then((res) => {
      if (res?.payload?.error === false) {
        toast.success('password change successfully');
        setUserData(payload);
        localStorage.removeItem("token");
        router.push("/auth/login");
        
      } else {
        toast.error("password was  not updated");
      }
    });

  }
  return (
    <Container
      sx={{
        background: "#FB8E0B26",
        padding: "5px",
        height: "90%",
        width: '100%',
        maxWidth: '1200px', // Optional max-width to avoid stretching on large screens
        margin: 'auto' // Center the container
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} mt={5} direction="column">
          <Stack gap={2} direction={{ xs: "column", sm: "row" }}>
            <Stack sx={{ gap: "0.85rem" }} width={{ xs: '100%', sm: '90%' }}>
              <Typography variant="body1" color="initial">
                Current Password
              </Typography>
              <RHFTextField
                size="small"
                name="currentPassword"
                placeholder="Enter Your Current Password"
                type={showPassword ? "text" : "password"}
                fullWidth
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={2} mt={5} direction="column">
          <Stack gap={2} direction={{ xs: "column", sm: "row" }}>
            <Stack sx={{ gap: "0.85rem" }} width={{ xs: '100%', sm: '90%' }}>
              <Typography variant="body1" color="initial">
                New Password
              </Typography>
              <RHFTextField
                size="small"
                name="newPassword"
                placeholder="Enter New Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={2} mt={5} direction="column">
          <Stack gap={2} direction={{ xs: "column", sm: "row" }}>
            <Stack sx={{ gap: "0.85rem" }} width={{ xs: '100%', sm: '90%' }}>
              <Typography variant="body1" color="initial">
                Confirm Password
              </Typography>
              <RHFTextField
                size="small"
                name="confirmPassword"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
              />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent= 'center' marginY={1}>
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                color: "white",
                borderRadius: "5px",
                maxWidth: "150px",
                width: '100%',
                '&:hover': {
                  background: '#333',
                },
              }}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>

  );
}
