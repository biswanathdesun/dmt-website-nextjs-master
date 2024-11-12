"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import RHFTextField from "@/components/hook-form/RHFTextField";
import ImageDrop from "@/components/hook-form/ImageDrop";
import axios from "axios";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createUploadAudioAsync,
  getOrderByIdAsync,
} from "@/redux/services/uploadAudio";
import CustomStepButton from "../custom/CustomStepButton";

// Type for a single card
interface CardData {
  id: number;
  showLyricsUpload: boolean;
  isAdded: boolean;
  songFile: File | any;
  dolbyAudio: File | any;
  songTitle: string;
  isSongFileUploaded: boolean; // Add this line
  isDolbyAudioUploaded: boolean; // Add this line
  loadingSongFile: boolean; // New field for loading state of song file
  loadingDolbyAudio: boolean;
}

interface UploadAudioProps {
  activeTab: number;
  uploadFileData: any;
  orderId?: any;
  setUploadFileData: any;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

// Validation schema
const createValidationSchema = (cards: CardData[]) => {
  const schema = cards?.reduce((acc, _, index) => {
    acc[`songTitle${index}`] = Yup.string().required(
      "Please Enter the Song Title"
    );
    return acc;
  }, {} as { [key: string]: Yup.StringSchema });

  return Yup.object().shape(schema);
};

type FormValues = {
  [key: string]: string;
};

const UploadAudio: React.FC<UploadAudioProps> = ({
  activeTab,
  handleBack,
  steps,
  handleNext,
  type,
  orderId,
  setType,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [cards, setCards] = useState<CardData[]>([
    {
      id: 1,
      showLyricsUpload: false,
      isAdded: false,
      songFile: "",
      dolbyAudio: "",
      songTitle: "",
      isSongFileUploaded: false, // Initialize these fields
      isDolbyAudioUploaded: false,
      loadingSongFile: false, // Initialize to false
      loadingDolbyAudio: false, // Initialize these fields
    },
  ]);
  const [isApiFulfilled, setIsApiFulfilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { orderData, orderDataById } = useSelector(
    (state: RootState) => state?.newRelease
  );
  const defaultValues = useMemo(() => {
    const values: FormValues = {};
    cards?.forEach((_, index) => {
      values[`songTitle${index}`] = "";
    });
    return values;
  }, [cards]);

  const methods = useForm({
    resolver: yupResolver(createValidationSchema(cards)),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const handleUpload = async (
    index: number,
    type: "songFile" | "dolbyAudio",
    file: File
  ) => {
    setIsApiFulfilled(false);
    setCards((prevCards) =>
      prevCards.map((card, idx) =>
        idx === index
          ? {
              ...card,
              [`loading${type.charAt(0).toUpperCase() + type.slice(1)}`]: true,
            }
          : card
      )
    );
    const formData = new FormData();
    formData.append("track", file);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}orders/upload-song`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { url } = response.data; // Assuming 'url' is the key in the response containing the URL
      if (response?.status === 200) {
        setIsApiFulfilled(true);
        setLoading(false);
      }
      setCards((prevCards) =>
        prevCards.map((card, idx) =>
          idx === index
            ? {
                ...card,
                [type]: url,
                [`is${type.charAt(0).toUpperCase() + type.slice(1)}Uploaded`]:
                  true,
                [`loading${type.charAt(0).toUpperCase() + type.slice(1)}`]:
                  false,
              }
            : card
        )
      );
    } catch (error) {
      console.error("Upload error:", error);
      setCards((prevCards) =>
        prevCards.map((card, idx) =>
          idx === index
            ? {
                ...card,
                [`loading${type.charAt(0).toUpperCase() + type.slice(1)}`]:
                  false,
              }
            : card
        )
      );
    }
  };

  const addMoreSongs = () => {
    setCards((prevCards) => [
      ...prevCards,
      {
        id: prevCards.length + 1,
        showLyricsUpload: false,
        isAdded: true,
        songFile: null,
        dolbyAudio: null,
        songTitle: "",
        isSongFileUploaded: false, // Initialize these fields
        isDolbyAudioUploaded: false,
        loadingSongFile: false, // Initialize to false
        loadingDolbyAudio: false, // Initialize these fields
      },
    ]);
    methods.reset({
      ...methods.getValues(),
      [`songTitle${cards?.length}`]: "",
    });
  };
  useEffect(() => {
    setIsApiFulfilled(
      cards?.every(
        (card) =>
          card.isSongFileUploaded &&
          (!card.showLyricsUpload || card.isDolbyAudioUploaded)
      )
    );
  }, [cards]);

  const handleCheckboxChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCards = cards?.map((card, idx) =>
        idx === index
          ? { ...card, showLyricsUpload: event.target.checked }
          : card
      );
      setCards(updatedCards);
    };

  const handleDeleteCard = (index: number) => () => {
    const updatedCards = cards?.filter((_, idx) => idx !== index);
    setCards(updatedCards);
    methods.reset(
      updatedCards.reduce((acc: any, card: any, idx: any) => {
        acc[`songTitle${idx}`] = methods.getValues()[`songTitle${idx + 1}`];
        return acc;
      }, {})
    );
  };

  const handleSongTitleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCards = cards?.map((card, idx) =>
        idx === index ? { ...card, songTitle: event.target.value } : card
      );
      setCards(updatedCards);
      methods.setValue(`songTitle${index}`, event.target.value);
    };

  const handleFileUpload = (
    index: number,
    type: "songFile" | "dolbyAudio",
    file: File | null
  ) => {
    if (file && file instanceof File) {
      const updatedCards = cards?.map((card, idx) =>
        idx === index ? { ...card, [type]: file } : card
      );
      setCards(updatedCards);
      handleUpload(index, type, file);
    } else {
      console.error("Invalid file");
    }
  };

  const onSubmit = () => {
    setIsLoading(true);
    // Construct the tracks array
    const tracks = cards?.map((card: any) => ({
      trackId: card.trackId,
      name: card.songTitle,
      dolbyAudio: card.showLyricsUpload,
      dolbyUrl: card.dolbyAudio || "",
      file: card.songFile || "",
    }));

    setType(tracks?.length == 1 ? "track" : "album");

    const payload = {
      orderId: orderId ? orderId : "",
      tracks,
      type: tracks?.length == 1 ? "track" : "album",
    };

    dispatch(createUploadAudioAsync(payload))
      .then((result) => {
        if (result.payload.statusCode === 200) {
          dispatch(getOrderByIdAsync({ id: result?.payload?.data?._id })).then(
            (res) => {
              if (res.payload.statusCode === 200) {
                setIsLoading(false);
                localStorage.setItem("orderId", result?.payload?.data?._id);
                handleNext();
              }
            }
          );
        }
        else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
         setIsLoading(false);
        console.error("Failed to create audio details:", error);
      });
  };

  const canContinue = () => {
    return (
      isApiFulfilled &&
      cards?.every((card) => {
        const isSongFileUploaded = card.isSongFileUploaded;
        const isDolbyAudioUploaded = card.showLyricsUpload
          ? !!card.dolbyAudio
          : true;
        return card.songTitle && isSongFileUploaded && isDolbyAudioUploaded;
      })
    );
  };

  useEffect(() => {
    setType(cards?.length === 1 ? "track" : "album");
  }, [cards, setType, type]);

  const setDataForEdit = (orderId: string) => {
    dispatch(getOrderByIdAsync({ id: orderId })).then((res) => {
      if (res?.payload?.statusCode === 200) {
        const fetchedData: CardData[] = res?.payload?.data?.tracks?.map(
          (track: any, index: number) => ({
            id: index + 1,
            trackId: track._id,
            showLyricsUpload: !!track.dolbyAudio,
            isAdded: true,
            songFile: track.file || "",
            dolbyAudio: track.dolbyUrl || "",
            songTitle: track.name || "",
            isSongFileUploaded: !!track.file,
            isDolbyAudioUploaded: !!track.dolbyUrl,
            loadingSongFile: false,
            loadingDolbyAudio: false,
          })
        );
        setCards(fetchedData);
        const updatedDefaultValues = fetchedData?.reduce(
          (acc: FormValues, card, index) => {
            acc[`songTitle${index}`] = card.songTitle || "";
            return acc;
          },
          {}
        );

        methods.reset(updatedDefaultValues);
      }
    });
  };

  useEffect(() => {
    if (orderId) {
      setDataForEdit(orderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData?._id, orderId]);

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: "100%" }}>
        <Box p={4}>
          <Grid container spacing={3}>
            {cards?.map((card, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    position: "relative",
                    py: 1,
                    mb: 2,
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Lighter shadow
                    borderRadius: "10px",
                  }}
                >
                  {cards.length > 1 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "#ff8B00",
                      }}
                      onClick={handleDeleteCard(index)}
                    >
                      <Icon
                        icon="material-symbols:delete-outline"
                        width="1.8rem"
                        height="1.8rem"
                      />
                    </IconButton>
                  )}
                  <CardContent>
                    <Typography pb={1}>Song Name*</Typography>
                    <RHFTextField
                      name={`songTitle${index}`}
                      size="small"
                      required
                      value={card.songTitle}
                      onChange={handleSongTitleChange(index)}
                      error={!!errors[`songTitle${index}`]}
                      helperText={errors[`songTitle${index}`]?.message}
                    />

                    <Grid container spacing={2} mt={1}>
                      <Grid item sm={12}>
                        <ImageDrop
                          career={{ cover: undefined }}
                          loading={card.loadingSongFile}
                          error={undefined}
                          firstslidedata={{ cover: undefined }}
                          formData={card.songFile}
                          setFormData={(file) =>
                            handleFileUpload(index, "songFile", file)
                          }
                          filedata={card.songFile}
                          setFiledata={(file) =>
                            handleFileUpload(index, "songFile", file)
                          }
                          setSaveimage={(file) =>
                            handleFileUpload(index, "songFile", file)
                          }
                          saveImage={card.songFile}
                          instruction="Quality is important to us, please use the highest-quality stereo assets available (WAV, AIFF or FLAC only)."
                          buttonText="Upload Song"
                          acceptedFileTypes={{
                            "audio/wav": [],
                            "audio/aiff": [],
                            "audio/flac": [],
                          }}
                        />
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={card.showLyricsUpload}
                                onChange={handleCheckboxChange(index)}
                              />
                            }
                            label="Dolby Audio"
                          />
                        </FormGroup>
                      </Grid>
                      {card.showLyricsUpload && (
                        <Grid item sm={12}>
                          <ImageDrop
                            career={{ cover: undefined }}
                            error={undefined}
                            loading={card.loadingDolbyAudio}
                            firstslidedata={{ cover: undefined }}
                            formData={card.dolbyAudio}
                            setFormData={(file) =>
                              handleFileUpload(index, "dolbyAudio", file)
                            }
                            filedata={card.dolbyAudio}
                            setFiledata={(file) =>
                              handleFileUpload(index, "dolbyAudio", file)
                            }
                            setSaveimage={(file) =>
                              handleFileUpload(index, "dolbyAudio", file)
                            }
                            saveImage={card.dolbyAudio}
                            instruction="Quality is important to us, please use the highest-quality stereo assets available (WAV, AIFF or FLAC only)."
                            buttonText="Upload Dolby Audio File"
                            acceptedFileTypes={{
                              "audio/wav": [],
                              "audio/aiff": [],
                              "audio/flac": [],
                            }}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="space-around" mt={2}>
            <Button
              sx={{
                textTransform: "none",
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
              onClick={addMoreSongs}
            >
              <Icon
                icon="basil:plus-outline"
                width="1rem"
                height="1rem"
                style={{ color: "white" }}
              />
              Add More Songs
            </Button>
          </Box>
          <Box>
            <CustomStepButton
              activeTab={activeTab}
              handleBack={handleBack}
              // handleBack={handleBackWithApiCall}
              steps={steps}
              handleNext={onSubmit}
              disabled={!canContinue()}
              loading={isLoading}
            />
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default UploadAudio;
