import React, { useState } from "react";
import { Link2, ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react";

const ProjectIntake = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessUrl: "",
    category: "",
    serviceNeeded: "",
    budgetRange: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleWhatsappSubmit = () => {
    const whatsappNumber = "628XXXXXXXXXX"; // Ganti dengan nomor WA-mu
    const message =
      `Halo XAF7 Studio! Saya ingin buat proyek.\n\n` +
      `- URL/Nama Bisnis: ${formData.businessUrl || "Belum ada"}\n` +
      `- Kategori: ${formData.category}\n` +
      `- Layanan: ${formData.serviceNeeded}\n` +
      `- Estimasi Budget: ${formData.budgetRange}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-900 flex flex-col items-center justify-center min-h-[80vh]">
      {/* Brand Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          XAF7 Studio<span className="text-blue-600">.</span>
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Build Fast, Scale Smart
        </p>
      </div>

      {/* Form Container (Mengadopsi kebersihan layout image_29b73e.png) */}
      <div className="w-full max-w-xl bg-white dark:bg-slate-850 p-2 sm:p-6 transition-all duration-300">
        {/* STEP 1: URL / Nama Bisnis */}
        {step === 1 && (
          <div className="space-y-6">
            <label className="block text-lg font-medium text-slate-800 dark:text-slate-200 tracking-tight">
              Masukkan URL atau Nama Bisnis Anda
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Link2 size={18} />
              </div>
              <input
                type="text"
                name="businessUrl"
                value={formData.businessUrl}
                onChange={handleChange}
                placeholder="e.g mywebsite.com atau Toko Maju Jaya"
                className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 py-4 pl-11 pr-4 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Kategori Klien (Sesuai spesifikasi target tokomu) */}
        {step === 2 && (
          <div className="space-y-6">
            <label className="block text-lg font-medium text-slate-800 dark:text-slate-200 tracking-tight">
              Kategori mana yang paling menggambarkan bisnis Anda?
            </label>
            <div className="relative mt-1">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 py-4 px-4 text-base text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
              >
                <option value="">Pilih Kategori Bisnis</option>
                <option value="UMKM">UMKM / Bisnis Lokal</option>
                <option value="Sekolah">Sekolah / Instansi Pendidikan</option>
                <option value="Organisasi">Organisasi / Komunitas</option>
                <option value="Content Creator">
                  Content Creator / Influencer
                </option>
                <option value="Affiliate Marketer">Affiliate Marketer</option>
                <option value="Startup Kecil">Startup Kecil / SaaS Baru</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Kebutuhan Layanan & Budget */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-slate-800 dark:text-slate-200 tracking-tight mb-3">
                Layanan sistem apa yang Anda butuhkan?
              </label>
              <select
                name="serviceNeeded"
                value={formData.serviceNeeded}
                onChange={handleChange}
                className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 py-4 px-4 text-base text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all"
              >
                <option value="">Pilih Layanan</option>
                <option value="Website Company Profile">
                  Website Company Profile
                </option>
                <option value="Dashboard Admin / Sistem Keuangan">
                  Dashboard Admin & Keuangan
                </option>
                <option value="Web Affiliate Tools">Web Affiliate Tools</option>
                <option value="Sistem Sekolah">Sistem Sekolah Terpadu</option>
                <option value="Custom Web App">
                  Custom Web App (Laravel + React)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-slate-800 dark:text-slate-200 tracking-tight mb-3">
                Berapa estimasi budget proyek ini?
              </label>
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 py-4 px-4 text-base text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all"
              >
                <option value="">Pilih Range Budget</option>
                <option value="Rp 2 Juta - Rp 5 Juta">
                  Rp 2 Juta - Rp 5 Juta (Starter)
                </option>
                <option value="Rp 5 Juta - Rp 15 Juta">
                  Rp 5 Juta - Rp 15 Juta (Professional)
                </option>
                <option value="> Rp 15 Juta">
                  &gt; Rp 15 Juta (Custom Enterprise)
                </option>
              </select>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-10 flex items-center justify-between gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              Kembali
            </button>
          )}
          <div className="ml-auto">
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={
                  step === 1 ? !formData.businessUrl : !formData.category
                }
                className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-medium rounded-xl shadow-lg shadow-blue-500/10 transition-all text-base"
              >
                Lanjutkan <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleWhatsappSubmit}
                disabled={!formData.serviceNeeded || !formData.budgetRange}
                className="flex items-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-medium rounded-xl shadow-lg shadow-green-500/10 transition-all text-base"
              >
                Kirim Spesifikasi ke WA <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar Minimalis */}
        <div className="mt-12 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default ProjectIntake;
