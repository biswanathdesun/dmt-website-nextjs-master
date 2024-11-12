import { Typography, Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

interface EmptyContentProps {
  sx?: CSSProperties;
  img?: string;
  title: string;
  description?: string;
}

const EmptyContent: React.FC<EmptyContentProps> = ({
  title,
  description,
  img,
  sx,
  ...other
}) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        textAlign: "center",
        p: (theme) => theme.spacing(8, 2),
        ...sx
      }}
      {...other}
    >
      <Image
        alt="empty content"
        src={img || "/public/images/illustration_empty_cart.svg"}
        height={240}
        width={270}
      />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      )}

      <Button
        variant="outlined"
        sx={{
          borderColor: "#ff8B00",
          color: "#ff8B00",
          "&:hover": {
            borderColor: "#ff8B00",
            color: "#ff8B00"
          },
          mt: 2
        }}
      >
        <Link
          href="/"
          passHref
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {/* <a style={{ textDecoration: "none", color: "inherit" }}> */}
          Continue Shopping
          {/* </a> */}
        </Link>
      </Button>
    </Stack>
  );
};

export default EmptyContent;
