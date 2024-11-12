"use client";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useState } from "react";
import "./createaccount.css";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography
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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NewUserSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Confirm Password must be same as Password"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Mobile Number is required"),
  referral: Yup.string()
});
interface CreateAccountProps {
  setUserData: any;
  setIsOtp: any;
}

export default function CreateAccount({
  setUserData,
  setIsOtp
}: CreateAccountProps) {
  const { isSubmitting } = useSelector((state: RootState) => state?.users);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      referral: ""
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues
  });
  const { reset, handleSubmit, control } = methods;

  const onSubmit = (data: any) => {
    const payload = {
      email: data?.email,
      password: data?.password,
      phone: data?.phone,
      role: "artist",
      name: {
        first: data?.firstName,
        last: data?.lastName
      },
      refercode: data?.referral
    };
    dispatch(addUserAsync(payload)).then((res) => {
      if (res?.payload?.error === false) {
        setUserData(payload);
        setIsOtp(true);
        reset();
      } else {
        toast.error(res?.payload?.message,{position:'top-right'});
        setIsOtp(false);
      }
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2} mt={-3} direction="column">
        <Stack gap={2} direction={{ sm: "row", xs: "column" }}>
          <Stack sx={{ gap: "0.85rem" }} width="100%">
            <Typography variant="body1" color="initial">
              First Name
            </Typography>
            <RHFTextField
              fullWidth
              placeholder="Enter your first name"
              name="firstName"
              size="small"
            />
          </Stack>
          <Stack sx={{ gap: "0.85rem" }} width="100%">
            <Typography variant="body1" color="initial">
              Last Name
            </Typography>
            <RHFTextField
              fullWidth
              placeholder="Enter your last name"
              name="lastName"
              size="small"
            />
          </Stack>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1" color="initial">
            Mobile Number
          </Typography>
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <PhoneInput
                  {...field}
                  international
                  defaultCountry="IN"
                  countryCallingCodeEditable={false}
                  placeholder="Enter Your Mobile Number"
                  flags={flags}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                />
                {error && (
                  <Typography variant="body2" color="error">
                    {error.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1" color="initial">
            Email
          </Typography>
          <RHFTextField placeholder="Enter Email" name="email" size="small" />
        </Stack>
        <Stack gap={2} direction={{ sm: "row", xs: "column" }}>
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
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Stack>
          <Stack sx={{ gap: "0.85rem" }}>
            <Typography variant="body1" color="initial">
              Confirm Password
            </Typography>
            <RHFTextField
              size="small"
              name="confirmPassword"
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      <Icon
                        icon={
                          showConfirmPassword
                            ? "eva:eye-fill"
                            : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Stack>
        </Stack>
        <Stack sx={{ gap: "0.85rem" }}>
          <Typography variant="body1" color="initial">
            Referral Code (optional)
          </Typography>
          <RHFTextField placeholder="Enter Code" name="referral" size="small" />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2
          }}
        >
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            sx={{
              textTransform: "capitalize",
              color: "white",
              borderRadius: "50px",
              flex: 1, // Make the button take equal space
              mr: 1 // Add some margin to separate the buttons
            }}
          >
            Send OTP
          </LoadingButton>
          <Button
            type="submit"
            variant="outlined"
            LinkComponent="a"
            href="/"
            sx={{
              textTransform: "capitalize",
              borderRadius: "50px",
              flex: 1, // Make the button take equal space
              ml: 1 // Add some margin to separate the buttons
            }}
          >
            Go Back
          </Button>
        </Box>

      </Stack>

      <Divider sx={{ paddingY: 1.5 }}>
        <Typography variant="body1" color="gray">
          Or
        </Typography>
      </Divider>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="body1">Already have an account?</Typography> &nbsp;
        <Link href="/auth/login" style={{ color: "#ff8B00" }}>
          <Typography>Login</Typography>
        </Link>
      </Box>
    </FormProvider>
  );
}