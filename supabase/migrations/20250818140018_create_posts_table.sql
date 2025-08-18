create table posts (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    user_id uuid not null references auth.users(id),
    question text not null,
    hint text,
    answer text not null,
    tags text[] not null default '{}',
    is_draft boolean not null default true,
    likes_count integer not null default 0,
    comments_count integer not null default 0
);