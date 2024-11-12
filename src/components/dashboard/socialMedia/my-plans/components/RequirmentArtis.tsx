import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Link, Box, Button } from '@mui/material';

const SocialMediaAccess = () => (
    <List>
        <ListItem>
            <ListItemText
                secondary="• Provide ID and Password to your Instagram, Facebook, YouTube, Spotify, and Apple Music accounts to facilitate seamless management and posting or if any of the above platforms have the feature to add manager then add social@deliverymytune.com as manager to your account with full access."
            />
        </ListItem>
        <ListItem>
            <ListItemText
                secondary={
                    <>
                        • Facebook Guide to Assign Manager: <Link href="https://www.facebook.com/help/187316341316631" color="primary">https://www.facebook.com/help/187316341316631</Link>
                    </>
                }
            />
        </ListItem>
        <ListItem>
            <ListItemText
                secondary={
                    <>
                        • YouTube Guide to Assign Manager: <Link href="https://support.google.com/youtube/answer/9481328?hl=en&co=GENIE.Platform%3DAndroid" color="primary">https://support.google.com/youtube/answer/9481328?hl=en&co=GENIE.Platform%3DAndroid</Link>
                    </>
                }
            />
        </ListItem>
    </List>
);

const ContentForReels = () => (
    <List>
        <ListItem>
            <ListItemText secondary="• Supply minimum 20 rough videos for use in creating Reels on Instagram, showcasing your personality, talent, and behind-the-scenes moments to engage your audience." />
        </ListItem>
        <ListItem>
            <ListItemText secondary="• Videos should be in good quality and each video should be a minimum 2 minutes or the entire shoot clips cover 2 minutes duration." />
        </ListItem>
        <ListItem>
            <ListItemText secondary="• Videos can be behind the scenes, montage, etc." />
        </ListItem>
    </List>
);

const Photos = () => (
    <List>
        <ListItem>
            <ListItemText secondary="• Provide high-quality 20 photos for use in Photo Posts on Instagram and Facebook, ensuring visually appealing and professional-looking content that aligns with your brand image." />
        </ListItem>
        <ListItem>
            <ListItemText secondary="• To foster a deep connection with your fans, consider sharing photos that showcase regional attire and cultural elements. This approach can help your audience feel a more personal connection to your work." />
        </ListItem>
    </List>
);


interface requirementProps {
    activeTab: number;
    handleBack: () => void;
    steps: { label: string; content: string }[];
    handleNext: () => void;
}

const RequirmentArtis: React.FC<requirementProps> = ({
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
            <Container>
                <Typography variant="h6" >
                    1. Access to Social Media Channels:
                </Typography>
                <SocialMediaAccess />
                <Typography variant="h6" >
                    2. Content for Reels:
                </Typography>
                <ContentForReels />
                <Typography variant="h6" >
                    3. Photos:
                </Typography>
                <Photos />
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

export default RequirmentArtis;
