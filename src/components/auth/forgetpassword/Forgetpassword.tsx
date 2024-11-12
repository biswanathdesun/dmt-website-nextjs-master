import loginImage from "@public/images/login/ForgetPasswordImage.png";
import AuthForgetPassword from "./component/AuthForgetPassword";
import LoginLayout from "@/components/common/loginLayout/LoginLayout";

export default function Login() {
  return (
    <LoginLayout
      layoutText=""
      imageStyle={{ width: "100%", height: "100vh" }}
      loginImage={loginImage}
      title="Forget Password"
      contentComponent={<AuthForgetPassword />}
    />
  );
}
