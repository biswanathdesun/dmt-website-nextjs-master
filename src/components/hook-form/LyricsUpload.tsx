import React, { useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface LyricsUploadProps {
  songLyrics: File | string | null;
  lyricsTitle: string | "";
  supportsText: string | "";
  setSongLyrics: React.Dispatch<React.SetStateAction<File | string | null>>;
  loading?: boolean;
  titleName?: string | "";
  instruction?: string | "";
}

const LyricsUpload: React.FC<LyricsUploadProps> = ({
  songLyrics,
  lyricsTitle,
  supportsText,
  setSongLyrics,
  loading,
  titleName,
  instruction
}) => {
  console.log(songLyrics, "songLyrics");
  const { getRootProps, getInputProps, open, acceptedFiles, fileRejections } =
    useDropzone({
      noClick: true,
      noKeyboard: true,
      accept: {
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/pdf": [".pdf"]
      },
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          setSongLyrics(file);
        }
      }
    });

  useEffect(() => {
    if (fileRejections.length > 0) {
      toast.error("Please upload a .docx or .pdf file", {
        position: "top-right"
      });
    }
  }, [fileRejections]);

  const renderFilePreview = () => {
    if (typeof songLyrics === "string") {
      return (
        <Typography
          component="a"
          href={songLyrics}
          target="_blank"
          rel="noopener noreferrer"
        >
          View uploaded file
        </Typography>
      );
    } else if (songLyrics) {
      if (songLyrics.type === "application/pdf") {
        return (
          <Image src="/images/PDF.png" width={70} height={70} alt="PDF Icon" />
        );
      } else if (
        songLyrics.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        return (
          <Image
            src="/images/docxx.webp"
            width={52}
            height={52}
            alt="DOCX Icon"
          />
        );
      }
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
    <Box sx={{ mb: "30px" }}>
      <Box
        sx={{
          border: "2px dashed #cccccc",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#F9FAFB",
          minHeight: "266.54px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Box {...getRootProps({ className: "drop" })}>
            <input {...getInputProps()} />
            <Box my={1}>{renderFilePreview()}</Box>
            <Box sx={{ width: "auto", height: "auto", mb: "2px" }}>
              <aside>
                <ul style={{ fontSize: "12px" }}>
                  {typeof songLyrics === "string"
                    ? songLyrics.substring(songLyrics.lastIndexOf("/") + 1)
                    : songLyrics?.name || "No file selected"}
                </ul>
              </aside>
            </Box>
            <Button
              type="button"
              onClick={open}
              sx={{
                textTransform: "none",
                color: "black",
                border: "1px solid grey",
                width: "180px",
                backgroundColor: "#EEEDEC",
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#dcdcdc"
                }
              }}
            >
              {lyricsTitle}
            </Button>
            <Box px={1}>
              <Typography fontSize={15} className="drop-song">
                {titleName ? titleName : "Drop your Lyrics here, or"}
                <Typography
                  component="span"
                  sx={{
                    color: "#FB900B",
                    "&:hover": { textDecoration: "underline" }
                  }}
                  onClick={open}
                >
                  browse
                </Typography>
              </Typography>
              <Typography fontSize={14} color="error" className="support">
                {instruction}
              </Typography>
              <Typography fontSize={10} color="grey" className="support">
                Supports: {supportsText}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LyricsUpload;
