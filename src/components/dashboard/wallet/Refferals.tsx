"use client";

import * as React from "react";
import { Box } from "@mui/material";
import RefferalCard from "./RefferalCard";
import RefferalField from "./RefferalField"
import { useRouter } from "next/navigation";

interface DummyJSONData {
    label: string;
    data: Array<{
        label: string;
        data: Array<{ title: string; content: string }>;
    }>;
}

const tcData: { [key: string]: DummyJSONData } = {
    "Introduction:": {
        label: "",
        data: [
            {
                label:
                    "Earn Rewards by Referring Your Friends!",
                data: [
                    {
                        title: "",
                        content: "At Deliver My Tune, we believe in the power of community. That's why we're excited to introduce our referral program, designed to reward both you and your friends. Help others discover the benefits of our music distribution services, and earn rewards along the way!",
                    },
                ], // Ensure data is always an array
            },
        ],
    },
    "Section 2": {
        label: "",
        data: [
            {
                label: "How It Works",
                data: [
                    {
                        title: "For the Referred Friend (Referee)",
                        content: "",
                    },
                    {
                        title: "",
                        content:
                            "When you refer a friend to Deliver My Tune, they will receive ₹1999 upon signing up and successfully distributing their first track. It’s our way of welcoming them to the family and ensuring they start their musical journey on a high note.",
                    },
                ],
            },
            {
                label: "",
                data: [
                    {
                        title: "For the Referrer",
                        content: ""
                    },
                    {
                        title: "",
                        content: "As a token of our appreciation, you will earn rewards for every successful referral. The more friends you refer, the more you earn:"
                    },
                    {
                        title: "",
                        content: "1 to 5 Referrals: Earn ₹499 per referral."
                    },
                    {
                        title: "",
                        content: " 6 to 10 Referrals: Earn ₹999 per referral."
                    },
                    {
                        title: "",
                        content: "11 or More Referrals: Earn ₹1999 per referral."
                    },

                ],
            },
        ],
    },
    "Section 3 ":
    {
        label: "",
        data: [
            {
                label: "",
                data: [
                    {
                        title:
                            "",
                        content: "Empower Artists: Help independent artists distribute their music worldwide and retain 100% of their royalties.",
                    },
                    {
                        title:
                            "",
                        content: "High Earnings: Both you and your referred friends can earn significant rewards.",
                    },
                    {
                        title:
                            "",
                        content: "Support the Community: Contribute to a growing community of talented artists and musicians.",
                    },
                ],
            },
        ],
    },
    "Section 4": {
        label: "",
        data: [
            {
                label: " ",
                data: [
                    {
                        title: "",
                        content: "1. Sign In: Log into your Deliver My Tune account.",
                    },
                    {
                        title:
                            "",
                        content: "2. Share Your Unique Link: Find your unique referral link in the account dashboard.",
                    },
                    {
                        title:
                            "",
                        content: "3. Spread the Word: Share your link with friends, family, and fellow artists via social media, email, or direct message.",
                    },
                    {
                        title:
                            "",
                        content: "4. Earn Rewards: Watch your earnings grow as your friends sign up and distribute their music.",
                    },
                ],
            },
        ],
    },
    "Section 5": {
        label: "",
        data: [
            {
                label:
                    "Start Referring Today!",
                data: [
                    {
                        title: "",
                        content: "Don’t miss out on this opportunity to earn while helping others succeed in their musical careers. Log in to your Deliver My Tune account now and start sharing your referral link!",
                    },
                ], // Ensure data is always an array
            },
        ],
    },
};

function RefferalModal() {
    const [open, setOpen] = React.useState(true);
    const router = useRouter();

    const handleClose = () => {
        try {
            router.back();
        } catch (error) {
            console.error("Error navigating back:", error);
        }
        setOpen(false);
    };

    const handleContinue = () => {
        setOpen(false);
    };

    return (
        <Box>
            <RefferalField
                tcData={tcData}
                open={open}
                handleClose={handleClose}
                handleContinue={handleContinue}
            />
            <RefferalCard />
        </Box>
    );
}

export default RefferalModal;
