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
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface AddEventProps {
  open: boolean;
  onClose: () => void;
}

const AddEvent: React.FC<AddEventProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    text1: "",
    text2: "",
    text3: "",
    date: dayjs(),
    time: dayjs(),
    text5: "",
    text6: "",
    banner: null as File | null, // Add banner file to form data
  });

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
  };

  const handleTimeChange = (time: any) => {
    setFormData((prevState) => ({
      ...prevState,
      time: time || prevState.time,
    }));
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
            label="Enter Event Title"
            name="text1"
            value={formData.text1}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Enter Event Description"
            name="text2"
            value={formData.text2}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Enter Location"
            name="text3"
            value={formData.text3}
            onChange={handleChange}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Select Event Date"
                type="date"
                value={formData.date.format("YYYY-MM-DD")}
                onChange={(e) => handleDateChange(dayjs(e.target.value))}
                fullWidth
              />
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
              />
            </Box>
          </LocalizationProvider>
          <TextField
            label="Enter Link"
            name="text6"
            value={formData.text6}
            onChange={handleChange}
            fullWidth
          />

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
              sx={{ width: "50%" }}
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEvent;
