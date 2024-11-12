'use client'
import React, { useEffect, useState } from 'react';
import { Box, Link, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation"

const circleVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { opacity: 1, pathLength: 1 }
};

const checkmarkVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { opacity: 1, pathLength: 1 }
};

const noteVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: -10 }
};

interface AnimatedCheckWithNotesProps {
    isVisible: boolean;
}


const AnimatedCheckWithNotes: React.FC<AnimatedCheckWithNotesProps> = ({ isVisible }) => {
    const [showNotes, setShowNotes] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShowNotes(true);
        }
    }, [isVisible]);
    return (
        <>
            <motion.svg
                width="180"
                height="180"
                viewBox="0 0 100 100"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                onAnimationComplete={() => setShowNotes(true)}
            >
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="green"
                    strokeWidth="7"
                    variants={circleVariants}
                    transition={{ duration: 0.8 }}
                />
                <motion.path
                    d="M30 50 L45 65 L70 35"
                    fill="none"
                    stroke="black"
                    strokeWidth="7"
                    strokeLinecap="round"
                    variants={checkmarkVariants}
                    transition={{ duration: 0.8, delay: 1 }}
                />
            </motion.svg>
        </>
    );
};

const ConfirmationMessage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Trigger the animation on component mount
        setIsVisible(true);
    }, []);

    return (
        <Box sx={{
            paddingX: {
                xl: 5,
                sm: 2
            }
        }}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ margin: 10 }}>
                <AnimatedCheckWithNotes isVisible={isVisible} />
            </Box>
            <Box>
                <Typography textAlign={'center'} sx={{ fontSize: { sm: 21, xs: 16 } }}>
                    Thank you for your request! Our team has received your content and is currently working on it. If we need any additional information from you, we will reach out. Otherwise, you will receive a notification once the job is completed.
                </Typography>
                <Typography
                    sx={{ fontSize: { sm: 25, xs: 18 }, marginTop: 4 }}
                    fontWeight={'bold'}
                    textAlign={'center'}
                >
                    Thank you for choosing Deliver My Tune!
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Button type="submit" variant="outlined" sx={{
                    color: 'white',
                    border: 1,
                    borderColor: "primary",
                    background: '#FE8E0B',
                    borderRadius: 15,
                    "&:hover": {
                        color: 'primary',
                        background: "#333",
                        Border: 1,
                        borderColor: "primary",
                    },
                    my: {
                        md: 5,
                        xs: 3,
                    }
                }}
                    onClick={() => router.push('/dashboard/main')}>
                    Back To Home
                </Button>
            </Box>
        </Box >
    );
};

const AiMasterThankYouPage = () => {
    return (
        <>
            <ConfirmationMessage />
        </>
    );
};

export default AiMasterThankYouPage;
