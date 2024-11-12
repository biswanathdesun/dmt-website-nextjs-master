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
                  borderColor: "#4dcab4",
                },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#4dcab4",
              }, 
              mt:1
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
                  borderColor: "#4dcab4",
                },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#4dcab4",
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
                  borderColor: "#4dcab4",
                },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#4dcab4",
              },
            }}
          />

          {/* Date Field */}
          <TextField
            label="Select Event Date"
            type="date"
            value={formData.date.format("YYYY-MM-DD")}
            onChange={(e) => handleDateChange(dayjs(e.target.value))}
            fullWidth
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

          {/* Time Field */}
          <TextField
            label="Select Event Time"
            type="time"
            value={formData.time.format("HH:mm")}
            onChange={(e) =>
              handleTimeChange(
                dayjs()
                  .hour(Number(e.target.value.split(":")[0]))
                  .minute(Number(e.target.value.split(":")[1]))
              )
            }
            fullWidth
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
                width: { xs: "100%", sm: "40%" },
                mt: 1,
                p: 1,
                background: "#4dcab4",
                color: "white",
                "&:hover": {
                  background: "#4dcab4",
                  color: "white",
                },
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
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            width: { xs: "100%", md: "auto" },
            border: "2px solid #4dcab4",
            borderRadius: "15px",
            color: "#4dcab4",
            "&:hover": {
              border: "2px solid #4dcab4",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          sx={{
            width: { xs: "100%", md: "auto" },
            border: "2px solid #4dcab4",
            borderRadius: "15px",
            color: "#4dcab4",
            "&:hover": {
              border: "2px solid #4dcab4",
            },
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsDialog;
