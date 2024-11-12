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
import Image from "next/image";
import i1 from "@public/images/Creativepro2/I1.png";
import i2 from "@public/images/Creativepro2/I2.png";
import i3 from "@public/images/Creativepro2/I3.png";
import i4 from "@public/images/Creativepro2/I4.png";
import i5 from "@public/images/Creativepro2/I5.png";
import Imagecard4 from "@public/images/portfolio/Imagecard4.png";
import AddHead from "./addSecond/AddHead";
import EditIcon from "@mui/icons-material/Edit";
import Listen from "./content_tab/Listen";
import YouTube from "./content_tab/Youtube";
import Event from "./content_tab/Event";
import Gallery from "./content_tab/Gallery";
import Admire from "./content_tab/Admire";
import ContactForm from "./content_tab/ContactForm";

const buttonConfigs = [
  {
    text: "Hire Me For Event",
    backgroundColor: "#ff5999",
    textColor: "#fce23b",
  },
  {
    text: "Listen my song",
    backgroundColor: "#fce23b",
    textColor: "#ff5999",
  },
];

export default function CreativeProfessionals_II() {
  const [selectedTab, setSelectedTab] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    sectionRefs.current[newValue]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const setRef = (index: number) => (element: HTMLDivElement | null) => {
    sectionRefs.current[index] = element;
  };

  return (
    <>
      <Box
        sx={{
          background: "#fce23b",
          p: 2,
          height: { md: "98vh", xs: "170vh", sm: "195vh" },
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <Container sx={{ margin: { xs: 1, md: 2 } }}>
              <Button
                size="small"
                sx={{
                  backgroundColor: "#00d8c0",
                  color: "#fff",
                  border: "2px solid #fff",
                  borderRadius: "25px",
                  left: { md: 400, xs: 90, sm: 300, lg: 680 },
                  "&:hover": {
                    background: "#00d8c0",
                  },
                }}
                onClick={handleOpenDialog}
              >
                <EditIcon />
                Edit
              </Button>
              <AddHead open={dialogOpen} onClose={handleCloseDialog} />
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
                    top: "50%",
                    left: "45%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    maxWidth: "300px",
                    height: "auto",
                    zIndex: 1,
                  }}
                >
                  <Image
                    src={Imagecard4}
                    alt="Imagecard4"
                    width={250}
                    height={250}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "90%",
                    height: "auto",
                    transform: { sm: "scalex(1.3)", xs: "scaley(1.3)" },
                  }}
                >
                  <Image
                    src={i2}
                    alt="Head banner"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} md={6}>
            <Container sx={{ marginBottom: { lg: "100px" } }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
                  display: { lg: "block", xs: "none" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: 20,
                    width: "70px",
                    height: "auto",
                  }}
                >
                  <Image
                    src={i1}
                    alt=""
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Box>
            </Container>

            <Container
              sx={{
                display: "grid",
                textAlign: { xs: "left", md: "center" },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "3.5rem",
                    md: "3rem",
                    lg: "3.5rem",
                  },
                  fontWeight: "bold",
                  color: "#00d8c0",
                  WebkitTextStroke: {
                    xs: "1px black",
                    sm: "1.5px black",
                    md: "2.5px black",
                  },
                  fontStyle: "italic",
                  transform: "scaleY(1.9)",
                  mb: { xs: 2, sm: 1 },
                  mt: { xs: 8, sm: 2 },
                }}
              >
                DELIVER MY TUNE
              </Typography>
              <Typography
                sx={{
                  fontFamily: "anton",
                  ml: { xs: 0, md: 4 },
                  fontWeight: "bold",
                  maxWidth: { xs: "100%", sm: "80%" },
                  mt: 3,
                  textAlign: { xs: "justify", md: "left" },
                  fontSize: { xs: "1rem", md: "1rem", lg: "0.88rem" },
                }}
              >
                Curabitur Non Nulla Sit Amet Nisl Tempus Convallis Quis Ac
                Lectus. Curabitur Non Nulla Sit Amet Nisl Tempus Convallis Quis
                Ac Lectus. Donec Sollicitudin Molestie Malesuada. Sed Porttitor
                Lectus Nibh. Curabitur Aliquet Quam Id Dui Posuere Blandit.
              </Typography>
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: { display: "none" },
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{
                    my: {
                      sm: 2,
                      xs: 1,
                    },
                    ml: {
                      sm: 2,
                      xs: -2,
                    },
                  }}
                >
                  {buttonConfigs.map(
                    ({ text, backgroundColor, textColor }, index) => (
                      <Grid item xs={12} sm={5} key={text}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Tab
                            label={text}
                            sx={{
                              width: "100%", // Ensure tab takes full width within its grid item
                              margin: { xs: "2px", sm: 1 },
                              mb: { xs: "15px", sm: "25px" },
                              borderRadius: "2px",
                              padding: { xs: "2px 16px", sm: "12px 24px" },
                              color: textColor,
                              fontWeight: "bold",
                              border: "2px solid black",
                              background: backgroundColor,
                              fontSize: {
                                xs: "0.75rem",
                                sm: "0.875rem",
                              },
                              "&.Mui-selected": {
                                background: backgroundColor,
                                color: textColor,
                              },
                              "&.MuiTab-root": {
                                opacity: 1,
                              },
                              "&:hover": {
                                background: backgroundColor,
                                color: textColor,
                                opacity: 1, // Ensures no dimming effect on hover
                              },
                              transform: {
                                xs: "rotate(2deg)",
                                sm: "rotate(5deg)",
                              },
                            }}
                            onClick={() => handleChange(null as any, index)}
                          />
                        </Box>
                      </Grid>
                    )
                  )}
                </Grid>
              </Tabs>

              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
                }}
              >
                <Box
                  sx={{
                    position: "relative ",
                    top: -30,
                    left: { xs: "0%", sm: "10%" },
                    width: "100%",
                    maxWidth: "130px",
                    height: "auto",
                  }}
                >
                  <Image
                    src={i3}
                    alt="Head banner"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "relative ",
                    bottom: 165,
                    left: { xs: "70%", sm: "80%", md: "70%", lg: "80%" },
                    width: "100%",
                    maxWidth: "60px",
                    height: "auto",
                  }}
                >
                  <Image
                    src={i4}
                    alt="Head banner"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
                }}
              ></Box>
            </Container>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ background: "#ff599e", p: 2 }}>
        <Box ref={setRef(1)} sx={{ p: 2, backgroundColor: "#ff599e" }}>
          <Listen />
        </Box>
      </Box>
      <Box sx={{ background: "#fce23b", p: 2, overflow: "hidden" }}>
        <Event />
      </Box>

      <Box sx={{ p: 2, backgroundColor: "#ff599e" }}>
        <YouTube />
      </Box>
      <Box sx={{ background: "#fce23b", p: 2 }}>
        <Gallery />
      </Box>
      <Box sx={{ p: 2, backgroundColor: "#ff599e",   }}>
        <Admire />
      </Box>
      <Box
        ref={setRef(0)}
        sx={{ background: "#fce23b", p: 2, overflow: "hidden" }}
      >
        <ContactForm />
      </Box>
    </>
  );
}
