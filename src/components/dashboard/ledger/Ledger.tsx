"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  Tabs,
  Tab,
  TableContainer,
  Breadcrumbs,
  CircularProgress,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  TableHeadCustom,
  TablePaginationCustom,
  useTable,
} from "@/components/common/table";
import Scrollbar from "@/components/common/scrollbar/Scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import TableRowRefferals from "../wallet/component/TableRowRefferals";
import CustomBreadcrumbs from "@/components/common/CustomBreadcrumbs";
import { getCoinsAsync, getLedgerAsync } from "@/redux/services/ledger";
import LedgerTableRow from "./LedgerTableRow";

interface HeadCell {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
  minWidth?: string;
}

const TABLE_HEAD: readonly HeadCell[] = [
  { id: "sno", label: "S.No" },
  { id: "date", label: "Date" },
  { id: "type", label: "Type" },
  { id: "credit", label: "Credit" },
  { id: "debit", label: "Debit" },
  { id: "coins", label: "Coins" },
] as const;

const Transaction_TABLE_HEAD: readonly HeadCell[] = [
  { id: "sNo", label: "S.No" },
  { id: "date", label: "Date" },
  { id: "transactionType", label: "Transaction Type" },
  { id: "actualSong", label: "Actual Song" },
  { id: "credit", label: "Credit" },
  { id: "debit", label: "Debit" },
  { id: "balanceSong", label: "Balance Song" },
] as const;

const limit = localStorage.getItem("table-rows-per-page") ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit) };

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Ledger = () => {
  const dispatch: AppDispatch = useDispatch();
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const { isLoading, releasesList } = useSelector(
    (state: RootState) => state.release
  );
  const { ledgerCoinData, ledgerData, coinsLoader, ledgerLoader } = useSelector(
    (state: RootState) => state.ledger
  );

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
    setQuery((p) => {
      p.page = 1;
      p.limit = newLimit;
      return { ...p };
    });
    setRowsPerPage(newLimit);
  };

  const [tab, setTab] = useState<number | null>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const getStoredAuth = () => {
    const storedAuth = localStorage.getItem("userData");
    if (storedAuth) {
      try {
        return JSON.parse(storedAuth);
      } catch (e) {
        console.error("Failed to parse auth data from localStorage", e);
        return null;
      }
    }
    return null;
  };

  const userData = getStoredAuth();
  // Filter data according to the selected tab

  // Filter data according to the selected tab
  const getTabData = () => {
    switch (tab) {
      case 0:
        return ledgerData;
      case 1:
        return ledgerData;
      case 2:
        return ledgerData;
      case 3:
        return ledgerData;
      case 4:
        return ledgerCoinData; // assuming ledgerCoinData contains the relevant data
      default:
        return [];
    }
  };

  const tabData: any = getTabData();

  const getTableHeader = () => {
    if (tab === 4 || (tabData[0] && tabData[0].productType === "Coin")) {
      return TABLE_HEAD;
    } else {
      return Transaction_TABLE_HEAD;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let payload;
      switch (tab) {
        case 0:
          payload = { type: "Music Distribution", ...query };
          dispatch(getLedgerAsync(payload));
          break;
        case 1:
          payload = { type: "AI Mastering", ...query };
          dispatch(getLedgerAsync(payload));
          break;
        case 2:
          payload = { type: "Portfolio", ...query };
          dispatch(getLedgerAsync(payload));
          break;
        case 3:
          payload = { type: "Social Media Management", ...query };
          dispatch(getLedgerAsync(payload));
          break;
        case 4:
          payload = {
            user_id: userData?._id,
            ...query,
          };
          dispatch(getCoinsAsync(payload));
          break;
        default:
          break;
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, query, dispatch]);

  return (
    <Box>
      <CustomBreadcrumbs
        heading="Ledger"
        activeLast
        sx={{ fontSize: "40px", fontWeight: "bolder", marginTop: 5 }}
        links={[]}
      />
      <Box>
        <Breadcrumbs>Ledger</Breadcrumbs>
      </Box>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          marginBottom: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          centered={false}
        >
          <Tab label="Music Distribution" {...a11yProps(0)} />
          <Tab label="AI Mastering" {...a11yProps(1)} />
          <Tab label="Portfolio" {...a11yProps(2)} />
          <Tab label="Social Media Management" {...a11yProps(3)} />
          <Tab label="Coin" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <Box sx={{ width: "100%" }}>
        <TableContainer sx={{ position: "relative", overflow: "unset" }}>
          <Scrollbar>
            <Table
              
              sx={{ minWidth: 800, width: "100%" }}
            >
              <TableHeadCustom
                headLabel={getTableHeader()}
                rowCount={tabData?.length}
                numSelected={selected.length}
                onSort={onSort}
                sx={{ backgroundColor: "#FFF4E7" }}
              />
              {ledgerLoader || coinsLoader ? (
                <TableRow>
                  <TableCell colSpan={12} sx={{ p: 0 }}>
                    <Box
                      sx={{
                        height: "20vh",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center", // Center horizontally
                        alignItems: "center", // Center vertically
                      }}
                    >
                      <CircularProgress color="primary" />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                <TableBody>
                  {tabData?.data?.map(
                    (
                      row: { _id: React.Key | null | undefined },
                      index: number
                    ) => (
                      <LedgerTableRow
                        query={query}
                        key={row._id}
                        index={index}
                        row={row}
                        dense={dense}
                        selected={selected.includes(row._id)}
                      // tab={tab}
                      />
                    )
                  )}
                </TableBody>
              )}
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          rowsPerPageOptions={[5, 10, 25]}
          count={tabData?.count} // SHOULD BE CHANGED TO COUNT WHEN API INTEGRATED
          rowsPerPage={query.limit}
          page={query.page - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </Box>
    </Box>
  );
};

export default Ledger;
