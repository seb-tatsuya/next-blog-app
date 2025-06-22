import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* ここでユーザーフォームや登録画面が表示される*/}
      {children}
    </div>
  );
}
