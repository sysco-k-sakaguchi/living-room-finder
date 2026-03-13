create table if not exists public.shared_workspaces (
  slug text primary key,
  access_hash text not null,
  properties jsonb not null default '[]'::jsonb,
  revision bigint not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists shared_workspaces_updated_at_idx
  on public.shared_workspaces (updated_at desc);
