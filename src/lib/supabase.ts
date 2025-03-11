
import { createClient } from '@supabase/supabase-js';

// Try to get values from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log status for debugging
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found in environment variables. Using fallback values for testing.');
}

// Create client with either env vars or fallback test values
export const supabase = createClient(
  supabaseUrl || 'https://your-project-ref.supabase.co',
  supabaseAnonKey || 'your-anon-key'
);
