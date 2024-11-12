// AddContact.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import RHFTextField from "@/components/hook-form/RHFTextField";
import ImageDrop from "@/components/hook-form/ImageDrop";
const NewUserSchema = Yup.object().shape({
  whatsappLink: Yup.string().required("Whatsapp Link is required"),
  youtubeLink: Yup.string().required("Youtube Link is required"),
  twitterLink: Yup.string().required("Twitter Link is required"),
  facebookLink: Yup.string().required("Facebook Link is required"),
  spotifylink: Yup.string().required("Spotify Link is required"),
  instagramLink: Yup.string().required("Instagram Link is required"),
  soundcloudLink: Yup.string().required("Soundcloud Link is required"),
});
interface AddContactProps {
  open: boolean;
  onClose: () => void;
}

const AddContact: React.FC<AddContactProps> = ({ open, onClose }) => {
const defaultValues = useMemo(
    () => ({
      whatsappLink: "",
      youtubeLink: "",
      twitterLink: "",
      facebookLink:"",
      spotifylink:"",
      instagramLink:"",
      soundcloudLink:""
        }),
    []
  );
const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues
  });
  const { reset, handleSubmit, control } = methods;
  const onSubmit = (data: any) => {
    console.log(data, "data")
   
  }


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

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
            xl: "30%",
          },
        },
      }}
    >
      <DialogTitle   sx={{
          backgroundColor: "#ff5999",
        }}
>Contact</DialogTitle>
      <DialogContent  sx={{
          backgroundColor: "#ff5999",
        }}
>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, backgroundColor: "#ff5999",
            color: "#fff",
 }}
        >
          <RHFTextField
              fullWidth
              name="whatsappLink"
              size="small"
              label="Enter Whatsapp Link"
              variant="outlined"
            />
            <RHFTextField
              fullWidth
              name="youtubeLink"
              size="small"
              label="Enter Youtube Link"
              variant="outlined"
            />
            <RHFTextField
              fullWidth
              name="twitterLink"
              size="small"
              label="Enter Twitter Link"
              variant="outlined"
            />
            <RHFTextField
              fullWidth
              name="facebookLink"
              size="small"
              label="Enter Facebook Link"
              variant="outlined"
            />
            <RHFTextField
              fullWidth
              name="spotifylink"
              size="small"
              label="Enter Spotify Link"
              variant="outlined"
            />
            <RHFTextField
              fullWidth
              name="instagramLink"
              size="small"
              label="Enter Instagram Link"
              variant="outlined"
            />
            <RHFTextField
              fullWidth
              name="soundcloudLink"
              size="small"
              label="Enter Soundcloud Link"
              variant="outlined"
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
            type="submit" variant="contained" onClick={handleSubmit(onSubmit)}
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
    </FormProvider>
  );
};

export default AddContact;
