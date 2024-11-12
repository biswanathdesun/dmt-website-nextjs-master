"use client";
import React from "react";
import { Container } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import CustomSideMenuList from "./CustomAccordionMenuList";

const HelpList = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          my: 5,
          minHeight: "60vh",
        }}
      >
        <CustomSideMenuList
          categoryId={params?.slug}
          currentCategory={currentCategory}
        />
      </Container>
    </>
  );
};

export default HelpList;
