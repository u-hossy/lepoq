import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import PostCard from "@/components/ui/post-card";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
          <div className="flex items-center gap-5 font-semibold">
            <Link href={"/"}>LEPOQ</Link>
          </div>
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
      </nav>
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <div className="flex w-full flex-1 flex-col items-center gap-20 py-5">
          <main className="flex w-11/12 flex-1 flex-col items-center gap-6 px-4 md:w-[38rem]">
            <PostCard author="ダミー投稿者">
              この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、
            </PostCard>
          </main>
        </div>

        <footer className="mx-auto flex w-full items-center justify-center gap-8 border-t py-8 text-center text-xs">
          <p>
            Powered by{" "}
            <a
              href="https://nextjs.org/"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </div>
  );
}
