"use client";
import * as React from "react";
import { Box } from "@mui/material";
import PopupField from "./PopupField";
import { tcData } from "@components/common/JSONFolder/tcData";
import { useRouter } from "next/navigation";

function NewReleaseTNC() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    router.back();
    setOpen(false);
  };

  const handleContinue = () => {
    setOpen(false);
  };

  return (
    <Box>
      <PopupField
        tcData={tcData}
        open={open}
        handleClose={handleClose}
        handleContinue={handleContinue}
      />
    </Box>
  );
}

export default NewReleaseTNC;
