/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import RHFAutocomplete from "../hook-form/RHFAutocomplete";
import CustomBreadcrumbs from "../common/CustomBreadcrumbs";
import RHFUploadAvtar from "../hook-form/RHFUploadAvtar";
import FormProvider from "@/components/hook-form/FormProvider";
import {
  getUsersDetailsAsync,
  updateUsersDetailsAsync,
} from "@/redux/services/profile";
import axios from "axios";
import { capitalize } from "lodash";
import Label from "../common/label/Label";

const NewUserSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  stageName: Yup.string(),
  line1: Yup.string(),
  profile: Yup.string(),
  phone: Yup.string(),
  gender: Yup.object().required("Gender is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  address: Yup.string(),
  country: Yup.object().required("Country region is required"),
  zipCode: Yup.string(),
  profileBio: Yup.string(),
  faceBookId: Yup.string()
    .nullable()
    .test(
      "is-valid-facebook-url",
      "Please enter a valid Facebook URL",
      (value) =>
        !value ||
        /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{1,50}\/?(\?.*)?$/.test(
          value
        )
    ),
  instagramId: Yup.string()
    .nullable()
    .test(
      "is-valid-instagram-url",
      "Please enter a valid Instagram URL",
      (value) =>
        !value || // Allow empty or null values
        /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9(_)?]{1,30}\/?(\?.*)?$/.test(
          value
        )
    ),
  youTubeId: Yup.string()
    .nullable()
    .test(
      "is-valid-youtube-url",
      "Please enter a valid YouTube URL",
      (value) =>
        !value ||
        /^https?:\/\/(www\.)?(youtube\.com\/(@[a-zA-Z0-9_]+|[a-zA-Z0-9_-]+)\/?|youtu\.be\/[a-zA-Z0-9_-]+)\/?(\?.*)?$/.test(
          value
        )
    ),
  xId: Yup.string()
    .nullable()
    .test(
      "is-valid-twitter-url",
      "Please enter a valid Twitter URL",
      (value) =>
        !value ||
        /^https?:\/\/(www\.)?x\.com\/[a-zA-Z0-9_]{1,15}\/?(\?.*)?$/.test(value)
    ),
  spotifyId: Yup.string()
    .nullable()
    .test(
      "is-valid-spotify-url",
      "Please enter a valid Spotify URL",
      (value) =>
        !value ||
        /^https?:\/\/(open\.spotify\.com\/(artist|album|track|playlist)\/[a-zA-Z0-9]+|spotify:([a-zA-Z]+:[a-zA-Z0-9]+)+)$/.test(
          value
        )
    ),
  appleId: Yup.string()
    .nullable()
    .test(
      "is-valid-apple-url",
      "Please enter a valid Apple Music URL",
      (value) =>
        !value ||
        /^https?:\/\/music\.apple\.com\/[a-zA-Z]{2}\/album\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9]+\/?(\?.*)?$/.test(
          value
        )
    ),
  soundCloudId: Yup.string()
    .nullable()
    .test(
      "is-valid-soundcloud-url",
      "Please enter a valid SoundCloud URL",
      (value) =>
        !value ||
        /^https?:\/\/(www\.)?soundcloud\.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+\/?(\?.*)?$/.test(
          value
        )
    ),
});

interface ProfileFormProps {
  setUserData: (data: any) => void;
  setIsOtp: (isOtp: boolean) => void;
}

export default function ParentComponent() {
  const [userData, setUserData] = useState(null);
  const [isOtp, setIsOtp] = useState(false);

  return (
    <div>
      <ProfileForm setUserData={setUserData} setIsOtp={setIsOtp} />
    </div>
  );
}

function ProfileForm({ setUserData, setIsOtp }: ProfileFormProps) {
  const { isSubmitting, users } = useSelector(
    (state: RootState) => state?.users
  );

  interface FileWithPreview extends File {
    preview: string;
  }

  const [profile, setProfile] = useState<FileWithPreview | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.userProfile);

  const defaultValues = useMemo(
    () => ({
      email: "",
      firstName: "",
      lastName: "",
      stageName: "",
      line1: "",
      profile: "",
      phone: "",
      address: "",
      gender: null,
      dateOfBirth: null,
      country: null,
      zipCode: "",
      profileBio: "",
      faceBookId: "",
      instagramId: "",
      youTubeId: "",
      xId: "",
      spotifyId: "",
      appleId: "",
      soundCloudId: "",
      // profile: users?.profileDescription || "",
    }),
    []
  );

  const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const countryOptions = [
    { label: "India", value: "india" },
    { label: "America", value: "america" },
    { label: "UAE", value: "uae" },
  ];

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods;

  console.log(errors, "errors");

  const onSubmit = (data: any) => {
    const payload = {
      email: data.email,
      phone: data.phone,
      name: {
        first: data.firstName,
        last: data.lastName,
      },
      stageName: data.stageName,
      gender: data.gender?.value,
      dob: dayjs(data.dateOfBirth).add(5, "hours").add(30, "minutes"),
      address: {
        country: data.country?.value,
        pincode: data.zipCode,
        line1: data.line1,
      },
      profileDescription: data.profileBio,
      socialMedia: {
        facebook: data.faceBookId,
        instagram: data.instagramId,
        youtube: data.youTubeId,
        twitter: data.xId,
        spotify: data.spotifyId,
        apple: data.appleId,
        soundcloud: data.soundCloudId,
      },
    };

    dispatch(updateUsersDetailsAsync(payload)).then((res) => {
      if (!res.payload.error) {
        dispatch(getUsersDetailsAsync());
      } else {
        console.error("Error saving user details:", res.payload.message);
      }
    });
  };

  const handleUploadProfile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("token");
    if (users?._id) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_KEY}users/profilepictureupdate/${users?._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  useEffect(() => {
    dispatch(getUsersDetailsAsync());
  }, []);

  useEffect(() => {
    if (users) {
      const formattedDate =
        users.dob && users?.dob !== null ? dayjs(users.dob) : null;
      // Set form values only if `users` is available
      setValue("email", users?.email);
      setValue("firstName", users?.name?.first || "");
      setValue("lastName", users?.name?.last || "");
      setValue("stageName", users?.stageName || "");
      setValue("phone", users?.phone || "");
      if (users?.gender) {
        setValue("gender", {
          label: capitalize(String(users?.gender)),
          value: String(users?.gender),
        } as any);
      }
      setValue("dateOfBirth", formattedDate);
      setValue("line1", users?.address?.line1);
      // setValue("profile", setProfile(users?.profilePicture));
      if (users?.address?.country) {
        setValue("country", {
          label: capitalize(String(users?.address?.country)),
          value: String(users?.address?.country),
        } as any);
      }

      setValue("zipCode", users?.address?.pincode || "");
      setValue("profileBio", users?.profileDescription || "");
      setValue("faceBookId", users?.socialMedia?.facebook || "");
      setValue("instagramId", users?.socialMedia?.instagram || "");
      setValue("youTubeId", users?.socialMedia?.youtube || "");
      setValue("xId", users?.socialMedia?.twitter || "");
      setValue("spotifyId", users?.socialMedia?.spotify || "");
      setValue("appleId", users?.socialMedia?.apple || "");
      setValue("soundCloudId", users?.socialMedia?.soundcloud || "");
      if (users?.profilePicture) {
        const fileWithPreview: FileWithPreview = {
          preview: users?.profilePicture,
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
          },
        };
        setProfile(fileWithPreview);
      }
    }
  }, [users, setValue]);

  // console.log('users', users)

  return (
    <Box py={5}>
      <Container>
        <CustomBreadcrumbs heading="Basic Details" activeLast links={[]} />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item lg={3} xs={12} mt={4}>
              <RHFUploadAvtar
                label=""
                name="profile"
                setProfile={(file) => handleUploadProfile(file)}
                // setProfile={(file) => setProfile(file)}
                profile={profile}
              />
            </Grid>
            <Grid item lg={8} xs={12}>
                <Label
                  variant="soft"
                  sx={{ fontSize: "16px" }}
                  color={
                    (users?.role === "artist" && "success") ||
                    (users?.role === "discovery type" && "warning") ||
                    "primary"
                  }
                >
                  {" "}
                  {(users?.role === "discovery type"
                    ? "Discovery+"
                    : users?.role) || "--"}
                </Label>

              <Stack gap={2} mt={3} direction="column">
                <Stack gap={2} direction={{ sm: "row", xs: "column" }}>
                  <Stack sx={{ gap: "0.85rem" }} width="100%">
                    <Typography variant="body1" color="initial">
                      First Name*
                    </Typography>
                    <RHFTextField
                      fullWidth
                      placeholder="Your Name"
                      name="firstName"
                      size="small"
                      // value={defaultValues?.firstName || ""}
                    />
                  </Stack>
                  <Stack sx={{ gap: "0.85rem" }} width="100%">
                    <Typography variant="body1" color="initial">
                      Last Name*
                    </Typography>
                    <RHFTextField
                      fullWidth
                      placeholder="Your Last Name"
                      name="lastName"
                      size="small"
                      // value={defaultValues?.lastName || ""}
                    />
                  </Stack>
                </Stack>
                <Stack sx={{ gap: "0.85rem" }} width="100%">
                  <Typography variant="body1" color="initial">
                    Stage Name
                  </Typography>
                  <RHFTextField
                    fullWidth
                    placeholder="Your Stage Name"
                    name="stageName"
                    size="small"
                    // value={defaultValues?.stageName || ""}
                  />
                </Stack>
                <Stack gap={2} mt={3} direction="column">
                  <Stack gap={2} direction={{ sm: "row", xs: "column" }}>
                    <Stack sx={{ gap: 1 }} width="100%">
                      <Typography variant="body1" color="initial">
                        Contact Number
                      </Typography>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <RHFTextField
                            fullWidth
                            placeholder="Your Contact Number"
                            size="small"
                            {...field}
                            error={!!error}
                            helperText={error ? error.message : null}
                            // value={defaultValues?.phone || ""}
                          />
                        )}
                      />
                    </Stack>
                    <Stack sx={{ gap: 1 }} width="100%">
                      <Typography variant="body1" color="initial">
                        Email ID*
                      </Typography>
                      <RHFTextField
                        fullWidth
                        placeholder="Your Email ID"
                        name="email"
                        size="small"
                        // value={defaultValues?.email || ""}
                      />
                    </Stack>
                  </Stack>
                  <Stack gap={2} direction={{ sm: "row", xs: "column" }}>
                    <Stack sx={{ gap: "0.85rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        Gender
                      </Typography>
                      <RHFAutocomplete
                        size="small"
                        name="gender"
                        label="Your Gender"
                        options={gender}
                        getOptionLabel={(option) => option?.label}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                      />
                    </Stack>
                    <Stack sx={{ gap: "0.3rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        Date of Birth
                      </Typography>
                      <Controller
                        name="dateOfBirth"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                {...field}
                                value={
                                  defaultValues?.dateOfBirth || field.value
                                    ? dayjs(field.value as unknown as Date)
                                    : null
                                }
                                format="DD/MM/YYYY"
                                maxDate={dayjs()}
                                onChange={(date) =>
                                  field.onChange(date ? date.toDate() : null)
                                }
                                sx={{
                                  width: "-webkit-fill-available",
                                  "& .MuiInputBase-root": { height: "40px" },
                                  overflowY: "hidden",
                                }}
                              />
                            </DemoContainer>
                            {error && (
                              <Typography
                                color="error"
                                sx={{ fontSize: "12px", mt: "8px", ml: 2 }}
                              >
                                {error.message}
                              </Typography>
                            )}
                          </LocalizationProvider>
                        )}
                      />
                    </Stack>
                  </Stack>
                  <Stack sx={{ gap: "0.85rem" }} width="100%">
                    <Typography variant="body1" color="initial">
                      Address
                    </Typography>
                    <RHFTextField
                      name="line1"
                      multiline
                      rows={3}
                      fullWidth
                      placeholder="Your Address"
                      size="small"
                    />
                  </Stack>
                  <Stack gap={2} direction={{ sm: "row", xs: "column" }}>
                    <Stack sx={{ gap: "0.85rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        Country
                      </Typography>
                      <RHFAutocomplete
                        size="small"
                        name="country"
                        label="Your Country"
                        options={countryOptions}
                      />
                    </Stack>
                    <Stack sx={{ gap: "0.85rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        Zipcode
                      </Typography>
                      <RHFTextField
                        fullWidth
                        placeholder="Zipcode"
                        name="zipCode"
                        size="small"
                      />
                    </Stack>
                  </Stack>
                  <Stack sx={{ gap: "0.85rem" }} width="100%">
                    <Typography variant="body1" color="initial">
                      Profile Bio
                    </Typography>
                    <RHFTextField
                      multiline
                      rows={3}
                      fullWidth
                      placeholder="Describe Yourself"
                      name="profileBio"
                      size="small"
                    />
                  </Stack>
                </Stack>
                <Stack>
                  <Typography variant="h6" py={1}>
                    Social Media Details
                  </Typography>
                  <Stack gap={2} direction={{ sm: "row", xs: "column" }}>
                    <Stack sx={{ gap: "0.85rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        FaceBook ID
                      </Typography>
                      <RHFTextField
                        fullWidth
                        placeholder="FaceBook ID"
                        name="faceBookId"
                        size="small"
                      />
                    </Stack>
                    <Stack sx={{ gap: "0.85rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        Instagram ID
                      </Typography>
                      <RHFTextField
                        fullWidth
                        placeholder="Instagram ID"
                        name="instagramId"
                        size="small"
                      />
                    </Stack>
                  </Stack>
                  <Stack gap={2} mt={3} direction={{ sm: "row", xs: "column" }}>
                    <Stack sx={{ gap: "0.85rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        YouTube ID
                      </Typography>
                      <RHFTextField
                        fullWidth
                        placeholder="YouTube ID"
                        name="youTubeId"
                        size="small"
                      />
                    </Stack>
                    <Stack sx={{ gap: "0.85rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        X (Twitter) ID
                      </Typography>
                      <RHFTextField
                        fullWidth
                        placeholder="X (Twitter) ID"
                        name="xId"
                        size="small"
                      />
                    </Stack>
                  </Stack>
                  <Stack gap={2} mt={3} direction={{ sm: "row", xs: "column" }}>
                    <Stack sx={{ gap: "0.85rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        Spotify ID
                      </Typography>
                      <RHFTextField
                        fullWidth
                        placeholder="Spotify ID"
                        name="spotifyId"
                        size="small"
                      />
                    </Stack>
                    <Stack sx={{ gap: "0.85rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        Apple ID
                      </Typography>
                      <RHFTextField
                        fullWidth
                        placeholder=" Apple ID"
                        name="appleId"
                        size="small"
                      />
                    </Stack>
                  </Stack>
                  <Stack gap={2} mt={3} direction={{ sm: "row", xs: "column" }}>
                    <Stack
                      sx={{ gap: "0.85rem", width: { xs: "100%", sm: "49%" } }}
                    >
                      <Typography variant="body1" color="initial">
                        SoundCloud ID
                      </Typography>
                      <RHFTextField
                        fullWidth
                        placeholder="SoundCloud ID"
                        name="soundCloudId"
                        size="small"
                      />
                    </Stack>
                    {/* <Stack sx={{ gap: "0.85rem" }} width="100%">
                      <Typography variant="body1" color="initial">
                        X (Twitter) ID
                      </Typography>
                      <RHFTextField
                        fullWidth
                        placeholder="X (Twitter) ID"
                        name="xId"
                        size="small"
                      />
                    </Stack> */}
                  </Stack>
                </Stack>
                <Stack
                  gap={2}
                  direction={{ sm: "row", xs: "column" }}
                  justifyContent="center"
                >
                  <LoadingButton
                    loading={isSubmitting}
                    variant="contained"
                    type="submit"
                    sx={{
                      textTransform: "capitalize",
                      color: "white",

                      mt: 2,
                      alignContent: "center",
                      width: "150px",
                      "&:hover": {
                        background: "#333",
                      },
                    }}
                  >
                    Submit
                  </LoadingButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </Box>
  );
}
