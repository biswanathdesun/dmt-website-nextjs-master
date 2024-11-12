"use client";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useState } from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { changePasswordAsync } from "@/redux/services/changePassword";
import { useRouter } from "next/navigation";

const NewUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Mobile No. is required")
    .min(10, "Minimum 10 characters required"),
  emailId: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
});

interface PassFormProps {
  setUserData: any;
  setIsOtp: any;
}

export default function CreativeProfessionals() {
  const [userData, setUserData] = useState(null);
  const [isOtp, setIsOtp] = useState(false);

  return (
    <div>
      <ContactForm setUserData={setUserData} setIsOtp={setIsOtp} />
    </div>
  );
}

function ContactForm({ setUserData, setIsOtp }: PassFormProps) {
  const { isSubmitting } = useSelector(
    (state: RootState) => state?.changePassword
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      name: "",
      phone: "",
      emailId: "",
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
      name: data?.name,
      phone: data?.phone,
      emailId: data?.emailId,
    };
    console.log(payload, "payload");

    dispatch(changePasswordAsync(payload)).then((res) => {
      if (res?.payload?.error === false) {
        toast.success("Password changed successfully");
        setUserData(payload);
        // localStorage.removeItem("token");
        // router.push("/auth/login");
      } else {
        toast.error("Password was not updated");
      }
    });
  };

  return (
    <Container
      sx={{
        background: "#555055",
        padding: "15px",
        borderRadius: "10px",
        maxWidth: "900px",
        width: "100%",
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} mt={5} direction="column">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Stack sx={{ gap: "0.85rem" }}>
                <Typography variant="body1" color="white">
                  Name
                </Typography>
                <RHFTextField
                  size="small"
                  name="name"
                  variant="filled"
                  placeholder="Enter Your Name"
                  fullWidth
                  InputProps={{
                    sx: {
                      color: "white", // text color
                      "& .MuiFilledInput-input": {
                        color: "white", // text color for filled variant
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "rgba(255, 255, 255, 0.5)", // placeholder color
                      },
                    },
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack sx={{ gap: "0.85rem" }}>
                <Typography variant="body1" color="white">
                  Mobile Number
                </Typography>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <RHFTextField
                      fullWidth
                      variant="filled"
                      placeholder="Your Contact Number"
                      color="primary"
                      size="small"
                      {...field}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputProps={{
                        sx: {
                          color: "white", // text color
                          "& .MuiFilledInput-input": {
                            color: "white", // text color for filled variant
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(255, 255, 255, 0.5)", // placeholder color
                          },
                        },
                      }}
                    />
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack sx={{ gap: "0.85rem" }}>
                <Typography variant="body1" color="white">
                  Email ID*
                </Typography>
                <RHFTextField
                  size="small"
                  name="emailId"
                  placeholder="Your email Id"
                  variant="filled"
                  fullWidth
                  InputProps={{
                    sx: {
                      color: "white", // text color
                      "& .MuiFilledInput-input": {
                        color: "white", // text color for filled variant
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "rgba(255, 255, 255, 0.5)", // placeholder color
                      },
                    },
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                color: "white",
                borderRadius: "5px",
                mt: 2,
                "&:hover": {
                  background: "#333",
                },
              }}
            >
              Submit
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Container>
  );
}
