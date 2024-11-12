'use client'
import { Typography, TypographyProps } from '@mui/material';
import React from 'react';
import { ReactNode } from "react";

interface ParagraphProps extends TypographyProps {
    text: string;
}

const ParagraphText: React.FC<ParagraphProps> = ({ text, ...props }: ParagraphProps) => {
    return (
        <Typography
            variant="h5"
            sx={{
                fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
                ...props.sx
            }}
            {...props}
        >
            {text}
        </Typography>
    );
};

export default ParagraphText;
