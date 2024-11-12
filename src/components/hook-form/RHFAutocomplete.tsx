import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField, AutocompleteProps } from "@mui/material";

// Define the props interface for the custom component
interface RHFAutocompleteProps
  extends Omit<AutocompleteProps<any, any, any, any>, "name" | "renderInput"> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
}

const RHFAutocomplete: React.FC<RHFAutocompleteProps> = ({
  name,
  label,
  helperText,
  placeholder,
  ...other
}) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
            />
          )}
          {...other}
        />
      )}
    />
  );
};

export default RHFAutocomplete;
