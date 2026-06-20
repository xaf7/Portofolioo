import React, { useState } from "react";
import {
  Plus,
  Trash2,
  LayoutDashboard,
  Globe,
  FolderPlus,
  MessageSquare,
  LogOut,
} from "lucide-react";

export default function AdminDashboard({
  projects,
  setProjects,
  testimonials,
  setTestimonials,
  onLogout,
  isDarkMode,
}) {
  // State Form Projek
  const [projForm, setProjForm] = useState({
    title: "",
    category: "",
    desc: "",
    tech: "Laravel + React",
    speed: "98/100",
    status: "Production Ready",
    color: "from-blue-600 to-indigo-700",
    mockupHero: "",
    mockupSub: "",
    mockupFeatures: "",
  });

  // State Form Testimoni
  const [testiForm, setTestiForm] = useState({
    quote: "",
    name: "",
    company: "",
    tags: "SaaS Enterprise",
    rating: "5.0",
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    const newProj = {
      id: Date.now(),
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
      mockupData: {
        hero: projForm.mockupHero || projForm.title,
        sub: projForm.mockupSub || projForm.desc,
        features: projForm.mockupFeatures || projForm.category,
      },
    };
    setProjects([newProj, ...projects]);
    setProjForm({
      title: "",
      category: "",
      desc: "",
      tech: "Laravel + React",
      speed: "98/100",
      status: "Production Ready",
      color: "from-blue-600 to-indigo-700",
      mockupHero: "",
      mockupSub: "",
      mockupFeatures: "",
    });
    alert("Projek berhasil dipublikasikan!");
  };

  const handleCreateTestimonial = (e) => {
    e.preventDefault();
    const newTesti = {
      id: Date.now(),
      quote: testiForm.quote,
      name: testiForm.name,
      company: testiForm.company,
      tags: testiForm.tags,
      rating: testiForm.rating,
    };
    setTestimonials([newTesti, ...testimonials]);
    setTestiForm({
      quote: "",
      name: "",
      company: "",
      tags: "SaaS Enterprise",
      rating: "5.0",
    });
    alert("Testimoni berhasil ditambahkan!");
  };

  return (
    <div
      className={`w-full min-h-screen font-sans ${isDarkMode ? "bg-[#0f1115] text-slate-200" : "bg-slate-50 text-slate-800"}`}
    >
      {/* Header Panel */}
      <header
        className={`w-full border-b px-6 lg:px-20 py-4 flex items-center justify-between sticky top-0 z-50 ${isDarkMode ? "bg-[#13161c] border-slate-800" : "bg-white border-slate-200"}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
            <LayoutDashboard size={16} />
          </div>
          <div>
            <h1
              className={`text-sm font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              XAF7 CORE ENGINE CONTROL
            </h1>
            <p className="text-[10px] text-slate-400">
              Pusat Sistem Update Terisolasi Vercel
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

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-8">
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

            <div
              className={`p-4 border rounded-xl space-y-2.5 ${isDarkMode ? "bg-[#181b22] border-slate-800" : "bg-slate-100 border-slate-200"}`}
            >
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block">
                ⚙️ Data Sistem Simulator Terintegrasi
              </span>
              <input
                type="text"
                required
                value={projForm.mockupHero}
                onChange={(e) =>
                  setProjForm({ ...projForm, mockupHero: e.target.value })
                }
                placeholder="Judul Hero Live Preview"
                className={`w-full border rounded-lg p-2 outline-none text-[11px] ${isDarkMode ? "bg-[#13161c] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`}
              />
              <input
                type="text"
                required
                value={projForm.mockupSub}
                onChange={(e) =>
                  setProjForm({ ...projForm, mockupSub: e.target.value })
                }
                placeholder="Sub-Deskripsi Live Preview"
                className={`w-full border rounded-lg p-2 outline-none text-[11px] ${isDarkMode ? "bg-[#13161c] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`}
              />
              <input
                type="text"
                required
                value={projForm.mockupFeatures}
                onChange={(e) =>
                  setProjForm({ ...projForm, mockupFeatures: e.target.value })
                }
                placeholder="Fitur Utama (Pisahkan dengan Koma)"
                className={`w-full border rounded-lg p-2 outline-none text-[11px] ${isDarkMode ? "bg-[#13161c] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl uppercase tracking-wider transition-all"
            >
              Tambahkan Projek Baru
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/60 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              List Projek Aktif
            </span>
            {projects.map((p) => (
              <div
                key={p.id}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-[11px] ${isDarkMode ? "bg-[#181b22] border-slate-800" : "bg-slate-100 border-slate-200"}`}
              >
                <span className="truncate font-bold">{p.title}</span>
                <button
                  onClick={() =>
                    setProjects(projects.filter((item) => item.id !== p.id))
                  }
                  className="text-red-400 p-1 hover:bg-red-500/10 rounded-md"
                >
                  <Trash2 size={13} />
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
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl uppercase tracking-wider transition-all"
            >
              Publikasikan Testimoni
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/60 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              List Testimoni Aktif
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
                  onClick={() =>
                    setTestimonials(
                      testimonials.filter((item) => item.id !== t.id),
                    )
                  }
                  className="text-red-400 p-1 hover:bg-red-500/10 rounded-md"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
