import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import { Card } from "@mui/material";

type TableColumn = {
  id: string;
  label: string;
  align?: "right" | "left" | "center" | "justify" | "inherit";
};

type TableRowData = {
  [key: string]: any;
};

type BasicTableProps = {
  columns: TableColumn[];
  rows: TableRowData[];
  rowsPerPageOptions?: number[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  showCheckbox?: boolean;
  selectedRows: Set<number>;
  onRowSelect: (rowIndex: number, rowData: TableRowData) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
};

const BasicTable: React.FC<BasicTableProps> = ({
  columns,
  rows,
  rowsPerPageOptions = [5, 10, 25,50,75,100],
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  loading,
  showCheckbox = false,
  selectedRows,
  onRowSelect,
  onSearch,
  searchQuery
}) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    rowData: TableRowData
  ) => {
    onRowSelect(rowIndex, rowData);
  };

  const isSelected = (rowIndex: number) => selectedRows.has(rowIndex);

  const filteredRows = rows?.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = new Set<number>();
      filteredRows.forEach((_, index) => newSelectedRows.add(index));
      onRowSelect(-1, Array.from(newSelectedRows));
    } else {
      onRowSelect(-1, new Set());
    }
  };

  return (
    <Card>
      <TableContainer style={{ maxHeight: "400px", overflow: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {showCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedRows.size > 0 &&
                      selectedRows.size < filteredRows.length
                    }
                    checked={
                      filteredRows.length > 0 &&
                      selectedRows.size === filteredRows.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || "left"}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showCheckbox ? 1 : 0)}
                  align="center"
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showCheckbox ? 1 : 0)}
                  align="center"
                >
                  No matching records found
                </TableCell>
              </TableRow>
            ) : (
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const rowIndex = rows.indexOf(row);
                  const isItemSelected = isSelected(rowIndex);

                  return (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 }
                      }}
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      {showCheckbox && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) =>
                              handleCheckboxChange(event, rowIndex, row)
                            }
                            inputProps={{
                              "aria-labelledby": `checkbox-${index}`
                            }}
                          />
                        </TableCell>
                      )}
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align || "left"}
                        >
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Card sx={{ mt: 5 }}>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Card>
    </Card>
  );
};

export default BasicTable;
