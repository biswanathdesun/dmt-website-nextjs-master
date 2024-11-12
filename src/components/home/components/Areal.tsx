import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

function Areal() {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#FFF",
        paddingY: 5,
      }}
    >
      <Grid>
        <Grid
          item
          sm={12}
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#FF8B00",
              fontFamily: "Raleway",
              fontSize: { xs: 40, md: 60 },
            }}
          >
            DELIVER MY TUNE
          </Typography>
        </Grid>
        <Grid
          item
          sm={12}
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Raleway", Sans-serif',
              fontWeight: "100",
              fontSize: { xs: 20, md: 40 },
            }}
          >
            let the world know you
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Areal;
