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
  Container,
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
  onClose: () => void;
}

const NewUserSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

const AddHead: React.FC<AddHeadProps> = ({ open, onClose }) => {
 const [formData, setFormData] = useState<any>({});
  const [filedata, setFiledata] = useState<File | null>(null);
  const [saveImage,setSaveimage]=useState<File | null>(null);
  const [fileAutograph, setFileAutograph] = useState<File | null>(null);
  const [autograph,setAutograph]=useState<File | null>(null);
  const [banner,setBanner]=useState()
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
  const { reset, handleSubmit, control } = methods;
  const onSubmit = (data: any) => {
    console.log(data, "data")
    console.log(filedata,"filedata")
    console.log(fileAutograph,"fileAutograph")
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
      <DialogTitle>Creative Banner</DialogTitle>

      <DialogContent>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap:"20px",
            marginTop:"10px"
          }}
        >
            <RHFTextField
              fullWidth
              name="title"
              size="small"
              label="Enter Title"
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
              name="name"
              size="small"
              label="Enter Your First Name"
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
              name="description"
              size="small"
              label="Enter Description"
              variant="outlined"
              multiline
              rows={3}
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
              buttonText="Upload Banner"
              acceptedFileTypes={{
                "image/jpeg": [],
                "image/png": [],
              }}
              // minsize={3000}
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
              buttonText="Upload Autograph"
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

export default AddHead;
