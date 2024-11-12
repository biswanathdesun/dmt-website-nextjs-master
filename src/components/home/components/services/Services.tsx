"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EastIcon from "@mui/icons-material/East";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomHeading from "@/components/common/CustomHeading";
import { useRouter } from "next/navigation";

const dummyJson = [
  {
    icon: "fluent:music-note-2-20-filled",
    heading: "Music Distribution",
    content: "Distribute your music at 100+ platforms",
    path: "/services-and-pricing?type=music-distribution",
  },
  {
    icon: "mdi:user",
    heading: "Portfolio",
    content: "Create a mini website to showcase your talent",
    path: "/services-and-pricing?type=portfolio",
  },
  {
    icon: "streamline:ai-generate-music-spark-solid",
    heading: "AI Mastering",
    content: "Unleash the power of AI and enhance sound like a professional",
    path: "/services-and-pricing?type=ai-mastering",
  },
  {
    icon: "streamline:customer-support-1-solid",
    heading: "Social Media Management",
    content: "We are here to help you anytime",
    path: "/services-and-pricing?type=social-media-management",
  },
  {
    icon: "lucide:copyright",
    heading: "Copyright",
    content: "Protect your creation “legally”",
    path: "",
  },
];

const Services = () => {
  const sliderRef = useRef<Slider | null>(null);
  const router = useRouter();
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const settings = {
    slidesToShow: 3.5,
    slidesToScroll: 1,
    infinite: false,
    afterChange: (current: number) => {
      if (sliderRef.current) {
        const innerSlider = sliderRef.current.innerSlider as any; // Type assertion
        const totalSlides = innerSlider.props.children.length;
        const slidesToShow = innerSlider.props.slidesToShow;

        setIsPrevDisabled(current === 0);
        setIsNextDisabled(current >= totalSlides - slidesToShow);
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleNext = () => {
    if (sliderRef.current && !isNextDisabled) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current && !isPrevDisabled) {
      sliderRef.current.slickPrev();
    }
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <Box
      sx={{ position: "relative", padding: { sm: 5, xs: "40px 0px 80px 0px" } }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          <CustomHeading text="Services" />

          <Typography
            variant="body1"
            onClick={handlePrev}
            sx={{
              position: "absolute",
              display: { xs: "none", sm: "inline-block" },
              right: { lg: 50, md: 20, sm: 40 },
              zIndex: 10,
              fontSize: "35px",
              color: isPrevDisabled ? "grey" : "black",
              cursor: isPrevDisabled ? "default" : "pointer",
            }}
          >
            <Icon icon="material-symbols:west-rounded" />
          </Typography>

          <Typography
            variant="body1"
            onClick={handleNext}
            sx={{
              position: "absolute",
              display: { xs: "none", sm: "inline-block" },
              right: { lg: 0, md: -20, sm: -0 },
              zIndex: 10,
              fontSize: "35px",
              color: isNextDisabled ? "grey" : "black",
              cursor: isNextDisabled ? "default" : "pointer",
            }}
          >
            <Icon icon="material-symbols:east-rounded" />
          </Typography>
        </Box>
        <Box
          id="slider-container"
          sx={{
            position: "relative",
            overflow: "hidden",
            "& .slick-track": { display: "flex", alignItems: "center" },
          }}
        >
          <Slider ref={sliderRef} {...settings}>
            {dummyJson.map((item, i) => (
              <Box
                key={i}
                sx={{
                  my: 4,
                  padding: 1,
                  "& img": {
                    height: "350px",
                    width: "250px",
                    objectFit: "cover",
                    borderRadius: "15px",
                    cursor: "pointer",
                    transition: ".25s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "10px 10px 10px rgba(0,0,0,0.15)",
                    },
                  },
                }}
              >
                <Card
                  sx={{
                    maxWidth: 360,
                    minHeight: 391,
                    m: "0 auto",
                    p: { sm: 2, xs: 1 },
                    display: "flex !important",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: "black", width: 60, height: 60 }}
                        aria-label="recipe"
                      >
                        <Icon icon={item.icon} width={32} height={32} />
                      </Avatar>
                    }
                  />
                  <CardContent>
                    <Typography variant="h4" sx={{ color: "black" }}>
                      {item.heading}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "black" }}>
                      {item.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        color: "white",
                        background: "black",
                        borderRadius: "50px",
                        textTransform: "none",
                        width: "100%",
                        px: 5,
                        py: 1,
                      }}
                      onClick={() => navigateTo(item.path)}
                    >
                      Know More &nbsp; <EastIcon sx={{ fontSize: "16px" }} />
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
        <Box my={{ xs: -2 }}>
          <Typography
            variant="body1"
            onClick={handlePrev}
            sx={{
              position: "absolute",
              display: { xs: "inline-block", sm: "none" },
              right: { xs: 60, md: 20, sm: 40 },
              zIndex: 10,
              fontSize: "35px",
              color: isPrevDisabled ? "grey" : "black",
              cursor: isPrevDisabled ? "default" : "pointer",
            }}
          >
            <Icon icon="material-symbols:west-rounded" />
          </Typography>

          <Typography
            variant="body1"
            onClick={handleNext}
            sx={{
              position: "absolute",
              display: { xs: "inline-block", sm: "none" },
              right: { xs: 20, md: -20, sm: -0 },
              zIndex: 10,
              fontSize: "35px",
              color: isNextDisabled ? "grey" : "black",
              cursor: isNextDisabled ? "default" : "pointer",
            }}
          >
            <Icon icon="material-symbols:east-rounded" />
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
