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
  Download,
  ExternalLink,
  Layers,
  Award,
  Briefcase,
  Users,
  Eye,
  GraduationCap,
} from "lucide-react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { supabase } from "./supabaseClient";

export default function App() {
  const [lang, setLang] = useState("id");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const [activeProjectDetail, setActiveProjectDetail] = useState(null);
  const [activeCertDetail, setActiveCertDetail] = useState(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState("welcome");
  const [customProjectText, setCustomProjectText] = useState("");

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Hari Kartini 2025",
      category: "Organisasi",
      desc_id:
        "Menjadi Master of Ceremony (MC) dan memandu jalannya acara peringatan Hari Kartini 2025.",
      desc_en:
        "Served as Master of Ceremony (MC) and guided the flow of the 2025 Kartini Day celebration event.",
      long_desc_id:
        "Berperan sebagai MC pada acara Hari Kartini 2025 dengan tanggung jawab memandu seluruh rangkaian kegiatan dari pembukaan hingga penutupan. Berkolaborasi dengan panitia untuk menjaga alur acara tetap terstruktur, membangun suasana yang aktif, serta memastikan peserta dapat mengikuti kegiatan dengan nyaman. Pengalaman ini mengembangkan kemampuan public speaking, komunikasi, koordinasi tim, dan kepemimpinan.",
      long_desc_en:
        "Served as the Master of Ceremony during the 2025 Kartini Day celebration, responsible for guiding the entire event from opening to closing. Collaborated with the organizing committee to maintain event flow, create an engaging atmosphere, and ensure participants enjoyed the experience. This role strengthened public speaking, communication, teamwork, and leadership skills.",
      tech: "Public Speaking + Event Coordination + Communication",
      image_url: "/Organisasi/Hari Kartini 2025.JPG",
    },
    {
      id: 2,
      title: "Praktik Kerja Lapangan (PKL)",
      category: "Magang",
      desc_id:
        "Melaksanakan praktik kerja lapangan dan terlibat dalam proses kerja profesional di lingkungan industri.",
      desc_en:
        "Completed an internship program and gained experience working in a professional industry environment.",
      long_desc_id:
        "Mengikuti kegiatan Praktik Kerja Lapangan (PKL) sebagai bagian dari pengembangan keterampilan dan pengalaman kerja. Selama kegiatan, terlibat dalam proses operasional, observasi alur kerja, komunikasi profesional, serta adaptasi terhadap lingkungan kerja nyata. Pengalaman ini membantu meningkatkan kedisiplinan, kerja sama tim, tanggung jawab, dan kemampuan menyelesaikan tugas secara terstruktur.",
      long_desc_en:
        "Participated in an internship program to develop practical skills and gain real-world work experience. Contributed to operational activities, observed professional workflows, collaborated with teams, and adapted to workplace standards. This experience strengthened discipline, teamwork, responsibility, and structured problem-solving abilities.",
      tech: "Teamwork + Communication + Adaptability + Problem Solving",
      image_url: "/Organisasi/magang.jpg",
    },
    {
      id: 3,
      title: "Pelatih Pencak Silat",
      category: "Organisasi",
      desc_id:
        "Menjadi pelatih pencak silat dan bertanggung jawab dalam membimbing serta mengembangkan kemampuan siswa.",
      desc_en:
        "Served as a pencak silat coach responsible for mentoring and developing students' skills.",
      long_desc_id:
        "Berperan sebagai pelatih dalam kegiatan pencak silat dengan tanggung jawab membimbing siswa selama proses latihan, menjaga kedisiplinan, serta membantu perkembangan teknik dan karakter peserta. Turut mengatur jalannya latihan, membangun komunikasi yang baik, dan memastikan setiap siswa dapat berkembang melalui pendekatan yang terarah dan kerja sama tim.",
      long_desc_en:
        "Served as a coach in pencak silat activities, responsible for mentoring students during training sessions, maintaining discipline, and supporting their technical and personal development. Contributed to organizing training activities, building effective communication, and helping students grow through structured guidance and teamwork.",
      tech: "Leadership + Mentoring + Communication + Team Management",
      image_url: "/Organisasi/iks.png",
    },
    {
      id: 4,
      title: " Hari Guru",
      category: "Organisasi",
      desc_id:
        "Bertugas sebagai tim keamanan untuk membantu menjaga ketertiban dan kelancaran kegiatan Hari Guru.",
      desc_en:
        "Served as part of the security team to maintain order and support the smooth execution of Teachers' Day events.",
      long_desc_id:
        "Berperan sebagai bagian dari tim keamanan pada kegiatan peringatan Hari Guru dengan tanggung jawab membantu menjaga ketertiban peserta, mengatur alur kegiatan, serta mendukung koordinasi selama acara berlangsung. Pengalaman ini melatih kemampuan komunikasi, kerja sama tim, pengambilan keputusan, dan tanggung jawab dalam situasi yang dinamis.",
      long_desc_en:
        "Served as a member of the event security team during the Teachers' Day celebration, responsible for maintaining order, supporting event flow, and assisting coordination throughout the event. This experience strengthened communication, teamwork, decision-making, and responsibility in dynamic situations.",
      tech: "Coordination + Responsibility + Teamwork + Communication",
      image_url: "/Organisasi/Hari Guru.jpg",
    },
    {
      id: 5,
      title: "PC Cleaning & Maintenance",
      category: "Magang",
      desc_id:
        "Melakukan pembersihan dan perawatan perangkat komputer untuk menjaga performa dan kestabilan sistem.",
      desc_en:
        "Performed computer cleaning and maintenance to maintain system performance and stability.",
      long_desc_id:
        "Melakukan proses pembersihan perangkat komputer secara berkala, mulai dari membersihkan debu pada komponen, pengecekan kondisi perangkat, hingga memastikan komputer dapat berjalan dengan baik. Kegiatan ini membantu meningkatkan pemahaman mengenai perangkat keras, ketelitian, serta pentingnya perawatan perangkat untuk menjaga performa dan umur penggunaan.",
      long_desc_en:
        "Performed routine computer cleaning and maintenance, including dust removal, hardware inspection, and ensuring optimal system performance. This experience improved hardware understanding, attention to detail, and awareness of preventive maintenance practices.",
      tech: "Hardware Maintenance + Troubleshooting + Attention to Detail",
      image_url: "/Organisasi/Cleaningpc.jpg",
    },
    {
      id: 6,
      title: "MPLS",
      category: "Organisasi",
      desc_id:
        "Bertanggung jawab menyiapkan dan memastikan seluruh kebutuhan peralatan selama kegiatan MPLS berjalan dengan baik.",
      desc_en:
        "Responsible for preparing and ensuring all equipment requirements during the Student Orientation Program (MPLS).",
      long_desc_id:
        "Berperan sebagai panitia bagian peralatan pada kegiatan Masa Pengenalan Lingkungan Sekolah (MPLS). Bertanggung jawab dalam menyiapkan, mengatur, dan memastikan seluruh perlengkapan kegiatan tersedia serta dapat digunakan sesuai kebutuhan acara. Berkoordinasi dengan panitia lain untuk mendukung kelancaran jalannya kegiatan dan menjaga kesiapan operasional selama acara berlangsung.",
      long_desc_en:
        "Served as an equipment committee member during the Student Orientation Program (MPLS). Responsible for preparing, organizing, and ensuring all event equipment was available and ready to support activities. Collaborated with other committee members to maintain smooth event operations and logistical readiness.",
      tech: "Logistics + Coordination + Responsibility + Teamwork",
      image_url: "/Organisasi/mpls.jpg",
    },
    {
      id: 7,
      title: "Remaja Masjid ",
      category: "Organisasi",
      desc_id:
        "Berpartisipasi dalam kegiatan pengolahan dan pendistribusian daging kurban bersama remaja masjid.",
      desc_en:
        "Participated in the preparation and distribution of qurban meat with the mosque youth community.",
      long_desc_id:
        "Berpartisipasi dalam kegiatan remaja masjid pada pelaksanaan pembagian daging kurban. Bertanggung jawab membantu proses persiapan, pengemasan, serta pendistribusian kepada masyarakat agar kegiatan berjalan tertib dan tepat sasaran. Pengalaman ini mengembangkan rasa tanggung jawab, kerja sama, kepedulian sosial, dan kemampuan berkoordinasi dalam kegiatan bersama.",
      long_desc_en:
        "Participated in mosque youth activities during the qurban meat distribution program. Assisted in preparation, packaging, and distribution to the community to ensure the activity ran smoothly and efficiently. This experience strengthened responsibility, teamwork, social awareness, and coordination skills.",
      tech: "Teamwork + Social Responsibility + Coordination + Community Service",
      image_url: "/Organisasi/Remaja.jpeg",
    },
    {
      id: 8,
      title: " Pesantren Kilat",
      category: "Organisasi",
      desc_id:
        "Berpartisipasi sebagai panitia acara selama kegiatan Pesantren Kilat yang berlangsung selama 5 hari di bulan puasa.",
      desc_en:
        "Participated as an event committee member during a 5-day Islamic boarding program held in Ramadan.",
      long_desc_id:
        "Berperan sebagai panitia bagian acara dalam kegiatan Pesantren Kilat yang dilaksanakan selama 5 hari di bulan puasa. Bertanggung jawab membantu menyusun alur kegiatan, memastikan setiap sesi berjalan sesuai jadwal, serta berkoordinasi dengan panitia lain untuk mendukung kelancaran acara. Selama kegiatan berlangsung, turut membantu menciptakan suasana yang tertib, nyaman, dan kondusif bagi seluruh peserta. Pengalaman ini mengembangkan kemampuan koordinasi, komunikasi, manajemen waktu, dan kerja sama tim.",
      long_desc_en:
        "Served as an event committee member during a 5-day Islamic boarding program held in Ramadan. Responsible for supporting activity planning, ensuring each session ran according to schedule, and coordinating with other committee members to maintain smooth operations. This experience strengthened coordination, communication, time management, and teamwork skills.",
      tech: "Event Management + Coordination + Communication + Teamwork",
      image_url: "/Organisasi/Pesan.jpg",
    },
    {
      id: 9,
      title: "Kesenian — Dasaswara Nusa",
      category: "Organisasi",
      desc_id:
        "Bertanggung jawab menyiapkan kebutuhan peralatan kesenian dan mendukung pelaksanaan pertunjukan seluruh kelas.",
      desc_en:
        "Responsible for preparing performance equipment and supporting the execution of artistic performances for all classes.",
      long_desc_id:
        "Berperan sebagai panitia bagian peralatan dan kesenian pada kegiatan Dasaswara Nusa. Bertanggung jawab dalam menyiapkan perlengkapan yang dibutuhkan selama pertunjukan, membantu koordinasi teknis, serta mendukung jalannya penampilan dari seluruh kelas agar berlangsung dengan tertib dan sesuai alur acara. Pengalaman ini mengembangkan kemampuan koordinasi, manajemen waktu, kerja sama tim, serta kesiapan dalam menangani kebutuhan operasional acara.",
      long_desc_en:
        "Served as part of the equipment and arts committee during the Dasaswara Nusa event. Responsible for preparing performance equipment, assisting technical coordination, and supporting performances from all classes to ensure smooth event execution. This experience strengthened coordination, time management, teamwork, and operational readiness skills.",
      tech: "Event Operations + Coordination + Teamwork + Time Management",
      image_url: "/Organisasi/Dasa.jpeg",
    },
    {
      id: 10,
      title: "Latihan Dasar Kepemimpinan Organisasi (LDKO)",
      category: "Organisasi",
      desc_id:
        "Berperan sebagai panitia acara dalam mendukung penyusunan dan pelaksanaan kegiatan Latihan Dasar Kepemimpinan Organisasi (LDKO).",
      desc_en:
        "Served as an event committee member supporting the planning and execution of the Basic Leadership Training Program (LDKO).",
      long_desc_id:
        "Berpartisipasi sebagai panitia bagian acara pada kegiatan Latihan Dasar Kepemimpinan Organisasi (LDKO). Bertanggung jawab membantu menyusun alur kegiatan, memastikan setiap sesi berjalan sesuai jadwal, serta berkoordinasi dengan panitia lain untuk menjaga kelancaran kegiatan. Pengalaman ini mengembangkan kemampuan kepemimpinan, komunikasi, koordinasi, serta manajemen waktu dalam lingkungan organisasi.",
      long_desc_en:
        "Served as an event committee member during the Basic Leadership Training Program (LDKO). Responsible for supporting activity planning, maintaining event flow, and coordinating with other committee members to ensure smooth execution. This experience strengthened leadership, communication, coordination, and time management skills.",
      tech: "Leadership + Event Planning + Coordination + Communication",
      image_url: "/Organisasi/LDKO.jpeg",
    },
  ]);

  const [education, setEducation] = useState([
    {
      id: 1,
      school: "SMK Atlantis Plus",
      major_id: "Teknik Komputer dan Jaringan (TKJ) / IT",
      major_en: "Computer and Network Engineering / IT",
      period: "2023 - 2026",
      status_id: "Siswa Tingkat Akhir / Lulus 2026",
      status_en: "Final Year Student / Graduating 2026",
    },
  ]);

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      type: "kerja",
      role: "IT Support Intern",
      company: "Rumah Hospital (Magang PKL)",
      period: "Hubungan Industri - 2026",
      desc_id:
        "Bertanggung jawab melakukan troubleshooting hardware, pemeliharaan komputer, perbaikan berkala, serta memastikan infrastruktur IT rumah sakit berjalan optimal tanpa gangguan.",
      desc_en:
        "Responsible for hardware troubleshooting, computer maintenance, periodic repairs, and ensuring the hospital's IT infrastructure runs optimally without interruption.",
    },
    {
      id: 2,
      type: "organisasi",
      role: "Koordinator Divisi Agama",
      company: "OSIS ",
      period: "2024 - 2026",
      desc_id:
        "Memimpin divisi strategis, mengelola tim beranggotakan 3 orang, mendelegasikan peran penting termasuk menunjuk 'Chairperson' untuk menyukseskan berbagai event besar sekolah.",
      desc_en:
        "Leading a strategic division, managing a team of 3 members, and delegating key roles including appointing the 'Chairperson' to successfully execute major school events.",
    },
    {
      id: 3,
      type: "organisasi",
      role: "Anggota Kader",
      company: "Remaja Masjid",
      period: "2025 - 2026",
      desc_id:
        "Berpartisipasi aktif dalam kegiatan remaja masjid, membantu mengajak anggota baru untuk bergabung, serta mendukung kegiatan kebersamaan dan olahraga bersama guna mempererat hubungan antaranggota.",
      desc_en:
        "Actively participated in mosque youth activities by encouraging new members to join and supporting community and sports activities to strengthen member relationships.",
    },
    {
      id: 4,
      type: "organisasi",
      role: "Anggota",
      company: "Karang Taruna",
      period: "2023 - 2028",
      desc_id:
        "Berpartisipasi dalam kegiatan organisasi kepemudaan, membantu pelaksanaan kegiatan sosial, serta membangun kerja sama dan hubungan yang baik di lingkungan masyarakat.",
      desc_en:
        "Participated in youth organization activities, supported social initiatives, and contributed to building collaboration within the community.",
    },
  ]);

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: "Instalasi Perangkat Jaringan Berbasis LAN dan WAN",
      title_en: "Installation of LAN and WAN-Based Network Devices",
      issuer: "Sertifikat Kompetensi",
      issuer_en: "Certificate of Competence",
      date: "22 Juni 2024",
      date_en: "June 22, 2024",
      status: "Completed",
      image_url:
        "/sertiv/Instalasi Perangkat Jaringan Berbasis LAN dan WAN_page-0001.jpg",
    },
    {
      id: 2,
      title: "Kordinator Divisi Agama Bhakti 2024-2025",
      title_en: "Coordinator of the Religious Division Service Year 2024-2025",
      issuer: "OSIS",
      issuer_en: "Student Council (OSIS)",
      date: "Graduating 2024-2025",
      date_en: "Graduating 2024-2025",
      status: "Active Student",
      image_url:
        "sertiv/Kordinator Divisi Agama Bhakti 2024-2025_page-0001.jpg",
    },
    {
      id: 3,
      title: "Atlantis Course — Teknik Jaringan Komputer & Telekomunikasi",
      title_en:
        "Atlantis Course — Computer Network & Telecommunications Engineering",
      issuer: "SMK Atlantis Plus",
      issuer_en: "Atlantis Plus Vocational High School",
      date: "17 Juni 2023",
      date_en: "June 17, 2023",
      status: "Completed",
      image_url: "/sertiv/latihan teknik.png",
    },
    {
      id: 4,
      title: "Pelatihan Wawasan Kebangsaan Angkatan 2",
      title_en: "National Insight Training Batch 2",
      issuer: "Dinas Pemuda dan Olahraga Provinsi Jawa Barat",
      issuer_en: "Youth and Sports Department of West Java Province",
      date: "17 September 2025",
      date_en: "September 17, 2025",
      status: "Completed",
      image_url: "/sertiv/wawasa.png",
    },
    {
      id: 5,
      title: "Wisuda Tahfidz Qur'an — Juz 30",
      title_en: "Tahfidz Qur'an Graduation — Juz 30",
      issuer: "SMP Atlantis Plus",
      issuer_en: "Atlantis Plus Junior High School",
      date: "23 Mei 2023",
      date_en: "May 23, 2023",
      status: "Completed",
      image_url: "/sertiv/Juz 30.png",
    },
    {
      id: 6,
      title: "Latihan Dasar Kepemimpinan Siswa (LDKS)",
      title_en: "Basic Student Leadership Training (LDKS)",
      issuer: "SMK Atlantis Plus",
      issuer_en: "Atlantis Plus Vocational High School",
      date: "28 Agustus 2023",
      date_en: "August 28, 2023",
      status: "Completed",
      image_url: "/sertiv/ldks.png",
    },
    {
      id: 7,
      title: "Koordinator Divisi Keagamaan Masa Bhakti 2024/2025",
      title_en:
        "Coordinator of the Religious Division Service Period 2024/2025",
      issuer: "OSIS",
      issuer_en: "Student Council (OSIS)",
      date: "Graduating 2024-2025",
      date_en: "Graduating 2024-2025",
      status: "Completed",
      image_url: "/sertiv/2425.png",
    },
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Agos Prasetio",
      role: "Fresh Graduate ",
      comment:
        "Saya adalah pribadi yang disiplin, menyukai kerapian, dan mampu bekerja sama dalam tim. Saya percaya setiap proses adalah kesempatan untuk terus belajar, berkembang, dan menjadi lebih baik dari sebelumnya.",
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendWA = () => {
    const message = `Halo Agos Prasetio, saya tertarik untuk mendiskusikan penawaran kerja sama atau proyek baru.`;
    window.open(
      `https://wa.me/6283129195737?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleSendGmail = () => {
    const subject = "Tawaran Kerja / Diskusi Proyek - Portofolio";
    const body = `Halo Agos Prasetio,\n\nSaya tertarik dengan profil Anda dan ingin membahas peluang kerja sama lebih lanjut.`;
    window.open(
      `mailto:agosprasetio17@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank",
    );
  };

  const categories = ["Semua", "Magang", "Organisasi"];
  const filteredProjects =
    selectedCategory === "Semua"
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  const marqueeProjects = [
    ...filteredProjects,
    ...filteredProjects,
    ...filteredProjects,
  ];

  const t = {
    id: {
      nav: {
        home: "Home",
        advertisers: "Portofolio",
        publishers: "Pengalaman",
        gallery: "Sertifikasi",
        caseStudies: "Dashboard",
        contact: "Hubungi Saya",
      },
      hero: {
        badge: "Siap Untuk Freelance / Kerja",
        title: "Lulusan Baru",
        titleAccent: "AGOS PRASETIO",
        sub: "SISWA SMK",
        desc: "Perjalanan saya dimulai dari belajar, mencoba, dan terus berkembang. Portofolio ini berisi sebagian pengalaman dan hal yang telah saya kerjakan selama proses tersebut.",
        btnCv: "Unduh CV",
        btnProject: "Hubungi Saya",
      },
      chatbot: {
        bubble: "Ada yang bisa dibantu?",
        welcome:
          "Halo! Saya bot asisten AGOS PRASETIO. Ada yang bisa saya bantu hari ini?",
        opt1: "Tanya Pembuatan Projek / Web",
        opt2: "Minta Kontak WhatsApp / Email",
        projectAsk:
          "Tuliskan deskripsi singkat projek atau website impian yang ingin Anda buat di bawah ini:",
        projectPlace: "Contoh: Mau buat web e-commerce baju distro...",
        btnSend: "Kirim via WhatsApp",
        contactTitle: "Hubungi Agos Prasetio:",
        back: "Kembali",
      },
    },
    en: {
      nav: {
        home: "Home",
        advertisers: "Portfolio",
        publishers: "Experience",
        gallery: "Certifications",
        caseStudies: "Dashboard",
        contact: "Contact Me",
      },
      hero: {
        badge: "Open To Work",
        title: "Fresh Graduate",
        titleAccent: "AGOS PRASETIO",
        sub: "VOCATIONAL HIGH SCHOOL STUDENT",
        desc: "My journey began with learning, exploring, and continuously growing. This portfolio highlights experiences and work that reflect my development throughout the process.",
        btnCv: "Download CV",
        btnProject: "Contact Me",
      },
      chatbot: {
        bubble: "How can I help you?",
        welcome:
          "Hello! I am AGOS PRASETIO's bot assistant. How can I help you today?",
        opt1: "Inquire Web / Project Design",
        opt2: "Get WhatsApp / Email Contact",
        projectAsk:
          "Write down a short description of your dream project or website below:",
        projectPlace: "Example: I want a clothing store web application...",
        btnSend: "Send to WhatsApp",
        contactTitle: "Contact Agos Prasetio:",
        back: "Back",
      },
    },
  };

  if (isAdminMode && !isLoggedIn) {
    return (
      <AdminLogin
        isDarkMode={isDarkMode}
        onLoginSuccess={() => setIsLoggedIn(true)}
        onBack={() => setIsAdminMode(false)}
      />
    );
  }

  if (isAdminMode && isLoggedIn) {
    return (
      <AdminDashboard
        projects={projects}
        setProjects={setProjects}
        experiences={experiences}
        setExperiences={setExperiences}
        certificates={certificates}
        setCertificates={setCertificates}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onLogout={() => {
          setIsLoggedIn(false);
          setIsAdminMode(false);
        }}
      />
    );
  }

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-950 text-slate-200"
          : "bg-sky-50/40 text-slate-800"
      }`}
    >
      <style>{`
        @keyframes smoothMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-smooth-scroll {
          display: flex;
          width: max-content;
          animation: smoothMarquee 25s linear infinite;
        }
      `}</style>

      {/* FIXED NAVBAR */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "pt-4 px-4 sm:px-8" : "pt-0 px-0"
        }`}
      >
        <nav
          className={`mx-auto flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? `max-w-7xl rounded-full px-6 py-3 shadow-md ${
                  isDarkMode
                    ? "bg-slate-900/90 border border-slate-800 backdrop-blur-md"
                    : "bg-white/90 border border-sky-100 backdrop-blur-md"
                }`
              : `w-full rounded-none px-6 sm:px-12 py-5 border-b ${
                  isDarkMode
                    ? "bg-slate-950 border-slate-900"
                    : "bg-white border-sky-100"
                }`
          }`}
        >
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <Cat size={18} className="text-blue-600" />
            <span
              className={`font-normal text-xs tracking-wider uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              AGOS PRASETIO
            </span>
          </div>

          {/* Navigasi Tengah */}
          <div
            className={`hidden lg:flex items-center gap-6 text-xs font-normal ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            <a href="#home" className="hover:text-blue-600 transition-colors">
              {t[lang].nav.home}
            </a>
            <a
              href="#portfolio"
              className="hover:text-blue-600 transition-colors"
            >
              {t[lang].nav.advertisers}
            </a>
            <a
              href="#experience"
              className="hover:text-blue-600 transition-colors"
            >
              {t[lang].nav.publishers}
            </a>
            <a
              href="#certificates"
              className="hover:text-blue-600 transition-colors"
            >
              {t[lang].nav.gallery}
            </a>
            <button
              onClick={() => setIsAdminMode(true)}
              className="hover:text-blue-600 transition-colors"
            >
              {t[lang].nav.caseStudies}
            </button>
          </div>

          {/* Menu Kanan */}
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] uppercase font-mono tracking-wider transition-colors ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
                  : "border-sky-200 bg-sky-100/60 text-slate-700 hover:bg-sky-200"
              }`}
            >
              <Languages size={11} /> {lang}
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-slate-900 text-yellow-400 hover:bg-slate-800"
                  : "bg-sky-100 text-slate-700 hover:bg-sky-200"
              }`}
            >
              {isDarkMode ? <Sun size={13} /> : <Moon size={13} />}
            </button>

            <a
              href="#hubungi-saya"
              className="px-4 py-2 rounded-full font-normal shadow-sm text-xs bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
            >
              {t[lang].nav.contact}
            </a>
          </div>
        </nav>
      </div>

      {/* HERO SECTION */}
      <header
        id="home"
        className="pt-32 sm:pt-40 pb-12 px-6 lg:px-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch overflow-hidden"
      >
        <div className="text-left flex flex-col items-start justify-center gap-4 pb-8">
          <span className="px-2.5 py-0.5 text-[10px] font-normal rounded-full bg-blue-600/10 text-blue-600 border border-blue-600/20">
            {t[lang].hero.badge}
          </span>
          <h1
            className={`text-4xl sm:text-5xl font-normal tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            {t[lang].hero.title}{" "}
            <span className="text-blue-600">{t[lang].hero.titleAccent}</span>
          </h1>
          <p className="text-blue-600 font-normal text-xs tracking-wider uppercase">
            {t[lang].hero.sub}
          </p>
          <p
            className={`text-xs leading-relaxed max-w-md ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            {t[lang].hero.desc}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-2 w-full sm:w-auto">
            <a
              href="/cv/ATS_AGOSPRASETIO.doc"
              download
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-normal flex items-center gap-2 shadow-md shadow-blue-600/10 transition-all"
            >
              <Download size={13} /> {t[lang].hero.btnCv}
            </a>
            <a
              href="#hubungi-saya"
              className={`px-4 py-2.5 rounded-lg text-xs font-normal border transition-all ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900 text-white hover:bg-slate-800"
                  : "border-sky-200 bg-white text-slate-800 hover:bg-sky-50"
              }`}
            >
              {t[lang].hero.btnProject}
            </a>
          </div>
        </div>

        {/* Sisi Kanan: Foto */}
        <div className="relative flex items-end justify-center md:justify-end h-64 md:h-auto min-h-[300px] md:min-h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none z-0" />
          <img
            src="/gw.png"
            alt="Agos Prasetio"
            className="w-full h-full max-h-[450px] md:max-h-none object-cover object-top rounded-2xl relative z-10 grayscale-[10%]"
          />
        </div>
      </header>

      {/* HUBUNGI AKU SECTION */}
      <section
        id="hubungi-saya"
        className={`py-16 border-y ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-[#0055DA] border-sky-200"}`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#FFC81E] font-normal text-[11px] tracking-wider uppercase block mb-2">
            Hubungi Saya
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-normal tracking-tight mb-4 ${isDarkMode ? "text-white" : "text-white "}`}
          >
            Terima kasih telah meluangkan waktu untuk melihat portofolio ini.
          </h2>
          <p
            className={`text-xs sm:text-sm max-w-xl mx-auto mb-10 leading-relaxed ${isDarkMode ? "text-slate-300" : "text-white"}`}
          >
            Apabila terdapat kesempatan, pertanyaan, atau hal yang ingin
            didiskusikan lebih lanjut mengenai pengalaman dan kemampuan saya,
            silakan hubungi melalui saluran di bawah.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button
              onClick={handleSendWA}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isDarkMode
                  ? "bg-slate-950 border-slate-800 hover:border-blue-600"
                  : "bg-white border-sky-100 hover:border-blue-500 hover:shadow-blue-100"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-8">
                <div className="p-3 rounded-xl bg-blue-600/10 text-blue-600">
                  <MessageCircle size={24} />
                </div>
                <span className="text-[11px] font-normal text-slate-500 group-hover:text-blue-600 transition-colors font-mono">
                  Hubungi →
                </span>
              </div>
              <div>
                <h3
                  className={`text-sm font-normal mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  Hubungi via WhatsApp
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Untuk komunikasi yang lebih cepat dan fleksibel.
                </p>
              </div>
            </button>

            <button
              onClick={handleSendGmail}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isDarkMode
                  ? "bg-slate-950 border-slate-800 hover:border-blue-600"
                  : "bg-white border-sky-100 hover:border-blue-500 hover:shadow-blue-100"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-8">
                <div className="p-3 rounded-xl bg-blue-600/10 text-blue-600">
                  <Mail size={24} />
                </div>
                <span className="text-[11px] font-normal text-slate-500 group-hover:text-blue-600 transition-colors font-mono">
                  Kirim Pesan →
                </span>
              </div>
              <div>
                <h3
                  className={`text-sm font-normal mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  Kirim via Email
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Untuk komunikasi profesional dan informasi yang lebih detail.
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE */}
      <section
        id="portfolio"
        className={`py-14 border-b transition-all ${isDarkMode ? "bg-slate-950 border-slate-900" : "bg-sky-50/20 border-sky-100"}`}
      >
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <h2
            className={`text-lg font-normal tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Pengalaman Perkerjaan & Organisasi
          </h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-normal transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : isDarkMode
                      ? "bg-slate-900 text-slate-400 hover:text-white"
                      : "bg-sky-100 text-slate-700 hover:bg-sky-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full relative overflow-hidden py-2 select-none">
          <div className="animate-smooth-scroll hover:[animation-play-state:paused] flex w-max gap-5 px-4">
            {marqueeProjects.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                onClick={() => setActiveProjectDetail(project)}
                className={`w-[260px] sm:w-[300px] shrink-0 rounded-xl border flex flex-col shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800 hover:border-blue-600"
                    : "bg-white border-sky-100/80 hover:border-blue-500 hover:shadow-md"
                }`}
              >
                <div className="w-full h-36 bg-slate-800 relative overflow-hidden rounded-t-xl">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-blue-600 text-white font-normal text-[8px] rounded uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between whitespace-normal">
                  <div>
                    <h3
                      className={`text-xs sm:text-sm font-normal tracking-tight line-clamp-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {lang === "id" ? project.desc_id : project.desc_en}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono border-t border-slate-500/10 pt-2.5 mt-4 text-slate-400">
                    <span className="text-blue-600 font-normal tracking-wider hover:underline">
                      Detail →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PENDIDIKAN & PENGALAMAN */}
      <section
        id="experience"
        className={`py-12 border-b ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-sky-100/50 border-sky-200"}`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className={`text-lg font-normal tracking-tight flex items-center gap-2 mb-8 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            <Briefcase className="text-blue-600" size={18} /> Riwayat &
            Kredensial
          </h2>

          <div className="mb-10">
            <h3 className="text-xs font-normal text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-blue-500/10 pb-2">
              <GraduationCap size={15} /> Riwayat Pendidikan Formal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className={`p-5 rounded-xl border flex gap-4 items-start shadow-sm ${
                    isDarkMode
                      ? "bg-slate-950 border-slate-800"
                      : "bg-white border-sky-100/70"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600 shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block mb-0.5">
                      {edu.period}
                    </span>
                    <h4
                      className={`text-xs sm:text-sm font-normal tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
                    >
                      {edu.school}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Jurusan: {lang === "id" ? edu.major_id : edu.major_en}
                    </p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-normal bg-blue-600/10 text-blue-600 border border-blue-600/20">
                      {lang === "id" ? edu.status_id : edu.status_en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xs font-normal text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-500/10 pb-2">
                <Briefcase size={13} /> Pengalaman Kerja / Magang
              </h3>
              <div className="flex flex-col gap-4">
                {experiences
                  .filter((e) => e.type === "kerja")
                  .map((exp) => (
                    <div
                      key={exp.id}
                      className={`p-5 rounded-xl border shadow-sm ${
                        isDarkMode
                          ? "bg-slate-950 border-slate-800"
                          : "bg-white border-sky-100/70"
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 font-mono block mb-1">
                        {exp.period}
                      </span>
                      <h4
                        className={`text-xs sm:text-sm font-normal tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {exp.role}
                      </h4>
                      <p className="text-xs text-blue-600 font-normal mt-0.5">
                        {exp.company}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {lang === "id" ? exp.desc_id : exp.desc_en}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-normal text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-500/10 pb-2">
                <Users size={13} /> Aktivitas Organisasi
              </h3>
              <div className="flex flex-col gap-4">
                {experiences
                  .filter((e) => e.type === "organisasi")
                  .map((exp) => (
                    <div
                      key={exp.id}
                      className={`p-5 rounded-xl border shadow-sm ${
                        isDarkMode
                          ? "bg-slate-950 border-slate-800"
                          : "bg-white border-sky-100/70"
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 font-mono block mb-1">
                        {exp.period}
                      </span>
                      <h4
                        className={`text-xs sm:text-sm font-normal tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {exp.role}
                      </h4>
                      <p className="text-xs text-blue-600 font-normal mt-0.5">
                        {exp.company}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {lang === "id" ? exp.desc_id : exp.desc_en}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERTIFIKASI */}
      <section
        id="certificates"
        className={`py-12 border-b transition-all ${isDarkMode ? "bg-slate-950 border-slate-900" : "bg-white border-sky-100"}`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className={`text-lg font-normal tracking-tight flex items-center gap-2 mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            <Award className="text-blue-600" size={18} /> Sertifikasi &
            Kredensial Akademik
          </h2>
          <p className="text-[11px] text-slate-400 mb-6">
            Klik kartu sertifikat untuk melihat foto bukti fisik dokumen.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setActiveCertDetail(cert)}
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer group transition-all shadow-sm hover:border-blue-600 ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-sky-100"
                }`}
              >
                <div className="p-2 rounded-lg bg-blue-600/5 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <Eye size={14} />
                </div>
                <div>
                  <h3
                    className={`text-xs font-normal tracking-tight group-hover:text-blue-600 transition-colors ${isDarkMode ? "text-white" : "text-slate-900"}`}
                  >
                    {lang === "id" ? cert.title : cert.title_en || cert.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {lang === "id"
                      ? cert.issuer
                      : cert.issuer_en || cert.issuer}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[9px] font-mono">
                    <span className="text-slate-400">
                      {lang === "id" ? cert.date : cert.date_en || cert.date}
                    </span>
                    <span className="text-blue-600 font-normal">
                      ({cert.status})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ULASAN REKOMENDASI */}
      <section
        className={`py-16 ${isDarkMode ? "bg-slate-900 border-t border-slate-800" : "bg-sky-100/60 border-t border-sky-200"}`}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2
            className={`text-2xl font-normal tracking-tight mb-8 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            A Little About Me
          </h2>
          <div className="max-w-3xl mx-auto">
            {testimonials.map((tst) => (
              <div
                key={tst.id}
                className={`p-8 sm:p-12 rounded-2xl border shadow-lg text-center transition-all ${
                  isDarkMode
                    ? "bg-slate-950 border-slate-800"
                    : "bg-white border-sky-100"
                }`}
              >
                <div className="flex items-center justify-center gap-0.5 text-blue-600 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p
                  className={`text-sm sm:text-base italic mb-6 leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  "{tst.comment}"
                </p>
                <h4
                  className={`font-normal text-sm sm:text-md ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  {tst.name}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">{tst.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL DETAIL PROJEK */}
      {activeProjectDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setActiveProjectDetail(null)}
        >
          <div
            className={`w-full max-w-xl rounded-xl overflow-hidden border shadow-xl ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-white"
                : "bg-white border-sky-100 text-slate-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-48 relative">
              <img
                src={activeProjectDetail.image_url}
                alt={activeProjectDetail.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveProjectDetail(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80"
              >
                <X size={13} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div>
                <span className="text-[9px] font-normal text-white uppercase tracking-wider bg-blue-600 px-2 py-0.5 rounded">
                  {activeProjectDetail.category}
                </span>
                <h3 className="text-base font-normal tracking-tight mt-1">
                  {activeProjectDetail.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === "id"
                  ? activeProjectDetail.long_desc_id
                  : activeProjectDetail.long_desc_en}
              </p>
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-500/10 text-xs">
                {activeProjectDetail.web_url && (
                  <a
                    href={activeProjectDetail.web_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-normal rounded-md flex items-center gap-1.5 transition-all text-[11px]"
                  >
                    Buka Link <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SERTIFIKAT */}
      {activeCertDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setActiveCertDetail(null)}
        >
          <div
            className={`relative max-w-xl w-full rounded-xl border p-3 ${
              isDarkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-sky-100"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2 px-1">
              <h3 className="text-xs font-normal text-slate-400 truncate max-w-[80%]">
                {lang === "id"
                  ? activeCertDetail.title
                  : activeCertDetail.title_en || activeCertDetail.title}
              </h3>
              <button
                onClick={() => setActiveCertDetail(null)}
                className="p-1 rounded bg-slate-500/10 hover:bg-slate-500/20"
              >
                <X size={13} />
              </button>
            </div>
            <img
              src={activeCertDetail.image_url}
              alt={activeCertDetail.title}
              className="w-full h-auto max-h-[65vh] object-contain rounded-md"
            />
          </div>
        </div>
      )}

      {/* INTERACTIVE CHATBOT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 max-w-[calc(100vw-2rem)]">
        {isChatOpen ? (
          <div
            className={`w-[290px] sm:w-[330px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-white"
                : "bg-white border-sky-100 text-slate-900"
            }`}
          >
            {/* Header Chatbot */}
            <div className="px-4 py-3.5 flex items-center justify-between text-white bg-blue-600">
              <div className="flex items-center gap-2 font-normal text-xs uppercase tracking-wider">
                <Cat size={14} /> AGOS PRASETIO Assistant
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={13} />
              </button>
            </div>

            {/* Konten Percakapan */}
            <div className="p-4 flex flex-col gap-4 max-h-[320px] overflow-y-auto text-xs">
              {chatStep === "welcome" && (
                <>
                  <div className="flex flex-col gap-1.5 items-start max-w-[85%]">
                    <div
                      className={`px-3 py-2 rounded-2xl rounded-tl-none shadow-sm ${isDarkMode ? "bg-slate-800" : "bg-sky-100"}`}
                    >
                      Halo!
                    </div>
                    <div
                      className={`px-3 py-2 rounded-2xl rounded-tl-none shadow-sm ${isDarkMode ? "bg-slate-800" : "bg-sky-100"}`}
                    >
                      {t[lang].chatbot.welcome}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-end w-full">
                    {[
                      {
                        label: "Informasi untuk Home / Beranda",
                        target: "home",
                      },
                      {
                        label: "Informasi untuk Portofolio",
                        target: "portfolio",
                      },
                      {
                        label: "Informasi untuk Pengalaman Kerja",
                        target: "experience",
                      },
                      {
                        label: "Informasi untuk Sertifikat",
                        target: "certificates",
                      },
                    ].map((menu) => (
                      <button
                        key={menu.target}
                        onClick={() => {
                          const element = document.getElementById(menu.target);
                          if (element)
                            element.scrollIntoView({ behavior: "smooth" });
                          setIsChatOpen(false);
                        }}
                        className="px-4 py-2.5 rounded-2xl rounded-br-none font-normal text-right max-w-[90%] shadow-sm border bg-blue-600 text-white border-blue-600 hover:bg-blue-700 transition-all"
                      >
                        {menu.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-end gap-2 group">
            <div
              className={`border px-3 py-1.5 rounded-xl rounded-br-none shadow-md text-[11px] font-normal relative ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-white"
                  : "bg-white border-sky-100/90 text-slate-900"
              }`}
            >
              {t[lang].chatbot.bubble || "Mau lihat bagian apa?"}
              <div
                className={`absolute right-3 -bottom-1 w-2 h-2 border-r border-b rotate-45 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-sky-100"}`}
              />
            </div>
            <button
              onClick={() => {
                setIsChatOpen(true);
                setChatStep("welcome");
              }}
              className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md transition-all hover:scale-105"
            >
              <Cat size={18} />
            </button>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-900/50 bg-slate-950 text-slate-400">
        <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col items-center text-center gap-6">
          {/* Brand */}
          <div className="space-y-3"></div>

          {/* About */}
          <p className="text-xs text-slate-500 max-w-lg leading-6 font-normal">
            TERIMAKASIH TELAH MENGUNJUNGI PORTOFOLIO SAYA. SEMOGA BERMANFAAT DAN
            MEMBERIKAN INSPIRASI BAGI ANDA.
          </p>

          {/* CTA */}
          <button
            onClick={handleSendWA}
            className="
              px-6 py-3
              bg-blue-600
              hover:bg-blue-700
              rounded-xl
              text-white
              text-sm
              font-normal
              flex items-center gap-2
              transition-all
              hover:scale-[1.02]
            "
          >
            <MessageCircle size={16} />
            Let's Connect
          </button>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-900/70 py-5">
          <p className="text-center text-[11px] text-slate-600 font-normal">
            © 2026 Agos Prasetio · Still Learning · Still Building · Still
            Growing
          </p>
        </div>
      </footer>
    </div>
  );
}
