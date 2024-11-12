import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Menu,
  Badge,
  MenuItem,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTheme } from "@emotion/react";
import { Theme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { cartCountAsync } from "@/redux/services/cart";
import Avatar from "@/components/common/Avatar";
import { logoutUserAsync } from "@/redux/services/user";

// Define the menu item interface
interface MenuItem {
  label: string;
  icon: string;
  link: string;
  children?: MenuItem[];
}

const menuData: MenuItem[] = [
  {
    label: "Profile",
    icon: "material-symbols:dashboard",
    link: "/dashboard/profile",
  },
  {
    label: "Home",
    icon: "ic:outline-home",
    link: "/",
  },
  {
    label: "My Releases",
    icon: "ic:sharp-tips-and-updates",
    link: "/dashboard/music-distribution/my-releases",
  },
  {
    label: "Account",
    icon: "material-symbols:account-box",
    link: "/",
    children: [
      {
        label: "Bank",
        link: "/dashboard/account-settings/bank",
        icon: "fluent:building-bank-16-regular",
      },
      {
        label: "Change Password ",
        link: "/dashboard/change-password",
        icon: "wpf:security-checked",
      },
    ],
  },
  {
    label: "Coins",
    icon: "iconoir:wallet",
    link: "#",
    children: [
      // {
      //   label: "Payment History",
      //   icon: "streamline:payment-10",
      //   link: "/dashboard/payment-history",
      // },
      {
        label: "Orders",
        icon: "fluent-mdl2:reservation-orders",
        link: "/dashboard/orders",
      },
      {
        label: "Ledger",
        icon: "oui:index-edit",
        link: "/dashboard/ledger",
      },
      {
        label: "Coins",
        icon: "bxs:wallet",
        link: "/dashboard/coin",
      },
    ],
  },
  {
    label: "Refer & Earn",
    icon: "fluent:share-24-regular",
    link: "/dashboard/wallet/refferals",
  },
  {
    label: "Logout",
    icon: "solar:logout-2-broken",
    link: "/",
  },
];

const HorizontalNavbar: React.FC = () => {
  const theme = useTheme() as Theme;
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const { cartCount } = useSelector((store: RootState) => store?.cart);
  const { users } = useSelector((state: RootState) => state.users);
  const userName: string = `${users?.name?.first || null} (Profile)`;
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
    // Open the menu only when the IconButton is clicked
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
            {item.label === "Profile" ? (
              <Avatar />
            ) : (
              <Icon icon={item.icon} style={{ color: "#FB8E0B" }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={item.label === "Profile" ? userName : item.label}
            // primary={item.label}
          />
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
  React.useEffect(() => {
    dispatch(cartCountAsync());
  }, [dispatch]);
  const [helpAnchorEl, setHelpAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const helpOpen = Boolean(helpAnchorEl);
  const handleHelpClick = (event: React.MouseEvent<HTMLElement>) => {
    setHelpAnchorEl(event.currentTarget);
  };
  const handleHelpClose = (link: string) => {
    router.push(`${link}`);
    setHelpAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        // borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      {/* <Button onClick={handleHelpClick}>
        <Icon icon="mdi:help" color="black" width={20} />
      </Button>

      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={helpAnchorEl}
        open={helpOpen}
        onClose={handleHelpClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.label} onClick={() => handleHelpClose(option.link)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu> */}

      <Button
        variant="contained"
        startIcon={<Icon icon="f7:plus-app" />}
        sx={{
          textTransform: "capitalize",
          color: "white",
          bgcolor: "black",
          borderRadius: "6px",
          "&:hover": {
            bgcolor: "black",
          },
        }}
        onClick={() =>
          router.push("/dashboard/music-distribution/new-releases")
        }
      >
        New Release
      </Button>

      <Button onClick={() => router.push("/cart")}>
        <Badge badgeContent={Number(cartCount)} color="error">
          <Icon icon="bytesize:cart" color="black" width={20} />
        </Badge>
      </Button>

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
        {renderMenuItems(menuData)}
      </Menu>
    </Box>
  );
};

export default HorizontalNavbar;

const options = [
  {
    label: "Library",
    link: "/video-gallery",
  },
  {
    label: "FAQ",
    link: "/faq",
  },
  {
    label: "Help Center",
    link: "/help",
  },
];
const ITEM_HEIGHT = 48;
