"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardSideMenu from "./DashboardSideMenu";
import HorizontalNavbar from "./navigationBar/HorizontalNavbar";
import {
  Dialog,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import CloseIcon from "@mui/icons-material/Close";
import RaiseATicketForm from "./musicDistributon/newReleases/raiseTicket/RaiseATicketForm";
import RaiseContactUs from "./musicDistributon/newReleases/raiseTicket/RaiseContactUs";

const drawerWidth = 270;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

const DashboardLayoutPage: React.FC<Props> = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <DashboardSideMenu setMobileOpen={setMobileOpen} />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      className="mainLayout"
      sx={{ display: "flex", width: "100vw", height: "100vh" }}
    >
      <CssBaseline />
      <AppBar
        sx={{
          minHeight: "76px",
          bgcolor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { md: "end", xs: "space-between" },
            width: "100%",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <HorizontalNavbar />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
          flexWrap: "wrap",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { sm: 4, xs: 1 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "auto",
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* <SpeedDial
        ariaLabel="SpeedDial example"
        sx={{ position: 'fixed', bottom: 80, right: 25 }}
        onClick={handleClickOpen}
        icon={<Icon icon="f7:tickets" style={{ fontSize: 30 }} />}
      /> */}

      {/* </SpeedDial> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
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
        <RaiseATicketForm />
      </BootstrapDialog>
    </Box>
  );
};

export default DashboardLayoutPage;
