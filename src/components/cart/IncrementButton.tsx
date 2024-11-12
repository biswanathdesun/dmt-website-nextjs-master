import React, { forwardRef } from "react";
import { alpha, SxProps } from "@mui/material/styles";
import { Stack, IconButton, CircularProgress, Box, Theme } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IncrementerButtonProps {
  isLoading?: boolean;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabledIncrease?: boolean;
  disabledDecrease?: boolean;
  sx?: SxProps<Theme>;
  [key: string]: any;
}

const IncrementerButton = forwardRef<HTMLDivElement, IncrementerButtonProps>(
  function IncrementerButton(
    {
      isLoading,
      quantity,
      onIncrease,
      onDecrease,
      disabledIncrease,
      disabledDecrease,
      sx,
      ...other
    },
    ref
  ) {
    return (
      <Stack
        ref={ref}
        flexShrink={0}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mb: 0.5,
          py: 0.5,
          px: 0.75,
          width: 96,
          borderRadius: 1,
          border: (theme) =>
            `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
          ...sx
        }}
        {...other}
      >
        <IconButton
          size="small"
          color="inherit"
          onClick={onDecrease}
          disabled={disabledDecrease}
          sx={{ color: "text.secondary" }}
        >
          <Icon icon="eva:minus-fill" width={16} />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 20,
            height: 20
          }}
        >
          {isLoading ? <CircularProgress size={16} /> : quantity}
        </Box>
        <IconButton
          size="small"
          color="inherit"
          onClick={onIncrease}
          disabled={disabledIncrease}
          sx={{ color: "text.secondary" }}
        >
          <Icon icon="eva:plus-fill" width={16} />
        </IconButton>
      </Stack>
    );
  }
);

IncrementerButton.displayName = "IncrementerButton";

export default IncrementerButton;
