"use client";
import RHFAutocomplete from "@/components/hook-form/RHFAutocomplete";
import RHFTextField from "@/components/hook-form/RHFTextField";
import songGenreData from "@components/common/JSONFolder/genreJsonData";
import languagesData from "@components/common/JSONFolder/languagesJsonData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Autocomplete,
  Box,
  Card,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ArtistContributorForm from "./ArtistContributorForm";
import LyricsUpload from "@/components/hook-form/LyricsUpload";
import axios from "axios";

interface TrackDetailsProps {
  data: any;
  index: number;
  key?: number;
}

const TrackDetails: React.FC<TrackDetailsProps> = ({ data, index, key }) => {
  const { control, setValue } = useFormContext();
  const [selectedLanguage, setSelectedLanguage] = useState<any>("");
  const [compositionValue, setCompositionValue] = React.useState<any>("");
  const [explicitValue, setExplicitValue] = React.useState<any>("");
  const [defaultArtist, setDefaultArtist] = React.useState<any>("");
  const [defaultContributor, setDefaultContributor] = React.useState<any>("");
  const [songLyrics, setSongLyrics] = useState<File | any>(null);
  const [compositionCover, setCompositionCover] = useState<File | any>(null);
  const [isLoadingSongLyrics, setIsLoadingSongLyrics] =
    useState<boolean>(false);
  const [isLoadingCompositionCover, setIsLoadingCompositionCover] =
    useState<boolean>(false);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
    if (event.target.value === "others") {
      setValue(`tracks.${index}.language`, "");
    } else {
      setValue(`tracks.${index}.language`, event.target.value);
    }
  };

  const handleChange = (value: any) => {
    setValue(`tracks.${index}.language`, value);
  };

  const handleCompositionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCompositionValue(value);
    setValue(`tracks.${index}.compositionType`, value);
  };

  const handleCleanExplicitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setExplicitValue(value);
    setValue(`tracks.${index}.cleanExplicit`, value);
  };

  const handleArtistsDetails = (data: any) => {
    setValue(`tracks.${index}.artists`, data);
  };

  const handleSongLyrics = async (fileName: any) => {
    setIsLoadingSongLyrics(true);
    const formData = new FormData();
    formData.append("track", fileName);
    const token = localStorage.getItem("token");

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
    const { url, error } = response.data;
    if (error == false) {
      setValue(`tracks.${index}.songLyrics`, url);
      setSongLyrics(url);
      setIsLoadingSongLyrics(false);
    }
  };

  const handleCompositionCover = async (fileName: any) => {
    setIsLoadingCompositionCover(true);
    const formData = new FormData();
    formData.append("track", fileName);
    const token = localStorage.getItem("token");
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
    const { url, error } = response.data;
    if (error == false) {
      setValue(`tracks.${index}.coverSongFile`, url);
      setCompositionCover(url);
      setIsLoadingCompositionCover(false);
    }
  };

  useEffect(() => {
    if (data) {
      if (
        data.language == "english" ||
        data.language == "hindi" ||
        data.language == "instrumental" ||
        data.language == "punjabi"
      ) {
        setSelectedLanguage(data.language);
      } else {
        setSelectedLanguage("others");
        setValue(`tracks.${index}.language`, data.language);
      }

      setExplicitValue(data.cleanExplicit);
      setCompositionValue(data.compositionType);
      setSongLyrics(data.songLyrics);
      setCompositionCover(data.coverSongFile);
      if (data.artists?.length) {
        const filteredArtists = data.artists.filter(
          (artist: any) => artist.artistsType === "artist"
        );
        const filteredContributors = data.artists.filter(
          (artist: any) => artist.artistsType === "contributor"
        );
        setDefaultArtist(filteredArtists);
        setDefaultContributor(filteredContributors);
      } else {
        const filteredArtists = [
          {
            name: "",
            role: "primary",
            artistsType: "artist",
            socialLink: [{ platform: "", link: "" }],
            showSocialLink: false,
          },
        ];
        const filteredContributors = [
          {
            name: "",
            role: "Lyricist",
            artistsType: "contributor",
            socialLink: [{ platform: "", link: "" }],
            showSocialLink: false,
          },
          {
            name: "",
            role: "Composer",
            artistsType: "contributor",
            socialLink: [{ platform: "", link: "" }],
            showSocialLink: false,
          },
        ];
        setDefaultArtist(filteredArtists);
        setDefaultContributor(filteredContributors);
      }
    }
  }, [data]);

  return (
    <Accordion key={key} defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${key}-content`}
        id={`panel${key}-header`}
      >
        <Typography variant="h6" sx={{ borderBottom: "2px solid gray" }}>
          Details {index + 1}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <RHFTextField
                size="small"
                name={`tracks.${index}.name`}
                label="Song name"
                placeholder="Song name"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name={`tracks.${index}.language`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Song Language*
                      </Typography>
                      <RadioGroup
                        row
                        value={selectedLanguage}
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
                      {selectedLanguage === "instrumental" && (
                        <Typography sx={{ color: "red" }}>
                          Instrumental songs distribution are often checked and
                          scrutinised more due to high artificial streaming
                          detection rates and streaming fraud in instrumental
                          songs and as an aggregator we check the instrumental
                          song very closely, hence delay in distribution can be
                          expected. Make sure that the song is 100% original.
                        </Typography>
                      )}
                      {selectedLanguage === "others" && (
                        <Autocomplete
                          value={field.value}
                          options={languagesData}
                          getOptionLabel={(option) => option}
                          onChange={(e, newValue) => handleChange(newValue)}
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
                    {error && (
                      <FormHelperText error>{error.message} </FormHelperText>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <RHFAutocomplete
                name={`tracks.${index}.songGenre`}
                label="Song Genre"
                size="small"
                options={songGenreData}
                onChange={(event, newValue) => {
                  setValue(`tracks.${index}.songGenre`, newValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RHFTextField
                size="small"
                type="number"
                name={`tracks.${index}.previewStartTime`}
                placeholder="40"
                label="Preview Start Time (In Seconds Only)"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RHFTextField
                size="small"
                name={`tracks.${index}.isrcCode`}
                label="ISRC: If you have one"
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Upload Lyric
              </Typography>
              <LyricsUpload
                songLyrics={songLyrics}
                setSongLyrics={(fileName) => handleSongLyrics(fileName)}
                lyricsTitle={"Upload Lyrics"}
                supportsText={" .doc, .docx Only"}
                loading={isLoadingSongLyrics}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <ArtistContributorForm
            setDetails={handleArtistsDetails}
            index={index}
            defaultArtist={defaultArtist}
            defaultContributor={defaultContributor}
          />
          <Divider sx={{ my: 3 }} />
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <Controller
                name={`tracks.${index}.compositionType`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Composition Type*
                    </Typography>
                    <Card>
                      <RadioGroup
                        row
                        sx={{ margin: "20px" }}
                        value={compositionValue}
                        onChange={(value) => handleCompositionTypeChange(value)}
                      >
                        <FormControlLabel
                          value="original"
                          control={<Radio />}
                          label="Original"
                        />
                        <FormControlLabel
                          value="cover"
                          control={<Radio />}
                          label="Cover"
                        />
                        <FormControlLabel
                          value="public"
                          control={<Radio />}
                          label="Public"
                        />
                      </RadioGroup>
                    </Card>
                    {error && (
                      <FormHelperText error>{error.message} </FormHelperText>
                    )}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name={`tracks.${index}.cleanExplicit`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Clean/Explicit*
                    </Typography>
                    <Card>
                      <RadioGroup
                        row
                        sx={{ margin: "20px" }}
                        value={explicitValue}
                        onChange={(value) => handleCleanExplicitChange(value)}
                      >
                        <FormControlLabel
                          value="clean"
                          control={<Radio />}
                          label="Clean"
                        />
                        <FormControlLabel
                          value="explicit"
                          control={<Radio />}
                          label="Explicit"
                        />
                      </RadioGroup>
                    </Card>
                    {error && (
                      <FormHelperText error>{error.message} </FormHelperText>
                    )}
                  </>
                )}
              />
            </Grid>
          </Grid>
          {compositionValue == "cover" ? (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name={`tracks.${index}.coverSongFile`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <LyricsUpload
                        songLyrics={compositionCover}
                        setSongLyrics={(fileName) =>
                          handleCompositionCover(fileName)
                        }
                        lyricsTitle={"Choose your File"}
                        supportsText={".pdf Only"}
                        titleName="Drop your composition cover here, or "
                        instruction="Please upload the license from the original copyright holder"
                        loading={isLoadingCompositionCover}
                      />
                      {error && (
                        <FormHelperText error>{error.message} </FormHelperText>
                      )} 
                    </>
                  )}
                />
              </Grid>
            </Grid>
          ) : null}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TrackDetails;
