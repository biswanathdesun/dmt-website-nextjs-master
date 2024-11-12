"use client";

import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { Box, Card, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getAadharOtpRequestAsync,
  getBankDetailsAsync,
  getVerifyAadharotpAsync,
} from "@/redux/services/bank";
import toast from "react-hot-toast";
import RHFAutocomplete from "@/components/hook-form/RHFAutocomplete";
import RHFUploadAvtar from "@/components/hook-form/RHFUploadAvtar";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { capitalize } from "lodash";
import { getUsersDetailsAsync } from "@/redux/services/profile";
import { AutoAwesomeMosaicOutlined } from "@mui/icons-material";

const accountTypes = [
 "current" ,
   "saving" ,
];

const NewUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  accountType: Yup.string().required("Account Type is required"),
  IFSCCode: Yup.string().required("IFSC code is required"),
  accountNumber: Yup.string().required("Account Number is required"),
  gstNumber: Yup.string(),
  panNumber: Yup.string().required("PAN Number is required"),
  aadharNumber: Yup.string().required("Aadhar Number is required"),
  otp: Yup.string()
});

interface FileWithPreview extends File {
  preview: string;
}

export default function ContactUs() {
  const [gstFile, setGstFile] = useState<FileWithPreview | null>(null);
  const [panFile, setPanFile] = useState<FileWithPreview | null>(null);
  const [bankFile, setBankFile] = useState<FileWithPreview | null>(null);
  const { bankData, aadharLoading, aadharData } = useSelector(
    (state: RootState) => state?.bank
  );
  const [aadhar, setaadhar] = useState("");
  const [verifyLoading , setVerifyLoading] = useState(false);
  const { users } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const isAadharVerified = isEdit ? isVerified : users?.is_aadhar_verified;
 
console.log(aadhar,'a')
  const handleDialogOpen = () => {
    const payload = {
      aadharNumber: aadhar,
    };
    dispatch(getAadharOtpRequestAsync(payload))
      .then((res) => {
        if (res.payload?.statusCode === 200) {
          setDialogOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 const defaultValues = useMemo(
   () => ({
     name: "",
     accountType: "",
     accountNumber: "",
     IFSCCode: "",
     gstNumber: "",
     panNumber: "",
     aadharNumber: "",
     otp: ""
   }),
   []
 );

 const methods = useForm({
   resolver: yupResolver(NewUserSchema),
   defaultValues
 });

 const {
   handleSubmit,
   setValue,
   formState: { errors },
   control
 } = methods;
  const handleDialogClose = () => {
    setValue("otp", '')
    setOtp('')
    setDialogOpen(false);
     setFormData(new FormData());
  };
  const submitBankDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_KEY}users/bank`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response?.data?.error === false) {
          toast.success("Payment details submitted successfully", {
            position: "top-right"
          });
          setFormData(new FormData());
          setIsEdit(false);
        } else {
          toast.error(response?.data?.message, { position: "top-right" });
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    } catch (error) {
      toast.error("An error occurred while submitting payment details.", {
        position: "top-right"
      });
    }
  };

  const handleVerify = () => {
setVerifyLoading(true)

    const payload = {
      otp: otp,
      reference_id:String(aadharData?.reference_id)
    };
    dispatch(getVerifyAadharotpAsync(payload))
      .then((res) => {
        setVerifyLoading(false);
        if (
          res.payload?.statusCode === 200 &&
          res?.payload?.message === "Aadhaar Card Exists"
        ) {
          toast.success(res.payload?.message, { position: "top-right" });
          setDialogOpen(false);
          setIsVerified(true);
          dispatch(getUsersDetailsAsync());
          submitBankDetails();
        }
        else {
           toast.error(res.payload?.message, { position: "top-right" });
        }
      })
      .catch((error) => {
          setVerifyLoading(false);
        console.log(error);
      });
  };



  const onSubmit = async (value: any) => {
   handleDialogOpen();
    formData.append("fullName", value.name);
    formData.append("accountNo", value.accountNumber);
    formData.append("accountType", value.accountType);
    formData.append("ifscCode", value.IFSCCode);
    formData.append("gstNo", value.gstNumber);
    formData.append("panNo", value.panNumber);
    formData.append("aadharNumber", value.aadharNumber);
    if (gstFile) {
      formData.append("gstFile", gstFile);
    } else {
      console.error("gstFile is null or undefined");
    }
    if (panFile) {
      formData.append("panFile", panFile);
    } else {
      console.error("panFile is null or undefined");
    }
    if (bankFile) {
      formData.append("bankFile", bankFile);
    } else {
      console.error("bankFile is null or undefined");
    }
 setFormData(formData);
  };

  useEffect(() => {
    if (users?._id) {
      dispatch(getBankDetailsAsync({ artistId: users?._id }));
    }
  }, [dispatch, users?._id]);

  useEffect(() => {
    if (bankData) {
      setValue("name", bankData?.fullName);
      setValue("accountType", bankData?.accountType);
      setValue("accountNumber", bankData?.accountNo);
      setValue("IFSCCode", bankData?.ifscCode);
      setValue("gstNumber", bankData?.gstNo);
      setValue("panNumber", bankData?.panNo);
      setValue("aadharNumber", bankData?.aadharNumber);
      setaadhar(bankData?.aadharNumber);
           if (bankData?.gstFile) {
             const fileWithPreview: FileWithPreview = {
               preview: bankData?.gstFile,
               lastModified: 0,
               name: "",
               webkitRelativePath: "",
               size: 0,
               type: "",
               arrayBuffer: function (): Promise<ArrayBuffer> {
                 throw new Error("Function not implemented.");
               },
               slice: function (
                 start?: number,
                 end?: number,
                 contentType?: string
               ): Blob {
                 throw new Error("Function not implemented.");
               },
               stream: function (): ReadableStream<Uint8Array> {
                 throw new Error("Function not implemented.");
               },
               text: function (): Promise<string> {
                 throw new Error("Function not implemented.");
               }
             };
             setGstFile(fileWithPreview);
           }
           if (bankData?.panFile) {
             const fileWithPreview: FileWithPreview = {
               preview: bankData?.panFile,
               lastModified: 0,
               name: "",
               webkitRelativePath: "",
               size: 0,
               type: "",
               arrayBuffer: function (): Promise<ArrayBuffer> {
                 throw new Error("Function not implemented.");
               },
               slice: function (
                 start?: number,
                 end?: number,
                 contentType?: string
               ): Blob {
                 throw new Error("Function not implemented.");
               },
               stream: function (): ReadableStream<Uint8Array> {
                 throw new Error("Function not implemented.");
               },
               text: function (): Promise<string> {
                 throw new Error("Function not implemented.");
               }
             };
             setPanFile(fileWithPreview);
           }
           if (bankData?.bankFile) {
             const fileWithPreview: FileWithPreview = {
               preview: bankData?.bankFile,
               lastModified: 0,
               name: "",
               webkitRelativePath: "",
               size: 0,
               type: "",
               arrayBuffer: function (): Promise<ArrayBuffer> {
                 throw new Error("Function not implemented.");
               },
               slice: function (
                 start?: number,
                 end?: number,
                 contentType?: string
               ): Blob {
                 throw new Error("Function not implemented.");
               },
               stream: function (): ReadableStream<Uint8Array> {
                 throw new Error("Function not implemented.");
               },
               text: function (): Promise<string> {
                 throw new Error("Function not implemented.");
               }
             };
             setBankFile(fileWithPreview);
           }
    }
  }, [bankData, setValue]);

  return (
    <Container>
      <Grid container direction={{ xs: "column-reverse", md: "row" }}>
        <Grid item xs={12} marginY={4}>
          <Container>
            <Card sx={{ boxShadow: 3, padding: 3 }}>
              <Stack
                direction="row"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  pb={4}
                  sx={{
                    fontFamily: "Raleway",
                    fontWeight: "700",
                    fontSize: { xs: "2rem", md: "2rem" }
                  }}
                >
                  Payment Details
                </Typography>
              </Stack>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={4} direction="column">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography variant="body1" color="initial">
                          Full Name
                        </Typography>
                        <RHFTextField
                          placeholder="Full Name"
                          name="name"
                          size="small"
                          disabled={!isEdit}
                        />
                      </Stack>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography variant="body1" color="initial">
                          Account Type
                        </Typography>
                        <RHFAutocomplete
                          placeholder="Account Type"
                          name="accountType"
                          size="small"
                          getOptionLabel={(option) => capitalize(option)}
                          options={accountTypes}
                          disabled={!isEdit}
                        />
                      </Stack>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography variant="body1" color="initial">
                          Account Number
                        </Typography>
                        <RHFTextField
                          placeholder="Enter Account number"
                          name="accountNumber"
                          size="small"
                          disabled={!isEdit}
                        />
                      </Stack>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography variant="body1" color="initial">
                          IFSC Code
                        </Typography>
                        <RHFTextField
                          placeholder="Enter IFSC code"
                          name="IFSCCode"
                          size="small"
                          disabled={!isEdit}
                        />
                      </Stack>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography variant="body1" color="initial">
                          GST Number
                        </Typography>
                        <RHFTextField
                          placeholder="Enter GST Number"
                          name="gstNumber"
                          size="small"
                          disabled={!isEdit}
                        />
                      </Stack>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography variant="body1" color="initial">
                          PAN Number
                        </Typography>
                        <RHFTextField
                          placeholder="Enter PAN Number"
                          name="panNumber"
                          size="small"
                          disabled={!isEdit}
                        />
                      </Stack>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography variant="body1" color="initial">
                          Aadhar Number
                        </Typography>{" "}
                        <Box display="flex">
                          <Controller
                            name="aadharNumber"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <TextField
                                size="small"
                                {...field}
                                placeholder="Aadhar Number"
                                type="text"
                                // inputProps={{
                                //   inputMode: "numeric",
                                //   pattern: "[0-9]*"
                                // }}
                                error={!!error}
                                fullWidth
                                disabled={!isEdit}
                                helperText={error ? error.message : null}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  if (numericValue.length <= 12) {
                                    field.onChange(numericValue);
                                    setaadhar(numericValue);
                                  } else {
                                    field.onChange(numericValue.slice(0, 12));
                                    setaadhar(numericValue.slice(0, 12));
                                  }
                                  setIsVerified(false);
                                }}
                              />
                            )}
                          />
                          {isAadharVerified ? (
                            bankData?.aadharNumber !== null && (
                              <Box display="flex" alignItems="center" ml={1}>
                                <Chip
                                  label="Verified"
                                  size="small"
                                  sx={{
                                    color: "#189948",
                                    backgroundColor: "#daf5e4"
                                  }}
                                />
                              </Box>
                            )
                          ) : (
                            <Box display="flex" alignItems="center" ml={1}>
                              <Chip
                                label="Not Verified"
                                size="small"
                                sx={{
                                  color: "#eb1810",
                                  backgroundColor: "#f7d2d0"
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography variant="body1" color="initial">
                          GST Certificate Document
                        </Typography>
                        <RHFUploadAvtar
                          label=""
                          name="gstDocument"
                          setProfile={setGstFile}
                          profile={gstFile}
                          title="Drop or Choose your GST Certificate Document"
                          disabled={!isEdit}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography variant="body1" color="initial">
                          PAN Card Document
                        </Typography>
                        <RHFUploadAvtar
                          label=""
                          name="panDocument"
                          setProfile={setPanFile}
                          profile={panFile}
                          title="Drop or Choose your PAN Card Document"
                          disabled={!isEdit}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography variant="body1" color="initial">
                          Bank Details Document
                        </Typography>
                        <RHFUploadAvtar
                          label=""
                          name="bankDocument"
                          setProfile={setBankFile}
                          profile={bankFile}
                          title="Drop or Choose your Bank Details Document"
                          disabled={!isEdit}
                        />
                      </Stack>
                    </Grid>
                    {/* Additional grid items for other documents */}
                  </Grid>
                </Stack>
                <Stack
                  gap={1}
                  direction="row"
                  display="flex"
                  justifyContent="center"
                  py={3}
                >
                  <Button
                    size="small"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "50px"
                    }}
                    variant="outlined"
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setIsVerified(false);
                       setFormData(new FormData());
                    }}
                  >
                    {isEdit ? "Cancel Edit" : "Edit"}
                  </Button>
                  <LoadingButton
                    disabled={!isEdit}
                    loading={aadharLoading}
                    type="submit"
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      color: "white",
                      borderRadius: "50px"
                    }}
                  >
                    Submit
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </Card>
          </Container>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen}>
        <DialogTitle>Aadhar Verification</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="initial">
            Enter the OTP sent to your registered mobile number.
          </Typography>
          <Controller
            name="otp"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                size="small"
                {...field}
                placeholder="Enter OTP"
                type="text"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*"
                }}
                error={!!error}
                fullWidth
                helperText={error?.message}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/[^0-9]/g, "");
                  if (numericValue.length <= 6) {
                    field.onChange(numericValue);
                    setOtp(e.target.value);
                  } else {
                    field.onChange(numericValue.slice(0, 6));
                  }
                  setOtp(numericValue.slice(0, 6));
                  {
                  }
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            loading={verifyLoading}
            onClick={handleVerify}
            color="primary"
            size="small"
            disabled={otp?.length !== 6}
          >
            Verify
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
