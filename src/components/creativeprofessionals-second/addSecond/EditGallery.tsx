import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ImageDrop from "@/components/hook-form/ImageDrop";

interface EditGalleryProps {
  open: boolean;
  onClose: () => void;
  view:any
}

const EditGallery: React.FC<EditGalleryProps> = ({ open, onClose,view }) => {
  const [formData, setFormData] = useState<any>({});
  const [filedata, setFiledata] = useState<File | null>(null);
  const [saveImage,setSaveimage]=useState<File | null>(null);
  const handleSubmit=()=>{
    console.log(filedata,"filedata")
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      <DialogTitle  sx={{
          backgroundColor: "#ff5999",
        }}
>Gallery</DialogTitle>
      <DialogContent  sx={{
          backgroundColor: "#ff5999",
        }}
>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2,
          backgroundColor: "#ff5999",
color: "#fff",
           }}
        >
          <ImageDrop
              career={{ cover: undefined }}
              error={undefined}
              firstslidedata={{ cover: undefined }}
              formData={formData}
              setFormData={setFormData}
              setFiledata={setFiledata}
              filedata={filedata}
              setSaveimage={setSaveimage}
              saveImage={saveImage}
              buttonText="Upload Gallery"
              backgroundColor={"#ff5999"}
              acceptedFileTypes={{
                "image/jpeg": [],
                "image/png": [],
              }}
              // minsize={3000}
            />
        </Box>
      </DialogContent>
      <DialogActions  sx={{
          backgroundColor: "#ff5999",
        }}
>
         <Button
          onClick={onClose}
          size="small" 
          sx={{
            backgroundColor: "#00d8c0",
            "&:hover": {
              bgcolor: "#00d8c0",
            },
            color: "#fff",
            borderRadius: "25px",
            border: "2px solid white",
          }}
        >
          Cancel
        </Button>
        <Button
            type="submit" variant="contained" onClick={handleSubmit}
          size="small"
          sx={{
            backgroundColor: "#00d8c0",
            "&:hover": {
              bgcolor: "#00d8c0",
            },
            color: "#fff",
            borderRadius: "25px",
            border: "2px solid white",
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGallery;
