"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface IndexProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setFiledata: React.Dispatch<React.SetStateAction<any>>;
  career?: { cover?: string };
  error: any;
  filedata: File | any;
  firstslidedata: { cover?: string };
  saveImage: File | Blob | string | null;
  setSaveimage: React.Dispatch<React.SetStateAction<any>>;
  instruction?: string;
  buttonText?: string;
  height?: string;
  acceptedFileTypes: { [key: string]: string[] };
  backgroundColor?: string;
  fontColor?: string;
  buttonBgColor?: string;
  src?: string;
  minsize?: number;
  loading?: boolean;
  uploadType?: string;
}
interface FileData {
  name?: string;
}

const ImageDrop: React.FC<IndexProps> = ({
  formData,
  setFormData,
  setFiledata,
  career,
  error,
  filedata,
  firstslidedata,
  saveImage,
  setSaveimage,
  instruction,
  buttonText,
  height,
  acceptedFileTypes,
  backgroundColor,
  fontColor,
  buttonBgColor,
  src,
  minsize,
  loading,
  uploadType,
}) => {
  const [files, setFiles] = useState<string | any>(
    career?.cover || firstslidedata?.cover || null
  );

  const [filesName, setFilesName] = useState<string>();

  useEffect(() => {
    if (saveImage) {
      const _URL = window.URL || window.webkitURL;
      if (saveImage instanceof File || saveImage instanceof Blob) {
        const image = new window.Image();
        image.src = _URL.createObjectURL(saveImage);
        image.onload = function () {
          if (image.naturalWidth >= 3000 && image.naturalHeight >= 3000) {
            setFiles(_URL.createObjectURL(saveImage));
          }
        };
      }
    }
  }, [saveImage, setFiledata, setSaveimage]);

  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: acceptedFileTypes,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const _URL = window.URL || window.webkitURL;

      if (file.type.startsWith("image/")) {
        const image = new window.Image();
        image.src = _URL.createObjectURL(file);
        image.onload = function () {
          console.log(
            "Image dimensions:",
            image.naturalWidth,
            image.naturalHeight
          );
          if (minsize) {
            if (
              image.naturalWidth >= minsize &&
              image.naturalHeight >= minsize
            ) {
              setFiles(_URL.createObjectURL(file));
              setFiledata(file);
            } else {
              toast.error(
                "Please upload an image of 3000x3000 pixels or larger.",
                {
                  position: "top-right",
                }
              );
            }
          } else {
            setFiles(_URL.createObjectURL(file));
            setFiledata(file);
          }
        };
      } else if (file.type.startsWith("audio/")) {
        setFiles("/images/music.png");
        setFiledata(file);
      } else {
        setFiles(_URL.createObjectURL(file));
        setFiledata(file);
      }

      setFormData({ ...formData, artwork: files });
    },
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      toast.error("Please upload a JPEG or PNG file.");
    }
  }, [fileRejections]);

  // Helper function to extract the file name
  const extractFileName = (data: any) => {
    if (data?.name) {
      return data.name || "";
    } else if (typeof data === "string") {
      if (data?.split(".").pop() === "wav") {
        setFiles("/images/music.png");
      } else {
        console.log("filedata", filedata);
        setFiles(data);
      }
      return data.substring(data.lastIndexOf("/") + 1);
    }
    return "";
  };

  useEffect(() => {
    if (filedata) {
      const fileName = extractFileName(filedata);
      setFilesName(fileName);
    }
  }, [filedata]);

  const renderFilePreview = () => {
    if (files) {
      return (
        <Image
          src={files}
          width={70}
          height={70}
          alt="Uploaded Image"
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
                  {filesName || "No file selected"}
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
              <Typography fontSize={15} className="drop-song">
                {`Drag & Drop your ${uploadType ?? 'Audio'} here, or `}
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

export default ImageDrop;
