CREATE TABLE FamilyMemberz (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  name TEXT NOT NULL,
  is_home BOOLEAN DEFAULT FALSE,
  role TEXT,
  color TEXT NOT NULL,
  last_updated TIMESTAMP DEFAULT NOW()
);