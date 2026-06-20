import React, { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "./supabaseClient";

export default function AdminLogin({ onLoginSuccess, isDarkMode, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError("Kredensial salah! Akses ditolak.");
      return;
    }

    if (data?.session) {
      onLoginSuccess();
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDarkMode ? "bg-[#0a0c10]" : "bg-slate-50"}`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl border ${isDarkMode ? "bg-[#13161c] border-slate-800" : "bg-white border-slate-200"} shadow-xl`}
      >
        <button
          onClick={onBack}
          className="text-xs font-bold text-slate-500 hover:text-blue-500 flex items-center gap-1 mb-4 transition-all"
        >
          <ArrowLeft size={14} /> Kembali ke Beranda
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center font-black text-white text-xl mb-3">
            X
          </div>
          <h2
            className={`text-lg font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Core Gateway Auth
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Masuk dengan akun admin terdaftar
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-xs font-semibold"
        >
          <div>
            <label
              className={`block mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              Email Admin
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@xaf7studio.com"
              className={`w-full border rounded-xl px-3.5 py-3 outline-none focus:border-blue-500 transition-all ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-100 border-slate-300 text-slate-900"}`}
            />
          </div>
          <div>
            <label
              className={`block mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              Kata Sandi
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className={`w-full border rounded-xl px-3.5 py-3 outline-none focus:border-blue-500 transition-all ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-100 border-slate-300 text-slate-900"}`}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-900/50 text-red-400 rounded-xl font-bold">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Memverifikasi...
              </>
            ) : (
              "Verifikasi Akses Gateway ➔"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
