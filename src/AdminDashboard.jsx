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
  Sun,
  Moon,
  Menu,
  X,
  Image as ImageIcon,
  Edit3,
} from "lucide-react";
import { supabase } from "./supabaseClient";

export default function AdminDashboard({
  projects,
  setProjects,
  testimonials,
  setTestimonials,
  onLogout,
  isDarkMode,
  toggleDarkMode, // Kita gunakan fungsi dari parent agar sinkron total
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State untuk mode edit data
  const [editingProject, setEditingProject] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

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
    avatar_url: "",
  });

  const [savingProj, setSavingProj] = useState(false);
  const [savingTesti, setSavingTesti] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fungsi Tambah / Update Projek
  const handleSaveProject = async (e) => {
    e.preventDefault();
    setSavingProj(true);

    const projData = {
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

    if (editingProject) {
      // MODE EDIT (UPDATE)
      const { data, error } = await supabase
        .from("projects")
        .update(projData)
        .eq("id", editingProject.id)
        .select();

      setSavingProj(false);

      if (error) {
        alert("Gagal mengupdate database: " + error.message);
        return;
      }

      setProjects(
        projects.map((p) => (p.id === editingProject.id ? data[0] : p)),
      );
      setEditingProject(null);
      alert("Projek berhasil diperbarui!");
    } else {
      // MODE TAMBAH BARU (INSERT)
      const { data, error } = await supabase
        .from("projects")
        .insert([projData])
        .select();

      setSavingProj(false);

      if (error) {
        alert("Gagal menyimpan ke database: " + error.message);
        return;
      }

      setProjects([data[0], ...projects]);
      alert("Projek berhasil dipublikasikan!");
    }

    setProjForm({
      title: "",
      category: "",
      desc: "",
      tech: "Laravel + React",
      speed: "98/100",
      status: "Production Ready",
      color: "from-blue-600 to-indigo-700",
    });
  };

  // Fungsi Masuk Mode Edit Projek
  const startEditProject = (p) => {
    setEditingProject(p);
    setProjForm({
      title: p.title || "",
      category: p.category || "",
      desc: p.desc || "",
      tech: p.tech || "Laravel + React",
      speed: p.speed || "98/100",
      status: p.status || "Production Ready",
      color: p.color || "from-blue-600 to-indigo-700",
    });
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus projek ini?")) return;
    setDeletingId(id);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    setDeletingId(null);

    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }
    setProjects(projects.filter((item) => item.id !== id));
    if (editingProject?.id === id) setEditingProject(null);
  };

  // Fungsi Tambah / Update Testimonial
  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    setSavingTesti(true);

    const testiData = {
      quote: testiForm.quote,
      name: testiForm.name,
      company: testiForm.company,
      tags: testiForm.tags,
      rating: testiForm.rating,
      avatar_url: testiForm.avatar_url,
    };

    if (editingTestimonial) {
      // MODE EDIT (UPDATE)
      const { data, error } = await supabase
        .from("testimonials")
        .update(testiData)
        .eq("id", editingTestimonial.id)
        .select();

      setSavingTesti(false);

      if (error) {
        alert("Gagal mengupdate database: " + error.message);
        return;
      }

      setTestimonials(
        testimonials.map((t) => (t.id === editingTestimonial.id ? data[0] : t)),
      );
      setEditingTestimonial(null);
      alert("Testimoni berhasil diperbarui!");
    } else {
      // MODE TAMBAH BARU (INSERT)
      const { data, error } = await supabase
        .from("testimonials")
        .insert([testiData])
        .select();

      setSavingTesti(false);

      if (error) {
        alert("Gagal menyimpan ke database: " + error.message);
        return;
      }

      setTestimonials([data[0], ...testimonials]);
      alert("Testimoni berhasil ditambahkan!");
    }

    setTestiForm({
      quote: "",
      name: "",
      company: "",
      tags: "SaaS Enterprise",
      rating: "5.0",
      avatar_url: "",
    });
  };

  // Fungsi Masuk Mode Edit Testimoni
  const startEditTestimonial = (t) => {
    setEditingTestimonial(t);
    setTestiForm({
      quote: t.quote || "",
      name: t.name || "",
      company: t.company || "",
      tags: t.tags || "SaaS Enterprise",
      rating: t.rating || "5.0",
      avatar_url: t.avatar_url || "",
    });
  };

  const handleDeleteTestimonial = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimonial ini?")) return;
    setDeletingId(id);
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    setDeletingId(null);

    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }
    setTestimonials(testimonials.filter((item) => item.id !== id));
    if (editingTestimonial?.id === id) setEditingTestimonial(null);
  };

  return (
    <div
      className={`w-full min-h-screen font-sans flex flex-col lg:flex-row transition-colors duration-300 ${isDarkMode ? "bg-[#181924] text-[#cfcfe0]" : "bg-[#f5f5f9] text-[#697a8d]"}`}
    >
      {/* SIDEBAR NAVIGASI (DESKTOP) */}
      <aside className="w-64 min-h-screen hidden lg:flex flex-col shrink-0 bg-blue-600 text-white shadow-xl">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10">
          <span className="text-xl font-bold tracking-tight text-white">
            XAF7 STUDIO
          </span>
        </div>

        <div className="flex-1 px-4 py-6 space-y-1.5">
          <div className="text-[11px] font-bold text-blue-200 uppercase tracking-wider px-3 mb-2 opacity-80">
            Main
          </div>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "dashboard" ? "bg-white text-blue-600 font-bold shadow-md" : "text-white/80 hover:bg-white/10"}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <div className="pt-5 text-[11px] font-bold text-blue-200 uppercase tracking-wider px-3 mb-2 opacity-80">
            Manajemen Data
          </div>
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "projects" ? "bg-white text-blue-600 font-bold shadow-md" : "text-white/80 hover:bg-white/10"}`}
          >
            <Briefcase size={18} />
            <span>Projek Kerja</span>
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "testimonials" ? "bg-white text-blue-600 font-bold shadow-md" : "text-white/80 hover:bg-white/10"}`}
          >
            <MessageSquare size={18} />
            <span>Testimonial</span>
          </button>
        </div>
      </aside>

      {/* CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className={`h-16 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur border-b transition-colors duration-300 ${isDarkMode ? "bg-[#212330]/90 border-[#2d3042]" : "bg-white/90 border-slate-200"}`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg lg:hidden transition-all ${isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-slate-100 text-slate-700"}`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span
              className={`font-bold text-lg lg:hidden ${isDarkMode ? "text-white" : "text-slate-800"}`}
            >
              Xaf
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Menggunakan fungsi toggle global agar sinkron dengan App.jsx */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg border transition-all ${isDarkMode ? "border-[#434460] text-amber-400 bg-slate-800" : "border-slate-200 text-slate-600 bg-slate-50"}`}
              title={isDarkMode ? "Mode Terang" : "Mode Malam"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"></div>

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
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full bg-blue-600 text-white border-b border-blue-700 shadow-lg">
            <div className="px-4 py-3 space-y-1 text-sm font-medium">
              <button
                onClick={() => {
                  setActiveTab("dashboard");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left ${activeTab === "dashboard" ? "bg-white text-blue-600 font-bold" : "text-white/90"}`}
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveTab("projects");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left ${activeTab === "projects" ? "bg-white text-blue-600 font-bold" : "text-white/90"}`}
              >
                <Briefcase size={16} /> Projek Kerja
              </button>
              <button
                onClick={() => {
                  setActiveTab("testimonials");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left ${activeTab === "testimonials" ? "bg-white text-blue-600 font-bold" : "text-white/90"}`}
              >
                <MessageSquare size={16} /> Testimonial
              </button>
            </div>
          </div>
        )}

        {/* MAIN ROUTER PANELS */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div
                className={`xl:col-span-2 p-6 rounded-xl shadow-sm flex flex-col justify-between ${isDarkMode ? "bg-[#212330]" : "bg-white"}`}
              >
                <div className="space-y-2">
                  <h2
                    className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-blue-600"}`}
                  >
                    Selamat Datang Kembali, Administrator! 🎉
                  </h2>
                  <p className="text-xs text-slate-400">
                    Sistem basis data portofolio real-time aman terkendali.
                    Gunakan navigasi panel untuk merubah isi landing page.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setActiveTab("projects")}
                  className={`p-5 rounded-xl cursor-pointer border hover:border-blue-500/40 transition-all ${isDarkMode ? "bg-[#212330] border-transparent" : "bg-white"}`}
                >
                  <Briefcase className="text-blue-500" size={24} />
                  <p className="text-xs text-slate-400 mt-2">Total Projek</p>
                  <h3 className="text-2xl font-bold">{projects.length}</h3>
                </div>
                <div
                  onClick={() => setActiveTab("testimonials")}
                  className={`p-5 rounded-xl cursor-pointer border hover:border-blue-500/40 transition-all ${isDarkMode ? "bg-[#212330] border-transparent" : "bg-white"}`}
                >
                  <UserCheck className="text-emerald-500" size={24} />
                  <p className="text-xs text-slate-400 mt-2">Testimonial</p>
                  <h3 className="text-2xl font-bold">{testimonials.length}</h3>
                </div>
              </div>
            </div>
          )}

          {/* PANEL PROJEK */}
          {activeTab === "projects" && (
            <div
              className={`rounded-xl p-6 space-y-5 border ${isDarkMode ? "bg-[#212330] border-transparent" : "bg-white border-slate-100"}`}
            >
              <div className="pb-3 border-b border-slate-500/10">
                <h3 className="text-sm font-bold">
                  {editingProject
                    ? "⚡ Sunting Projek Aktif"
                    : "➕ Tambahkan Postingan Projek"}
                </h3>
              </div>

              <form
                onSubmit={handleSaveProject}
                className="space-y-4 text-xs font-semibold"
              >
                <div>
                  <label className="block text-slate-400 mb-1">
                    Judul Projek
                  </label>
                  <input
                    type="text"
                    required
                    value={projForm.title}
                    onChange={(e) =>
                      setProjForm({ ...projForm, title: e.target.value })
                    }
                    className={`w-full border rounded-lg px-3 py-2 outline-none ${isDarkMode ? "bg-[#181924] border-[#3a3c4f] text-white" : "bg-white border-slate-300"}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
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
                      className={`w-full border rounded-lg px-3 py-2 outline-none ${isDarkMode ? "bg-[#181924] border-[#3a3c4f] text-white" : "bg-white border-slate-300"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">
                      Tech Stack
                    </label>
                    <input
                      type="text"
                      required
                      value={projForm.tech}
                      onChange={(e) =>
                        setProjForm({ ...projForm, tech: e.target.value })
                      }
                      className={`w-full border rounded-lg px-3 py-2 outline-none ${isDarkMode ? "bg-[#181924] border-[#3a3c4f] text-white" : "bg-white border-slate-300"}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">
                    Deskripsi Singkat
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={projForm.desc}
                    onChange={(e) =>
                      setProjForm({ ...projForm, desc: e.target.value })
                    }
                    className={`w-full border rounded-lg px-3 py-2 outline-none resize-none ${isDarkMode ? "bg-[#181924] border-[#3a3c4f] text-white" : "bg-white border-slate-300"}`}
                  ></textarea>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={savingProj}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-wider flex items-center justify-center gap-2"
                  >
                    {savingProj ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Plus size={14} />
                    )}
                    {editingProject ? "PERBARUI PROJEK" : "PUBLIKASIKAN PROJEK"}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null);
                        setProjForm({
                          title: "",
                          category: "",
                          desc: "",
                          tech: "Laravel + React",
                          speed: "98/100",
                          status: "Production Ready",
                          color: "from-blue-600 to-indigo-700",
                        });
                      }}
                      className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>

              {/* LIST DISPLAY */}
              <div className="pt-4 border-t border-slate-500/10 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  List Projek ({projects.length})
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className={`p-3 rounded-lg border flex items-center justify-between text-[12px] ${isDarkMode ? "bg-[#181924] border-[#2d3042]" : "bg-[#f5f5f9]"}`}
                    >
                      <div>
                        <span className="font-bold block">{p.title}</span>
                        <span className="text-[10px] text-slate-400">
                          {p.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEditProject(p)}
                          className="text-blue-500 p-1.5 hover:bg-blue-500/10 rounded-lg"
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          disabled={deletingId === p.id}
                          className="text-red-500 p-1.5 hover:bg-red-500/10 rounded-lg"
                        >
                          {deletingId === p.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PANEL TESTIMONIAL */}
          {activeTab === "testimonials" && (
            <div
              className={`rounded-xl p-6 space-y-5 border ${isDarkMode ? "bg-[#212330] border-transparent" : "bg-white border-slate-100"}`}
            >
              <div className="pb-3 border-b border-slate-500/10">
                <h3 className="text-sm font-bold">
                  {editingTestimonial
                    ? "⚡ Sunting Testimonial"
                    : "➕ Manajemen Komentar Testimoni"}
                </h3>
              </div>

              <form
                onSubmit={handleSaveTestimonial}
                className="space-y-4 text-xs font-semibold"
              >
                <div>
                  <label className="block text-slate-400 mb-1">
                    Isi Komentar Ulasan
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={testiForm.quote}
                    onChange={(e) =>
                      setTestiForm({ ...testiForm, quote: e.target.value })
                    }
                    className={`w-full border rounded-lg px-3 py-2 outline-none resize-none ${isDarkMode ? "bg-[#181924] border-[#3a3c4f] text-white" : "bg-white border-slate-300"}`}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 flex items-center gap-1">
                    <ImageIcon size={12} /> URL Foto Web / Avatar
                  </label>
                  <input
                    type="url"
                    value={testiForm.avatar_url}
                    onChange={(e) =>
                      setTestiForm({ ...testiForm, avatar_url: e.target.value })
                    }
                    className={`w-full border rounded-lg px-3 py-2 outline-none ${isDarkMode ? "bg-[#181924] border-[#3a3c4f] text-white" : "bg-white border-slate-300"}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">
                      Nama Klien
                    </label>
                    <input
                      type="text"
                      required
                      value={testiForm.name}
                      onChange={(e) =>
                        setTestiForm({ ...testiForm, name: e.target.value })
                      }
                      className={`w-full border rounded-lg px-3 py-2 outline-none ${isDarkMode ? "bg-[#181924] border-[#3a3c4f] text-white" : "bg-white border-slate-300"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">
                      Perusahaan / Institusi
                    </label>
                    <input
                      type="text"
                      required
                      value={testiForm.company}
                      onChange={(e) =>
                        setTestiForm({ ...testiForm, company: e.target.value })
                      }
                      className={`w-full border rounded-lg px-3 py-2 outline-none ${isDarkMode ? "bg-[#181924] border-[#3a3c4f] text-white" : "bg-white border-slate-300"}`}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={savingTesti}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-wider flex items-center justify-center gap-2"
                  >
                    {savingTesti ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Plus size={14} />
                    )}
                    {editingTestimonial
                      ? "PERBARUI TESTIMONIAL"
                      : "PUBLIKASIKAN TESTIMONI"}
                  </button>
                  {editingTestimonial && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTestimonial(null);
                        setTestiForm({
                          quote: "",
                          name: "",
                          company: "",
                          tags: "SaaS Enterprise",
                          rating: "5.0",
                          avatar_url: "",
                        });
                      }}
                      className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>

              {/* LIST DISPLAY TESTI */}
              <div className="pt-4 border-t border-slate-500/10 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  List Testimoni ({testimonials.length})
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      className={`p-3 rounded-lg border flex items-center justify-between text-[11px] ${isDarkMode ? "bg-[#181924] border-[#2d3042]" : "bg-[#f5f5f9]"}`}
                    >
                      <div className="flex items-center gap-2 truncate max-w-[80%]">
                        {t.avatar_url && (
                          <img
                            src={t.avatar_url}
                            alt=""
                            className="w-7 h-7 rounded-full object-cover shrink-0"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        )}
                        <div className="truncate">
                          <span className="text-slate-400 italic block truncate">
                            "{t.quote}"
                          </span>
                          <span className="text-[10px] font-semibold text-blue-500 block">
                            {t.name} — {t.company}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEditTestimonial(t)}
                          className="text-blue-500 p-1.5 hover:bg-blue-500/10 rounded-lg"
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          disabled={deletingId === t.id}
                          className="text-red-500 p-1.5 hover:bg-red-500/10 rounded-lg"
                        >
                          {deletingId === t.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
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
