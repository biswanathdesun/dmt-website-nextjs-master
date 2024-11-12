import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import React from "react";

interface CoinCardsProps {
  name: string;
  type?: string;
  song?: number;
  bgColor?: string;
  icon: string;
  color: string;
}

const CoinCards: React.FC<CoinCardsProps> = ({
  name,
  song,
  bgColor,
  icon,
  color,
  type,
}) => {
  return (
    <div>
      <Card
        sx={{
          height: 222,
          bgcolor: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "25px",
          maxWidth: 600,
        }}
      >
        <CardContent>
          <Typography
            sx={{
              textAlign: "center",
              direction: "column",
              fontSize: { xs: 22, sm: 25, lg: 27 },
            }}
            color={color}
          >
            {name}
          </Typography>
          <Icon
            icon={icon}
            width="2rem"
            height="2rem"
            style={{ display: "block", margin: "10px auto", color: color }}
          />
          <Divider sx={{ width: "100vw", marginY: 2 }} />
          <Typography sx={{ textAlign: "center" }} fontSize={20} color={color}>
            {type === "coin" ? "" : "Unit: "} {song}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoinCards;
