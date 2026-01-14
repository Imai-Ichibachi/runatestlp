import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "月詠ルナ | 月光占術 - 無料占い・鑑定",
  description: "月詠ルナの月光占術公式サイト。月と星の導きであなたの運命を照らします。四柱推命・西洋占星術・タロットを融合した独自の占術で、恋愛・結婚・仕事・金運を鑑定。無料の月星座占いで今日の運勢をチェック。",
  keywords: "占い, 月詠ルナ, 月光占術, 無料占い, 四柱推命, 西洋占星術, タロット, 恋愛占い, 結婚占い, 今日の運勢",
  openGraph: {
    title: "月詠ルナ | 月光占術",
    description: "月と星の導きであなたの運命を照らす、月詠ルナの月光占術。無料であなたの運勢を鑑定します。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
