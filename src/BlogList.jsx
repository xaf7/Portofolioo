import React from "react";
import { Eye, ArrowLeft, Laptop, Smartphone } from "lucide-react";

export default function BlogList({
  projects,
  isDarkMode,
  onViewClient,
  onSelectProject,
  selectedProject,
  previewMode,
  setPreviewMode,
}) {
  return (
    <div
      className={`w-full min-h-screen font-sans ${isDarkMode ? "bg-[#0a0c10] text-slate-200" : "bg-slate-50 text-slate-800"}`}
    >
      {/* Navbar Blog */}
      <nav
        className={`w-full border-b px-6 lg:px-20 py-4 flex items-center justify-between sticky top-0 z-50 ${isDarkMode ? "bg-[#0a0c10]/90 border-slate-900 text-white" : "bg-white/90 border-slate-200 text-slate-900"} backdrop-blur-md`}
      >
        <button
          onClick={onViewClient}
          className="text-xs font-bold flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-all"
        >
          <ArrowLeft size={14} /> Kembali ke Beranda Utama
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          XAF7 CORE ARCHIVE
        </span>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
            Archive Center ({projects.length})
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Seluruh Hasil Web & Katalog Penawaran
          </p>
        </div>

        {/* Grid List Produk Arsip Lengkap */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`border rounded-2xl p-5 flex flex-col justify-between ${isDarkMode ? "bg-[#13161c] border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <div>
                <div
                  className={`w-full aspect-[16/10] rounded-xl bg-gradient-to-br ${project.color} p-4 flex flex-col justify-between text-white mb-4`}
                >
                  <span className="text-[8px] font-black uppercase tracking-wider bg-black/20 border border-white/10 px-2 py-0.5 rounded-full w-fit">
                    {project.category}
                  </span>
                  <div>
                    <h4 className="font-mono text-[9px] text-blue-200 mb-0.5">
                      {project.tech}
                    </h4>
                    <h3 className="text-sm font-black tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <h3 className="text-sm font-black mb-1">{project.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                  {project.desc}
                </p>
              </div>

              <div>
                <div className="flex gap-2 mb-3 border-t border-slate-800/40 pt-3 text-[8px] font-bold text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-900/40 border border-slate-800">
                    Speed: {project.speed}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900/40 border border-slate-800">
                    {project.status}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onSelectProject(project);
                    setTimeout(() => {
                      document
                        .getElementById("archive-simulator")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                >
                  <Eye size={12} /> Test Live Preview ➔
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SIMULATOR DALAM HALAMAN ARSIP */}
        {selectedProject && (
          <div
            id="archive-simulator"
            className={`border rounded-2xl p-6 ${isDarkMode ? "bg-[#13161c] border-slate-800" : "bg-white border-slate-200"}`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest block">
                  ACTIVE SIMULATOR TESTING
                </span>
                <h3 className="text-xs font-black">{selectedProject.title}</h3>
              </div>
              <div className="flex gap-1 bg-slate-900/50 p-1 rounded-lg border border-slate-800 text-[10px] font-bold">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  className={`px-3 py-1.5 rounded-md ${previewMode === "desktop" ? "bg-blue-600 text-white" : "text-slate-400"}`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`px-3 py-1.5 rounded-md ${previewMode === "mobile" ? "bg-blue-600 text-white" : "text-slate-400"}`}
                >
                  Mobile
                </button>
              </div>
            </div>

            <div className="w-full flex justify-center bg-[#0a0c10] p-4 rounded-xl min-h-[260px]">
              <div
                className={`bg-[#171b26] rounded-xl border border-slate-800 flex flex-col overflow-hidden transition-all duration-300 ${previewMode === "desktop" ? "w-full" : "w-[310px]"}`}
              >
                <div className="bg-[#11141c] px-4 py-2 border-b border-slate-800 text-[8px] text-slate-500 font-mono text-center">
                  https://demo.xaf7studio.com/{selectedProject.id}
                </div>
                <div className="p-6 text-left">
                  <span className="text-[8px] font-bold text-blue-400 bg-blue-950/40 border border-blue-900/30 px-2 py-0.5 rounded uppercase inline-block mb-2">
                    {selectedProject.category}
                  </span>
                  <h1 className="text-sm font-black text-white mb-1">
                    {selectedProject.mockupData.hero}
                  </h1>
                  <p className="text-[10px] text-slate-400 mb-4">
                    {selectedProject.mockupData.sub}
                  </p>
                  <div className="text-[8px] text-blue-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-800">
                    ✓ INTERACTIVE ENGINE ACTIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
