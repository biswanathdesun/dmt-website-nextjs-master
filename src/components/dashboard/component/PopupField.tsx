"use client";

import * as React from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DummyJSONData {
  label: string;
  data: any[];
}

interface DoDontListProps {
  tcData: { [key: string]: DummyJSONData };
  open: boolean;
  handleClose: () => any;
  handleContinue: () => void;
}

const PopupField: React.FC<DoDontListProps> = ({
  tcData,
  open,
  handleClose,
  handleContinue,
}) => {
  const [readSections, setReadSections] = React.useState<{ [key: string]: boolean }>({});
  const contentRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ fontSize: { xs: 24, md: 30 } }}>
          Do&apos;s and Don&apos;ts for Music Submission
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
          maxHeight: "80vh",
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
            <Typography variant="h6" gutterBottom>
              {tcData[section].label}
            </Typography>
            {tcData[section].data.map((subSection) => (
              <Box key={subSection.label} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {subSection.label}
                </Typography>
                {subSection.data.map((item: any) => (
                  <Grid
                    container
                    key={item.title}
                    direction={{ xs: "row", sm: "column" }}
                    spacing={1}
                    sx={{ pl: 2, mb: 1 }}
                  >
                    <Grid item xs={12} sm={"auto"}>
                      <Typography variant="body1" fontWeight="bold">
                        {item.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={"auto"}>
                      <Typography variant="body2">{item.content}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            ))}
          </Box>
        ))}
        <Box>
          <Typography variant="body1" fontWeight="bold" sx={{ ml: 2 }}>
            By adhering to these guidelines, you not only increase the chances
            of your music being accepted and going live but also improve the
            likelihood of being selected by editorial teams for playlists. This
            comprehensive approach ensures that your music stands out both in
            quality and marketability.
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
        // disabled={!allRead}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupField;
