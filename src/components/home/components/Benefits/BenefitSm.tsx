/* eslint-disable react-hooks/rules-of-hooks */
// import React from 'react'
// import { Box, Container, Grid, Card, CardMedia, Typography } from '@mui/material'
// import Image from 'next/image';

// function BenefitSm() {
//     const Phone = '/gifs/phone.gif';
//     const Chair = '/gifs/chair.gif';
//     const Diamond = '/gifs/diamond.gif';
//     const BrainBulb = '/gifs/brainBulb.gif';
//     return (
//         <>
//             <Box sx={{
//                 backgroundColor: '#000',
//                 color: '#FFF',
//                 paddingY: 5
//             }}>
//                 <Grid>
//                     <Grid item sm={12} sx={{
//                         textAlign: 'center',
//                     }}>
//                         <Typography sx={{
//                             fontWeight: 700,
//                             fontFamily: "Raleway",
//                             fontSize: { xs: 30, md: 40 },
//                         }}>
//                             Benefit &apos; s
//                         </Typography>
//                     </Grid>
//                     <Container>
//                         <Grid item sm={12} md={6} xl={6} sx={{
//                             textAlign: 'center',
//                         }}>
//                             {/* <Typography sx={{
//                                 fontFamily: '"Inter", Sans-serif',
//                                 fontWeight: '100',
//                                 fontSize: { xs: 20, md: 30 },
//                             }} >Lorem ipsum dolor sit amet consectetur. Laoreet pharetra vitae in ut elit odio nunc. Pellentesque egestas rutrum.</Typography> */}
//                         </Grid>
//                     </Container>
//                 </Grid>
//             </Box>
//             <Box sx={{
//                 backgroundColor: '#000',
//                 color: '#FFF',
//                 paddingY: 5
//             }}>
//                 <Container maxWidth="xl">
//                     <Grid container sx={{ display: 'flex' }} >
//                         <Grid item lg={6} md={6} xs={12} sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: 'flex-start',
//                         }}>
//                             {/* <Typography sx={{
//                                 fontFamily: '"Inter", Sans-serif',
//                                 fontWeight: '700',
//                                 fontSize: { xs: 20, md: 30 },
//                                 color: '#A858E8'
//                             }} >Benefit&apos;s</Typography> */}
//                             <Typography sx={{
//                                 fontFamily: '"Raleway", Sans-serif',
//                                 fontWeight: '600',
//                                 fontSize: { xs: 30, md: 40 },
//                             }} >We&apos;re always there for you</Typography>
//                             <Typography sx={{
//                                 fontFamily: '"Poppins", Sans-serif',
//                                 fontWeight: '100',
//                                 fontSize: { xs: 18, md: 30 },
//                             }}>Imagine having a dedicated team available at any hour to support your journey. With real-time assistance, you&apos;re never alone, no matter what you need.</Typography>
//                         </Grid>
//                         <Grid item md={6} xs={12} sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: {
//                                 xl: 'flex-end',
//                                 md: 'center'
//                             },
//                         }}>
//                             <Card sx={{ width: "100%", bgcolor: '#000' }}>
//                                 <Image
//                                     src={Phone}
//                                     alt="Benefit's"
//                                     layout="responsive"
//                                     width={500} // Provide the original width of the GIF
//                                     height={300} // Provide the original height of the GIF
//                                 />
//                             </Card>
//                         </Grid>
//                     </Grid>
//                     <Grid container sx={{ display: 'flex' }} >
//                         <Grid item lg={6} md={6} xs={12} sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: 'flex-start',
//                         }}>
//                             {/* <Typography sx={{
//                                 fontFamily: '"Inter", Sans-serif',
//                                 fontWeight: '700',
//                                 fontSize: { xs: 20, md: 30 },
//                                 color: '#D4E858'
//                             }} >Media</Typography> */}
//                             <Typography sx={{
//                                 fontFamily: '"Raleway", Sans-serif',
//                                 fontWeight: '600',
//                                 fontSize: { xs: 30, md: 40 },
//                             }} >Ease of Access</Typography>
//                             <Typography sx={{
//                                 fontFamily: '"Poppins", Sans-serif',
//                                 fontWeight: '100',
//                                 fontSize: { xs: 18, md: 30 },
//                             }}>Picture a platform where everything is effortlessly within reach. From navigating the dashboard to reaching out for support, simplicity is at the core of your experience.</Typography>
//                         </Grid>
//                         <Grid item md={6} xs={12} sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: {
//                                 xl: 'flex-end',
//                                 md: 'center'
//                             },
//                         }}>
//                             <Card sx={{ width: "100%", bgcolor: '#000' }}>
//                                 <Image
//                                     src={Chair}
//                                     alt="Media"
//                                     layout="responsive"
//                                     width={500} // Provide the original width of the GIF
//                                     height={300} // Provide the original height of the GIF
//                                 />
//                             </Card>
//                         </Grid>
//                     </Grid>
//                     <Grid container sx={{ display: 'flex' }} >
//                         <Grid item lg={6} md={6} xs={12} sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: 'flex-start',
//                         }}>
//                             {/* <Typography sx={{
//                                 fontFamily: '"Inter", Sans-serif',
//                                 fontWeight: '700',
//                                 fontSize: { xs: 20, md: 30 },
//                                 color: '#00F5F5'
//                             }} >Strategy</Typography> */}
//                             <Typography sx={{
//                                 fontFamily: '"Raleway", Sans-serif',
//                                 fontWeight: '600',
//                                 fontSize: { xs: 30, md: 40 },
//                             }} >We&apos;re Truly True</Typography>
//                             <Typography sx={{
//                                 fontFamily: '"Poppins", Sans-serif',
//                                 fontWeight: '400',
//                                 fontSize: { xs: 18, md: 30 },
//                             }}>Visualize a service where surprises come from success, not hidden fees. Our commitment to transparency means what you see is genuinely what you get.</Typography>
//                         </Grid>
//                         <Grid item md={6} xs={12} sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: {
//                                 xl: 'flex-end',
//                                 md: 'center'
//                             },
//                         }}>
//                             <Card sx={{ width: "100%", bgcolor: '#000' }}>
//                                 <Image
//                                     src={Diamond}
//                                     alt="Strategy"
//                                     layout="responsive"
//                                     width={500} // Provide the original width of the GIF
//                                     height={300} // Provide the original height of the GIF
//                                 />
//                             </Card>
//                         </Grid>
//                     </Grid>
//                     <Grid container sx={{ display: 'flex' }} >
//                         <Grid item lg={6} md={6} xs={12} sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: 'flex-start',
//                         }}>
//                             {/* <Typography sx={{
//                                 fontFamily: '"Inter", Sans-serif',
//                                 fontWeight: '700',
//                                 fontSize: { xs: 20, md: 30 },
//                                 color: '#E85858'
//                             }} >Consulting</Typography> */}
//                             <Typography sx={{
//                                 fontFamily: '"Raleway", Sans-serif',
//                                 fontWeight: '600',
//                                 fontSize: { xs: 30, md: 40 },
//                             }} >Borrow Our Brains</Typography>
//                             <Typography sx={{
//                                 fontFamily: '"Poppins", Sans-serif',
//                                 fontWeight: '400',
//                                 fontSize: { xs: 18, md: 30 },
//                             }}>Think of the advantage of having seasoned professionals guiding your path. Our expertise becomes your secret weapon in elevating your career and expanding your reach.</Typography>
//                         </Grid>
//                         <Grid item md={6} xs={12} sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: {
//                                 xl: 'flex-end',
//                                 md: 'center'
//                             },
//                         }}>
//                             <Card sx={{ width: "100%", bgcolor: '#000' }}>
//                                 <Image
//                                     src={BrainBulb}
//                                     alt="Consulting"
//                                     layout="responsive"
//                                     width={500} // Provide the original width of the GIF
//                                     height={300} // Provide the original height of the GIF
//                                 />
//                             </Card>
//                         </Grid>
//                     </Grid>
//                 </Container>
//             </Box>
//         </>
//     )
// }

// export default BenefitSm

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const Phone = "/gifs/phone.gif";
const Chair = "/gifs/chair.gif";
const Diamond = "/gifs/diamond.gif";
const BrainBulb = "/gifs/brainBulb.gif";

const sections = [
  {
    title: "We're always there for you",
    text: "Imagine having a dedicated team available at any hour to support your journey. With real-time assistance, you’re never alone, no matter what you need.",
    image: Phone,
    color: "#A858E8",
  },
  {
    title: "Ease of Access",
    text: "Picture a platform where everything is effortlessly within reach. From navigating the dashboard to reaching out for support, simplicity is at the core of your experience.",
    image: Chair,
    color: "#D4E858",
  },
  {
    title: "We're Truly True",
    text: "Visualize a service where surprises come from success, not hidden fees. Our commitment to transparency means what you see is genuinely what you get.",
    image: Diamond,
    color: "#00F5F5",
  },
  {
    title: "Borrow Our Brains",
    text: "Think of the advantage of having seasoned professionals guiding your path. Our expertise becomes your secret weapon in elevating your career and expanding your reach.",
    image: BrainBulb,
    color: "#E85858",
  },
];

const BenefitSm = () => {
  return (
    <Box sx={{ backgroundColor: "#000", color: "#FFF", paddingY: 5 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {sections.map((section, index) => {
            const { title, image } = section;
            const controls = useAnimation();
            const [, inView] = useInView({
              threshold: 0.5,
              triggerOnce: false, // Animation should only trigger once when the section first comes into view
            });

            useEffect(() => {
              if (inView) {
                controls.start({
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                });
              } else {
                controls.start({
                  opacity: 0,
                  y: 50,
                });
              }
            }, [inView, controls]);

            return (
              <Grid
                container
                item
                xs={12}
                key={index}
                spacing={2}
                sx={{ marginBottom: 4 }}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CharacterAnimation text={section.title} isSubtitle={true} />

                  <CharacterAnimation text={section.text} isSubtitle={false} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Image
                    src={image}
                    alt={title}
                    layout="responsive"
                    width={500}
                    height={300}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Container>
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
    offset: ["0.35 0.5", "0.55 0.4"],
  });

  const fontWeight = isSubtitle ? 600 : 400;
  const fontSize = isSubtitle
    ? {
        xl: "50px",
        lg: "40px",
        md: "40px",
        sm: "35px",
        xs: "30px",
      }
    : {
        xs: 18,
        sm: 22,
      };
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
                [0.2, 1] // Adjusted opacity range
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
export default BenefitSm;
