import React from 'react'
import { Box, Card, CardMedia } from '@mui/material';
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import Image from 'next/image';
import ComingSoonImg from '@public/images/ComingSoon.png'

export default function ComingSoon() {
    return (
        <>
            <Navbar />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    src={ComingSoonImg}
                    alt="Coming Soon"
                    loading='lazy'
                    width={440}
                    height={440}
                />
            </Box>
            <Footer />
        </>
    )
}
