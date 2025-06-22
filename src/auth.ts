import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";

// ユーザー情報取得関数
async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}

// 入力値バリデーション、getUserユーザー取得関数を使ってユーザーが存在するかどうかを確認
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) }) // メールとパスワードの入力値バリデーションチェック
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email); // ユーザー情報をDBから取得
          if (!user) return null;
          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password
          ); // パスワード比較
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
});
