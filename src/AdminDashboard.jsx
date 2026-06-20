import React, { useState } from "react";
import {
  Plus,
  Trash2,
  LayoutDashboard,
  FolderPlus,
  MessageSquare,
  LogOut,
  Loader2,
} from "lucide-react";
import { supabase } from "./supabaseClient";

export default function AdminDashboard({
  projects,
  setProjects,
  testimonials,
  setTestimonials,
  onLogout,
  isDarkMode,
}) {
  const [projForm, setProjForm] = useState({
    title: "",
    category: "",
    desc: "",
    tech: "Laravel + React",
    speed: "98/100",
    status: "Production Ready",
    color: "from-blue-600 to-indigo-700",
  });

  const [testiForm, setTestiForm] = useState({
    quote: "",
    name: "",
    company: "",
    tags: "SaaS Enterprise",
    rating: "5.0",
  });

  const [savingProj, setSavingProj] = useState(false);
  const [savingTesti, setSavingTesti] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setSavingProj(true);

    const newProjData = {
      title: projForm.title,
      category: projForm.category,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      desc: projForm.desc,
      tech: projForm.tech,
      speed: projForm.speed,
      status: projForm.status,
      color: projForm.color,
    };

    const { data, error } = await supabase
      .from("projects")
      .insert([newProjData])
      .select();

    setSavingProj(false);

    if (error) {
      alert("Gagal menyimpan ke database: " + error.message);
      return;
    }

    setProjects([data[0], ...projects]);
    setProjForm({
      title: "",
      category: "",
      desc: "",
      tech: "Laravel + React",
      speed: "98/100",
      status: "Production Ready",
      color: "from-blue-600 to-indigo-700",
    });
    alert("Projek berhasil dipublikasikan!");
  };

  const handleDeleteProject = async (id) => {
    setDeletingId(id);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    setDeletingId(null);

    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }
    setProjects(projects.filter((item) => item.id !== id));
  };

  const handleCreateTestimonial = async (e) => {
    e.preventDefault();
    setSavingTesti(true);

    const newTestiData = {
      quote: testiForm.quote,
      name: testiForm.name,
      company: testiForm.company,
      tags: testiForm.tags,
      rating: testiForm.rating,
    };

    const { data, error } = await supabase
      .from("testimonials")
      .insert([newTestiData])
      .select();

    setSavingTesti(false);

    if (error) {
      alert("Gagal menyimpan ke database: " + error.message);
      return;
    }

    setTestimonials([data[0], ...testimonials]);
    setTestiForm({
      quote: "",
      name: "",
      company: "",
      tags: "SaaS Enterprise",
      rating: "5.0",
    });
    alert("Testimoni berhasil ditambahkan!");
  };

  const handleDeleteTestimonial = async (id) => {
    setDeletingId(id);
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    setDeletingId(null);

    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }
    setTestimonials(testimonials.filter((item) => item.id !== id));
  };

  return (
    <div
      className={`w-full min-h-screen font-sans ${isDarkMode ? "bg-[#0f1115] text-slate-200" : "bg-slate-50 text-slate-800"}`}
    >
      {/* Header Panel */}
      <header
        className={`w-full border-b px-4 sm:px-6 lg:px-20 py-4 flex items-center justify-between sticky top-0 z-50 ${isDarkMode ? "bg-[#13161c] border-slate-800" : "bg-white border-slate-200"}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shrink-0">
            <LayoutDashboard size={16} />
          </div>
          <div>
            <h1
              className={`text-xs sm:text-sm font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              XAF7 CORE ENGINE CONTROL
            </h1>
            <p className="text-[10px] text-slate-400">
              Tersinkron langsung dengan database
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onLogout}
            className="text-xs font-bold bg-red-950/30 hover:bg-red-900/30 text-red-400 px-3 py-2 rounded-xl border border-red-900/20 transition-all flex items-center gap-1.5"
          >
            <LogOut size={13} /> Keluar
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-2 gap-8">
        {/* PANEL MANAJEMEN PORTFOLIO WEB */}
        <div
          className={`border rounded-2xl p-6 space-y-4 ${isDarkMode ? "bg-[#13161c] border-slate-800" : "bg-white border-slate-200"}`}
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <FolderPlus size={16} className="text-blue-500" />
            <h2
              className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              Manajemen Postingan Projek
            </h2>
          </div>

          <form
            onSubmit={handleCreateProject}
            className="space-y-3 text-xs font-semibold"
          >
            <div>
              <label className="block text-slate-400 mb-1">
                Judul Projek / Blog
              </label>
              <input
                type="text"
                required
                value={projForm.title}
                onChange={(e) =>
                  setProjForm({ ...projForm, title: e.target.value })
                }
                placeholder="EduSmart - Dashboard Portal"
                className={`w-full border rounded-xl px-3 py-2.5 outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">
                  Kategori Sistem
                </label>
                <input
                  type="text"
                  required
                  value={projForm.category}
                  onChange={(e) =>
                    setProjForm({ ...projForm, category: e.target.value })
                  }
                  placeholder="Sistem Akademik"
                  className={`w-full border rounded-xl p-2 outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Tech Stack</label>
                <input
                  type="text"
                  required
                  value={projForm.tech}
                  onChange={(e) =>
                    setProjForm({ ...projForm, tech: e.target.value })
                  }
                  className={`w-full border rounded-xl p-2 outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">
                Deskripsi Singkat
              </label>
              <textarea
                rows="2"
                required
                value={projForm.desc}
                onChange={(e) =>
                  setProjForm({ ...projForm, desc: e.target.value })
                }
                placeholder="Platform manajemen data..."
                className={`w-full border rounded-xl p-3 outline-none resize-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={savingProj}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              {savingProj ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Menyimpan...
                </>
              ) : (
                "Tambahkan Projek Baru"
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/60 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              List Projek Aktif ({projects.length})
            </span>
            {projects.map((p) => (
              <div
                key={p.id}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-[11px] ${isDarkMode ? "bg-[#181b22] border-slate-800" : "bg-slate-100 border-slate-200"}`}
              >
                <span className="truncate font-bold">{p.title}</span>
                <button
                  onClick={() => handleDeleteProject(p.id)}
                  disabled={deletingId === p.id}
                  className="text-red-400 p-1 hover:bg-red-500/10 rounded-md shrink-0"
                >
                  {deletingId === p.id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Trash2 size={13} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL MANAJEMEN KOMENTAR TESTIMONI */}
        <div
          className={`border rounded-2xl p-6 space-y-4 ${isDarkMode ? "bg-[#13161c] border-slate-800" : "bg-white border-slate-200"}`}
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <MessageSquare size={16} className="text-emerald-500" />
            <h2
              className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              Manajemen Komentar Testimoni
            </h2>
          </div>

          <form
            onSubmit={handleCreateTestimonial}
            className="space-y-3 text-xs font-semibold"
          >
            <div>
              <label className="block text-slate-400 mb-1">
                Isi Komentar Klien
              </label>
              <textarea
                rows="3"
                required
                value={testiForm.quote}
                onChange={(e) =>
                  setTestiForm({ ...testiForm, quote: e.target.value })
                }
                placeholder="Sistem dashboard internal sangat membantu..."
                className={`w-full border rounded-xl p-3 outline-none resize-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">
                  Nama Inisial / Klien
                </label>
                <input
                  type="text"
                  required
                  value={testiForm.name}
                  onChange={(e) =>
                    setTestiForm({ ...testiForm, name: e.target.value })
                  }
                  placeholder="Contoh: GT atau Nama Lengkap"
                  className={`w-full border rounded-xl p-2.5 outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">
                  Nama Institusi / Perusahaan
                </label>
                <input
                  type="text"
                  required
                  value={testiForm.company}
                  onChange={(e) =>
                    setTestiForm({ ...testiForm, company: e.target.value })
                  }
                  placeholder="Global Tech Corp"
                  className={`w-full border rounded-xl p-2.5 outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={savingTesti}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              {savingTesti ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Menyimpan...
                </>
              ) : (
                "Publikasikan Testimoni"
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/60 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              List Testimoni Aktif ({testimonials.length})
            </span>
            {testimonials.map((t) => (
              <div
                key={t.id}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-[11px] ${isDarkMode ? "bg-[#181b22] border-slate-800" : "bg-slate-100 border-slate-200"}`}
              >
                <span className="truncate text-slate-400 italic">
                  "{t.quote.substring(0, 30)}..." -{" "}
                  <strong className="text-blue-400">{t.company}</strong>
                </span>
                <button
                  onClick={() => handleDeleteTestimonial(t.id)}
                  disabled={deletingId === t.id}
                  className="text-red-400 p-1 hover:bg-red-500/10 rounded-md shrink-0"
                >
                  {deletingId === t.id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Trash2 size={13} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
