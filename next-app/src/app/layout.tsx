import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/smooth-scrolling";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "200", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MAVOK | Buy parts of any heavy vehicle",
  description: "Buy parts of any heavy vehicle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
