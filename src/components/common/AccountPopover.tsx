// components/AccountPopover.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Menu,
  Avatar as MuiAvatar,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTheme } from "@emotion/react";
import { Theme } from "@mui/material/styles";
import Avatar from "./Avatar"; // Assuming you have the Avatar component in the same folder
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logoutUserAsync } from "@/redux/services/user";

// Define the menu item interface
interface MenuItem {
  label: string;
  icon: string;
  link: string;
  children?: MenuItem[];
}

interface AccountPopoverProps {
  menuItems: MenuItem[];
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ menuItems }) => {
  const theme = useTheme() as Theme;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const handleLogout = () => {
   dispatch(logoutUserAsync());
  };

  const handleClick = (item: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [item]: !prevOpen[item] }));
  };

  const handleNavigation = (label: string, link: string) => {
    if (label === "Logout") {
      handleLogout();
    } else {
      router.push(link);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <React.Fragment key={item.label}>
        <ListItem
          onClick={() => {
            if (item.children) {
              handleClick(item.label);
            } else {
              handleNavigation(item.label, item.link);
              setSelectedItem(item.label);
              handleMenuClose(); // Close menu after navigation
            }
          }}
          sx={{
            cursor: "pointer",
            width: "250px",
            backgroundColor:
              selectedItem === item.label
                ? theme.palette.action.selected
                : "inherit",
          }}
        >
          <ListItemIcon sx={{ minWidth: 35, fontSize: 25, marginRight: 1 }}>
            <Icon icon={item.icon} style={{ color: "#FB8E0B" }} />
          </ListItemIcon>
          <ListItemText primary={item.label} />
          {item.children ? (
            open[item.label] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItem>
        {item.children && (
          <Collapse in={open[item.label]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItem
                  key={child.label}
                  sx={{
                    cursor: "pointer",
                    paddingLeft: 4,
                    backgroundColor:
                      selectedItem === child.label
                        ? theme.palette.action.selected
                        : "inherit",
                  }}
                  onClick={() => {
                    handleNavigation(child.label, child.link);
                    setSelectedItem(child.label);
                    handleMenuClose(); // Close menu after navigation
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 35, fontSize: 25 }}>
                    <Icon icon={child.icon} style={{ color: "#FB8E0B" }} />
                  </ListItemIcon>
                  <ListItemText primary={child.label} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
        {item.label === "Profile" && <Divider sx={{ bgcolor: "divider" }} />}
        {item.label === "Refer & Earn" && (
          <Divider sx={{ bgcolor: "divider" }} />
        )}
      </React.Fragment>
    ));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={handleMenuClick}
        size="small"
        aria-controls={anchorEl ? "account-menu" : undefined}
        aria-haspopup="true"
      >
        <Avatar />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {renderMenuItems(menuItems)}
      </Menu>
    </Box>
  );
};

export default AccountPopover;
