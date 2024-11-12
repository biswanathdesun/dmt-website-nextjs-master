import { getMasteringPlansByTypeAsync, getPlansByTypeAsync } from "@/redux/services/plans";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputLabel,
  Typography,
  useTheme
} from "@mui/material";
import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PricingProps {
  setPlanData: (data: any) => void;
}

const MasteringPlan: React.FC<PricingProps> = ({ setPlanData }) => {
  const [plans, setPlans] = useState<any>([]);
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  useEffect(() => {
    const params = {
      types: "AI Mastering"
    };
    dispatch(getMasteringPlansByTypeAsync(params)).then((res) => {
      if (res?.payload?.statusCode === 200) {
        setPlans(res?.payload?.data);
      }
    });
  }, [dispatch]);

  const handlePlanClick = (plan: any) => {
    setSelectedPlanId(plan.productId);
    setPlanData(plan);
  };

  return (
    <Box
      rowGap={1}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)"
      }}
    >
      {plans?.map((plan:any, index:number) => {
        const isSelected = plan.productId === selectedPlanId;
        return (
          <Card
            key={index}
            onClick={() => handlePlanClick(plan)}
            sx={{
              cursor: "pointer",
              borderRadius: "16px",
              padding: "8px",
              position: "relative",
              marginY: "16px",
              transition:
                "transform 0.3s ease, background-color 0.3s ease, color 0.3s ease",
              transform: isSelected ? "scale(1.05)" : "scale(1)",
              boxShadow: isSelected
                ? "0 8px 30px rgba(0, 0, 0, 0.3)"
                : "0 4px 20px rgba(0, 0, 0, 0.2)",
              backgroundColor: isSelected
                ? theme.palette.primary.main
                : "white",
              color: isSelected
                ? theme.palette.primary.contrastText
                : "inherit",
              "& .MuiTypography-root": {
                color: isSelected ? "white" : "inherit"
              },
              "& .MuiButton-root": {
                color: isSelected ? "white" : theme.palette.primary.main,
                backgroundColor: isSelected ? "black" : "inherit"
              },
              "& .MuiIconButton-root": {
                color: isSelected ? "white" : "inherit"
              },
              "& .MuiInputLabel-root": {
                color: isSelected ? "white" : "inherit"
              }
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="span"
                sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
              >
                ₹ {plan.price}
                <InputLabel sx={{ fontSize: "18px" }}>
                  {plan.price === 999 ? "" : "/ Year"}
                </InputLabel>
              </Typography>
              <Typography variant="h6" component="div" gutterBottom>
                {capitalize(plan?.productName)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Validity: {capitalize(plan?.validity)}
              </Typography>
              <Box
                component="ul"
                sx={{
                  padding: 0,
                  listStyleType: "none",
                  marginTop: "16px",
                  color: "inherit"
                }}
              >
                <Box
                  component="li"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                    color: "inherit"
                  }}
                >
                  <Typography variant="body2">
                    Songs:{" "}
                    {plan?.productName === "pro" ? "Unlimited" : plan?.song}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                sx={{
                  marginTop: "16px",
                  color: theme.palette.primary.main,
                  textTransform: "capitalize",
                  borderRadius: "50px",
                  width: "100%",
                  borderColor: theme.palette.primary.main,
                  "&:hover": {
                    color: "white",
                    backgroundColor: "black"
                  }
                }}
              >
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default MasteringPlan;
