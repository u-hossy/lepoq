"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  author: string;
}

export default function postCard({
  children,
  author,
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
        <div className="py-1">
          <span className="font-semibold">{author}</span>
        </div>
        <div className="py-2">
          <p>{children}</p>
        </div>
      </div>
      <div className="flex h-12 w-full flex-row overflow-hidden rounded-b-xl border border-0 border-t">
        <button className="hover:bg-hovered flex w-1/2 items-center justify-center border border-0 border-r transition">
          <span className="font-semibold">ヒントをみる</span>
        </button>
        <button className="hover:bg-hovered flex w-1/2 items-center justify-center transition">
          <span className="font-semibold">答えをみる</span>
        </button>
      </div>
    </article>
  );
}
