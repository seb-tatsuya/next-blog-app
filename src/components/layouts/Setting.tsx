import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { Session } from "next-auth";

export default function Setting({ session }: { session: Session }) {
  // ログアウトボタン押下
  const handleLogout = async () => {
    "use server";
    await signOut();
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="font-medium">
            {/*header側でセッション情報の存在チェエク実装あり */}
            {session.user?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            ログアウト
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
