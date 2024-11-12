import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
  Menu,
  Chip,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from "dayjs";
import { capitalize } from "lodash";

interface TableRowMyReleaseProps {
  index: number;
  row: any; // Define the row type appropriately
  dense: boolean;
  selected: boolean;
}

const TableRowOrders: React.FC<TableRowMyReleaseProps> = ({
  index,
  row,
  dense,
  selected,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const rowId = row?.id;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: string) => {
    if (option === "View") {
      router.push(`/dashboard/order-detail/${rowId}`);
    }
    handleClose();
  };

  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <Icon icon="eva:more-vertical-fill" />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleMenuItemClick(option)}
              >
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          <Typography>{row?.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{row?.phone}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{row?.planType}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{row?.type}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{row?.totalAmount}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {dayjs(row?.purchaseDate).format("DD/MM/YYYY") || "-"}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>{row?.time}</Typography>
        </TableCell>
        <TableCell>
          <Chip
            size="small"
            label={capitalize(row?.paymentStatus)}
            color={
              row?.paymentStatus === "pending"
                ? "warning"
                : row?.paymentStatus === "paid"
                ? "success"
                : "error"
            }
          />
        </TableCell>
        <TableCell>
          <Typography>{row?.orderId}</Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableRowOrders;

const options = ["View"];

const ITEM_HEIGHT = 50;
