"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { DatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormProvider from "@/components/hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "@/components/hook-form/RHFTextField";
import ImageDrop from "@/components/hook-form/ImageDrop";

interface EventDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  view: any; // Adjust this type as needed
}

const NewUserSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
});

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  open,
  onClose,
  view,
}) => {
  const [formData, setFormData] = useState({
    date: view ? dayjs(view.date, "D MMM YYYY") : dayjs(),
    time: view ? dayjs(view.time, "HH:mm") : dayjs(),
    banner: null as File | null,
  });
  const [fileAutograph, setFileAutograph] = useState<File | null>(null);
  const [autograph, setAutograph] = useState<File | null>(null);
  const defaultValues = useMemo(
    () => ({
      title: view?.heading || "",
      description: view?.information || "",
      location: view?.venue || "",
    }),
    [view]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
      setValue("title", view?.heading || "");
      setValue("description", view?.information || "");
      setValue("location", view?.venue || "");
  }, [view, setValue]);

  const handleDateChange = (date: any) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleTimeChange = (time: any) => {
    setFormData((prev) => ({ ...prev, time }));
  };

  const onSubmit = (data: any) => {
    console.log(data, "data");
    console.log(formData.banner, "banner");
  };

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
        <DialogTitle>Events</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <RHFTextField
              fullWidth
              name="title"
              size="small"
              label="Event Title"
              variant="outlined"
            />
            <RHFTextField
              fullWidth
              name="description"
              size="small"
              label="Event Description"
              variant="outlined"
            />
            <RHFTextField
              fullWidth
              name="location"
              size="small"
              label="Location"
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Event Date"
                value={formData.date}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    label: "Select Date",
                    size: "small",
                  },
                }}
              />
              <MobileTimePicker
                value={formData.time}
                onChange={handleTimeChange}
                slotProps={{
                  textField: {
                    label: "Select Time",
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>
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
              buttonText="Upload Banner"
              acceptedFileTypes={{
                "image/jpeg": [],
                "image/png": [],
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default EventDetailsDialog;
