"use client";
import CustomSideMenuList from "@/components/common/CustomAccordionMenuList";
import DistributeNow from "@/components/common/distributeNow/DistributeNow";
import Footer from "@/components/common/footer/Footer";
import HeadBanner from "@/components/common/HeadBanner";
import Navbar from "@/components/common/navbar/Navbar";
import { Container } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  
  console.log("currentCategory", currentCategory);
  return (
    <>
      <Navbar />
      <HeadBanner> Frequently Asked Questions </HeadBanner>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <CustomSideMenuList
          categoryId={params?.id}
          viewType={"faq"}
          currentCategory={currentCategory}
        />
      </Container>
      <DistributeNow />
      <Footer />
    </>
  );
}

export default Page;
