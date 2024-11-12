"use client";
import * as React from "react";
import CustomBreadcrumbs from "@/components/common/CustomBreadcrumbs";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";

// Tabs Import //
import Royalty from "./components/Royalty";
import Ledger from "./components/Ledger";
import {
  getRoyaltyLedgerByIdAsync,
  getRoyaltyReportByIdAsync,
} from "@/redux/services/royalty";


const orange = {
  50: "#FB8E0B",
};

const grey = {
  200: "#DAE2ED",
  900: "#1C2025",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #555555;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 70px;
  display: flex;
  justify-content: center;
  &:focus {
    color: #555555;
    outline: 3px solid #ffffff;
  }
  &.${tabClasses.selected} {
    background-color: ${orange[50]};
    color: #ffffff;
  }
`;

const TabsList = styled(BaseTabsList)`
  background-color: #ffffff;
  border-radius: 70px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 5px 5px 30px ${grey[200]};
`;

const limit = localStorage.getItem("table-rows-per-page") ?? 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit) };

function RoyaltyReports() {
  const dispatch: AppDispatch = useDispatch();
  const { royaltyReport, royaltyLoading } = useSelector(
    (state: any) => state?.royaltyData
  );

  const [response, setResponse] = React.useState(null);
  const [query, setQuery] = React.useState(DEFAULT_QUERY);

    const fetchData = async (page: number, rowsPerPage: number) => {
      const payload = {
        page,
        limit: rowsPerPage,
      };
      try {
           dispatch(getRoyaltyReportByIdAsync({ data: payload })).then((res: any) => {
             if (res?.payload?.error === false) {
               setResponse(res);
             } else {
               console.log("error");
             }
           });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    React.useEffect(() => {
      fetchData(query.page, query.limit);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.page, query.limit]);
  
  // card amounts  //

  const earnings = royaltyReport?.earnings
    ? parseFloat(royaltyReport?.earnings?.toFixed(2))
    : 0;
  const available = royaltyReport?.outstanding
    ? parseFloat(royaltyReport?.outstanding?.toFixed(2))
    : 0;
  const artistRoyalty = royaltyReport?.artistRoyalty
    ? parseFloat(royaltyReport?.artistRoyalty?.toFixed(2))
    : 0;
  const labelRoyalty = royaltyReport?.labelRoyalty
    ? parseFloat(royaltyReport?.labelRoyalty?.toFixed(2))
    : 0;
  const discoveryRoyalty = royaltyReport?.discoveryRoyalty
    ? parseFloat(royaltyReport?.discoveryRoyalty?.toFixed(2))
    : 0;
  const Data = [
    {
      icon: "ic:outline-paid",
      title: "Total Paid Royalty",
      number: earnings,
    },
    {
      icon: "ant-design:reload-time-outline",
      title: "Total Unpaid Royalty",
      number: available,
    },
    {
      icon: "fluent:music-note-2-16-filled",
      title: "Artist Royalty",
      number: artistRoyalty,
    },
    {
      icon: "lets-icons:lable-fill",
      title: "Label Royalty",
      number: labelRoyalty,
    },
    {
      icon: "carbon:ibm-watson-discovery",
      title: "Discovery Royalty",
      number: discoveryRoyalty,
    },
  ];

  return (
    <>
      <CustomBreadcrumbs
        heading="Royalty Reports"
        activeLast
        sx={{ fontSize: "40px", fontWeight: "bolder", marginTop: 5 }}
        links={[]}
      />

      {royaltyLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            rowGap={4}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            justifyItems="center"
            alignItems="center"
          >
            {Data.map((item, index) => (
              <Card
                key={index}
                sx={{
                  width: 290,
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
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
                    <Typography variant="h6" sx={{ color: "#585858" }}>
                      {item.title}
                    </Typography>
                  }
                />
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: { lg: 25, xs: 20 },
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
            ))}
          </Box>
          <Container maxWidth="xl" sx={{ marginTop: { md: 10, sm: 7, xs: 5 } }}>
            <Typography
              gutterBottom
              sx={{
                fontSize: { xs: 20, md: 24 },
                fontWeight: "bold",
                textAlign: { xs: "justify" },
              }}
            >
              Deliver My Tune Assured Program
            </Typography>
            <Typography
              gutterBottom
              sx={{
                textAlign: "justify",
                mb: 1,
              }}
            >
              The appearance of your sales report is governed by a few key
              factors
            </Typography>
            <Typography
              gutterBottom
              sx={{
                mb: 1,
                textAlign: "justify",
              }}
            >
              1. All royalty payments over & above 3000 will get automatically
              transferred to your bank account on 20th of every month. Subject
              to correct bank details filled by you.
            </Typography>
            <Typography
              gutterBottom
              sx={{
                textAlign: "justify",
                mb: 1,
              }}
            >
              2. Royalty reports are uploaded in a span of 3 months. The January
              month will be made available on April 25th and so on.
            </Typography>
          </Container>
          <Container maxWidth="xl" sx={{ marginTop: 10 }}>
            <Royalty query={query} setQuery={setQuery} />
          </Container>
        </>
      )}
    </>
  );
}

export default RoyaltyReports;
