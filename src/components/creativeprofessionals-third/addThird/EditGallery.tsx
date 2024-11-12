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
      <DialogTitle>Gallery</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
              acceptedFileTypes={{
                "image/jpeg": [],
                "image/png": [],
              }}
              // minsize={3000}
            />
        </Box>
      </DialogContent>
      <DialogActions>
      <Button onClick={onClose}
          sx={{
            border: "2px solid #4dcab4",
            borderRadius: "15px",
            color: "#4dcab4",
            "&:hover": {
              border: "2px solid #4dcab4",
            },
          }}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit} variant="contained" color="primary"
           sx={{
            border: "2px solid #4dcab4",
            borderRadius: "15px",
            color: "#ffff",
            background:"#4dcab4",
            "&:hover": {
              border: "2px solid #4dcab4",
            },
          }}>
            submit
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGallery;
