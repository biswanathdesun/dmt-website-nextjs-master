import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Image from "next/image";
import { platformData } from "@components/common/JSONFolder/platformData";

interface platformProps {
  activeTab: number;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
}

const PlatformsCovered: React.FC<platformProps> = ({
  activeTab,
  handleBack,
  steps,
  handleNext,
}) => {
  const handleContinue = () => {
    handleNext();
  };
  return (
    <>
      <Box
        sx={{
          maxHeight: "55vh",
          overflowY: "auto",
          padding: 2,
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
          "&::-webkit-scrollbar-thumb": {
            background: "#fe8d0bc4",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": { background: "#FE8E0B" },
        }}
      >
        <Box
          rowGap={2}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {platformData.map((item, index) => (
            <Card
              key={index}
              sx={{ boxShadow: 3, borderColor: "secondary", px: 2, width: 260 }}
            >
              <CardMedia
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <Image src={item.icon} alt={item.platform} width={200} />
              </CardMedia>
            </Card>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2, pb: 4 }}>
        <Button
          color="inherit"
          variant="contained"
          disabled={activeTab === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          type={steps[activeTab].content === "form" ? "submit" : "button"}
          variant="contained"
          sx={{ mr: 1, color: "white", backgroundColor: "black" }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </>
  );
};

export default PlatformsCovered;
