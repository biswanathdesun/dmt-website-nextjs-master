"use client";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  Card,
  CardContent,

  Grid,
  IconButton,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ImageDrop from "@components/hook-form/ImageDrop";

const NewUserSchema = Yup.object().shape({
  song: Yup.string().required("Please Enter the Song Title"),
});

const UpLoadAudio = () => {
  const defaultValues = useMemo(() => ({ song: "" }), []);

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, handleSubmit, control } = methods;
  const [cards, setCards] = useState([
    {
      id: 1,
      showLyricsUpload: false,
      isAdded: false,
      songFile: null,
      lyricsFile: null,
    },
  ]);

  const onSubmit = (data: any) => {
    const payload = {
      song: data[`song${cards[0].id}`],
      songFile: cards[0].songFile,
      lyricsFile: cards[0].lyricsFile,
    };
    console.log(payload, "song");
  };

  



  const handleDeleteCard = (index: any) => () => {
    const updatedCards = cards.filter((_, idx) => idx !== index);
    setCards(updatedCards);
  };

  const handleFileUpload = ({ index, type }: any, p0: string, file: any) => {
    const updatedCards = cards.map((card, idx) =>
      idx === index ? { ...card, [type]: file } : card
    );
    setCards(updatedCards);
  };

  return (
    <Box sx={{ width: "100%"  , display:"flex", justifyContent:"center"  }}>
      <Box >
        <FormProvider {...methods} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {cards.map((card, index) => (
                <Grid item xs={12} key={index}>
                  <Card
                    sx={{
                      position: "relative",
                      py: 1,
                      mb: 2,
                      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", 
                      borderRadius: "10px",
                    }}
                  >
                    {card.isAdded && (
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
                      {/* <Typography pb={1}>Song Name*</Typography>
                      <RHFTextField name={`song${card.id}`} size="small" />
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={card.showLyricsUpload}
                              onChange={handleCheckboxChange(index)}
                            />
                          }
                          label="Dolby Audio"
                        />                                             may needed in future!!!!
                      </FormGroup> */}
                      <Grid container spacing={2}>
                        <Grid item sm={6} lg={card.showLyricsUpload ? 6 : 12}>
                          <ImageDrop
                            career={{ cover: undefined }}
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
                        </Grid>
                        {card.showLyricsUpload && (
                          <Grid item sm={6}>
                            <ImageDrop
                              career={{ cover: undefined }}
                              error={undefined}
                              firstslidedata={{ cover: undefined }}
                              formData={card.lyricsFile}
                              setFormData={(file) =>
                                handleFileUpload(index, "lyricsFile", file)
                              }
                              filedata={card.lyricsFile}
                              setFiledata={(file) =>
                                handleFileUpload(index, "lyricsFile", file)
                              }
                              setSaveimage={(file) =>
                                handleFileUpload(index, "lyricsFile", file)
                              }
                              saveImage={card.lyricsFile}
                              instruction="Quality is important to us, please use the highest-quality stereo assets available (WAV, AIFF or FLAC only)."
                              buttonText="Upload Song"
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
          
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default UpLoadAudio;
