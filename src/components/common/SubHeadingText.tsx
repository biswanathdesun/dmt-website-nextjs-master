'use client'
import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

interface SubHeadingTextProps extends TypographyProps {
    text: string;
}

const SubHeadingText: React.FC<SubHeadingTextProps> = ({ text, ...props }) => {
    return (
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight:700,
          fontFamily:"Raleway",
          fontSize: { xs: 30, md: 40 },
          color: "#000000",
          ...props.sx
        }}
        {...props}
      >
        {text}
      </Typography>
    );
};

export default SubHeadingText;
