import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface HeadBannerProps {
  children: ReactNode;
}

export default function HeadBanner({ children }: HeadBannerProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFE4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingY: { sm: 14, xs: 12 }
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily:'Raleway',
          fontWeight: "700",
          fontSize: { xs: 24, sm: 36, md: 50 },
          textAlign: "center",
          paddingX: { sm: 4, xs: 4 }
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
