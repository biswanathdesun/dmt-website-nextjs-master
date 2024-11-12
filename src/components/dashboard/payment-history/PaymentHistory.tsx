'use client';
import React from 'react';
import { Box, Typography, Table, TableBody, TableContainer, Paper, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CustomTableRow from '@/components/raiseTicket/CustomTableRow';
import { TableHeadCustom, TablePaginationCustom, useTable } from '@/components/common/table';
import Scrollbar from '@/components/common/scrollbar/Scrollbar';
import TableRowPayment from './component/TableRowPayment';

interface HeadCell {
    id: string;
    label: string;
    align?: "left" | "center" | "right";
    width?: string;
    minWidth?: string;
}

const TABLE_HEAD: readonly HeadCell[] = [
    { id: 'type', label: 'Type' },
    { id: 'email', label: 'Email' },
    { id: 'date', label: 'Date' },
    { id: 'amount', label: 'Amount' },
    { id: 'userType', label: 'User Type' },
] as const;

const limit = localStorage.getItem("table-rows-per-page") ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit) };

const PaymentHistory = () => {
    const AmountBalance = 756495;
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
    const { isLoading, releasesList } = useSelector((state: RootState) => state.release);

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

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Raleway', color: '#333', fontWeight: "700" }}>
                Account Balance: {AmountBalance}
            </Typography>
            <TableContainer component={Paper}>
                <Scrollbar>
                    <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                        <TableHeadCustom
                            headLabel={TABLE_HEAD}
                            rowCount={releasesList?.length}
                            numSelected={selected.length}
                            onSort={onSort}
                            sx={{ backgroundColor: '#FFF4E7' }}
                        />
                        <TableBody>
                            {releasesList.map((row, index) => (
                                <TableRowPayment
                                    key={row._id}
                                    index={index}
                                    row={row}
                                    dense={dense}
                                    selected={selected.includes(row._id)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Scrollbar>
                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                )}
            </TableContainer>
            <TablePaginationCustom
                rowsPerPageOptions={[5, 10, 25]}
                count={releasesList?.length}
                rowsPerPage={query.limit}
                page={query.page - 1}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                dense={dense}
                onChangeDense={onChangeDense}
            />
        </>
    );
}

export default PaymentHistory;
