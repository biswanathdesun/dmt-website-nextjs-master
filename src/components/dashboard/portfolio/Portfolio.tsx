"use client";
import * as React from "react";
import { Box } from "@mui/material";
import PortfolioField from "./PortfolioField";
import PortfolioCard from "./PortfolioCard";
import { useRouter } from "next/navigation";

interface DummyJSONData {
  label: string;
  data: any[];
}

const tcData: { [key: string]: DummyJSONData } = {
  "the:": {
    label: "Create Your Customizable Musical Profile",
    data: [
      {
        lable:
          "At Deliver My Tune, we understand the importance of having a professional online presence to showcase your talent and connect with your audience. Our Artist Portfolio service offers you a powerful tool to create a personalized musical profile, integrating all your music, videos, and updates in one place.",
        data: [
          {
            title: "What to Expect from Our Artist Portfolio Service:",
          },
          {
            title: "1.    Customizable Themes:",
          },
          {
            title: "Variety of Designs:",
            content:
              "Choose from a range of professionally designed themes that reflect your unique style.",
          },
          {
            title: "Personalization:",
            content:
              "Customize colors, fonts, and layouts to create a portfolio that truly represents you.",
          },
          {
            title: "2.  Easy Editing and Customization:",
            content:
              "User-Friendly Interface: Our intuitive tools make it easy to edit and update your portfolio.",
          },
          {
            content:
              "Flexible Content: Add and update your bio, images, and links effortlessly.",
          },
          {
            title: "3.  Integrated Music Links:",
            content:
              "Music Streaming: Link your Spotify, Apple Music, and YouTube accounts directly to your portfolio.",
          },
          {
            content:
              "Direct Access: Visitors can listen to your tracks and watch your videos without leaving your profile.",
          },
          {
            title: "4.  Blog and Post Features:",
            content:
              "Engage Your Audience: Write posts and updates to share your latest news, stories, and upcoming events.",
          },
          {
            content:
              "Content Management: Easily manage and organize your posts.",
          },
          {
            title: "5.  Shareable Link:",
            content:
              "Easy Sharing: Share your portfolio link with fans, collaborators, and industry professionals.",
          },
          {
            content:
              "Professional Presentation: Present a comprehensive view of your musical journey and achievements.  ",
          },
        ],
      },
    ],
  },

  "Benefits of Using Our Artist Portfolio Service:": {
    label: "Benefits of Using Our Artist Portfolio Service:",
    data: [
      {
        lable: "",
        data: [
          {
            title: "Professional Online Presence:",
            content:
              "Showcase your music and artistic vision with a well-designed portfolio.",
          },
          {
            title: "2. Centralized Content :",
            content:
              "Keep all your music, videos, and updates in one place, making it easy for visitors to explore and engage with your content.",
          },
          {
            title: "3. Enhanced Visibility:",
            content:
              " Increase your reach by sharing your portfolio link with new fans and industry contacts.",
          },
          {
            title: "4. User-Friendly Tools: ",
            content:
              " Create, edit, and maintain your portfolio without needing any technical skills.",
          },
        ],
      },
    ],
  },
  "Artwork or Cover Art": {
    label: "What Not to Expect:",

    data: [
      {
        lable: "",
        data: [
          {
            title: "1. Custom Coding:",
            content:
              " The service does not include custom coding or advanced web development features.",
          },
          {
            title: "2. Full Website Functionality:",
            content:
              "This is a portfolio service designed to showcase your music and related content, not a full-fledged website builder.",
          },
          {
            title: "3. Unlimited Customization::",
            content:
              "While you can personalize themes and layouts, the customization options are within the provided templates and settings.",
          },
        ],
      },
    ],
  },
  Meta: {
    label: "Pricing and Plans:",
    data: [
      {
        lable:
          "Choose any theme you link, all theme pricing is a yearly pricing so you can choose to change the theme every year. ",
        data: [
          {
            title: "How It Works:",
            content: "",
          },
          {
            title: "1. Sign Up: ",
            content: "Use proper capitalization and grammar.",
          },
          {
            title: "2. Choose Your Plan: ",
            content:
              "Select the portfolio plan that best suits your needs and budget.",
          },
          {
            title: "3. Build Your Portfolio:",
            content:
              " Use our easy-to-use tools to customize and populate your portfolio with your music, videos, and updates.",
          },
          {
            title: "4. Share Your Link:",
            content:
              "Once your portfolio is ready, share it with your audience and industry contacts to start showcasing your talent.",
          },
        ],
      },
    ],
  },
};

function Portfolio() {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const handleClose = () => {
    router.back();
    setOpen(false);
  };

  const handleContinue = () => {
    setOpen(false);
  };

  return (
    <Box>
      <PortfolioField
        tcData={tcData}
        open={open}
        handleClose={handleClose}
        handleContinue={handleContinue}
      />
      <PortfolioCard></PortfolioCard>
    </Box>
  );
}

export default Portfolio;
