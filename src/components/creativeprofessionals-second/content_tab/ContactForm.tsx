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
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { changePasswordAsync } from "@/redux/services/changePassword";
import { useRouter } from "next/navigation";
import AddContact from "../addSecond/AddContact";
import Im1 from "@public/images/Creativepro2/gallery/BorderImage.png";
import Im4 from "@public/images/Creativepro2/Event/Im4.png";
import Img5 from "@public/images/Creativepro2/listen/Img5.png";
import Img4 from "@public/images/Creativepro2/listen/Img4.png";
import Image from "next/image";

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
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

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
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -97,
            left: -30,
            width: { xs: "330px", sm: "500px" },
            height: "auto",
          }}
        >
          <Image src={Im1} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: { md: -90, sm: -95 },
            right: { lg: -10, sm: -10, xs: -20 },
            width: "200px",
            height: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Image src={Img4} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
      <Box sx={{ mt: 10 }}>
        <Typography
          gutterBottom
          variant="h2"
          color="white"
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontSize: {
              xs: "2.5rem",
              md: "3rem",
            },
            fontWeight: "bold",
            color: "#00d8c0",
            WebkitTextStroke: {
              xs: "1px black",
              sm: "1.5px black",
            },
            fontStyle: "italic",
            transform: "scaleY(1.5)",
            mb: { xs: 2, sm: 5 },
            mt: { xs: 8, sm: 2 },
          }}
        >
          Contact
        </Typography>
        <Button
          size="small"
          sx={{
            backgroundColor: "#00d8c0",
            color: "#fff",
            border: "2px solid #fff",
            borderRadius: "25px",
            marginY: 2,
            left: { md: 460, xs: 130, sm: 330, lg: 720 },
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
                  width: { xs: "50%", sm: "40%", md: "30%" },
                  borderRadius: "3px",
                  backgroundColor: "#ff599e",
                  color: "#fce23b",
                  fontWeight: "bold",
                  border: "2px solid black",
                  fontFamily: "anton",
                  "&:hover": {
                    backgroundColor: "#ff599e",
                  },
                }}
              >
                Submit
              </LoadingButton>
            </Box>
          </Stack>
        </FormProvider>
      </Container>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 100,
            left: { lg: 100, md: 10, xs: 0 },
            width: "120px",
            height: "auto",
            display: { sm: "block", xs: "none" },
          }}
        >
          <Image src={Im4} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: { lg: 150, md: 70, sm: 70 },
            right: { sm: 0, md: 10, lg: 100, xs: 100 },
            width: "150px",
            height: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Image src={Img5} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
    </>
  );
}
