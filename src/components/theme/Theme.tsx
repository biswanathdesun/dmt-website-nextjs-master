"use client"
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff8B00",
      // dark: "#000"
    },
    secondary: {
      main: "#f50057"
    }
  },
  typography: {
    fontFamily: "Poppins, sans-serif"
  }
});

export default theme;
