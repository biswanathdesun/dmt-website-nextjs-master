"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab, styled, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/FiberManualRecord";
import AudioDetails from "./audioDetails/AudioDetails";
import ReviewTheReleasePage from "../reviewTheRelease/ReviewTheRelease";
import UploadAudio from "./UploadAudio";
import UploadArtWork from "./UploadArtWork";
import PlatFormsStores from "./platForms/PlatFormsStores";
import CheckList from "./checkList/CheckList";
import PaymentPlan from "./paymentPlan/PaymentPlan";
import Confirmation from "./PaymentConfirmation/Confirmation";
import { useSearchParams } from "next/navigation";
import NewReleaseTNC from "../../component/NewReleaseTNC";

const ColorCheckCircleIcon = styled(CheckCircleIcon)(({ theme }) => ({
  color: "#F17D10"
}));

const ColorCircleIcon = styled(CircleIcon)(({ theme }) => ({
  color: "#F17D10",
  border: `2px solid #F17D10`,
  borderRadius: "50%"
}));

const CustomTabIcon: React.FC<{ active?: boolean; completed?: boolean }> = ({
  active,
  completed
}) => {
  if (completed) {
    return <ColorCheckCircleIcon />;
  }
  if (active) {
    return <ColorCircleIcon />;
  }
  return <RadioButtonUncheckedIcon />;
};

const CustomTabLabel = styled(Box)<{ active?: boolean; completed?: boolean }>(
  ({ active, completed }) => ({
    "& .MuiTab-wrapper": {
      backgroundColor: completed ? "#F17D10" : "transparent",
      color: completed ? "#fff" : "inherit",
      padding: "5px",
      borderRadius: "4px",
      display: "inline-block",
      minWidth: "152px",
      textAlign: "center",
      transition: "background-color 0.3s, color 0.3s",
      border: active || completed ? "2px solid #F17D10" : "2px solid #000"
    }
  })
);

const steps = [
  { label: "Upload Audio", content: "uploadAudio" },
  { label: "Audio Details", content: "audioDetails" },
  { label: "Upload Artwork", content: "uploadArtwork" },
  { label: "Platforms", content: "platforms" },
  { label: "Review the release", content: "reviewTheRelease" },
  { label: "Check List", content: "checkList" },
  // { label: "Zoho Sign", content: "imageCard" },
  { label: "Payment plan", content: "paymentPlan" },
  { label: "Payment confirmation", content: "paymentConfirmation" }
];

interface PageProps {}
const NewReleases: React.FC<PageProps> = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("rowId");
  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeTab === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();
  const [type, setType] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [submitForm, setSubmitForm] = useState<any>([]);
  const [orderIdValue, setOrderIdValue] = useState<any>();

  const handleNext = () => {
    const newActiveTab =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeTab + 1;
    setActiveTab(newActiveTab);
  };

  const handleBack = () => {
    setActiveTab((prevActiveTab) => prevActiveTab - 1);
  };

  useEffect(() => {
    setOrderIdValue(orderId);
  }, [orderId]);

  const renderContent = () => {
    switch (steps[activeTab].content) {
      case "uploadAudio":
        return (
          <UploadAudio
            type={type}
            steps={steps}
            setType={setType}
            orderId={orderIdValue}
            activeTab={activeTab}
            handleBack={handleBack}
            handleNext={handleNext}
            uploadFileData={uploadFileData}
            setUploadFileData={setUploadFileData}
          />
        );
      case "audioDetails":
        return (
          <AudioDetails
            type={type}
            setSubmitForm={setSubmitForm}
            activeTab={activeTab}
            handleBack={handleBack}
            steps={steps}
            handleNext={handleNext}
            setOrderIdValue={setOrderIdValue}
          />
        );
      case "uploadArtwork":
        return (
          <UploadArtWork
            activeTab={activeTab}
            handleBack={handleBack}
            steps={steps}
            handleNext={handleNext}
          />
        );
      case "platforms":
        return (
          <PlatFormsStores
            activeTab={activeTab}
            handleBack={handleBack}
            steps={steps}
            handleNext={handleNext}
          />
        );
      case "reviewTheRelease":
        return (
          <ReviewTheReleasePage
            activeTab={activeTab}
            orderId={orderId}
            handleBack={handleBack}
            steps={steps}
            handleNext={handleNext}
          />
        );
      case "checkList":
        return (
          <CheckList
            activeTab={activeTab}
            handleBack={handleBack}
            steps={steps}
            handleNext={handleNext}
          />
        );
      case "paymentPlan":
        return (
          <PaymentPlan
            activeTab={activeTab}
            handleBack={handleBack}
            steps={steps}
            handleNext={handleNext}
          />
        );
      case "paymentConfirmation":
        return <Confirmation />;
      default:
        return null;
    }
  };

  return (
    <>
      {!orderId && <NewReleaseTNC />}
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Box sx={{ m: 3 }}>
          <Typography variant="h4">New Releases</Typography>
        </Box>
        <Box>
          <Box sx={{ maxWidth: { lg: "80vw", sm: "100vw", xs: "85vw" } }}>
            <Tabs value={activeTab} variant="scrollable" scrollButtons="auto">
              {steps.map((step, index) => (
                <Tab
                  key={step.label}
                  label={
                    <CustomTabLabel
                      active={index === activeTab}
                      completed={index < activeTab}
                      sx={{ my: 2 }}
                    >
                      {step.label}
                    </CustomTabLabel>
                  }
                  icon={
                    <CustomTabIcon
                      active={index === activeTab}
                      completed={index < activeTab}
                    />
                  }
                  iconPosition="top"
                  disabled={index !== activeTab}
                />
              ))}
            </Tabs>
          </Box>
          <Box>{renderContent()}</Box>
        </Box>
      </Container>
    </>
  );
};

export default NewReleases;
