import loginImage from "@public/images/login/CreatePasswordImage.png";
import AuthCreatePassword from "./component/AuthCreatePassword";
import LoginLayout from "@/components/common/loginLayout/LoginLayout";

export default function Login() {
  return (
    <LoginLayout
      layoutText=" "
      imageStyle={{ width: "100%", height: "100vh" }}
      loginImage={loginImage}
      title="Create Password"
      contentComponent={<AuthCreatePassword />}
    />
  );
}
