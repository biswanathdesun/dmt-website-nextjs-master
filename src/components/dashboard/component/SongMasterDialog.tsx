'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { songMastering } from '../../common/JSONFolder/jsonData';
import { useRouter } from 'next/navigation';

interface Section {
    heading: string;
    points?: { title: string; description: string; }[];
    steps?: string[];
}

interface Content {
    label: string;
    title: string;
    intro: string;
    sections: Section[];
    conclusion: string;
}

const SongMasteringDialog: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<Content | null>(null);
    const [readSections, setReadSections] = useState<{ [key: string]: boolean }>({});
    const contentRef = useRef<HTMLDivElement>(null);
      const router = useRouter();

    useEffect(() => {
        // Simulating fetching data
        setContent(songMastering);
        setOpen(true);
    }, []);

    const handleScroll = () => {
        if (contentRef.current) {
            content?.sections.forEach((section, index) => {
                const sectionElement = document.getElementById(`section-${index}`);
                if (sectionElement) {
                    const rect = sectionElement.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                        setReadSections(prev => ({ ...prev, [section.heading]: true }));
                    }
                }
            });
        }
    };

    const allRead = Object.values(readSections).every((read) => read);

    const handleClose = () => {
        router.back(); 
        setOpen(false);
    };

    const handleContinue = () => {
        setOpen(false);
    };

    if (!content) {
        return <div>Loading...</div>;
    }

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(3px)",
          },
        }}
      >
        <DialogTitle>
          <Typography fontWeight="bold" sx={{ fontSize: { sm: 28, xs: 26 } }}>
            {content.label}
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
          <Typography variant="h5" gutterBottom fontWeight="bold">
            {content.title}
          </Typography>
          <DialogContentText>{content.intro}</DialogContentText>
          {content.sections.map((section, index) => (
            <div key={index} id={`section-${index}`}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {section.heading}
              </Typography>
              {section.points && (
                <List>
                  {section.points.map((point, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        primary={point.title}
                        secondary={point.description}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
              {section.steps && (
                <List>
                  {section.steps.map((step, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={step} />
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          ))}
          <DialogContentText>{content.conclusion}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleContinue}
            variant="contained"
            disabled={!allRead}
            color="primary"
            sx={{ color: "#fff" }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default SongMasteringDialog;
