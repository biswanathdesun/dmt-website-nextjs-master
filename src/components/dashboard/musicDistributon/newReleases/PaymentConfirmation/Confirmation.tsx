"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByIdAsync } from "@/redux/services/uploadAudio";
import ReviewTheReleasePage from "../../reviewTheRelease/ReviewTheRelease";

const circleVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: { opacity: 1, pathLength: 1 },
};

const checkmarkVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: { opacity: 1, pathLength: 1 },
};

const noteVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: -10 },
};

interface AnimatedCheckWithNotesProps {
  isVisible: boolean;
}

const AnimatedCheckWithNotes: React.FC<AnimatedCheckWithNotesProps> = ({
  isVisible,
}) => {
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowNotes(true);
    }
  }, [isVisible]);

  return (
    <>
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        onAnimationComplete={() => setShowNotes(true)}
      >
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="green"
          strokeWidth="7"
          variants={circleVariants}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M30 50 L45 65 L70 35"
          fill="none"
          stroke="black"
          strokeWidth="7"
          strokeLinecap="round"
          variants={checkmarkVariants}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
      </motion.svg>
    </>
  );
};

const ConfirmationMessage = ({
  setIsFree
}: {
  setIsFree: (value: boolean) => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const { orderData, orderDataById, loaderById } = useSelector(
    (state: RootState) => state?.newRelease
  );

  useEffect(() => {
    // Trigger the animation on component mount
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const id = orderData?._id;
    dispatch(getOrderByIdAsync({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: 2 }}
      >
        <AnimatedCheckWithNotes isVisible={isVisible} />
      </Box>
      <Box>
        <Typography variant="body1" sx={{ fontSize: { sm: 18, xs: 16 } }}>
          Thank you for your request! Our team has received your content and is
          currently working on it. If we need any additional information from
          you, we will reach out. Otherwise, you will receive a notification
          once the job is completed.
        </Typography>
        <Typography
          sx={{
            fontSize: { sm: 28, xs: 21 },
            marginTop: {
              xs: 2,
              sm: 4
            }
          }}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Thank you for choosing Deliver My Tune!
        </Typography>

        <Typography
          sx={{ fontSize: { sm: 18, xs: 18 }, marginTop: 2 }}
          fontWeight={"bold"}
        >
          Special Note:
        </Typography>
        <Typography variant="body1">
          Once the song is distributed on YouTube music and content id. You
          might get a content ID claim on your own video as well, do not worry,
          it is not a copyright strike or hamper your visibility in any way, it
          is a content ID claim which is on your behalf itself. Content ID will
          allow you to collect royalty from any video using your song or
          fragments of your song on YouTube. If you wish to whitelist your own
          video then you can reply with the ISRC and UPC of the song, the claim
          will automatically be removed or you can contact us at &nbsp;
          <Link
            href="mailto:contact@delivermytune.com"
            sx={{
              textDecoration: "none"
            }}
          >
            contact@delivermytune.com .
          </Link>
        </Typography>
        <Typography
          variant="body1"
          fontWeight={"bold"}
          sx={{
            marginTop: 4
          }}
        >
          Check out our forms section in your Dashboard to raise different
          requests.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          m: 2,
          marginRight: { xs: 12, sm: 5 }
        }}
      >
        {!orderDataById?.isFree ? (
          <Button
            variant="contained"
            LinkComponent="a"
            href="/dashboard/music-distribution/my-releases"
            sx={{ color: "white" }}
          >
            Finish
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => setIsFree(true)}
          >
            View Order
          </Button>
        )}
      </Box>
    </Box>
  );
};

const Confirmation = () => {
  const [isFree, setIsFree] = useState(false);
  return (
    <>
     {!isFree ?  <ConfirmationMessage setIsFree={setIsFree} />
    : <ReviewTheReleasePage/> 
    }
    </>
  );
};

export default Confirmation;
