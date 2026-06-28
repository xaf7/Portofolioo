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
  ExternalLink,
} from "lucide-react";
import { supabase } from "./supabaseClient";

export default function AdminDashboard({
  projects,
  setProjects,
  testimonials,
  setTestimonials,
  onLogout,
  isDarkMode,
  toggleDarkMode,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [editingProject, setEditingProject] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State yang disesuaikan untuk struktur Kategori Portofolio baru kamu
  const [projForm, setProjForm] = useState({
    title: "",
    category: "Web Development", // Nilai default kategori baru
    desc: "",
    long_desc: "", // Deskripsi lengkap saat kartu di-klik
    tech: "React + Tailwind",
    image_url: "", // Link URL Gambar Projek
    web_url: "",
  });

  const [testiForm, setTestiForm] = useState({
    name: "",
    role: "",
    comment: "",
  });

  const resetProjForm = () => {
    setProjForm({
      title: "",
      category: "Web Development",
      desc: "",
      long_desc: "",
      tech: "React + Tailwind",
      image_url: "",
      web_url: "",
    });
  };

  const handleProjSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulasi penanganan state lokal (Menunggu skema tabel Supabase menyusul)
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...p, ...projForm } : p,
        ),
      );
      setEditingProject(null);
    } else {
      const newProj = {
        id: Date.now(),
        ...projForm,
      };
      setProjects([...projects, newProj]);
    }

    setSubmitting(false);
    resetProjForm();
    setActiveTab("dashboard");
  };

  const handleProjEditClick = (project) => {
    setEditingProject(project);
    setProjForm({
      title: project.title || "",
      category: project.category || "Web Development",
      desc: project.desc || "",
      long_desc: project.long_desc || "",
      tech: project.tech || "",
      image_url: project.image_url || "",
      web_url: project.web_url || "",
    });
    setActiveTab("add-project");
  };

  const handleProjDelete = (id) => {
    if (
      window.confirm(
        "Apakah kamu yakin ingin menghapus projek ini dari portfolio?",
      )
    ) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div
      className={`min-h-screen flex ${isDarkMode ? "bg-[#0a0c10] text-slate-200" : "bg-slate-50 text-slate-800"}`}
    >
      {/* SIDEBAR */}
      <aside
        className={`w-64 fixed inset-y-0 left-0 z-40 border-r transform md:transform-none transition-transform duration-200 flex flex-col justify-between ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} ${isDarkMode ? "bg-[#13161c] border-slate-950" : "bg-white border-slate-200"}`}
      >
        <div className="p-6">
          <h2 className="text-sm font-black tracking-widest uppercase mb-8 text-blue-500">
            CORE DASHBOARD
          </h2>
          <nav className="flex flex-col gap-2 text-xs font-bold">
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setIsMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl flex items-center gap-2.5 ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "hover:bg-slate-800/10"}`}
            >
              <LayoutDashboard size={14} /> Ringkasan Portfolio
            </button>
            <button
              onClick={() => {
                setActiveTab("add-project");
                setIsMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl flex items-center gap-2.5 ${activeTab === "add-project" ? "bg-blue-600 text-white" : "hover:bg-slate-800/10"}`}
            >
              <FolderPlus size={14} />{" "}
              {editingProject ? "Edit Projek" : "Tambah Projek"}
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800/20 flex flex-col gap-4">
          <button
            onClick={toggleDarkMode}
            className="text-xs font-bold flex items-center gap-2 opacity-80 hover:opacity-100"
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />} Ganti Tema
          </button>
          <button
            onClick={onLogout}
            className="text-xs font-bold flex items-center gap-2 text-red-500 hover:text-red-400"
          >
            <LogOut size={14} /> Keluar Akses
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <header className="p-4 flex items-center justify-between border-b md:hidden">
          <span className="font-black text-xs tracking-widest">DASHBOARD</span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </header>

        <main className="p-6 sm:p-10 flex-1 max-w-5xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  Ringkasan Portfolio Agos
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Kelola dan tata semua dokumentasi kegiatan kamu di sini
                </p>
              </div>

              {/* DAFTAR MANAGEMEN KARTU PORTFOLIO */}
              <div className="grid grid-cols-1 gap-4">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDarkMode ? "bg-[#13161c] border-slate-800" : "bg-white border-slate-200"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                        {p.image_url ? (
                          <img
                            src={p.image_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={16} className="m-4 text-slate-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wide">
                          {p.title}
                        </h3>
                        <span className="text-[10px] font-bold text-blue-500 bg-blue-950/20 px-1.5 py-0.5 rounded">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleProjEditClick(p)}
                        className="p-2 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600/20"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleProjDelete(p.id)}
                        className="p-2 bg-red-600/10 text-red-500 rounded-lg hover:bg-red-600/20"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "add-project" && (
            <div
              className={`p-6 sm:p-8 rounded-2xl border ${isDarkMode ? "bg-[#13161c] border-slate-800" : "bg-white border-slate-200"}`}
            >
              <h2 className="text-lg font-black tracking-tight mb-4">
                {editingProject
                  ? "Edit Data Projek Portfolio"
                  : "Tambah Projek Portfolio Baru"}
              </h2>

              <form
                onSubmit={handleProjSubmit}
                className="flex flex-col gap-4 text-xs font-bold"
              >
                <div>
                  <label className="block mb-1 text-slate-400">
                    Judul Projek / Nama Kegiatan
                  </label>
                  <input
                    type="text"
                    required
                    value={projForm.title}
                    onChange={(e) =>
                      setProjForm({ ...projForm, title: e.target.value })
                    }
                    placeholder="Contoh: Website Nouvelle Coffee Shop / Ujikom Jaringan 70 PC"
                    className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-slate-400">
                      Kategori Portofolio
                    </label>
                    <select
                      value={projForm.category}
                      onChange={(e) =>
                        setProjForm({ ...projForm, category: e.target.value })
                      }
                      className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Jaringan">Jaringan & Infrastruktur</option>
                      <option value="Organisasi">Pengalaman Organisasi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-400">
                      Teknologi / Tools
                    </label>
                    <input
                      type="text"
                      value={projForm.tech}
                      onChange={(e) =>
                        setProjForm({ ...projForm, tech: e.target.value })
                      }
                      placeholder="Contoh: Laravel, React, MikroTik, Cisco, dll"
                      className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-slate-400">
                    Tautan Gambar Projek (URL)
                  </label>
                  <input
                    type="url"
                    value={projForm.image_url}
                    onChange={(e) =>
                      setProjForm({ ...projForm, image_url: e.target.value })
                    }
                    placeholder="Masukkan URL foto dari hosting gambar (Unsplash/Imgur, dll)"
                    className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400">
                    Link Redirect (Google Form / Live Web)
                  </label>
                  <input
                    type="url"
                    value={projForm.web_url}
                    onChange={(e) =>
                      setProjForm({ ...projForm, web_url: e.target.value })
                    }
                    placeholder="https://forms.gle/... atau https://nouvelle.vercel.app"
                    className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-400">
                    Deskripsi Singkat (Tampil di Kartu Utama)
                  </label>
                  <textarea
                    rows="2"
                    required
                    value={projForm.desc}
                    onChange={(e) =>
                      setProjForm({ ...projForm, desc: e.target.value })
                    }
                    placeholder="Ringkasan 1-2 kalimat mengenai apa yang kamu buat..."
                    className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-1 text-slate-400">
                    Deskripsi Panjang (Detail Kegiatan Saat Kartu Diklik)
                  </label>
                  <textarea
                    rows="5"
                    value={projForm.long_desc}
                    onChange={(e) =>
                      setProjForm({ ...projForm, long_desc: e.target.value })
                    }
                    placeholder="Jelaskan secara mendalam tentang proses pengerjaan, tantangan, tugas kamu di organisasi, ataupun konfigurasi spesifik jaringan PC..."
                    className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? "bg-[#181b22] border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      "Simpan Ke Portfolio"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetProjForm();
                      setEditingProject(null);
                      setActiveTab("dashboard");
                    }}
                    className="px-5 py-3 bg-slate-700 text-white rounded-xl text-xs font-bold uppercase"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
