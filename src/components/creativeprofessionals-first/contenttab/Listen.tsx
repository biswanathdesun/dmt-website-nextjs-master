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
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { MusicNote, UploadFile } from "@mui/icons-material";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image, { StaticImageData } from "next/image";
import imgCd1 from "/public/images/portfolio/ImgCd1.png";
import imgCd2 from "/public/images/portfolio/ImgCd2.png";
import imgCd3 from "/public/images/portfolio/ImgCd3.png";
import imgCd4 from "/public/images/portfolio/ImgCd4.png";
import AddListen from "../add/AddListen";
import UpLoadAudio from "../upload/UpLoadAudio";

// Dynamically import Slider to avoid SSR issues
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
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Listen: React.FC = () => {
  const [dialogOpenListen, setDialogOpenListen] = useState<boolean>(false);
  const [selectedSong,setSelectedSong]=useState<object>();
  const handleClickOpenSongDialog = (song: Song) => {
    setSelectedSong(song);
    setDialogOpenListen(true);
  };
  const handleDialogOpenListen = () => {
    setSelectedSong({});   // required
    setDialogOpenListen(true);
  };

  const handleCloseListen = () => {
    setDialogOpenListen(false);
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
        Listen
        <Button
          size="small"
          sx={{
            ...buttonStyles,
            backgroundColor: "#000",
            color: "#fff",
            marginLeft: { xs: 2, sm: 4 },
          }}
          onClick={handleDialogOpenListen}
        >
          +ADD
        </Button>
        <AddListen open={dialogOpenListen} onClose={handleCloseListen}  view={selectedSong ?? null}/>
      </Typography>

      <Container
        sx={{
          p: 2,
          // display: "flex",
          // flexDirection:"row",
          // justifyContent: "center",
          // alignItems: "center",
          textAlign: "center",
        }}
      >
        <Slider {...settings} className="custom-slider">
          {songData.map((song) => (
            <Card
              key={song.id}
              sx={{
                maxWidth: "240px",
                backgroundColor: "#383838",
                borderRadius: 4,
                textAlign: "center",
              }}
            >
              <Box sx={{ p: 3, position: "relative" }}>
                <CardMedia>
                  <Image
                    src={song.image}
                    alt={song.songName}
                    width={195}
                    height={200}
                    style={{ objectFit: "cover" }}
                  />
                </CardMedia>
                <IconButton
                  onClick={() => handleClickOpenSongDialog(song)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "white",
                    border: "2px solid white",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
              <CardContent>
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
              <CardActions>
                <audio
                  controls
                  style={{
                    width: "100%",
                    marginLeft: 5,
                    padding: "3px",
                    paddingBottom: "10px",
                    opacity: 0.5,
                  }}
                >
                  <source src={song.audio} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </CardActions>
            </Card>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Listen;
