import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 150,
  height: 150,
  padding: 4,
  boxSizing: "border-box",
  justifyContent: "center",
  alignItems: "center"
};

const thumbInner: React.CSSProperties = {
  position: "relative",
  minWidth: 0,
  overflow: "hidden",
  width: "100%",
  height: "100%"
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

interface FileWithPreview extends File {
  preview: string;
  title?: string;
}

interface ProfileProps {
  setProfile: (file: FileWithPreview) => void;
  profile: FileWithPreview | any;
  name: string;
  label: string;
  title?: string;
  disabled?: boolean; // Added disabled prop
}

const RHFUploadAvatar: React.FC<ProfileProps> = ({
  setProfile,
  profile,
  name,
  title,
  disabled = false // Default disabled to false
}) => {
  const { control, setValue } = useForm();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": []
    },
    onDrop: (acceptedFiles) => {
      if (!disabled) {
        const filesWithPreview = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        ) as FileWithPreview[];
        setProfile(filesWithPreview[0]);
        setFiles(filesWithPreview);
        setValue(name, filesWithPreview[0]);
      }
    },
    disabled // Disable dropzone when disabled is true
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <Image
          src={file.preview}
          layout="fill"
          objectFit="cover"
          alt="Profile"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const thumbs2 = (
    <div style={thumb}>
      <div style={thumbInner}>
        <Image
          src={profile?.preview}
          layout="fill"
          objectFit="cover"
          alt="Profile"
          onLoad={() => {
            URL.revokeObjectURL(profile?.preview);
          }}
        />
      </div>
    </div>
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box py={3} sx={{ border: "2px dashed black" }}>
          <div
            {...getRootProps({ className: "basic-song-drop" })}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <input {...getInputProps()} disabled={disabled} />
            {profile ? (
              <Box sx={{ width: "150px", height: "150px" }}>
                <aside style={thumbsContainer}>
                  {files?.length ? thumbs : thumbs2}
                </aside>
              </Box>
            ) : (
              <IconButton
                type="button"
                className="upload-song"
                sx={{ width: "fit-content" }}
                disabled={disabled} // Disable button when disabled is true
              >
                <Image
                  src="/icons/upload_icon.png"
                  width={50}
                  height={50}
                  alt="Upload"
                />
              </IconButton>
            )}
          </div>
          <Typography
            className="drop-song"
            paddingX="25px !important"
            py={2}
            lineHeight="20px ! important"
            fontSize={15}
            textAlign="center"
          >
            {title
              ? title
              : profile
              ? "Drop or Choose Another Profile Photo"
              : "Drop or Choose your Profile Photo"}
          </Typography>
        </Box>
      )}
    />
  );
};

export default RHFUploadAvatar;
