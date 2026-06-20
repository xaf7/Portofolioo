import { createClient } from "@supabase/supabase-js";

// Ambil dari Environment Variables (diisi di Vercel project settings)
// Vite: import.meta.env.VITE_xxx | Create React App: process.env.REACT_APP_xxx
const supabaseUrl =
  import.meta.env?.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
