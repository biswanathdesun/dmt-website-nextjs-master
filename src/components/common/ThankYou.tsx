'use client'
import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import thankYouImage from '@public/images/ThankYouImage.png'; // Adjust the path as needed
import { useRouter } from 'next/navigation';

const letters = "Thank You".split("");

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const letterVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const ThankYou: React.FC = () => {
    const router = useRouter();
    return (
        <Box sx={{
            position: 'relative',
            padding: {
                sm: 10,
                xs: 5
            },
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden', // Prevents scrollbars from appearing
        }}>
            {/* Responsive Image Container */}
            <Box sx={{
                width: '100%',
                maxWidth: 400, // Maximum width of the image
                position: 'relative',
                height: 'auto',
                mb: 4 // Margin bottom to space out from text
            }}>
                <Image
                    src={thankYouImage}
                    alt="Thank You"
                    layout="responsive" // Makes the image responsive
                    width={400} // Original width
                    height={400} // Original height
                    style={{ objectFit: 'contain' }} // Ensures image fits within the container
                />
            </Box>

            <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" zIndex={1} position="relative">
                <Typography
                    component={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    gutterBottom
                    sx={{
                        display: 'flex',
                        fontFamily: 'raleway',
                        fontSize: {
                            sm: 80,
                            xs: 30
                        },
                        fontWeight: 'bold',
                        letterSpacing: -0.05
                    }}
                >
                    {letters.map((letter, index) => (
                        <motion.span key={index} variants={letterVariants}>
                            {letter}
                        </motion.span>
                    ))}
                </Typography>
                <Typography
                    sx={{ fontSize: { sm: 20, xs: 18 } }}
                    fontWeight={'bold'}
                    textAlign={'center'}
                >
                    for choosing Deliver My Tune!
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Button type="submit" variant="outlined" sx={{
                    color: 'primary',
                    border: 1,
                    borderColor: "primary",
                    borderRadius: 15,
                    "&:hover": {
                        color: 'white',
                        background: "#FE8E0B",
                        Border: 1,
                        borderColor: "primary",
                    },
                    my: {
                        md: 5,
                        xs: 3,
                    }
                }}
                    onClick={() => router.push('/')}>
                    Back To Home
                </Button>
            </Box>
        </Box>
    );
};

export default ThankYou;
