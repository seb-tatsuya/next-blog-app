import { prisma } from "@/lib/prisma";

//
export async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// idを指定してpostデーブルのauthorからUserの名前を取得
export async function getPost(id: string) {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

// 検索ボックスから検索した文字列の値が渡される
export async function searchPosts(search: string) {
  // 全角スペースを半角スペースに変換しつつスペースで分割する
  const decodedSearch = decodeURIComponent(search); // URLデコード
  const normalizedSearch = decodedSearch.replace(/[¥s　]+/g, " "); // 全角スペースを半角スペースに変換
  const searchWords = normalizedSearch.split(" ").filter(Boolean); // スペースで分割し、空の要素を削除

  // フィルター条件を作成
  const filters = searchWords.map((word) => ({
    OR: [{ title: { contains: word } }, { content: { contains: word } }],
  }));

  // フィルター条件をANDで結合
  return await prisma.post.findMany({
    where: {
      AND: filters,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
