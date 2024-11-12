"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";

// ==> tabs Import <== //
import Music from "./Music";
import Portfolio from "./Portfolio";
import AiMastering from "./AiMastering";
import SocialMedia from "./SocialMedia";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const tabNameToIndex: { [key: string]: number } = {
  "music-distribution": 0,
  "portfolio": 1,
  "ai-mastering": 2,
  "social-media-management": 3
};



export default function TabMenu() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "music-distribution";
  const initialValue = tabNameToIndex[type] ?? 0;
  const [value, setValue] = React.useState(initialValue);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
          <Tab label="Music Distribution" {...a11yProps(0)} />
          <Tab label="Portfolio" {...a11yProps(1)} />
          <Tab label="AI Mastering" {...a11yProps(2)} />
          <Tab label="Social Media Management" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <Container maxWidth="xl">
        <CustomTabPanel value={value} index={0}>
          <Music />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Portfolio />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AiMastering />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <SocialMedia />
        </CustomTabPanel>
      </Container>
    </Box>
  );
}
