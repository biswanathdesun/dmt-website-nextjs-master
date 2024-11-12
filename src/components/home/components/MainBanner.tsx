"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import arRehman from "@public/images/ARrehman.svg";
import Navbar from "@/components/common/navbar/Navbar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import styles from "./home.module.css";
import { useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import AnimatedTextCircle from "@/components/textanimation/AnimatedTextCircle";

export default function MainBanner() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  let imageHeight = 505; // default height
  if (isXs) imageHeight = 220.51;
  else if (isSm) imageHeight = 505;
  else if (isMd) imageHeight = 400.51;
  else if (isLg) imageHeight = 570.51;
  else if (isXl) imageHeight = 570.51;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%", // Ensure it stays within 80vw
        backgroundColor: "#ffffe4",
        zIndex: 1,
        overflow: "hidden", // Ensure animations don't overflow
      }}
    >
      <Navbar />
      <motion.section
        id="up"
        className="animated-section"
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
          x: [0, "25vw", "-25vw", 0], // Adjusted for 80vw width
          y: [0, "-25vh", "25vh", 0], // Adjusted for 100vh height
          transition: { duration: 10, ease: "easeInOut", loop: Infinity },
        }}
        style={{ zIndex: -1 }} // Ensure animations are behind content
      />
      <motion.section
        id="down"
        className="animated-section"
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
          x: [0, "-25vw", "25vw", 0], // Adjusted for 80vw width
          y: [0, "25vh", "-25vh", 0], // Adjusted for 100vh height
          transition: { duration: 10, ease: "easeInOut", loop: Infinity },
        }}
        style={{ zIndex: -1 }} // Ensure animations are behind content
      />
      <motion.section
        id="left"
        className="animated-section"
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
          x: [0, "-25vw", "25vw", 0], // Adjusted for 80vw width
          y: [0, "-25vh", "25vh", 0], // Adjusted for 100vh height
          transition: { duration: 10, ease: "easeInOut", loop: Infinity },
        }}
        style={{ zIndex: -1 }} // Ensure animations are behind content
      />
      <motion.section
        id="right"
        className="animated-section"
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
          x: [0, "25vw", "-25vw", 0], // Adjusted for 80vw width
          y: [0, "25vh", "-25vh", 0], // Adjusted for 100vh height
          transition: { duration: 10, ease: "easeInOut", loop: Infinity },
        }}
        style={{ zIndex: -1 }} // Ensure animations are behind content
      />
      <Container
        maxWidth="xl"
        sx={{
          paddingY: {
            lg: 5,
            xl: 10,
            md: 4,
            xs: 4,
          },
          paddingX: {
            lg: 10,
            md: 8,
            sm: 5,
            xs: 2,
          },
        }}
      >
        <Grid container>
          <Grid
            item
            lg={6}
            md={5}
            xs={12}
            sx={{
              pb: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: {
                xl: "flex-start",
                lg: "flex-start",
                md: "flex-start",
                sm: "center",
                xs: "center",
              },
              bgcolor: "transparent",
            }}
          >
            <Typography
              className={styles.content}
              sx={{
                fontWeight: "800",
                fontFamily: "Raleway",
                fontSize: {
                  xl: "55px",
                  md: "50px",
                  sm: "40px",
                  xs: "22px",
                },
              }}
            >
              We&apos;re not just a
            </Typography>
            <Typography
              className={styles.content}
              sx={{
                fontWeight: "800",
                fontFamily: "Raleway",
                fontSize: {
                  xl: "55px",
                  md: "50px",
                  sm: "40px",
                  xs: "22px",
                },
                color: "#FF8B00",
              }}
            >
              <Typewriter
                options={{
                  strings: [
                    "Distributor",
                    "Mastering Service",
                    "Artist Managers",
                    "Media Agency",
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: "",
                  deleteSpeed: 15,
                  delay: 20,
                }}
              />
            </Typography>
            <Typography
              className={styles.content}
              sx={{
                fontWeight: "800",
                fontFamily: "Raleway",
                fontSize: {
                  xl: "55px",
                  md: "50px",
                  sm: "40px",
                  xs: "22px",
                },
              }}
            >
              We&apos;re the answer to
            </Typography>
            <Typography
              className={styles.content}
              sx={{
                fontWeight: "800",
                fontFamily: "Raleway",
                fontSize: {
                  xl: "55px",
                  md: "50px",
                  sm: "40px",
                  xs: "22px",
                },
              }}
            >
              your questions.
            </Typography>
          </Grid>
          <Grid
            item
            lg={6}
            md={7}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              position: "relative",
              alignItems: {
                xl: "flex-end",
                lg: "flex-end",
                md: "flex-end",
                sm: "center",
                xs: "center",
              },
              // paddingRight: {
              //   lg: 10
              // },
              // paddingX: { xs: 10 }
            }}
          >
            <Card
              variant="elevation"
              elevation={12}
              sx={{
                maxWidth: "fit-content",
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <Box sx={{ borderRadius: "50%" }}>
                <PlayArrowIcon
                  onClick={handleClickOpen}
                  sx={{
                    fontSize: "3rem",
                    display: { xs: "flex", sm: "none" },
                    top: "40%",
                    left: "43%",
                    zIndex: 365255,
                    position: "absolute",
                    color: "#fff",
                  }}
                />
              </Box>
              <Box
                className={styles.circularImageContainer}
                sx={{
                  width: { xs: 70, sm: 107 },
                  height: { xs: 70, sm: 107 },
                  borderRadius: "50%",
                  // overflow: "hidden",
                  position: "absolute",
                  bottom: {
                    xs: 10,
                    sm: 10,
                    md: 20,
                    lg: 30,
                    xl: 20,
                  },
                  left: {
                    xs: "auto",
                    sm: 90,
                    md: -46,
                    lg: 79,
                    xl: 96,
                  },
                  right: {
                    xs: 5,
                    sm: 7,
                    md: "auto",
                  },
                  display: { sm: "flex", xs: "none" },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AnimatedTextCircle />
                {/* <Image src={DMT} alt="A.R. Rehman" loading="lazy" fill={true} /> */}
                <IconButton
                  onClick={handleClickOpen}
                  sx={{
                    position: "absolute",
                    color: "white",
                    fontSize: "3rem",
                    zIndex: 3332,
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: "4rem" }} />
                </IconButton>
              </Box>
              <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <iframe
                  width="100%"
                  height="505px"
                  src="https://www.youtube.com/embed/RP5JJMZkHDQ"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="A.R. Rehman Video"
                ></iframe>
              </Dialog>
              {/* <Image
                src={arRehman}
                alt="A.R. Rehman"
                loading="lazy"
                height={imageHeight}
                width={505}
              /> */}
              <Box
                sx={{
                  width: { md: "520px", sm: "400px", xs: "250px" },
                  height: { md: "520px", sm: "400px", xs: "250px" },
                  overflow: "hidden",
                }}
              >
                <video
                  style={
                    {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // 'cover' will ensure the video covers the container fully
                      border: "none",
                      zIndex: 0,
                    } as React.CSSProperties
                  }
                  autoPlay
                  loop
                  muted
                  playsInline
                  src="https://delivertune.s3.ap-south-1.amazonaws.com/videos/homepagevideo.mp4"
                  title="HomePage"
                >
                  Your browser does not support the video tag.
                </video>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
