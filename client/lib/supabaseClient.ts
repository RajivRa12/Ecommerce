import { createClient } from '@supabase/supabase-js';

// Use Vite client env variables only (import.meta.env). process is not available in the browser.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string | undefined;

let _supabase: any;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('Supabase environment variables are not set: VITE_SUPABASE_URL, VITE_SUPABASE_KEY');
  // Provide a lightweight stub that matches the supabase.auth interface used in the app
  _supabase = {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (handler: (event: string, session: any) => void) => ({ data: null, subscription: null }),
      signInWithPassword: async (opts: any) => ({ data: null, error: new Error('Supabase not configured') }),
      signUp: async (opts: any) => ({ data: null, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') }),
    },
  } as any;
} else {
  _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
}

export const supabase = _supabase;
