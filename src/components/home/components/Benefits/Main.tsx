'use client'
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import BenefitSm from './BenefitSm';
import BenefitsLg from './Benefits';



export default function SimpleMediaQuery() {
    const matches = useMediaQuery('(max-width:898px)');

    return (
        <div>
            {matches ? (
                <BenefitSm />
            ) : (
                <BenefitsLg />
            )}
        </div>
    );
}