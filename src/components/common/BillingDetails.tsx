import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  InputLabel,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

interface BillingDetailsProps {
    userData: any;
}

const BillingDetails: React.FC<BillingDetailsProps> = ({ userData }) => {
    return (
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6">Billing Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body1"
              component="span"
              sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
            >
              Name:{" "}
              <InputLabel sx={{ fontSize: "18px" }}>
                {`${userData?.name?.first} ${userData?.name?.last}`}
              </InputLabel>
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
            >
              Phone:{" "}
              <InputLabel sx={{ fontSize: "18px" }}>
                {userData?.phone}
              </InputLabel>
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
            >
              Email:{" "}
              <InputLabel sx={{ fontSize: "18px" }}>
                {userData?.email}
              </InputLabel>
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
            >
              Address:{" "}
              <InputLabel sx={{ fontSize: "18px" }}>
                {userData?.address ? `${userData?.address?.country} , ${userData?.address?.pincode}` : ''}
              </InputLabel>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
};

export default BillingDetails;
