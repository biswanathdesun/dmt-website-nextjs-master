"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Image from "next/image";
import EventDetailsDialog from "../addSecond/EventDetailsDialog";
import imgCd5 from "/public/images/portfolio/ImgCd5.png";
import Im1 from "@public/images/Creativepro2/Event/Im1.png";
import Im2 from "@public/images/Creativepro2/Event/Im2.png";
import Im3 from "@public/images/Creativepro2/Event/Im3.png";
import Im4 from "@public/images/Creativepro2/Event/Im4.png";
import Im5 from "@public/images/Creativepro2/Event/Im5.png";
import AddEvent from "../addSecond/AddEvent";

interface Info {
  id: number;
  image: string;
  heading: string;
  information: string;
  venue: string;
  time: string;
  date: string;
  day: string;
}

const infoData: Info[] = [
  {
    id: 1,
    image: imgCd5.src,
    heading: "Rockparty with DJ",
    information:
      "Some interesting information about the content. This is where you can add more details about the topic.",
    venue: "Korba, Chhattisgarh",
    time: "08:00 PM",
    date: "1 AUG 2024",
    day: "Thursday",
  },
];

const Event: React.FC = () => {
  const [dialogOpenEventDetails, setDialogOpenEventDetails] =
    useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Info | null>(null);

  const handleOpenAddEventDialog = () => {
    setDialogOpenEventDetails(true);
    setSelectedEvent(null);
  };

  const handleCloseAddEventDialog = () => {
    setDialogOpenEventDetails(false);
  };

  const handleOpenEventDetailsDialog = (event: Info) => {
    setSelectedEvent(event);
    setDialogOpenEventDetails(true);
  };

  return (
    <Box>
      <Typography
        gutterBottom
        variant="h2"
        color="white"
        sx={{
          display: "flex",
          justifyContent: "center",
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
          mb: { xs: 2, sm: 1 },
          mt: { xs: 8, sm: 2 },
        }}
      >
        Upcoming concerts
      </Typography>
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
            top: -50,
            right: { lg: 250, md: 140, xs: 20 },
            width: "70px",
            height: "auto",
          }}
        >
          <Image src={Im1} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
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
            top: { md: -50, sm: -10 },
            left: { lg: 0, md: 10, sm: 0, xs: 20 },
            display: { xs: "none", sm: "block" },
            width: "500px",
            height: "auto",
          }}
        >
          <Image src={Im2} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",

            top: -50,
            right: { lg: 20, md: 140, xs: 20 },
            width: "180px",
            height: "auto",
          }}
        >
          <Image src={Im3} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
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
        onClick={handleOpenAddEventDialog}
      >
        +ADD
      </Button>
      <AddEvent
        open={dialogOpenEventDetails}
        onClose={handleCloseAddEventDialog}
        view={selectedEvent} // No event selected for add dialog
      />
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          p: 2,
        }}
      >
        {infoData.map((info) => (
          <Box
            key={info.id}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              maxWidth: { xs: "100%", sm: "50%" },
              margin: 2,
              width: "100%", // Ensures full width on smaller screens
              transform: "rotate(5deg)",
            }}
          >
            <IconButton
              onClick={() => handleOpenEventDetailsDialog(info)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
                width: 40,
                height: 40,
                zIndex: 1,
                "&:hover": {
                  background: "#00d8c0",
                },
                backgroundColor: "#00d8c0",
                borderRadius: "25px",
              }}
            >
              <EditIcon />
            </IconButton>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ff599e",
                borderRadius: 0,
                overflow: "hidden",
                boxShadow: 3,
                height: "auto",
                p: 2,
              }}
            >
              <Grid container>
                <Grid item xs={12} md={5}>
                  <CardMedia
                    component="div"
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: { xs: 200, md: "100%" },
                      py: 2,
                    }}
                  >
                    <Image
                      src={info.image}
                      alt={info.heading}
                      fill
                      objectFit="cover"
                    />
                  </CardMedia>
                </Grid>
                <Grid item xs={12} md={7}>
                  <CardContent sx={{ p: 1 }}>
                    <Typography
                      variant="body2"
                      color="white"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "Anton",
                        color: "black",
                      }}
                    >
                      {info.date}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ p: 1, pb: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        color: "#00d8c0",
                        WebkitTextStroke: "0.8px black",
                        fontSize: "1.9rem",
                      }}
                    >
                      {info.heading}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "Anton",
                        color: "black",
                      }}
                    >
                      {info.information}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        fontWeight: "bold",
                        fontFamily: "Anton",
                        color: "black",
                      }}
                    >
                      <LocationOnIcon sx={{ color: "#fce23b " }} />
                      {info.venue}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontFamily: "Anton",
                        color: "black",
                      }}
                    >
                      <AccessAlarmIcon sx={{ color: "#fce23b" }} />
                      {info.time}
                    </Typography>
                  </CardContent>
                  <Box sx={{ m: 1 }}>
                    <Button
                      sx={{
                        width: { xs: "90%", sm: "60%", md: "60%" },
                        borderRadius: "3px",
                        backgroundColor: "#fce23b",
                        color: "#ad4c75",
                        fontWeight: "bold",
                        border: "2px solid black",
                        fontFamily: "anton",
                        "&:hover": {
                          backgroundColor: "#fce23b",
                        },
                      }}
                      variant="contained"
                    >
                      Learn More
                    </Button>{" "}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { sm: "flex-end" },
                      mr: 2,
                      m: 2,
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Card>
          </Box>
        ))}
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
            bottom: 0,
            left: { lg: 40, md: 10, xs: 20 },
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
            top: -60,
            right: { lg: 250, md: 140, xs: 20 },
            width: "250px",
            height: "auto",
          }}
        >
          <Image src={Im5} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Event;
