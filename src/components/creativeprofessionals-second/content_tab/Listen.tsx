"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Container,
  IconButton,
  Grid,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {  useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image, { StaticImageData } from "next/image";
import imgCd1 from "/public/images/portfolio/ImgCd1.png";
import imgCd2 from "/public/images/portfolio/ImgCd2.png";
import imgCd3 from "/public/images/portfolio/ImgCd3.png";
import imgCd4 from "/public/images/portfolio/ImgCd4.png";
import Img4 from "@public/images/Creativepro2/listen/Img4.png";
import Img3 from "@public/images/Creativepro2/listen/Img3.png";
import Img2 from "@public/images/Creativepro2/listen/Img2.png";
import Img5 from "@public/images/Creativepro2/listen/Img5.png";
import Img6 from "@public/images/Creativepro2/listen/Img6.png";
import Im2 from "@public/images/Creativepro2/listen/Im2.png";

import AddListen from "../addSecond/AddListen";
import Img1 from "@public/images/Creativepro2/listen/Img1.png";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface Song {
  id: number;
  image: StaticImageData;
  songName: string;
  singerName: string;
  audio: string;
}

interface FormInputs {
  title: string;
  singerName: string;
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

const songData: Song[] = [
  {
    id: 1,
    image: imgCd1,
    songName: "Song One",
    singerName: "Singer One",
    audio: "/static/audio/song4.mp3",
  },
  {
    id: 2,
    image: imgCd2,
    songName: "Song Two",
    singerName: "Singer Two",
    audio: "/static/audio/song4.mp3",
  },
  {
    id: 3,
    image: imgCd3,
    songName: "Song Three",
    singerName: "Singer Three",
    audio: "/static/audio/song4.mp3",
  },
  {
    id: 4,
    image: imgCd4,
    songName: "Song Four",
    singerName: "Singer Four",
    audio: "/static/audio/song4.mp3",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Listen: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState({});
  const [dialogOpenListen, setDialogOpenListen] = useState<boolean>(false);
  const handleClickOpenSongDialog = (song: Song) => {
    setSelectedSong(song);
    setDialogOpenListen(true);
  };

  const handleDialogOpenListen = () => {
    setDialogOpenListen(true);
    setSelectedSong({});

  };
  const handleCloseListen = () => {
    setDialogOpenListen(false);
  };

 
  const getPreviewUrl = (file: File | null) => {
    return file ? URL.createObjectURL(file) : "";
  };

  return (
    <Box sx={{ height: { lg: "80vh", md: "74vh", xs: "105vh", sm: "72vh" } }}>
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
            top: { lg: -40, md: -40, sm: -35 },
            right: { lg: -30, sm: -20, xs: -20 },
            width: "200px",
            height: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Image src={Img4} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: { lg: 130, sm: 10, md: 80 },
            width: "130px",
            height: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Image src={Img3} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: { xs: -155, sm: -105 },
            left: { sm: "-2%", xs: "-6% ", lg: "-2%" },
            // transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "220px",
            ml: 0,
            height: "auto",
          }}
        >
          <Image src={Im2} alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
      <Typography
        gutterBottom
        variant="h2"
        color="white"
        sx={{
          display: "flex",
          justifyContent: "center",
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
        Listen Muisc
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
            top: { lg: -80, sm: -70, xs: -150 },
            right: { lg: 350, md: 250, sm: 150, xs: 0 },
            width: "60px",
            height: "auto",
          }}
        >
          <Image src={Img1} alt="" style={{ width: "100%", height: "auto" }} />
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
          left: { md: 460, xs: 130, sm: 330, lg: 700 },

          "&:hover": {
            background: "#00d8c0",
          },
        }}
        onClick={handleDialogOpenListen}
      >
        +ADD
      </Button>
      <AddListen open={dialogOpenListen} onClose={handleCloseListen} view={selectedSong}/>

      <Container
        sx={{
          p: 1,
          textAlign: "center",
          overflow: "visible",
        }}
      >
        <Box className="custom-slider" sx={{ overflow: "visible" }}>
          <Slider {...settings}>
            {songData.map((song) => (
              <Card
                key={song.id}
                sx={{
                  maxWidth: { sm: "400px", xs: "190px" },
                  backgroundColor: "#fce23b",
                  borderRadius: 0,
                  textAlign: "left ",
                  transform: "rotate(5deg)",
                  overflow: "visible",
                  m: 4,
                  transformOrigin: "center",
                }}
              >
                <Box sx={{ p: 1, position: "relative" }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <CardMedia>
                        <Image
                          src={song.image}
                          alt={song.songName}
                          width={100}
                          height={100}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "auto",
                          }}
                        />
                      </CardMedia>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <IconButton
                        onClick={() => handleClickOpenSongDialog(song)}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "#00d8c0",
                          color: "#fff",
                          borderRadius: "20px",
                          "&:hover": {
                            bgcolor: "#00d8c0",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <CardContent
                        sx={{
                          padding: 0,
                          ml: 2,
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          color="white"
                        >
                          {song.songName}
                        </Typography>
                        <Typography variant="body2" color="white">
                          {song.singerName}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ padding: 0 }}>
                        <audio
                          controls
                          style={{
                            width: "100%",
                            marginLeft: 5,
                            padding: "3px",
                            paddingBottom: "10px",
                            opacity: 0.9,
                          }}
                        >
                          <source src={song.audio} type="audio/mp3" />
                          Your browser does not support the audio element.
                        </audio>
                      </CardActions>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            ))}
          </Slider>
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
              top: { lg: 100, xs: 10 },
              right: { sm: 450, xs: 100 },
              width: "150px",
              height: "auto",
            }}
          >
            <Image
              src={Img5}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: { sm: -5, lg: 120 },
              right: { xs: -50, lg: -180 },
              width: "170px",
              height: "auto",
              display: { sm: "block", xs: "none" },
            }}
          >
            <Image
              src={Img6}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Box>
      </Container>

     
    </Box>
  );
};

export default Listen;
