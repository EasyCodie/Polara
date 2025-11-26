-- Add 'In Progress' to session_status enum
ALTER TYPE session_status ADD VALUE IF NOT EXISTS 'In Progress';
