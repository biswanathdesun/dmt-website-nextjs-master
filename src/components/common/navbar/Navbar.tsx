/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/images/logo.svg";
import CloseIcon from "@mui/icons-material/Close";
import "./navbar.css";
import { usePathname } from "next/navigation";
import {
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Menu, MenuItem, Badge } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { sum } from "lodash";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { cartCountAsync } from "@/redux/services/cart";
import { setCartCount } from "@/redux/slices/cartSlice";
import AccountPopover from "../AccountPopover";

interface MenuItem {
  label: string;
  icon: string;
  link: string;
  children?: MenuItem[];
}

export default function Navbar() {
  const token = localStorage?.getItem("token") ?? "";
  const isLoggedIn = token && token !== "null" && token !== "undefined";
  const pathname = usePathname();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = React.useState<string>("");
  const [submenuEl, setSubmenuEl] = React.useState<null | HTMLElement>(null);
  const [openServices, setOpenServices] = React.useState(true);
  const [openQuiestion, setOpenQuiestion] = React.useState(true);
  const [openArtist, setOpenArtist] = React.useState(true);
  // const [count, setCount] = React.useState(0);
  const { cartCount, count } = useSelector((store: RootState) => store?.cart);
  const cartData = JSON.parse(localStorage.getItem("cart") ?? "[]") || [];
  const handleServiceClick = () => {
    setOpenServices(!openServices);
  };
  const handleQuiestionClick = () => {
    setOpenQuiestion(!openQuiestion);
  };
  const handleArtistClick = () => {
    setOpenArtist(!openArtist);
  };

  const handleSubmenuClick = (
    event: React.MouseEvent<HTMLElement>,
    p0: string
  ) => {
    setSubmenuEl(event.currentTarget);
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    type: string
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setSubmenuEl(null);
    setMenuType("");
  };

  const handleLogout = () => {
    localStorage.clear();
    handleDrawerClose();
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(cartCountAsync());
    }
  }, [dispatch, isLoggedIn]);

  React.useEffect(() => {
    if (!isLoggedIn) {
      const totalItems = cartData?.length;
      dispatch(setCartCount(totalItems));
    }
  }, [cartData]);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image src={logo} alt="DMT-Logo" />
          </Link>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 4,
              alignItems: "center",
            }}
          >
            <Link href="/about" passHref style={{ textDecoration: "none" }}>
              <Typography
                className={`link ${pathname === "/about" ? "active" : ""}`}
                variant="body1"
                color="inherit"
                sx={{ textDecoration: "none", color: "black" }}
              >
                About
              </Typography>
            </Link>
            <Link
              href="#"
              passHref
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={(e) => handleMouseEnter(e, "services")}
            >
              <Typography
                className={`link ${
                  pathname === "/services-and-pricing" ? "active" : ""
                }`}
                variant="body1"
                color="inherit"
                sx={{ textDecoration: "none", color: "black" }}
              >
                Services & Pricing{" "}
                <Icon icon="mdi-light:chevron-down" color="black" />
              </Typography>
            </Link>
            <Menu
              anchorEl={menuType === "services" ? anchorEl : null}
              disableAutoFocusItem
              open={menuType === "services"}
              onClose={handleMouseLeave}
              MenuListProps={{ onMouseLeave: handleMouseLeave }}
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <MenuItem onClick={handleMouseLeave}>
                <Link
                  href="/services-and-pricing?type=music-distribution"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    Music Distribution
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMouseLeave}>
                <Link
                  href="/services-and-pricing?type=portfolio"
                  passHref
                  style={{ textDecoration: " none" }}
                >
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    Portfolio
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMouseLeave}>
                <Link
                  href="/services-and-pricing?type=ai-mastering"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    AI Mastering
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMouseLeave}>
                <Link
                  href="/services-and-pricing?type=social-media-management"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    Social Media Management
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>

            <Link href="/contactus" passHref style={{ textDecoration: "none" }}>
              <Typography
                className={`link ${pathname === "/contactus" ? "active" : ""}`}
                variant="body1"
                color="inherit"
                sx={{ textDecoration: "none", color: "black" }}
              >
                Contact Us
              </Typography>
            </Link>
            {/* SUpport Menu */}
            <Link
              href="#"
              passHref
              style={{ textDecoration: "none" }}
              onClick={(e) => handleMouseEnter(e, "support")}
            >
              <Typography
                // className={`link ${pathname === "/faq" ? "active" : ""}`}
                variant="body1"
                color="inherit"
                sx={{ textDecoration: "none", color: "black" }}
              >
                Support <Icon icon={"mdi-light:chevron-down"} color="black" />
              </Typography>
            </Link>
            <Menu
              anchorEl={menuType === "support" ? anchorEl : null}
              disableAutoFocusItem
              open={menuType === "support"}
              MenuListProps={{ onMouseLeave: handleMouseLeave }}
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <MenuItem onClick={handleMouseLeave}>
                <Link href="/faq" passHref style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    FAQs
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMouseLeave}>
                <Link href="/help" passHref style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    Self Help Center
                  </Typography>
                </Link>
              </MenuItem>{" "}
              <MenuItem onClick={handleMouseLeave}>
                <Link
                  href="/video-gallery"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    Video Library
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>

            <Link
              href="/cart"
              passHref
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                color="inherit"
                sx={{ textDecoration: "none", color: "black", paddingRight: 1 }}
              >
                Cart
              </Typography>
              <Badge
                badgeContent={isLoggedIn ? Number(cartCount) : Number(count)}
                color="error"
              >
                <Icon icon="bytesize:cart" color="black" />
              </Badge>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="drawer-appbar"
              aria-haspopup="true"
              onClick={handleDrawerOpen}
              sx={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            {/* Drawer Start */}
            <Drawer
              anchor="right"
              open={openDrawer}
              onClose={handleDrawerClose}
              sx={{ minWidth: 400 }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Link
                  href="/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px",
                  }}
                >
                  <Image src={logo} alt="DMT-Logo" />
                </Link>
                <IconButton sx={{ px: 1 }}>
                  <CloseIcon onClick={handleDrawerClose} />
                </IconButton>
              </Box>
              <List>
                <ListItemButton onClick={handleDrawerClose}>
                  <Link
                    href="/about"
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ textDecoration: "none", color: "black" }}
                        >
                          About
                        </Typography>
                      }
                    />
                  </Link>
                </ListItemButton>
                {isLoggedIn && (
                  <ListItemButton onClick={handleDrawerClose}>
                    <Link
                      href="/dashboard/main"
                      passHref
                      style={{ textDecoration: "none" }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ textDecoration: "none", color: "black" }}
                          >
                            Dashboard
                          </Typography>
                        }
                      />
                    </Link>
                  </ListItemButton>
                )}
                <ListItemButton onClick={handleServiceClick}>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ textDecoration: "none", color: "black" }}
                      >
                        Services & Pricing
                      </Typography>
                    }
                  />
                  {openServices ? (
                    <Icon icon={"mdi-light:chevron-down"} />
                  ) : (
                    <Icon icon={"mdi-light:chevron-up"} />
                  )}
                </ListItemButton>
                <Collapse in={!openServices} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 6 }}>
                      <Link
                        href="/services-and-pricing?music-distribution"
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{ textDecoration: "none", color: "black" }}
                            >
                              Music Distribution
                            </Typography>
                          }
                        />
                      </Link>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 6 }}>
                      <Link
                        href="/services-and-pricing?type=portfolio"
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{ textDecoration: "none", color: "black" }}
                            >
                              Portfolio
                            </Typography>
                          }
                        />
                      </Link>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 6 }}>
                      <Link
                        href="/services-and-pricing?type=ai-mastering"
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{ textDecoration: "none", color: "black" }}
                            >
                              AI Mastering
                            </Typography>
                          }
                        />
                      </Link>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 6 }}>
                      <Link
                        href="/services-and-pricing?type=social-media-management"
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{ textDecoration: "none", color: "black" }}
                            >
                              Social Media Management
                            </Typography>
                          }
                        />
                      </Link>
                    </ListItemButton>
                    {/* <ListItemButton sx={{ pl: 4 }}>
                      <Link
                        href="#"
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{ textDecoration: "none", color: "black" }}
                            >
                              Copyright
                            </Typography>
                          }
                        />
                      </Link>
                    </ListItemButton> */}
                  </List>
                </Collapse>

                <ListItemButton onClick={handleDrawerClose}>
                  <Link
                    href="/contactus"
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ textDecoration: "none", color: "black" }}
                        >
                          Contact Us
                        </Typography>
                      }
                    />
                  </Link>
                </ListItemButton>

                {/* Support Menu */}
                <ListItemButton onClick={handleQuiestionClick}>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ textDecoration: "none", color: "black" }}
                      >
                        Support
                      </Typography>
                    }
                  />
                  {openQuiestion ? (
                    <Icon icon={"mdi-light:chevron-down"} />
                  ) : (
                    <Icon icon={"mdi-light:chevron-up"} />
                  )}
                </ListItemButton>
                <Collapse in={!openQuiestion} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 6 }}>
                      <Link
                        href="/faq"
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{ textDecoration: "none", color: "black" }}
                            >
                              FAQs
                            </Typography>
                          }
                        />
                      </Link>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 6 }}>
                      <Link
                        href="/help"
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              Self Help Center
                            </Typography>
                          }
                        />
                      </Link>
                    </ListItemButton>{" "}
                    <ListItemButton sx={{ pl: 6 }}>
                      <Link
                        href="/video-gallery"
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              Video Library
                            </Typography>
                          }
                        />
                      </Link>
                    </ListItemButton>
                  </List>
                </Collapse>

                <ListItemButton onClick={handleDrawerClose}>
                  <Link
                    href="/cart"
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ textDecoration: "none", color: "black" }}
                        >
                          Cart
                        </Typography>
                      }
                    />
                  </Link>
                </ListItemButton>
                {isLoggedIn && (
                  <ListItemButton onClick={handleLogout}>
                    <Link href="/" passHref style={{ textDecoration: "none" }}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ textDecoration: "none", color: "black" }}
                          >
                            Logout
                          </Typography>
                        }
                      />
                    </Link>
                  </ListItemButton>
                )}

                {!isLoggedIn && (
                  <ListItemButton onClick={handleDrawerClose}>
                    <Link
                      href="/auth/login"
                      passHref
                      style={{ textDecoration: "none" }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ textDecoration: "none", color: "black" }}
                          >
                            Login
                          </Typography>
                        }
                      />
                    </Link>
                  </ListItemButton>
                )}
                {!isLoggedIn && (
                  <ListItemButton onClick={handleDrawerClose}>
                    <Link
                      href="/auth/create-account"
                      passHref
                      style={{ textDecoration: "none" }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ textDecoration: "none", color: "black" }}
                          >
                            Sign Up For Free
                          </Typography>
                        }
                      />
                    </Link>
                  </ListItemButton>
                )}
              </List>
            </Drawer>
          </Box>

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {!isLoggedIn ? (
              <>
                <Button
                  component="a"
                  href="/auth/login"
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    textDecoration: "none",
                    fontSize: 16,
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  component="a"
                  href="/auth/create-account"
                  sx={{
                    color: "white",
                    background: "black",
                    borderRadius: 10,
                    boxShadow: "none",
                    textTransform: "capitalize",
                    textDecoration: "none",
                    "&:hover": {
                      background: "black",
                      boxShadow: "none",
                    },
                  }}
                >
                  Sign Up For Free
                </Button>
              </>
            ) : (
              <AccountPopover menuItems={menuData} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const menuData: MenuItem[] = [
  {
    label: "Profile",
    icon: "iconamoon:profile-fill",
    link: "/dashboard/profile",
  },
  {
    label: "Dashboard",
    icon: "material-symbols:dashboard",
    link: "/dashboard/main",
  },
  {
    label: "Cart",
    icon: "bytesize:cart",
    link: "/cart",
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
