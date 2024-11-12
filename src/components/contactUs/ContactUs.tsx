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
  // let arr = [{ icon: LocationOnIcon, text: ' location' },
  //   { icon: LocalPhoneIcon, text: ' Contact Number' }, { icon: EmailIcon, text: 'contact@delivermytune.com' }];
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
    <Container>
      <Grid container direction={{ xs: "column-reverse", md: "row" }}>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{
            backgroundColor: "#FFFFFF",
            display: "flex",
            justifyContent: { xs: "center", md: "normal" },
            alignItems: { xs: "center", md: "normal" },
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              marginTop: { xs: 0, md: 6 },
              width: "100%",
              height: "auto",
              maxWidth: { xs: "300px", sm: "350px", md: "500px" },
              mb: { xs: 2, md: 0 },
            
            }}
          >
            <Image
              width={450}
              height={450}
              alt="Descriptive Alt Text"
              src={contactImg}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          {/* <Card
            sx={{
              backgroundColor: "#fff4e7",
              marginY: 2,
              marginRight: "2px",
              height: {
                xs: "170px", // for small screens
                sm: "180px", // for small to medium screens
                md: "200px", // for medium to large screens
                lg: "216px", // for large screens
              },
              width: {
                xs: "90%", // for small screens
                sm: "85%", // for small to medium screens
                md: "80%", // for medium to large screens
                lg: "500px", // for large screens
              },
            }}
          >
            {arr.map((c, id) => (
              <Typography
                key={id}
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "1.25rem",
                  color: "#000000",
                }}
              >
                <Toolbar>
                  {" "}
                  <div
                    style={{
                      border: "0.75px solid black",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  >
                    <c.icon />
                  </div>
                  {c.text}
                </Toolbar>
              </Typography>
            ))}
          </Card>*/}
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginY: { xs: 3, md: 6 } }}>
          <Container maxWidth="sm">
            <Typography
              sx={{
                fontFamily: "Raleway",
                fontWeight: "700",
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Get In Touch
            </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={4} direction="column">
                <Stack sx={{ gap: "0.85rem", width: "100%" }}>
                  <Typography variant="body1" color="initial">
                    Name
                  </Typography>
                  <RHFTextField
                    placeholder="Enter Name"
                    name="name"
                    size="small"
                  />
                </Stack>
                <Stack sx={{ gap: "0.85rem", width: "100%" }}>
                  <Typography variant="body1" color="initial">
                    Email
                  </Typography>
                  <RHFTextField
                    placeholder="Enter Email"
                    name="email"
                    size="small"
                  />
                </Stack>
                <Stack sx={{ gap: "0.85rem", width: "100%" }}>
                  <Typography variant="body1" color="initial">
                    Phone Number
                  </Typography>
                  <RHFTextField
                    placeholder="Enter Phone number"
                    name="phone"
                    size="small"
                  />
                </Stack>
                <Stack sx={{ gap: "0.85rem", width: "100%" }}>
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
                <Stack sx={{ gap: "0.85rem", width: "100%" }}>
                  <Typography variant="body1" color="initial">
                    ISRC - UPC (If applicable)
                  </Typography>
                  <RHFTextField
                    placeholder="Enter ISRC-UPC"
                    name="ISRC_UPC"
                    size="small"
                  />
                </Stack>
              </Stack>
              <Box
                sx={{ m: 5, display: "flex", justifyContent: "center", gap: 2 }}
              >
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
                    px: 4, // Adjust padding for better button width
                  }}
                >
                  Send Message
                </LoadingButton>
              </Box>
            </FormProvider>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
