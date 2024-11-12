"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray
} from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomBreadcrumbs from "@/components/common/CustomBreadcrumbs";
import FormProvider from "@components/hook-form/FormProvider";
import RHFTextField from "@components/hook-form/RHFTextField";
import ImageDrop from "@components/hook-form/ImageDrop";
import SongMasteringDialog from "../../component/SongMasterDialog";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

const NewListSchema = Yup.object().shape({
  songName: Yup.string().required("Song Name is required"),
  labelName: Yup.string().required("Label Name is required"),
  composerName: Yup.string().required("Composer Name is required"),
  lyricistName: Yup.string().required("Lyricist Name is required"),
  status: Yup.string().required("Status is required"),
  artists: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Minimum 1 Artist is required")
    })
  )
});

interface FormValues {
  songName: string;
  labelName: string;
  composerName: string;
  lyricistName: string;
  status: string;
  artists?: { name: string }[];
}

export default function SongMastering() {
  const [fileData, setFileData] = useState<File | null>(null);
  const [formData, setFormData] = useState<File | null>(null);
  const [imageData, setImageData] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      songName: "",
      labelName: "",
      composerName: "",
      lyricistName: "",
      status: "",
      artists: [{ name: "" }]
    }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewListSchema),
    defaultValues
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "artists"
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    if (!fileData) {
      toast.error("Please Upload song!", { position: "top-right" });
      return;
    }
    const artistName = JSON.stringify(
      data.artists.map((artist: any) => artist.name)
    );
    setLoading(true);
    const formData = new FormData();
    formData.append("songName", data?.songName);
    formData.append("labelName", data?.labelName);
    formData.append("composerName", data?.composerName);
    formData.append("lyricistName", data?.lyricistName);
    formData.append("songStatus", data?.status);
    formData.append("artistName", artistName);
    formData.append("file", fileData);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}mastered/mastering-payment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response?.data?.error === false) {
            setLoading(false);
        router.push(`/dashboard/song-mastering/master-new-song/payment?masterId=${response?.data?.masteredId}`);
      }
    } catch (error) {
       setLoading(false);
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <SongMasteringDialog />
      <CustomBreadcrumbs
        heading="Master a new song"
        activeLast
        sx={{ fontSize: "40px", fontWeight: "bolder", marginTop: 5 }}
        links={[]}
      />
      <Box>
        <Breadcrumbs>Master a new Song</Breadcrumbs>
      </Box>
      <Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" mb={2}>
                  Song Name*
                </Typography>
                <RHFTextField name="songName" label="Song Name" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" mb={2}>
                  Artist Name*
                </Typography>
                {fields.map((field, index) => (
                  <Box key={field.id} mb={2}>
                    <RHFTextField
                      name={`artists.${index}.name`}
                      defaultValue={field.name}
                      label={`Artist ${index + 1}`}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {fields.length !== 0 && (
                              <div>
                                {index !== 0 || fields.length > 1 ? (
                                  <Icon
                                    icon="eva:trash-2-outline"
                                    onClick={() => remove(index)}
                                    style={{
                                      cursor: "pointer",
                                      marginRight: "10px"
                                    }}
                                  />
                                ) : null}
                                {fields.length - 1 === index && (
                                  <Icon
                                    icon="eva:plus-fill"
                                    onClick={() => append({ name: "" })}
                                    style={{
                                      cursor: "pointer"
                                    }}
                                  />
                                )}
                              </div>
                            )}
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" mb={2}>
                  Label Name*
                </Typography>
                <RHFTextField name="labelName" label="Label Name" />
              </Grid>
            </Grid>
          </Box>
          <Box my={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" mb={2}>
                  Composer Name*
                </Typography>
                <RHFTextField name="composerName" label="Composer Name" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" mb={2}>
                  Lyricist Name*
                </Typography>
                <RHFTextField name="lyricistName" label="Lyricist Name" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" mb={2}>
                  Status*
                </Typography>
                <Controller
                  name="status"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <RadioGroup row {...field}>
                        <FormControlLabel
                          value="Released"
                          control={<Radio />}
                          label="Released"
                        />
                        <FormControlLabel
                          value="yetToBeReleased"
                          control={<Radio />}
                          label="Yet to be released"
                        />
                      </RadioGroup>
                      {errors.status && (
                        <Typography variant="body2" color="error">
                          {errors.status.message}
                        </Typography>
                      )}
                    </div>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box my={4}>
            <ImageDrop
              career={{ cover: undefined }}
              error={undefined}
              firstslidedata={{ cover: undefined }}
              formData={formData}
              setFormData={setFormData}
              setFiledata={setFileData}
              filedata={fileData}
              setSaveimage={setImageData}
              saveImage={imageData}
              instruction="Quality is important to us, please use the highest-quality stereo assets available (WAV, AIFF or FLAC only)."
              buttonText="Upload Song"
              acceptedFileTypes={{
                "audio/wav": [],
                "audio/aiff": [],
                "audio/flac": []
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: {xs:'center',sm:'flex-end'}
            }}
          >
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
              sx={{
                color: "white",
                background: "#FE8E0B",
                border: 1,
                borderColor: "white",
                "&:hover": {
                  color: "white",
                  background: "#FE8E0B",
                  Border: 1,
                  borderColor: "white"
                },
                ml: {
                  md: 3,
                  xs: 1
                }
              }}
            >
              Proceed To Payment
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </>
  );
}
