'use client'
import * as React from 'react';
import { masteredAudioData } from '@/components/common/JSONFolder/jsonData';
import {
  BasicTable,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable
} from "@/components/common/table";
import { Box, Breadcrumbs, Card, IconButton, Table, TableBody, TableContainer, Typography } from '@mui/material';
import Scrollbar from '@/components/common/scrollbar/Scrollbar';
import TableRowMasteredAudio from './components/TableRowMasteredAudio';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import CustomBreadcrumbs from '@/components/common/CustomBreadcrumbs';
import { getMasterAudioAsync } from '@/redux/services/masteredAudio';
import { useDispatch } from 'react-redux';
import { Icon } from "@iconify/react/dist/iconify.js";

interface HeadCell {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
  minWidth?: string;
}

const TABLE_HEAD: readonly HeadCell[] = [
  { id: 'serial', label: 'Serial No.' },
  { id: 'songName', label: 'Song Name' },
  { id: 'songStatus', label: 'Song Status' },
  { id: 'paymentStatus', label: 'Payment Status' },
  { id: 'date', label: 'Date' },
  { id: 'masterAudio', label: 'Master Audio' },
  { id: 'originalMasteredAudio', label: 'Original Mastered Audio' },
] as const;

const limit = localStorage.getItem("table-rows-per-page") ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit) };

const MasteredAudio: React.FC = () => {
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
    setRowsPerPage
  } = useTable({
    defaultDense: false,
    defaultOrderBy: "name",
    defaultOrder: "asc",
    defaultCurrentPage: 0,
    defaultRowsPerPage: 10,
    defaultSelected: []
  });

  const [query, setQuery] = React.useState(DEFAULT_QUERY);
  const { masterAudioList, isLoading } = useSelector(
    (state: any) => state?.masteredAudio
  );
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
  const dispatch = useDispatch<AppDispatch>()
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
    DEFAULT_QUERY.limit = newLimit;
    setQuery((p) => {
      p.page = 1;
      p.limit = newLimit;
      return { ...p };
    });
    setRowsPerPage(newLimit);
  };
  React.useEffect(() => {
    if (userData?._id) {
      dispatch(getMasterAudioAsync({ user_id: userData?._id, }));
    }
  }, [query, userData?._id, dispatch]);

  return (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: {
            xl: "row",
            lg: "row",
            sm: "column",
            xs: "column"
          },
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography variant="h4">Mastered Audio</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xl: "row",
              lg: "row",
              sm: "row",
              xs: "column"
            },
            alignItems: "center",
            gap: 3,
            mt: {
              xs: 4,
              sm: 4,
              xl: 0
            }
          }}
        >
          <IconButton
            disabled
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
              transform: "perspective(1px) translateZ(0)",
              "&:hover": {
                boxShadow:
                  "0 6px 12px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.22)"
              }
            }}
          >
            <Icon icon="hugeicons:user" color="#FE8E0B" />
          </IconButton>
          <Typography variant="h6">{userData?.fullName} </Typography>
          <IconButton
            disabled
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
              transform: "perspective(1px) translateZ(0)",
              "&:hover": {
                boxShadow:
                  "0 6px 12px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.22)"
              }
            }}
          >
            <Icon icon="ic:outline-email" color="#FE8E0B" />
          </IconButton>
          <Typography variant="h6">{userData?.email}</Typography>
        </Box>
      </Box>

      <Card sx={{mt:5}}>
        <TableContainer sx={{ position: "relative", overflow: "unset" }}>
          <Scrollbar>
            <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
                rowCount={masterAudioList?.length}
                numSelected={selected.length}
                // onSort={onSort}
              />
              <TableBody>
                {!isLoading &&
                  masterAudioList?.map(
                    (
                      row: { _id: React.Key | null | undefined },
                      index: number
                    ) => (
                      <TableRowMasteredAudio
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
                    masterAudioList?.length
                      ? query.limit - masterAudioList?.length
                      : 0
                  }
                />
                <TableNoData
                  isLoading={isLoading}
                  isNotFound={!masterAudioList?.length && !isLoading}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          rowsPerPageOptions={[5, 10, 25]}
          count={masterAudioList?.length}
          rowsPerPage={query.limit}
          page={query.page - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </Card>
    </>
  );
};

export default MasteredAudio;