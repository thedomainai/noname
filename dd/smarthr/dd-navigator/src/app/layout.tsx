import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DD Navigator | M&A デューデリジェンス",
  description: "M&A デューデリジェンス業務を加速するインテリジェントワークスペース",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
