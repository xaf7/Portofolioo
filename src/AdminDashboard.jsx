import React, { useState } from "react";
import {
  Plus,
  Trash2,
  LayoutDashboard,
  FolderPlus,
  MessageSquare,
  LogOut,
  Loader2,
  Briefcase,
  UserCheck,
  Search,
  Sun,
  Moon,
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
  // State untuk melacak tab mana yang sedang aktif
  const [activeTab, setActiveTab] = useState("dashboard"); // Opsi: "dashboard", "projects", "testimonials"

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
      className={`w-full min-h-screen font-sans flex ${isDarkMode ? "bg-[#232333] text-[#cfcfe0]" : "bg-[#f5f5f9] text-[#697a8d]"}`}
    >
      {/* ================= SIDEBAR NAVIGASI ================= */}
      <aside
        className={`w-64 min-h-screen hidden lg:flex flex-col shrink-0 border-r ${isDarkMode ? "bg-[#2b2c40] border-[#363853]" : "bg-white border-slate-200"}`}
      >
        {/* Brand Header dengan icon.png */}
        <div className="h-16 flex items-center gap-3 px-6">
          <img
            src="/icon.png"
            alt="Logo Xaf"
            className="w-7 h-7 object-contain rounded-lg shadow-sm"
            onError={(e) => {
              // Fallback jika file icon.png belum ditaruh di folder public
              e.target.style.display = "none";
            }}
          />
          <span
            className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-[#566a7f]"}`}
          >
            Xaf
          </span>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-4 py-4 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Main
          </div>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "dashboard" ? (isDarkMode ? "bg-[#3b82f6]/20 text-[#3b82f6]" : "bg-[#e7f1ff] text-[#3b82f6]") : "text-slate-400 hover:bg-slate-500/5"}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <div className="pt-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Manajemen Data
          </div>
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "projects" ? (isDarkMode ? "bg-[#3b82f6]/20 text-[#3b82f6]" : "bg-[#e7f1ff] text-[#3b82f6]") : "text-slate-400 hover:bg-slate-500/5"}`}
          >
            <Briefcase size={18} />
            <span>Projek Kerja</span>
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "testimonials" ? (isDarkMode ? "bg-[#3b82f6]/20 text-[#3b82f6]" : "bg-[#e7f1ff] text-[#3b82f6]") : "text-slate-400 hover:bg-slate-500/5"}`}
          >
            <MessageSquare size={18} />
            <span>Testimonial</span>
          </button>
        </div>
      </aside>

      {/* ================= AREA KONTEN UTAMA ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP NAVBAR */}
        <header
          className={`h-16 px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur border-b ${isDarkMode ? "bg-[#2b2c40]/80 border-[#363853]" : "bg-white/80 border-slate-200"}`}
        >
          <div className="flex items-center gap-2 text-slate-400 text-sm max-w-xs w-full">
            <Search size={18} />
            <span className="opacity-60">Search... (Ctrl+K)</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-slate-400 p-1.5 rounded-lg">
              {isDarkMode ? (
                <Moon size={18} className="text-blue-400" />
              ) : (
                <Sun size={18} className="text-amber-500" />
              )}
            </div>
            <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"></div>

            {/* Profil Admin & Logout */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p
                  className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-[#566a7f]"}`}
                >
                  XAF7 ENGINE
                </p>
                <p className="text-[10px] text-slate-400">Admin Control</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all"
                title="Keluar"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* VIEW KONTEN BERDASARKAN TAB YANG AKTIF */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {/* 1. TAMPILAN JIKA TAB UTAMA (DASHBOARD) AKTIF */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Banner Selamat Datang */}
                <div
                  className={`xl:col-span-2 p-6 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden ${isDarkMode ? "bg-[#2b2c40]" : "bg-white"}`}
                >
                  <div className="space-y-2 max-w-md">
                    <h2
                      className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-blue-600"}`}
                    >
                      Selamat Datang Kembali, Administrator! 🎉
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Manajemen konten dan arsitektur database terhubung
                      langsung secara real-time dengan Supabase Server. Pilih
                      tab menu di kiri untuk mengelola data spesifik.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 text-xs font-bold rounded-lg transition-all border border-blue-600/20">
                      Lihat Log Database
                    </button>
                  </div>
                  <div className="absolute right-6 bottom-0 top-0 w-32 hidden sm:flex items-center justify-center opacity-10">
                    <LayoutDashboard size={120} className="text-blue-600" />
                  </div>
                </div>

                {/* Kartu Informasi Ringkasan */}
                <div className="grid grid-cols-2 gap-6">
                  <div
                    className={`p-5 rounded-xl shadow-sm flex flex-col justify-between cursor-pointer hover:border-blue-500/40 border transition-all ${isDarkMode ? "bg-[#2b2c40] border-transparent" : "bg-white border-transparent"}`}
                    onClick={() => setActiveTab("projects")}
                  >
                    <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-lg w-10">
                      <Briefcase size={20} />
                    </div>
                    <div className="mt-4">
                      <span className="text-xs text-slate-400 block font-semibold">
                        Total Projek
                      </span>
                      <h3
                        className={`text-2xl font-bold mt-1 ${isDarkMode ? "text-white" : "text-[#566a7f]"}`}
                      >
                        {projects.length}
                      </h3>
                      <span className="text-[10px] text-blue-500 font-medium mt-1 inline-block">
                        Kelola Projek →
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-xl shadow-sm flex flex-col justify-between cursor-pointer hover:border-blue-500/40 border transition-all ${isDarkMode ? "bg-[#2b2c40] border-transparent" : "bg-white border-transparent"}`}
                    onClick={() => setActiveTab("testimonials")}
                  >
                    <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-lg w-10">
                      <UserCheck size={20} />
                    </div>
                    <div className="mt-4">
                      <span className="text-xs text-slate-400 block font-semibold">
                        Testimonial
                      </span>
                      <h3
                        className={`text-2xl font-bold mt-1 ${isDarkMode ? "text-white" : "text-[#566a7f]"}`}
                      >
                        {testimonials.length}
                      </h3>
                      <span className="text-[10px] text-emerald-500 font-medium mt-1 inline-block">
                        Kelola Ulasan →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. TAMPILAN JIKA TAB PROJEK KERJA AKTIF */}
          {activeTab === "projects" && (
            <div
              className={`rounded-xl shadow-sm p-6 space-y-5 border ${isDarkMode ? "bg-[#2b2c40] border-transparent" : "bg-white border-slate-100"}`}
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-500/10">
                <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                  <FolderPlus size={18} />
                </div>
                <div>
                  <h3
                    className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-[#566a7f]"}`}
                  >
                    Manajemen Postingan Projek
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Unggah portofolio arsitektur software Anda terbaru
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleCreateProject}
                className="space-y-4 text-xs font-semibold"
              >
                <div>
                  <label className="block text-slate-400 mb-1.5 font-medium">
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
                    className={`w-full border rounded-lg px-3 py-2.5 outline-none transition-all ${isDarkMode ? "bg-[#232333] border-[#434460] text-white focus:border-blue-500" : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-medium">
                      Kategori Sistem
                    </label>
                    <input
                      type="text"
                      required
                      value={projForm.category}
                      onChange={(e) =>
                        setProjForm({ ...projForm, category: e.target.value })
                      }
                      placeholder="Sistem Academic"
                      className={`w-full border rounded-lg px-3 py-2.5 outline-none transition-all ${isDarkMode ? "bg-[#232333] border-[#434460] text-white focus:border-blue-500" : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-medium">
                      Tech Stack
                    </label>
                    <input
                      type="text"
                      required
                      value={projForm.tech}
                      onChange={(e) =>
                        setProjForm({ ...projForm, tech: e.target.value })
                      }
                      className={`w-full border rounded-lg px-3 py-2.5 outline-none transition-all ${isDarkMode ? "bg-[#232333] border-[#434460] text-white focus:border-blue-500" : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-medium">
                    Deskripsi Singkat
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={projForm.desc}
                    onChange={(e) =>
                      setProjForm({ ...projForm, desc: e.target.value })
                    }
                    placeholder="Platform manajemen data..."
                    className={`w-full border rounded-lg px-3 py-2.5 outline-none resize-none transition-all ${isDarkMode ? "bg-[#232333] border-[#434460] text-white focus:border-blue-500" : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"}`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={savingProj}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  {savingProj ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />{" "}
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Plus size={14} /> Tambahkan Projek Baru
                    </>
                  )}
                </button>
              </form>

              {/* List Data Di Bawah Form Projek */}
              <div className="pt-4 border-t border-slate-500/10 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  List Projek Aktif ({projects.length})
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className={`p-3 rounded-lg border flex items-center justify-between text-[12px] transition-all ${isDarkMode ? "bg-[#232333] border-[#363853]" : "bg-[#f5f5f9] border-slate-100"}`}
                    >
                      <div className="truncate max-w-[80%]">
                        <span
                          className={`font-bold block ${isDarkMode ? "text-slate-200" : "text-[#566a7f]"}`}
                        >
                          {p.title}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {p.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        disabled={deletingId === p.id}
                        className="text-red-500 p-1.5 hover:bg-red-500/10 rounded-lg transition-all shrink-0"
                      >
                        {deletingId === p.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. TAMPILAN JIKA TAB TESTIMONIAL AKTIF */}
          {activeTab === "testimonials" && (
            <div
              className={`rounded-xl shadow-sm p-6 space-y-5 border ${isDarkMode ? "bg-[#2b2c40] border-transparent" : "bg-white border-slate-100"}`}
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-500/10">
                <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3
                    className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-[#566a7f]"}`}
                  >
                    Manajemen Komentar Testimoni
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Urus respon validasi eksternal dari klien
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleCreateTestimonial}
                className="space-y-4 text-xs font-semibold"
              >
                <div>
                  <label className="block text-slate-400 mb-1.5 font-medium">
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
                    className={`w-full border rounded-lg px-3 py-2.5 outline-none resize-none transition-all ${isDarkMode ? "bg-[#232333] border-[#434460] text-white focus:border-blue-500" : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"}`}
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-medium">
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
                      className={`w-full border rounded-lg px-3 py-2.5 outline-none transition-all ${isDarkMode ? "bg-[#232333] border-[#434460] text-white focus:border-blue-500" : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-medium">
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
                      className={`w-full border rounded-lg px-3 py-2.5 outline-none transition-all ${isDarkMode ? "bg-[#232333] border-[#434460] text-white focus:border-blue-500" : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"}`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={savingTesti}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  {savingTesti ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />{" "}
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Plus size={14} /> Publikasikan Testimoni
                    </>
                  )}
                </button>
              </form>

              {/* List Data Di Bawah Form Testimonial */}
              <div className="pt-4 border-t border-slate-500/10 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  List Testimoni Aktif ({testimonials.length})
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      className={`p-3 rounded-lg border flex items-center justify-between text-[11px] transition-all ${isDarkMode ? "bg-[#232333] border-[#363853]" : "bg-[#f5f5f9] border-slate-100"}`}
                    >
                      <div className="truncate max-w-[85%]">
                        <span className="text-slate-400 italic block truncate">
                          "{t.quote}"
                        </span>
                        <span className="text-[10px] font-semibold text-blue-500 mt-0.5 block">
                          {t.name} — {t.company}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        disabled={deletingId === t.id}
                        className="text-red-500 p-1.5 hover:bg-red-500/10 rounded-lg transition-all shrink-0"
                      >
                        {deletingId === t.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
