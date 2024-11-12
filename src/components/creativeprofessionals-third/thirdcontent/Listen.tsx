"use client";

import React, { useRef, useState, ChangeEvent } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Paper,
  Container,
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import Image, { StaticImageData } from "next/image";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import AddListen from '../addThird/AddListen';
// Replace these with your actual icon image paths
import IconImage1 from "@public/images/portfolio/ImgCd1.png";
import IconImage2 from "@public/images/portfolio/ImgCd2.png";
import IconImage3 from "@public/images/portfolio/ImgCd3.png";
import IconImage4 from "@public/images/portfolio/ImgCd4.png";
import UpLoadAudio from "../uploadthird/UpLoadAudio";
import RHFTextField from "@/components/hook-form/RHFTextField";

interface Song {
  serialNo: number;
  title: string;
  time: string;
  icon: StaticImageData;
}

interface FormInputs {
  title: string;
  singerName: string;
}

const IconWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  marginRight: theme.spacing(1),
  borderRadius: "50%", // Makes the icon rounded
  overflow: "hidden", // Ensures the icon fits within the rounded container
}));

const AudioWrapper = styled(Box)({
  backgroundColor: "#4dcab4",
  padding: "10px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "500px",
  margin: "auto",
  marginTop: "20px",
  flexDirection: "column",
});

const AudioElement = styled("audio")({
  width: "100%",
  "&::-webkit-media-controls-panel": {
    backgroundColor: "#4dcab4",
  },
  "&::-webkit-media-controls-play-button": {
    backgroundColor: "white",
    borderRadius: "50%",
  },
  "&::-webkit-media-controls-current-time-display, &::-webkit-media-controls-time-remaining-display":
    {
      color: "white",
    },
  "&::-webkit-media-controls-volume-slider": {
    backgroundColor: "white",
  },
  "&::-webkit-media-controls-mute-button": {
    backgroundColor: "white",
  },
});

const data: Song[] = [
  { serialNo: 1, title: "Example Title 1", time: "01:03", icon: IconImage1 },
  { serialNo: 2, title: "Example Title 2", time: "01:30", icon: IconImage2 },
  { serialNo: 3, title: "Example Title 3", time: "03:45", icon: IconImage3 },
  { serialNo: 4, title: "Example Title 4", time: "03:45", icon: IconImage4 },
];

const CustomAudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  return (
    <AudioWrapper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 1,
        borderRadius: "25px",
      }}
    >
      <AudioElement ref={audioRef} controls>
        <source src="/path/to/your/audio/file.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </AudioElement>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => skipTime(-10)}>
          <FastRewindIcon style={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={() => skipTime(-5)}>
          <SkipPreviousIcon style={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={() => skipTime(5)}>
          <SkipNextIcon style={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={() => skipTime(10)}>
          <FastForwardIcon style={{ color: "white" }} />
        </IconButton>
      </Box>
    </AudioWrapper>
  );
};

export default function Liten() {
  const [openSongDialog, setOpenSongDialog] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const handleClickOpenSongDialog = (song: Song) => {
    setSelectedSong(song);
    setOpenSongDialog(true);
  };

  const handleCloseSongDialog = () => {
    setOpenSongDialog(false);
  };


  return (
    <>
      <Typography
        sx={{
          textTransform: "uppercase",
          fontFamily: "monoton",
          fontSize: { sm: "4rem" },
          color: "black",
          textAlign: "center",
        }}
      >
        listen
      </Typography>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            overflowX: "auto",
            marginY: 5,
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.serialNo}>
                    <TableCell>{row.serialNo}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconWrapper>
                          <Image
                            src={row.icon}
                            alt="icon"
                            width={24}
                            height={24}
                          />
                        </IconWrapper>
                        <Typography variant="body2">{row.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleClickOpenSongDialog(row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <CustomAudioPlayer />
        <AddListen open={openSongDialog} onClose={handleCloseSongDialog}  view={selectedSong ?? null}/>

     
    </>
  );
}
