"use client";
import "./globals.css";
import Navbar from "../../components/Navbar";

export const metadata = {
  title: "Device",
  description: "Frontend Device management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
