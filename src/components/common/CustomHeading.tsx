'use client'
import { Typography, TypographyProps, SxProps } from '@mui/material';
import React from 'react';

interface CustomHeadingProps extends TypographyProps {
    text: string;
    customStyles?: SxProps;
}

const CustomHeading: React.FC<CustomHeadingProps> = ({ text, customStyles, }) => {
    return (
        <Typography
            variant="subtitle1"
            sx={{
                fontWeight: 600,
                fontFamily: "Raleway",
                fontSize: { xs: 30, sm: 40, md: 50 },
                color: "#000000",
                ...customStyles,
            }}
        >
            {text}
        </Typography>
    );
};

export default CustomHeading;
