"use client";

import * as React from "react";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { styled } from "@mui/system";
import { Container } from "@mui/material";
import Artist from "./Artist";
import Lable from "./Lable";
import Discovery from "./Discovery";

export default function ButtonTabs() {
  return (
    <Tabs defaultValue={0}>
      <Container sx={{ display: "grid", justifyContent: "center" }}>
        <TabsList>
          <Tab value={0}>Artist</Tab>
          <Tab value={1}>Label</Tab>
          <Tab value={2}>Discovery+</Tab>
        </TabsList>
      </Container>
      <TabPanel value={0}>
        <Artist />
      </TabPanel>
      <TabPanel value={1}>
        <Lable />
      </TabPanel>
      <TabPanel value={2}>
        <Discovery />
      </TabPanel>
    </Tabs>
  );
}

const orange = {
  50: "#FB8E0B",
};

const grey = {
  200: "#DAE2ED",
  900: "#1C2025",
};



const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #555555;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 70px;
  display: flex;
  justify-content: center;
  &:focus {
    color: #555555;
    outline: 3px solid #ffffff;
  }
  &.${tabClasses.selected} {
    background-color: ${orange[50]};
    color: #ffffff;
  }
`;
const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
//   // min-width: 400px;
//  width:70px;
  background-color: #ffffff;
  border-radius: 70px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 5px 5px 30px ${theme.palette.mode === "dark" ? grey[900] : grey[200]
    };
  `
);
