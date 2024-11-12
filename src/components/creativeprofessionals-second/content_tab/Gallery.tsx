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
import EditGallery from "../addSecond/EditGallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Import Lightbox styles
import Im1 from "@public/images/Creativepro2/gallery/BorderImage.png";
import Im2 from "@public/images/Creativepro2/gallery/Im2.png";
import Im3 from "@public/images/Creativepro2/gallery/Im3.png";
import Im4 from "@public/images/Creativepro2/gallery/Im4.png";
import Img1 from "@public/images/Creativepro2/I1.png";

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
            top: -100,
            left: -30,
            width: { xs: "330px", sm: "500px" },
            height: "auto",
          }}
        >
          <Image src={Im1} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: { lg: 430, md: 380 },
            width: "100px",
            height: "auto",
            display: { xs: "none", md: "block" },
          }}
        >
          <Image src={Im2} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            right: { lg: 500, md: 300, sm: 200 },
            width: "80px",
            height: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Image src={Img1} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: { lg: -30, sm: -70 },
            right: 0,
            width: "170px",
            height: "auto",
            display: { xs: "none", md: "block" },
          }}
        >
          <Image src={Im3} alt="" style={{ width: "100%", height: "auto" }} />
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
          color: "#00d8c0",
          WebkitTextStroke: {
            xs: "1px black",
            sm: "1.5px black",
          },
          fontStyle: "italic",
          transform: "scaleY(1.5)",
          mb: { xs: 2, sm: 5 },
          mt: { xs: 8, sm: 2 },
        }}
      >
        Gallery
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
            top: { sm: 857, lg: 503, md: 450, xs: 1505 },
            right: -15,
            width: { xs: "250px", sm: "280px" },
            height: "auto",
            // zIndex: -1,
          }}
        >
          <Image src={Im4} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
      <Container sx={{ mb: 10 }}>
        <Box>
          <Grid container spacing={2} rowSpacing={3}>
            {photoData.map((photo, index) => (
              <Grid item xs={12} sm={6} md={4} key={photo.id}>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 330, // Maximum width for larger screens
                    height: "auto", // Auto height to maintain aspect ratio
                    borderRadius: 0,
                    position: "relative",
                    cursor: "pointer",
                    border: "5px solid #ff599e",
                    transform: "rotate(5deg)",
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
                      "&:hover": {
                        background: "#00d8c0",
                      },
                      backgroundColor: "#00d8c0",
                      borderRadius: "25px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditGalleryDialog();
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
          view={{}}
          onClose={handleCloseEditGalleryDialog}
        />
      </Dialog>
    </Box>
  );
};

export default Gallery;
