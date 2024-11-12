'use client'
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useInView from "@components/services-pricing/components/Tablecell/useInView"; // Assuming you saved the custom hook in a file named useInView.js
import LabelForm from "./Form/LabelForm";

const Label = () => {
  const [setRef, isInView] = useInView({ threshold: 0.1 });

  const plans = [
    {
      features: [
        true,
        true,
        "24 Hours",
        "24 Hours",
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        "Free",
        "",
        "Unlimited",
        "Yes",
        true,
        true,
        "85%",
        true,
        true,
        true,
      ],
    },
  ];

  const featureList = [
    "No Hidden Cost",
    "Lifetime Distribution (Don't pay for the same song again)",
    "Artist Care",
    "Distribution Time",
    "AI Mastering",
    "Spotify & Apple Verification",
    "WhatsApp Support",
    "Unlimited Artists",
    "Customizable Label Name",
    "Official YouTube Artist Channel Request",
    "Social Media Profile Linking",
    "Dolby Atom Audio Distribution + Apple Motion Graphics",
    "Commonly Service Provided",
    "Song",
    "Official Sales Report",
    "Schedule Your Own Release Date",
    "100+ Platforms",
    "Royalty",
    "Cover Art Creator",
    "Free UPC & Free ISRC",

  ];

  const columnVariants = [
    { hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    { hidden: { y: -100, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    { hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } }
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    window.open('https://forms.zohopublic.in/mytune/form/LabelRequestForm/formperma/8fZHgvMDh3xsuIEjyM0GswUP4NZJ05gz5vAMreOxDXo', '_blank');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ border: 0, borderColor: "grey.400", marginY: "50px" }}
        ref={setRef}
      >
        <Table>
          <TableHead sx={{ marginY: 10 }}>
            <TableRow
              sx={{
                border: 1,
                borderColor: "grey.400",
                background: "#FFFFE4",
                fontFamily: "Manrope",
                marginY: 10,
                textAlign: "center",
              }}
            >
              <motion.td
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={columnVariants[0]}
                transition={{ duration: 1 }}
                style={{ border: "1px solid grey" }}
              >
                <TableCell
                  sx={{
                    fontWeight: "800",
                    fontSize: {
                      xs: "25px", // Small devices (phones)
                      sm: "25px", // Medium devices (tablets)
                      md: "30px", // Large devices (desktops)
                      lg: "35px", // Extra large devices
                    },
                    borderBottom: 0,
                    minWidth: "400px"
                  }}
                >
                  Only on Deliver My Tune
                </TableCell>
              </motion.td>
              <motion.td
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ border: "1px solid grey", borderColor: "grey.400" }}
                variants={columnVariants[1] || columnVariants[0]}
                transition={{ duration: 1 }}
              >
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "20px",
                    borderBottom: 0,
                    minWidth: "400px",
                    display: "grid",
                    justifyContent: "center",
                  }}
                >
                  For Labels (50+ Songs/Album) - 5999/-
                  <Box marginY={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="outlined" onClick={handleClickOpen}
                      size='small'
                      sx={{
                        background: "black",
                        color: "white",
                        Border: 1,
                        borderColor: "black",
                        borderRadius: 10,
                        boxShadow: "none",
                        textTransform: "capitalize",
                        textDecoration: "none",
                        "&:hover": {
                          color: 'white',
                          background: "#FE8E0B",
                          Border: 1,
                          borderColor: "white",
                        }
                      }}>
                      Get an Invite
                    </Button>
                  </Box>
                </TableCell>
              </motion.td>
            </TableRow>
          </TableHead>
          <TableBody sx={{ textAlign: "center" }}>
            {featureList.map((feature, index) => (
              feature === "Commonly Service Provided" ? (
                <TableRow
                  key={index}
                  sx={{
                    border: 1,
                    borderColor: "grey.400"
                  }}
                >
                  <motion.td
                    colSpan={plans.length + 1}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={columnVariants[0]}
                    transition={{ duration: 1 }}
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    <Box
                      sx={{
                        fontWeight: "500px",
                        textAlign: 'center',
                        paddingY: 2
                      }}
                    >
                      {feature}
                    </Box>
                  </motion.td>
                </TableRow>
              ) : (
                <TableRow
                  key={index}
                  sx={{
                    border: 1,
                    borderColor: "grey.400",
                    textAlign: "center",
                  }}
                >
                  <motion.td
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={columnVariants[0]}
                    transition={{ duration: 1 }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: 0,
                        fontFamily: "Poppins",
                        fontWeight: "500px",
                      }}
                    >
                      {
                        (feature ===
                          "Commonly Service Provided" || feature === "Dolby Atom Audio Distribution + Apple Motion Graphics" ? (
                          <strong>{feature}</strong>
                        ) : (
                          feature
                        ))
                      }
                    </TableCell>
                  </motion.td>
                  {plans.map((plan, i) => (
                    <motion.td
                      key={i}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      style={{ border: "1px solid grey", borderColor: "grey.400" }}
                      variants={columnVariants[i + 1] || columnVariants[0]}
                      transition={{ duration: 1 }}
                    >
                      <TableCell
                        sx={{
                          textAlign: "center",
                          borderBottom: "none",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {typeof plan.features[index] === "boolean" ? (
                          <CheckCircleIcon sx={{ color: "#FB8E0B" }} />
                        ) : (
                          plan.features[index]
                        )}
                      </TableCell>
                    </motion.td>
                  ))}
                </TableRow>
              )))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <LabelForm open={open} handleClose={handleClose} />
      </Box>
    </>
  );
};

export default Label;
