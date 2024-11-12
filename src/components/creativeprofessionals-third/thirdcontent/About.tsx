"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import MicIcon from "@mui/icons-material/Mic";
import Signature from "@public/images/portfolio/Signature.png";
import Imagecard4 from "@public/images/portfolio/Imagecard4.png";
import AddHead from "../addThird/AddHead";

export default function About() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <Typography
        paddingTop={5}
        variant="h1"
        color="white"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: {
            xs: "2.5rem",
            sm: "3rem",
            md: "4rem",
          },
          color: "#000",
          fontFamily: "monoton",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        About me
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Button
          size="small"
          sx={{
            backgroundColor: "#00d8c0",
            color: "#fff",
            border: "1px solid #000",
            borderRadius: "25px",
            marginY: 2,

            "&:hover": {
              background: "#00d8c0",
            },
          }}
          onClick={handleOpenDialog}
        >
          +ADD
        </Button>
        <AddHead open={dialogOpen} onClose={handleCloseDialog} />
        <br></br>
      </Box>
      <Grid container>
        <Grid item xs={12} md={5}>
          <Container
            sx={{
              margin: { xs: 1, md: 2 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Image
                src={Imagecard4}
                alt="Imagecard4"
                width={350}
                height={350}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} md={7}>
          <Container
            sx={{
              display: "grid",
              textAlign: "left",
            }}
          >
            <Button
              size="small"
              sx={{
                backgroundColor: "#fff",
                color: "#4dcab4",
                fontWeight: "bold",
                borderRadius: "25px",
                marginY: 2,
                maxWidth: { xs: "40%", sm: "20%" },
                ml: { xs: 1, md: 4 },
                "&:hover": {
                  background: "#fff",
                },
              }}
              endIcon={<MicIcon />}
            >
              Musician
            </Button>
            <Typography
              sx={{
                fontFamily: "lato",
                m: { xs: 1, md: 4 },
                maxWidth: { xs: "100%", md: "80%" },
                mt: 3,
                textAlign: { xs: "justify", md: "left" },
                fontSize: { xs: "1rem", sm: "1.6rem", lg: "1.5rem" },
              }}
            >
              Curabitur Non Nulla Sit Amet Nisl Tempus Convallis Quis Ac Lectus.
              Curabitur Non Nulla Sit Amet Nisl Tempus Convallis Quis Ac Lectus.
              Donec Sollicitudin Molestie Malesuada. Sed Porttitor Lectus Nibh.
              Curabitur Aliquet Quam Id Dui Posuere Blandit.
            </Typography>
            <Box
              p={2}
              sx={{
                width: "100%",
                maxWidth: { xs: "70%", sm: "250px" },
                height: "auto",
              }}
            >
              <Image
                src={Signature}
                alt="Signature"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Container>
        </Grid>
      </Grid>
      ;
    </>
  );
}
