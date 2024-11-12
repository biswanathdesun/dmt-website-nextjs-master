
import loginImage from '@public/images/login/loginLayoutImage.png'
import AuthLoginForm from "./component/AuthLoginForm";
import LoginLayout from "@/components/common/loginLayout/LoginLayout";

export default function Login() {
    return (
      <LoginLayout
        layoutText="Register Yourself and start Your Journey"
        imageStyle={{ width: "100%", height: "100vh" }}
        loginImage={loginImage}
        title="Login to your account"
        contentComponent={<AuthLoginForm />}
      />
    );
}
