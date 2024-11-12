"use client";
import {
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import * as React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReleaseOrderAsync,
  getReleasesOrderAsync
} from "@/redux/services/releases";
import ConfirmDialog from "@/components/common/confirmDialog";
import { LoadingButton } from "@mui/lab";

interface Track {
  isrcCode: string;
  name: string;
}

interface RowData {
  artistName: string;
  _id: any;
  tracks: Track[];
  upcCode: string;
  recordLabel: string;
  mainArtist: string;
  status: Status;
  name: string;
  type: string;
  comment?: string;
}

interface TableRowMyReleaseProps {
  index: number;
  row: RowData;
  dense: boolean;
  selected: boolean;
  onSelectRow: (index: number) => void;
  query: any;
}

type Status =
  | "inreview"
  | "incomplete"
  | "edit required"
  | "distributed"
  | "take down"
  | "take down requested"
  | "approved";

const statusColors: {
  [key in Status]:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
} = {
  inreview: "warning",
  incomplete: "info",
  "edit required": "error",
  distributed: "success",
  "take down": "error",
  "take down requested": "primary",
  approved: "success"
};

const capitalizeWords = (text: string) => {
  return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

const TableRowMyRelease: React.FC<TableRowMyReleaseProps> = ({
  index,
  row,
  query,
  dense,
  selected,
  onSelectRow
}) => {
  const dispatch: AppDispatch = useDispatch();
  const status = row.status as Status;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [commentDialog, setCommentDialog] = React.useState(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const rowId = row?._id;
  const { isDeleting } = useSelector((state: RootState) => state.release);

  const handleOptionClick = (
    link: string,
    option: { label: any; link?: string }
  ) => {
    if (option?.link === "comment") {
      handleClose();
      setCommentDialog(true);
      return;
    }
    if (option.label === "Delete Song") {
      setAnchorEl(null);
      setOpenDialog(true);
    } else {
      option.label === "View"
        ? router.push(`${link}/${rowId}`)
        : status === "distributed"
        ? router.push(`${link}/${rowId}`)
        : router.push(`${link}?rowId=${rowId}`);
    }
  };

  const handleDeleteSong = (rowId: any) => {
    const payload = {
      id: rowId
    };
    dispatch(deleteReleaseOrderAsync(payload)).then((res) => {
      setOpenDialog(false);
      dispatch(getReleasesOrderAsync(query));
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setAnchorEl(null);
    setOpenDialog(false);
  };

  return (
    <>
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
            {row?.tracks[0]?.isrcCode}
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
            {row?.upcCode}
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
            {row?.type === "album" ? row?.name : row?.tracks[0]?.name}
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
            {row?.recordLabel}
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
            {row?.artistName ?? "-"}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            size="small"
            label={capitalizeWords(row.status)}
            color={statusColors[status]}
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Icon icon="eva:more-vertical-fill" />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button"
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch"
              }
            }}
          >
            {status === "distributed"
              ? distributedOptions.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => handleOptionClick(option.link, option)}
                  >
                    {option.label}
                  </MenuItem>
                ))
              : status === "incomplete"
              ? incompleteOptions.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => handleOptionClick(option.link, option)}
                  >
                    {option.label}
                  </MenuItem>
                ))
              : status === "edit required"
              ? editRequiredOptions.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => handleOptionClick(option.link, option)}
                  >
                    {option.label}
                  </MenuItem>
                ))
              : status === "inreview"
              ? inreviewOptions.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => handleOptionClick(option.link, option)}
                  >
                    {option.label}
                  </MenuItem>
                ))
              : status === "take down"
              ? takeDownOption.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => handleOptionClick(option.link, option)}
                  >
                    {option.label}
                  </MenuItem>
                ))
              : status === "take down requested"
              ? takeDownRequestOption.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => handleOptionClick(option.link, option)}
                  >
                    {option.label}
                  </MenuItem>
                ))
              : approvalOptions.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => handleOptionClick(option.link, option)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
          </Menu>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={openDialog}
        onClose={handleDialogClose}
        title="Delete Song"
        content="Are you sure you want to delete this song?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={() => handleDeleteSong(rowId)}
            loading={isDeleting}
          >
            Delete
          </LoadingButton>
        }
      />
      <ConfirmDialog
        open={commentDialog}
        onClose={() => setCommentDialog(false)}
        title={
          <Typography color="#ff8B00" variant="h6">
            Comment
          </Typography>
        }
        content={row?.comment}
        action={``}
      />
    </>
  );
};

export default TableRowMyRelease;

const inreviewOptions = [
  {
    label: "View",
    link: "/dashboard/music-distribution/my-releases"
  }
];

const incompleteOptions = [
  {
    label: "View",
    link: "/dashboard/music-distribution/my-releases"
  },
  {
    label: "Edit Song",
    link: "/dashboard/music-distribution/new-releases"
  },
  {
    label: "Delete Song",
    link: "/dashboard/music-distribution/new-releases"
  }
];

const editRequiredOptions = [
  {
    label: "View",
    link: "/dashboard/music-distribution/my-releases"
  },
  {
    label: "Edit",
    link: "/dashboard/music-distribution/new-releases"
  },
  {
    label: "View Comments",
    link: "comment"
  }
];

const distributedOptions = [
  {
    label: "View",
    link: "/dashboard/music-distribution/my-releases"
  },
  {
    label: "Take Down From Sale",
    link: "/dashboard/music-distribution/take-down"
  },
  {
    label: "View Comment",
    link: "comment"
  }
];

const takeDownOption = [
  {
    label: "View",
    link: "/dashboard/music-distribution/my-releases"
  },
  {
    label: "View Comment",
    link: "comment"
  }
];

const takeDownRequestOption = [
  {
    label: "View",
    link: "/dashboard/music-distribution/my-releases"
  }
];

const approvalOptions = [
  {
    label: "View",
    link: "/dashboard/music-distribution/my-releases"
  }
];

const ITEM_HEIGHT = 50;
