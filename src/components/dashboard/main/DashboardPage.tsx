'use client'

import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getMainDashbordAsync } from "@/redux/services/mainDashboard";
import { getNoticeListAsync, markAsReadNoticeAsync } from "@/redux/services/notice";
import CustomBreadcrumbs from "@/components/common/CustomBreadcrumbs";
import Link from "next/link";
import { styled } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";

interface Notice {
  id: number;
  notice: string;
  createdBy: string;
  createdAt: string;
  isRead: "new" | "read";
}

const DashboardPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = (notice: Notice) => {
    setSelectedNotice(notice);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAccept = async (id: any) => {
    if (id === null) return;

    try {
      const data = { noticeId: id };

      // Dispatch the action and wait for the result
      const resultAction = await dispatch(markAsReadNoticeAsync(data));

      if (resultAction?.payload?.statusCode === 200) {
        // Check if the response was successful
        dispatch(getNoticeListAsync({}));
      } else {
        // Handle failure
        console.error('error:', resultAction?.payload?.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setDialogOpen(false);
    }
  };


  const { mainDashboard, isLoading } = useSelector((state: RootState) => state.mainDashboard);
  const { earnings, releasedSongCount, inReviewSongCount, rejectSongCount } = mainDashboard?.data || {};
  const { noticeList, isNoticeLoading, isNoticeUpdating } = useSelector((state: any) => state.notice);

  const Data = [
    {
      icon: "fa6-solid:hand-holding-dollar",
      title: "Total Royalty Earned",
      link: `/dashboard/music-distribution/royalty-reports`,
      number: earnings ? parseFloat(earnings.toFixed(2)) : 0,
    },
    {
      icon: "fluent:music-note-2-16-filled",
      title: "Released Song",
      link: `/dashboard/music-distribution/my-releases?filerKey=distributed`,
      number: releasedSongCount ? releasedSongCount : 0,
    },
    {
      icon: "ant-design:reload-time-outline",
      title: "In review Song",
      link: `/dashboard/music-distribution/my-releases?filerKey=inreview`,
      number: inReviewSongCount ? inReviewSongCount : 0,
    },
    {
      icon: "fluent:edit-32-filled",
      title: "Edit Required Song",
      link: `/dashboard/music-distribution/edit-required`,
      number: rejectSongCount ? rejectSongCount : 0,
    },
  ];

  useEffect(() => {
    dispatch(getMainDashbordAsync());
    dispatch(getNoticeListAsync({}));
  }, [dispatch]);

  const BlinkingBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      animation: "blinking 2.5s infinite",
      transform: "translate(80%, -10%)",
      top: "1%",
      right: "3%",
      [theme.breakpoints.down('sm')]: {
        fontSize: "0.75rem",
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "0.875rem",
      },
    },
    "@keyframes blinking": {
      "0%": { opacity: 1 },
      "50%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
  }));

  return (
    <div>
      <Box>
        <CustomBreadcrumbs
          heading="Dashboard"
          activeLast
          sx={{ fontSize: "40px", fontWeight: "bolder", marginTop: 2 }}
          links={[]}
        />

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            justifyItems="center"
            alignItems="center"
          >
            {Data.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                passHref
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    width: 290,
                    height: 150,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    boxShadow:
                      "0 -1px 8px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ backgroundColor: "#FB8E0B" }}
                        aria-label="recipe"
                      >
                        <Icon icon={item.icon} />
                      </Avatar>
                    }
                    title={
                      <Typography fontSize={18} sx={{ color: "#585858" }}>
                        {item.title}
                      </Typography>
                    }
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "inherit",
                      }}
                    >
                      {item.number}
                    </Typography>
                    <Icon
                      icon="ion:chevron-forward-circle-sharp"
                      style={{ color: "#FB8E0B" }}
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Box>
        )}

        {/* Notice Board */}

        <Box my={4} mx={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow:
                    "0 -1px 8px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ backgroundColor: "#FB8E0B" }}>
                      <Icon icon="solar:notification-unread-lines-outline" />
                    </Avatar>
                  }
                  title="Notice Board"
                  titleTypographyProps={{
                    variant: 'h5',
                  }}
                />
                <Divider />
                {isNoticeLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "40vh",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) :
                  (
                    <CardContent sx={{
                      maxHeight: '40vh',
                      overflow: 'auto',
                      "&::-webkit-scrollbar": { width: "6px" },
                      "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#fe8d0bc4",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": { background: "#FE8E0B" },
                    }}>
                      {
                        noticeList?.length > 0 ? (
                          noticeList?.map((items: any) => (
                            <List
                              key={items?.id}
                            >
                              {items?.isRead === false && (
                                <>
                                  <BlinkingBadge
                                    badgeContent="New"
                                    color="error"
                                    onClick={() => handleDialogOpen(items)}
                                    sx={{ cursor: "pointer" }}
                                  >
                                    <ListItem>
                                      <ListItemIcon >
                                        <Icon icon="vaadin:dot-circle" style={{ color: "#FB8E0B" }} />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={<Typography variant='h6'>{items?.notice}</Typography>}
                                        secondary={`Posted by: ${items?.createdBy} on ${dayjs(items?.createdAt).format("DD-MM-YYYY")}`}
                                      />
                                    </ListItem>
                                  </BlinkingBadge>
                                  <Divider />
                                </>
                              )}
                            </List>
                          ))
                        ) : (
                          <Typography>No notices available.</Typography>
                        )}
                    </CardContent>
                  )}
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)', // Adjust the blur intensity
          },
        }}
      >
        <DialogTitle id="confirm-dialog-title">
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to mark this &ldquo; {selectedNotice?.notice} &rdquo; as read?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <LoadingButton loading={isNoticeUpdating} variant='contained' onClick={() => handleAccept(selectedNotice?.id)} color="primary" autoFocus>
            Accept
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
