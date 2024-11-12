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
import imgCd5 from "/public/images/portfolio/ImgCd5.png";
import EventDetailsDialog from "../addThird/EventDetailsDialog";
import AddEvent from "../addThird/AddEvent";

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
  const [dialogOpenAddEvent, setDialogOpenAddEvent] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Info | null>(null);

  const handleOpenAddEventDialog = () => {
    setDialogOpenAddEvent(true);
    setSelectedEvent(null);
  };

  const handleCloseAddEventDialog = () => {
    setDialogOpenAddEvent(false);
  };

  const handleOpenEventDetailsDialog = (event: Info) => {
    setSelectedEvent(event);
    setDialogOpenAddEvent(true);
  };
  return (
    <Box>
      <Typography
        paddingTop={5}
        variant="h1"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: {
            xs: "2.5rem",
            sm: "3rem",
            md: "4rem",
          },
          color: "#fff",
          fontFamily: "monoton",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Upcoming concerts
      </Typography>

      <Box sx={{ textAlign: "center" }}>
        <Button
          size="small"
          sx={{
            backgroundColor: "#00d8c0",
            color: "#fff",
            border: "2px solid #fff",
            borderRadius: "25px",
            marginY: 2,

            // left: { md: 460, xs: 130, sm: 330, lg: 720 },

            "&:hover": {
              background: "#00d8c0",
            },
          }}
          onClick={handleOpenAddEventDialog}
        >
          +ADD
        </Button>
        <AddEvent
          open={dialogOpenAddEvent}
          onClose={handleCloseAddEventDialog}
          view={selectedEvent} // No event selected for add dialog
        />
      </Box>
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
              maxWidth: { xs: "100%", sm: "70%" },
              margin: 2,
              width: "100%", // Ensures full width on smaller screens
              // transform: "rotate(5deg)",
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
                borderRadius: 8,
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
                      style={{ borderRadius: 10 }}
                    />
                  </CardMedia>
                </Grid>
                <Grid item xs={12} md={7}>
                  <CardContent sx={{ p: 1 }}></CardContent>
                  <CardContent sx={{ p: 1, pb: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontFamily: "monoton",
                        color: "#000",
                        fontSize: "2rem",
                      }}
                    >
                      {info.heading}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        // fontFamily: "Anton",
                        color: "black",
                        textTransform: "uppercase",
                        m: 1,
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
                        fontFamily: "lato",
                        color: "black",
                      }}
                    >
                      <LocationOnIcon sx={{ color: "#4dcab4 ", m: "7px" }} />
                      {info.venue}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "lato",
                        color: "black",
                      }}
                    >
                      <AccessAlarmIcon sx={{ color: "#4dcab4", m: "7px" }} />
                      {info.time}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="white"
                      sx={{
                        fontFamily: "lato",
                        color: "black",
                        m: "5px",
                      }}
                    >
                      {info.date}&nbsp;&nbsp; | &nbsp;&nbsp;{info.day}
                    </Typography>
                  </CardContent>
                  <Box sx={{ m: 1 }}>
                    <Button
                      sx={{
                        width: { xs: "90%", sm: "60%", md: "37%" },
                        borderRadius: "17px",
                        backgroundColor: "#cdfff6",
                        p: 2,
                        color: "#4dcab4",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "#cdfff6",
                        },
                      }}
                      variant="contained"
                    >
                      Book Now
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
    </Box>
  );
};

export default Event;
