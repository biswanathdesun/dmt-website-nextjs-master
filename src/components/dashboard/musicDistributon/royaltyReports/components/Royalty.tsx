import * as React from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Card, Table, TableBody, TableContainer } from "@mui/material";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from "@/components/common/table";
import Scrollbar from "@/components/common/scrollbar/Scrollbar";
import TableRowRoyalty from "./tableRows/TableRowRoyalty";
import { getRoyaltyReportByIdAsync } from "@/redux/services/royalty";

interface HeadCell {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
  minWidth?: string;
}

const TABLE_HEAD: readonly HeadCell[] = [
  { id: "values", label: "Royalty Value" },
  { id: "dateCreated", label: "Month and Year" },
  { id: "status", label: "Status" },
  { id: "downloads", label: "Downloads" },
] as const;


interface UserData {
  id: string;
}

const storedUserData = localStorage.getItem("userData");
const userData: UserData | null = storedUserData
  ? JSON.parse(storedUserData)
  : null;

interface RoyaltyPropTypes {
  query: any;
  setQuery: any;
}

const Royalty: React.FC<RoyaltyPropTypes> = ({query, setQuery}) => {


  const {
    dense,
    order,
    orderBy,
    selected,
    onChangeDense,
    onSort,
    setPage,
    setRowsPerPage,
  } = useTable({
    defaultDense: false,
    defaultOrderBy: "name",
    defaultOrder: "asc",
    defaultCurrentPage: 0,
    defaultRowsPerPage: 10,
    defaultSelected: [],
  });

 
  const dispatch: AppDispatch = useDispatch();
  const { royaltyLoading, royaltyReport } = useSelector(
    (state: RootState) => state.royaltyData
  );



  const handlePageChange = (event: any, newPage: number) => {
    setQuery((prev:any) => ({ ...prev, page: newPage + 1 }));
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newLimit = parseInt(value, 10);
    setQuery({ page: 1, limit: newLimit });
    setRowsPerPage(newLimit);
  };



  return (
    <Card>
      <TableContainer sx={{ position: "relative", overflow: "unset" }}>
        <Scrollbar>
          <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
              rowCount={royaltyReport?.transactions?.length}
              numSelected={selected.length}
              onSort={onSort}
            />
            <TableBody>
              {!royaltyLoading &&
                royaltyReport?.transactions?.map(
                  (
                    row: { _id: React.Key | null | undefined },
                    index: number
                  ) => (
                    <TableRowRoyalty
                      key={row._id}
                      index={index}
                      row={row}
                      dense={dense}
                      selected={selected.includes(row._id)}
                    />
                  )
                )}
              <TableEmptyRows
                emptyRows={
                  royaltyReport?.transactions?.length
                    ? query.limit - royaltyReport?.transactions?.length
                    : 0
                }
              />
              <TableNoData
                isLoading={royaltyLoading}
                isNotFound={
                  !royaltyReport?.transactions?.length && !royaltyLoading
                }
              />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        // rowsPerPageOptions={[5, 10, 25]}
        count={royaltyReport?.count}
        rowsPerPage={query.limit}
        page={query.page - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        dense={dense}
        onChangeDense={onChangeDense}
      />
    </Card>
  );
};

export default Royalty;
