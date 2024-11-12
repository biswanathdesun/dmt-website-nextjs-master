"use client";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { getReleasesOrderAsync } from "@/redux/services/releases";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable
} from "@/components/common/table";
import Scrollbar from "@/components/common/scrollbar/Scrollbar";
import TableRowMyRelease from "./TableRowMyRelease";

interface HeadCell {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
  minWidth?: string;
}
const TABLE_HEAD: readonly HeadCell[] = [
  { id: "isrc", label: "ISRC" },
  { id: "upc", label: "UPC" },
  { id: "song_name", label: "SONG NAME" },
  { id: "label_name", label: "LABEL NAME" },
  { id: "artist_name", label: "ARTIST NAME" },
  { id: "issues", label: "ISSUES" },
  { id: "action", label: "ACTION" }
] as const;

const limit = localStorage.getItem("table-rows-per-page") ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit) };

const MyReleases = () => {
  const {
    dense,
    selected,
    onSelectRow,
    onChangeDense,
    onSort,
    setPage,
    setRowsPerPage
  } = useTable({
    defaultDense: false,
    defaultOrderBy: "name",
    defaultOrder: "asc",
    defaultCurrentPage: 0,
    defaultRowsPerPage: 10,
    defaultSelected: []
  });

  const dispatch: AppDispatch = useDispatch();
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const { isLoading, releasesList,count } = useSelector(
    (state: RootState) => state.release
  );

  React.useEffect(() => {
    fetchData(query.page - 1, query.limit, searchQuery, selectedStatus);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.limit]);

  const fetchData = async (
    page: number,
    rowsPerPage: number,
    query: string,
    status: string
  ) => {
    const params = {
      page: page + 1, // API pages are usually 1-based
      limit: rowsPerPage,
      search: query,
      status: "edit required" // include status in the params
    };
    try {
      await dispatch(getReleasesOrderAsync(params));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<{}>, value: any) => {
    setSelectedStatus(value?.value || "");
  };

  const handleFilter = () => {
    setQuery((prev) => ({ ...prev, page: 1 }));
    fetchData(query.page - 1, query.limit, searchQuery, selectedStatus);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedStatus("");
    setQuery(DEFAULT_QUERY);
    fetchData(DEFAULT_QUERY.page - 1, DEFAULT_QUERY.limit, "", "");
  };

  const handlePageChange = (event: any, newPage: number) => {
    setQuery((p) => {
      p.page = newPage + 1;
      return { ...p };
    });
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const newLimit = parseInt(value, 10);
    setQuery((p) => ({
      ...p,
      page: 1,
      limit: newLimit
    }));
    setRowsPerPage(newLimit);
  };

  return (
    <Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography variant="h4">Edit Required</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <TextField
            size="small"
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* <Autocomplete
            options={statusFilter}
            getOptionLabel={(option) => option.label}
            value={
              statusFilter.find((option) => option.value === selectedStatus) ||
              null
            }
            onChange={handleStatusChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Status"
                variant="outlined"
                size="small"
              />
            )}
            sx={{ width: 200 }}
          /> */}
          <Box>
            <Button
              variant="contained"
              sx={{ color: "white", gap: 2 }}
              onClick={handleFilter}
            >
              <Icon icon="lets-icons:filter-big" fontSize={24} />
              Filter
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }} onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Box>
      </Box>

      <Card sx={{ mt: 4 }}>
        <TableContainer sx={{ position: "relative", overflow: "unset" }}>
          <Scrollbar>
            <Table size={dense ? "small" : "medium"} sx={{ minWidth: 600 }}>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
                rowCount={releasesList?.length}
                numSelected={selected.length}
                onSort={onSort}
                // onSelectAllRows={(checked) =>
                //   onSelectAllRows(
                //     checked,
                //     releasesList?.map((row: any) => row?._id)
                //   )
                // }
                sx={{
                  backgroundColor: "#FFF4E7"
                }}
              />
              <TableBody>
                {!isLoading &&
                  releasesList?.map((row, index) => (
                    <TableRowMyRelease
                      query={query}
                      key={row._id}
                      index={index}
                      row={row}
                      dense={dense}
                      onSelectRow={() => onSelectRow(row._id)}
                      selected={selected.includes(row._id)}
                    />
                  ))}

                <TableNoData
                  isLoading={isLoading}
                  isNotFound={!releasesList?.length && !isLoading}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
          count={count}
          rowsPerPage={query.limit}
          page={query.page - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </Card>
    </Box>
  );
};

export default MyReleases;

