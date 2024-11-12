"use client";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Container,
  IconButton,
  Dialog,
} from "@mui/material";
import { useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Image, { StaticImageData } from "next/image";
import i1 from "/public/images/portfolio/I1.png";
import i2 from "/public/images/portfolio/I2.png";
import i3 from "/public/images/portfolio/I3.png";
import i4 from "/public/images/portfolio/I4.png";
import i5 from "/public/images/portfolio/I5.png";
import i6 from "/public/images/portfolio/I6.png";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EditGallery from "../addThird/EditGallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Import Lightbox styles
import Slider from "react-slick";
import AutoPlay from "@/components/home/components/Slider";

interface Photo {
  id: number;
  image: StaticImageData; // Correct type for image imported from Next.js
}

const photoData: Photo[] = [
  { id: 1, image: i1 },
  { id: 2, image: i2 },
  { id: 3, image: i3 },
  { id: 4, image: i4 },
  { id: 5, image: i5 },
  { id: 6, image: i6 },
  // Add more photos if needed
];

const Gallery: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dialogOpenEditGallery, setDialogOpenEditGallery] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const setRef = (index: number) => (element: HTMLDivElement | null) => {
    sectionRefs.current[index] = element;
  };

  const handleOpenEditGalleryDialog = () => {
    setDialogOpenEditGallery(true);
  };

  const handleCloseEditGalleryDialog = () => {
    setDialogOpenEditGallery(false);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1300,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
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
       Gallery
      </Typography>
      <Box sx={{ my:5}}>
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
                  width: "100%",
                  maxWidth: 400, // Maximum width for larger screens
                  height: "auto", // Auto height to maintain aspect ratio
                  borderRadius: "10px",
                  position: "relative",
                  cursor: "pointer",
                  margin: "auto",
                }}
                onClick={() => openLightbox(index)}
              >
                <CardMedia
                  component="img"
                  alt={`Photo ${photo.id}`}
                  image={photo.image.src}
                  sx={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
                <IconButton
                  size="medium"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "white",
                    border: "2px solid white",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditGalleryDialog();
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      {lightboxOpen && (
        <Lightbox
          mainSrc={photoData[currentImageIndex].image.src}
          nextSrc={
            photoData[(currentImageIndex + 1) % photoData.length].image.src
          }
          prevSrc={
            photoData[
              (currentImageIndex + photoData.length - 1) % photoData.length
            ].image.src
          }
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() =>
            setCurrentImageIndex(
              (currentImageIndex + photoData.length - 1) % photoData.length
            )
          }
          onMoveNextRequest={() =>
            setCurrentImageIndex((currentImageIndex + 1) % photoData.length)
          }
        />
      )}

      <Dialog
        open={dialogOpenEditGallery}
        onClose={handleCloseEditGalleryDialog}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: {
              xs: "100%",
              sm: "100%",
              md: "80%",
              lg: "70%",
              xl: "40%",
            },
          },
        }}
      >
        <EditGallery
          open={dialogOpenEditGallery}
          onClose={handleCloseEditGalleryDialog}
          view={{}}
        />
      </Dialog>
    </Box>
  );
};

export default Gallery;
