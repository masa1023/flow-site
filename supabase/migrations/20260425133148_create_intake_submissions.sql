create extension if not exists pgcrypto;

create table intake_submissions (
  id uuid primary key default gen_random_uuid(),

  -- Section 1: 基本情報
  full_name text not null,
  company text not null,
  role_business text not null,
  email text not null,
  preferred_contact text not null,           -- 'slack' | 'line' | 'email' | 'other'
  preferred_contact_other text,

  -- Section 2: ゴール・動機
  goal_3months text not null,
  stance text not null,                      -- 'self' | 'deliver' | 'both'
  motivation text not null,

  -- Section 3: 業務・課題
  busy_tasks jsonb not null,                 -- string[3]
  ai_experience text not null,
  ai_success_score int not null,             -- 1-5

  -- Section 4: 作りたいもの
  ideas jsonb not null,                      -- string[3..10]
  top_idea text not null,
  top_idea_reason text not null,
  outcome_description text not null,

  -- Section 5: スキル・環境
  programming_level text not null,           -- 'none' | 'html' | 'occasional' | 'daily'
  daily_tools jsonb not null,                -- string[]
  daily_tools_other text,
  pc_os text not null,                       -- 'mac' | 'windows' | 'linux' | 'other'
  pc_os_other text,
  pc_admin text not null,                    -- 'full' | 'limited' | 'none'
  pc_spec text not null,
  existing_accounts jsonb not null,          -- string[]
  existing_accounts_other text,

  -- Section 6: 制約・不安
  weekly_hours text not null,                -- 'lt2' | '2to5' | '5to10' | 'gt10'
  monthly_budget text not null,              -- '0' | 'lt5k' | '5to10k' | '10to30k' | 'gt30k' | 'unlimited'
  concerns text not null,

  created_at timestamptz default now()
);

-- RLS: anon can insert only; service_role bypasses RLS for the API route
alter table intake_submissions enable row level security;

create policy "anon can insert"
  on intake_submissions for insert
  to anon
  with check (true);
