import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogProps
} from "@mui/material";

interface ConfirmDialogProps extends Omit<DialogProps, "title" | "content"> {
  open: boolean;
  title: React.ReactNode | string;
  action: React.ReactNode;
  content?: React.ReactNode;
  onClose: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={{
        sx: { borderRadius: 3, p: 1 }
      }}
    >
          <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && (
        <DialogContent sx={{ typography: "body2" }}> {content} </DialogContent>
      )}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
