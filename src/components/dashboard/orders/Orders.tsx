"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";

import Scrollbar from "@/components/common/scrollbar/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from "@/components/common/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import TableRowOrders from "./componet/TableRowOrders";
import { getOrdersDetailAsync } from "@/redux/services/ordersDetails";

const TABLE_HEAD = [
  { id: "action", label: "Action" },
  { id: "sNo", label: "S.No" },
  { id: "name", label: "Customer" },
  { id: "phone", label: "Phone" },
  { id: "plan", label: "Plan" },
  { id: "plantype", label: "Plan Type" },
  { id: "amount", label: "Amount" },
  { id: "purchaseDate", label: "Purchase Date" },
  { id: "time", label: "Time" },
  { id: "paymentStatus", label: "Payment Status" },
  { id: "orderId", label: "Order_Id" },
];

const limit = localStorage.getItem("table-rows-per-page") ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit) };

const Orders = () => {
  const {
    dense,
    order,
    orderBy,
    selected,
    onSelectAllRows,
    onSelectRow,
    onChangeDense,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
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
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const { isLoading, orderDetailsList, count } = useSelector(
    (state: RootState) => state.orderDetails
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    fetchData(query.page - 1, query.limit);
  }, [query.page, query.limit]);

  const fetchData = async (page: number, rowsPerPage: number) => {
    const params = {
      page: page + 1, // API pages are usually 1-based
      limit: rowsPerPage,
    };
    try {
      await dispatch(getOrdersDetailAsync(params));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (event: any, newPage: number) => {
    setQuery((p) => ({ ...p, page: newPage + 1 }));
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    setQuery((p) => ({ ...p, page: 1, limit: newLimit }));
    setRowsPerPage(newLimit);
  };

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontFamily: "Raleway", color: "#333", fontWeight: 700 }}
      >
        Your Orders
      </Typography>
      <TableContainer component={Paper} sx={{ position: "relative" }}>
        <Scrollbar>
          <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
              rowCount={count}
              numSelected={selected.length}
              onSort={onSort}
              sx={{ backgroundColor: "#FFF4E7" }}
            />
            <TableBody>
              {!isLoading &&
                orderDetailsList?.map((row, index) => (
                  <TableRowOrders
                    key={row._id}
                    index={index}
                    row={row}
                    dense={dense}
                    selected={selected.includes(row._id)}
                  />
                ))}
              <TableEmptyRows
                emptyRows={
                  orderDetailsList?.length
                    ? query.limit - orderDetailsList?.length
                    : 0
                }
              />
              <TableNoData
                isLoading={isLoading}
                isNotFound={!orderDetailsList?.length && !isLoading}
              />
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePaginationCustom
          rowsPerPageOptions={[5, 10, 25]}
          count={count}
          rowsPerPage={query.limit}
          page={query.page - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </TableContainer>
    </>
  );
};

export default Orders;
