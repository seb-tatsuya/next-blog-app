import { getPosts, searchPosts } from "@/lib/post";
import { PostCard } from "@/components/post/PostCard";
import { Post } from "@/types/post";

type SearchParams = {
  search?: string; // 検索ボックスから検索した文字列の値が渡される
};

// 一覧画面　// URLのパラメータを引数で受け取る
export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>; // Promise形式で渡ってくる
}) {
  const resolvedSearchParams = await searchParams; // 引数のsearchParamsを解決する
  const query = resolvedSearchParams.search || ""; // URLのsearchParamsの値を取得する(空の場合もある)

  // const posts = (await getPosts()) as Post[]; // getPostsで記事一覧ページを取得
  const posts = query
    ? ((await searchPosts(query)) as Post[]) // 検索キーワードがあった場合はそのカードを表示する
    : ((await getPosts()) as Post[]); // 検索キーワードが空場合は全件表示

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      </div>
    </>
  );
}
