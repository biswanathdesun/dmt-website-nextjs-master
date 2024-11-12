import { useState } from "react";
import {
  Box,
  Stack,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  InputLabel,
  Chip
} from "@mui/material";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import IncrementerButton from "./IncrementButton";
import { Icon } from "@iconify/react/dist/iconify.js";
import ConfirmDialog from "../common/confirmDialog/ConfirmDialog";
import { LoadingButton } from "@mui/lab";
import { AppDispatch } from "@/redux/store";
import { capitalize } from "lodash";

// Define prop types using an interface
interface CheckoutCartProductProps {
  row: any;
  onDelete: (row: any) => void;
  onDecrease: (row: any) => void;
  onIncrease: (row: any) => void;
  isDeleting: boolean;
  cartItemQuanity: any;
  setCartItemQuanity: (quantity: any) => void;
  isLoggedIn: any;
  isLoading: boolean;
  openConfirm: boolean;
  setOpenConfirm: (open: boolean) => void;
  setRowData: (rowData: any) => void;
  setCartdata: (cartData: any) => void;
  rowData: any;
  couponValue: any;
  setCouponValue: (value: any) => void;
}

const CheckoutCartProduct: React.FC<CheckoutCartProductProps> = ({
  row,
  onDelete,
  onDecrease,
  onIncrease,
  isDeleting,
  cartItemQuanity,
  setCartItemQuanity,
  isLoggedIn,
  isLoading,
  setOpenConfirm,
  openConfirm,
  setRowData,
  rowData,
  setCartdata,
  couponValue,
  setCouponValue
}) => {
  const {
    productTypes,
    totalprice,
    productName,
    price,
    quantity,
  } = row; // Destructure the properties from row
  const [loader, setLoader] = useState("");
  const dispatch:AppDispatch = useDispatch();

  const handleOpenConfirm = (rowD: any) => {
    setRowData(rowD);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {productTypes}
          </Typography>
          <Box display='flex' alignItems='center'>
            {productTypes === "Music Distribution" && (
              <Typography noWrap variant="body2" sx={{ maxWidth: 240,paddingRight:1 }}>
                (Artist)
              </Typography>
            )}
            {productTypes !== "Social Media Management" && <Chip
              size="small"
              label={capitalize(productName)}
              sx={{
                bgcolor: "#FFF4E7",
                color: "#702459" 
              }}
            />}
          </Box>
        </TableCell>
        <TableCell>
          <Typography
            variant="body2"
            color="gray"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start"
            }}
          >
            <Icon icon="ic:round-currency-rupee" width={15} height={15} />
            {/* {isLoggedin
              ? fCurrency(discountedPrice)
              : fCurrency(
                  productType === "Offline Course"
                    ? prebook_amount
                    : discountedPrice * quantity
                )} */}
            {price}
          </Typography>
        </TableCell>
        <TableCell>
          <Box sx={{ width: 96, textAlign: "right" }}>
            <IncrementerButton
              quantity={quantity}
              // isLoading={isLoading}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              disabledDecrease={quantity <= 1}
              // disabledIncrease={quantity < 1}
            />
          </Box>
        </TableCell>
        <TableCell align="right">
          <Typography
            variant="body2"
            color="gray"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon icon="ic:round-currency-rupee" width={15} height={15} />
            {isLoggedIn ? totalprice : totalprice * quantity}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => handleOpenConfirm(row)}>
            <Icon icon="eva:trash-2-outline" style={{ color: "error.main" }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Remove Item"
        content="Are you sure you want to remove this Item  from cart ?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={() => onDelete(rowData)}
            loading={isDeleting}
          >
            Remove
          </LoadingButton>
        }
      />
    </>
  );
};

export default CheckoutCartProduct;
