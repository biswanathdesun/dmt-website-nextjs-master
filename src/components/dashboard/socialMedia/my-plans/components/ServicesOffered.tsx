import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
import Image from "next/image";
import { platformData } from "@components/common/JSONFolder/platformData";

const ContentCreation = () => (
  <Box>
    <Box>
      <Typography variant="h5" fontWeight={"bold"}>
        PlatformsCovered
      </Typography>
    </Box>
    <Box
      sx={{
        maxHeight: "55vh",
        overflowY: "auto",
        padding: 2,
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
        "&::-webkit-scrollbar-thumb": {
          background: "#fe8d0bc4",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": { background: "#FE8E0B" },
      }}
    >
      <Box
        rowGap={2}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
      >
        {platformData.map((item, index) => (
          <Card
            key={index}
            sx={{ boxShadow: 3, borderColor: "secondary", px: 1, width: 260 }}
          >
            <CardMedia
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 3,
              }}
            >
              <Image src={item.icon} alt={item.platform} width={200} />
            </CardMedia>
          </Card>
        ))}
      </Box>
    </Box>
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

interface servicesProps {
  activeTab: number;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
}

const ServicesOffered: React.FC<servicesProps> = ({
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <ContentCreation />
          <YouTubeManagement />
          <Portfolio />
          <ProfileUpdates />
          <PlaylistUpdates />
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

export default ServicesOffered;
