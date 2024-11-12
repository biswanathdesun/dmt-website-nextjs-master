"use client";
import { Icon } from "@iconify/react";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function AutoPlay() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <Box className="slider-container" sx={{ backgroundColor: "black" }}>
      <Slider {...settings}>
        {data?.map((item, index) => (
          <Stack key={index} padding={2} sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Icon icon={item?.icon} color="white" width={30}/> */}
              <Typography
                variant="subtitle2"
                color="white"
                fontSize={18}
                padding={1}
              >
                {item?.name}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Slider>
    </Box>
  );
}

const data = [
  {
    icon: "mdi:dropbox",
    name: "7 Digital",
  },
  {
    icon: "mdi:dropbox",
    name: "AppleMusic",
  },
  {
    name: "AWA",
    icon: "mdi:dropbox",
  },
  {
    icon: "mdi:dropbox",
    name: "Boomplay",
  },
  {
    icon: "mdi:dropbox",
    name: "Deezer",
  },
  {
    icon: "mdi:dropbox",
    name: "Facebook Audio Library",
  },
  {
    icon: "mdi:dropbox",
    name: "Facebook Fingerprinting",
  },
  {
    icon: "mdi:dropbox",
    name: "Fizy",
  },
  {
    icon: "mdi:dropbox",
    name: "iHeartRadio",
  },
  {
    icon: "mdi:dropbox",
    name: "JioSaavn",
  },
  {
    icon: "mdi:dropbox",
    name: "joox",
  },
  {
    icon: "mdi:dropbox",
    name: "Melon/Kakao",
  },
  {
    icon: "mdi:dropbox",
    name: "KKBox",
  },
  {
    icon: "mdi:dropbox",
    name: "Lime Music",
  },
  {
    icon: "mdi:dropbox",
    name: "Mixcloud",
  },
  {
    icon: "mdi:dropbox",
    name: "Neurotic Media",
  },
  {
    icon: "mdi:dropbox",
    name: "Nuuday",
  },
  {
    icon: "mdi:dropbox",
    name: "Pandora",
  },
  {
    icon: "mdi:dropbox",
    name: "Primephonic",
  },
  {
    icon: "mdi:dropbox",
    name: "SoundCloud",
  },
  {
    icon: "mdi:dropbox",
    name: "Spotify",
  },
  {
    icon: "mdi:dropbox",
    name: "Tidle",
  },
  {
    icon: "mdi:dropbox",
    name: "TikTok",
  },
  {
    icon: "mdi:dropbox",
    name: "UMA",
  },
  {
    icon: "mdi:dropbox",
    name: "yandex Music",
  },
  {
    icon: "mdi:dropbox",
    name: "Shazam",
  },
  {
    icon: "mdi:dropbox",
    name: "Amazon Music",
  },
  {
    icon: "mdi:dropbox",
    name: "Gracenote",
  },
  {
    icon: "mdi:dropbox",
    name: "Hungama",
  },
  {
    icon: "mdi:dropbox",
    name: "Kuack Media",
  },

  {
    icon: "mdi:dropbox",
    name: "Google Music",
  },

  {
    icon: "mdi:dropbox",
    name: "YouTube",
  },

  {
    icon: "mdi:dropbox",
    name: "YouTubeMusic",
  },

  {
    icon: "mdi:dropbox",
    name: "HitsNL",
  },
  {
    icon: "mdi:dropbox",
    name: "Google music",
  },

  {
    icon: "mdi:dropbox",
    name: "Simfy Africa",
  },

  {
    icon: "mdi:dropbox",
    name: "Alibaba (Xiami)",
  },

  {
    icon: "mdi:dropbox",
    name: "Boomplay",
  },

  {
    icon: "mdi:dropbox",
    name: "1AM+",
  },

  {
    icon: "mdi:dropbox",
    name: "TimMusic",
  },
];
