import React, { useState, useEffect, MouseEvent } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
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
import theme from "../theme/Theme";
import CustomAccordion from "./CustomAccordian";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { videoListByCategoryIdAsync } from "@/redux/services/video";
import { getSubCategoryByCategoryAsync } from "@/redux/services/categoryAndSubCategory";
import { getFAQListByIdAsync } from "@/redux/services/faq";
import CustomBreadcrumbs from "./CustomBreadcrumbs";
import VideoCard from "./VideoCard";
import { helpCenterByCategoryIdAsync } from "@/redux/services/help";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import HelpSubcategoryList from "../helpPage/components/HelpSubcategoryList";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

interface CustomSideMenuProps {
  categoryId?: any;
  viewType: string;
  currentCategory?: any;
}

const CustomSideMenuList = ({
  categoryId,
  viewType,
  currentCategory,
}: CustomSideMenuProps) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const { isLoading, getSubCategoryByCategory } = useSelector(
    (store: RootState) => store.categoryAndSubCategory
  );
  const { getFAQListById, isFAQLoading } = useSelector(
    (store: RootState) => store.faq
  );

  const { videoListByCategoryId, isVideoLoading } = useSelector(
    (store: RootState) => store.video
  );

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
  const firstSubCategoryId = getSubCategoryByCategory[0]?._id;

  const handleItemClick = (clickedItem: any) => {
    const data = {
      categoryId: clickedItem?.categoryId,
      subCategoryId: clickedItem?._id,
    };

    dispatch(
      viewType === "faq"
        ? getFAQListByIdAsync(data)
        : videoListByCategoryIdAsync(data)
    );

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
    const data = {
      categoryId: categoryId,
      type: viewType,
    };
    dispatch(getSubCategoryByCategoryAsync(data));
  }, [categoryId, dispatch, viewType]);

  useEffect(() => {
    if (firstSubCategoryId) {
      setSelectedSubCategory(firstSubCategoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstSubCategoryId, dispatch, setSelectedSubCategory]);

  useEffect(() => {
    if (viewType && categoryId) {
      const data = {
        categoryId: categoryId,
        subCategoryId: firstSubCategoryId,
      };

      if (viewType === "faq" && firstSubCategoryId) {
        dispatch(getFAQListByIdAsync(data));
      }
      if (viewType === "video" && firstSubCategoryId) {
        dispatch(videoListByCategoryIdAsync(data));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, viewType, categoryId, firstSubCategoryId]);

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

  const NoDataAvilabel = (
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
            href={`/${viewType === "video" ? "video-gallery" : viewType}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#f9971e",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  textDecoration: "underLine",
                },
              }}
            >
              <FormatListBulletedIcon
                sx={{
                  fontSize: "20px",
                  color: "#f9971e",
                  mr: 1,
                }}
              />
              {currentCategory}
            </Typography>
          </a>
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
                    <List>
                      {getSubCategoryByCategory.map(
                        (items: any, key: number) => (
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
                        )
                      )}
                    </List>
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
                  {viewType === "video" ? (
                    <>
                      {selectedData ? (
                        <>
                          {isVideoLoading ? (
                            CircularLoader
                          ) : (
                            <>
                              <Typography
                                variant="h4"
                                sx={{
                                  mb: 4,
                                  pb: 2,
                                  borderBottom: `1px solid ${theme.palette.divider}`,
                                  fontWeight: 600,
                                }}
                                color="initial"
                              >
                                {selectedData.name}
                              </Typography>
                              <Grid container spacing={2}>
                                <Box sx={{ p: 4 }}>
                                  {videoListByCategoryId.length > 0 ? (
                                    <VideoCard items={videoListByCategoryId} />
                                  ) : (
                                    NoDataAvilabel // No Data Availabel Message
                                  )}
                                </Box>
                              </Grid>
                            </>
                          )}
                        </>
                      ) : (
                        NoDataAvilabel // No Data Availabel Message
                      )}
                    </>
                  ) : viewType === "help" ? (
                    <HelpSubcategoryList
                      categoryId={categoryId}
                      // selectedData={selectedData}
                    />
                  ) : (
                    <>
                      {selectedData && (
                        <>
                          {(isFAQLoading && CircularLoader) || (
                            <>
                              <Typography
                                variant="h4"
                                sx={{
                                  mb: 4,
                                  pb: 2,
                                  borderBottom: `1px solid ${theme.palette.divider}`,
                                  fontWeight: 600,
                                }}
                                color="initial"
                              >
                                {selectedData.name}
                              </Typography>

                              <Box>
                                {getFAQListById && getFAQListById.length > 0 ? (
                                  <CustomAccordion
                                    items={getFAQListById.map((faq: any) => ({
                                      title: faq.question,
                                      content: faq.answer,
                                    }))}
                                  />
                                ) : (
                                  NoDataAvilabel // No Data Availabel Message
                                )}
                              </Box>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
            ) : (
              NoDataAvilabel
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default CustomSideMenuList;
