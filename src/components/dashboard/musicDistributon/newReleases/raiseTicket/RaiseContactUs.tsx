"use client";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { Box, Button, Card, Container, Grid, Toolbar } from "@mui/material";
import React from "react";
import { Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import contactImg from "@public/images/Contactus.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import toast from "react-hot-toast";

import Image from "next/image";
import { postContactAsync } from "@/redux/services/contactUs";

const NewUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  message: Yup.string().required("Query is required"),
  phone: Yup.string().required("Mobile Number is required"),
});

export default function ContactUs() {
  const { isSubmitting } = useSelector((state: RootState) => state?.contactUs);
  let arr = [
    { icon: LocationOnIcon, text: " location" },
    { icon: LocalPhoneIcon, text: " Contact Number" },
    { icon: EmailIcon, text: "Email" },
  ];
  const dispatch: AppDispatch = useDispatch();
  const defaultValues = useMemo(
    () => ({
      name: "",
      email: "",
      phone: "",
      message: "",
      ISRC_UPC: 0,
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = (value: any) => {
    console.log(value);
    const payload = {
      name: value?.name,
      email: value?.email,
      phone: value?.phone,
      message: value?.message,
      ISRC_UPC: value?.ISRC_UPC,
    };
    dispatch(postContactAsync(payload)).then((res) => {
      if (res?.payload?.error === false) {
        toast.success("Message send successfully");
        reset();
      } else {
        toast.error(res?.payload?.message);
      }
    });
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ p:4}}>
        <Typography
          sx={{
            fontFamily: "Raleway",
            fontWeight: "700",
            fontSize: { xs: "2rem", md: "2rem" },
          }}
        >
          Get In Touch
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box
            mt={1}
            rowGap={3}
            columnGap={3}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <Stack>
              <Typography variant="body1" color="initial">
                Name
              </Typography>
              <RHFTextField placeholder="Enter Name" name="name" size="small" />{" "}
            </Stack>
            <Stack>
              <Typography variant="body1" color="initial">
                Email
              </Typography>
              <RHFTextField
                placeholder="Enter Email"
                name="email"
                size="small"
              />
            </Stack>
            <Stack>
              <Typography variant="body1" color="initial">
                Phone Number
              </Typography>
              <RHFTextField
                placeholder="Enter Phone number"
                name="phone"
                size="small"
              />
            </Stack>
            <Stack>
              <Typography variant="body1" color="initial">
                ISRC - UPC (If applicable)
              </Typography>
              <RHFTextField
                placeholder="Enter ISRC-UPC"
                name="ISRC_UPC"
                size="small"
              />
            </Stack>
          </Box>
          <Stack sx={{ mt: 2, Width: "100%" }}>
            <Typography variant="body1" color="initial">
              Query
            </Typography>
            <RHFTextField
              multiline
              placeholder="Enter your query"
              name="message"
              size="small"
              rows={3}
            />
          </Stack>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              LinkComponent="a"
              href="/"
              sx={{
                textTransform: "capitalize",
                color: "white",
                borderRadius: "50px",
                flexGrow: 1,
                width: "auto",
                px: 4, // Adjust padding for better button width
              }}
            >
              Go Back
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                textTransform: "capitalize",
                color: "white",
                borderRadius: "50px",
                flexGrow: 1,
                width: "auto",
                px: 2, // Adjust padding for better button width
              }}
            >
              Send Message
            </LoadingButton>
          </Box>
        </FormProvider>
      </Container>
    </>
  );
}
