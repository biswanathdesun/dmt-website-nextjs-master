import {
  Box,
  Button,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import dayjs from "dayjs";
import { capitalize } from "lodash";
interface TableRowMyReleaseProps {
  index: number;
  row: any; // Define the row type appropriately
  dense: boolean;
    selected: boolean;
    query: any;
}

const LedgerTableRow: React.FC<TableRowMyReleaseProps> = ({
  index,
  row,
  dense,
    selected,
    query,
}) => {
  return (
    <TableRow>
      <TableCell>
        <Typography>
          {Number(index) + 1 + (Number(query?.page) - 1) * Number(query?.limit)}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>
          {row?.created_at
            ? dayjs(row?.created_at).format("DD-MM-YYYY")
            : dayjs(row?.createdAt).format("DD-MM-YYYY")}
        </Typography>
      </TableCell>
      {(row?.type || row?.type ==="") && (
        <TableCell>
          {" "}
          <Typography>{capitalize(row?.type) || "-"}</Typography>
        </TableCell>
      )}
      {(row?.transactionType || row?.transactionType==="") && (
        <TableCell>
          <Typography>{row?.transactionType || "-"}</Typography>
        </TableCell>
      )}
      {(row?.actualSong || row?.actualSong === 0) && (
        <TableCell>
          <Typography>{row?.actualSong || "-"}</Typography>
        </TableCell>
      )}
      <TableCell>
        <Typography>{row?.credit || "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{row?.debit || "-"}</Typography>
      </TableCell>

      {(row?.amount || row?.amount === 0 ) && (
        <TableCell>
          <Typography>{row?.amount || "-"}</Typography>
        </TableCell>
      )}
      {(row?.balanceSong || row?.balanceSong === 0) && (
        <TableCell>
          <Typography>{row?.balanceSong || "-"}</Typography>
        </TableCell>
      )}
    </TableRow>
  );
};

export default LedgerTableRow;
