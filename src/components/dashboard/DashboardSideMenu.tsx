import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import WorkIcon from "@mui/icons-material/Work";
import SocialMediaIcon from "@mui/icons-material/SocialDistance";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import {
  Box,
  Divider,
  IconButton,
  SpeedDial,
  useTheme,
  styled,
  Dialog,
} from "@mui/material";
import Image from "next/image";
import dasboardLogo from "@public/images/logo.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import CloseIcon from "@mui/icons-material/Close";
import RaiseContactUs from "./musicDistributon/newReleases/raiseTicket/RaiseContactUs";

// Define the menu item interface
interface MenuItem {
  label: string;
  // icon: React.ReactElement;
  icon: string;
  link: string;
  children?: MenuItem[];
}

// Menu data (can be imported from a JSON file)
const menuData: MenuItem[] = [
  {
    label: "Dashboard",
    icon: "material-symbols:dashboard",
    link: "/dashboard/main",
  },
  {
    label: "Music Distribution",
    icon: "material-symbols:music-cast-rounded",
    link: "/music-distribution",
    children: [
      {
        label: "New Releases",
        link: "/dashboard/music-distribution/new-releases",
        icon: "fluent:music-note-2-24-regular",
      },
      {
        label: "My Releases",
        link: "/dashboard/music-distribution/my-releases",
        icon: "fluent:music-note-1-24-regular",
      },
      {
        label: "Plans & Pricings",
        icon: "mynaui:rupee-circle",
        link: "/dashboard/music-distribution/plans-pricings",
      },
      {
        label: "Edit Required",
        link: "/dashboard/music-distribution/edit-required",
        icon: "fluent:edit-32-regular",
      },
      {
        label: "Royalty Reports",
        link: "/dashboard/music-distribution/royalty-reports",
        icon: "system-uicons:diamond",
      },
    ],
  },
  {
    label: "Song Mastering",
    icon: "streamline:music-equalizer-solid",
    link: "/dashboard/song-mastering",
    children: [
      {
        label: "Master A New Song",
        link: "/dashboard/song-mastering/master-new-song",
        icon: "streamline:music-equalizer-solid",
      },
      {
        label: "Mastered Audio",
        link: "/dashboard/song-mastering/mastered-audio",
        icon: "lets-icons:group-share",
      },
      {
        label: "Plans",
        link: "/dashboard/song-mastering/plans",
        icon: "streamline:music-equalizer-solid",
      },
    ],
  },
  {
    label: "Social Media",
    icon: "lets-icons:group-share",
    link: "/social-media",
    children: [
      {
        label: "My Plans",
        link: "/dashboard/social-media/my-plans",
        icon: "streamline:music-equalizer-solid",
      },
    ],
  },
  // {
  //   label: "Portfolio",
  //   icon: "basil:bag-outline",
  //   link: "/dashboard/portfolio",
  // },
  {
    label: "Form Query",
    icon: "fluent:form-new-28-regular",
    link: "/dashboard/form-query",
  },
];
interface DashboardSideMenuProps {
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardSideMenu: React.FC<DashboardSideMenuProps> = ({
  setMobileOpen,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [open, setOpen] = useState<string | null>(null); // Track only one open parent item
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    // Restore the open state from local storage
    const savedOpenState = localStorage.getItem("openMenuItem");
    if (savedOpenState) {
      setOpen(savedOpenState);
    }

    const findSelectedItem = (items: MenuItem[]): string | null => {
      for (const item of items) {
        if (item.link === pathname) {
          return item.label;
        }
        if (item.children) {
          const result = findSelectedItem(item.children);
          if (result) return result;
        }
      }
      return null;
    };
    setSelectedItem(findSelectedItem(menuData));
  }, [pathname]);

  const handleClick = (item: string) => {
    const newOpenState = open === item ? null : item;
    setOpen(newOpenState);
    // Save the open state in local storage
    localStorage.setItem("openMenuItem", newOpenState || "");
  };

  // Handle navigation to a link
  const handleNavigation = (link: string) => {
    router.push(link);
    setMobileOpen(false);
  };

  // Render menu items
  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <div key={item.label}>
        <ListItem
          onClick={() => {
            if (item.children) {
              handleClick(item.label); // Open/close parent item
            } else {
              handleClick(item.label); // Open/close parent item
              handleNavigation(item.link); // Navigate if ano children
              setSelectedItem(item.label); // Set selected item
            }
          }}
          sx={{
            cursor: "pointer",
            backgroundColor:
              selectedItem === item.label
                ? theme.palette.primary.main
                : "inherit",
          }}
        >
          <ListItemIcon sx={{ minWidth: 35, fontSize: 25 }}>
            <Icon icon={item.icon} />
          </ListItemIcon>

          <ListItemText primary={item.label} />
          {item.children ? (
            open === item.label ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItem>
        {item.children && (
          <Collapse in={open === item.label} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItem
                  key={child.label}
                  sx={{
                    cursor: "pointer",
                    paddingLeft: 4,
                    backgroundColor:
                      selectedItem === child.label
                        ? theme.palette.primary.main
                        : "inherit",
                  }}
                  onClick={() => {
                    handleNavigation(child.link); // Navigate on child item click
                    setSelectedItem(child.label); // Set selected child
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 35, fontSize: 25 }}>
                    <Icon icon={child.icon} />
                  </ListItemIcon>
                  <ListItemText primary={child.label} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </div>
    ));
  };

  const [openCall, setOpenCall] = React.useState(false);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const handleClickOpenCall = () => {
    setOpenCall(true);
  };
  const handleClickCloseCall = () => {
    setOpenCall(false);
  };

  return (
    <div>
      <Box p={2}>
        <Image src={dasboardLogo} alt="Logo" />
      </Box>
      <Divider />
      <List component="nav">{renderMenuItems(menuData)}</List>
      <SpeedDial
        ariaLabel="SpeedDial example"
        sx={{ position: "fixed", bottom: 30, left: 16 }}
        onClick={handleClickOpenCall}
        icon={<Icon icon="carbon:phone-filled" style={{ fontSize: 25 }} />}
      />
      <BootstrapDialog
        onClose={handleClickCloseCall}
        aria-labelledby="customized-dialog-title"
        open={openCall}
      >
        <IconButton
          aria-label="close"
          onClick={handleClickCloseCall}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <RaiseContactUs />
      </BootstrapDialog>
    </div>
  );
};

export default DashboardSideMenu;
