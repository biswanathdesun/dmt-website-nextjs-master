//  eslint-disable react-hooks/exhaustive-deps
"use client";
import ImageDrop from "@/components/hook-form/ImageDrop";
import LyricsUpload from "@/components/hook-form/LyricsUpload";
import { getOrderByIdAsync } from "@/redux/services/uploadAudio";
import { AppDispatch, RootState } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import CustomStepButton from "../custom/CustomStepButton";
interface Props {
  filterEnum: Array<{ value: string; label: string }>;
  handleMenuItemClick: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    status: string
  ) => void;
}

type TableColumn = {
  id: string;
  label: string;
  align?: "right" | "left" | "center" | "justify" | "inherit";
};
interface UploadArtWorkProps {
  activeTab: number;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
}

const UploadArtWork: React.FC<UploadArtWorkProps> = ({
  activeTab,
  handleBack,
  steps,
  handleNext,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingBack, setIsLoadingBack] = useState<boolean>(false);

  const NewUserSchema = Yup.object().shape({
    // filedata: Yup.object().required("Image is required"),
    // audio: Yup.string().required("Audio is required"),
  });

  // Table State
  const [formData, setFormData] = useState<any>({});
  const [filedata, setFiledata] = useState<File | null>(null);
  const [saveImage, setSaveimage] = useState<File | null>(null);
  const [pageMotionOne, setPageMotionOne] = useState<File | null>(null);
  const [pageMotionImageOne, setPageMotionImageOne] = useState<File | null>(
    null
  );
  const [pageMotionTwo, setPageMotionTwo] = useState<File | null>(null);
  const [pageMotionImageTwo, setPageMotionImageTwo] = useState<File | null>(
    null
  );
  const [showContent, setShowContent] = useState(false);

  const { orderData, orderDataById } = useSelector(
    (state: RootState) => state?.newRelease
  );

  const defaultValues = useMemo(
    () => ({
      image: "",
      audio: "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    formState: { errors },
  } = methods;

  const onSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();

    if (filedata) {
      formData.append("cover", filedata);
    } else {
      console.error("filedata is null or undefined");
    }
    if (pageMotionOne) {
      formData.append("ablumPageMotionOne", pageMotionOne);
    } else {
      console.error("filedata is null or undefined");
    }
    if (pageMotionTwo) {
      formData.append("ablumPageMotionTwo", pageMotionTwo);
    } else {
      console.error("filedata is null or undefined");
    }
    formData.append("appleMotionGraphics", showContent ? "true" : "false"); // assuming boolean value

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_KEY}orders/new-release-update/${orderData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        setIsLoading(false);
        handleNext();
      } else {
               setIsLoading(false);
      }
    } catch (error) {
             setIsLoading(false);
      console.error("Upload error:", error);
    }
  };

  const handleCheckboxChange = () => {
    setShowContent(!showContent);
  };

  const canContinue = () => {
    // return cards.every((card) => {
    const isImageUploaded = !!filedata;
    const isAppleMotionUploadedOne = showContent ? pageMotionOne : true;
    const isAppleMotionUploadedTwo = showContent ? pageMotionTwo : true;
    return (
      isImageUploaded && isAppleMotionUploadedOne && isAppleMotionUploadedTwo
    );
    // });
  };

  const handleBackWithApiCall = async () => {
    try {
      setIsLoadingBack(true);
      dispatch(getOrderByIdAsync({ id: orderData?._id })).then((res) => {
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

  useEffect(() => {
    if (orderDataById) {
      setFiledata(orderDataById.cover);
      setShowContent(orderDataById.appleMotionGraphics);
      setPageMotionOne(orderDataById.ablumPageMotionOne);
      setPageMotionTwo(orderDataById.ablumPageMotionTwo);
    }
  }, [orderDataById]);

  return (
    <Box className="lato-regular">
      <FormProvider {...methods}>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
            <ImageDrop
              career={{ cover: undefined }}
              error={undefined}
              firstslidedata={{ cover: undefined }}
              formData={formData}
              setFormData={setFormData}
              setFiledata={setFiledata}
              filedata={filedata}
              setSaveimage={setSaveimage}
              saveImage={saveImage}
              instruction="Supports: JPEG or JPG image file. It must be a square image and
              3000x3000 pixels."
              buttonText="Upload Artwork"
              uploadType="Artwork"
              acceptedFileTypes={{
                "image/jpeg": [".jpeg", ".jpg"] 
              }}
              minsize={3000}
            />
          </Grid>
        </Grid>
        <FormControlLabel
          control={
            <Checkbox checked={showContent} onChange={handleCheckboxChange} />
          }
          label="Upload Apple Motion graphics"
        />
        <Box display="flex" mt={2}>
          <Typography fontSize={18} gutterBottom color="primary">
            Note:
          </Typography>
          <Typography variant="body2" gutterBottom ml={1} lineHeight={1.2}>
            {" "}
            Album motion makes your album artwork come alive. Motion artwork
            provides a richer experience for your audience by helping to set a
            mood or accentuate the concept of an album, before anyone presses
            Play.
          </Typography>
        </Box>
        {showContent && (
          <>
            <Box my={2}>
              <Box>
                <p
                  className="lato-bold"
                  style={{ fontSize: "1.125rem" }}
                  // gutterBottom
                >
                  It consists of 2 video files without sound in 2 different
                  aspect ratios:
                </p>
              </Box>
              <Container sx={{ my: 2 }}>
                <ul className="lato-regular" style={{ fontSize: "1rem" }}>
                  <li>
                    1:1 - displayed on the Album Page on Mac, iPad, and smart
                    TVs.
                  </li>
                  <li>3:4 - displayed on the Album Page on iPhone</li>
                </ul>
              </Container>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  flexDirection: "row"
                }}
              >
                <Typography mr={0.5} variant="body2">
                  Read{" "}
                </Typography>
                <Typography
                  component="a"
                  href="https://www.apple.com/"
                  sx={{ color: "primary.main" }}
                >
                  Apple&apos;s guidelines{" "}
                </Typography>
                <Typography ml={0.5} variant="body2">
                  to learn more about the file and design requirements
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <p className="lato-bold " style={{ marginBottom: 22 }}>
                Requirements:
              </p>
              <Container>
                <Box
                  mb={3}
                  component="ul"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { sm: "1fr 1fr 1.5fr" },
                    gap: 2,
                    listStyle: "none",
                    padding: 0
                  }}
                >
                  <Box
                    component="ul"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      listStyle: "disc"
                    }}
                  >
                    <li className="lato-bold">File Format:</li>
                    <p style={{ fontSize: "14px" }}>MOV with .mov extension</p>
                  </Box>
                  <Box
                    component="ul"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      listStyle: "disc"
                    }}
                  >
                    <li className="lato-bold">Video Codec:</li>
                    <p style={{ fontSize: "14px" }}>
                      Apple ProRes 4444, 422, 422 (HQ), or 422 (LT)
                    </p>
                  </Box>
                  <Box
                    component="ul"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      listStyle: "disc"
                    }}
                  >
                    <li className="lato-bold">Frame Rate:</li>
                    <p style={{ fontSize: "14px" }}>
                      23.976, 24, 25, 29.97, or 30 fps
                    </p>
                  </Box>
                </Box>
                <Box
                  component="ul"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { sm: "1fr 1fr 1.5fr" },
                    gap: 2,
                    listStyle: "none",
                    padding: 0
                  }}
                >
                  <Box
                    component="ul"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      listStyle: "disc"
                    }}
                  >
                    <li className="lato-bold">Color Space:</li>
                    <p style={{ fontSize: "14px" }}>Rec 709 or sRGB</p>
                  </Box>
                  <Box
                    component="ul"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      listStyle: "disc"
                    }}
                  >
                    <li className="lato-bold">Length:</li>
                    <p style={{ fontSize: "14px" }}>15 to 35 seconds</p>
                  </Box>
                  <Box
                    component="ul"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      listStyle: "disc"
                    }}
                  >
                    <li className="lato-bold">Resolution:</li>
                    <p style={{ fontSize: "14px" }}>
                      1:1 size - 3840(width) x 3840(height) (square pixels 1:1)
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      3:4 size - 2048(width) x 2732(height) (square pixels 1:1)
                    </p>
                  </Box>
                </Box>
              </Container>
            </Box>
            <Box mt={4}>
              {/* <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}> */}
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <ImageDrop
                    career={{ cover: undefined }}
                    error={undefined}
                    firstslidedata={{ cover: undefined }}
                    formData={formData}
                    setFormData={setFormData}
                    setFiledata={setPageMotionOne}
                    filedata={pageMotionOne}
                    setSaveimage={setPageMotionImageOne}
                    saveImage={pageMotionImageOne}
                    instruction="Supports: JPEG or PNG image file. It must be a sqare image and
              3840x3840 pixels."
                    buttonText="Album Page Motion 1:1"
                    height="266.54px"
                    uploadType="Artwork"
                    acceptedFileTypes={{
                      "image/jpeg": [],
                      "image/png": []
                    }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <ImageDrop
                    career={{ cover: undefined }}
                    error={undefined}
                    firstslidedata={{ cover: undefined }}
                    setFormData={setFormData}
                    formData={formData}
                    filedata={pageMotionTwo}
                    setFiledata={setPageMotionTwo}
                    saveImage={pageMotionImageTwo}
                    setSaveimage={setPageMotionImageTwo}
                    instruction="Supports: JPEG or PNG image file. It must be 
              2048x2732 pixels."
                    buttonText="Album Page Motion 3:4"
                    height="266.54px"
                    uploadType="Artwork"
                    acceptedFileTypes={{
                      "image/jpeg": [],
                      "image/png": []
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
        <Box>
          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              variant="contained"
              disabled={activeTab === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              variant="contained"
              type="submit"
              sx={{ mr: 1, color: "white", backgroundColor: "black" }}
              onClick={onSubmit}
              disabled={!canContinue()}
            >
              Continue
            </Button>
          </Box> */}
          <CustomStepButton
            activeTab={activeTab}
            handleBack={handleBackWithApiCall}
            steps={steps}
            handleNext={onSubmit}
            disabled={!canContinue()}
            loading={isLoading}
            loadingBack={isLoadingBack}
          />
        </Box>
      </FormProvider>{" "}
    </Box>
  );
};

export default UploadArtWork;
