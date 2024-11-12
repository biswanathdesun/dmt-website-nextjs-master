import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'

interface objectiveProps {
    activeTab: number;
    handleBack: () => void;
    steps: { label: string; content: string }[];
    handleNext: () => void;
}

const Objective: React.FC<objectiveProps> = ({
    activeTab,
    handleBack,
    steps,
    handleNext,
}) => {

    const handleContinue = () => {
        handleNext();
    };

    return (
        <>
            <Container maxWidth="xl">
                <Typography gutterBottom sx={{
                    fontSize: {
                        sm: 20,
                        xs: 16
                    }
                }}>
                    Our Social Media Management service aims to elevate your online presence, amplify your visibility, and cultivate a robust digital persona within the music industry. Through strategic management of key platforms, tailored content creation, and proactive engagement, we endeavor to enhance your reach, connect you with your audience, and facilitate your growth as an artist.
                </Typography>
            </Container>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2, pb: 4 }}>
                <Button
                    color="inherit"
                    variant="contained"
                    disabled={activeTab === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                    type={steps[activeTab].content === "form" ? "submit" : "button"}
                    variant="contained"
                    sx={{ mr: 1, color: "white", backgroundColor: "black" }}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </Box>
        </>
    )
}

export default Objective
