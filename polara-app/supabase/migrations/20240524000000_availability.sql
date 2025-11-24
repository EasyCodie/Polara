-- Create availability_slots table
create table availability_slots (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  day_of_week integer not null check (day_of_week between 0 and 6), -- 0=Sunday, 1=Monday, etc.
  start_time time not null,
  end_time time not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Ensure start_time < end_time
  constraint valid_time_range check (start_time < end_time)
);

-- Enable RLS
alter table availability_slots enable row level security;

-- RLS Policies
create policy "Users can view their own availability." on availability_slots
  for select using (auth.uid() = user_id);

create policy "Users can insert their own availability." on availability_slots
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own availability." on availability_slots
  for update using (auth.uid() = user_id);

create policy "Users can delete their own availability." on availability_slots
  for delete using (auth.uid() = user_id);
