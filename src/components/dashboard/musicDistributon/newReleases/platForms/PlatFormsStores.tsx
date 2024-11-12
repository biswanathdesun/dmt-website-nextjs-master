"use client";
import { Box, CardMedia, Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { imageData } from "@/components/common/JSONFolder/imageData";
// import Image from "next/image";
import Image from "next/image";
import CustomStepButton from "../../custom/CustomStepButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getOrderByIdAsync,
  postPlatformDataAsync,
} from "@/redux/services/uploadAudio";

interface PlatFormsStoresProps {
  activeTab: number;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
}
const PlatFormsStores: React.FC<PlatFormsStoresProps> = ({
  activeTab,
  handleBack,
  steps,
  handleNext,
}) => {
  const start = 0;
  const dispatch: AppDispatch = useDispatch();
  const [end, setEnd] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBack, setIsLoadingBack] = useState<boolean>(false);
  const { orderData } = useSelector((state: RootState) => state?.newRelease);

  const onSubmit = () => {
    setIsLoading(true);
    const data = {
      platforms: imageData?.map((item) => item.title),
    };
    dispatch(postPlatformDataAsync({ id: orderData?._id, data })).then(
      (res) => {
        console.log(res, "res");
        if (res?.payload) {
          setIsLoading(false);
          handleNext();
        }
      }
    );
  };

  const handleBackWithApiCall = async () => {
    try {
      setIsLoadingBack(true);
      dispatch(getOrderByIdAsync({ id: orderData?._id })).then((res?: any) => {
        if (res.payload.statusCode === 200) {
          setIsLoadingBack(false);
          handleBack();
        }
      });
    } catch (error) {
      setIsLoadingBack(false);
      console.error("Failed to fetch order by ID:", error);
    }
  };

  return (
    <>
      <Container>
        <Box>
          <Typography
            variant="body1"
            sx={{
              textAlign: { xs: "justify", sm: "center" },
              // fontSize: { xs: 15, sm: 16, md: 20, lg: 22 },
              // fontFamily: "lato",
              color: "#555555",
              py: 2,
              marginBottom: { xs: 3, sm: 0 },
            }}
          >
            &quot;At Deliver My Tune, our mission is to empower independent
            artists by providing comprehensive music distribution services. We
            distribute your songs to every major platform, ensuring you reach a
            global audience and maximise your royalty potential. Distributing
            your music to all platforms taps into diverse listener bases
            worldwide, increasing your chances of generating streams and
            earnings. This approach future-proofs your music distribution,
            including new platforms and services automatically, keeping you at
            the industry&apos;s forefront.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: { xs: "justify", sm: "center" },
              // fontSize: { xs: 15, sm: 16, md: 20, lg: 22 },
              // fontFamily: "lato",
              color: "#555555",
              py: 2,
              p: { xs: 0, md: 2 },
              marginBottom: { xs: 3, sm: 0 },
            }}
          >
            Managing your music distribution from a single dashboard simplifies
            the process and ensures consistency across platforms, allowing you
            to focus more on creating music. Deliver My Tune ensures your music
            reaches listeners globally through major platforms like Spotify,
            Apple Music, Amazon Music, and YouTube Music, helping you build a
            diverse, international fanbase.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: { xs: "justify", sm: "center" },
              // fontSize: { xs: 15, sm: 16, md: 20, lg: 22 },
              // fontFamily: "lato",
              color: "#555555",
              // py: 2,
              p: { xs: 0, md: 2 },
              marginBottom: { xs: 3, sm: 0 },
            }}
          >
            We support your growth with transparent distribution information and
            dedicated support. By choosing Deliver My Tune, you maximize your
            chances for success and royalty earnings. Start distributing your
            music everywhere today with Deliver My Tune. &quot;
          </Typography>
          <Typography
            sx={{
              justifyContent: { xs: "center", md: "left  " },
              alignItems: "center",
              marginBottom: { xs: 3, sm: 0 },
              fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
              py: 2,
            }}
          >
            <strong> List of platforms we distribute too:</strong>
          </Typography>
        </Box>
        <Box
          sx={{
            maxHeight: "40vh",
            overflowY: "auto",
            padding: 2,
            "&::-webkit-scrollbar": { width: "8px" },
            "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
            "&::-webkit-scrollbar-thumb": {
              background: "#fe8d0bc4",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": { background: "#FE8E0B" },
          }}
        >
          <Box
            rowGap={2}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
          >
            {imageData.map((item, index) => (
              <Card
                key={index}
                sx={{
                  width: 220,
                  mx: 1,
                  my: 1,
                  boxShadow: 3,
                  borderColor: "secondary",
                }}
              >
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 5,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={65}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    sx={{
                      textAlign: "center",
                      textWrap: "wrap",
                    }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
        <Box>
          <CustomStepButton
            activeTab={activeTab}
            handleBack={handleBackWithApiCall}
            steps={steps}
            handleNext={onSubmit}
            loading={isLoading}
            loadingBack={isLoadingBack}
          />
        </Box>
      </Container>
    </>
  );
};

export default PlatFormsStores;
