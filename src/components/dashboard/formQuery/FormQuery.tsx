"use client";
import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  Button,
  Breadcrumbs,
  Container,
  CardContent,
  Typography,
} from "@mui/material";
import CustomBreadcrumbs from "@/components/common/CustomBreadcrumbs";
import Link from "next/link";

function FormQuery() {
  const cards = [
    {
      title: "YouTube Claim Request",
      url: "https://forms.zohopublic.in/mytune/form/Test/formperma/3tRbnDyTjvOooWEw6wBdpFTlObVVrFa9pSIM22Le8DU",
    },
    {
      title: "Social Media Linking/ OAC Request",
      url: "https://forms.zohopublic.in/mytune/form/SocialMediaLinkingOACRequest/formperma/p082Y0hLeMT4ZS7_nKxaJIfmHRFsy268lpWrH1xoGas",
    },
    {
      title: "Call back request",
      url: "https://forms.zohopublic.in/mytune/form/CallBackRequest/formperma/bsUfHze2bbeDx9fNnL9ZFG4T2svs3NSFOfFUX9RDi40",
    },
    {
      title: "Editorial Pitch",
      url: "https://forms.zohopublic.in/mytune/form/EditorialPitch/formperma/7TMO6NCwA5qnjZr-jNecTfAbm1OhsxyAXiDLZFZul7U",
    },
    {
      title: "Label Request Form",
      url: "https://zfrmz.in/WWWv4iUyjvgDL5hvfkWx",
    },
    {
      title: "Discovery+ Request Form",
      url: "https://zfrmz.in/yCVgyqiPEtGzfUKpMay5",
    },
    {
      title: "Disable Music Distribution and Close Music Distribution",
      url: "https://zfrmz.in/FFXMfCFIsfOIdTlN3EXY",
    },
    {
      title: "Deliver My Tune Affiliate Program ",
      url: "https://zfrmz.in/X2NhRNDMTnjPbclCweBC",
    },
  ];

  return (
    <>
      <CustomBreadcrumbs
        heading="Form Query"
        activeLast
        sx={{
          fontSize: "40px",
          fontWeight: "bolder",
          marginTop: 5,
        }}
        links={[]}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingBottom: {
            sm: 0,
            xs: 5,
          },
          gap: 3,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
              width: {
                sm: 350,
                xs: 320,
              },
              height: 200,
              padding: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignContent: "center",
            }}
          >
            <CardContent>
              <Typography
                fontWeight={"bold"}
                textAlign={"center"}
                sx={{
                  fontSize: { md: 20, xs: 18 },
                  mb: { xs: "5px", sm: 1 },
                }}
              >
                {card.title}
              </Typography>
            </CardContent>
            <CardActionArea>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link href={card.url} passHref legacyBehavior>
                  <Button
                    variant="contained"
                    fullWidth
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "white",
                      "&:hover": {
                        color: "white",
                        bgcolor: "#000",
                        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                    // onClick={ }
                  >
                    Fill Form
                  </Button>
                </Link>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default FormQuery;
