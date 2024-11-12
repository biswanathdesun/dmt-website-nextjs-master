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

const TableRowPayment: React.FC<TableRowMyReleaseProps> = ({
    index,
    row,
    dense,
    selected,
}) => {
    return (
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    checked={selected}
                    inputProps={{ "aria-labelledby": `enhanced-table-checkbox-${index}` }}
                />
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
                    {row?.type}
                </Typography>
            </TableCell>
            <TableCell>
                <Button
                    size="small"
                    variant="contained"
                    sx={{
                        // background: "rgba(251, 206, 46, 0.2) !important",
                        color: "#FBCE2E",
                        borderRadius: "18px",
                        fontSize: "12px",
                        fontWeight: "400",
                        padding: "5px 20px",
                        fontFamily: "DM sans",
                        textTransform: "capitalize"
                    }}
                >
                    {row?.email}
                </Button>
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
                    {row?.date}
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
         
        </TableRow>
    );
};

export default TableRowPayment;