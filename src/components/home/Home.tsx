import { Box } from "@mui/material";
import MainBanner from "./components/MainBanner";
import DistributeNow from "../common/distributeNow/DistributeNow";
import AutoPlay from "./components/Slider";
import Areal from "./components/Areal";
import Benefits from "./components/Benefits/Main";
import Services from "./components/services/Services";
import Footer from "../common/footer/Footer";

export default function Home() {
  console.log('home 1')
  return (
    <>
      <Box>
        <MainBanner />
        <Areal />
        <Benefits />
        <Services />
        <AutoPlay />
        <DistributeNow />
        <Footer />
      </Box>
    </>
  );
}
