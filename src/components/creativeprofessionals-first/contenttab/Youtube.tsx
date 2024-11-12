"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Container,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import AddYouTube from "@/components/creativeprofessionals-first/add/AddYouTube";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dynamically import Slider to avoid SSR issues
const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface Video {
  id: number;
  videoUrl: string;
  videoTitle: string;
}

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

const videoData: Video[] = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube URL
    videoTitle: "Amazing Video",
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/embed/anotherVideoID", // Another example YouTube URL
    videoTitle: "Another Great Video",
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube URL
    videoTitle: "Amazing Video",
  },
];

const YouTube: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [dialogOpenYouTube, setDialogOpenYouTube] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleClickOpen = (video: Video) => {
    setSelectedVideo(video);
    setDialogOpenYouTube(true);
  };

  const handleOpenYouTubeDialog = () => {
    setSelectedVideo(null);
    setDialogOpenYouTube(true);
  };

  const handleCloseYouTubeDialog = () => {
    setDialogOpenYouTube(false);
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box>
      <Typography
        gutterBottom
        variant="h2"
        color="white"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: {
            xs: "2rem",
            sm: "3.5rem",
            lg: "4rem",
          },
        }}
      >
        YouTube Videos
        <Button
          size="small"
          sx={{
            ...buttonStyles,
            backgroundColor: "#000",
            color: "#fff",
            marginLeft: { xs: 2, sm: 4 },
          }}
          onClick={handleOpenYouTubeDialog}
        >
          +ADD
        </Button>
        <AddYouTube
          open={dialogOpenYouTube}
          onClose={handleCloseYouTubeDialog}
          view={selectedVideo}
        />
      </Typography>
      <Container sx={{ p: 2 }}>
        {" "}
        {/* Ensure there's padding around the slider */}
        <Slider {...settings}>
          {videoData.map((video) => (
            <Box
              key={video.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 1,
                boxSizing: "border-box",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: "400px", // Ensure cards don't exceed a maximum width
                  backgroundColor: "#000",
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 200,
                    width: "100%",
                  }}
                >
                  <iframe
                    src={video.videoUrl}
                    title={video.videoTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  ></iframe>
                </Box>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    color="white"
                    textAlign="center"
                  >
                    {video.videoTitle}
                  </Typography>
                  <IconButton
                    onClick={() => handleClickOpen(video)}
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      color: "white",
                      border: "2px solid white",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>
     
    </Box>
  );
};

export default YouTube;
