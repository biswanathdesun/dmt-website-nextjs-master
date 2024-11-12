import { Box, Typography, GlobalStyles } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import DMT from "@public/images/DMT.png";

const AnimatedTextCircle: React.FC = () => {
  useEffect(() => {
    const text = document.querySelector(".textRotation") as HTMLElement;
    if (text) {
      text.innerHTML = text.innerText
        .split("")
        .map(
          (char, i) =>
            `<span style="transform:rotate(${i * 8 // Adjusted rotation for smaller text
            }deg) translate(0, -80px);">${char}</span>` // Adjusted translate for smaller text
        )
        .join("");
    }
  }, []);

  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes textRotation": {
            to: {
              transform: "rotate(360deg)",
            },
          },
          ".textRotation span": {
            position: "absolute",
            left: "50%",
            top: "50%",
            transformOrigin: "0 0",
            display: "inline-block",
            fontSize: "16px", // Decreased font size
            fontFamily: "consolas",
            fontWeight: "900",
            whiteSpace: "nowrap",
          },
        }}
      />
      <Box
        sx={{
          position: "relative",
          width: "150px", // Decreased size
          height: "150px", // Decreased size
          borderRadius: "100vmax",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100px", // Decreased size
            height: "100px", // Decreased size
            borderRadius: "100vmax",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Image
            src={DMT}
            alt="Thank You"
            layout="cover"
            style={{
              objectFit: "contain",
              width: "100px", // Decreased size
              height: "100px", // Decreased size
              borderRadius: "100vmax",
            }}
          />
        </Box>
        <Box
          className="textRotation"
          sx={{
            position: "absolute",
            width: "150px", // Decreased size
            height: "150px", // Decreased size
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "textRotation 8s linear infinite",
          }}
        >
          <Typography
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              color: "#000",
              fontSize: "16px", // Decreased font size
              fontWeight: "900",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "consolas",
            }}
          >
            PLAY VIDEO PLAY VIDEO PLAY VIDEO  PLAY VIDEO
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AnimatedTextCircle;
