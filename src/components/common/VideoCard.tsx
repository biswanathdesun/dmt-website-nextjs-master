import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Modal,
  Fade,
  Backdrop,
  CardMedia,
  Dialog,
  Divider,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReactPlayer from "react-player";

interface VideoCardItem {
  url: string | undefined;
  name: string;
  description: string;
  video: string;
}
interface VideoCardProps {
  items: VideoCardItem[];
}

const VideoCard: React.FC<VideoCardProps> = ({ items }) => {
  const urlItems = items[0];
  const [open, setOpen] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState("");

  const handleOpen = (item: any) => {
    setOpen(true);
    setSelectedVideo(item.url);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      gap={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 3,
        position: "relative",
      }}
    >
      {items.map((item: any, index) => (
        <Card
          className="video-container"
          key={index}
          sx={{
            maxWidth: 300,
            borderRadius: 5,
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#F9F9F9",
            overflow: "hidden",
          }}
        >
          <CardMedia>
            <iframe
              width="290"
              src={`${item.url}?autoplay=0&controls=0&showinfo=0&rel=0`}
              frameBorder="0"
              allow="accelerometer;  gyroscope;"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ pointerEvents: "none" }} // Prevent interaction with the iframe
            ></iframe>

            <div className="play-button">
              <PlayArrowIcon
                style={{ fontSize: 48, color: "white" }}
                onClick={() => handleOpen(item)}
              />
            </div>
          </CardMedia>
          <Divider />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
              }}
            >
              <Tooltip title={item.description} placement="right">
               {item.description}
              </Tooltip>
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            // timeout: 500,
            sx: {
              bgcolor: "rgba(0, 0, 0, 0.6)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#000",
              border: "2px solid #000",
              boxShadow: 24,
              width: {
                xs: 300,
                sm: 500,
                md: 710,
              },
            }}
          >
            <ReactPlayer
              url={selectedVideo}
              playing
              controls={true}
              width="100%"
              height="400px"
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default VideoCard;
