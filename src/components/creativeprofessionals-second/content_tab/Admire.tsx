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
import EditGallery from "../addSecond/EditGallery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img1 from "@public/images/Creativepro2/Admire/Img1.png";
import Img2 from "@public/images/Creativepro2/Admire/Img2.png";
import Img3 from "@public/images/Creativepro2/Admire/Img3.png";
import Img4 from "@public/images/Creativepro2/Admire/Img4.png";
import Img5 from "@public/images/Creativepro2/Admire/Img5.png";
import Img6 from "@public/images/Creativepro2/Admire/Img6.png";
import AddAdmire from "../addSecond/AddAdmire";

interface Photo {
  id: number;
  image: StaticImageData;
  title: string;
  description: string; // Correct type for image imported from Next.js
}

const photoData: Photo[] = [
  {
    id: 1,
    image: i1,
    title: "Cadillac Arena",
    description:
      "Lorem ipsum dolor sit ametolmero, consectetur adipiscing elit nequelomi, ipsum, dui nibh ut dolo risus et tristi.",
  },
  {
    id: 2,
    image: i2,
    title: "Cadillac Arena",
    description:
      "Lorem ipsum dolor sit ametolmero, consectetur adipiscing elit nequelomi, ipsum, dui nibh ut dolo risus et tristi.",
  },
  {
    id: 3,
    image: i3,
    title: "Cadillac Arena",
    description:
      "Lorem ipsum dolor sit ametolmero, consectetur adipiscing elit nequelomi, ipsum, dui nibh ut dolo risus et tristi.",
  },
  // Add more photos if needed
];

const Admire: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [dialogOpenAdmire, setDialogOpenAdmire] = useState(false);
  const [selectedAdmire, setSelectedAdmire] = useState({});

  const handleOpenAdmireDialog = () => {
    setDialogOpenAdmire(true);
    setSelectedAdmire({})
  };

  const handleCloseAdmireDialog = () => {
    setDialogOpenAdmire(false);
  };

  const handleOpenInheritAdmireDialog = (photo:any) => {
    setDialogOpenAdmire(true);
    setSelectedAdmire(photo)
  };

  const handleCloseInheritAdmireDialog = () => {
    setDialogOpenAdmire(false);
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

  const [formData, setFormData] = useState({
    text1: "",
    text2: "",
    text3: "",
    photo1: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log(formData);
    handleCloseInheritAdmireDialog();
  };

  const getPreviewUrl = (file: File | null) => {
    return file ? URL.createObjectURL(file) : "";
  };

  return (
    <Box sx={{ my: 5 }}>
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
            top: -163,
            left: -30,
            width: { xs: "330px", sm: "400px" },
            height: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Image src={Img1} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: { lg: 430, md: 380 },
            width: "120px",
            height: "auto",
            display: { xs: "none", md: "block" },
          }}
        >
          <Image src={Img2} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: { lg: -20, sm: 60 },
            right: { lg: 300, sm: 180 },
            width: "150px",
            height: "auto",
            display: { xs: "none", md: "block" },
          }}
        >
          <Image src={Img3} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: { lg: -50, sm: -50, xs: -70 },
            right: { lg: -15, sm: -16, xs: -16 },
            width: "250px",
            height: "auto",
            // display: { xs: "none", sm: "block" },
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
          mb: { xs: 2, sm: 5 },
          mt: { xs: 8, sm: 2 },
        }}
      >
        Artist I Admire
      </Typography>
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
        onClick={handleOpenAdmireDialog}
      >
        +ADD
      </Button>
      <AddAdmire open={dialogOpenAdmire} onClose={handleCloseAdmireDialog} view={selectedAdmire} />

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
                  borderRadius: 0,
                  border: "10px solid #fce23b",
                  transform: "rotate(-5deg)",
                  overflow: "hidden",
                  margin: "20px auto",
                  backgroundColor: "#fce23b",
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
                    transform: "rotate(5deg)",
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
                    backgroundColor: "#fce23b",
                    padding: "10px",
                    transform: "rotate(5deg)",
                    zIndex: 1,
                  }}
                >
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
            bottom: -62,
            left: -18,
            width: "250px",
            height: "auto",
          }}
        >
          <Image src={Img5} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: { sm: -62, lg: -62, md: -62 },
            right: { sm: -15, lg: -15, md: -15 },
            width: { xs: "250px", sm: "280px" },
            height: "auto",
            display: { xs: "none", sm: "block" },
            // zIndex: -1,
          }}
        >
          <Image src={Img6} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Admire;
