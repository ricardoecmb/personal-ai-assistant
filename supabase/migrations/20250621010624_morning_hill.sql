/*
  # Initial Schema for Chronus AI Assistant

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `plan` (enum: free, premium)
      - `plan_expires_at` (timestamptz)
      - `stripe_customer_id` (text, nullable)
      - `whatsapp_number` (text, nullable)
      - `whatsapp_verified` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `integrations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `gmail_enabled` (boolean, default false)
      - `calendar_enabled` (boolean, default false)
      - `notion_enabled` (boolean, default false)
      - `slack_enabled` (boolean, default false)
      - `gmail_token` (text, nullable)
      - `calendar_token` (text, nullable)
      - `notion_token` (text, nullable)
      - `slack_token` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `usage_stats`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `commands_used` (integer, default 0)
      - `emails_processed` (integer, default 0)
      - `events_created` (integer, default 0)
      - `tasks_managed` (integer, default 0)
      - `month` (text) -- YYYY-MM format
      - `created_at` (timestamptz)

    - `activity_log`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `action` (text)
      - `description` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create custom types
CREATE TYPE plan_type AS ENUM ('free', 'premium');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  plan plan_type DEFAULT 'free',
  plan_expires_at timestamptz,
  stripe_customer_id text,
  whatsapp_number text,
  whatsapp_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create integrations table
CREATE TABLE IF NOT EXISTS integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  gmail_enabled boolean DEFAULT false,
  calendar_enabled boolean DEFAULT false,
  notion_enabled boolean DEFAULT false,
  slack_enabled boolean DEFAULT false,
  gmail_token text,
  calendar_token text,
  notion_token text,
  slack_token text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create usage_stats table
CREATE TABLE IF NOT EXISTS usage_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  commands_used integer DEFAULT 0,
  emails_processed integer DEFAULT 0,
  events_created integer DEFAULT 0,
  tasks_managed integer DEFAULT 0,
  month text NOT NULL, -- YYYY-MM format
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, month)
);

-- Create activity_log table
CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for integrations
CREATE POLICY "Users can read own integrations"
  ON integrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own integrations"
  ON integrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own integrations"
  ON integrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for usage_stats
CREATE POLICY "Users can read own usage stats"
  ON usage_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage stats"
  ON usage_stats
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage stats"
  ON usage_stats
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for activity_log
CREATE POLICY "Users can read own activity log"
  ON activity_log
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity log"
  ON activity_log
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_integrations_user_id ON integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_stats_user_id ON usage_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_stats_month ON usage_stats(month);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON activity_log(created_at DESC);

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER integrations_updated_at
  BEFORE UPDATE ON integrations
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();