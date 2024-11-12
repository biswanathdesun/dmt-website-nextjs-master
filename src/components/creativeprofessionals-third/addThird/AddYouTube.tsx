// AddYouTube.tsx
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
import { useMemo ,useEffect} from "react";
import RHFTextField from "@/components/hook-form/RHFTextField";
interface AddYouTubeProps {
  open: boolean;
  onClose: () => void;
 view: {
    videoTitle?: string;
    videoUrl?: string;
    
  } | null;
}

const AddYouTube: React.FC<AddYouTubeProps> = ({ open, onClose,view }) => {
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
    defaultValues
  });
  const { reset, handleSubmit, control,setValue } = methods;
 const onSubmit = (data: any) => {
    console.log(data,"data")
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
      <DialogTitle>Upload YouTube Video</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2,marginTop:"10px" }}
          >
             <RHFTextField
              fullWidth
              name="title"
              size="small"
              label="Enter Video Title"
              variant="outlined"
              sx={{
                    textTransform: "capitalize",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#4dcab4",
                      },
                    },
                    "& .MuiInputLabel-outlined.Mui-focused": {
                      color: "#4dcab4",
                    },
                  }}

            />
             <RHFTextField
              fullWidth
              name="link"
              size="small"
              label="Enter Youtube Link"
              variant="outlined"
              sx={{
                    textTransform: "capitalize",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#4dcab4",
                      },
                    },
                    "& .MuiInputLabel-outlined.Mui-focused": {
                      color: "#4dcab4",
                    },
                  }}

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
          <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained" color="primary"
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
    </FormProvider>
  );
};

export default AddYouTube;
