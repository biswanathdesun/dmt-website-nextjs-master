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
// import AddYouTube from "@components/creativeprofessionals-II/add2/AddYouTube";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import AddYouTube from "../addThird/AddYouTube";

// Dynamically import Slider to avoid SSR issues
const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface Video {
  id: number;
  videoUrl: string;
  videoTitle: string;
}

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
  const [open, setOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [dialogOpenYouTube, setDialogOpenYouTube] = useState(false);

  const handleClickOpen = (video: Video) => {
    setSelectedVideo(video);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenYouTubeDialog = () => {
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
    <Box sx={{ my: 10 }}>
      <Typography
        gutterBottom
        variant="h2"
        color="white"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: {
            xs: "2.5rem",
            sm: "3rem",
            md: "4rem",
          },
          color: "#000",
          fontFamily: "monoton",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Our concert
      </Typography>

      <Box sx={{ textAlign: "center" }}>
        <Button
          size="small"
          sx={{
            backgroundColor: "#00d8c0",
            color: "#fff",
            border: "1px solid #000",
            borderRadius: "25px",
            marginY: 2,

            "&:hover": {
              background: "#00d8c0",
            },
          }}
          onClick={handleOpenYouTubeDialog}
        >
          +ADD
        </Button>
        <AddYouTube
          open={dialogOpenYouTube}
          onClose={handleCloseYouTubeDialog}
          view={null}
        />
      </Box>

      <Container sx={{ p: 2 }}>
        <Slider {...settings}>
          {videoData.map((video) => (
            <Box
              key={video.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 3,
                boxSizing: "border-box",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: "500px", // Ensure cards don't exceed a maximum width
                  backgroundColor: "#000",
                  borderRadius: 5,
                  height: "200px",
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
                  {/* <IconButton
                    onClick={() => handleClickOpen(video)}
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      color: "white",
                      border: "2px solid white",
                      "&:hover": {
                        background: "#00d8c0",
                      },
                      backgroundColor: "#00d8c0",
                      borderRadius: "25px",
                    }}
                  >
                    <EditIcon />
                  </IconButton> */}
                </Box>
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default YouTube;
