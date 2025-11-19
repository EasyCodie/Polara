-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  preferences jsonb default '{}'::jsonb,
  updated_at timestamp with time zone
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a trigger to automatically create a profile entry when a new user signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Courses Table
create table courses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  color_code text default '#3b82f6', -- blue-500
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table courses enable row level security;

create policy "Users can view their own courses." on courses
  for select using (auth.uid() = user_id);

create policy "Users can insert their own courses." on courses
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own courses." on courses
  for update using (auth.uid() = user_id);

create policy "Users can delete their own courses." on courses
  for delete using (auth.uid() = user_id);

-- Tasks Table
create type task_difficulty as enum ('Easy', 'Medium', 'Hard');
create type task_status as enum ('Todo', 'In_Progress', 'Done');

create table tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  description text,
  due_date timestamp with time zone,
  difficulty task_difficulty default 'Medium',
  status task_status default 'Todo',
  estimated_duration integer, -- in minutes
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table tasks enable row level security;

create policy "Users can view their own tasks." on tasks
  for select using (auth.uid() = user_id);

create policy "Users can insert their own tasks." on tasks
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own tasks." on tasks
  for update using (auth.uid() = user_id);

create policy "Users can delete their own tasks." on tasks
  for delete using (auth.uid() = user_id);

-- Study Sessions Table
create type session_status as enum ('Pending', 'Completed', 'Skipped');

create table study_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  task_id uuid references tasks(id) on delete cascade,
  scheduled_start timestamp with time zone,
  scheduled_end timestamp with time zone,
  actual_duration integer, -- in minutes
  status session_status default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table study_sessions enable row level security;

create policy "Users can view their own sessions." on study_sessions
  for select using (auth.uid() = user_id);

create policy "Users can insert their own sessions." on study_sessions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own sessions." on study_sessions
  for update using (auth.uid() = user_id);

create policy "Users can delete their own sessions." on study_sessions
  for delete using (auth.uid() = user_id);

-- Exams Table
create table exams (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  course_id uuid references courses(id) on delete cascade,
  date timestamp with time zone not null,
  weight integer, -- percentage
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table exams enable row level security;

create policy "Users can view their own exams." on exams
  for select using (auth.uid() = user_id);

create policy "Users can insert their own exams." on exams
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own exams." on exams
  for update using (auth.uid() = user_id);

create policy "Users can delete their own exams." on exams
  for delete using (auth.uid() = user_id);
