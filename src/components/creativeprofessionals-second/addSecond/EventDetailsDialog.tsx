"use client";

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
  Popover,
  IconButton,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface EventDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  event: any; // Adjust this type as needed
}

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  open,
  onClose,
  event,
}) => {
  const [formData, setFormData] = useState({
    title: event?.heading || "",
    description: event?.information || "",
    location: event?.venue || "",
    date: event ? dayjs(event.date, "D MMM YYYY") : dayjs(),
    time: event ? dayjs(event.time, "HH:mm") : dayjs(),
    banner: null as File | null,
  });

  const [datePopoverOpen, setDatePopoverOpen] = useState<boolean>(false);
  const [timePopoverOpen, setTimePopoverOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleDateChange = (date: any) => {
    setFormData((prevState) => ({
      ...prevState,
      date: date || prevState.date,
    }));
    setDatePopoverOpen(false);
  };

  const handleTimeChange = (time: any) => {
    setFormData((prevState) => ({
      ...prevState,
      time: time || prevState.time,
    }));
    setTimePopoverOpen(false);
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log(formData);
    onClose();
  };

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
            lg: "50%",
            xl: "40%",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#ff5999",
        }}
      >
        Events
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#ff5999",
        }}
      >
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Event Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            sx={{
              textTransform: "capitalize",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fff",
                },
              },

              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#fff",
              },
            }}
          />
          <TextField
            label="Event Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            sx={{
              textTransform: "capitalize",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fff",
                },
              },

              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#fff",
              },
            }}
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            sx={{
              textTransform: "capitalize",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fff",
                },
              },

              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#fff",
              },
            }}
          />

          {/* Date Field */}
          <TextField
            label="Event Date"
            value={formData.date.format("YYYY-MM-DD")}
            onClick={() => setDatePopoverOpen(true)}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setDatePopoverOpen(true)}>
                  <CalendarTodayIcon />
                </IconButton>
              ),
            }}
            sx={{
              textTransform: "capitalize",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fff",
                },
              },

              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#fff",
              },
            }}
          />

          {/* Time Field */}
          <TextField
            label="Event Time"
            value={formData.time.format("HH:mm")}
            onClick={() => setTimePopoverOpen(true)}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setTimePopoverOpen(true)}>
                  <AccessTimeIcon />
                </IconButton>
              ),
            }}
            sx={{
              textTransform: "capitalize",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fff",
                },
              },

              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#fff",
              },
            }}
          />

          {/* Date Picker Popover */}
          <Popover
            open={datePopoverOpen}
            onClose={() => setDatePopoverOpen(false)}
            anchorReference="anchorEl"
            anchorEl={document.querySelector('[name="title"]')} // Anchor the popover to a reference element
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={formData.date} onChange={handleDateChange} />
            </LocalizationProvider>
          </Popover>

          {/* Time Picker Popover */}
          <Popover
            open={timePopoverOpen}
            onClose={() => setTimePopoverOpen(false)}
            anchorReference="anchorEl"
            anchorEl={document.querySelector('[name="title"]')} // Anchor the popover to a reference element
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker value={formData.time} onChange={handleTimeChange} />
            </LocalizationProvider>
          </Popover>

          {/* Banner Upload Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {formData.banner && (
              <Box
                component="img"
                src={URL.createObjectURL(formData.banner)}
                alt="Banner Preview"
                sx={{ width: 200, height: 100, objectFit: "cover", mb: 1 }}
              />
            )}
            <Button
              variant="contained"
              component="label"
              size="small"
              sx={{
                width: "50%",
                mt: "10px",
                boder: "2px solid #fff  ",
                bgcolor: "#fff",
                "&:hover": {
                  bgcolor: "#fff",
                },
                textTransform: "capitalize",
              }}
            >
              {formData.banner
                ? `Banner: ${formData.banner.name}`
                : "Upload Banner"}
              <input type="file" name="banner" hidden onChange={handleChange} />
            </Button>
            {!formData.banner && <Typography>No file chosen</Typography>}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
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
          onClick={handleSubmit}
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

export default EventDetailsDialog;
