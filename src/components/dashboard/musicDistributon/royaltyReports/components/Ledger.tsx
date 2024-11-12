import * as React from 'react'
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CircularProgress, Table, TableBody, TableContainer } from '@mui/material';
import { TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from '@/components/common/table';
import Scrollbar from '@/components/common/scrollbar/Scrollbar';
import TableRowLedger from './tableRows/TableRowLedger';
import { getRoyaltyLedgerByIdAsync } from '@/redux/services/royalty';

interface HeadCell {
    id: string;
    label: string;
    align?: "left" | "center" | "right";
    width?: string;
    minWidth?: string;
}

const TABLE_HEAD: readonly HeadCell[] = [
    { id: 'item', label: 'Items' },
    { id: 'amount', label: 'Amount' },
    { id: 'date', label: 'date' },
    { id: 'transaction', label: 'Transaction Type' },
    { id: 'status', label: 'Status' },
] as const;

const limit = localStorage.getItem("table-rows-per-page") ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit) };


interface UserData {
    id: string;
}

const storedUserData = localStorage.getItem("userData");
const userData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;

const Ledger: React.FC = () => {
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
    const dispatch: AppDispatch = useDispatch();
    const { royaltyLedger, ledgerLoading, ledgerCount } = useSelector(
        (state: any) => state?.royaltyData
    );


    React.useEffect(() => {
        fetchData(query.page - 1, query.limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.page, query.limit]);

    const fetchData = async (
        page: number,
        rowsPerPage: number,
    ) => {
        const params = {
            page: page + 1,
            limit: rowsPerPage,
        };
        try {
            const id = userData?.id;
            if (id) {
                await dispatch(getRoyaltyLedgerByIdAsync({ id, params }));
            }
            // await dispatch(getReleasesOrderAsync(params));
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
        <Card>
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                <Scrollbar>
                    <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                        <TableHeadCustom
                            headLabel={TABLE_HEAD}
                            rowCount={royaltyLedger?.length}
                            numSelected={selected.length}
                            onSort={onSort}
                        />
                        <TableBody>
                            {!ledgerLoading && royaltyLedger.map((row: { _id: React.Key | null | undefined; }, index: number) => (
                                <TableRowLedger
                                    key={row._id}
                                    index={index}
                                    row={row}
                                    dense={dense}
                                    selected={selected.includes(row._id)}
                                />
                            ))}

                            {/* <TableEmptyRows
                                emptyRows={
                                    royaltyLedger?.length
                                        ? query.limit - royaltyLedger?.length
                                        : 0
                                }
                            /> */}
                            <TableNoData
                                isLoading={ledgerLoading}
                                isNotFound={!royaltyLedger?.length && !ledgerLoading}
                            />
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
                rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
                count={ledgerCount}
                rowsPerPage={query.limit}
                page={query.page - 1}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                dense={dense}
                onChangeDense={onChangeDense}
            />
        </Card>
    )
}

export default Ledger
