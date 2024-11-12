import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';

interface expectProps {
    activeTab: number;
    handleBack: () => void;
    steps: { label: string; content: string }[];
    handleNext: () => void;
}

const ExpertYou: React.FC<expectProps> = ({
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
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom>
                    Here’s what you’ll get with our Social Media Management Services:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="1. Handle Your Social Media :"
                            secondary="We take care of your Instagram, Facebook, YouTube, and music profiles on Spotify and Apple Music and keep your fans connected with the latest trends."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="2. Create Cool Content :"
                            secondary="Expect 10 Instagram Reels and 5 photo posts every month that will catch people's eyes and help you get more followers."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="3. Optimise Your YouTube Channel :"
                            secondary="We’ll post YouTube Shorts and use smart tricks to get more people to watch your videos."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="4. Make Your Portfolio Look Great :"
                            secondary="You’ll get top-notch portfolio templates for free to show off your work professionally."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="5. Keep Your Profiles Fresh :"
                            secondary="We’ll keep your Spotify and Apple Music profiles updated so your fans always see the latest from you."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="6. Get Your Music Heard :"
                            secondary="We’ll help your music get onto more playlists, giving you a better chance to get more streams."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="7. Do not rely on 1 hit song, make a brand of yourself."
                        />
                    </ListItem>
                </List>
                <Box mt={3}>
                    <Typography variant="body1">
                        By joining our services, you’ll see your online fan base grow, and more people will listen to and talk about your music. We ask for a commitment of at least three months, so we have enough time to show you good results.
                    </Typography>
                </Box>
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
    );
};

export default ExpertYou;
