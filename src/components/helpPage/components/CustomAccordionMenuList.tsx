"use client";
import React, { useState, useEffect, MouseEvent } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Theme,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getSubCategoryByCategoryAsync } from "@/redux/services/categoryAndSubCategory";
import { helpCenterByCategoryIdAsync } from "@/redux/services/help";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import theme from "@/components/theme/Theme";
import HelpSubcategoryList from "./HelpSubcategoryList";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface CustomSideMenuProps {
  categoryId?: any;
  currentCategory?: any;
  currentSubCategory?: any;
}
const CustomSideMenuList = ({
  categoryId,
  currentCategory,
  currentSubCategory,
}: CustomSideMenuProps) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const categorySelected = searchParams.get("selectedData");
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const handleBackClick = (item: any) => {
    router.push(`/help/${categoryId}`);
  };

  const { isLoading, getSubCategoryByCategory } = useSelector(
    (store: RootState) => store.categoryAndSubCategory
  );
  
  const { isSending } = useSelector((store: RootState) => store.help);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(
    getSubCategoryByCategory
  );

  const selectedData = selectedSubCategory
    ? getSubCategoryByCategory.find(
        (item: any) => item._id === selectedSubCategory
      )
    : null;

  // Get the first category's ID
  const firstSubCategoryId = categorySelected
    ? categorySelected
    : getSubCategoryByCategory[0]?._id;

  const handleItemClick = (clickedItem: any) => {
    const data = {
      categoryId: clickedItem?.categoryId,
      subCategoryId: clickedItem?._id,
    };
    dispatch(helpCenterByCategoryIdAsync(data));
    setSelectedSubCategory(clickedItem?._id);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!params?.slugUrl) {
      const data = {
        categoryId: categoryId,
        type: "help",
      };
      dispatch(getSubCategoryByCategoryAsync(data));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (firstSubCategoryId) {
      setSelectedSubCategory(firstSubCategoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstSubCategoryId, dispatch, setSelectedSubCategory]);

  useEffect(() => {
    if (categoryId && firstSubCategoryId && !params?.slugUrl) {
      const data = {
        categoryId: categoryId,
        subCategoryId: firstSubCategoryId,
      };
      dispatch(helpCenterByCategoryIdAsync(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, categoryId, firstSubCategoryId]);

  const menu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {getSubCategoryByCategory.map((items: any, key: any) => (
        <MenuItem
          key={key}
          onClick={() => handleItemClick(items)}
          selected={selectedSubCategory === items._id}
          sx={{
            "&.Mui-selected": {
              color: "#FB8E0B",
            },
          }}
        >
          <ListItemText primary={items.name} />
        </MenuItem>
      ))}
    </Menu>
  );

  const NoDataAvailable = (
    <Box
      sx={{
        height: "30vh",
        width: getSubCategoryByCategory?.length === 0 ? "100%" : "60vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: "22px",
          color: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NewReleasesIcon sx={{ mr: 1 }} /> No data available..!
      </Typography>
    </Box>
  );

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

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mb: 5 }}>
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
              {currentCategory ?? selectedData?.category}
            </Typography>
          </a>
          {(currentSubCategory || params?.slugUrl) && ( // Required Later
            <Typography
              variant="h6"
              onClick={handleBackClick}
              sx={{
                // color: "gray",
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
              {currentSubCategory ?? selectedData?.name}
            </Typography>
          )}
        </Box>
        {(isLoading && CircularLoader) || (
          <>
            {getSubCategoryByCategory?.length > 0 ? (
              <Grid container spacing={2}>
                {isMobile ? (
                  <>
                    <IconButton
                      color="inherit"
                      aria-label="open menu"
                      edge="start"
                      onClick={handleMenuOpen}
                      sx={{ mr: 2 }}
                    >
                      <MenuIcon />
                    </IconButton>
                    {menu}
                  </>
                ) : (
                  <Grid item xs={3}>
                    {getSubCategoryByCategory.map((items: any, key: number) => (
                      <ListItem key={key} disablePadding>
                        <ListItemButton
                          onClick={() => handleItemClick(items)}
                          selected={selectedSubCategory === items._id}
                          sx={{
                            "&.Mui-selected": {
                              color: "#FB8E0B",
                            },
                          }}
                        >
                          <ListItemText primary={items.name} />
                          <ListItemIcon
                            sx={{
                              "&.Mui-selected": {
                                color: "#FB8E0B",
                              },
                            }}
                          >
                            <ChevronRightIcon />
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </Grid>
                )}

                <Grid
                  item
                  xs={12}
                  md={9}
                  sx={{
                    borderLeft: { md: `1px solid ${theme.palette.divider}` },
                  }}
                >
                  {(isSending && CircularLoader) || (
                    <Box>
                      <HelpSubcategoryList
                        categoryId={categoryId}
                        selectedData={selectedData}
                      />
                      {/* )} */}
                    </Box>
                  )}
                </Grid>
              </Grid>
            ) : (
              NoDataAvailable
            )}
          </>
        )}
      </Container>
    </Box>
  );
};
export default CustomSideMenuList;
