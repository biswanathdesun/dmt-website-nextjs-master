import React from "react";
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel
} from "@mui/material";
import { SxProps } from "@mui/system";

interface HeadCell {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
  minWidth?: string;
}

interface TableHeadCustomProps {
  sx?: SxProps;
  onSort?: (id: string) => void;
  orderBy?: string;
  headLabel: readonly HeadCell[];
  rowCount?: number;
  numSelected?: number;
  onSelectAllRows?: (checked: boolean) => void;
  showCheckBox?: boolean;
  order?: "asc" | "desc";
}

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)"
};

const TableHeadCustom: React.FC<TableHeadCustomProps> = ({
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx,
  showCheckBox = true
}) => {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {onSelectAllRows && showCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event) => onSelectAllRows(event.target.checked)}
            />
          </TableCell>
        )}

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {onSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => onSort(headCell.id)}
                sx={{ textTransform: "capitalize" }}
              >
                {headCell.label}

                {orderBy === headCell.id ? (
                  <Box >
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadCustom;
