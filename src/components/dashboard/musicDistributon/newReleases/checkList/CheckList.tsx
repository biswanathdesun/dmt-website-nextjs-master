import * as React from "react";
import {
  Box,
  Typography,
  Checkbox,
  Container,
  FormControlLabel,
} from "@mui/material";
import CustomStepButton from "../../custom/CustomStepButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getOrderByIdAsync, postChecklistDataAsync } from "@/redux/services/uploadAudio";

interface ChecklistProps {
  activeTab: number;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
}

const CheckList: React.FC<ChecklistProps> = ({
  activeTab,
  handleBack,
  steps,
  handleNext,
}) => {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { orderData, orderDataById } = useSelector((state: RootState) => state?.newRelease);
  console.log(orderData, "orderData");
  const { declaration } = orderDataById;
  const [checkboxes, setCheckboxes] = React.useState({
    checkbox1: false || declaration?.artwork,
    checkbox2: false || declaration?.copyrighted,
  });


  React.useEffect(() => {
    setIsDisabled(!checkboxes.checkbox1 || !checkboxes.checkbox2);
  }, [checkboxes]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checkboxName: string
  ) => {
    setCheckboxes({
      ...checkboxes,
      [checkboxName]: event.target.checked,
    });
  };

  const onSubmit = () => {
    setIsLoading(true);
    const data = {
      declaration: {
        artwork: true,
        copyrighted: true,
      },
    };
    dispatch(postChecklistDataAsync({ id: orderData?._id, data })).then(
      (res) => {
        if (res?.payload) {
          setIsLoading(false);
          handleNext();
        }
      }
    );
    console.log("checked");
  };

    React.useEffect(() => {
      const id = orderData?._id;
      dispatch(getOrderByIdAsync({ id }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  

  return (
    <Container maxWidth="lg">
      <Box display="flex" alignItems="flex-start" mb={2} mt={4}>
        <FormControlLabel
          checked={checkboxes.checkbox1}
          onChange={(e?: any) => handleCheckboxChange(e, "checkbox1")}
          control={<Checkbox sx={{ alignSelf: "flex-start" }} />}
          label={
            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  sm: 16,
                  xs: 14,
                },
              }}
            >
              I agree that my artwork is as per the guidelines, there is no
              extra credit or video credit on the artwork. The song name and
              artist names are the only displayed information on the artwork. If
              the artwork is not as per guidelines then the song will be
              rejected by the platforms.
            </Typography>
          }
        />
      </Box>
      <Box display="flex" alignItems="flex-start" mb={3} mt={3}>
        <FormControlLabel
          checked={checkboxes.checkbox2}
          onChange={(e?: any) => handleCheckboxChange(e, "checkbox2")}
          control={<Checkbox sx={{ alignSelf: "flex-start" }} />}
          label={
            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  sm: 16,
                  xs: 14,
                },
              }}
            >
              I agree that copyrighted songs/music/tune/lyrics/composition etc
              are not allowed. If found, Deliver My Tune has the right to ban me
              from the platform and block all my royalties and take down the
              already distributed songs without any refund or royalty payments.
            </Typography>
          }
        />
      </Box>
      <Box>
        <CustomStepButton
          activeTab={activeTab}
          handleBack={handleBack}
          steps={steps}
          handleNext={onSubmit}
          disabled={isDisabled}
          loading={isLoading}
        />
      </Box>
    </Container>
  );
};

export default CheckList;
