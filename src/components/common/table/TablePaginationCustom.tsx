import {
  Box,
  Switch,
  TablePagination,
  FormControlLabel,
  SxProps
} from "@mui/material";
import { ChangeEvent } from "react";

interface TablePaginationCustomProps {
  dense?: boolean;
  onChangeDense?: (event: ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions?: number[];
  sx?: SxProps;
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function TablePaginationCustom({
  dense = false,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25, 50 , 100],
  sx,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  ...other
}: TablePaginationCustomProps) {
  return (
    <Box sx={{ position: "relative", ...sx }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        {...other}
      />

      {/* {onChangeDense && (
        <FormControlLabel
          label="Dense"
          control={<Switch checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: "absolute"
            }
          }}
        />
      )} */}
    </Box>
  );
}
