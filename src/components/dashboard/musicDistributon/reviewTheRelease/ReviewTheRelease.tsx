"use client";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  Stack,
  Switch,
  Tooltip
} from "@mui/material";
import DOCIcon from "@public/icons/doc.png";
import PdfIcon from "@public/icons/file.png";
import Image from "next/image";
import CustomStepButton from "../custom/CustomStepButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getOrderByIdAsync } from "@/redux/services/uploadAudio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

interface ReviewTheReleaseProps {
  activeTab?: number | any;
  orderId?: any;
  handleBack?: any;
  steps?: { label: string; content: string }[]   | any;
  handleNext?:  any;
}

const ReviewTheReleasePage: React.FC<ReviewTheReleaseProps> = ({
  activeTab,
  handleBack,
  orderId,
  steps,
  handleNext
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { orderData, orderDataById, loaderById } = useSelector(
    (state: RootState) => state?.newRelease
  );
  const isAlbum = orderDataById?.type === "album";

  const {
    cover,
    tracks,
    platforms,
    appleMotionGraphics,
    ablumPageMotionOne,
    ablumPageMotionTwo
  } = orderDataById ?? {};

  const primaryFeaturing = tracks?.map((items?: any) => items.artists);

  const filterContributors = primaryFeaturing?.map((value?: any) =>
    value?.filter((artist?: any) => artist.artistsType === "contributors")
  );

  const handleGetFileExtension = (file: any) => {
    const extension = file?.split(".")?.pop()?.toLowerCase();
    return extension === "pdf";
  };

  useEffect(() => {
    const id = orderId ? orderId : orderData?._id;
    dispatch(getOrderByIdAsync({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData]);

  return (
    <>
      <Container sx={{ textAlign: "center" }}>
        {loaderById ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh"
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ my: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: {
                  sm: "row",
                  xs: "column-reverse"
                }
              }}
            >
              <Typography variant="h6" sx={{ textAlign: "start", mb: 2 }}>
                {" "}
                Track/Album Details
              </Typography>
            </Box>
            {/* albub card */}
            <Card sx={{ p: 2 }}>
              <Box
                rowGap={2}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)"
                }}
              >
                {isAlbum && (
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
                      alignItems: { xs: "flex-start", sm: "center" }, // Align items to the start on small screens, center on larger screens
                      gap: {
                        sm: 1,
                        xs: 0
                      }
                    }}
                  >
                    Album/Song name:{" "}
                    <InputLabel>{orderDataById?.name}</InputLabel>
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
                    alignItems: { xs: "flex-start", sm: "center" }, // Align items to the start on small screens, center on larger screens
                    gap: {
                      sm: 1,
                      xs: 0
                    }
                  }}
                >
                  Label name:{" "}
                  <InputLabel>{orderDataById?.recordLabel}</InputLabel>
                </Typography>
                {isAlbum && (
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
                      alignItems: { xs: "flex-start", sm: "center" }, // Align items to the start on small screens, center on larger screens
                      gap: {
                        sm: 1,
                        xs: 0
                      }
                    }}
                  >
                    Language: <InputLabel>{orderDataById?.language}</InputLabel>
                  </Typography>
                )}
                {isAlbum && (
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
                      alignItems: { xs: "flex-start", sm: "center" }, // Align items to the start on small screens, center on larger screens
                      gap: {
                        sm: 1,
                        xs: 0
                      }
                    }}
                  >
                    Song Genre: <InputLabel>{orderDataById?.genre}</InputLabel>
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
                    alignItems: { xs: "flex-start", sm: "center" }, // Align items to the start on small screens, center on larger screens
                    gap: {
                      sm: 1,
                      xs: 0
                    }
                  }}
                >
                  Release date:{" "}
                  <InputLabel>
                    {orderDataById?.releaseDate
                      ? dayjs(orderDataById?.releaseDate).format("DD-MM-YYYY")
                      : ""}
                  </InputLabel>
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
                    alignItems: { xs: "flex-start", sm: "center" }, // Align items to the start on small screens, center on larger screens
                    gap: {
                      sm: 1,
                      xs: 0
                    }
                  }}
                >
                  Copyright name:{" "}
                  <InputLabel>{orderDataById?.copyright?.name}</InputLabel>
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
                    alignItems: { xs: "flex-start", sm: "center" }, // Align items to the start on small screens, center on larger screens
                    gap: {
                      sm: 1,
                      xs: 0
                    }
                  }}
                >
                  Production rights name :{" "}
                  <InputLabel>
                    {orderDataById?.productionRight?.name}
                  </InputLabel>
                </Typography>
              </Box>
            </Card>
            {orderDataById?.tracks?.map(
              (item: any, index: React.Key | null | undefined) => (
                <Accordion key={index} sx={{ mt: 2 }} defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography variant="h6" sx={{ textAlign: "start" }}>
                      {item?.name} - Track Detail
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <>
                      {/* tracks detail */}
                      <Grid container sx={{ mt: 2 }} gap={2}>
                        <Grid item sm={12}>
                          <Box
                            sx={{ p: 2, boxShadow: 2, borderRadius: 2, mb: 3 }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Box
                                  rowGap={2}
                                  columnGap={{
                                    xs: 0,
                                    sm: 2
                                  }}
                                  display="grid"
                                  gridTemplateColumns={{
                                    xs: "repeat(1, 1fr)",
                                    sm: "repeat(2, 1fr)"
                                  }}
                                  sx={{ spacing: 2 }}
                                >
                                  <Typography
                                    component="span"
                                    sx={{
                                      display: "flex",
                                      flexDirection: {
                                        xs: "column",
                                        sm: "row"
                                      }, // Stack items vertically on small screens
                                      alignItems: {
                                        xs: "flex-start",
                                        sm: "center"
                                      }, // Align items to the start on small screens, center on larger screens
                                      gap: {
                                        sm: 1,
                                        xs: 0
                                      }
                                    }}
                                  >
                                    Song name :{" "}
                                    <InputLabel> {item?.name}</InputLabel>
                                  </Typography>

                                  <Typography
                                    component="span"
                                    sx={{
                                      display: "flex",
                                      flexDirection: {
                                        xs: "column",
                                        sm: "row"
                                      }, // Stack items vertically on small screens
                                      alignItems: {
                                        xs: "flex-start",
                                        sm: "center"
                                      }, // Align items to the start on small screens, center on larger screens
                                      gap: {
                                        sm: 1,
                                        xs: 0
                                      }
                                    }}
                                  >
                                    Language :{" "}
                                    <InputLabel>{item?.language}</InputLabel>
                                  </Typography>

                                  <Typography
                                    component="span"
                                    sx={{
                                      display: "flex",
                                      flexDirection: {
                                        xs: "column",
                                        sm: "row"
                                      }, // Stack items vertically on small screens
                                      alignItems: {
                                        xs: "flex-start",
                                        sm: "center"
                                      }, // Align items to the start on small screens, center on larger screens
                                      gap: {
                                        sm: 1,
                                        xs: 0
                                      }
                                    }}
                                  >
                                    Song Genre :{" "}
                                    <InputLabel>{item?.songGenre}</InputLabel>
                                  </Typography>

                                  <Typography
                                    component="span"
                                    sx={{
                                      display: "flex",
                                      flexDirection: {
                                        xs: "column",
                                        sm: "row"
                                      }, // Stack items vertically on small screens
                                      alignItems: {
                                        xs: "flex-start",
                                        sm: "center"
                                      }, // Align items to the start on small screens, center on larger screens
                                      gap: {
                                        sm: 1,
                                        xs: 0
                                      }
                                    }}
                                  >
                                    ISRC Code :{" "}
                                    <InputLabel>{item?.isrcCode}</InputLabel>
                                  </Typography>

                                  <Typography
                                    component="span"
                                    sx={{
                                      display: "flex",
                                      flexDirection: {
                                        xs: "column",
                                        sm: "row"
                                      }, // Stack items vertically on small screens
                                      alignItems: {
                                        xs: "flex-start",
                                        sm: "center"
                                      }, // Align items to the start on small screens, center on larger screens
                                      gap: {
                                        sm: 1,
                                        xs: 0
                                      }
                                    }}
                                  >
                                    Composition Type :{" "}
                                    <InputLabel>
                                      {item?.compositionType}
                                    </InputLabel>
                                  </Typography>

                                  <Typography
                                    component="span"
                                    sx={{
                                      display: "flex",
                                      flexDirection: {
                                        xs: "column",
                                        sm: "row"
                                      }, // Stack items vertically on small screens
                                      alignItems: {
                                        xs: "flex-start",
                                        sm: "center"
                                      }, // Align items to the start on small screens, center on larger screens
                                      gap: {
                                        sm: 1,
                                        xs: 0
                                      }
                                    }}
                                  >
                                    Clean Explicit :{" "}
                                    <InputLabel>
                                      {item?.cleanExplicit}
                                    </InputLabel>
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{ textAlign: "start" }}
                              >
                                <Typography variant="body1" sx={{ my: 1 }}>
                                  Song
                                </Typography>
                                <audio
                                  controls
                                  style={{ width: "100%", borderRadius: "8px" }}
                                >
                                  <source src={item.file} type="audio/mpeg" />
                                  Your browser does not support the audio
                                  element.
                                </audio>
                              </Grid>

                              <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{ textAlign: "start" }}
                              >
                                <Box sx={{ textAlign: "start" }}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={item.dolbyAudio}
                                        sx={{
                                          color: "#ff8B00",
                                          "&.Mui-checked": { color: "#ff8B00" }
                                        }}
                                      />
                                    }
                                    label="Dolby Audio"
                                  />
                                </Box>
                              </Grid>

                              {item.dolbyAudio && (
                                <Grid
                                  item
                                  xs={12}
                                  md={12}
                                  sx={{ textAlign: "start" }}
                                >
                                  <Typography variant="body1" sx={{ my: 1 }}>
                                    Dolby
                                  </Typography>
                                  <audio
                                    controls
                                    style={{
                                      width: "100%",
                                      borderRadius: "8px"
                                    }}
                                  >
                                    <source
                                      src={item.dolbyUrl}
                                      type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio>
                                </Grid>
                              )}
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 3 }} />
                      <Box
                        display="grid"
                        gridTemplateColumns={{
                          xs: "repeat(1, 1fr)",
                          sm:
                            item.compositionType === "cover"
                              ? "repeat(2, 1fr)"
                              : "repeat(1, 1fr)"
                        }}
                      >
                        <Box>
                          <Typography variant="h6" sx={{ textAlign: "start" }}>
                            {" "}
                            Lyrics{" "}
                          </Typography>

                          {item?.songLyrics && (
                            <Box
                              sx={{
                                p: 4,
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                                gap: 2
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  textAlign: "center"
                                }}
                              >
                                <Image
                                  src={DOCIcon}
                                  height={80}
                                  width={80}
                                  alt="docImage"
                                  layout="resposive"
                                />
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  textAlign: "center"
                                }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{
                                    maxWidth: 150,
                                    textAlign: "center",
                                    textTransform: "capitalize",
                                    color: "white"
                                  }}
                                  onClick={() => window.open(item?.songLyrics)}
                                >
                                  Download
                                </Button>
                              </Box>
                            </Box>
                          )}
                        </Box>
                        {item.compositionType === "cover" && (
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{ textAlign: "start" }}
                            >
                              {" "}
                              Cover{" "}
                            </Typography>
                            <Box
                              sx={{
                                p: 4,
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                                gap: 2
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  textAlign: "center"
                                }}
                              >
                                <Image
                                  src={
                                    handleGetFileExtension(item?.coverSongFile)
                                      ? PdfIcon
                                      : DOCIcon
                                  }
                                  height={80}
                                  width={80}
                                  alt="cover"
                                  // layout="resposive"
                                />
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  textAlign: "center"
                                }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{
                                    maxWidth: 150,
                                    textAlign: "center",
                                    textTransform: "capitalize",
                                    color: "white"
                                  }}
                                  onClick={() =>
                                    window.open(item?.coverSongFile)
                                  }
                                >
                                  Download
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Box>
                      <Divider sx={{ my: 3 }} />
                      <Box>
                        <Typography variant="h6" sx={{ textAlign: "start" }}>
                          {" "}
                          Artist Details
                        </Typography>
                        <Box
                          mt={3}
                          rowGap={2}
                          columnGap={2}
                          display="grid"
                          gridTemplateColumns={{
                            xs: "repeat(1, 1fr)",
                            sm:
                              item?.artists.length < 1
                                ? "repeat(2, 1fr)"
                                : "repeat(1, 1fr)"
                          }}
                        >
                          {item?.artists
                            .filter(
                              (artist?: any) => artist.artistsType === "artist"
                            )
                            .map((artist?: any) => (
                              <Card key={artist} sx={{ p: 2 }}>
                                <Typography
                                  variant="body1"
                                  component="span"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5
                                  }}
                                >
                                  Artist name :-{" "}
                                  <InputLabel> {artist.name} </InputLabel>
                                </Typography>
                                <Box
                                  sx={{
                                    display: { sm: "flex", xs: "grid" },
                                    justifyContent: "start",
                                    alignItems: "center"
                                  }}
                                >
                                  <Switch
                                    checked={
                                      artist.role === "primary" ? true : false
                                    }
                                  />
                                  <Typography variant="body1">
                                    <InputLabel>
                                      {artist.role === "primary"
                                        ? "(Primary Artist)"
                                        : "(Featuring Artist)"}
                                    </InputLabel>
                                  </Typography>
                                </Box>
                                <Box sx={{ mt: 2, gap: 2 }}>
                                  {/* {artist.spotifyid && (     // Required Later */}
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{
                                      display: { sm: "flex" },
                                      alignItems: {
                                        sm: "center",
                                        xs: "start"
                                      },
                                      textAlign: "left",
                                      gap: 1
                                    }}
                                  >
                                    {"Spotify :-"}
                                    <InputLabel>
                                      <Tooltip title={artist.spotifyid}>
                                        <a href={artist.spotifyid}>
                                          {" "}
                                          {artist.spotifyid}
                                        </a>
                                      </Tooltip>{" "}
                                    </InputLabel>
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{
                                      display: { sm: "flex" },
                                      alignItems: {
                                        sm: "center",
                                        xs: "start"
                                      },
                                      textAlign: "left",
                                      gap: 1
                                    }}
                                  >
                                    {"Apple :-"}
                                    <InputLabel>
                                      <Tooltip title={artist.appleid}>
                                        <a href={artist.appleid}>
                                          {" "}
                                          {artist.appleid}
                                        </a>
                                      </Tooltip>{" "}
                                    </InputLabel>
                                  </Typography>
                                  {/* )} */}
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{
                                      display: { sm: "flex" },
                                      alignItems: "center",
                                      gap: 1
                                    }}
                                  >
                                    {"Instagram :-"}
                                    <InputLabel>
                                      <Tooltip title={artist.instagram}>
                                        <a href={artist.instagram}>
                                          {" "}
                                          {artist.instagram}
                                        </a>
                                      </Tooltip>{" "}
                                    </InputLabel>
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{
                                      display: { sm: "flex" },
                                      alignItems: "center",
                                      gap: 1
                                    }}
                                  >
                                    {"Facebook :-"}
                                    <InputLabel>
                                      <Tooltip title={artist.facebook}>
                                        <a href={artist.facebook}>
                                          {" "}
                                          {artist.facebook}
                                        </a>
                                      </Tooltip>{" "}
                                    </InputLabel>
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{
                                      display: { sm: "flex" },
                                      alignItems: "center",
                                      gap: 1
                                    }}
                                  >
                                    {"YouTube :-"}
                                    <InputLabel>
                                      <Tooltip title={artist.youtube}>
                                        <a href={artist.youtube}>
                                          {" "}
                                          {artist.youtube}
                                        </a>
                                      </Tooltip>{" "}
                                    </InputLabel>
                                  </Typography>
                                </Box>
                              </Card>
                            ))}
                        </Box>
                      </Box>
                      <Divider sx={{ my: 3 }} />

                      <Box>
                        <Typography variant="h6" sx={{ textAlign: "start" }}>
                          {" "}
                          Contributor{" "}
                        </Typography>
                        <Box
                          mt={3}
                          rowGap={2}
                          columnGap={2}
                          display="grid"
                          gridTemplateColumns={{
                            xs: "repeat(1, 1fr)",
                            sm:
                              item?.artists.length < 1
                                ? "repeat(2, 1fr)"
                                : "repeat(1, 1fr)"
                          }}
                        >
                          {item.artists
                            .filter(
                              (artist?: any) => artist.artistsType !== "artist"
                            )
                            .map((artist?: any) => (
                              <Card key={artist} sx={{ p: 2 }}>
                                <Typography
                                  variant="body1"
                                  component="span"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5
                                  }}
                                >
                                  Artist name :-{" "}
                                  <InputLabel sx={{ fontSize: "18px" }}>
                                    {" "}
                                    {artist.name}
                                  </InputLabel>
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "center"
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      mt: 1
                                    }}
                                  >
                                    <InputLabel>-({artist.role})</InputLabel>
                                  </Typography>
                                </Box>

                                <Box sx={{ mt: 2, gap: 2 }}>
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{
                                      display: { sm: "flex" },
                                      alignItems: { sm: "center", xs: "start" },
                                      textAlign: "left",
                                      gap: 1
                                    }}
                                  >
                                    {"Spotify :-"}
                                    <InputLabel>
                                      <Tooltip title={artist.spotifyid}>
                                        <a href={artist.spotifyid}>
                                          {" "}
                                          {artist.spotifyid}
                                        </a>
                                      </Tooltip>{" "}
                                    </InputLabel>
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{
                                      display: { sm: "flex" },
                                      alignItems: {
                                        sm: "center",
                                        xs: "start"
                                      },
                                      textAlign: "left",
                                      gap: 1
                                    }}
                                  >
                                    {"Apple :-"}
                                    <InputLabel>
                                      <Tooltip title={artist.appleid}>
                                        <a href={artist.appleid}>
                                          {" "}
                                          {artist.appleid}
                                        </a>
                                      </Tooltip>{" "}
                                    </InputLabel>
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{
                                      display: { sm: "flex" },
                                      alignItems: "center",
                                      gap: 1
                                    }}
                                  >
                                    {"Instagram :-"}
                                    <InputLabel>
                                      <Tooltip title={artist.instagram}>
                                        <a href={artist.instagram}>
                                          {" "}
                                          {artist.instagram}
                                        </a>
                                      </Tooltip>{" "}
                                    </InputLabel>
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{
                                      display: { sm: "flex" },
                                      alignItems: "center",
                                      gap: 1
                                    }}
                                  >
                                    {"Facebook :-"}
                                    <InputLabel>
                                      <Tooltip title={artist.facebook}>
                                        <a href={artist.facebook}>
                                          {" "}
                                          {artist.facebook}
                                        </a>
                                      </Tooltip>{" "}
                                    </InputLabel>
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{
                                      display: { sm: "flex" },
                                      alignItems: "center",
                                      gap: 1
                                    }}
                                  >
                                    {"YouTube :-"}
                                    <InputLabel>
                                      <Tooltip title={artist.youtube}>
                                        <a href={artist.youtube}>
                                          {" "}
                                          {artist.youtube}
                                        </a>
                                      </Tooltip>{" "}
                                    </InputLabel>
                                  </Typography>
                                </Box>
                              </Card>
                            ))}
                        </Box>
                      </Box>
                    </>
                  </AccordionDetails>
                </Accordion>
              )
            )}

            <Box sx={{ my: 4 }}>
              <Box
                mt={3}
                rowGap={2}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)"
                }}
              >
                {filterContributors?.map((artist?: any) =>
                  artist?.map((items?: any) => (
                    <Card key={items} sx={{ p: 2 }}>
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
                          alignItems: { xs: "flex-start", sm: "center" }, // Align items to the start on small screens, center on larger screens
                          gap: 1.5
                        }}
                      >
                        Artist name :-{" "}
                        <InputLabel sx={{ fontSize: "18px" }}>
                          {" "}
                          {items.name}
                        </InputLabel>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center"
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 1
                          }}
                        >
                          {"Spotify :-"}
                          <InputLabel>
                            {items.role === "primary"
                              ? "(Primary Artist)"
                              : "(Featuring Artist)"}
                          </InputLabel>
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 2, gap: 2 }}>
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{
                            display: { sm: "flex" },
                            alignItems: { sm: "center", xs: "start" },
                            textAlign: "left",
                            gap: 1
                          }}
                        >
                          {"Spotify :-"}
                          <InputLabel>
                            <Tooltip title={items.spotifyid}>
                              <a href={items.spotifyid}> {items.spotifyid}</a>
                            </Tooltip>{" "}
                          </InputLabel>
                        </Typography>
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{
                            display: { sm: "flex" },
                            alignItems: "center",
                            gap: 1
                          }}
                        >
                          {"Instagram :-"}
                          <InputLabel>
                            <Tooltip title={items.instagram}>
                              <a href={items.instagram}> {items.instagram}</a>
                            </Tooltip>{" "}
                          </InputLabel>
                        </Typography>
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{
                            display: { sm: "flex" },
                            alignItems: "center",
                            gap: 1
                          }}
                        >
                          {"Facebook :-"}
                          <InputLabel>
                            <Tooltip title={items.facebook}>
                              <a href={items.facebook}> {items.facebook}</a>
                            </Tooltip>{" "}
                          </InputLabel>
                        </Typography>
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{
                            display: { sm: "flex" },
                            alignItems: "center",
                            gap: 1
                          }}
                        >
                          {"YouTube :-"}
                          <InputLabel>
                            <Tooltip title={items.youtube}>
                              <a href={items.youtube}> {items.youtube}</a>
                            </Tooltip>{" "}
                          </InputLabel>
                        </Typography>
                      </Box>
                    </Card>
                  ))
                )}
              </Box>
              <Box
                mt={3}
                rowGap={2}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)"
                }}
              >
                <Stack sx={{ flexDirection: "column" }}>
                  <Typography variant="h6" sx={{ textAlign: "start" }}>
                    {" "}
                    Artwork{" "}
                  </Typography>
                  <Card sx={{ display: "flex", justifyContent: "center" }}>
                    <CardMedia
                      component="img"
                      height="440px"
                      width="440px" // Required Later
                      image={cover}
                      alt="Art Work"
                    />
                  </Card>
                </Stack>
              </Box>
              <Typography variant="h6" sx={{ my: 2 }}>
                Apple Motion Graphics
              </Typography>
              {appleMotionGraphics && (
                <Box
                  mt={3}
                  rowGap={2}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)"
                  }}
                >
                  <Card>
                    <Typography paddingY={1}>Size 1:1</Typography>
                    <CardMedia
                      component="img"
                      // height='100%'
                      sx={{ borderRadius: "20px" }}
                      image={ablumPageMotionOne}
                      alt="Apple motion Graphics 1"
                    />
                  </Card>
                  <Card>
                    <Typography paddingY={1}>Size 3:4</Typography>
                    <CardMedia
                      component="img"
                      // height="100%"
                      sx={{ borderRadius: "20px" }}
                      image={ablumPageMotionTwo}
                      alt="Apple motion Graphics 2"
                    />
                  </Card>
                </Box>
              )}
              <Typography variant="h6" sx={{ my: 2 }}>
                Platforms
              </Typography>
              <Box
                sx={{
                  maxHeight: "40vh",
                  overflowY: "auto",
                  padding: 2,
                  "&::-webkit-scrollbar": { width: "8px" },
                  "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#fe8d0bc4",
                    borderRadius: "4px"
                  },
                  "&::-webkit-scrollbar-thumb:hover": { background: "#FE8E0B" }
                }}
              >
                <Box
                  rowGap={2}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(3, 1fr)",
                    lg: "repeat(5, 1fr)"
                  }}
                >
                  {platforms?.map((item: any, index: number) => (
                    <Card
                      key={index}
                      sx={{
                        // width: 200,
                        mx: 1,
                        my: 1,
                        borderColor: "secondary",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#ff8B00",
                        color: "#fff"
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        // fontWeight={"bold"}
                        sx={{
                          padding: 1,
                          textAlign: "center",
                          textWrap: "wrap"
                        }}
                      >
                        {item}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
      <Box>
        {orderDataById?.isFree ? (
          <Box display={"flex"} justifyContent='flex-end'>
            {" "}
            <Button
              variant="contained"
              LinkComponent="a"
              href="/dashboard/music-distribution/my-releases"
              sx={{ color: "white" }}
            >
              Finish
            </Button>
          </Box>
        ) : (
          <CustomStepButton
            activeTab={activeTab}
            handleBack={handleBack}
            steps={steps}
            handleNext={handleNext}
          />
        )}
      </Box>
    </>
  );
};

export default ReviewTheReleasePage;
