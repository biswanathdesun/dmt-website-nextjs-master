"use client";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Container,
  Grid,
  IconButton,
  Dialog,
  Button,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Image, { StaticImageData } from "next/image";
import i1 from "/public/images/portfolio/I1.png";
import i2 from "/public/images/portfolio/I2.png";
import i3 from "/public/images/portfolio/I3.png";
// import EditGallery from "../add2/EditGallery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarIcon from "@mui/icons-material/Star";
import AddAdmire from "../addThird/AddAdmire";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// import AddAdmire from "../add2/AddAdmire";

interface Photo {
  id: number;
  image: StaticImageData;
  icon: string;
  title: string;
  description: string; // Correct type for image imported from Next.js
}

const photoData: Photo[] = [
  {
    id: 1,
    image: i1,
    icon: "⭐⭐⭐",
    title: "Cadillac Arena",
    description:
      "Lorem ipsum dolor sit ametolmero, consectetur adipiscing elit nequelomi, ipsum, dui nibh ut dolo risus et tristi.",
  },
  {
    id: 2,
    image: i2,
    icon: "⭐⭐⭐⭐",
    title: "Cadillac Arena",
    description:
      "Lorem ipsum dolor sit ametolmero, consectetur adipiscing elit nequelomi, ipsum, dui nibh ut dolo risus et tristi.",
  },
  {
    id: 3,
    image: i3,
    icon: "⭐⭐⭐⭐⭐",
    title: "Cadillac Arena",
    description:
      "Lorem ipsum dolor sit ametolmero, consectetur adipiscing elit nequelomi, ipsum, dui nibh ut dolo risus et tristi.",
  },
  // Add more photos if needed
];

const Admire: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedAdmire, setSelectedAdmire] = useState({});

  const [dialogOpenAdmire, setDialogOpenAdmire] = useState(false);

  const   handleOpenInheritAdmireDialog= (photo:object) => {
    setDialogOpenAdmire(true);
    setSelectedAdmire(photo)
  };

  const handleCloseAdmireDialog = () => {
    setDialogOpenAdmire(false);
  };

  const handleOpenAdmireDialog = () => {
    setDialogOpenAdmire(true);
    setSelectedAdmire({})
  };

  const handleCloseInheritAdmireDialog = () => {
    setDialogOpenAdmire(false);
  };
  const [rating, setRating] = useState(0);

  const handleRating = (newRating: number) => {
    setRating(newRating);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <Box sx={{ my: 5 }}>
      <Typography
        paddingTop={5}
        variant="h1"
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
        Testimonial
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
          onClick={handleOpenAdmireDialog}
        >
          +ADD
        </Button>
        <AddAdmire open={dialogOpenAdmire} onClose={handleCloseAdmireDialog}  view={selectedAdmire}/>
      </Box>

      <Container sx={{ p: 2 }}>
        <Slider {...settings}>
          {photoData.map((photo, index) => (
            <Box
              key={photo.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 3,
                boxSizing: "border-box",
              }}
            >
              <Card
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 300,
                  borderRadius: 10,
                  border: "2px solid #4dcab4",
                  overflow: "hidden",
                  margin: "20px auto",
                }}
                onClick={() => {}}
              >
                <CardMedia
                  component="img"
                  alt={`Photo ${photo.id}`}
                  image={photo.image.src}
                  sx={{
                    width: "95%",
                    height: "auto",
                    p: 2,
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  size="medium"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "white",
                    border: "2px solid white",
                    "&:hover": {
                      background: "#00d8c0",
                    },
                    backgroundColor: "#00d8c0",
                    borderRadius: "25px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenInheritAdmireDialog(photo);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <Box
                  sx={{
                    position: "relative",
                    bottom: 0,
                    width: "100%",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#00d8c0" }}>
                    {photo.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#00d8c0" }}>
                    {photo.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#000" }}>
                    {photo.description}
                  </Typography>
                </Box>
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Admire;
