import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "@/components/hook-form/RHFTextField";

interface AddYouTubeProps {
  open: boolean;
  onClose: () => void;
  view: {
    videoTitle?: string;
    videoUrl?: string;
  } | null;
}

const AddYouTube: React.FC<AddYouTubeProps> = ({ open, onClose, view }) => {
  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    link: Yup.string().required("Link is required"),
  });

  const defaultValues = useMemo(
    () => ({
      title: "",
      link: "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue } = methods;

  const onSubmit = (data: any) => {
    console.log(data, "data");
    if (view) {
      // update API call
    } else {
      // add API call
    }
  };

  useEffect(() => {
    setValue("title", view?.videoTitle || "");
    setValue("link", view?.videoUrl || "");
  }, [view, setValue]);

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
              xl: "40%",
            },
          },
        }}
      >
        <DialogTitle  sx={{
            backgroundColor: "#ff5999",
          }}>Upload YouTube Video</DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#ff5999",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: "10px",
              backgroundColor: "#ff5999",
            color: "#fff",
            }}
          >
            <RHFTextField
              fullWidth
              name="title"
              size="small"
              label="Enter Video Title"
              variant="outlined"
            />
            <RHFTextField
              fullWidth
              name="link"
              size="small"
              label="Enter YouTube Link"
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{
            backgroundColor: "#ff5999",
          }}>
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

export default AddYouTube;
