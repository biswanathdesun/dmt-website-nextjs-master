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
import AddYouTube from "@/components/creativeprofessionals-second/addSecond/AddYouTube";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Img1 from "@public/images/Creativepro2/video/Img1.png";
import Img3 from "@public/images/Creativepro2/video/Img3.png";
import Img4 from "@public/images/Creativepro2/video/Img4.png";
import Img5 from "@public/images/Creativepro2/video/Img5.png";
import Img6 from "@public/images/Creativepro2/video/Img6.png";

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

  const handleClickOpen = (video: Video) => {
    setSelectedVideo(video);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenYouTubeDialog = () => {
    setOpen(true);
  };

  const handleCloseYouTubeDialog = () => {
    setOpen(false);
    setSelectedVideo(null);

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
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { lg: -80, sm: -70, xs: -150 },
            left: { lg: -30, md: -25, sm: -20, xs: 0 },
            width: "200px",
            height: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Image src={Img1} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { sm: -100, xs: -60 },
            right: { xs: -8 },
            width: { md: "250px", xs: "350px" },
            height: "auto",
          }}
        >
          <Image src={Img4} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
      <Typography
        gutterBottom
        variant="h2"
        color="white"
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontSize: {
            xs: "2.5rem",
            md: "3rem",
          },
          fontWeight: "bold",
          color: "#fce23b",
          WebkitTextStroke: {
            xs: "1px black",
            sm: "1.5px black",
          },
          fontStyle: "italic",
          transform: "scaleY(1.5)",
          mb: { xs: 2, sm: 1 },
          mt: { xs: 8, sm: 2 },
        }}
      >
        Latest Videos
      </Typography>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: { lg: -20, sm: -70, xs: -150 },
            right: { lg: 250, md: 150, sm: 150, xs: 0 },
            width: "120px",
            height: "auto",
            display: { xs: "none", lg: "block" },
          }}
        >
          <Image src={Img3} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
      <Button
        size="small"
        sx={{
          backgroundColor: "#00d8c0",
          color: "#fff",
          border: "2px solid #fff",
          borderRadius: "25px",
          marginY: 2,
          left: { md: 460, xs: 130, sm: 330, lg: 720 },

          "&:hover": {
            background: "#00d8c0",
          },
        }}
        onClick={handleOpenYouTubeDialog}
      >
        +ADD
      </Button>

      <AddYouTube open={open} onClose={handleCloseYouTubeDialog} view={selectedVideo} />

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
                  maxWidth: "250px", // Ensure cards don't exceed a maximum width
                  backgroundColor: "#000",
                  borderRadius: 0,
                  height: "300px",
                  overflow: "hidden",
                  position: "relative",
                  transform: "rotate(5deg)",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 300,
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
                  <IconButton
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
                  </IconButton>
                </Box>
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: { sm: 105, xs: 110 },
            width: "150px",
            height: "auto",
            zIndex: 2,
          }}
        >
          <Image src={Img5} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: { lg: -10, sm: -5 },
            right: { lg: 50, md: 40, sm: 30, xs: 0 },
            width: "150px",
            height: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Image src={Img6} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
      
    </Box>
  );
};

export default YouTube;
