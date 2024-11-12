'use client'
import * as React from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import BackgroundImage from "@public/images/DistributeLines.png";
import DistributeCircleGroup from "@public/images/DistributeCircleGroup.svg";
import Image from "next/image";

export default function DistributeNow() {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "black",
        position: "relative",
        zIndex: 0,
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItem: "flex-end",
        pt: 5,
      }}
    >
      <Box sx={{ display: { md: "flex", xs: "none" } }}>
        <Image src={BackgroundImage} alt="distribute lines" />
      </Box>
      <Box sx={{ display: { md: "none", xs: "flex" } }}>
        <Image src={DistributeCircleGroup} alt="distribute lines" />
      </Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: { md: "right", xs: "center" },
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            position: "relative",
            justifyContent: { md: "end", xs: "center" },
            direction: { xs: "column", md: "row" },
            alignItems: "center",
          }}
        >
          <Stack
            gap={3}
            direction="column"
            sx={{ zIndex: 1, flex: 1, textAlign: { md: "center", xs: "left" } }}
          >
            <Typography
              variant="h4"
              color="white"
              sx={{ fontSize: { md: 60, sm: 45, xs: 28, fontWeight: 500 } }}
            >
              What are you waiting for?
            </Typography>
            <Typography
              color="white"
              sx={{ fontSize: { md: 22, sm: 18, xs: 15 } }}
            >
              Let Deliver My Tune help you boost your music career
            </Typography>
            <Stack
              gap={1.5}
              direction={{ sm: "row", xs: "row" }}
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="contained"
                LinkComponent={"a"}
                href={token ? "/dashboard/music-distribution/new-releases" : "/auth/login"}
                sx={{
                  color: "white",
                  background: "black",
                  border: "2px solid white",
                  borderRadius: 10,
                  boxShadow: "none",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "white",
                    border: "2px solid white",
                    color: "black",
                    boxShadow: "none",
                  },
                }}
              >
                Distribute Now
              </Button>
              <Button
                variant="outlined"
                LinkComponent={"a"}
                href="/contactus"
                sx={{
                  color: "white",
                  background: "black",
                  borderRadius: 10,
                  border: "2px solid white",
                  boxShadow: "none",
                  textTransform: "capitalize",
                  textDecoration: "none",
                  "&:hover": {
                    background: "white",
                    color: "black",
                    border: "2px solid white",
                    boxShadow: "none",
                  },
                }}
              >
                Contact us
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
