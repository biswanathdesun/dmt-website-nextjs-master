import { List, ListItem, ListItemText, Box, Button } from '@mui/material'
import React from 'react'


interface tncProps {
    activeTab: number;
    handleBack: () => void;
    steps: { label: string; content: string }[];
    handleNext: () => void;
}

const TermsAndCondition: React.FC<tncProps> = ({
    activeTab,
    handleBack,
    steps,
    handleNext,
}) => {
    const handleContinue = () => {
        handleNext();
    };
    return (
        <>
            <List>
                <ListItem>
                    <ListItemText primary="• Minimum subscription period: 3 months to ensure sufficient time for results to manifest." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="• Content for the following month must be provided within the last 10 days of the current month to facilitate timely scheduling and planning." />
                </ListItem>
            </List>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2, pb: 4 }}>
                <Button
                    color="inherit"
                    variant="contained"
                    disabled={activeTab === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                    type={steps[activeTab].content === "form" ? "submit" : "button"}
                    variant="contained"
                    sx={{ mr: 1, color: "white", backgroundColor: "black" }}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </Box>
        </>
    )
}

export default TermsAndCondition;
