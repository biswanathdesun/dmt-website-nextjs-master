import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface StickyImageProps {
    currentImage: string;
}

const StickyImage: React.FC<StickyImageProps> = ({ currentImage }) => {
    const [fix, setFix] = useState<boolean>(false);
    const [top, setTop] = useState<number>(0);

    const getScrollThresholds = (): { fixStart: number; fixEnd: number; topPosition: number } => {
        const width = window.innerWidth;

        if (width <= 1024) {
            return { fixStart: 800, fixEnd: 3400, topPosition: 4000 };
        } else if (width <= 1080) {
            return { fixStart: 900, fixEnd: 2200, topPosition: 2000 };
        } else if (width <= 2560) {
            return { fixStart: 900, fixEnd: 3050, topPosition: 2370 };
        } else {
            return { fixStart: 1000, fixEnd: 4000, topPosition: 4000 };
        }
    };

    useEffect(() => {
        const setFixedSidebar = () => {
            const { fixStart, fixEnd, topPosition } = getScrollThresholds();

            if (window.scrollY >= fixEnd) {
                setFix(false);
            } else if (window.scrollY >= fixStart) {
                setFix(true);
            } else {
                setFix(false);
            }

            if (window.scrollY >= fixEnd - 360 && !fix) {
                setTop(topPosition);
            } else {
                setTop(32);
            }
        };

        window.addEventListener('scroll', setFixedSidebar);

        return () => {
            window.removeEventListener('scroll', setFixedSidebar);
        };
    }, [fix]);

    return (
        <Box
            sx={{
                position: fix ? 'fixed' : 'sticky',
                top: top,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}
        >
            <motion.img
                key={currentImage}
                src={currentImage}
                alt="background"
                style={{
                    maxWidth: '70%',
                    maxHeight: '70%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
            />
        </Box>

    );
};

export default StickyImage;
