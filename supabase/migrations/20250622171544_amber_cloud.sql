/*
  # Update database schema for Chronus application

  1. New Tables
    - `profiles` table for user profile information
    - `integrations` table for managing user integrations
    - `usage_stats` table for tracking user usage statistics
    - `activity_log` table for logging user activities

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data

  3. Performance
    - Add indexes for frequently queried columns
    - Add triggers for automatic timestamp updates
*/

-- Create custom types if they don't exist
DO $$ BEGIN
    CREATE TYPE plan_type AS ENUM ('free', 'premium');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update profiles table structure if needed
DO $$
BEGIN
    -- Add missing columns to profiles table if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'plan'
    ) THEN
        ALTER TABLE profiles ADD COLUMN plan plan_type DEFAULT 'free';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'plan_expires_at'
    ) THEN
        ALTER TABLE profiles ADD COLUMN plan_expires_at timestamptz;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'stripe_customer_id'
    ) THEN
        ALTER TABLE profiles ADD COLUMN stripe_customer_id text;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'whatsapp_number'
    ) THEN
        ALTER TABLE profiles ADD COLUMN whatsapp_number text;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'whatsapp_verified'
    ) THEN
        ALTER TABLE profiles ADD COLUMN whatsapp_verified boolean DEFAULT false;
    END IF;
END $$;

-- Update integrations table structure if needed
DO $$
BEGIN
    -- Add missing columns to integrations table if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'integrations' AND column_name = 'gmail_enabled'
    ) THEN
        ALTER TABLE integrations ADD COLUMN gmail_enabled boolean DEFAULT false;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'integrations' AND column_name = 'calendar_enabled'
    ) THEN
        ALTER TABLE integrations ADD COLUMN calendar_enabled boolean DEFAULT false;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'integrations' AND column_name = 'notion_enabled'
    ) THEN
        ALTER TABLE integrations ADD COLUMN notion_enabled boolean DEFAULT false;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'integrations' AND column_name = 'slack_enabled'
    ) THEN
        ALTER TABLE integrations ADD COLUMN slack_enabled boolean DEFAULT false;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'integrations' AND column_name = 'gmail_token'
    ) THEN
        ALTER TABLE integrations ADD COLUMN gmail_token text;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'integrations' AND column_name = 'calendar_token'
    ) THEN
        ALTER TABLE integrations ADD COLUMN calendar_token text;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'integrations' AND column_name = 'notion_token'
    ) THEN
        ALTER TABLE integrations ADD COLUMN notion_token text;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'integrations' AND column_name = 'slack_token'
    ) THEN
        ALTER TABLE integrations ADD COLUMN slack_token text;
    END IF;
END $$;

-- Update usage_stats table structure if needed
DO $$
BEGIN
    -- Add missing columns to usage_stats table if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'usage_stats' AND column_name = 'commands_used'
    ) THEN
        ALTER TABLE usage_stats ADD COLUMN commands_used integer DEFAULT 0;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'usage_stats' AND column_name = 'emails_processed'
    ) THEN
        ALTER TABLE usage_stats ADD COLUMN emails_processed integer DEFAULT 0;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'usage_stats' AND column_name = 'events_created'
    ) THEN
        ALTER TABLE usage_stats ADD COLUMN events_created integer DEFAULT 0;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'usage_stats' AND column_name = 'tasks_managed'
    ) THEN
        ALTER TABLE usage_stats ADD COLUMN tasks_managed integer DEFAULT 0;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'usage_stats' AND column_name = 'month'
    ) THEN
        ALTER TABLE usage_stats ADD COLUMN month text;
    END IF;
END $$;

-- Create activity_log table if it doesn't exist
CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Ensure RLS is enabled on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles (drop existing if they exist)
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

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

-- Create policies for integrations (drop existing if they exist)
DROP POLICY IF EXISTS "Users can read own integrations" ON integrations;
DROP POLICY IF EXISTS "Users can update own integrations" ON integrations;
DROP POLICY IF EXISTS "Users can insert own integrations" ON integrations;

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

-- Create policies for usage_stats (drop existing if they exist)
DROP POLICY IF EXISTS "Users can read own usage stats" ON usage_stats;
DROP POLICY IF EXISTS "Users can insert own usage stats" ON usage_stats;
DROP POLICY IF EXISTS "Users can update own usage stats" ON usage_stats;

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
DROP POLICY IF EXISTS "Users can read own activity log" ON activity_log;
DROP POLICY IF EXISTS "Users can insert own activity log" ON activity_log;

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

-- Create indexes for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_integrations_user_id_new ON integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_stats_user_id_new ON usage_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id_new ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at_new ON activity_log(created_at DESC);

-- Add unique constraint on usage_stats if month column exists and constraint doesn't exist
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'usage_stats' AND column_name = 'month'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'usage_stats' AND constraint_name = 'usage_stats_user_month_unique'
    ) THEN
        ALTER TABLE usage_stats ADD CONSTRAINT usage_stats_user_month_unique UNIQUE(user_id, month);
    END IF;
END $$;

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at (drop existing if they exist)
DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS integrations_updated_at ON integrations;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER integrations_updated_at
  BEFORE UPDATE ON integrations
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();