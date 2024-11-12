import DistributeNow from "@/components/common/distributeNow/DistributeNow";
import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import Services from "@/components/services-pricing/Services";

export default function ServicePage() {
    return (
        <>
            <Navbar />
            <Services />
            <DistributeNow />
            <Footer />
        </>
    )
}