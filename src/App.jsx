import React, { useState, useEffect, useRef } from "react";
import {
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
  Star,
  Mail,
  MessageCircle,
  Plus,
  X,
  Cat,
  Languages,
} from "lucide-react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { supabase } from "./supabaseClient";

function useScrollReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return [ref, isVisible];
}

export default function App() {
  const [lang, setLang] = useState("id");

  const t = {
    id: {
      nav: {
        home: "Home",
        adv: "Advertisers",
        pub: "Publishers",
        gal: "Gallery",
        cs: "Case Studies",
        contact: "Contact us",
      },
      hero: {
        badge: "Siswa SMK & Spesialis Backend",
        title1: "Website Modern ",
        title2: "untuk",
        desc: "Teknologi Proprietary. Hasil Terbukti. Custom dibuat sesuai kebutuhan.",
        btn: "Mulai Sekarang ➔",
      },
      showcase: {
        badge: "dari blogpost & produk saya",
        title: "Hasil Web & Penawaran Projek",
        testBtn: "TEST LIVE PREVIEW ➔",
      },
      testimoni: {
        title1: "Testimoni yang Berbicara",
        title2: "Tentang Hasil Saya",
        desc: "Dengarkan tanggapan nyata langsung dari client enterprise maupun instansi pendidikan yang mempercayakan sistem mereka.",
      },
      brief: {
        badge: "mari bangun bersama",
        title1: "Satukan Ide Hebatmu,",
        title2: "Wujudkan Sistem Impian!",
        desc: "Punya konsep aplikasi, dashboard, atau platform digital yang ingin dieksekusi? Jangan biarkan ide itu mengendap begitu saja. Mari kita gabungkan visi bisnismu dengan keahlian teknis modern kami untuk membangun produk digital yang cepat, tangguh, dan tepat sasaran.",
        alert: "Isi form di samping untuk mulai menyelaraskan tujuan kita.",
        formTitle: "BRIEF PROYEK",
        labelDomain: "Nama Domain Pendukung",
        placeholderDomain: "contoh: websitesaya.com atau belum ada",
        labelReq: "Deskripsi Kebutuhan System",
        placeholderReq:
          "Jelaskan alur sistem kustom/fitur yang ingin Anda bangun...",
        labelBudget: "Estimasi Budget",
        btnWA: "Kirim ke WA",
        btnGmail: "Kirim ke Gmail",
        alertValidate:
          "Harap isi Nama Domain dan Deskripsi Kebutuhan Anda terlebih dahulu!",
      },
      faq: {
        badge: "pertanyaan & jawaban",
        title: "Pertanyaan yang Sering Diajukan",
      },
      footer: {
        desc: "Solusi pengembangan sistem kustom dan web modern. Dibangun untuk kecepatan, skalabilitas, dan performa bisnis Anda.",
        navTitle: "Navigasi",
        srv: "Layanan",
        start: "Mulai Proyek",
        port: "Portfolio",
        contactTitle: "Kontak",
        loc: "Depok, Jawa Barat",
        infoTitle: "Dapatkan info terbaru",
        holderEmail: "Alamat email",
        rights: "XAF7 Studio. Semua Hak Dilindungi.",
      },
      chatbot: {
        bubble: "Halo! Ada yang bisa dibantu?",
        welcome: "Halo! 🐱",
        subWelcome: "Butuh bantuan navigasi halaman? Saya siap membantu.",
        question: "Apa yang kamu cari?",
        btnGo: "Pergi ke Seksi ➔",
        btnBack: "← Kembali",
      },
    },
    en: {
      nav: {
        home: "Home",
        adv: "Advertisers",
        pub: "Publishers",
        gal: "Gallery",
        cs: "Case Studies",
        contact: "Contact us",
      },
      hero: {
        badge: "Vocational High School Student & Backend Specialist",
        title1: "Modern Website ",
        title2: "for",
        desc: "Proprietary Technology. Proven Results. Custom built to your needs.",
        btn: "Get Started Now ➔",
      },
      showcase: {
        badge: "from my blogpost & products",
        title: "Web Results & Project Proposals",
        testBtn: "TEST LIVE PREVIEW ➔",
      },
      testimoni: {
        title1: "Testimonials that Speak",
        title2: "About My Results",
        desc: "Hear real feedback directly from enterprise clients and educational institutions who trust their systems with us.",
      },
      brief: {
        badge: "let's build together",
        title1: "Unite Your Great Ideas,",
        title2: "Realize Your Dream System!",
        desc: "Have a concept for an app, dashboard, or digital platform you want to execute? Don't let that idea sit idle. Let's combine your business vision with our modern technical expertise to build digital products that are fast, resilient, and highly targeted.",
        alert: "Fill out the form on the side to start aligning our goals.",
        formTitle: "PROJECT BRIEF",
        labelDomain: "Supporting Domain Name",
        placeholderDomain: "e.g., mysite.com or not available yet",
        labelReq: "System Requirements Description",
        placeholderReq:
          "Explain the custom system workflow/features you want to build...",
        labelBudget: "Estimated Budget",
        btnWA: "Send to WA",
        btnGmail: "Send to Gmail",
        alertValidate:
          "Please fill in the Domain Name and your System Requirements first!",
      },
      faq: {
        badge: "questions & answers",
        title: "Frequently Asked Questions",
      },
      footer: {
        desc: "Custom system development and modern web solutions. Built for speed, scalability, and your business performance.",
        navTitle: "Navigation",
        srv: "Services",
        start: "Start Project",
        port: "Portfolio",
        contactTitle: "Contact",
        loc: "Depok, West Java",
        infoTitle: "Get the latest info",
        holderEmail: "Email address",
        rights: "XAF7 Studio. All Rights Reserved.",
      },
      chatbot: {
        bubble: "Hi there! Can I help you?",
        welcome: "Hi there! 🐱",
        subWelcome: "Need help navigating the page? I'm here to help.",
        question: "What are you looking for?",
        btnGo: "Go to Section ➔",
        btnBack: "← Back",
      },
    },
  };

  const [activeFaqId, setActiveFaqId] = useState(null);

  const faqData = [
    {
      id: 1,
      question:
        lang === "id"
          ? "Bagaimana cara memesan sistem kustom di XAF7 Studio?"
          : "How do I order a custom system at XAF7 Studio?",
      answer:
        lang === "id"
          ? "Kamu cukup mengisi form Brief Proyek di bagian bawah halaman ini dengan detail kebutuhan sistem dan estimasi budget, lalu klik tombol kirim ke WhatsApp atau Gmail untuk konsultasi langsung."
          : "You just need to fill out the Project Brief form at the bottom of this page with your system details and budget estimation, then click the send to WhatsApp or Gmail button for a direct consultation.",
    },
    {
      id: 2,
      question:
        lang === "id"
          ? "Apakah sistem yang dibangun sudah termasuk hosting dan domain?"
          : "Does the built system include hosting and domain?",
      answer:
        lang === "id"
          ? "Tergantung paket budget yang kamu pilih. Untuk pilihan paket Full Setup atau Custom Enterprise, kami akan bantu mengurus konfigurasi domain hingga sistem siap diakses secara online (Production Ready)."
          : "Depending on the budget package you choose. For Full Setup or Custom Enterprise packages, we will help handle domain configuration until the system is ready to be accessed online (Production Ready).",
    },
    {
      id: 3,
      question:
        lang === "id"
          ? "Berapa lama proses pengerjaan satu buah web/dashboard?"
          : "How long does it take to build a single web/dashboard?",
      answer:
        lang === "id"
          ? "Waktu pengerjaan sangat bergantung pada kompleksitas fitur, berkisar antara 1 hingga 3 minggu. Kami selalu mengutamakan optimasi performa dan kecepatan loading sistem."
          : "The development time highly depends on the complexity of the features, ranging from 1 to 3 weeks. We always prioritize performance optimization and system loading speed.",
    },
    {
      id: 4,
      question:
        lang === "id"
          ? "Tech stack apa saja yang biasa digunakan?"
          : "What tech stack is typically used?",
      answer:
        lang === "id"
          ? "Kami fokus pada ekosistem modern yang super cepat, spesifik menggunakan Laravel sebagai arsitektur backend yang kokoh dan React / Tailwind CSS untuk antarmuka frontend yang responsif."
          : "We focus on a super fast modern ecosystem, specifically using Laravel as a solid backend architecture and React / Tailwind CSS for responsive frontend interfaces.",
    },
  ];

  const [isDarkMode, setIsDarkMode] = useState(true);

  const getInitialView = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "true") return "login";
    }
    return "client";
  };
  const [viewMode, setViewMode] = useState(getInitialView);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") !== "true") return;

    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) setViewMode("admin");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setViewMode("client");
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("admin");
      window.history.replaceState({}, "", url.toString());
    }
  };

  const [currentIdx, setCurrentIdx] = useState(0);
  const CARD_WIDTH_MOBILE =
    typeof window !== "undefined" && window.innerWidth < 640
      ? window.innerWidth * 0.85
      : 440;
  const CARD_GAP = 24;

  const chatbotGreeting = {
    welcome: t[lang].chatbot.welcome,
    subWelcome: t[lang].chatbot.subWelcome,
    question: t[lang].chatbot.question,
  };

  const chatbotConfig = [
    {
      id: "advertisers",
      label:
        lang === "id"
          ? "Informasi untuk Pengiklan"
          : "Information for Advertisers",
      responseMessage:
        lang === "id"
          ? "Bagus! 🚀 Mari kita lihat opsi tata letak modern dan tumpukan teknik kustom kami di atas."
          : "Great! 🚀 Let's view our modern layout options and custom engineering stack above.",
      targetSection: "showcase",
    },
    {
      id: "publishers",
      label:
        lang === "id"
          ? "Informasi untuk Penerbit"
          : "Information for Publishers",
      responseMessage:
        lang === "id"
          ? "Pilihan Luar Biasa! 📈 Isi Formulir Singkat Proyek tepat di bawah ini untuk meluncurkan platform Anda secara instan."
          : "Awesome Choice! 📈 Fill out the Project Brief Form right below to launch your platform instantly.",
      targetSection: "brief",
    },
    {
      id: "gallery",
      label:
        lang === "id" ? "Jelajahi Showcase Galeri" : "Explore Gallery Showcase",
      responseMessage:
        lang === "id"
          ? "Berikut adalah studi kasus kami dan tautan demo langsung, jangan ragu untuk memfilter berdasarkan industri."
          : "Here are our case studies and live demo links, feel free to filter by industry.",
      targetSection: "testimoni",
    },
    {
      id: "case_studies",
      label: lang === "id" ? "Studi Kasus & FAQ" : "Case Studies & FAQ",
      responseMessage:
        lang === "id"
          ? "Lihat bagian FAQ akordeon dinamis kami untuk informasi terperinci dan dukungan."
          : "Check out our dynamic accordion FAQ section for detailed information and support.",
      targetSection: "faq",
    },
  ];

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState("welcome");
  const [selectedOption, setSelectedOption] = useState(null);

  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      const [
        { data: projData, error: projError },
        { data: testiData, error: testiError },
      ] = await Promise.all([
        supabase.from("projects").select("*").order("id", { ascending: false }),
        supabase
          .from("testimonials")
          .select("*")
          .order("id", { ascending: false }),
      ]);

      if (projError)
        console.error("Gagal mengambil data projects:", projError.message);
      if (testiError)
        console.error("Gagal mengambil data testimonials:", testiError.message);

      setProjects(projData || []);
      setTestimonials(testiData || []);
      setDataLoading(false);
    };
    fetchData();
  }, []);

  const [briefForm, setBriefForm] = useState({
    domainName: "",
    systemRequirement: "",
    estimatedBudget: "Full Setup - Rp 1.200.000+",
    additionalNotes: "",
  });

  const [heroRef, heroVisible] = useScrollReveal();
  const [showcaseRef, showcaseVisible] = useScrollReveal();
  const [testimoniRef, testimoniVisible] = useScrollReveal();
  const [briefRef, briefVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();

  const words =
    lang === "id"
      ? ["Engage.", "Cepat.", "Cerdas."]
      : ["Engage.", "Fast.", "Smart."];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setCurrentWordIdx(0);
    setCurrentText("");
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    let timer;
    const fullWord = words[currentWordIdx];
    const handleTyping = () => {
      if (!isDeleting) {
        const nextText = fullWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        if (nextText === fullWord) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        const nextText = fullWord.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        if (nextText === "") {
          setIsDeleting(false);
          setCurrentWordIdx((prev) => (prev + 1) % words.length);
          return;
        }
      }
    };
    timer = setTimeout(handleTyping, isDeleting ? 60 : 120);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, lang]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const generateBriefText = () => {
    const headerText =
      lang === "id"
        ? `Halo XAF7 Studio, saya ingin mengajukan brief proyek baru:`
        : `Hello XAF7 Studio, I would like to submit a new project brief:`;
    return (
      `${headerText}%0A%0A` +
      `• ${lang === "id" ? "Nama Domain" : "Domain Name"}: ${encodeURIComponent(briefForm.domainName || "-")}%0A` +
      `• ${lang === "id" ? "Deskripsi Kebutuhan" : "Requirements Description"}: ${encodeURIComponent(briefForm.systemRequirement || "-")}%0A` +
      `• ${lang === "id" ? "Estimasi Budget" : "Estimated Budget"}: ${encodeURIComponent(briefForm.estimatedBudget)}%0A` +
      `• ${lang === "id" ? "Catatan Tambahan" : "Additional Notes"}: ${encodeURIComponent(briefForm.additionalNotes || "-")}`
    );
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!briefForm.domainName || !briefForm.systemRequirement) {
      alert(t[lang].brief.alertValidate);
      return;
    }
    const nomorWA = "6283129195737";
    window.open(
      `https://api.whatsapp.com/send?phone=${nomorWA}&text=${generateBriefText()}`,
      "_blank",
    );
  };

  const handleSendGmail = (e) => {
    e.preventDefault();
    if (!briefForm.domainName || !briefForm.systemRequirement) {
      alert(t[lang].brief.alertValidate);
      return;
    }
    const emailTujuan = "xafdevstudio@gmail.com";
    const subjectTitle =
      lang === "id" ? "Brief Proyek Baru" : "New Project Brief";
    window.location.href = `mailto:${emailTujuan}?subject=${subjectTitle} - ${encodeURIComponent(briefForm.domainName)}&body=${generateBriefText()}`;
  };

  if (viewMode === "login") {
    return (
      <AdminLogin
        isDarkMode={isDarkMode}
        onLoginSuccess={() => setViewMode("admin")}
        onBack={() => {
          setViewMode("client");
          if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            url.searchParams.delete("admin");
            window.history.replaceState({}, "", url.toString());
          }
        }}
      />
    );
  }

  if (viewMode === "admin") {
    return (
      <AdminDashboard
        projects={projects}
        setProjects={setProjects}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
    );
  }

  return (
    <div className="w-full min-h-screen font-sans antialiased m-0 p-0 transition-colors duration-300 relative bg-[#0B1120] text-[#CBD5E1]">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 lg:px-24 py-5 flex items-center justify-between border-b border-slate-400/15 bg-[#0B1120]/80 backdrop-blur-md">
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="./icon.png"
            alt="XAF7 Studio Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 brightness-100"
          />
          <span className="tracking-wider uppercase font-black text-sm sm:text-base text-white">
            XAF7 STUDIO
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-[12px] font-semibold tracking-wide text-slate-400">
          <button
            onClick={() => scrollToSection("hero")}
            className="hover:text-white transition-colors"
          >
            {t[lang].nav.home}
          </button>
          <button
            onClick={() => scrollToSection("showcase")}
            className="hover:text-white transition-colors"
          >
            {t[lang].nav.adv}
          </button>
          <button
            onClick={() => scrollToSection("brief")}
            className="hover:text-white transition-colors"
          >
            {t[lang].nav.pub}
          </button>
          <button
            onClick={() => scrollToSection("testimoni")}
            className="hover:text-white transition-colors"
          >
            {t[lang].nav.gal}
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="hover:text-white transition-colors"
          >
            {t[lang].nav.cs}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Tombol bahasa */}
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="p-2 rounded-lg border border-slate-400/15 hover:bg-[#131B2E] bg-[#1A2438] text-slate-300 transition-all flex items-center gap-1 text-[11px] font-bold"
            title="Switch Language"
          >
            <Languages size={13} />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Tombol Contact */}
          <button
            onClick={() => scrollToSection("brief")}
            className="px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white shadow-md hover:opacity-90 transform hover:scale-[1.02]"
          >
            {t[lang].nav.contact}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        id="hero"
        className={`w-full pt-36 sm:pt-44 md:pt-52 pb-24 sm:pb-32 px-6 sm:px-12 text-left bg-[#0B1120] transition-all duration-1000 transform ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <span className="inline-block text-[10px] tracking-widest font-medium text-slate-400 uppercase mb-4 px-2.5 py-1 rounded-md bg-[#131B2E] border border-slate-400/15">
              {t[lang].hero.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              {t[lang].hero.title1} <br />
              {t[lang].hero.title2}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]">
                {currentText}
              </span>
              <span className="text-[#3B82F6] animate-pulse">|</span>
            </h1>
            <p className="text-sm max-w-md leading-relaxed mb-8 text-slate-400 font-medium">
              {t[lang].hero.desc}
            </p>
            <button
              onClick={() => scrollToSection("showcase")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white px-6 py-3.5 rounded-lg text-xs font-bold tracking-wide transition-all shadow-lg transform hover:scale-[1.02]"
            >
              {t[lang].hero.btn}
            </button>
          </div>

          <div className="relative flex justify-center items-center w-full mt-8 md:mt-0">
            {/* Elemen Dekoratif Opacity Rendah / Muted Blue */}
            <div className="absolute inset-0 w-full h-full bg-[#38BDF8]/5 rounded-full filter blur-3xl -z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-32 border border-[#38BDF8]/10 rounded-full mix-blend-screen opacity-20 animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-[#818CF8]/10 rounded-lg rotate-12 opacity-20"></div>

            <img
              src="./tes.png"
              alt="Hero Illustration"
              className="w-full max-w-xs md:max-w-sm h-auto object-contain rounded-xl drop-shadow-[0_15px_30px_rgba(59,130,246,0.15)]"
            />
          </div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE — INFINITE MARQUEE SLIDER */}
      <section
        ref={showcaseRef}
        id="showcase"
        className={`w-full py-24 sm:py-32 border-t border-b border-slate-400/15 overflow-hidden bg-[#0F172A] transition-all duration-1000 transform ${showcaseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <span className="text-[10px] tracking-widest font-medium text-slate-400 uppercase block mb-2">
            {t[lang].showcase.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t[lang].showcase.title}
          </h2>
        </div>

        <div className="relative w-full overflow-hidden flex py-4">
          <div className="animate-marquee-portfolio gap-6 px-6 flex">
            {projects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="border border-slate-400/15 rounded-xl p-6 flex flex-col justify-between transition-all bg-[#131B2E] hover:border-slate-400/30 shadow-md relative overflow-hidden group text-white w-[300px] sm:w-[400px] shrink-0"
              >
                <div>
                  <div
                    className={`w-full rounded-lg bg-gradient-to-br ${project.color} flex flex-col justify-between text-white mb-6 shadow-inner relative overflow-hidden h-48 sm:h-60`}
                  >
                    {project.image_url && (
                      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-3 z-10 w-full p-4">
                      <h3 className="text-xs sm:text-sm font-bold tracking-tight leading-tight max-w-[65%]">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONI SECTION */}
      <section
        ref={testimoniRef}
        id="testimoni"
        className={`w-full py-24 sm:py-32 bg-[#0B1120] transition-all duration-1000 transform ${testimoniVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto rounded-xl bg-[#131B2E] border border-slate-400/15 shadow-xl mx-6 lg:mx-auto text-white overflow-hidden p-8 sm:p-12">
          <div className="mb-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t[lang].testimoni.title1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]">
                {t[lang].testimoni.title2}
              </span>
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-4 mb-10">
              {t[lang].testimoni.desc}
            </p>
          </div>

          <div className="w-full">
            <div className="w-full max-w-[320px] sm:max-w-[1416px] mx-auto overflow-hidden">
              <div
                className="flex gap-6 items-stretch transition-transform duration-500 ease-out py-4"
                style={{
                  transform:
                    typeof window !== "undefined" && window.innerWidth < 640
                      ? `translateX(calc(-${currentIdx} * (100% + 24px)))`
                      : `translateX(-${currentIdx * 464}px)`,
                }}
              >
                {testimonials.map((tItem) => (
                  <div
                    key={tItem.id}
                    className="w-full sm:w-[440px] shrink-0 border border-slate-400/15 rounded-xl p-6 text-left relative bg-[#1A2438] flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:border-slate-400/30 text-slate-300"
                  >
                    <div>
                      <div className="flex items-center gap-1 mb-4 text-[#38BDF8]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed italic mb-6">
                        "{tItem.content}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3 border-t border-slate-400/15 pt-4">
                      {tItem.avatar_url ? (
                        <img
                          src={tItem.avatar_url}
                          alt={tItem.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-400/15"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#131B2E] border border-slate-400/15 flex items-center justify-center text-[10px] font-bold text-white">
                          {tItem.name?.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-white leading-none mb-1">
                          {tItem.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {tItem.company || "Client"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            {testimonials.length > 1 && (
              <div className="flex justify-center items-center gap-3 mt-8">
                <button
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="p-2.5 rounded-lg border border-slate-400/15 bg-[#1A2438] hover:bg-[#131B2E] transition-all disabled:opacity-40 disabled:pointer-events-none text-white"
                >
                  <ArrowLeft size={14} />
                </button>
                <span className="text-[11px] font-bold text-slate-400 tracking-wider">
                  {currentIdx + 1} / {testimonials.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentIdx((prev) =>
                      Math.min(testimonials.length - 1, prev + 1),
                    )
                  }
                  disabled={currentIdx === testimonials.length - 1}
                  className="p-2.5 rounded-lg border border-slate-400/15 bg-[#1A2438] hover:bg-[#131B2E] transition-all disabled:opacity-40 disabled:pointer-events-none text-white"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BRIEF SECTION */}
      <section
        ref={briefRef}
        id="brief"
        className={`w-full py-24 sm:py-32 bg-[#0F172A] border-t border-b border-slate-400/15 transition-all duration-1000 transform ${briefVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[10px] tracking-widest font-medium text-slate-400 uppercase">
              {t[lang].brief.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t[lang].brief.title1} <br /> {t[lang].brief.title2}
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              {t[lang].brief.desc}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-[#38BDF8]">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping shrink-0"></span>
              {t[lang].brief.alert}
            </div>
          </div>

          {/* Form Brief Menyatu Tanpa Kotak Kasar Terpisah */}
          <div className="w-full max-w-md mx-auto border border-slate-400/15 rounded-xl p-6 sm:p-8 bg-[#131B2E] shadow-md transition-all">
            <span className="text-[10px] font-black text-[#38BDF8] uppercase block mb-5 tracking-widest">
              {t[lang].brief.formTitle}
            </span>
            <div className="space-y-5 text-xs font-semibold">
              <div>
                <label className="block mb-2 text-slate-400">
                  {t[lang].brief.labelDomain}
                </label>
                <input
                  type="text"
                  value={briefForm.domainName}
                  onChange={(e) =>
                    setBriefForm({ ...briefForm, domainName: e.target.value })
                  }
                  placeholder={t[lang].brief.placeholderDomain}
                  className="w-full border border-slate-400/15 rounded-lg p-3 outline-none bg-[#1A2438] text-white focus:border-[#3B82F6]/50 transition-all"
                />
              </div>
              <div>
                <label className="block mb-2 text-slate-400">
                  {t[lang].brief.labelReq}
                </label>
                <textarea
                  rows="4"
                  value={briefForm.systemRequirement}
                  onChange={(e) =>
                    setBriefForm({
                      ...briefForm,
                      systemRequirement: e.target.value,
                    })
                  }
                  placeholder={t[lang].brief.placeholderReq}
                  className="w-full border border-slate-400/15 rounded-lg p-3 outline-none bg-[#1A2438] text-white focus:border-[#3B82F6]/50 transition-all resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block mb-2 text-slate-400">
                  {t[lang].brief.labelBudget}
                </label>
                <select
                  value={briefForm.estimatedBudget}
                  onChange={(e) =>
                    setBriefForm({
                      ...briefForm,
                      estimatedBudget: e.target.value,
                    })
                  }
                  className="w-full border border-slate-400/15 rounded-lg p-3 outline-none bg-[#1A2438] text-white focus:border-[#3B82F6]/50 transition-all cursor-pointer"
                >
                  <option value="Landing Page - Rp 500.000+">
                    Landing Page - Rp 500.000+
                  </option>
                  <option value="Full Setup - Rp 1.200.000+">
                    Full Setup - Rp 1.200.000+
                  </option>
                  <option value="Custom Enterprise - Hubungi Langsung">
                    Custom Enterprise - Hubungi Langsung
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {/* Tombol Kirim ke WA yang diselaraskan menjadi Muted Dark Blue Line Style */}
                <button
                  onClick={handleSendWhatsApp}
                  className="inline-flex items-center justify-center gap-2 bg-[#1A2438] hover:bg-[#131B2E] text-[#38BDF8] border border-slate-400/15 font-bold py-3 px-4 rounded-lg transition-all shadow-sm"
                >
                  {t[lang].brief.btnWA}
                </button>
                <button
                  onClick={handleSendGmail}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md"
                >
                  {t[lang].brief.btnGmail}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        ref={faqRef}
        id="faq"
        className={`w-full py-24 sm:py-32 bg-[#0B1120] transition-all duration-1000 transform ${faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-widest font-medium text-slate-400 uppercase block mb-2">
              {t[lang].faq.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t[lang].faq.title}
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-400/15 rounded-xl transition-all duration-300 overflow-hidden bg-[#131B2E]"
                >
                  <button
                    onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left outline-none"
                  >
                    <span
                      className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${isOpen ? "text-[#38BDF8]" : "text-white"}`}
                    >
                      {faq.question}
                    </span>
                    <Plus
                      size={14}
                      className={`transform transition-transform text-slate-400 ${isOpen ? "rotate-45 text-[#38BDF8]" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-400/15 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#0F172A] text-slate-400 py-16 px-6 lg:px-24 border-t border-slate-400/15 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="./icon.png"
                alt="Logo"
                className="w-6 h-6 brightness-100"
              />
              <span className="font-black text-white tracking-wider uppercase text-sm">
                XAF7 STUDIO
              </span>
            </div>
            <p className="leading-relaxed text-slate-400">
              {t[lang].footer.desc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              {t[lang].footer.navTitle}
            </h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="hover:text-white transition-colors"
                >
                  {t[lang].footer.port}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("showcase")}
                  className="hover:text-white transition-colors"
                >
                  {t[lang].footer.srv}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("brief")}
                  className="hover:text-white transition-colors"
                >
                  {t[lang].footer.start}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              {t[lang].footer.contactTitle}
            </h4>
            <p className="mb-2 leading-relaxed">{t[lang].footer.loc}</p>
            <p className="font-semibold text-white">xafdevstudio@gmail.com</p>
            <p className="mt-1 text-slate-500">+62 831-2919-5737</p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Konsultasi Cepat
            </h4>
            <p className="mb-4 leading-relaxed text-slate-400">
              Punya konsep aplikasi atau butuh sistem kustom? Diskusikan
              langsung sekarang.
            </p>
            <a
              href="https://wa.me/6283129195737"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-slate-400/15 bg-[#131B2E] hover:bg-[#1A2438] text-slate-300 font-bold py-2.5 px-4 rounded-lg w-full transition-all shadow-sm"
            >
              💬 Chat via WhatsApp
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-400/15 flex flex-col md:flex-row justify-between items-center text-[11px] font-medium text-slate-500 gap-4">
          <p>{t[lang].footer.rights}</p>
          <div className="border-t border-slate-400/15 md:border-none pt-2 md:pt-0 font-bold tracking-wider uppercase text-slate-400">
            Powered by XAF7 Engine
          </div>
        </div>
      </footer>

      {/* CHATBOT ASSISTANT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isChatOpen ? (
          <div className="w-[300px] sm:w-[350px] bg-[#131B2E] border border-slate-400/15 rounded-xl shadow-2xl overflow-hidden flex flex-col text-xs text-slate-300">
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] p-4 text-white flex items-center justify-between font-bold">
              <div className="flex items-center gap-2">
                <Cat size={16} />
                <span>XAF7 Assistant</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:opacity-80"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 flex-1 max-h-[250px] overflow-y-auto space-y-4">
              {chatStep === "welcome" && (
                <div className="space-y-3">
                  <div className="bg-[#1A2438] p-3 rounded-lg border border-slate-400/15">
                    <p className="font-bold text-white mb-1">
                      {chatbotGreeting.welcome}
                    </p>
                    <p>{chatbotGreeting.subWelcome}</p>
                  </div>
                  <p className="font-bold text-slate-400 px-1">
                    {chatbotGreeting.question}
                  </p>
                  <div className="flex flex-col gap-2">
                    {chatbotConfig.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSelectedOption(opt);
                          setChatStep("response");
                        }}
                        className="text-left w-full p-2.5 rounded-lg border border-slate-400/15 bg-[#1A2438] hover:border-[#3B82F6] text-white transition-all font-medium"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatStep === "response" && (
                <div className="space-y-4">
                  <div className="bg-[#1A2438] p-3 rounded-lg border border-slate-400/15 self-start">
                    {selectedOption?.responseMessage}
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setChatStep("welcome")}
                      className="border border-slate-400/15 hover:bg-[#1A2438] px-3 py-1.5 rounded-lg text-[11px] font-bold"
                    >
                      {t[lang].chatbot.btnBack}
                    </button>
                    <button
                      onClick={() => {
                        if (selectedOption?.targetSection)
                          scrollToSection(selectedOption.targetSection);
                        setIsChatOpen(false);
                      }}
                      className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white px-4 py-1.5 rounded-lg text-[11px] font-bold shadow-md"
                    >
                      {t[lang].chatbot.btnGo}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-end gap-2 group">
            <div className="bg-[#131B2E] text-slate-200 border border-slate-400/15 px-4 py-2 rounded-xl shadow-xl text-xs font-semibold tracking-tight relative">
              {t[lang].chatbot.bubble}
              <div className="absolute right-4 -bottom-1 w-2.5 h-2.5 bg-[#131B2E] border-r border-b border-slate-400/15 rotate-45"></div>
            </div>
            <button
              onClick={() => {
                setIsChatOpen(true);
                setChatStep("welcome");
              }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-[1.05] relative overflow-hidden"
            >
              <Cat
                size={22}
                className="transform group-hover:rotate-12 transition-transform"
              />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B1120]"></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
