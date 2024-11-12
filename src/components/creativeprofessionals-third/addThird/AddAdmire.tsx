// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Box,
//   Typography,
// } from "@mui/material";
// import Image from "next/image";
 import { IconButton } from "@mui/material";
 import StarIcon from "@mui/icons-material/Star";
 import StarBorderIcon from "@mui/icons-material/StarBorder";

// interface AddAdmireProps {
//   open: boolean;
//   onClose: () => void;
// }

// const AddAdmire: React.FC<AddAdmireProps> = ({ open, onClose }) => {
//   const [formData, setFormData] = useState({
//     text1: "",
//     text2: "",
//     text3: "",
//     photo1: null as File | null,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, files } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = () => {
//     // Handle form submission logic
//     console.log(formData);
//     onClose();
//   };

//   const getPreviewUrl = (file: File | null) => {
//     return file ? URL.createObjectURL(file) : "";
//   };

//   const [rating, setRating] = useState(0);

//   const handleRating = (newRating: number) => {
//     setRating(newRating);
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="lg"
//       fullWidth
//       sx={{
//         "& .MuiDialog-paper": {
//           width: {
//             xs: "100%",
//             sm: "100%",
//             md: "80%",
//             lg: "50%",
//             xl: "40%",
//           },
//         },
//       }}
//     >
//       <DialogTitle>Creative Banner</DialogTitle>
//       <DialogContent>
//         <Box
//           component="form"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           <Typography>Enter Title</Typography>
//           <TextField
//             label="Enter Title"
//             name="text1"
//             value={formData.text1}
//             onChange={handleChange}
//             fullWidth
//             sx={{
//               textTransform: "capitalize",
//               "& .MuiOutlinedInput-root": {
//                 "&.Mui-focused fieldset": {
//                   borderColor: "#4dcab4",
//                 },
//               },
//               "& .MuiInputLabel-outlined.Mui-focused": {
//                 color: "#4dcab4",
//               },
//               mt: 1,
//             }}
//           />

//           <Typography>Enter Description</Typography>
//           <TextField
//             label="Enter Description"
//             name="text3"
//             value={formData.text3}
//             onChange={handleChange}
//             fullWidth
//             multiline
//             rows={3}
//             sx={{
//               textTransform: "capitalize",
//               "& .MuiOutlinedInput-root": {
//                 "&.Mui-focused fieldset": {
//                   borderColor: "#4dcab4",
//                 },
//               },
//               "& .MuiInputLabel-outlined.Mui-focused": {
//                 color: "#4dcab4",
//               },
//             }}
//           />
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               flexDirection: "column",
//             }}
//           >
//             <Box sx={{ display: "flex", mb: 2 }}>
//               {[1, 2, 3, 4, 5].map((value) => (
//                 <IconButton
//                   key={value}
//                   onClick={() => handleRating(value)}
//                   sx={{ color: value <= rating ? "#ffd700" : "#ccc" }}
//                 >
//                   {value <= rating ? <StarIcon /> : <StarBorderIcon />}
//                 </IconButton>
//               ))}
//             </Box>
//             <TextField
//               label="Rating"
//               value={rating}
//               InputProps={{
//                 readOnly: true,
//               }}
//               fullWidth
//               sx={{
//                 textTransform: "capitalize",
//                 "& .MuiOutlinedInput-root": {
//                   "&.Mui-focused fieldset": {
//                     borderColor: "#4dcab4",
//                   },
//                 },
//                 "& .MuiInputLabel-outlined.Mui-focused": {
//                   color: "#4dcab4",
//                 },
//               }}
//             />
//           </Box>
//           <Typography>Upload Banner</Typography>
//           <input
//             accept="image/*"
//             type="file"
//             name="photo1"
//             onChange={handleChange}
//             style={{ color: "#000" }}
//           />
//           {formData.photo1 && (
//             <Box
//               sx={{
//                 marginTop: "10px",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Typography>Preview:</Typography>
//               <Image
//                 src={getPreviewUrl(formData.photo1)}
//                 alt="Preview"
//                 width={1000}
//                 height={1000}
//                 style={{ maxWidth: "30%", height: "auto" }}
//               />
//             </Box>
//           )}
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           onClick={onClose}
//           size="small"
//           sx={{
//             width: { xs: "100%", md: "auto" },
//             border: "2px solid #4dcab4",
//             borderRadius: "15px",
//             color: "#4dcab4",
//             "&:hover": {
//               border: "2px solid #4dcab4",
//             },
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSubmit}
//           size="small"
//           sx={{
//             width: { xs: "100%", md: "auto" },
//             border: "2px solid #4dcab4",
//             borderRadius: "15px",
//             color: "#4dcab4",
//             "&:hover": {
//               border: "2px solid #4dcab4",
//             },
//           }}
//         >
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddAdmire;


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
    title?: string;
    description?: string;
    image?: File | null;
  } | null;
  onClose: () => void;
}

const NewUserSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const AddListen: React.FC<AddListenProps> = ({ open, onClose, view }) => {
  const [formData, setFormData] = useState<any>({});
  const [filedata, setFiledata] = useState<File | null>(null);
  const [saveImage, setSaveImage] = useState<File | null>(null);
  const [fileAutograph, setFileAutograph] = useState<File | null>(null);
  const [autograph, setAutograph] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const defaultValues = useMemo(
    () => ({
      title: "",
      description: "",
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
      setValue("title", view?.title || "");
      setValue("description", view?.description || "");
      setFiledata(view?.image || null)
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
        <DialogTitle>Creative Banner</DialogTitle>
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
             <Box sx={{ display: "flex", mb: 2,justifyContent:"center",alignItem:"center" }}>
          {[1, 2, 3, 4, 5].map((value) => (
                <IconButton
                  key={value}
                  onClick={() => setRating(value)}
                  sx={{ color: value <= rating ? "#ffd700" : "#ccc" }}
                >
                  {value <= rating ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              ))}
            </Box> 
             <RHFTextField
              fullWidth
              name="rating"
              size="small"
              label="Rating"
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

export default AddListen;
