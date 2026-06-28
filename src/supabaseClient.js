import { createClient } from "@supabase/supabase-js";

// Vite murni menggunakan import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validasi opsional agar tidak memicu error putih jika env belum terbaca
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Peringatan: Variabel lingkungan Supabase belum terdefinisi di file .env Anda.",
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-key",
);
