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
  return (
    <article
      className={cn(
        "w-full rounded-xl border bg-card p-4 text-card-foreground shadow",
        className
      )}
      {...props}
    >
      <div className="py-1">
        <span className="font-semibold">{author}</span>
      </div>
      <div className="py-1">{children}</div>
    </article>
  );
}
