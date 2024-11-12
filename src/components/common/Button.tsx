import React from 'react'
import { Button } from '@mui/material';

const CustomButton = () => {
  return (
    <Button
      sx={{
        color: "white",
        background: "black",
        borderRadius: 10,
        boxShadow: "none",
        textTransform: "capitalize",
        textDecoration: "none",
        "&:hover": {
          background: "black",
          boxShadow: "none"
        }
      }}
    ></Button>
  );
}

export default CustomButton;