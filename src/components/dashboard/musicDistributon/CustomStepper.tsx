// components/CustomStepper.tsx
import React from "react";
import { Stepper, Step, StepLabel, StepIconProps } from "@mui/material";
import { styled } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/FiberManualRecord";

const ColorCheckCircleIcon = styled(CheckCircleIcon)(({ theme }) => ({
    color: "#F17D10",
}));

const ColorCircleIcon = styled(CircleIcon)(({ theme }) => ({
    color: "#F17D10",
    border: `2px solid #F17D10`,
    borderRadius: "50%",
}));

const CustomStepIcon: React.FC<StepIconProps> = ({ active, completed }) => {
    if (completed) {
        return <ColorCheckCircleIcon />;
    }
    if (active) {
        return <ColorCircleIcon />;
    }
    return <RadioButtonUncheckedIcon />;
};

interface Step {
    label: string;
    content: string;
}

interface CustomStepperProps {
    steps: Step[];
    activeStep: number;
    handleNext: () => void;
    handleBack: () => void;
}

const CustomStepLabel = styled(StepLabel)<{ active?: boolean; completed?: boolean }>(
    ({ active, completed }) => ({
        "& .MuiStepLabel-label": {
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

const CustomStepper: React.FC<CustomStepperProps> = ({
    steps,
    activeStep,
    handleNext,
    handleBack,
}) => {
    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
                <Step key={step.label} completed={index < activeStep}>
                    <CustomStepLabel
                        StepIconComponent={CustomStepIcon}
                        active={index === activeStep}
                        completed={index < activeStep}
                    >
                        {step.label}
                    </CustomStepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default CustomStepper;

