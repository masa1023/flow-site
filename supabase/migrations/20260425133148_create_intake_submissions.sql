create extension if not exists pgcrypto;

create table intake_submissions (
  id uuid primary key default gen_random_uuid(),

  -- Section 1: 基本情報
  full_name text not null,
  company text not null,
  role_business text not null,
  email text not null,

  -- Section 2: ゴール・動機
  goal_3months text not null,
  motivation text not null,

  -- Section 3: 業務・課題
  busy_tasks jsonb not null,                 -- string[3]
  ai_experience text not null,

  -- Section 4: 作りたいもの
  ideas jsonb not null,                      -- string[3..10]
  top_idea text not null,

  -- Section 5: スキル・環境
  programming_level text not null,           -- 'none' | 'html' | 'occasional' | 'daily'
  pc_os text not null,                       -- 'mac' | 'windows' | 'linux' | 'other'
  pc_os_other text,

  -- Section 6: 制約・不安
  weekly_hours text not null,                -- 'lt2' | '2to5' | '5to10' | 'gt10'
  monthly_budget text not null,              -- '0' | 'lt5k' | '5to10k' | '10to30k' | 'gt30k' | 'unlimited'
  concerns text,                             -- 任意

  created_at timestamptz default now()
);

-- RLS: anon can insert only; service_role bypasses RLS for the API route
alter table intake_submissions enable row level security;

create policy "anon can insert"
  on intake_submissions for insert
  to anon
  with check (true);
