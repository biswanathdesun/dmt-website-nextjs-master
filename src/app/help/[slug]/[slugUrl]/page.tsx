"use client";
import DistributeNow from "@/components/common/distributeNow/DistributeNow";
import Footer from "@/components/common/footer/Footer";
import HeadBanner from "@/components/common/HeadBanner";
import Navbar from "@/components/common/navbar/Navbar";
import HelpDetail from "@/components/helpPage/components/HelpDetail";
import { Box, Container } from "@mui/material";
import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  return (
    <>
      <Navbar />
      <HeadBanner>Help Page</HeadBanner>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <HelpDetail params={params} />
      </Container>
      <DistributeNow />
      <Footer />
    </>
  );
}
