import {
    Button,
    Chip,
    IconButton,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
interface TableRowMyReleaseProps {
    index: number;
    row: any; // Define the row type appropriately
    dense: boolean;
    selected: boolean;
}

type Status =
    | "paid"
    | "unpaid"

const statusColors: {
    [key in Status]: "default" | "success" | "warning";
} = {
    paid: "success",
    unpaid: "warning",
};

const capitalizeWords = (text: string) => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

const TableRowRoyalty: React.FC<TableRowMyReleaseProps> = ({
    index,
    row,
    dense,
    selected,
}) => {
    const status = row.status as Status;

    const handleDownload = () => {
        const fileUrl = row?.file;
        if (fileUrl) {
            window.open(fileUrl, '_blank');
        }
    };

    // const handleDownload = () => {
    //     // Assuming the row has a fileUrl or similar field containing the file link
    //     const fileUrl = row?.file;
    //     if (fileUrl) {
    //         const link = document.createElement('a');
    //         link.href = fileUrl;
    //         link.download = `file-${row.id}.pdf`; // Adjust the file name and extension as needed
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     }
    // };

    return (
      <TableRow>
        <TableCell>
          <Typography
            sx={{
              color: "#585858",
              fontWeight: "500",
              fontFamily: "Lato",
              fontSize: "1.21rem",
            }}
          >
            {row?.paidValue ? parseFloat(row?.paidValue.toFixed(2)) : 0}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>{`${row?.month}  ${row?.year}`}</Typography>
        </TableCell>
        <TableCell>
          <Chip
            size="small"
            label={capitalizeWords(row?.status)}
            color={statusColors[status]}
          />
        </TableCell>
        <TableCell>
          <IconButton
            color="primary"
            aria-label="download"
            onClick={handleDownload}
            sx={{
              alignSelf: "end",
              color: "#ff8B00",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#ff8B00",
                color: "white",
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
              },
              mb: 1,
            }}
          >
            <DownloadIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
};

export default TableRowRoyalty;
