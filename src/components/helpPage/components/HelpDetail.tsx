"use client";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import parse from "html-react-parser";
import theme from "@/components/theme/Theme";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { helpCenterContentBySlugAsync } from "@/redux/services/help";
import { AppDispatch } from "@/redux/store";

const HelpDetail = ({ params }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { helpCenterContentBySlug, isSlugLoading } = useSelector(
    (state: any) => state.help
  );
  const content = helpCenterContentBySlug[0]?.content;
  const heading = helpCenterContentBySlug[0]?.heading;
  const categoryTitle = helpCenterContentBySlug[0]?.categoryTitle;
  const categoryId = helpCenterContentBySlug[0]?.categoryId;
  const subCategoryName = helpCenterContentBySlug[0]?.subCategoryName;

  const handleBackClick = (item: any) => {
    router.push(`/help/${categoryId}`);
  };

  const CircularLoader = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "60vw",
        minHeight: "15vw",
      }}
    >
      <CircularProgress />
    </Box>
  );

  useEffect(() => {
    const data = {
      slugUrl: params.slugUrl,
    };

    dispatch(helpCenterContentBySlugAsync(data));
  }, [dispatch, params]);

  return (
    <>
      {(isSlugLoading && CircularLoader) || (
        <Container maxWidth="lg" sx={{ paddingX: { xs: 1, sm: 3, md: 5 } }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
            <a
              href={`/help`}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "underLine",
                  "&:hover": {
                    textDecoration: "underLine",
                    color: "#f9971e",
                  },
                }}
              >
                <FormatListBulletedIcon
                  sx={{
                    fontSize: { xs: "20px" },
                    color: "#f9971e",
                    mr: 1,
                  }}
                />
                {categoryTitle}
              </Typography>
            </a>

            <Typography
              variant="h6"
              onClick={handleBackClick}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                textDecoration: "underLine",
                "&:hover": {
                  textDecoration: "underLine",
                  cursor: "pointer",
                  color: "#f9971e",
                },
              }}
            >
              <FiberManualRecordIcon
                sx={{
                  fontSize: { xs: "12px" },
                  color: "gray",
                  mx: 1,
                }}
              />
              {subCategoryName}
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              pb: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
              fontWeight: 600,
            }}
            color="initial"
          >
            {heading ?? ""}
          </Typography>
          <Box
            maxWidth="lg"
            sx={{
              fontFamily: "poppins",
              paddingX: { xs: 1, sm: 3, md: 5 }, // Add padding around the content
              "& img": {
                maxWidth: "100%", // Make images responsive
                height: "auto",
                marginBottom: "16px", // Add space below images
              },
              "& p": {
                marginBottom: "16px", // Add space between paragraphs
                fontSize: { xs: "16px", sm: "16px", md: "18px" },
              },
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                marginTop: "24px", // Add space above headings
                marginBottom: "16px", // Add space below headings
                fontSize: { xs: "2rem", sm: "2rem", md: "2.5rem" },
              },
              "& ul, & ol": {
                marginBottom: "16px", // Add space below lists
                paddingLeft: "20px", // Ensure proper indentation for lists
              },
              "& li": {
                marginBottom: "8px",
                fontSize: { xs: "14px", sm: "16px", md: "16px" },
              },
              // Make only the table scrollable
              "& .table-container": {
                overflowX: "auto",
                // Enable horizontal scroll for tables
                maxWidth: "100%", // Ensure container doesn't exceed the screen width
                marginBottom: "16px", // Add space below the table
              },
              "& table": {
                width: "100%", // Ensure the table takes up full width of the container
                maxWidth: "100%", // Prevent table from exceeding the container width
                overflowX: "auto", // Allow horizontal scroll if content overflows
                whiteSpace: "nowrap", // Prevent content from wrapping and breaking the layout
              },
              "& td, & th": {
                padding: "8px", // Add padding inside table cells
                textAlign: "left", // Align text in cells to the left
              },
            }}
          >
            {content ? (
              <Box>
                <div className="table-container">{parse(content)}</div>
              </Box>
            ) : (
              "No content available."
            )}
          </Box>
        </Container>
      )}
    </>
  );
};

export default HelpDetail;
