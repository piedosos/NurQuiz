-- ============================================================
-- NUR QUIZ — Esquema da Base de Dados (Supabase)
-- ============================================================
-- Como usar:
-- 1. Abra o seu projeto em supabase.com
-- 2. Vá a "SQL Editor" no menu lateral
-- 3. Cole todo este ficheiro e clique em "Run"
-- ============================================================

-- Tabela de perfis públicos (um por utilizador registado)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  total_score int not null default 0,
  created_at timestamptz not null default now()
);

-- Progresso do utilizador por categoria (níveis desbloqueados)
create table if not exists public.user_progress (
  user_id uuid references auth.users(id) on delete cascade,
  category_id text not null,
  unlocked_levels int[] not null default '{1}',
  updated_at timestamptz not null default now(),
  primary key (user_id, category_id)
);

-- Histórico de tentativas de quiz (usado para o ranking)
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  category_id text not null,
  level int not null,
  score int not null,
  total int not null,
  completed_at timestamptz not null default now()
);

-- ============================================================
-- Segurança (Row Level Security)
-- ============================================================
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.quiz_attempts enable row level security;

-- Perfis: todos podem ver (necessário para o ranking), só o dono edita
create policy "Perfis são visíveis a todos"
  on public.profiles for select using (true);

create policy "Utilizador cria o seu próprio perfil"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Utilizador atualiza o seu próprio perfil"
  on public.profiles for update using (auth.uid() = id);

-- Progresso: só o dono vê e edita
create policy "Utilizador vê o seu progresso"
  on public.user_progress for select using (auth.uid() = user_id);

create policy "Utilizador insere o seu progresso"
  on public.user_progress for insert with check (auth.uid() = user_id);

create policy "Utilizador atualiza o seu progresso"
  on public.user_progress for update using (auth.uid() = user_id);

-- Tentativas: só o dono insere/vê as suas; leitura agregada usa a view abaixo
create policy "Utilizador vê as suas tentativas"
  on public.quiz_attempts for select using (auth.uid() = user_id);

create policy "Utilizador regista as suas tentativas"
  on public.quiz_attempts for insert with check (auth.uid() = user_id);

-- ============================================================
-- Criação automática do perfil ao registar (evita erro de RLS
-- antes da confirmação de email)
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Função: atualizar total_score do perfil após cada tentativa
-- ============================================================
create or replace function public.handle_new_attempt()
returns trigger as $$
begin
  update public.profiles
  set total_score = total_score + new.score
  where id = new.user_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_quiz_attempt_created on public.quiz_attempts;
create trigger on_quiz_attempt_created
  after insert on public.quiz_attempts
  for each row execute function public.handle_new_attempt();

-- ============================================================
-- View pública do ranking (top jogadores)
-- ============================================================
create or replace view public.leaderboard as
select username, total_score
from public.profiles
order by total_score desc
limit 100;
