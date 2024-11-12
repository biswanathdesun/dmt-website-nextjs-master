import {
    Button,
    Checkbox,
    Chip,
    IconButton,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";

interface TableRowMyReleaseProps {
    index: number;
    row: any; // Define the row type appropriately
    dense: boolean;
    selected: boolean;
}

type Status =
    | "Debit"
    | "Credit"

const statusColors: {
    [key in Status]: "default" | "success" | "warning";
} = {
    Credit: "success",
    Debit: "warning",
};

const capitalizeWords = (text: string) => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

const TableRowLedger: React.FC<TableRowMyReleaseProps> = ({
    index,
    row,
    dense,
    selected,
}) => {
    const status = row.status as Status;
    return (
        <TableRow>
            <TableCell>
                <Typography
                    sx={{
                        color: "#585858",
                        fontWeight: "500",
                        fontFamily: "Lato",
                        fontSize: "1.21rem"
                    }}
                >
                    {row?.item}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    sx={{
                        color: "#585858",
                        fontWeight: "500",
                        fontFamily: "Lato",
                        fontSize: "1.21rem"
                    }}
                >
                    {row?.amount}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {dayjs(row?.date).format('DD/MM/YYYY') || '-'}
                </Typography>
            </TableCell>
            <TableCell>
                <Chip
                    size="small"
                    label={capitalizeWords(row?.status)}
                    color={statusColors[status]}
                />
            </TableCell>
            <TableCell>
                {status === 'Credit' ? (
                    <Chip
                        size="small"
                        variant="outlined"
                        label={capitalizeWords('Paid By DMT')}
                        color={statusColors[status]}
                    />
                ) : (
                    <Chip
                        size="small"
                        variant="outlined"
                        label={capitalizeWords('Paid To DMT')}
                        color={statusColors[status]}
                    />
                )}
            </TableCell>
        </TableRow>
    );
};

export default TableRowLedger;
