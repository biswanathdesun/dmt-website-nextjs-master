import EmptyContent from "@/components/empty-content/EmptyContent";
import { Box, CircularProgress, TableCell, TableRow, Typography } from "@mui/material";

interface TableNoDataProps {
  isNotFound: boolean;
  isLoading: boolean;
}

const TableNoData: React.FC<TableNoDataProps> = ({
  isNotFound,
  isLoading,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={12} sx={{ p: 0 }}>
        {isLoading ? (
          <Box
            sx={{
              height: "20vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : isNotFound ? (
          <Box display='flex' justifyContent='center' padding={2}>
            <Typography>No Data</Typography>
          </Box>
        ) : null}
      </TableCell>
    </TableRow>
  );
};

export default TableNoData;
