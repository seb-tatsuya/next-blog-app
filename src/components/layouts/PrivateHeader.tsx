import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Setting from "./Setting"; // ドロップダウンメニュー項目
import { auth } from "@/auth"; // 格納されたセッション情報が取得できるようにする

// セッション情報にemailが格納されていればログインしているとみなす
export default async function PrivateHeader() {
  const session = await auth(); // サーバー側でセッション情報を取得することができる
  if (!session?.user?.email) throw new Error("不正なリクエストです");

  return (
    <header className="bg-blue-200 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className="font-bold text-xl">
                  管理ページ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/*ドロップダウンメニュー*/}
        <Setting session={session} />
      </div>
    </header>
  );
}
