import SimpleBar from "simplebar-react";
import { alpha, styled } from "@mui/material/styles";
import { Theme } from "@mui/material/styles/createTheme";

// ----------------------------------------------------------------------

export const StyledRootScrollbar = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden"
}));

interface StyledScrollbarProps {
  theme: Theme;
}

export const StyledScrollbar = styled(SimpleBar)(
  ({ theme }: StyledScrollbarProps) => ({
    maxHeight: "100%",
    "& .simplebar-scrollbar": {
      "&:before": {
        backgroundColor: alpha(theme.palette.grey[600], 0.48)
      },
      "&.simplebar-visible:before": {
        opacity: 1
      }
    },
    "& .simplebar-mask": {
      zIndex: "inherit"
    }
  })
);
