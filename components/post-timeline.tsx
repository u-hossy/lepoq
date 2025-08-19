"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import PostCard from "@/components/ui/post-card";
import { Tables } from "@/supabase/database.types";

type Post = Tables<"posts">;
type Profile = Tables<"profiles">;

interface PostWithProfile extends Post {
  profiles: Profile | null;
}

export default function PostTimeline() {
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("posts")
          .select(`*`)
          //   .select(
          //     `
          //     *,
          //     profiles:user_id (*)
          //   `
          //   )
          .eq("is_draft", false) // 公開済みの投稿のみ
          .order("updated_at", { ascending: false }) // 更新日の最新順
          .limit(20); // 20件まで

        if (error) {
          throw error;
        }

        setPosts(data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(
          err instanceof Error ? err.message : "投稿の取得に失敗しました"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive">エラー: {error}</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">投稿がありません</div>
      </div>
    );
  }

  return (
    <main className="flex w-11/12 flex-1 flex-col items-center gap-6 px-4 md:w-[38rem]">
      {posts.map((post) => (
        <div key={post.id} className="w-full">
          <PostCard
            author={
              post.profiles?.username ||
              post.profiles?.display_id ||
              "匿名ユーザー"
            }
            hint={post.hint}
            answer={post.answer}
            tags={post.tags}
            likesCount={post.likes_count}
            commentsCount={post.comments_count}
            updatedAt={post.updated_at}
          >
            {post.question}
          </PostCard>
        </div>
      ))}
    </main>
  );
}
