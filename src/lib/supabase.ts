
import { createClient } from '@supabase/supabase-js';

// Public Supabase credentials
const supabaseUrl = 'https://ksjoprizawmgnkvswutq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzam9wcml6YXdtZ25rdnN3dXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MjMyMTIsImV4cCI6MjA1NzI5OTIxMn0.M0VPyiIjBRIUPORLOvZwVEuclTfC5JlYHnijpIz8sxI';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

