import { Metadata } from "next";
import "../globals.css";

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
      <body>{children}</body>
    </html>
  );
}
