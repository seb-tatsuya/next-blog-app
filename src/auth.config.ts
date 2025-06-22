import { NextAuthConfig } from "next-auth";

// 認証設定
export const authConfig = {
  pages: {
    signIn: "/login", // 認証されていない場合はこのページにリダイレクトされる
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggeIn = !!auth?.user; // アクセスしているユーザーがログインしているかどうか
      const isOnDashboard =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/manage"); // ログイン後の画面（/dashboardまたは/manage）を指定
      if (isOnDashboard) {
        // ログイン後の画面（/dashboardまたは/manage）にアクセスしている場合
        if (isLoggeIn) return true; // ログインしている場合はそのまま
        return Response.redirect(new URL("/login", nextUrl)); // ログインしていない場合またはログアウトした場合はログイン画面にリダイレクト
      } else if (isLoggeIn && nextUrl.pathname === "/login") {
        // ログインは既にしていてログイン画面にアクセスしようとしている場合
        return Response.redirect(new URL("/dashboard", nextUrl)); // /dashboardにリダイレクトをかける
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
