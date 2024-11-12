'use client'
import * as React from 'react';
import CustomBreadcrumbs from '@/components/common/CustomBreadcrumbs';
import { Box, Breadcrumbs, styled, Tab, Tabs } from '@mui/material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/FiberManualRecord";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

// tabs import //
import Objective from './components/Objective';
import PlatformsCovered from './components/PlatformsCovered';
import ServicesOffered from './components/ServicesOffered';
import RequirmentArtis from './components/RequirmentArtis';
import ExpertYou from './components/ExpertYou';
import TermsAndCondition from './components/TermsAndCondition';
import DetailForm from './components/DetailForm';
import Price from './components/Price';

import SmmThankYouPage from '@/components/common/SmmThankYouPage';

const ColorCheckCircleIcon = styled(CheckCircleIcon)(({ theme }) => ({
    color: "#F17D10",
}));

const ColorCircleIcon = styled(CircleIcon)(({ theme }) => ({
    color: "#F17D10",
    border: `2px solid #F17D10`,
    borderRadius: "50%",
}));

const CustomTabIcon: React.FC<{ active?: boolean; completed?: boolean }> = ({
    active,
    completed,
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
            border: active || completed ? "2px solid #F17D10" : "2px solid #000",
        },
    })
);

const steps = [
    { label: "Objective", content: "objective" },
    // { label: "Platform Covered", content: "platformCovered" },
    { label: "Services offered", content: "servicesOffered" },
    { label: "Requirement from Artist", content: "requirementFromArtist" },
    { label: "What You Can Expect", content: "expect" },
    { label: "Terms & Condition", content: "termsCondition" },
    { label: "Detail Form", content: "detailForm" },
    { label: "Price", content: "price" },
    { label: "Payment Confirmation", content: "paymentConfirmation" },
];

interface PageProps { }

const MyPlansLayout: React.FC<PageProps> = () => {

    const [type, setType] = React.useState("");
    const [activeTab, setActiveTab] = React.useState(0);
    const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [submitForm, setSubmitForm] = React.useState<any>([]);
    const methods = useForm();
    const {
        handleSubmit,
        formState: { isValid },
    } = methods;

    const totalSteps = () => steps.length;

    const completedSteps = () => Object.keys(completed).length;

    const isLastStep = () => activeTab === totalSteps() - 1;

    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveTab =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeTab + 1;
        setActiveTab(newActiveTab);
    };
    const handleComplete = () => {
        const newCompleted = { ...completed, [activeTab]: true };
        setCompleted(newCompleted);
        if (!isLastStep()) {
            handleNext();
        }
    };

    const handleBack = () => {
        setActiveTab((prevActiveTab) => prevActiveTab - 1);
    };

    const onSubmit: SubmitHandler<any> = (data) => {
        console.log("Form data:", data);
        if (isValid) handleComplete();
    };
    const handleContinue = () => {
        handleSubmit(onSubmit)();
        handleNext();
    };
    // console.log("steps[activeTab].content :>> ", steps[activeTab].content);

    const renderContent = () => {
        switch (steps[activeTab].content) {
            case "objective":
                return (
                    <Objective
                        activeTab={activeTab}
                        handleBack={handleBack}
                        steps={steps}
                        handleNext={handleNext} />
                );
            // case "platformCovered":
            //     return (
            //         <PlatformsCovered
            //             activeTab={activeTab}
            //             handleBack={handleBack}
            //             steps={steps}
            //             handleNext={handleNext} />
            //     );
            case "servicesOffered":
                return (
                    <ServicesOffered
                        activeTab={activeTab}
                        handleBack={handleBack}
                        steps={steps}
                        handleNext={handleNext} />
                );
            case "requirementFromArtist":
                return (
                    <RequirmentArtis
                        activeTab={activeTab}
                        handleBack={handleBack}
                        steps={steps}
                        handleNext={handleNext} />
                );
            case "expect":
                return (
                    <ExpertYou
                        activeTab={activeTab}
                        handleBack={handleBack}
                        steps={steps}
                        handleNext={handleNext} />
                );
            case "termsCondition":
                return (
                    <TermsAndCondition
                        activeTab={activeTab}
                        handleBack={handleBack}
                        steps={steps}
                        handleNext={handleNext} />
                );
            case "detailForm":
                return (
                    <DetailForm
                        type={type}
                        setSubmitForm={setSubmitForm}
                        activeTab={activeTab}
                        handleBack={handleBack}
                        steps={steps}
                        handleNext={handleNext} />
                );
            case "price":
                return (
                    <Price
                        activeTab={activeTab}
                        handleBack={handleBack}
                        steps={steps}
                        handleNext={handleNext} />
                );
            case "paymentConfirmation": return (
                <SmmThankYouPage />
            );
       
            default:
                return null;
        }
    };
    return (
        <>
            <CustomBreadcrumbs
                heading="Social Media Management Services"
                activeLast
                sx={{ fontSize: "40px", fontWeight: "bolder", marginTop: 5 }}
                links={[]}
            />
            <Box>
                <Breadcrumbs>Social Media Management Services</Breadcrumbs>
            </Box>
            <Box>
                <Box sx={{ maxWidth: { lg: "80vw", sm: "100vw", xs: "85vw" }, display: 'flex', justifyContent: 'center' }}>
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
                <Box sx={{
                    my: {
                        md: 5,
                        sm: 3,
                        xs: 2,
                    }
                }}>
                    {renderContent()}
                </Box>
            </Box>
        </>
    )
}

export default MyPlansLayout
