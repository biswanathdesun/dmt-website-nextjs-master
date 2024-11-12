import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

interface RadioButtonGroupProps {
    label: string;
    options: any;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ label, options, value, onChange }) => {
    return (
        <FormControl component="fieldset" style={{ margin: '20px' }}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup row aria-label={label} name={label} value={value} onChange={onChange}>
                {options.map((option?:any) => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;
