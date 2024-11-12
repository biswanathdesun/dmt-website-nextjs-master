"use client"
import React, { useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Icon } from '@iconify/react/dist/iconify.js';
import CustomHeading from '@/components/common/CustomHeading';
import Scrollbar from '@/components/common/scrollbar/Scrollbar';
import { TableHeadCustom, TablePaginationCustom, useTable } from '@/components/common/table';
import CustomTableRow from '@/components/raiseTicket/CustomTableRow';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import TableRowRefferals from './component/TableRowRefferals';
import { postReferralsAsync } from '@/redux/services/referrals';


interface HeadCell {
    id: string;
    label: string;
    align?: "left" | "center" | "right";
    width?: string;
    minWidth?: string;
}

const TABLE_HEAD: readonly HeadCell[] = [
    { id: 'sNo', label: 'S.NO' },
    { id: ' referrerNo', label: 'Refferal No' },
    { id: 'user', label: 'Name' },
    { id: 'role', label: 'Role' },
    { id: 'credit', label: 'credit-amount' },
    { id: 'amount', label: 'Amount' },
    { id: 'transactionType', label: 'Transaction-Type' },
] as const;

const limit = localStorage.getItem("table-rows-per-page") ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit) };

const Referrals = () => {
    const { isLoading, data, count } = useSelector((state: RootState) => state.referrals);
    const { referralCode, coins, transaction } = data || { referralCode: '', coins: 0, transaction: [] };
    const referralcode = String(referralCode);
  const dispatch: AppDispatch = useDispatch();
    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralCode);
    };

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
    useEffect(() => {
        fetchData(query.page - 1, query.limit);
    }, [query.page, query.limit]);

    const fetchData = async (page: number, rowsPerPage: number) => {
        const params = {
            page: page + 1, // API pages are usually 1-based
            limit: rowsPerPage,
        };
        try {
            await dispatch(postReferralsAsync(params));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
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
        DEFAULT_QUERY.limit = newLimit;
        setQuery((p) => {
            p.page = 1;
            p.limit = newLimit;
            return { ...p };
        });
        setRowsPerPage(newLimit);
    };

    return (
        <Box sx={{ padding: 4, minHeight: '100vh', color: 'black', }}>
            <Box sx={{ backgroundColor: '#FFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginY: 2 }} >
                <Typography variant='h4' sx={{ textAlign: 'center', fontFamily: 'Raleway', color: '#333', fontWeight: "700" }}>
                    Your Referrals
                </Typography>
                <Typography variant='h6' sx={{ marginTop: '10px', marginBottom: '20px', textAlign: 'center', color: '#555' }}>
                    Total Coins: {coins} 🪙
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2, }}>
                    <Typography variant='body1' component='span' sx={{ mr: 1, color: '#333' }}>
                        Referral Code: {referralcode}
                    </Typography>
                    <Button
                        variant='contained'
                        size='small'
                        startIcon={<ContentCopyIcon />}
                        onClick={copyToClipboard}
                        sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}
                    >
                        Copy
                    </Button>
                </Box>
            </Box>

            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Raleway', color: '#333', fontWeight: "700" }}>Transactions</Typography>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                <Scrollbar>
                    <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                        <TableHeadCustom
                            headLabel={TABLE_HEAD}
                            rowCount={count}
                            numSelected={selected.length}
                            onSort={onSort}
                            sx={{ backgroundColor: '#FFF4E7' }}
                        />
                        <TableBody>
                            {transaction && transaction.map((row, index) => (
                                <TableRowRefferals
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <CircularProgress />
                    </Box>
                )}
            </TableContainer>

            <TablePaginationCustom
                rowsPerPageOptions={[5, 10, 25]}
                count={transaction?.length}
                rowsPerPage={query.limit}
                page={query.page - 1}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                dense={dense}
                onChangeDense={onChangeDense}
            />
        </Box>
    );
}

export default Referrals;