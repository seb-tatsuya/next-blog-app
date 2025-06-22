import PrivateHeader from "@/components/layouts/PrivateHeader";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* 共通ヘッダー */}
      <PrivateHeader />
      {/* ページ毎に変化 */}
      {children}
    </>
  );
}
