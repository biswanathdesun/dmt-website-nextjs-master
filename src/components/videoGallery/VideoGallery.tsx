"use client";
import React, { useState } from "react";
import HeadBanner from "../common/HeadBanner";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getCategoryByTypeAsync } from "@/redux/services/categoryAndSubCategory";
import CategoryListPage from "../faq/CategoryListPage";

function VideoGalary() {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, getCategoryByType } = useSelector(
    (store: any) => store.categoryAndSubCategory
  );

  React.useEffect(() => {
    const data = {
      type: "video",
      };

      dispatch(getCategoryByTypeAsync(data));

  }, [dispatch]);

  return (
    <>
      <HeadBanner>Explore Our Stunning Video Collection</HeadBanner>

      {getCategoryByType?.length >= 0 ? (
        <Container maxWidth="xl">

          {(isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: "100vw",
                minHeight: "40vw",
              }}
            >
              <CircularProgress />
            </Box>
          )) || (
            <CategoryListPage
              viewType={"video"}
              categoryList={getCategoryByType}
            />
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
          <Typography variant="body1" sx={{fontSize:'20px', color:'inherit'}}>No data available.</Typography>
        </Box>
      )}
    </>
  );
}

export default VideoGalary;
