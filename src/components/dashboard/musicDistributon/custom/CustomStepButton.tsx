import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import React from "react";

interface CustomStepButtonProps {
  activeTab: number;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingBack?: boolean;
}
const CustomStepButton: React.FC<CustomStepButtonProps> = ({
  activeTab,
  handleBack,
  steps,
  handleNext,
  disabled,
  loading,
  loadingBack,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      {activeTab <= 4 && (
        <LoadingButton
          color="inherit"
          variant="contained"
          disabled={activeTab === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          loading={loadingBack ?? false}
        >
          Back
        </LoadingButton>
      )}
      <Box sx={{ flex: "1 1 auto" }} />
      <LoadingButton
        type={steps[activeTab].content === "form" ? "submit" : "button"}
        variant="contained"
        sx={{ mr: 1, color: "white", backgroundColor: "black" }}
        onClick={steps[activeTab].content !== "form" ? handleNext : undefined}
        disabled={disabled ?? false}
        loading={loading ?? false}
      >
        Continue
      </LoadingButton>
    </Box>
  );
};

export default CustomStepButton;
