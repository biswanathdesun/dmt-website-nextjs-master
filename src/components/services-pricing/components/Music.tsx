"use client";
import React from "react";
import ParagraphText from "@components/common/Paragraph";
import { Box, Container, Grid, Typography } from "@mui/material";
import ButtonTabs from "./ButtonTabs";
import CustomHeading from "@/components/common/CustomHeading";

function Music() {
    return (
        <Box>
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingX: { xs: 0, sm: 6 },
                    marginY: { xs: 2, sm: 4, md: 6 },
                }}
            >
                <CustomHeading text="Music Distribution" />

            </Container>
            <Grid item xs={12} sx={{ px: { xs: "1rem", md: "90px" } }}>
                <Typography
                    // variant="body1"
                    sx={{
                        fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
                        color: "#555555",
                        marginTop: 4,
                        textAlign: { xs: "justify", sm: "center" },
                    }}
                >
                    Music distribution is the key to sharing your creations with a global
                    audience. At Deliver My Tune, we specialize in simplifying the
                    process, ensuring your music reaches all major streaming platforms
                    seamlessly. Our service is designed to provide artists with complete
                    control, fair royalties, and a hassle-free distribution experience.
                    Let us handle the technicalities while you focus on creating the music
                    you love.
                </Typography>
            </Grid>
            <Container
                maxWidth="xl"
                sx={{
                    py: 10,
                }}
            >
                <ButtonTabs />
            </Container>
        </Box>
    );
}

export default Music;
