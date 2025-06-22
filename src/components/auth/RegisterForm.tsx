"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState } from "react";
import { createUser } from "@/lib/actions/createUser"; // ServerActionの関数

export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });

  // errorはname属性で設定した情報でやり取り
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>ユーザー登録</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input type="text" name="name" id="name" required />
            {state.errors.name && (
              <p className="text-sm mt-1 text-red-500">
                {state.errors.name.join(",")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" name="email" id="email" required />
            {state.errors.email && (
              <p className="text-sm mt-1 text-red-500">
                {state.errors.email.join(",")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input type="password" name="password" id="password" required />
            {state.errors.password && (
              <p className="text-sm mt-1 text-red-500">
                {state.errors.password.join(",")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">パスワード確認</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
            />
            {state.errors.confirmPassword && (
              <p className="text-sm mt-1 text-red-500">
                {state.errors.confirmPassword.join(",")}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            登録
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
