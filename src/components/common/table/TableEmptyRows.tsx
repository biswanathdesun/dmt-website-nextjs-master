import { TableRow, TableCell, SxProps, Theme } from "@mui/material";
import React from "react";

// Define the props interface
interface TableEmptyRowsProps {
  height?: number;
  emptyRows?: number;
}

const TableEmptyRows: React.FC<TableEmptyRowsProps> = ({
  emptyRows = 0,
  height
}) => {
  if (emptyRows <= 0) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height &&
          ({
            height: height * emptyRows
          } as SxProps<Theme>))
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
};

export default TableEmptyRows;
