"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  author: string;
  hint: string | null;
  answer: string;
  tags?: string[];
  likesCount?: number;
  commentsCount?: number;
  updatedAt?: string;
}

export default function postCard({
  children,
  author,
  hint,
  answer,
  tags = [],
  likesCount = 0,
  commentsCount = 0,
  updatedAt,
  className,
  ...props
}: PostCardProps) {
  const [hintDisplay, setHintDisplay] = useState<boolean>(false);
  const [answerDisplay, setAnswerDisplay] = useState<boolean>(false);

  return (
    <article
      className={cn(
        "w-full rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    >
      <div className="px-4 pt-4">
        <div className="mb-2 flex items-start justify-between">
          <span className="font-semibold">{author}</span>
          {updatedAt && (
            <span className="text-sm text-muted-foreground">
              {new Date(updatedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div>
          <div className="py-1">
            <span className="font-semibold">問題</span>
            <div className="pb-2">
              <p>{children}</p>
            </div>
          </div>
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out",
              hintDisplay ? "max-h-screen" : "max-h-0"
            )}
          >
            {hint && (
              <div className="py-1">
                <span className="font-semibold">ヒント</span>
                <div className="pb-2">
                  <p>{hint}</p>
                </div>
              </div>
            )}
          </div>
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out",
              answerDisplay ? "max-h-screen" : "max-h-0"
            )}
          >
            {answer && (
              <div className="py-1">
                <span className="font-semibold">答え</span>
                <div className="pb-2">
                  <p>{answer}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-4 pb-3 pt-2 text-sm text-muted-foreground">
        <span>👍 {likesCount}</span>
        <span>💬 {commentsCount}</span>
      </div>
      <div className="flex h-12 w-full flex-row overflow-hidden rounded-b-xl border border-0 border-t">
        <button
          className="flex w-1/2 items-center justify-center border border-0 border-r bg-card transition hover:bg-accent active:bg-accent [@media(hover:none)]:hover:bg-card"
          onClick={() => setHintDisplay((prev) => !prev)}
          disabled={!hint}
        >
          <span
            className={cn("font-semibold", !hint && "text-muted-foreground")}
          >
            {!hintDisplay ? "ヒントをみる" : "ヒントを隠す"}
          </span>
        </button>
        <button
          className="flex w-1/2 items-center justify-center bg-card transition hover:bg-accent active:bg-accent [@media(hover:none)]:hover:bg-card"
          onClick={() => setAnswerDisplay((prev) => !prev)}
        >
          <span
            className={cn("font-semibold", !answer && "text-muted-foreground")}
          >
            {!answerDisplay ? "答えをみる" : "答えを隠す"}
          </span>
        </button>
      </div>
    </article>
  );
}
