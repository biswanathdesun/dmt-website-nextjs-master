/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useScroll, useTransform, motion } from "framer-motion";
import StickyImage from "./StickyImage"; // Import the StickyImage component

const Phone = "/gifs/phone.gif";
const Chair = "/gifs/chair.gif";
const Diamond = "/gifs/diamond.gif";
const BrainBulb = "/gifs/brainBulb.gif";

const sections = [
  {
    title: "Benefits",
    subtitle: "We're always there for you",
    text: "Imagine having a dedicated team available at any hour to support your journey. With real-time assistance, you’re never alone, no matter what you need.",
    color: "#A858E8",
    image: Phone,
  },
  {
    title: "Media",
    subtitle: "Ease of Access",
    text: "Picture a platform where everything is effortlessly within reach. From navigating the dashboard to reaching out for support, simplicity is at the core of your experience.",
    color: "#D4E858",
    image: Chair,
  },
  {
    title: "Strategy",
    subtitle: "We're Truly True",
    text: "Visualize a service where surprises come from success, not hidden fees. Our commitment to transparency means what you see is genuinely what you get. ",
    color: "#00F5F5",
    image: Diamond,
  },
  {
    title: "Consulting",
    subtitle: "Borrow Our Brains",
    text: "Think of the advantage of having seasoned professionals guiding your path. Our expertise becomes your secret weapon in elevating your career and expanding your reach.",
    color: "#E85858",
    image: BrainBulb,
  },
];

const BenefitsLg = () => {
  const [currentImage, setCurrentImage] = useState(sections[0].image);

  const handleIntersection = (inView: boolean, index: number) => {
    if (inView) {
      setCurrentImage(sections[index].image);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#FFF",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        zIndex: 1,
        fontFamily: '"Poppins", Sans-serif',
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{ position: "relative", zIndex: 1, paddingLeft: 20 }}
      >
        {/* Scrollable content container */}
        <Grid item xs={12} md={6}>
          {sections.map((section, index) => {
            const { ref, inView } = useInView({
              threshold: 0.5,
              triggerOnce: false,
            });

            useEffect(() => {
              handleIntersection(inView, index);
            }, [inView, index]);

            return (
              <Container
                maxWidth="xl"
                key={index}
                ref={ref}
                id={`section-${index}`}
                sx={{
                  paddingTop: {
                    xs: 5,
                    sm: 10,
                    md: 20,
                    lg: 25,
                    xl: 30,
                  },
                  paddingBottom: {
                    xs: 5,
                    sm: 10,
                    md: 20,
                    lg: 25,
                    xl: index === sections.length - 1 ? 45 : 30, // Add extra padding to the last section
                  },
                }}
              >
                <CharacterAnimation text={section.subtitle} isSubtitle={true} />

                <CharacterAnimation text={section.text} isSubtitle={false} />
              </Container>
            );
          })}
        </Grid>
        {/* Use the StickyImage Component */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <StickyImage currentImage={currentImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

const CharacterAnimation: React.FC<{ text: string; isSubtitle: boolean }> = ({
  text,
  isSubtitle,
}) => {
  const element = useRef<HTMLSpanElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["0.1 0.5", "0.55 0.4"], // Adjusted for animation
  });

  // Different sizes for subtitle and text
  const fontWeight = isSubtitle ? 600 : 100;
  const fontSize = isSubtitle
    ? {
        xl: "50px",
        lg: "40px",
        md: "40px",
        sm: "35px",
        xs: "30px",
      }
    : {
        xs: 20,
        md: 30,
      }; // Decreased font weight
  // Split text by spaces to handle spacing between words
  const words = text.split(" ");

  return (
    <Typography
      sx={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        marginBottom: "20px",
        display: "inline-block",
      }}
    >
      <span
        ref={element}
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
        }}
      >
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            style={{ display: "inline-flex", marginRight: "10px" }}
          >
            {word.split("").map((char, charIndex) => {
              const start = (wordIndex + charIndex / word.length) / text.length;
              const end =
                (wordIndex + (charIndex + 1) / word.length) / text.length;
              const opacity = useTransform(
                scrollYProgress,
                [start, end],
                [0.1, 1] // Adjusted opacity range
              );

              return (
                <Word key={charIndex} opacity={opacity}>
                  {char}
                </Word>
              );
            })}
          </span>
        ))}
      </span>
    </Typography>
  );
};

// Word Component
const Word: React.FC<{ children: React.ReactNode; opacity: any }> = ({
  children,
  opacity,
}) => {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        color: "#FFF", // Ensure the text color is bright
      }}
    >
      <span
        style={{
          position: "absolute",
          opacity: "0.1", // Slightly dimmed background text
        }}
      >
        {children}
      </span>
      <motion.span
        style={{
          opacity,
          transition: "opacity 0.3s ease-in", // Smooth transition for opacity changes
        }}
      >
        {children}
      </motion.span>
      </span>
      
      
  );
};
export default BenefitsLg;
