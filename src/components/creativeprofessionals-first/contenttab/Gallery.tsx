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
import EditGallery from "../add/EditGallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Import Lightbox styles

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
  const [selectedImage,setSelectedImage]=useState<string>("")
  const setRef = (index: number) => (element: HTMLDivElement | null) => {
    sectionRefs.current[index] = element;
  };

  const handleOpenEditGalleryDialog = (img:string) => {
    setSelectedImage(img)
    setDialogOpenEditGallery(true);
  };

  const handleCloseEditGalleryDialog = () => {
    setDialogOpenEditGallery(false);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Box ref={setRef(3)} sx={{ py: 4, px: 2, backgroundColor: "#120909" }}>
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
        Gallery
      </Typography>
      <Container sx={{ mb: 10 }}>
        <Box>
          <Grid container spacing={2} rowSpacing={3}>
            {photoData.map((photo, index) => (
              <Grid item xs={12} sm={6} md={4} key={photo.id}>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 350, // Maximum width for larger screens
                    height: "auto", // Auto height to maintain aspect ratio
                    borderRadius: "10px",
                    position: "relative",
                    cursor: "pointer",
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
                      handleOpenEditGalleryDialog(photo.image.src);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

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
          view={selectedImage}
        />
      </Dialog>
    </Box>
  );
};

export default Gallery;
