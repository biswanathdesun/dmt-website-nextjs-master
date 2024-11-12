import { Box, Button, Typography, Stack, Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import HeadImage from "@public/images/CrtveProf_III/HeadImage.png";
import Listen from "./thirdcontent/Listen";
import Event from "./thirdcontent/Event";
import YouTube from "./thirdcontent/Youtube";
import About from "./thirdcontent/About";
import Gallery from "./thirdcontent/Gallery";
import Admire from "./thirdcontent/Admire";
import ContactForm from "./thirdcontent/ContactForm";

export default function CreativeProfessionalsIII() {
  const [selectedButton, setSelectedButton] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedButton(newValue);
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
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          width: "100%",
          height: "100%", // Adjust height based on screen size
          background: `url(${HeadImage.src}) 0% 0% / 100% 100% no-repeat`,
        }}
      >
        <Grid
          container
          gap={2}
          sx={{
            width: { sm: "70%", xs: "80%", lg: "50%" },
            textAlign: "center",
            marginY: "150px",
          }}
        >
          <Grid item xs={12}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontFamily: "monoton",
                fontSize: { xs: "2.5rem", sm: "4.7rem" },
                color: "white",
              }}
            >
              Deliver my tune
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                textAlign: { sm: "center", xs: "justify" },
                fontSize: { sm: "1.2rem" },
                fontFamily: "Montserrat",
                color: "white",
                pb: 2,
              }}
            >
              Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
              Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
              Donec sollicitudin molestie malesuada. Sed porttitor lectus nibh.
              Curabitur aliquet quam id dui posuere blandit.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                sx={{
                  width: { xs: "100%", md: "auto" },
                  flexGrow: 1,
                  p: 2,
                  borderRadius: "15px",
                  background: "#4dcab4",
                  color: "white",
                  "&:hover": {
                    background: "#4dcab4",
                    color: "white",
                  },
                }}
                onClick={(event) => handleChange(event, 0)} // Set index for Listen section
              >
                Listen
              </Button>
              <Button
                variant="outlined"
                sx={{
                  width: { xs: "100%", md: "auto" },
                  flexGrow: 1,
                  p: 2,
                  borderRadius: "15px",
                  border: "2px solid #4dcab4",
                  color: "#4dcab4",
                  "&:hover": {
                    border: "2px solid #4dcab4",
                  },
                }}
                onClick={(event) => handleChange(event, 1)} // Set index for Contact Form section
              >
                Contact Me
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 5, overflow: "hidden" }} ref={setRef(0)}>
        <Listen />
      </Box>
      <Box sx={{ background: "#4dcab4", my: 5, overflow: "hidden" }}>
        <Event />
      </Box>
      <Box sx={{ my: 5, overflow: "hidden" }}>
        <YouTube />
      </Box>
      <Box sx={{ background: "#cdfff6", my: 5, overflow: "hidden" }}>
        <About />
      </Box>
      <Box sx={{ my: 5, overflow: "hidden" }}>
        <Gallery />
      </Box>
      <Box sx={{ my: 5, overflow: "hidden" }}>
        <Admire />
      </Box>
      <Box sx={{ my: 5 }} ref={setRef(1)}>
        <ContactForm />
      </Box>
    </>
  );
}
