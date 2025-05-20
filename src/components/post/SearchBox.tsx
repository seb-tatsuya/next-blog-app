"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // デバウンス用（検索ボックスに入力されてから少し待ってから検索実行させる）
  const router = useRouter(); // リダイレクト用

  // debouncedSearchを更新するためのuseEffect(第二引数のsearchの値が変わったらuseEffectが実行される)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms待ってからsetDebouncedSearchに値をセットする

    return () => clearTimeout(timer); // 設定したらタイマーが切れる
  }, [search]);

  // debouncedSearchが変わったらリダイレクトする
  useEffect(() => {
    if (debouncedSearch.trim()) {
      // 空文字でなければ
      router.push(`/?search=${debouncedSearch.trim()}`);
    } else {
      router.push("/"); // 空文字ならトップページ(ルート)にリダイレクト
    }
  }, [debouncedSearch, router]);

  return (
    <>
      <Input
        placeholder="記事を検索・・・"
        className="w-[200px] lg:w-[300px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}
