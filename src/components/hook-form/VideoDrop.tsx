"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import Image from "next/image";
// import videoPlaceholder from "/images/video-placeholder.png";

interface VideoDropProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setFiledata: React.Dispatch<React.SetStateAction<any>>;
  error: any;
  filedata: File | any;
  saveVideo: File | Blob | string | null;
  setSaveVideo: React.Dispatch<React.SetStateAction<any>>;
  instruction?: string;
  buttonText?: string;
  height?: string;
  acceptedFileTypes: { [key: string]: string[] };
  backgroundColor?: string;
  fontColor?: string;
  buttonBgColor?: string;
  minsize?: number;
  loading?: boolean;
}

const VideoDrop: React.FC<VideoDropProps> = ({
  formData,
  setFormData,
  setFiledata,
  error,
  filedata,
  saveVideo,
  setSaveVideo,
  instruction,
  buttonText,
  height,
  acceptedFileTypes,
  backgroundColor,
  fontColor,
  buttonBgColor,
  minsize,
  loading
}) => {
  const [video, setVideo] = useState<string | any>(null);
  const [videoName, setVideoName] = useState<string>();

  useEffect(() => {
    if (saveVideo) {
      const _URL = window.URL || window.webkitURL;
      if (saveVideo instanceof File || saveVideo instanceof Blob) {
        setVideo(_URL.createObjectURL(saveVideo));
      }
    }
  }, [saveVideo, setFiledata, setSaveVideo]);

  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: acceptedFileTypes,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const _URL = window.URL || window.webkitURL;

      if (file.type.startsWith("video/")) {
        const videoElement = document.createElement("video");
        videoElement.src = _URL.createObjectURL(file);
        videoElement.onloadedmetadata = function () {
          if (file) {
            setVideo(_URL.createObjectURL(file));
            setFiledata(file);
          } else {
            toast.error("Please upload a valid video file.", {
              position: "top-right"
            });
          }
          
        }

        setFormData({ ...formData, video: file });
      }
    }
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      toast.error("Please upload a valid video file.");
    }
  }, [fileRejections]);

  const extractFileName = (data: any) => {
    if (data?.name) {
      return data.name || "";
    } else if (typeof data === "string") {
      setVideo(data);
      return data.substring(data.lastIndexOf("/") + 1);
    }
    return "";
  };

  useEffect(() => {
    if (filedata) {
      const fileName = extractFileName(filedata);
      setVideoName(fileName);
    }
  }, [filedata]);

  const renderFilePreview = () => {
    if (video) {
      return (
        <video
          src={video}
          width={70}
          height={70}
          controls
          style={{ width: "20%", height: "auto" }}
        />
      );
    }
    return (
      <Image
        src="/images/arrow-upload.png"
        width={52}
        height={52}
        alt="Upload Icon"
      />
    );
  };

  return (
    <Box sx={{ mb: "15px" }}>
      <Box
        sx={{
          border: "2px dashed #cccccc",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: backgroundColor || "#F9FAFB",
          height: height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            {...getRootProps({ className: "drop" })}
            onClick={() => {
              open();
            }}
          >
            <input {...getInputProps()} />
            <Box my={1}>{renderFilePreview()}</Box>
            <Box sx={{ width: "auto", height: "auto", mb: "2px" }}>
              <aside>
                <ul style={{ fontSize: "14px", marginBottom: 10 }}>
                  {videoName || "No file selected"}
                </ul>
              </aside>
            </Box>
            {buttonText && (
              <Button
                size="small"
                type="button"
                sx={{
                  textTransform: "none",
                  color: "black",
                  border: "1px solid grey",
                  width: "180px",
                  backgroundColor: buttonBgColor || "#EEEDEC",
                  borderRadius: "25px",
                  "&:hover": {
                    backgroundColor: "#dcdcdc"
                  }
                }}
              >
                {buttonText}
              </Button>
            )}

            <Box sx={{ px: { lg: 1 } }}>
              <Typography fontSize={15} className="drop-video">
                Drag & Drop your Video here, or{" "}
                <Typography
                  component="span"
                  sx={{
                    color: fontColor || "#FB900B",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  browse
                </Typography>
              </Typography>
              <Typography
                fontSize={10}
                className="support"
                sx={{ color: fontColor || "grey" }}
              >
                {instruction}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VideoDrop;
