import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import theme from "@/components/theme/Theme";

interface CustomCategoryProps {
  categoryId: string;
  selectedData?: {
    name:string
  };
}
const HelpSubcategoryList: React.FC<CustomCategoryProps> = ({
  categoryId,
  selectedData,
}) => {

  const router = useRouter();
  const { helpCenterByCategoryId } = useSelector((state: any) => state?.help);

  const handleListItemClick = (item: any) => {
     if (typeof window !== "undefined") {                                   
       localStorage.setItem("sub-category", JSON.stringify(item));
     }
    router.push(`/help/${categoryId}/${item?.slugUrl}`);
  };
  return (
    <>
      <Box sx={{ paddingX: "20px" }}>
        <List>
          {!helpCenterByCategoryId?.length ? (
            <Box display="flex" justifyContent="center" alignItems={"center"}>
              <NewReleasesIcon sx={{ mr: 1 }} />{" "}
              <Typography textAlign="center">No Data Available</Typography>
            </Box>
          ) : (
            <Box>
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
                {selectedData?.name}
              </Typography>
              {helpCenterByCategoryId?.map((items: any, key: number) => (
                <ListItem
                  key={key}
                  component="a"
                  sx={{
                    "&.Mui-selected": {
                      color: "#FB8E0B",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    },
                  }}
                  onClick={() => handleListItemClick(items)}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "12px", color: "#f9971e", mr: 2 }}
                  />
                  <ListItemText
                    primary={items.heading}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                          color: "primary.main",
                          cursor: "pointer",
                        },
                      },
                    }}
                  />
                </ListItem>
              ))}
            </Box>
          )}
        </List>
      </Box>
    </>
  );
};

export default HelpSubcategoryList;
