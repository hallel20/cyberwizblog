import { Metadata } from "next";
import "../globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Cyberwizdev Blog",
  description: "Blog for real time new tech updates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        {children}</body>
    </html>
  );
}
