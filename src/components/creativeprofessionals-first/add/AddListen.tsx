import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import ImageDrop from "@/components/hook-form/ImageDrop";

interface AddListenProps {
  open: boolean;
  view: {
    songName?: string;
    singerName?: string;
    audio?: File | null;
    image?: File | null;
  } | null;
  onClose: () => void;
}

const NewUserSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  singerName: Yup.string().required("Singer Name is required"),
});

const AddListen: React.FC<AddListenProps> = ({ open, onClose, view }) => {
  const [formData, setFormData] = useState<any>({});
  const [filedata, setFiledata] = useState<File | null>(null);
  const [saveImage, setSaveImage] = useState<File | null>(null);
  const [fileAutograph, setFileAutograph] = useState<File | null>(null);
  const [autograph, setAutograph] = useState<File | null>(null);
  const defaultValues = useMemo(
    () => ({
      title: "",
      singerName: "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const { reset, handleSubmit, control, setValue } = methods;

  const onSubmit = (data: any) => {
    console.log(data,"data")
    if (view) {
      // update API call
    } else {
      // add API call
    }
  };

  useEffect(() => {
      setValue("title", view?.songName || "");
      setValue("singerName", view?.singerName || "");
      setFiledata(view?.image || null)
      setFileAutograph(view?.audio || null);
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
        <DialogTitle>Listen</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "grid",
              marginTop: "10px",
              gap: 2,
            }}
          >
            <RHFTextField
              fullWidth
              name="title"
              size="small"
              label="Enter Title"
              variant="outlined"
            />
            <RHFTextField
              fullWidth
              name="singerName"
              size="small"
              label="Enter Singer Name"
              variant="outlined"
            />
            <ImageDrop
              career={{ cover: undefined }}
              error={undefined}
              firstslidedata={{ cover: undefined }}
              formData={formData}
              setFormData={setFormData}
              setFiledata={setFiledata}
              filedata={filedata}
              setSaveimage={setSaveImage}
              saveImage={saveImage}
              buttonText="Upload Banner"
              acceptedFileTypes={{
                "image/jpeg": [],
                "image/png": [],
              }}
              minsize={3000}
            />
            <ImageDrop
              career={{ cover: undefined }}
              error={undefined}
              firstslidedata={{ cover: undefined }}
              formData={formData}
              setFormData={setFormData}
              setFiledata={setFileAutograph}
              filedata={fileAutograph}
              setSaveimage={setAutograph}
              saveImage={autograph}
              buttonText="Upload Song"
              acceptedFileTypes={{
                "audio/wav": [],
                "audio/aiff": [],
                "audio/flac": [],
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default AddListen;
