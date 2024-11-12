import DistributeNow from "@/components/common/distributeNow/DistributeNow";
import Footer from "@/components/common/footer/Footer";
import HeadBanner from "@/components/common/HeadBanner";
import Navbar from "@/components/common/navbar/Navbar";
import HelpList from "@/components/helpPage/components/HelpList";

export default function page() {
  return (
    <>
      <Navbar />
      <HeadBanner> Help Page </HeadBanner>
      <HelpList />
      <DistributeNow />
      <Footer />
    </>
  );
}
