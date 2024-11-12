"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState, useRef } from "react";
import HeadBanner from "../common/HeadBanner";
import DistributeNow from "../common/distributeNow/DistributeNow";
import Footer from "../common/footer/Footer";
import CustomHeading from "../common/CustomHeading";

function About() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Initial setup
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean-up function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isScreenWidthLessThan620px = windowWidth !== null && windowWidth < 620;

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video1 = videoRef1.current;
    const video2 = videoRef2.current;
    const video3 = videoRef3.current;

    if (video1) {
      video1.muted = true;
      video1.play().catch((error) => {
        console.error("Error attempting to play video:", error);
      });
    }
    if (video2) {
      video2.muted = true; // Ensure video is muted for autoplay to work
      video2.play().catch((error) => {
        console.error("Error attempting to play video:", error);
      });
    }
    if (video3) {
      video3.muted = true; // Ensure video is muted for autoplay to work
      video3.play().catch((error) => {
        console.error("Error attempting to play video:", error);
      });
    }
  }, []);

  return (
    <>
      <HeadBanner>From a Dream to a Digital Revolution</HeadBanner>
      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            maxHeight: "455px",
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            paddingY: { xs: 6, sm: 7 },
          }}
        >
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <CustomHeading
              customStyles={{
                fontFamily: "Raleway",
                fontWeight: 600,
                fontSize: { xs: 30, md: 40 },
                color: "#000000",
                textAlign: "center",
              }}
              text={"Our Story"}
            />
          </Grid>
          <Grid item xs={12} sx={{ px: { xs: "1rem", md: "90px" } }}>
            <Typography
              // variant="body1"
              sx={{
                fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
                color: "#555555",
                marginY: 4,
                textAlign: { xs: "justify", sm: "center" },
              }}
            >
              Deliver My Tune was born from a passion for music and a desire to
              make music distribution accessible to everyone. Our founder,
              Vibhor Goel, experienced firsthand the challenges and barriers in
              the traditional music distribution process while managing an
              artist. Determined to create a solution, Vibhor envisioned a
              platform that would simplify distribution, ensure fair royalties,
              and provide artists with the control they deserve.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ px: { xs: "1rem", md: "90px" } }}>
            <Typography
              sx={{
                fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
                lineHeight: { xs: "1.5rem", md: "1.875rem" },
                color: "#555555",
                textAlign: { xs: "justify", sm: "center" },
              }}
            >
              With a small but dedicated team, Deliver My Tune launched in 2015,
              aiming to revolutionize the music industry. Our journey began with
              the belief that every artist should have the opportunity to share
              their music with the world, without the obstacles and high costs
              traditionally associated with music distribution. Over the years,
              we have grown and evolved, continuously improving our platform to
              meet the needs of our artists.
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: { xs: 35, sm: 8, md: 10 },
          }}
        >
          <Box paddingBottom={10} paddingX={{ xs: 2, sm: 5, md: 10, xl: 8 }}>
            <Grid
              container
              spacing={2}
              //   sx={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}
            >
              <Grid item xs={12} sm={5}>
                <CustomHeading
                  customStyles={{
                    fontFamily: "Raleway",
                    fontWeight: 600,
                    fontSize: { xs: 30, md: 40 },
                    color: "#000000",
                    display: "flex",
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                  text={"Our Mission"}
                />
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
                    // lineHeight: "1.5",
                    color: "#555555",
                    textAlign: { sm: "left", xs: "justify" },
                  }}
                >
                  At Deliver My Tune, our mission is to simplify music
                  distribution, enabling artists to focus on their passion –
                  creating music. We strive to provide a seamless platform that
                  connects artists with global audiences, ensuring their music
                  reaches every corner of the world. We are committed to
                  offering top-quality service, fair royalties, and
                  comprehensive support to all our artist
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={7}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Box
                  sx={{
                    maxWidth: "500px",
                    maxHeight: "400px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <video
                    style={{ width: "100%", height: "auto" }}
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="https://delivertune.s3.ap-south-1.amazonaws.com/videos/Mission.mp4"
                  >
                    source
                  </video>
                </Box>
              </Grid>
            </Grid>
            {isScreenWidthLessThan620px ? (
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: { xs: 5, md: "auto" },
                }}
              >
                <Grid item xs={12} sm={5}>
                  <CustomHeading
                    customStyles={{
                      fontFamily: "Raleway",
                      fontWeight: 600,
                      fontSize: { xs: 30, md: 40 },
                      color: "#000000",
                      textAlign: { xs: "center", md: "left" },
                    }}
                    text={"Our Vision"}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
                      lineHeight: "1.5",
                      color: "#555555",
                      textAlign: "justify",
                    }}
                  >
                    We envision a world where every artist, regardless of their
                    background, has the opportunity to share their music on the
                    biggest platforms. Our vision is to be the leading digital
                    music distributor globally, known for our innovative
                    approach, artist-first policies, and dedication to fostering
                    musical talent. We aim to break down barriers and create a
                    thriving ecosystem where artists can achieve their full
                    potential.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={7}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    component="video"
                    width="100%"
                    height="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="https://delivertune.s3.ap-south-1.amazonaws.com/videos/Vision1.mp4"
                    sx={{
                      maxWidth: "500px",
                      maxHeight: "400px",
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    source
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: { xs: 4, sm: 7 },
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={7}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <video
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "500px",
                    }}
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="https://delivertune.s3.ap-south-1.amazonaws.com/videos/Vision1.mp4"
                  >
                    source
                  </video>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <CustomHeading
                    customStyles={{
                      textAlign: "right",
                    }}
                    text={" Our Vision"}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
                      lineHeight: "1.5",
                      color: "#555555",
                      textAlign: { xs: "justify", md: "right" },
                    }}
                  >
                    We envision a world where every artist, regardless of their
                    background, has the opportunity to share their music on the
                    biggest platforms. Our vision is to be the leading digital
                    music distributor globally, known for our innovative
                    approach, artist-first policies, and dedication to fostering
                    musical talent. We aim to break down barriers and create a
                    thriving ecosystem where artists can achieve their full
                    potential.
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
      <DistributeNow />
      <Footer />
    </>
  );
}

export default About;
