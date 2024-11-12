"use client";
import React, { useEffect } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import HeadBanner from "../common/HeadBanner";
import Navbar from "../common/navbar/Navbar";
import DistributeNow from "../common/distributeNow/DistributeNow";
import Footer from "../common/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import CategoryListPage from "./CategoryListPage";
import { getFAQCategoryAsync } from "@/redux/services/faq";

const FAQParentComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, getFAQCategory } = useSelector(
    (store: RootState) => store.faq
  );

  useEffect(() => {
    dispatch(getFAQCategoryAsync());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <HeadBanner> Frequently Asked Questions</HeadBanner>
      {getFAQCategory?.length >= 0 ? (
        <Container maxWidth="xl" sx={{ py: 5, }}>
          {(isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: "100vw",
                minHeight: "100vw",
                // flexWrap:'wrap'
              }}
            >
              <CircularProgress />
            </Box>
          )) || (
            <CategoryListPage viewType={"faq"} categoryList={getFAQCategory} />
          )}
        </Container>
      ) : (
        <Box
          sx={{
            width: "100vw",
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: "20px", color: "inherit" }}
          >
            No data available.
          </Typography>
        </Box>
      )}
      <DistributeNow />
      <Footer />
    </>
  );
};

export default FAQParentComponent;
