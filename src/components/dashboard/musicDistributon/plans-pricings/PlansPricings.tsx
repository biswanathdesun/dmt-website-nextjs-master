"use client";
import React from "react";
import ButtonTabs from "@/components/services-pricing/components/ButtonTabs";
import CustomBreadcrumbs from "@/components/common/CustomBreadcrumbs";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import SearchIcon from "@mui/icons-material/Search";

const PlansPricings = () => {
  return (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Plans & Pricings</Typography>
      </Box>

      <ButtonTabs />
    </>
  );
};

export default PlansPricings;
