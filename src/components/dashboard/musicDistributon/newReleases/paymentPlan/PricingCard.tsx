"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
  IconButton,
  InputLabel
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PricingCardProps {
  setPlanData?: (data: any) => void;
  planData: {
    title: string;
  };
}

function SampleNextArrow(props:any) {
  const { className, onClick } = props;
  return (
    <IconButton
      sx={{
        // background: "linear-gradient(180deg, #DCDCDC, #ff8B00)",
        // height: 50,
        // width: 50,
        // borderRadius: "50%",
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon
        style={{
          color: "#27454A"
        }}
      />
    </IconButton>
  );
}

function SamplePrevArrow(props :any) {
  const { className, onClick } = props;
  return (
    <IconButton
      sx={{
        // background: "linear-gradient(180deg, #DCDCDC, #AF8F6F)",
        // height: 50,
        // width: 50,
        // borderRadius: "50%",
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex:1
      }}
      onClick={onClick}
    >
      <ArrowBackIosIcon
        style={{
          color: "#27454A"
        }}
      />
    </IconButton>
  );
}

const PricingCard: React.FC<PricingCardProps> = ({ setPlanData, planData }) => {
  const dispatch: AppDispatch = useDispatch();
  const { plans } = useSelector((state: RootState) => state?.plans);
  const paymentPlansData = [
    {
      price: plans[0]?.price || 0,
      productId: plans[0]?.productId,
      title: "Starter",
      productName: plans[0]?.productName,
      _id: plans[0]?._id,
      description: "For most businesses that want to optimize web queries",
      features: [
        "Song/s Distribution - Unlimited",
        "Artist Care - ASAP",
        "Distribution Time - ASAP",
        "Dolby Atom Audio Distribution + Apple Motion Graphics - No",
        "AI Mastering - No",
        "Spotify & Apple Verification - No",
        "Official YouTube Artist Channel Request - No"
      ],
      buttonText: "Choose plan",
      popular: false
    },
    {
      price: plans[1]?.price || 1999,
      productId: plans[1]?.productId,
      productName: plans[1]?.productName,
      title: "Standard",
      _id: plans[0]?._id,
      description: "For most businesses that want to optimize web queries",
      features: [
        "Song/s Distribution - 1",
        "Artist Care - ASAP",
        "Distribution Time - ASAP",
        "Dolby Atom Audio Distribution + Apple Motion Graphics - 999",
        "AI Mastering - 999",
        "Spotify & Apple Verification - No",
        "Official YouTube Artist Channel Request - No"
      ],
      buttonText: "Choose plan",
      popular: false
    },
    {
      price: plans[2]?.price || 5999,
      productId: plans[2]?.productId,
      productName: plans[2]?.productName,
      _id: plans[0]?._id,
      title: "Professional",
      description: "For most businesses that want to optimize web queries",
      features: [
        "Song/s Distribution - 10 (In 1 Year)",
        "Artist Care - 72 Hours",
        "Distribution Time - 72 Hours",
        "Dolby Atom Audio Distribution + Apple Motion Graphics - 1999",
        "AI Mastering - 1999",
        "Spotify & Apple Verification - No",
        "Official YouTube Artist Channel Request - No"
      ],
      buttonText: "Choose plan",
      popular: true
    },
    {
      price: plans[3]?.price || 9999,
      productId: plans[3]?.productId,
      productName: plans[3]?.productName,
      _id: plans[0]?._id,
      title: "Pro",
      description: "For most businesses that want to optimize web queries",
      features: [
        "Song/s Distribution - Unlimited (In 1 Year)",
        "Artist Care - 48 Hours",
        "Distribution Time - 48 Hours",
        "Dolby Atom Audio Distribution + Apple Motion Graphics - Free",
        "AI Mastering - Free",
        "Spotify & Apple Verification - Done",
        "Official YouTube Artist Channel Request - Done"
      ],
      buttonText: "Choose plan",
      popular: false
    }
  ];

  console.log(planData,'plan')

  const settings = {
    dots: false, // Pagination dots
    infinite: true,
    arrows: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 2, // Show 3 cards on large screens
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200, // lg breakpoint
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const theme = useTheme();

  const handleClick = (pricing: any) => {
    if (setPlanData) {
      setPlanData({
        price: pricing?.price,
        productName: pricing?.productName,
        productId: pricing?.productId,
        _id: pricing?._id,
        title: pricing?.title
      });
    }
  };

  return (
    <Box>
      <Slider {...settings}>
        {paymentPlansData?.map((plan: any, index: number) => (
          <Box
            key={index}
            sx={{
              display: "flex !important",
              justifyContent: "center",
              alignItems: "center",
              
            }}
          >
            <Card
              onClick={() => handleClick(plan)}
              sx={{
                width: "100%",
                maxWidth: "400px",
                cursor: "pointer",
                borderRadius: "16px",
                padding: {xs: '5px' ,sm:"10px"},
                position: "relative",
                margin: "16px",
                transition:
                  "transform 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                transform:
                  planData?.title === plan.title ? "scale(1.05)" : "scale(1)",
                boxShadow:
                  planData?.title === plan.title
                    ? "0 8px 30px rgba(0, 0, 0, 0.3)"
                    : "0 4px 20px rgba(0, 0, 0, 0.2)",
                backgroundColor:
                  planData?.title === plan.title
                    ? theme.palette.primary.main
                    : "white",
                color:
                  planData?.title === plan.title
                    ? theme.palette.primary.contrastText
                    : "inherit",
                "& .MuiTypography-root": {
                  color: planData?.title === plan.title ? "white" : "inherit"
                },
                "& .MuiButton-root": {
                  color:
                    planData?.title === plan.title
                      ? "white"
                      : theme.palette.primary.main,
                  backgroundColor:
                    planData?.title === plan.title ? "black" : "inherit"
                },
                "& .MuiIconButton-root": {
                  color: planData?.title === plan.title ? "white" : "inherit"
                },
                "& .MuiInputLabel-root": {
                  color: planData?.title === plan.title ? "white" : "inherit"
                }
              }}
            >
              {plan?.popular && (
                <Button
                  variant="outlined"
                  sx={{
                    position: "absolute",
                    right: 15,
                    marginTop: "16px",
                    color: theme.palette.primary.main,
                    textTransform: "capitalize",
                    borderRadius: "50px",
                    fontSize: "10px",
                    borderColor: theme.palette.primary.main,
                    "&:hover": {
                      color: "white"
                    }
                  }}
                >
                  Most Popular
                </Button>
              )}
              <CardContent>
                <Typography
                  variant="h5"
                  component="span"
                  sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                >
                  ₹ {plan?.price}
                  <InputLabel sx={{ fontSize: "18px" }}>
                    {plan?.price === 999 || plan?.price === 0 ? "" : "/ Year"}
                  </InputLabel>
                </Typography>
                <Typography variant="h6" component="div" gutterBottom>
                  {plan?.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {plan?.description}
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    padding: 0,
                    listStyleType: "none",
                    marginTop: "16px",
                    color: "inherit"
                  }}
                >
                  {plan?.features?.map((feature: any, index: number) => (
                    <Box
                      component="li"
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                        color: "inherit"
                      }}
                    >
                      <IconButton
                        component="span"
                        sx={{
                          marginRight: "8px",
                          color: "inherit"
                        }}
                      >
                        <Icon icon="iconamoon:check-duotone" />
                      </IconButton>
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    marginTop: "16px",
                    color: theme.palette.primary.main,
                    textTransform: "capitalize",
                    borderRadius: "50px",
                    width: "100%",
                    borderColor: theme.palette.primary.main,
                    "&:hover": {
                      color: "white",
                      backgroundColor: "black"
                    }
                  }}
                >
                  {plan?.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default PricingCard;