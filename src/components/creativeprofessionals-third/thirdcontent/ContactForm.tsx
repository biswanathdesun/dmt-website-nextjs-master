"use client";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useState } from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";
import AddContact from "../addThird/AddContact";

const NewUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Mobile No. is required")
    .min(10, "Minimum 10 characters required")
    .max(12, "Maximum 12 characters are allowed"),
  emailId: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
});

interface PassFormProps {
  setUserData: any;
}

export default function CreativeProfessionals() {
  const [userData, setUserData] = useState(null);

  return (
    <div>
      <ContactForm setUserData={setUserData} />
    </div>
  );
}

function ContactForm({ setUserData }: PassFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const defaultValues = useMemo(
    () => ({
      name: "",
      phone: "",
      emailId: "",
    }),
    []
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      emailId: data.emailId,
    };
    console.log(payload, "payload");

    // Perform your form submission logic here
    setUserData(payload);
    toast.success("Form submitted successfully");
  };

  return (
    <>
      <Typography
        paddingTop={5}
        variant="h1"
        color="black"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: {
            xs: "2.5rem",
            sm: "3rem",
            md: "4rem",
          },
          fontFamily: "monoton",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Contact
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Button
          size="small"
          sx={{
            backgroundColor: "#00d8c0",
            color: "#fff",
            border: "1px solid #000",
            borderRadius: "25px",
            marginY: 2,

            "&:hover": {
              background: "#00d8c0",
            },
          }}
          onClick={handleOpenDialog}
        >
          +ADD
        </Button>
        <AddContact open={openDialog} onClose={handleCloseDialog} />
      </Box>
      <Container
        sx={{
          padding: "15px",
          borderRadius: "10px",
          width: { xs: "100%", sm: "70%", lg: "50%" },
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2} mt={5} direction="column">
            <Grid container gap={3}>
              <Grid item xs={12}>
                <Stack sx={{ gap: "0.85rem" }}>
                  <Typography variant="body1" color="black">
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
                        "&:before": {
                          borderBottomColor: "#4dcab4", // default state
                        },
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottomColor: "#4dcab4", // hover state
                        },
                        "&:after": {
                          borderBottomColor: "#4dcab4", // focused state
                        },
                      },
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack sx={{ gap: "0.85rem" }}>
                  <Typography variant="body1" color="black">
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
                            "&:before": {
                              borderBottomColor: "#4dcab4", // default state
                            },
                            "&:hover:not(.Mui-disabled):before": {
                              borderBottomColor: "#4dcab4", // hover state
                            },
                            "&:after": {
                              borderBottomColor: "#4dcab4", // focused state
                            },
                          },
                          inputProps: {
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          },
                        }}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          field.onChange(numericValue);
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack sx={{ gap: "0.85rem" }}>
                  <Typography variant="body1" color="black">
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
                        "&:before": {
                          borderBottomColor: "#4dcab4", // default state
                        },
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottomColor: "#4dcab4", // hover state
                        },
                        "&:after": {
                          borderBottomColor: "#4dcab4", // focused state
                        },
                      },
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Box display={"flex"} justifyContent={"center"}>
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                variant="contained"
                sx={{
                  width: { xs: "100%", md: "40%" },
                  p: 2,
                  borderRadius: "15px",
                  background: "#4dcab4",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "#4dcab4",
                    color: "white",
                  },
                }}
              >
                Submit
              </LoadingButton>
            </Box>
          </Stack>
        </FormProvider>
      </Container>
    </>
  );
}
