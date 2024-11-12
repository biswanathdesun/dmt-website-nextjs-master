import React from 'react'
import VideoGallery from '@/components/videoGallery/VideoGallery';
import DistributeNow from "@/components/common/distributeNow/DistributeNow";
import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import ComingSoon from '@/components/common/ComingSoon';

function page() {
    return (
        <>
            {/* <ComingSoon /> */}
            <Navbar />
            <VideoGallery />
            <DistributeNow />
            <Footer />
        </>
    )
}

export default page
