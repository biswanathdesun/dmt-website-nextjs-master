// /** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "delivermytunedmt.s3.us-west-2.amazonaws.com",
            "delivertune.s3.ap-south-1.amazonaws.com",
        ],
    },
};

export default nextConfig;
