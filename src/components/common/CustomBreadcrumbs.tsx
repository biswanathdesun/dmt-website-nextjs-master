// components/CustomBreadcrumbs.tsx
import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Link,
  Stack,
  Typography,
  Breadcrumbs,
  styled,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface LinkItem {
  name: string;
  href?: string;
}

interface CustomBreadcrumbsProps {
  sx?: any;
  action?: React.ReactNode;
  links: LinkItem[];
  heading?: string;
  moreLink?: string[];
  activeLast?: boolean;
}

const CustomSeparator = styled("span")({
  width: 4,
  height: 4,
  borderRadius: "50%",
  bgcolor: "text.disabled",
});

const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({
  sx,
  action,
  links,
  heading,
  moreLink,
  activeLast,
}) => {
  const lastLink = links[links.length - 1]?.name;

  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {heading && (
            <Typography variant="h5" gutterBottom>
              <FiberManualRecordIcon
                sx={{
                  fontSize: "16px",
                  color: "#f9971e",
                  mr:1
                }}
              />
              {heading}
            </Typography>
          )}

          {!!links.length && (
            <Breadcrumbs separator={<CustomSeparator />}>
              {links.map((link, index) => (
                <LinkItem
                  key={index}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Stack>

      {!!moreLink && (
        <Box sx={{ mt: 2 }}>
          {moreLink.map((href, index) => (
            <Link
              key={index}
              noWrap
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: "table" }}
            >
              {href}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

CustomBreadcrumbs.propTypes = {
  sx: PropTypes.object,
//   action: PropTypes.node,
// //   links: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       href: PropTypes.string,
//     })
//   ).isRequired,
  heading: PropTypes.string,
// //   moreLink: PropTypes.arrayOf(PropTypes.string),
  activeLast: PropTypes.bool,
};

export default CustomBreadcrumbs;

interface LinkItemProps {
  link: LinkItem;
  activeLast?: boolean;
  disabled?: boolean;
}

const LinkItem: React.FC<LinkItemProps> = ({ link, activeLast, disabled }) => {
  return (
    <Link
      color={disabled ? "text.disabled" : "inherit"}
      href={link.href || "#"}
      underline={!disabled ? "hover" : "none"}
    >
      {link.name}
    </Link>
  );
};


