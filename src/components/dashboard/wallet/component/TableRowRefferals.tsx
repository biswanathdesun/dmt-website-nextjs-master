import {
    Button,
    Checkbox,
    IconButton,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
interface TableRowMyReleaseProps {
    index: number;
    row: any; // Define the row type appropriately
    dense: boolean;
    selected: boolean;
}

const TableRowRefferals: React.FC<TableRowMyReleaseProps> = ({
    index,
    row,
    dense,
    selected,
}) => {
    return (
        <TableRow>
            <TableCell>
                <Typography
                >
                    {index +1}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {row?.referrerNo}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {row?.user}
                </Typography>
            </TableCell>
            
            <TableCell>
                <Typography >
                    {row?.role}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                >
                    {row?.credit}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                >
                    {row?.amount}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                >
                    {row?.transactionType}
                </Typography>
            </TableCell>
        </TableRow>
    );
};

export default TableRowRefferals;
