"use client";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import FooterLogo from "../../../../public/images/FooterLogo.png";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

export default function Footer() {
  return (
    <Box sx={{ background: "black", py: 5, border: "2px solid black" }}>
      <Container maxWidth="xl">
        <Divider sx={{ bgcolor: "#ffff", mb: 5 }} />
        <Grid container>
          <Grid item sm={6} xs={12}>
            <Box sx={{ mb: 5 }}>
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                }}
              >
                <Image src={FooterLogo} alt="DMT Footer Logo" />
              </Link>
            </Box>
            <Box sx={{ px: 2 }}>
              <IconButton
                LinkComponent={"a"}
                href="https://www.facebook.com/delivermytune/"
                target="blank"
                sx={{
                  color: "white",
                  border: "1px solid white",
                  mx: 0.5,
                  borderRadius: "100px",
                }}
              >
                <FacebookIcon sx={{ fontSize: "15px" }} />
              </IconButton>
              <IconButton
                LinkComponent={"a"}
                href="https://www.instagram.com/deliver_my_tune/"
                target="blank"
                sx={{
                  color: "white",
                  border: "1px solid white",
                  mx: 0.5,
                  borderRadius: "100px",
                }}
              >
                <InstagramIcon sx={{ fontSize: "15px" }} />
              </IconButton>
              <IconButton
                LinkComponent={"a"}
                href="https://x.com/i/flow/login?redirect_after_login=%2Fdelivermytune"
                target="blank"
                sx={{
                  color: "white",
                  border: "1px solid white",
                  mx: 0.5,
                  borderRadius: "100px",
                }}
              >
                <XIcon sx={{ fontSize: "15px" }} />
              </IconButton>
              <IconButton
                LinkComponent={"a"}
                href="https://www.linkedin.com/company/deliver-my-tune/"
                target="blank"
                sx={{
                  color: "white",
                  border: "1px solid white",
                  mx: 0.5,
                  borderRadius: "100px",
                }}
              >
                <LinkedInIcon sx={{ fontSize: "15px" }} />
              </IconButton>
              {/* <IconButton
                sx={{
                  color: "white",
                  border: "1px solid white",
                  mx: 0.5,
                  borderRadius: "100px",
                }}
              >
                <GitHubIcon sx={{ fontSize: "15px" }} />
              </IconButton> */}
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box
              columnGap={1}
              sx={{
                my: { sm: -3, xs: 2 },
                rowGap: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: { sm: "space-around", xs: "space-between" },
                px: 1,
              }}
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <List>
                <ListItemButton>
                  <Link
                    href="/"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>Home</ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <Link
                    href="/services-and-pricing"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>
                      Services & Pricing
                    </ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <Link
                    href="/help"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>
                      Self help Center
                    </ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <Link
                    href="/faq"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>FAQs</ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <Link
                    href={""}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>Login</ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <Link
                    href={"/store"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>Stores</ListItemText>
                  </Link>
                </ListItemButton>
              </List>

              <List>
                <ListItemButton>
                  <Link
                    href="/about"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>
                      About us
                    </ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <Link
                    href="/video-gallery"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>
                      Video Library
                    </ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <Link
                    href="/contactus"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>
                      Contact Us
                    </ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <Link
                    href="https://blog.delivermytune.com/"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>Blog</ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <Link
                    href="/auth/create-account"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <ListItemText sx={{ color: "white" }}>Sign Up</ListItemText>
                  </Link>
                </ListItemButton>
              </List>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: "#ffff", my: 5 }} />

        <Box
          // Responsive layout for different screen sizes
          sx={{
            width: "100%",
            display: { md: "flex", xs: "grid" }, // Use flex on small and larger devices, grid on extra small devices
            justifyContent: "space-between",
            rowGap: 2, // Space between rows
            overflow: "hidden", // Ensure content does not overflow the box
          }}
        >
          <Typography
            component="a"
            href="#"
            target="blank"
            sx={{ fontSize: "14px", color: "gray", textDecoration: "none" }}
          >
            &copy; 2024, All Rights Reserved
          </Typography>
          <Box component="span" sx={{ display: "flex", gap: 2, flexWrap: "wrap", flexDirection: { xs: 'column', sm: "row" }, }}>
            <Typography
              component="a"
              href="/pdf/MusicDistributionTermsandCondition.pdf"
              target="blank"
              sx={{ fontSize: "14px", color: "gray", textDecoration: "none", wordBreak: "break-word" }}
            >
              Music Distribution Terms & Conditions
            </Typography>
            <Typography
              component="a"
              href="https://zfrmz.in/j6PdiLgQkeo48XZPgINI"
              target="blank"
              sx={{ fontSize: "14px", color: "gray", textDecoration: "none", wordBreak: "break-word" }}
            >
              Report Infringement
            </Typography>
            <Typography
              component="a"
              href="#"
              target="blank"
              sx={{ fontSize: "14px", color: "gray", textDecoration: "none", wordBreak: "break-word" }}
            >
              <Link
                href="/pdf/terms.pdf"
                target="_blank"
                passHref
                style={{
                  textDecoration: "none",
                  color: "gray",
                  wordBreak: "break-word",
                }}
              >
                Terms and Conditions
              </Link>
            </Typography>
            <Typography
              component="a"
              href="#"
              target="blank"
              sx={{ fontSize: "14px", color: "gray", textDecoration: "none", wordBreak: "break-word" }}
            >
              <Link
                href="/pdf/privacy-policy.pdf"
                target="_blank"
                passHref
                style={{
                  textDecoration: "none",
                  color: "gray",
                  wordBreak: "break-word",
                }}
              >
                Privacy Policy
              </Link>
            </Typography>
            <Typography
              component="a"
              href="/sitemap.xml"
              target="blank"
              sx={{ fontSize: "14px", color: "gray", textDecoration: "none", wordBreak: "break-word" }}
            >
              Sitemap
            </Typography>
          </Box>
        </Box>


      </Container>
    </Box>
  );
}
