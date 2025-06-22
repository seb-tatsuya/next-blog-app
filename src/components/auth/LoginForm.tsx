"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState } from "react";
import { authenticate } from "@/lib/actions/authenticate"; // ServerActionの関数

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate, // ServerActionの関数
    undefined
  );
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input type="email" name="email" id="email" required />
            </div>
            <div>
              <Label htmlFor="password">パスワード</Label>
              <Input type="password" name="password" id="password" required />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              ログイン
            </Button>
            <div className="flex h-8 items-end space-x-1">
              {errorMessage && (
                <div className="text-red-500 ">
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
