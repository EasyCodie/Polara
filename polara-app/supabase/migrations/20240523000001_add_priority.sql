-- Create priority enum
create type task_priority as enum ('Low', 'Medium', 'High');

-- Add priority column to tasks table
alter table tasks 
add column priority task_priority default 'Medium';

-- Update existing rows if any (optional, default handles it for new ones, but good to be explicit)
update tasks set priority = 'Medium' where priority is null;
