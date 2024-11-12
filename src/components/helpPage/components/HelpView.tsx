"use client";
import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Container,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface HelpPageProps {
  listData: any;
}

const HelpView: React.FC<HelpPageProps> = ({ listData }) => {
  const router = useRouter();

  const handleCategoryClick = (item: any) => {
    router.push(`/help/${item?._id}`);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        my:5,
        px: {
          xl: 6,
          md: 3,
          sm: 2,
        },
      }}
    >
      {/* <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)"
        }}
      > */}

      <Typography variant="h5" sx={{mb:3, ml:5}}>Category List</Typography>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={3}
        sx={{
          justifyContent: "center",
          marginY: 3,
          gap: 4,
          position: "relative",
        }}
      >
        {listData?.map((item: any, index: number) => (
          <Card
            key={index}
            sx={{
              width: 300,
              borderRadius: 2,
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#DBA16C1A",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick(item)}
          >
            <CardMedia
              sx={{
                height: 150,
                width: 150,
                borderRadius: "50%",
                mt: 2,
                mx: "auto",
                textAlign:"left"
              }}
              image={item?.image ?? ""}
              title={item?.title}
            />
            <CardContent>
              <Typography
                gutterBottom
                
                variant="h6"
                fontWeight={700}
              >
                {item?.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                }}
              >
                <Tooltip title={item.description} placement="right">
                  {item.description}
                </Tooltip>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default HelpView;
