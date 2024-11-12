import { Box, Container, Grid, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import Logo from "@public/images/loginLogo.png";
import { ReactNode } from "react";

interface LoginLayoutProps {
  loginImage: StaticImageData;
  imageStyle?: object;
  contentComponent: ReactNode;
  title: string;
  layoutText: string;
}

export default function LoginLayout({
  loginImage,
  layoutText,
  imageStyle,
  contentComponent,
  title,
}: LoginLayoutProps) {
  return (
    <Grid container>
      <Grid item sm={6} xs={12}>
        <Box
          sx={{
            width: "100%",
            display: { sm: "flex", xs: "none" },
            position: "relative",
          }}
        >
          <Image src={loginImage} alt="Login-image" style={imageStyle} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            display: { xs: "none", sm: "flex" },
            top: { lg: 290, md: 250, sm: 280 },
            left: { lg: 50, md: 30, sm: 24 },
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { lg: 30, md: 24, sm: 20 },
              width: { lg: 380, md: 300, sm: 212 },
            }}
          >
            {layoutText}
          </Typography>
        </Box>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Box
          sx={{
            padding: { lg: 3.5, sm: 3, xs: "20px 10px" },
          }}
        >
          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image src={Logo} alt="logo" />
          </Box>
          <Container maxWidth="sm">
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontFamily: "Raleway",
                  fontSize: { xs: 27, sm: 22, md: 24, lg: 32 },
                  paddingY: { xs: 3, sm: 4, md: 4, lg: 2, xl: 6 },
                }}
                textAlign="start"
              >
                {title}
              </Typography>
            </Box>

            <Box>{contentComponent}</Box>
            {title === "Forget Password" && (
              <Typography py={2}>
                Go Back to
                <Box
                  component="a"
                  href="/auth/login"
                  sx={{ color: "primary.main", ml: 1 }}
                >
                  Login Page
                </Box>
              </Typography>
            )}
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}
