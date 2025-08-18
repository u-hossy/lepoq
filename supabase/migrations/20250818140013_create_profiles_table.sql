create table profiles (
    id uuid references auth.users not null primary key,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    display_id text unique,
    username text,

    constraint display_id_length check (char_length(display_id) >= 3)
);

alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);