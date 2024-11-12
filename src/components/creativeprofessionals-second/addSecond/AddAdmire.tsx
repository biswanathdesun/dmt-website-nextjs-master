import React, { useState, useEffect } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import RHFTextField from "@/components/hook-form/RHFTextField";
import ImageDrop from "@/components/hook-form/ImageDrop";

interface AddHeadProps {
  open: boolean;
  view: any;
  onClose: () => void;
}

const NewUserSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const AddAdmire: React.FC<AddHeadProps> = ({ open, onClose, view }) => {
  const [formData, setFormData] = useState<any>({});
  console.log(view, "view")
  const [filedata, setFiledata] = useState<File | null>(null);
  const [saveImage, setSaveimage] = useState<File | null>(null);
  const [fileAutograph, setFileAutograph] = useState<File | null>(null);
  const [autograph, setAutograph] = useState<File | null>(null);
  const [banner, setBanner] = useState()
  const defaultValues = useMemo(
    () => ({
      title: "",
      name: "",
      description: "",
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues
  });
  const { reset, handleSubmit, control, setValue } = methods;

  useEffect(() => {
    setValue("title", view?.title || "");
    setValue("description", view?.description || "");
  }, [view, setValue]);
  const onSubmit = (data: any) => {
    console.log(data, "data")
    console.log(filedata, "filedata")
    console.log(fileAutograph, "fileAutograph")
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
              xl: "40%",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#ff5999",
          }}
        >Creative Banner</DialogTitle>


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
              gap: "20px",
              marginTop: "10px",
              backgroundColor: "#ff5999",
              color: "#fff",
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
              name="description"
              size="small"
              label="Enter Description"
              variant="outlined"
              multiline
              rows={3}
            />
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
              backgroundColor={"#ff5999"}
              buttonText="Upload Banner"
              acceptedFileTypes={{
                "image/jpeg": [],
                "image/png": [],
              }}
            // minsize={3000}
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

export default AddAdmire;
