import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Signature from "@public/images/portfolio/Signature.png";
import ImageCard4 from "@public/images/portfolio/Imagecard4.png";
import Image from "next/image";
import MicIcon from "@mui/icons-material/Mic";
import React, { useState } from "react";
import AddHead from "@/components/creativeprofessionals-first/add/AddHead";

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

export default function CreativeProfessionalshead() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
    <Grid container sx={{ backgroundColor: "#141414" }}>
      <Grid item xs={12} md={6} sx={{ p: { xs: 2, md: 3 } }}>
        <Container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: { xs: 3, lg: 15 },
            display: "flex",
            flexDirection: "column",
            mx: "auto",
            textAlign: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "space-between" },
              mb: 2,
              width: "100%",
              gap: 2,
            }}
          >
            <Button
              sx={{
                ...buttonStyles,
                backgroundColor: "#5555",
                border: "none",
              }}
              startIcon={<MicIcon />}
            >
              Musician
            </Button>
            <Button
              size="small"
              sx={{ ...buttonStyles, backgroundColor: "#000", color: "#fff" }}
              onClick={handleOpenDialog}
            >
              +ADD
            </Button>
            <AddHead open={dialogOpen} onClose={handleCloseDialog} />
          </Box>
          <Typography
            variant="h2"
            color="whitesmoke"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "2rem",
                sm: "3.5rem",
                lg: "4rem",
                xl: "4.5rem",
              },
              p: { xs: 2, md: 0 },
            }}
          >
            Deliver My Tune
          </Typography>
          <Typography
            color="whitesmoke"
            sx={{
              fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
                md: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
              },
              maxWidth: {
                xs: "100%",
                sm: "90%",
              },
              p: { xs: 2, md: 0 },
              textAlign: {
                xs: "justify",
                md: "left",
              },
            }}
          >
            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
            Donec sollicitudin molestie malesuada. Sed porttitor lectus nibh.
            Curabitur aliquet quam id dui posuere blandit.
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
      <Grid item xs={0} md={1}></Grid>
      <Grid
        item
        xs={12}
        md={5}
        sx={{ p: { xs: 1, md: 2 }, display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            marginTop: { xs: 2, md: 6 },
            width: "100%",
            maxWidth: { xs: "100%", sm: "400px", md: "500px" },
            height: "auto",
          }}
        >
          <Image
            src={ImageCard4}
            alt="Imagecard4"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
