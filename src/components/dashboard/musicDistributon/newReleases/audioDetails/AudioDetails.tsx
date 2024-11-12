// components/AudioDetails.tsx
"use client";
import FormProvider from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import {
  createAudioDetailsAsync,
  getOrderByIdAsync
} from "@/redux/services/uploadAudio";
import { AppDispatch, RootState } from "@/redux/store";
import songGenreData from "@components/common/JSONFolder/genreJsonData";
import languagesData from "@components/common/JSONFolder/languagesJsonData";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import TrackDetails from "./TrackDetails";

interface FormInputs {
  labelName: string;
  copyrightName?: string;
  albumName?: string;
  productionRightsName?: string;
  releaseDate?: Date;
  tracks: {
    name: string;
    dolbyAudio: boolean;
    dolbyUrl: string;
    file: File;
    trackId: string;
    language: string;
    compositionType: string;
    cleanExplicit: string;
    artists: any[];
  }[];
}

interface AudioDetailsProps {
  setFormData?: React.Dispatch<React.SetStateAction<FormInputs>>;
  setSubmitForm?: React.Dispatch<React.SetStateAction<FormInputs>>;
  setOrderIdValue?: any;
  activeTab: number;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
  type: string;
}

const AudioDetails: React.FC<AudioDetailsProps> = ({
  activeTab,
  handleBack,
  setOrderIdValue,
  handleNext,
  type
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { orderData, orderDataById } = useSelector(
    (state: RootState) => state?.newRelease
  );
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [selecteFormLanguage, setSelecteFormLanguage] = useState("");
  const [albumGenreValue, setAlbumGenreValue] = useState<any>("");
  const [otherLangaugeValue, setOtherLangaugeValue] = useState<any>("");
  const [isEdit, setIsEdit] = useState<any>(false);
  const [formattedDate, setFormattedDate] = React.useState<string>(
    dayjs().format("DD/MM/YYYY")
  );
  const minDate = dayjs().add(5, "day");

  const formSchema = yup.object().shape({
    labelName: yup.string().required("Label name is required"),
    albumName:
      orderDataById.type === "album"
        ? yup.string().required("Album Name is required")
        : yup.string(),
    productionRightsName:
      orderDataById.type === "track"
        ? yup.string().required("Production Rights Name is required")
        : yup.string(),
    releaseDate: yup
      .date()
      .required("Release date is required")
      .typeError("Invalid date")
      .test(
        "is-after-5-days",
        "Release date must be at least 5 days from today",
        (value) => value && dayjs(value).isAfter(dayjs().add(4, "day"), "day")
      ),
    copyrightName: yup.string().required("Copyright name is required"),
    tracks: yup.array().of(
      yup.object().shape({
        artists: yup.array().of(
          yup.object().shape({
            name: yup
              .string()
              .required("Name is required")
              .when("artistsType", {
                is: "contributor",
                then: (schema) =>
                  schema.matches(
                    /^(?!\s)(.*\s+.*)$/,
                    "Full name is required for contributors"
                  )
              }),
            role: yup.string().required("Role is required")
          })
        ),
        name: yup.string().required("Name is required"),
        songGenre: yup.string().required("Song Genre is required"),
        language: yup.string().required("Language is required"),
        isrcCode: yup.string()
    .nullable() 
    .notRequired() 
    .matches(/^[A-Za-z]{2}[A-Za-z0-9]{3}\d{2}\d{5}$/, {
      message: 'Invalid format.',
      excludeEmptyString: true,
    }),
        compositionType: yup.string().required("Composition Type is required"),
        cleanExplicit: yup.string().required("Clean Explicit is required"),
        coverSongFile: yup
          .string()
          .test(
            "coverSongFile-required",
            "Cover Song File is required",
            function (value) {
              const { compositionType } = this.parent;
              if (compositionType === "cover") {
                return !!value;
              }
              return true;
            }
          )
        // previewStartTime: yup
        //   .string()
        //   .required("Preview Start Time is required"),
      })
    )
  });

  const handleLanguageChange = (event?: any) => {
    setSelecteFormLanguage(event.target.value);
  };

  const handleOtherLanguageChange = (event: any, value: any) => {
    setOtherLangaugeValue(value);
  };

  const handleAlbumGenreChange = (field?: any, album?: any) => {
    if (album) {
      setAlbumGenreValue(album);
    }
  };

  const defaultValues: FormInputs = {
    labelName: "",
    copyrightName: "",
    albumName: "",
    productionRightsName: "",
    tracks: []
  };

  const methods = useForm<FormInputs | any>({
    resolver: yupResolver(formSchema),
    defaultValues
  });

  const { control, handleSubmit, setValue: setFormValue } = methods;

  const { fields, append, update } = useFieldArray({
    control,
    name: "tracks" // Name of the field array
  });

  useEffect(() => {
    if (orderDataById) {
      if (orderDataById.releaseDate) {
        const parsedDate = dayjs(orderDataById.releaseDate);
        setSelectedDate(parsedDate);
        setFormValue("releaseDate", parsedDate.toDate());
        setFormattedDate(parsedDate.format("YYYY/MM/DD"));
      }
      setFormValue("labelName", orderDataById?.recordLabel);
      setFormValue("albumName", orderDataById?.name || "");
      setFormValue("copyrightName", orderDataById?.copyright?.name);
      setFormValue(
        "productionRightsName",
        orderDataById?.productionRight?.name
      );
      setAlbumGenreValue(orderDataById.genre);
      const lang = orderDataById?.language?.toLowerCase();
      if (
        lang === "english" ||
        lang === "hindi" ||
        lang === "instrumental" ||
        lang === "punjabi"
      ) {
        setSelecteFormLanguage(lang);
      } else {
        setSelecteFormLanguage("others");
        setOtherLangaugeValue(orderDataById?.language);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDataById, setFormValue]);

  useEffect(() => {
    if (orderDataById?.tracks) {
      orderDataById.tracks.forEach((track: any) => {
        const existingTrackIndex = fields.findIndex(
          (field: any) => field.trackId === track._id
        );
        addAppend(existingTrackIndex, track);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDataById, isEdit]);
  
  const addAppend = (existingTrackIndex: any, track: any) => {
    if (existingTrackIndex !== -1) {
      update(existingTrackIndex, {
        artists: track.artists,
        dolbyAudio: track.dolbyAudio,
        dolbyUrl: track.dolbyUrl,
        file: track.file,
        name: track.name,
        trackId: track._id,
        language: track.language,
        isrcCode: track.isrcCode,
        previewStartTime: track.previewStartTime,
        songGenre: track.songGenre,
        compositionType: track.compositionType,
        cleanExplicit: track.cleanExplicit,
        songLyrics: track.songLyrics,
        coverSongFile: track.coverSongFile
      });
    } else {
      append({
        artists: track.artists,
        dolbyAudio: track.dolbyAudio,
        dolbyUrl: track.dolbyUrl,
        file: track.file,
        name: track.name,
        trackId: track._id,
        language: track.language,
        isrcCode: track.isrcCode,
        previewStartTime: track.previewStartTime,
        songGenre: track.songGenre,
        compositionType: track.compositionType,
        cleanExplicit: track.cleanExplicit,
        songLyrics: track.songLyrics,
        coverSongFile: track.coverSongFile
      });
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setLoading(true);
    const payload = {
      tracks: data?.tracks,
      albumGenre: albumGenreValue || "",
      labelName: data?.labelName,
      albumName: data?.albumName,
      language:
        selecteFormLanguage === "others"
          ? otherLangaugeValue
          : selecteFormLanguage,
      releaseDate: new Date(formattedDate).toISOString(),
      copyRightName: data?.copyrightName,
      productRightName: data?.productionRightsName
    };

    dispatch(createAudioDetailsAsync({ id: orderData?._id, data: payload }))
      .then((result) => {
        setLoading(false);
        if (createAudioDetailsAsync.fulfilled.match(result)) {
          handleNext();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to create audio details:", error);
      });
  };

  const handleBackWithApiCall = async () => {
    try {
      dispatch(getOrderByIdAsync({ id: orderData?._id }));
      setOrderIdValue(orderData?._id);
    } catch (error) {
      console.error("Failed to fetch order by ID:", error);
    }
    handleBack();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box sx={{ width: "100%", mb: 3 }}>
          {orderDataById.type === "track" ? (
            <Box
              rowGap={2}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(3, 1fr)"
              }}
            >
              <RHFTextField
                size="small"
                label="Label Name"
                name="labelName"
                fullWidth
              />

              <Controller
                name="releaseDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      value={selectedDate}
                      format="DD/MM/YYYY"
                      onChange={(newValue) => {
                        setSelectedDate(newValue);
                        if (newValue) {
                          setFormValue("releaseDate", newValue.toDate());
                          setFormattedDate(newValue.format("YYYY/MM/DD"));
                        } else {
                          setFormValue("releaseDate", new Date());
                          setFormattedDate(dayjs().format("YYYY/MM/DD"));
                        }
                        field.onChange(newValue); // This will update the form state
                      }}
                      minDate={minDate}
                      slotProps={{
                        textField: {
                          label: "Release Date",
                          size: "small",
                          error: !!error,
                          helperText: error ? error.message : null
                        }
                      }}
                    />
                  </LocalizationProvider>
                )}
              />

              <RHFTextField
                size="small"
                label="Production Rights Name"
                name="productionRightsName"
                fullWidth
              />
              <RHFTextField
                size="small"
                label="Copyright Name"
                name="copyrightName"
                fullWidth
              />
            </Box>
          ) : (
            <Box
              rowGap={2}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)"
              }}
            >
              <RHFTextField
                size="small"
                label="Album Name"
                name="albumName"
                fullWidth
              />
              <RHFTextField
                size="small"
                label="Label Name"
                name="labelName"
                fullWidth
              />
              <Card sx={{ p: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Song Langauge*
                </Typography>
                <RadioGroup
                  row
                  value={selecteFormLanguage}
                  onChange={handleLanguageChange}
                >
                  <FormControlLabel
                    value="hindi"
                    control={<Radio />}
                    label="Hindi"
                  />
                  <FormControlLabel
                    value="english"
                    control={<Radio />}
                    label="English"
                  />
                  <FormControlLabel
                    value="instrumental"
                    control={<Radio />}
                    label="Instrumental"
                  />
                  <FormControlLabel
                    value="punjabi"
                    control={<Radio />}
                    label="Punjabi"
                  />
                  <FormControlLabel
                    value="others"
                    control={<Radio />}
                    label="Others"
                  />
                </RadioGroup>

                {selecteFormLanguage === "instrumental" && (
                  <Typography sx={{ color: "red" }}>
                    {" "}
                    Instrumental songs distribution are often checked and
                    scrutinised more due to high artificial streaming detection
                    rates and streaming fraud in instrumental songs and as an
                    aggregator we check the instrumental song very closely,
                    hence delay in distribution can be expected. Make sure that
                    the song is 100% original.{" "}
                  </Typography>
                )}

                {selecteFormLanguage === "others" && (
                  <Autocomplete
                    value={otherLangaugeValue}
                    options={languagesData}
                    getOptionLabel={(option) => option}
                    onChange={handleOtherLanguageChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Language"
                        size="small"
                      />
                    )}
                  />
                )}
              </Card>

              <Autocomplete
                value={albumGenreValue}
                options={songGenreData}
                getOptionLabel={(option) => option}
                onChange={(event, album) =>
                  handleAlbumGenreChange("songGenre", album)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Album Genre" size="small" />
                )}
              />

              <Controller
                name="releaseDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      value={selectedDate}
                      format="DD/MM/YYYY"
                      onChange={(newValue) => {
                        setSelectedDate(newValue);
                        if (newValue) {
                          setFormValue("releaseDate", newValue.toDate());
                          setFormattedDate(newValue.format("YYYY/MM/DD"));
                        } else {
                          setFormValue("releaseDate", new Date());
                          setFormattedDate(dayjs().format("YYYY/MM/DD"));
                        }
                        field.onChange(newValue); // This will update the form state
                      }}
                      minDate={minDate}
                      slotProps={{
                        textField: {
                          label: "Release Date",
                          size: "small",
                          error: !!error,
                          helperText: error ? error.message : null
                        }
                      }}
                    />
                  </LocalizationProvider>
                )}
              />

              <RHFTextField
                size="small"
                label="Production Rights Name"
                name="productionRightsName"
                fullWidth
              />
              <RHFTextField
                size="small"
                label="Copyright Name"
                name="copyrightName"
                fullWidth
              />
            </Box>
          )}
        </Box>

        {fields.map((data?: any, i?: any) => (
          <TrackDetails key={i} data={data} index={i} />
        ))}

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            variant="contained"
            disabled={activeTab === 0}
            // onClick={handleBack}
            onClick={() => handleBackWithApiCall()}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            sx={{ mr: 1, color: "white", backgroundColor: "black" }}
          >
            Continue
          </LoadingButton>
        </Box>

        {/* <CustomStepButton
          activeTab={activeTab}
          handleBack={handleBackWithApiCall}
          steps={steps}
          handleNext={handleSubmit(onSubmit)}
          // disabled={!canContinue()}
          loading={loading}
        /> */}
      </Container>
    </FormProvider>
  );
};

export default AudioDetails;
