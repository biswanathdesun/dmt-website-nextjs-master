import {
  Button,
  Checkbox,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatDate } from "./../../../../../utils/utils";
import { capitalize } from "lodash";
interface TableRowMyReleaseProps {
  index: number;
  row: any; // Define the row type appropriately
  dense: boolean;
  selected: boolean;
}

const TableRowMasteredAudio: React.FC<TableRowMyReleaseProps> = ({
  index,
  row,
  dense,
  selected,
}) => {
  const showAudio = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <TableRow>
      <TableCell>
        <Typography
          sx={{
            color: "#585858",
            fontWeight: "500",
            fontFamily: "Lato",
            fontSize: "1.21rem"
          }}
        >
          {index + 1}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            color: "#585858",
            fontWeight: "500",
            fontFamily: "Lato",
            fontSize: "1.21rem"
          }}
        >
          {row?.songName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            color: "#585858",
            fontWeight: "500",
            fontFamily: "Lato",
            fontSize: "1.21rem",
            textTransform: "capitalize"
          }}
        >
          {row?.songStatus}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          size="small"
          label={capitalize(row?.paymentStatus)}
          color={
            row?.paymentStatus === "pending"
              ? "warning"
              : row?.paymentStatus === "paid"
              ? "success"
              : "error"
          }
        />
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            color: "#585858",
            fontWeight: "500",
            fontFamily: "Lato",
            fontSize: "1.21rem"
          }}
        >
          {formatDate(row?.created_at)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            color: "#585858",
            fontWeight: "500",
            fontFamily: "Lato",
            fontSize: "2rem",
            cursor: "pointer"
          }}
        >
          {row?.updatedsongbyadmin && (
            <Icon
              icon="typcn:download"
              onClick={() => showAudio(row?.updatedsongbyadmin)}
              color="#f7a604"
            />
          )}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            color: "#585858",
            fontWeight: "500",
            fontFamily: "Lato",
            fontSize: "2rem",
            cursor: "pointer"
          }}
        >
          <Icon
            icon="typcn:download"
            onClick={() => showAudio(row?.file)}
            color="#f7a604"
          />
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default TableRowMasteredAudio;
