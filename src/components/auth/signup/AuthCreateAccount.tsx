'use client'
import Image from "@public/images/login/signUpImage.png";
import LoginLayout from "@/components/common/loginLayout/LoginLayout";
import CreateAccount from "./components/CreateAccount";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import OTPForm from "./components/OtpForm";
import otpimage from "@public/images/otpimage.png";

export default function AuthCreateAccount() {
  const [userData, setUserData] = useState({});
  const [isOtp, setIsOtp] = useState(false)
  const isMediumScreen = useMediaQuery('(max-width:1024px)');
  return !isOtp ? (
    <LoginLayout
      layoutText="Register Yourself and start Your Journey"
      imageStyle={{ width: "100%", height: isMediumScreen ? "120vh" : "110vh" }}
      loginImage={Image}
      title="Create your account"
      contentComponent={
        <CreateAccount setUserData={setUserData} setIsOtp={setIsOtp} />
      }
    />
  ) : (
    <LoginLayout
      layoutText=""
      imageStyle={{ width: "100%", height: "100vh" }}
      loginImage={otpimage}
      title="Enter OTP"
      contentComponent={<OTPForm userData={userData} setIsOtp={setIsOtp} />}
    />
  );
}
