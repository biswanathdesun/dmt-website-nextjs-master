"use client";
import { useRouter } from "next/navigation";
import {
  Typography,
  Box,
  List,
  ListItemText,
  ListItemButton,
  Container,
  ListItem,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useState } from "react";

interface CategoryListInterface {
  viewType: string;
  categoryList: any[];
}

export default function CategoryListPage({
  viewType,
  categoryList,
}: CategoryListInterface) {

  const router = useRouter();
  const [categoryName, setCategoryName] = useState();

  const handleListItemClick = (items: any) => {
    setCategoryName(viewType === "faq" ? items?.name : items?.title);

     if (viewType === "faq") {
       router.push(`/faq/${items?._id}?category=${items?.name}`);
     } else if (viewType === "video" ) {
       router.push(`/video-gallery/${items?._id}?category=${items?.title}`);
     }

  };

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Category List
        </Typography>

        <List>
          {categoryList?.map((items: any) => (
            <ListItem
              key={items.id}
              sx={{
                width: "100%",
                "&:hover": {
                  color: "#FB8E0B",
                  textDecoration: 'underLine',
                  cursor:'pointer'
                },
              }}
              onClick={() => handleListItemClick(items)}
            >
              <FiberManualRecordIcon
                sx={{ fontSize: "12px", color: "#f9971e", mr: 2 }}
              />
              <ListItemText
                primary={viewType === "faq" ? items.name : items.title}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 500,
                    fontSize: "18px",
                    "&:hover": {
                      color: "#f9971e",
                      cursor: "pointer",
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
