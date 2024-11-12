import React from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { SxProps, Theme } from '@mui/material/styles';

interface CustomLoadingButtonProps extends LoadingButtonProps {
    loading: boolean;
    sx?: SxProps<Theme>;
}

const CustomLoadingButton: React.FC<CustomLoadingButtonProps> = ({ loading, sx, ...props }) => {
    return (
        <LoadingButton
            loading={loading}
            sx={{ ...sx }}
            {...props}
        >
            {props.children}
        </LoadingButton>
    );
};

export default CustomLoadingButton;
