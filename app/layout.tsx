import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hải Sản Đại Dương — Cá Tươi Ngon Mỗi Ngày",
  description: "Cửa hàng bán cá tươi ngon, giao hàng tận nơi trong 2 giờ.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
