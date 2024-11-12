// src/app/layout.tsx
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "@/components/theme/Theme";
import { CssBaseline } from "@mui/material";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deliver My Tune",
  description: "Deliver My Tune is India’s first Digital Music and video Distribution Company, we also provide social media management to indie artist"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          id="google-gtag"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DJS39QSK03"
        />
        <Script
          id="google-gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DJS39QSK03');
          `
          }}
        />

        {/* Meta Pixel Code */}
        <Script
          id="fb-pixel-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      !function(f,b,e,v,n,t,s){
        if(f.fbq)return;
        n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s);
        t.onload = function() {
          fbq('track', 'PageView'); // Ensure this fires after script load
          console.log("Meta Pixel fired PageView event.");
        };
      }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      console.log("Meta Pixel script loaded correctly.");
    `
          }}
        />
        <noscript>
          <Image
            height="1"
            width="1"
            style={{ display: "none" }}
            alt='facebook'
            src="https://www.facebook.com/tr?id=1559630381056568&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <Script
        id="pixel-script-poptin"
        src="https://cdn.popt.in/pixel.js?id=5ae15ced7d0e2"
        strategy="afterInteractive"
      />
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster reverseOrder={false} />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
