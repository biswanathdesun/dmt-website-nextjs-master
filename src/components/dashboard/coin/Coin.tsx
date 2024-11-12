"use client";

import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CoinCards from "./components/CoinCards";
import CustomBreadcrumbs from "@/components/common/CustomBreadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUsersDetailsAsync } from "@/redux/services/profile";

export default function Coin() {
  const dispatch: AppDispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state?.users);
  const { productCounts, wallet } = users;
  useEffect(() => {
    dispatch(getUsersDetailsAsync());
  }, []);
  return (
    <Box my={3}>
      <Container>
        <CustomBreadcrumbs
          heading="Coins"
          activeLast
          sx={{ fontSize: "40px", fontWeight: "bolder", marginTop: 5 }}
          links={[]}
        />

        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            paddingBottom: 3,
            px: { xs: 0, sm: 5 },
            alignItems: "center",
            display: { md: "flex" },
            justifyContent: { md: "center" },
          }}
        >
          <CoinCards
            type="coin"
            song={wallet}
            name="Coins"
            bgColor="#FFE9D5"
            icon="noto:coin"
            color="#7A0916"
          />
        </Box>
        <Grid container spacing={3}>
          {[
            {
              name: "Music Distribution",
              songs: productCounts?.musicDistributionUnit,
              bgColor: "#e6ccff",
              icon: "streamline:ai-generate-music-spark",
              color: "#5900b3",
            },
            {
              name: "AI Mastering",
              songs: productCounts?.aIMasteringUnit,
              bgColor: "#CAFDF5",
              icon: "hugeicons:artificial-intelligence-03",
              color: "#003768",
            },
            {
              name: "Portfolio",
              songs: productCounts?.portfolioUnit,
              bgColor: "#FFD9E6",
              icon: "bytesize:portfolio",
              color: "#cc3399",
            },
            {
              name: "Social Media Manager",
              songs: productCounts?.socialMediaUnit,
              bgColor: "#C8FACD",
              icon: "grommet-icons:user-manager",
              color: "#005249",
            },
          ].map((item, index) => (
            <Grid item sm={6} xs={12} key={index}>
              <CoinCards
                name={item?.name}
                song={item?.songs}
                bgColor={item?.bgColor}
                icon={item?.icon}
                color={item?.color}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
