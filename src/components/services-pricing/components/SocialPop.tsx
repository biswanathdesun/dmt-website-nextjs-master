import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';

const ContentCreation = () => (
    <Box>
        <Typography variant="h6">1. Content Creation and Posting:</Typography>
        <List>
            <ListItem>
                <ListItemText secondary="• Creation and scheduling of 10 Reels on Instagram, showcasing engaging and captivating content to attract and retain followers." />
            </ListItem>
            <ListItem>
                <ListItemText secondary="• Design and posting of 5 Photo Posts on Instagram and Facebook, with professional editing to maintain a cohesive and visually appealing feed." />
            </ListItem>
        </List>
    </Box>
);

const YouTubeManagement = () => (
    <Box>
        <Typography variant="h6">2. YouTube Management:</Typography>
        <List>
            <ListItem>
                <ListItemText secondary="• Uploading and optimization of 10 YouTube Shorts to leverage the platform's growing popularity and maximize viewership." />
            </ListItem>
            <ListItem>
                <ListItemText secondary="• Implementation of YouTube SEO strategies to enhance visibility and discoverability of your content." />
            </ListItem>
        </List>
    </Box>
);

const Portfolio = () => (
    <Box>
        <Typography variant="h6">3. Portfolio:</Typography>
        <List>
            <ListItem>
                <ListItemText secondary="• Provide premium portfolio templates, valued at INR 3999/-, at no additional cost to you." />
            </ListItem>
        </List>
    </Box>
);

const ProfileUpdates = () => (
    <Box>
        <Typography variant="h6">4. Profile Updates:</Typography>
        <List>
            <ListItem>
                <ListItemText secondary="• Ongoing updates to your Spotify and Apple Music Artist Profiles, ensuring that your music catalog is accurately represented and up-to-date." />
            </ListItem>
        </List>
    </Box>
);

const PlaylistUpdates = () => (
    <Box>
        <Typography variant="h6">5. Playlist Updates:</Typography>
        <List>
            <ListItem>
                <ListItemText secondary="• Playlist pitching to curators for increased exposure and streaming opportunities." />
            </ListItem>
        </List>
    </Box>
);



const SocialPop = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                    <ContentCreation />
                    <YouTubeManagement />
                    <Portfolio />
                    <ProfileUpdates />
                    <PlaylistUpdates />
                </Box>
            </Container>
        </>
    );
}

export default SocialPop;
