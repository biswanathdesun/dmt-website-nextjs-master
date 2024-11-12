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
import EventDetailsDialog from "../add/EventDetailsDialog";
import imgCd5 from "/public/images/portfolio/ImgCd5.png";

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

const buttonStyles = {
  borderRadius: "25px",
  border: "2px solid white",
  padding: { xs: "8px 16px", md: "12px 24px" },
  color: "#ffffff",
  textTransform: "none",
  fontWeight: "bold",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  "&:focus": {
    outline: "none",
  },
};

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
    <Box
      sx={{
        py: 4,
        px: 2,
        backgroundColor: "#120909",
      }}
    >
      <Typography
        gutterBottom
        variant="h2"
        color="white"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: {
            xs: "2rem",
            sm: "3.5rem",
            lg: "4rem",
          },
        }}
      >
        Event
        <Button
          size="small"
          sx={{
            ...buttonStyles,
            backgroundColor: "#000",
            color: "#fff",
            marginLeft: { xs: 2, sm: 4 },
          }}
          onClick={handleOpenAddEventDialog}
        >
          +ADD
        </Button>
        <EventDetailsDialog
          open={dialogOpenAddEvent}
          onClose={handleCloseAddEventDialog}
          view={selectedEvent} // No event selected for add dialog
        />
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          p: 2,
        }}
      >
        {infoData.map((info) => (
          <Card
            key={info.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#383838",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 3,
              maxWidth: 900,
              height: "auto",
            }}
          >
            <Grid container>
              <Grid item xs={12} md={5}>
                <CardMedia
                  component="div"
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 300, md: "100%" },
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
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      color="white"
                    >
                      {info.heading}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {info.information}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="white"
                      sx={{ display: "flex", alignItems: "center", mt: 1 }}
                    >
                      <LocationOnIcon sx={{ color: "#FB8E0B" }} />
                      {info.venue}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="white"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <AccessAlarmIcon sx={{ color: "#FB8E0B" }} />
                      {info.time}
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    pt: 1,
                    pl: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "90%",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="white"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {info.date}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="white"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {info.day}
                    </Typography>
                  </CardContent>
                  <Button
                    sx={{
                      mt: 2,
                      width: { xs: "90%", sm: "40%", md: "90%" },
                      borderRadius: "25px",
                      backgroundColor: "#FB8E0B",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#F0B00B",
                      },
                    }}
                    variant="contained"
                  >
                    Learn More
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { sm: "flex-end" },
                      mr: 2,
                      m: 2,
                    }}
                  >
                    <IconButton
                      onClick={() => handleOpenEventDetailsDialog(info)}
                      sx={{
                        color: "white",
                        width: 50,
                        height: 50,
                        border: "2px solid white",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default Event;
