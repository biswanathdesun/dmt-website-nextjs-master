"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DummyJSONData {
  label: string;
  data: any[];
}

interface DoDontListProps {
  tcData: { [key: string]: DummyJSONData };
  open: boolean;
  handleClose: () => void;
  handleContinue: () => void;
}

const PortfolioField: React.FC<DoDontListProps> = ({
  tcData,
  open,
  handleClose,
  handleContinue,
}) => {
  const [readSections, setReadSections] = React.useState<{
    [key: string]: boolean;
  }>({});
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open) {
      const initialReadState: { [key: string]: boolean } = {};
      Object.keys(tcData).forEach((section) => {
        initialReadState[section] = false;
      });
      setReadSections(initialReadState);
    }
  }, [open, tcData]);

  const handleScroll = () => {
    if (contentRef.current) {
      Object.keys(tcData).forEach((section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            setReadSections((prev) => ({ ...prev, [section]: true }));
          }
        }
      });
    }
  };

  const allRead = Object.values(readSections).every((read) => read);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(3px)",
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          sx={{ fontSize: 28 }}
        >
          Introducing the Artist Portfolio Service
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        onScroll={handleScroll}
        ref={contentRef}
        sx={{
          overflowY: "auto",
          padding: 2,
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
          "&::-webkit-scrollbar-thumb": {
            background: "#fe8d0bc4",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": { background: "#FE8E0B" },
        }}
      >
        {Object.keys(tcData).map((section) => (
          <Box key={section} id={section} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {tcData[section].label}
            </Typography>
            {tcData[section].data.map((subSection) => (
              <Box key={subSection.lable} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {subSection.lable.replace("&apos;", "'")}
                </Typography>
                {subSection.data.map((item: any) => (
                  <Box
                    key={item.title}
                    sx={{
                      pl: 2,
                      mb: 1,
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    &nbsp;
                    <Typography variant="body2">{item.content}</Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ))}
        <Box>
          <Typography variant="body1" fontWeight="bold" sx={{ ml: 2 }}>
            By opting for our Artist Portfolio service, you can present your
            music professionally and connect with your audience effectively. Get
            started today and take the next step in your musical career with
            Deliver My Tune!
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          sx={{
            color: "white",
          }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PortfolioField;
