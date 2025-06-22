"use server";
import { signIn } from "@/auth"; // signIn関数のインポート
import { AuthError } from "next-auth";
import { redirect } from "next/navigation"; // redirect関数のインポート

// ログインフォームのuseActionStateを使ってその中で設定するメソッド
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // signIn関数（auth.ts）を使って認証を試みる
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false, // 自動リダイレクトを無効化
    });
    redirect("/dashboard"); // ログイン成功時にダッシュボードにリダイレクト
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "メールアドレスまたはパスワードが正しくありません。";
        default:
          return "エラーが発生しました。";
      }
    }
    throw error;
  }
}
