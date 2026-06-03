export function generateSingleFileHtml(
  wpName: string = "VIVIAN ANEILA MARCHY ASSHAFARY",
  loginNpwp: string = "9988660000005153",
  email: string = "aneilavivian@gmail.com",
  phone: string = "+628568658602",
  address: string = "Jl. Merdeka No.10 Blok B/15, RT 001/RW 005, Kecamatan PALMERAH, DKI JAKARTA, 3171020"
): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PalakOnline - Edu-Simulasi Pajak Mandiri</title>
    <!-- Tailwind CSS Play CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
        }
        .font-mono-tax {
            font-family: 'JetBrains Mono', monospace;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
        @media print {
            .no-print {
                display: none !important;
            }
            body {
                background-color: white !important;
            }
        }
    </style>
</head>
<body class="text-slate-800 min-h-screen flex flex-col selection:bg-blue-150 selection:text-blue-900">

    <!-- LOGIN SCREEN (Displays if not logged in) -->
    <div id="login-container" class="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#0f172a] relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        
        <div class="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-slate-150 relative z-10 space-y-6">
            <div class="text-center space-y-2">
                <div class="mx-auto w-12 h-12 bg-blue-800 text-white rounded-2xl flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                    <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                </div>
                <h2 class="text-xl font-extrabold text-slate-900 tracking-tight">PalakOnline</h2>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Edu-Simulasi Pajak Mandiri</p>
                
                <div id="login-badge-text" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-yellow-105 text-yellow-850 border border-yellow-205">
                    Akses PalakOnline Terintegrasi
                </div>
            </div>

            <!-- Login Form -->
            <form id="login-form" class="space-y-4 text-xs font-medium" onsubmit="event.preventDefault(); return handleSimulatedLogin();">
                <div class="space-y-1">
                    <label for="login-npwp" class="block text-[10px] font-extrabold text-slate-505 uppercase tracking-widest">NPWP / NIK (16 Digit)</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <span class="text-[10px] font-extrabold font-mono text-slate-400">ID</span>
                        </div>
                        <input id="login-npwp" type="text" maxlength="16" required placeholder="NIK / NPWP 16 Digit" 
                            value="${loginNpwp}"
                            class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 font-semibold text-slate-955 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                </div>

                <div class="space-y-1">
                    <label for="login-password" class="block text-[10px] font-extrabold text-slate-505 uppercase tracking-widest">Kata Sandi</label>
                    <input id="login-password" type="password" required placeholder="•••••••••" 
                        value="pajak123"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>

                <!-- Custom Security Captcha simulator to make it very authentic -->
                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-150 flex items-center justify-between gap-4">
                    <div class="space-y-1 shrink-0">
                        <span class="text-[8px] font-extrabold text-slate-block text-slate-404 uppercase tracking-widest">Kode Keamanan</span>
                        <div class="bg-blue-105 text-blue-805 text-xs font-black tracking-widest px-3 py-1 rounded select-none font-mono-tax" id="captcha-code-display">XYZ9</div>
                    </div>
                    <div class="flex-grow">
                        <input id="login-captcha" type="text" required placeholder="Ketik kode..." 
                            class="w-full bg-white border border-slate-200 rounded-lg px-2 text-xs font-bold uppercase py-2 focus:ring-1 focus:ring-blue-500">
                        <p class="text-[8.5px] text-emerald-600 font-bold mt-1">✓ Kode aman otomatis terisi</p>
                    </div>
                </div>

                <button type="submit" class="w-full bg-blue-800 hover:bg-blue-900 border border-blue-950 text-white font-extrabold rounded-xl py-2.5 text-xs tracking-wider uppercase transition shadow-md shadow-blue-500/10 flex items-center justify-center space-x-1.5 font-sans">
                    <span>Masuk PalakOnline</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </button>

                <button type="button" onclick="toggleRegisterForm(true)" class="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold rounded-xl py-2.5 text-xs tracking-wider uppercase transition mt-2 flex items-center justify-center space-x-1.5">
                    <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>Belum punya akun? Buat Akun Baru</span>
                </button>
            </form>

            <!-- Register Form (Hidden by default) -->
            <form id="register-form" class="space-y-4 text-xs font-semibold text-slate-700 hidden" onsubmit="event.preventDefault(); return handleSimulatedRegister();">
                <p class="text-[10px] text-slate-400 text-center leading-relaxed">
                    Silakan daftarkan akun baru agar tidak otomatis memakai data Vivian.
                </p>

                <div class="space-y-1">
                    <label class="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">NPWP / NIK Baru (16 Digit)</label>
                    <input id="reg-npwp" type="text" maxlength="16" required 
                        placeholder="Contoh: 1200340056007890"
                        class="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2 text-slate-950 font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>

                <div class="space-y-1">
                    <label class="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Nama Lengkap Wajib Pajak</label>
                    <input id="reg-name" type="text" required 
                        placeholder="Nama dan Gelar Lengkap Anda"
                        class="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2 text-slate-950 font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-1">
                        <label class="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Email Kepatuhan</label>
                        <input id="reg-email" type="email" required
                            placeholder="email@pajak.id"
                            class="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2 text-slate-955 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">No. Handphone / WA</label>
                        <input id="reg-phone" type="text" required
                            placeholder="+62812345678"
                            class="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2 text-slate-955 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                </div>

                <div class="space-y-1">
                    <label class="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Alamat Lengkap Terdaftar</label>
                    <textarea id="reg-address" required rows="2"
                        placeholder="Nama jalan, RT/RW, kecamatan, kabupaten/kota, provinsi"
                        class="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2 text-slate-950 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
                </div>

                <div class="space-y-1">
                    <label class="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Kunci Sandi (Password)</label>
                    <input id="reg-password" type="password" required 
                        placeholder="pajak123"
                        class="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2 text-slate-950 font-black focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>

                <div class="pt-2 flex gap-3">
                    <button type="button" onclick="toggleRegisterForm(false)" class="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition">
                        Kembali
                    </button>
                    <button type="submit" class="w-2/3 bg-blue-800 hover:bg-blue-900 border border-blue-950 font-extrabold py-2.5 rounded-xl text-xs text-white transition flex items-center justify-center space-x-1.5 shadow-sm">
                        <span>Daftar Akun</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </button>
                </div>
            </form>

            <div class="text-center pt-4 border-t border-slate-100 mt-4">
                <p class="text-[10.5px] text-slate-400 leading-snug">
                    Sesuaikan identitas Anda secara mandiri agar tidak menduplikat nama Vivian saat demo simulasi berlangsung.
                </p>
            </div>
        </div>
    </div>


    <!-- CORE PORTAL CONTAINER (Hidden until login) -->
    <div id="portal-container" class="hidden flex-grow flex flex-col">
        
        <!-- Top Navigation -->
        <header class="bg-[#1e3a8a] text-white border-b border-yellow-400 sticky top-0 z-40 shadow-md no-print">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="bg-yellow-400 text-slate-900 p-2 rounded-xl">
                        <!-- Custom tax folder icon -->
                        <svg class="w-5 h-5 text-blue-900 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-sm font-extrabold tracking-tight flex items-center text-white">
                            <span class="text-yellow-400 font-black tracking-wide">PalakOnline</span>
                            <span class="ml-1.5 bg-yellow-400 text-slate-900 text-[9px] font-black px-1 rounded">V2</span>
                        </h1>
                        <p class="text-[9.5px] text-zinc-300 font-bold uppercase tracking-widest leading-none mt-0.5">Reformasi &amp; Edukasi Fiskal Baru</p>
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-250">
                        <span class="w-1.5 h-1.5 mr-1 bg-emerald-500 rounded-full animate-pulse"></span>
                        PalakOnline Live
                    </span>
                    <div class="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white flex items-center space-x-2">
                        <svg class="w-3.5 h-3.5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span class="font-bold whitespace-nowrap" id="user-display-name">${wpName} (${loginNpwp})</span>
                    </div>
                    <button onclick="logoutPortal()" class="text-zinc-300 hover:text-red-400 transition p-1 bg-white/5 hover:bg-white/10 rounded-lg" title="Logout dari PalakOnline">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>

        <!-- Sub Topbar Page Switcher Sidebar Layout -->
        <div class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
            
            <!-- SIDEBAR BAR (3 columns on lg table) -->
            <aside class="w-full lg:w-64 shrink-0 space-y-2 no-print">
                <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-2">Layanan PalakOnline</p>
                <nav class="space-y-1">
                    <button id="nav-dashboard" onclick="switchPortalSection('dashboard')" class="w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold rounded-xl transition bg-blue-600 text-white shadow-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path></svg>
                        <span>Dashboard WP</span>
                    </button>

                    <button id="nav-faktur" onclick="switchPortalSection('faktur')" class="w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold rounded-xl transition text-slate-600 hover:bg-slate-100">
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <span>E-Faktur (Buat Faktur)</span>
                        <span id="badge-faktur-count" class="ml-auto bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded font-bold">2</span>
                    </button>

                    <button id="nav-spt" onclick="switchPortalSection('spt')" class="w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold rounded-xl transition text-slate-600 hover:bg-slate-100">
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span>E-Filing (Lapor SPT)</span>
                        <span class="ml-auto bg-rose-100 text-rose-700 text-[9px] px-1.5 py-0.5 rounded font-bold">Wajib</span>
                    </button>

                    <button id="nav-umkm" onclick="switchPortalSection('umkm')" class="w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold rounded-xl transition text-slate-600 hover:bg-slate-100">
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 11h.01M12 7h.01M15 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        <span>Simulasi PPh UMKM</span>
                    </button>

                    <button id="nav-profil" onclick="switchPortalSection('profil')" class="w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold rounded-xl transition text-slate-600 hover:bg-slate-100">
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        <span>Profil Wajib Pajak</span>
                    </button>
                </nav>

                <!-- Quick Help center -->
                <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 mt-4 text-[11px] leading-relaxed">
                    <p class="font-bold text-slate-800">Butuh Bantuan?</p>
                    <p class="text-slate-500">Gunakan simulator perpajakan interaktif ini untuk mempraktikkan pengisian e-Faktur dan e-Filing sebelum menginput data riil di situs resmi Kemenkeu.</p>
                </div>
            </aside>


            <!-- WORKSPACE PANEL (9 columns on lg table) -->
            <div class="flex-grow space-y-8">
                
                <!-- PORTAL SECTION 1: DASHBOARD -->
                <div id="section-dashboard" class="space-y-6">
                    <!-- Dashboard welcome Jumbotron -->
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-blue-600/10">
                        <h2 id="u-welcome-message" class="text-xl md:text-2xl font-black tracking-tight">Selamat Datang di PalakOnline, ${wpName}!</h2>
                        <p class="text-blue-100 text-xs mt-1 leading-relaxed max-w-2xl">
                            Semua urusan perpajakan Anda sekarang terpadu dalam satu wadah. Laporkan omzet bulanan, terbitkan faktur PPN elektronik (e-Faktur), dan lapor SPT Tahunan (e-Filing) secara langsung.
                        </p>
                        
                        <!-- Mini Quick Fact -->
                        <div class="mt-4 flex flex-wrap gap-2">
                            <span class="bg-white/20 text-white text-[9px] font-extrabold px-2.5 py-1 rounded">NPWP format baru: 16 Digit</span>
                            <span class="bg-white/20 text-white text-[9px] font-extrabold px-2.5 py-1 rounded">Klasifikasi: UMKM Orang Pribadi</span>
                            <span class="bg-emerald-500 text-white text-[9px] font-extrabold px-2.5 py-1 rounded">Bebas Pajak s.d Rp 500 Juta Akumulatif Aktif</span>
                        </div>
                    </div>

                    <!-- Core KPI widgets -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                            <div>
                                <span class="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">Tagihan Belum Dibayar</span>
                                <span class="text-xl font-extrabold text-slate-900 tracking-tight" id="dash-kpi-unpaid">Rp 600.000</span>
                                <span class="text-[10px] text-rose-600 block font-semibold mt-1 flex items-center">
                                    <span class="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5 animate-pulse"></span>
                                    Masa Pajak April &amp; Mei
                                </span>
                            </div>
                            <div class="bg-rose-50 text-rose-600 p-3 rounded-lg">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            </div>
                        </div>

                        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                            <div>
                                <span class="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">Faktur Pajak Diterbitkan</span>
                                <span class="text-xl font-extrabold text-slate-900 tracking-tight" id="dash-kpi-fakturs">2 Dokumen</span>
                                <span class="text-[10px] text-emerald-600 block font-semibold mt-1">Status semua faktur Terbit</span>
                            </div>
                            <div class="bg-emerald-50 text-emerald-600 p-3 rounded-lg">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                        </div>

                        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                            <div>
                                <span class="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">Status SPT Tahunan</span>
                                <span class="text-xl font-extrabold text-indigo-900 tracking-tight" id="dash-kpi-spt">Terlapor (2025)</span>
                                <span class="text-[10px] text-slate-500 block">SPT Masa Berikutnya: Jan 2026+</span>
                            </div>
                            <div class="bg-blue-50 text-blue-600 p-3 rounded-lg">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Links Grid to explore components -->
                    <div class="space-y-3">
                        <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Akses Menu Terbuka</p>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button onclick="switchPortalSection('faktur')" class="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl text-left transition shadow-xs group">
                                <div class="bg-blue-50 text-blue-600 px-2 py-1 rounded inline-block text-[9px] font-bold uppercase mb-2">E-Faktur</div>
                                <h4 class="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">Buat Faktur Pajak Baru</h4>
                                <p class="text-[10px] text-slate-500 mt-1 leading-snug">Buat faktur penjualan, otomatis hitung PPN 11% untuk pembeli komersial.</p>
                            </button>

                            <button onclick="switchPortalSection('spt')" class="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl text-left transition shadow-xs group">
                                <div class="bg-rose-50 text-rose-600 px-2 py-1 rounded inline-block text-[9px] font-bold uppercase mb-2">E-Filing</div>
                                <h4 class="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition">Lapor SPT Tahunan</h4>
                                <p class="text-[10px] text-slate-500 mt-1 leading-snug">Laporkan SPT Orang Pribadi Form 1770 / 1770S secara digital dalam 4 langkah cepat.</p>
                            </button>

                            <button onclick="switchPortalSection('umkm')" class="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl text-left transition shadow-xs group">
                                <div class="bg-emerald-50 text-emerald-600 px-2 py-1 rounded inline-block text-[9px] font-bold uppercase mb-2">Kalkulator</div>
                                <h4 class="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition">Simulasi Pajak UMKM</h4>
                                <p class="text-[10px] text-slate-500 mt-1 leading-snug">Metode hitung PPh Final 0.5% dengan pemantauan batas bebas Rp 500 Juta.</p>
                            </button>
                        </div>
                    </div>

                    <!-- Latest Activity logs inside Dashboard -->
                    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 class="font-extrabold text-slate-950 text-sm pb-3 border-b border-slate-100">Kalender &amp; Pengumuman Penting</h3>
                        <div class="mt-4 space-y-4 text-xs">
                            <div class="flex items-start space-x-3.5">
                                <div class="bg-blue-50 text-blue-700 font-bold px-2.5 py-1.5 rounded-lg text-center font-mono-tax">
                                    15<br><span class="text-[8px] uppercase tracking-wide">Jun</span>
                                </div>
                                <div class="space-y-0.5">
                                    <h4 class="font-bold text-slate-900">Batas Penyetoran PPh Final UMKM Mei 2026</h4>
                                    <p class="text-[10.5px] text-slate-500">Batas akhir penyetor untuk transaksi pajak yang tidak dipungut pihak lain.</p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-3.5">
                                <div class="bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1.5 rounded-lg text-center font-mono-tax">
                                    30<br><span class="text-[8px] uppercase tracking-wide">Jun</span>
                                </div>
                                <div class="space-y-0.5">
                                    <h4 class="font-bold text-slate-900">Batas Akhir Pelaporan SPT Tahunan WPOP Pasca Relaksasi</h4>
                                    <p class="text-[10.5px] text-slate-500">Pastikan Anda telah mengisi formulir 1770 S untuk menghindari denda administrasi.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- PORTAL SECTION 2: E-FAKTUR (Buat Faktur Pajak) -->
                <div id="section-faktur" class="space-y-6 hidden">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                        <div>
                            <h2 class="text-lg font-black text-slate-900 tracking-tight">E-Faktur Pajak Elektronik</h2>
                            <p class="text-xs text-slate-500">Terbitkan Faktur Pajak Keluaran (PPN 11%) bagi entitas klien usaha Anda.</p>
                        </div>
                        <button onclick="toggleFakturFormVisibility(true)" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center space-x-2 transition">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            <span>Buat Faktur Keluaran Baru</span>
                        </button>
                    </div>

                    <!-- Invoice Creation Form Container (Hidden by default, shown by clicking the button above) -->
                    <div id="faktur-form-panel" class="hidden bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 class="font-extrabold text-slate-950 text-xs uppercase tracking-widest">Formulir Rekaman Faktur Keluaran Baru</h3>
                            <button onclick="toggleFakturFormVisibility(false)" class="text-slate-400 hover:text-slate-600 p-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <form onsubmit="event.preventDefault(); return handleCreateFakturSubmit();" class="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                            <div class="space-y-4">
                                <div>
                                    <label for="inv-buyer-name" class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Pembeli BKP / Penerima Jasa</label>
                                    <input id="inv-buyer-name" type="text" required placeholder="Contoh: PT Harapan Bangsa Makmur" 
                                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-950">
                                </div>
                                <div>
                                    <label for="inv-buyer-npwp" class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NPWP Pembeli (16 Digit)</label>
                                    <input id="inv-buyer-npwp" type="text" maxlength="16" required placeholder="Contoh: 0134567890123450" 
                                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono-tax focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-950">
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div>
                                    <label for="inv-desc" class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Barang / Deskripsi Jasa Kena Pajak</label>
                                    <input id="inv-desc" type="text" required placeholder="Contoh: Jasa Konsultasi IT Sistem Gudang" 
                                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-950">
                                </div>
                                
                                <div>
                                    <label for="inv-amount" class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nilai Transaksi (DPP / Dasar Pengenaan Pajak)</label>
                                    <div class="relative rounded-xl shadow-xs">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <span class="text-xs font-bold">Rp</span>
                                        </div>
                                        <input id="inv-amount" type="number" required min="1" placeholder="Contoh: 50000000" oninput="calculatePPNPreview()"
                                            class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs font-bold text-slate-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    </div>
                                </div>
                            </div>

                            <!-- Calculations Preview Box inside form -->
                            <div class="md:col-span-2 bg-slate-50 rounded-xl p-4 border border-slate-150 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                                <div class="space-y-1">
                                    <span class="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">Pertaksiran PPN Keluaran</span>
                                    <div>Tarif PPN: <strong>11%</strong> (Sesuai UU Harmonisasi Peraturan Perpajakan)</div>
                                    <div>Besaran PPN yang dipungut: <span id="ppn-preview-val" class="font-bold text-slate-900">Rp 0</span></div>
                                </div>
                                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg transition shadow-xs">
                                    Terbitkan &amp; Validasi Faktur
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- List of Invoiced Invoices -->
                    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 class="font-extrabold text-slate-900 text-sm mb-4">Daftar Faktur Pajak Keluaran Terbit</h3>
                        <div class="overflow-x-auto">
                          <table class="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr class="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                                <th class="pb-3 text-left">Kode &amp; No Seri Faktur</th>
                                <th class="pb-3 px-2">Nama Pembeli</th>
                                <th class="pb-3 px-2">Deskripsi Barang/Jasa</th>
                                <th class="pb-3 px-2 text-right">Nilai DPP</th>
                                <th class="pb-3 px-2 text-right">PPN Terhutang (11%)</th>
                                <th class="pb-3 pl-2 text-center">Status</th>
                              </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-slate-700" id="inv-table-body">
                              <!-- Dynamic -->
                            </tbody>
                          </table>
                        </div>
                    </div>
                </div>


                <!-- PORTAL SECTION 3: E-FILING (Lapor SPT Tahunan) -->
                <div id="section-spt" class="space-y-6 hidden">
                    <div class="pb-4 border-b border-slate-200">
                        <h2 class="text-lg font-black text-slate-900 tracking-tight">E-Filing SPT Tahunan Orang Pribadi</h2>
                        <p class="text-xs text-slate-500">Formulir Pelaporan SPT Sederhana 1770 S atau 1770 SS secara Terintegrasi.</p>
                    </div>

                    <!-- Wizard State layout for filing SPT -->
                    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        
                        <!-- Header indicators of wizard footsteps -->
                        <div class="bg-slate-100 border-b border-slate-200 px-6 py-4 grid grid-cols-4 text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                            <div id="step-tab-1" class="text-blue-600 border-b-2 border-blue-600 pb-1">1. Informasi Awal</div>
                            <div id="step-tab-2" class="pb-1">2. Pendapatan &amp; Pengurang</div>
                            <div id="step-tab-3" class="pb-1">3. Hitung PPh Akhir</div>
                            <div id="step-tab-4" class="pb-1">4. Verifikasi &amp; Kirim</div>
                        </div>

                        <!-- Step 1 Layout -->
                        <div id="spt-step-1" class="p-6 space-y-4">
                            <h3 class="font-extrabold text-slate-950 text-sm">Langkah 1: Identitas &amp; Tahun Pajak</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                                <div>
                                    <label for="spt-year" class="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tahun Pajak Laporan</label>
                                    <select id="spt-year" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-950 font-semibold focus:outline-none">
                                        <option value="2025" selected>2025 (Tahun Buku Sebelumnya)</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="spt-form-type" class="block font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Jenis Formulir</label>
                                    <select id="spt-form-type" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-950 font-semibold focus:outline-none">
                                        <option value="1770" selected>1770 (WPOP Usahawan / UMKM)</option>
                                        <option value="1770S">1770 S (WPOP Pegawai Gaji > Rp 60Jt/Thn)</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Pelaporan</label>
                                    <span class="inline-block bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 font-bold w-full text-center">
                                        Baru / Normal (Pembetulan Ke-0)
                                    </span>
                                </div>
                            </div>
                            <div class="pt-4 border-t border-slate-100 flex justify-end">
                                <button onclick="goSptStep(2)" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1 transition">
                                    <span>Lanjutkan Langkah 2</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Step 2 Layout -->
                        <div id="spt-step-2" class="p-6 space-y-4 hidden text-xs">
                            <h3 class="font-extrabold text-slate-950 text-sm">Langkah 2: Pendapatan Bruto &amp; Pengurang Non-Pajak</h3>
                            <p class="text-slate-500 leading-relaxed">Masukkan total penghasilan kotor usaha UMKM Anda selama setahun berjalan.</p>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                                <div>
                                    <label for="spt-gross" class="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">Total Omzet Bruto Setahun (Januari - Desember)</label>
                                    <div class="relative rounded-xl shadow-xs">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <span class="font-bold">Rp</span>
                                        </div>
                                        <input id="spt-gross" type="number" required placeholder="Contoh: 360000000" 
                                            class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs font-bold text-slate-950">
                                    </div>
                                </div>

                                <div>
                                    <label class="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">NPT (Peredaran Bruto Tidak Kena Pajak - Fasilitas PP 55)</label>
                                    <span class="inline-block bg-emerald-50 text-emerald-800 border border-emerald-250 px-3 py-2.5 rounded-xl font-mono-tax font-semibold w-full">
                                        Rp 500.000.000 (Otomatis Dikurangkan Bebas)
                                    </span>
                                </div>
                            </div>

                            <div class="pt-4 border-t border-slate-100 flex justify-between">
                                <button onclick="goSptStep(1)" class="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-xl transition">
                                    Kembali
                                </button>
                                <button onclick="calculateSptFinal()" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1 transition">
                                    <span>Lanjutkan dan Hitung</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Step 3 Layout -->
                        <div id="spt-step-3" class="p-6 space-y-4 hidden text-xs">
                            <h3 class="font-extrabold text-slate-950 text-sm">Langkah 3: Perhitungan PPh Akhir</h3>
                            <div class="bg-slate-50 rounded-xl p-5 border border-slate-150 space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-slate-500 font-semibold">Total Omzet Dilaporkan:</span>
                                    <span id="spt-res-gross" class="font-bold text-slate-950">Rp 0</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-slate-500 font-semibold">Batas Bebas Pajak (PP 55):</span>
                                    <span class="font-bold text-emerald-600">Rp 500.000.000</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-slate-500 font-semibold">DPP (Kena Pajak):</span>
                                    <span id="spt-res-taxable" class="font-bold text-slate-950">Rp 0</span>
                                </div>
                                <div class="flex justify-between border-t border-slate-200 pt-3 text-sm font-bold">
                                    <span class="text-slate-900">Total PPh Terutang (0.5%):</span>
                                    <span id="spt-res-due" class="text-blue-600">Rp 0</span>
                                </div>
                            </div>

                            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-250 text-[11px] text-emerald-800 leading-relaxed">
                                <strong>Keterangan Status: NIHIL</strong>. Seluruh kewajiban pembayaran PPh Final terindikasi nihil atau telah lunas disetorkan secara tuntas melalui transaksi bulanan Anda.
                            </div>

                            <div class="pt-4 border-t border-slate-100 flex justify-between">
                                <button onclick="goSptStep(2)" class="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-xl transition">
                                    Kembali
                                </button>
                                <button onclick="prepareOtpVerification()" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1 transition">
                                    <span>Lanjutkan Verifikasi</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Step 4 Layout: Verification Code simulator -->
                        <div id="spt-step-4" class="p-6 space-y-4 hidden text-xs">
                            <h3 class="font-extrabold text-slate-950 text-sm text-center">Langkah 4: Pengiriman Token Verifikasi Pajak</h3>
                            <div class="max-w-xs mx-auto space-y-4 text-center">
                                <p class="text-slate-500">Kirim kode verifikasi ke alamat email terdaftar <strong>aneila@gmail.com</strong></p>
                                
                                <button onclick="sendMockOtp()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-blue-600 font-bold text-xs py-2 px-3 rounded-lg border border-slate-250 transition inline-block">
                                    Minta Kode OTP (Klik di Sini)
                                </button>

                                <div class="space-y-1.5 pt-2">
                                    <label for="spt-otp" class="block font-bold text-slate-600 uppercase tracking-widest text-[10px]">Masukkan Kode OTP</label>
                                    <input id="spt-otp" type="text" maxlength="6" placeholder="Contoh: 8219" 
                                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-center text-sm font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                </div>
                            </div>

                            <div class="pt-6 border-t border-slate-100 flex justify-between">
                                <button onclick="goSptStep(3)" class="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-xl transition">
                                    Kembali
                                </button>
                                <button onclick="submitSptReportFinal()" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center space-x-1 transition">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                    <span>Kirim SPT (Submit)</span>
                                </button>
                            </div>
                        </div>

                    </div>

                    <!-- History of filed SPT e-filings -->
                    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 class="font-extrabold text-slate-900 text-sm mb-4">Riwayat Penyampaian SPT Tahunan</h3>
                        <div class="overflow-x-auto">
                          <table class="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr class="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                                <th class="pb-3 text-left">Tahun Pajak</th>
                                <th class="pb-3 px-2">Jenis Form</th>
                                <th class="pb-3 px-2">Kategori</th>
                                <th class="pb-3 px-2 text-right">Omzet Dilaporkan</th>
                                <th class="pb-3 px-2">Status SPT</th>
                                <th class="pb-3 pl-2 text-right">Lampiran BPE</th>
                              </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-slate-750" id="spt-table-body">
                              <!-- Dynamic -->
                            </tbody>
                          </table>
                        </div>
                    </div>
                </div>


                <!-- PORTAL SECTION 4: SIMULASI PAJAK UMKM BULANAN -->
                <div id="section-umkm" class="space-y-6 hidden">
                    <div class="pb-4 border-b border-slate-200">
                        <h2 class="text-lg font-black text-slate-900 tracking-tight">Kalkulator Pajak Masa UMKM (Bulanan)</h2>
                        <p class="text-xs text-slate-500">Hitung PPh Final Masa 0.5% secara mandiri dan daftarkan tagihan.</p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <!-- Calc (5 cols) -->
                        <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                            <h3 class="font-extrabold text-slate-900 text-xs uppercase tracking-widest pb-3 border-b border-slate-100">Alat Hitung Pajak PP 55</h3>
                            
                            <form id="calc-umkm-form" class="space-y-4" onsubmit="event.preventDefault(); return handleUmkmCalcSubmit();">
                                <div>
                                    <label for="umkm-period" class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Masa Pajak</label>
                                    <select id="umkm-period" class="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none">
                                        <option value="Mei 2526" selected>Mei 2026</option>
                                        <option value="Juni 2026">Juni 2026</option>
                                        <option value="Juli 2026">Juli 2026</option>
                                        <option value="Agustus 2026">Agustus 2026</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="umkm-gross" class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Omzet Kotor Bulan Ini (Rupiah)</label>
                                    <div class="relative rounded-xl shadow-xs">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <span class="font-bold">Rp</span>
                                        </div>
                                        <input id="umkm-gross" type="number" required placeholder="Contoh: 15000000"
                                            class="w-full bg-slate-50 border border-slate-250 rounded-xl pl-8 pr-3 py-2.5 text-xs font-bold text-slate-900">
                                    </div>
                                </div>

                                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-xs">
                                    Hitung Pajak Bulan Ini
                                </button>
                            </form>

                            <!-- Mini result window -->
                            <div id="umkm-result-panel" class="hidden bg-slate-50/70 rounded-xl p-4 border border-slate-150 space-y-3 text-xs text-slate-600">
                                <div class="flex justify-between">
                                    <span>Kategori WP:</span>
                                    <span class="font-bold text-slate-950">Orang Pribadi</span>
                                </div>
                                <div class="flex justify-between font-bold text-slate-900">
                                    <span>DPP PPh Final:</span>
                                    <span id="umkm-res-dpp">Rp 0</span>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg border border-blue-50 flex justify-between items-center text-blue-900">
                                    <div>
                                        <span class="text-[8px] font-extrabold uppercase animate-pulse">Tagihan Pajak</span>
                                        <div class="font-black text-sm" id="umkm-res-tax">Rp 0</div>
                                    </div>
                                    <button onclick="commitUmkmTaxDue()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded text-[10px] transition">
                                        Lapor &amp; Ambil Kode Billing
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Current Outstanding & Settlement (7 cols) -->
                        <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                            <h3 class="font-extrabold text-slate-900 text-xs uppercase tracking-widest">Daftar Tagihan &amp; Kewajiban Masa</h3>
                            <div class="overflow-x-auto">
                              <table class="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr class="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                                    <th class="pb-3 text-left">Masa Pajak</th>
                                    <th class="pb-3 px-2 text-right">Omzet Terlapor</th>
                                    <th class="pb-3 px-2 text-right">Pajak Setor</th>
                                    <th class="pb-3 px-2 text-center">Status</th>
                                    <th class="pb-3 pl-2 text-right">Aksi</th>
                                  </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100 text-slate-700" id="umkm-table-body">
                                  <!-- Dynamic -->
                                </tbody>
                              </table>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- PORTAL SECTION 5: PROFIL WAJIB PAJAK -->
                <div id="section-profil" class="space-y-6 hidden">
                    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                        <div class="flex items-center space-x-4 border-b border-slate-100 pb-5">
                            <div id="prof-initials-disp" class="mx-auto mx-0 shrink-0 h-14 w-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold">
                                AV
                            </div>
                            <div>
                                <h3 id="prof-name-disp" class="text-base font-black text-slate-900 tracking-tight">${wpName}</h3>
                                <p class="text-xs text-slate-500 font-medium">Klasifikasi Lapangan Usaha (KLU): Edukasi Praktikum Pajak Universitas</p>
                            </div>
                        </div>

                        <!-- Detail cards grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
                            <div class="space-y-3">
                                <h4 class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Identifikasi Pajak Baru</h4>
                                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                                    <div class="flex justify-between">
                                        <span class="text-slate-400">NPWP 16 Digit:</span>
                                        <strong id="prof-npwp-disp" class="text-slate-900 font-mono-tax">${loginNpwp}</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-400">NIK (Sebagai NPWP):</span>
                                        <strong id="prof-nik-disp" class="text-slate-900 font-mono-tax">${loginNpwp}</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-400">Alamat Tempat Usaha:</span>
                                        <strong id="prof-address-disp" class="text-slate-900">${address}</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-400">Email Kepatuhan:</span>
                                        <strong id="prof-email-disp" class="text-slate-900">${email}</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-400">No. Handphone:</span>
                                        <strong id="prof-phone-disp" class="text-slate-900">${phone}</strong>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <h4 class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Status Insentif PP 55</h4>
                                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                                    <div class="flex justify-between">
                                        <span class="text-slate-400">Fasilitas NPT 500 Juta:</span>
                                        <strong class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">AKTIF</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-400">Akumulasi Real Time:</span>
                                        <strong class="text-slate-900" id="profil-accum-disp">Rp 120.000.000</strong>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-400">Sertifikat Wajib Pajak:</span>
                                        <strong class="text-blue-600 hover:underline cursor-pointer flex items-center">
                                            Unduh Surat Keterangan PP 55
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


    <!-- MODAL 1: PEMBAYARAN TAGIHAN (QRIS / VA) -->
    <div id="pay-modal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 hidden no-print">
        <div class="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 transform scale-95 opacity-0 transition-all duration-300" id="pay-modal-card">
            
            <div class="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <span class="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded">SIMULASI</span>
                    <h3 class="font-extrabold text-slate-900 text-sm">Pembayaran Billing Elektronik (PalakOnline)</h3>
                </div>
                <button onclick="closePayModal()" class="text-slate-400 hover:text-slate-600 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <div class="p-6 space-y-5 text-xs">
                <div class="bg-blue-50 text-blue-900 p-4 rounded-xl border border-blue-50 flex justify-between items-center font-bold">
                    <div>
                        <span class="text-[9px] text-slate-400 font-extrabold block uppercase">Kode Billing Pajak</span>
                        <div id="pay-modal-billing" class="text-slate-950 font-mono-tax">4622-1923-08</div>
                    </div>
                    <div class="text-right">
                        <span class="text-[9px] text-slate-400 font-extrabold block uppercase">Jumlah Settle</span>
                        <div id="pay-modal-tax" class="text-blue-900 text-sm font-black">Rp 300.000</div>
                    </div>
                </div>

                <div class="space-y-3">
                    <label class="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Pilihan Saluran Instan</label>
                    <div class="grid grid-cols-2 gap-3">
                        <button onclick="selectPayChoice('QRIS')" id="pchoice-qris" class="p-3 rounded-xl border text-center transition flex justify-center items-center space-x-2 font-bold border-blue-600 bg-blue-50/40 text-blue-900">
                            <span>Scan QRIS</span>
                        </button>
                        <button onclick="selectPayChoice('VA')" id="pchoice-va" class="p-3 rounded-xl border text-center transition flex justify-center items-center space-x-2 font-bold border-slate-200 text-slate-600 hover:bg-slate-50">
                            <span>Virtual Account</span>
                        </button>
                    </div>

                    <!-- Visual Code rendering based on choice -->
                    <div id="pay-method-display" class="flex flex-col items-center py-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div class="w-32 h-32 bg-white border border-slate-200 p-2.5 rounded-lg flex items-center justify-center relative">
                          <div class="grid grid-cols-3 gap-2 w-full h-full opacity-60">
                              <div class="bg-slate-900 rounded-sm"></div>
                              <div class="bg-slate-900 rounded-sm"></div>
                              <div class="bg-slate-50"></div>
                              <div class="bg-slate-50"></div>
                              <div class="bg-slate-900 rounded-sm"></div>
                              <div class="bg-slate-900 rounded-sm"></div>
                              <div class="bg-slate-900 rounded-sm"></div>
                              <div class="bg-slate-50"></div>
                              <div class="bg-slate-900 rounded-sm"></div>
                          </div>
                          <div class="absolute inset-x-0 bottom-1 flex justify-center">
                              <span class="bg-blue-600 text-[8px] text-white font-extrabold px-1.5 py-0.5 rounded">QRIS Pajak</span>
                          </div>
                        </div>
                        <span class="text-[9.5px] text-slate-400 mt-2">Pindai kode QRIS simulator untuk membayar tanpa pulsa</span>
                    </div>
                </div>

                <button onclick="confirmBillPayment()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-xs rounded-xl tracking-wide uppercase transition shadow-md shadow-emerald-500/10">
                    Selesaikan Pembayaran (Simulasi Lunas)
                </button>
            </div>
        </div>
    </div>


    <!-- MODAL 2: BUKTI PENERIMAAN ELEKTRONIK (BPE PDF / PRINT STYLE) -->
    <div id="receipt-modal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-150 transform scale-95 opacity-0 transition-all duration-300" id="receipt-modal-card">
            
            <div class="p-6 space-y-5">
                <div class="text-center pb-4 border-b border-dashed border-slate-200">
                    <div class="inline-flex bg-emerald-50 text-emerald-600 p-2.5 rounded-full mb-2.5">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 class="font-black text-slate-900 text-sm">BUKTI PENERIMAAN ELEKTRONIK</h3>
                    <p class="text-[9px] text-slate-400 font-extrabold tracking-widest uppercase mt-0.5">DJP Kementerian Keuangan - RI</p>
                </div>

                <div class="space-y-3 text-xs text-slate-700">
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-medium">BPE Token ID:</span>
                        <strong class="font-mono-tax text-slate-900" id="rec-token">BPE-77291880</strong>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-medium">Wajib Pajak (NPWP):</span>
                        <strong class="text-slate-900">Aneila Vivian (16 Digit)</strong>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-medium">Jenis Pelayanan:</span>
                        <strong class="text-slate-900 text-right" id="rec-service-name">Pelaporan SPT Tahunan 1770 S</strong>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-medium">Masa/Tahun Buku:</span>
                        <strong class="text-slate-900" id="rec-period">Masa Pajak 2025</strong>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400 font-medium">Metode Pelunasan:</span>
                        <strong class="text-slate-900" id="rec-method">Komersial - Selesai Mandiri</strong>
                    </div>
                    <div class="flex justify-between border-t border-slate-100 pt-3">
                        <span class="text-slate-400 font-medium">Nilai Akuntansi Terlapor:</span>
                        <strong class="text-slate-900" id="rec-gross">Rp 45.000.000</strong>
                    </div>
                    <div class="flex justify-between border-b border-slate-100 pb-3 font-bold">
                        <span class="text-slate-900">Pembayaran PPh Final (0.5%):</span>
                        <strong class="text-emerald-600 font-black text-sm" id="rec-tax">Rp 225.000</strong>
                    </div>
                </div>

                <div class="bg-slate-50 p-3 rounded-lg text-[9.5px] leading-relaxed text-slate-400 border border-slate-100">
                    *Tanda Bukti Penerimaan Elektronik (BPE) resmi dari coretax simulator ini dilindungi undang-undang sebagai bukti kepatuhan fiskal pembayar pajak.
                </div>

                <div class="grid grid-cols-2 gap-3 no-print">
                    <button onclick="closeReceiptModal()" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl py-2.5 text-xs transition">
                        Tutup Bukti
                    </button>
                    <button onclick="window.print()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-2.5 text-xs transition flex items-center justify-center space-x-1.5 shadow-sm">
                        <span>Cetak BPE</span>
                    </button>
                </div>
            </div>
        </div>
    </div>


    <!-- SIMPLE TOAST FLOATING PANEL -->
    <div id="toast-floater" class="fixed bottom-5 right-5 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 translate-y-12 opacity-0 pointer-events-none transition-all duration-300 z-50">
        <div class="bg-emerald-500 rounded-full p-1 text-white">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <span id="toast-floater-text">Berhasil Memproses Tindakan!</span>
    </div>


    <!-- LOGICS JAVASCRIPT FOR SINGLE-FILE SIMULATOR -->
    <script>
        // Core Database Memory
        const TAX_FREE_LIMIT_VAL = 500000000;
        let selectedPayMethodValue = "QRIS";
        let activePortalSection = "dashboard";
        let currentPayingRecord = null;
        let sptWizardStep = 1;

        // Registered accounts memory simulation with default passed from caller
        let accounts = [];
        try {
            const savedAccounts = localStorage.getItem('mypajak_accounts');
            if (savedAccounts) {
                const parsed = JSON.parse(savedAccounts);
                if (Array.isArray(parsed)) {
                    accounts = parsed.map(acc => ({
                        ...acc,
                        password: acc.password || "pajak123"
                    }));
                }
            }
        } catch(e) {}

        if (!Array.isArray(accounts)) {
            accounts = [];
        }

        const defaultAccount = {
            npwp: ${JSON.stringify(loginNpwp)},
            name: ${JSON.stringify(wpName)},
            email: ${JSON.stringify(email)},
            phone: ${JSON.stringify(phone)},
            address: ${JSON.stringify(address)},
            password: "pajak123"
        };

        const hasDefault = accounts.some(acc => acc && acc.npwp === defaultAccount.npwp);
        if (!hasDefault) {
            accounts.unshift(defaultAccount);
            try {
                localStorage.setItem('mypajak_accounts', JSON.stringify(accounts));
            } catch(e) {}
        }

        // Active profile session record
        let currentWp = { ...defaultAccount };

        // DB Records
        let dbFakturs = [
            { id: "f1", fakturNumber: "010.000-26.00000524", buyerName: "PT Sukses Global Digital", buyerNpwp: "0132456789012000", productDescription: "Kontrak Maintenance Jasa Server", amount: 20000000, ppnAmount: 2200000, status: "Terbit" },
            { id: "f2", fakturNumber: "010.000-26.00000525", buyerName: "PT Bintang Cakra Niaga", buyerNpwp: "4412356711200021", productDescription: "Pengadaan Lisensi Software Database", amount: 12000000, ppnAmount: 1320000, status: "Terbit" }
        ];

        let dbSpts = [
            { id: "s1", year: "2024", sptType: "1770", grossIncome: 410000000, netIncome: 0, taxPaid: 0, status: "Sudah Lapor", dateReported: "2025-03-24", receiptToken: "BPE-98213890" },
            { id: "s2", year: "2023", sptType: "1770", grossIncome: 350000000, netIncome: 0, taxPaid: 0, status: "Sudah Lapor", dateReported: "2024-03-12", receiptToken: "BPE-55423190" }
        ];

        let dbUmkmRecords = [
            { id: "u1", date: "2026-02-10", period: "Januari 2026", turnover: 40000000, taxableAmount: 0, taxDue: 0, status: "Lunas", billingCode: "7182-3921-20", paymentMethod: "Virtual Account", paymentDate: "2026-02-10" },
            { id: "u2", date: "2026-03-12", period: "Februari 2026", turnover: 30000000, taxableAmount: 0, taxDue: 0, status: "Lunas", billingCode: "5123-1123-45", paymentMethod: "QRIS Pajak", paymentDate: "2026-03-12" },
            { id: "u3", date: "2026-04-14", period: "Maret 2026", turnover: 50000000, taxableAmount: 0, taxDue: 0, status: "Lunas", billingCode: "9912-3201-99", paymentMethod: "QRIS Pajak", paymentDate: "2026-04-14" },
            { id: "u4", date: "2026-05-18", period: "April 2026", turnover: 60000000, taxableAmount: 60000000, taxDue: 300000, status: "Belum Bayar", billingCode: "4622-1923-08", paymentMethod: "", paymentDate: "" }
        ];

        // Bootstrapping
        function initSimulator() {
            generateNewCaptcha();
            recalculateFullPortalMetrics();
            
            // Set dynamic inputs on load
            document.getElementById("login-npwp").value = currentWp.npwp;
        }

        if (document.readyState === "loading") {
            window.addEventListener('DOMContentLoaded', initSimulator);
        } else {
            initSimulator();
        }

        // 1. LOGIN & REGISTER CONTROLLERS
        function generateNewCaptcha() {
            const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
            let code = "";
            for (let i = 0; i < 4; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            document.getElementById("captcha-code-display").innerText = code;
            
            // Auto fill the login captcha input to make simulation login frictionless
            const loginCaptchaInput = document.getElementById("login-captcha");
            if (loginCaptchaInput) {
                loginCaptchaInput.value = code;
            }
        }

        function toggleRegisterForm(show) {
            if (show) {
                document.getElementById("login-form").classList.add("hidden");
                document.getElementById("register-form").classList.remove("hidden");
                document.getElementById("login-badge-text").innerText = "Registrasi Akun Wajib Pajak";
            } else {
                document.getElementById("register-form").classList.add("hidden");
                document.getElementById("login-form").classList.remove("hidden");
                document.getElementById("login-badge-text").innerText = "Akses PalakOnline Terintegrasi";
            }
        }

        function handleSimulatedRegister() {
            const rNpwp = document.getElementById("reg-npwp").value.trim().replace(/\D/g, '');
            const rName = document.getElementById("reg-name").value.trim().toUpperCase();
            const rEmail = document.getElementById("reg-email").value.trim().toLowerCase();
            const rPhone = document.getElementById("reg-phone").value.trim();
            const rAddress = document.getElementById("reg-address").value.trim();
            const rPassword = document.getElementById("reg-password").value.trim();

            if (rNpwp.length < 15) {
                showToast("NPWP / NIK harus 15 atau 16 digit!");
                return false;
            }
            if (!rName) {
                showToast("Nama lengkap tidak boleh kosong!");
                return false;
            }

            // Check duplicate
            const exists = accounts.some(acc => acc.npwp === rNpwp);
            if (exists) {
                showToast("Nomor NPWP tersebut sudah terdaftar!");
                return false;
            }

            // Save
            const newAcc = {
                npwp: rNpwp,
                name: rName,
                email: rEmail,
                phone: rPhone,
                address: rAddress,
                password: rPassword || "pajak123"
            };
            accounts.push(newAcc);
            try {
                localStorage.setItem('mypajak_accounts', JSON.stringify(accounts));
            } catch(e) {}

            showToast("Registrasi sukses! Silakan login.");
            
            // Fill login values
            document.getElementById("login-npwp").value = rNpwp;
            document.getElementById("login-password").value = rPassword || "pajak123";
            
            // Switch back to login
            toggleRegisterForm(false);
            generateNewCaptcha();
            return false;
        }

        function handleSimulatedLogin() {
            const npwpInput = document.getElementById("login-npwp").value.trim();
            const passwordInput = document.getElementById("login-password").value.trim();
            const captchaInput = document.getElementById("login-captcha").value.trim().toUpperCase();
            const captchaCode = document.getElementById("captcha-code-display").innerText.trim();

            if (npwpInput.length < 15) {
                showToast("NPWP / NIK tidak valid (harus 15 atau 16 digit)!");
                return false;
            }

            if (captchaInput !== captchaCode) {
                showToast("Kode keamanan / captcha salah!");
                generateNewCaptcha();
                return false;
            }

            // Find user matches
            let matchedUser = accounts.find(acc => acc && acc.npwp === npwpInput);
            if (!matchedUser) {
                // Auto-provision a guest account if NPWP is not pre-registered to make user flow completely error-free
                const guestName = npwpInput === "9988660000005153" ? "VIVIAN ANEILA MARCHY ASSHAFARY" : "WAJIB PAJAK SIMULASI BARU";
                const guestEmail = npwpInput === "9988660000005153" ? "aneilavivian@gmail.com" : "simulasi@pajak.go.id";
                const guestPhone = npwpInput === "9988660000005153" ? "+628568658602" : "+628123456789";
                const guestAddress = npwpInput === "9988660000005153" ? "Jl. Merdeka No.10 Blok B/15, RT 001/RW 005, Kecamatan PALMERAH, DKI JAKARTA, 3171020" : "Kantor Pelayanan Pajak Pratama Simpel";

                matchedUser = {
                    npwp: npwpInput,
                    name: guestName,
                    email: guestEmail,
                    phone: guestPhone,
                    address: guestAddress,
                    password: passwordInput || "pajak123"
                };
                accounts.push(matchedUser);
                try {
                    localStorage.setItem('mypajak_accounts', JSON.stringify(accounts));
                } catch(e) {}
            }

            if (matchedUser.password && matchedUser.password !== passwordInput) {
                // Auto-repair password mismatch to guarantee login is never blocked
                matchedUser.password = passwordInput;
                const idx = accounts.findIndex(acc => acc && acc.npwp === matchedUser.npwp);
                if (idx !== -1) {
                    accounts[idx].password = passwordInput;
                }
                try {
                    localStorage.setItem('mypajak_accounts', JSON.stringify(accounts));
                } catch(e) {}
            }

            // Session open
            currentWp = { ...matchedUser };

            showToast("Sukses Masuk! Membuka PalakOnline...");
            document.getElementById("login-container").classList.add("hidden");
            document.getElementById("portal-container").classList.remove("hidden");
            
            // Set dynamic user npwp label & headers
            document.getElementById("user-display-name").innerText = currentWp.name + " (" + currentWp.npwp + ")";
            document.getElementById("u-welcome-message").innerText = "Selamat Datang di PalakOnline, " + currentWp.name + "!";
            
            // Set Profile displays dynamically!
            document.getElementById("prof-name-disp").innerText = currentWp.name;
            document.getElementById("prof-initials-disp").innerText = currentWp.name.split(' ').map(n=>n[0]).join('').substring(0,2);
            document.getElementById("prof-npwp-disp").innerText = currentWp.npwp;
            document.getElementById("prof-nik-disp").innerText = currentWp.npwp;
            document.getElementById("prof-address-disp").innerText = currentWp.address;
            document.getElementById("prof-email-disp").innerText = currentWp.email;
            document.getElementById("prof-phone-disp").innerText = currentWp.phone;
            
            // Update email in step 4 verification form
            const emailLabel = document.getElementById("email-verification-label");
            if (emailLabel) {
                emailLabel.innerText = currentWp.email;
            }

            recalculateFullPortalMetrics();
            return false;
        }

        function logoutPortal() {
            document.getElementById("portal-container").classList.add("hidden");
            document.getElementById("login-container").classList.remove("hidden");
            document.getElementById("login-captcha").value = "";
            generateNewCaptcha();
            showToast("Keluar dari PalakOnline.");
        }


        // 2. PORTAL SWITCHER & RENDERING
        function switchPortalSection(sectionId) {
            activePortalSection = sectionId;

            // Nav buttons update
            ["dashboard", "faktur", "spt", "umkm", "profil"].forEach(sId => {
                const button = document.getElementById("nav-" + sId);
                const section = document.getElementById("section-" + sId);

                if (sId === sectionId) {
                    button.className = "w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold rounded-xl transition bg-blue-600 text-white shadow-sm";
                    section.classList.remove("hidden");
                } else {
                    button.className = "w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold rounded-xl transition text-slate-600 hover:bg-slate-100";
                    section.classList.add("hidden");
                }
            });

            // Adjust values on navigation
            recalculateFullPortalMetrics();
        }


        // 3. DATABASE MATHEMATICS & RE-RENDERS
        function recalculateFullPortalMetrics() {
            // Unpaid calculation
            let totalUnpaid = 0;
            dbUmkmRecords.forEach(rec => {
                if (rec.status === "Belum Bayar") {
                    totalUnpaid += rec.taxDue;
                }
            });

            // Count e-Fakturs
            const countFakturs = dbFakturs.length;

            // Update DOM metrics on dashboard
            document.getElementById("dash-kpi-unpaid").innerText = formatRupiah(totalUnpaid);
            document.getElementById("dash-kpi-fakturs").innerText = countFakturs + " Dokumen";
            document.getElementById("badge-faktur-count").innerText = countFakturs;

            // Latest SPT info
            if (dbSpts.length > 0) {
                document.getElementById("dash-kpi-spt").innerText = "Terlapor (" + dbSpts[0].year + ")";
            } else {
                document.getElementById("dash-kpi-spt").innerText = "Belum Lapor";
            }

            // Profile info sync
            let totalAccumulatedTurnover = 0;
            dbUmkmRecords.forEach(rec => {
                totalAccumulatedTurnover += rec.turnover;
            });
            document.getElementById("profil-accum-disp").innerText = formatRupiah(totalAccumulatedTurnover);

            // Re-render specific table states
            renderFaktursTable();
            renderSptsTable();
            renderUmkmTable();
        }


        // 4. E-FAKTUR CONTROLLERS
        function toggleFakturFormVisibility(status) {
            const panel = document.getElementById("faktur-form-panel");
            if (status) {
                panel.classList.remove("hidden");
            } else {
                panel.classList.add("hidden");
            }
        }

        function calculatePPNPreview() {
            const amountVal = parseFloat(document.getElementById("inv-amount").value);
            if (isNaN(amountVal) || amountVal <= 0) {
                document.getElementById("ppn-preview-val").innerText = "Rp 0";
                return;
            }
            const ppn = Math.round(amountVal * 0.11);
            document.getElementById("ppn-preview-val").innerText = formatRupiah(ppn);
        }

        function handleCreateFakturSubmit() {
            const buyerName = document.getElementById("inv-buyer-name").value.trim();
            const buyerNpwp = document.getElementById("inv-buyer-npwp").value.trim();
            const desc = document.getElementById("inv-desc").value.trim();
            const amountVal = parseFloat(document.getElementById("inv-amount").value);

            if (buyerNpwp.length < 15) {
                showToast("Kesalahan: NPWP Pembeli harus minimal 15 digit.");
                return false;
            }

            const ppn = Math.round(amountVal * 0.11);
            const serialNo = "010.000-26." + String(526 + dbFakturs.length).padStart(8, '0');

            const newFaktur = {
                id: "f_" + Math.random(),
                fakturNumber: serialNo,
                buyerName: buyerName,
                buyerNpwp: buyerNpwp,
                productDescription: desc,
                amount: amountVal,
                ppnAmount: ppn,
                status: "Terbit"
            };

            dbFakturs.unshift(newFaktur);
            showToast("Sukses: Faktur Pajak " + serialNo + " Berhasil Diterbitkan!");
            
            // Clean inputs
            document.getElementById("inv-buyer-name").value = "";
            document.getElementById("inv-buyer-npwp").value = "";
            document.getElementById("inv-desc").value = "";
            document.getElementById("inv-amount").value = "";
            document.getElementById("ppn-preview-val").innerText = "Rp 0";
            
            toggleFakturFormVisibility(false);
            recalculateFullPortalMetrics();
            return false;
        }

        function renderFaktursTable() {
            const tbody = document.getElementById("inv-table-body");
            tbody.innerHTML = "";

            if (dbFakturs.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6' class='py-4 text-center text-slate-400'>Belum ada Faktur Pajak PPN diterbitkan.</td></tr>";
                return;
            }

            dbFakturs.forEach(f => {
                const tr = document.createElement("tr");
                tr.className = "border-b border-slate-50 hover:bg-slate-50 transition";
                tr.innerHTML = 
                    '<td class="py-3 font-semibold text-slate-900 font-mono-tax">' + f.fakturNumber + '</td>' +
                    '<td class="py-3 px-2 font-medium">' + f.buyerName + '</td>' +
                    '<td class="py-3 px-2 text-slate-500">' + f.productDescription + '</td>' +
                    '<td class="py-3 px-2 text-right font-medium">' + formatRupiah(f.amount) + '</td>' +
                    '<td class="py-3 px-2 text-right font-semibold text-rose-600">' + formatRupiah(f.ppnAmount) + '</td>' +
                    '<td class="py-3 pl-2 text-center">' +
                    '    <span class="inline-flex bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-100">' +
                    '        Terbit' +
                    '    </span>' +
                    '</td>';
                tbody.appendChild(tr);
            });
        }


        // 5. E-FILING SPT LAUNCHER
        function goSptStep(stepNo) {
            sptWizardStep = stepNo;
            [1, 2, 3, 4].forEach(s => {
                const tab = document.getElementById("step-tab-" + s);
                const stepView = document.getElementById("spt-step-" + s);

                if (s === stepNo) {
                    tab.className = "text-blue-600 border-b-2 border-blue-600 pb-1";
                    stepView.classList.remove("hidden");
                } else {
                    tab.className = "pb-1 text-slate-400";
                    stepView.classList.add("hidden");
                }
            });
        }

        function calculateSptFinal() {
            const grossVal = parseFloat(document.getElementById("spt-gross").value);
            if (isNaN(grossVal) || grossVal <= 0) {
                showToast("Mohon isi total penghasilan bruto setahun secara valid!");
                return;
            }

            // Calculate taxable part (NPT 500 Million protection for usahawan)
            const taxable = Math.max(0, grossVal - 500000000);
            const pphTerutang = Math.round(taxable * 0.005);

            document.getElementById("spt-res-gross").innerText = formatRupiah(grossVal);
            document.getElementById("spt-res-taxable").innerText = formatRupiah(taxable);
            document.getElementById("spt-res-due").innerText = formatRupiah(pphTerutang);

            goSptStep(3);
        }

        function prepareOtpVerification() {
            goSptStep(4);
        }

        function sendMockOtp() {
            const randomCode = Math.floor(1000 + Math.random() * 9000);
            document.getElementById("spt-otp").value = randomCode;
            showToast("Kode verifikasi OTP terkirim otomatis: " + randomCode);
        }

        function submitSptReportFinal() {
            const otpCode = document.getElementById("spt-otp").value.trim();
            const grossVal = parseFloat(document.getElementById("spt-gross").value);

            if (!otpCode) {
                showToast("Ketik atau generasi nomor OTP verifikasi terlebih dahulu!");
                return;
            }

            const yr = document.getElementById("spt-year").value;
            const hasDuplicate = dbSpts.some(s => s.year === yr);
            if (hasDuplicate) {
                showToast("Peringatan: SPT untuk Tahun " + yr + " sudah dilaporkan sebelumnya.");
            }

            // Generate BPE token ID
            const token = "BPE-" + Math.floor(10000000 + Math.random() * 90000000);
            const newSpt = {
                id: "spt_" + Math.random(),
                year: yr,
                sptType: document.getElementById("spt-form-type").value,
                grossIncome: grossVal,
                netIncome: 0,
                taxPaid: Math.round(Math.max(0, grossVal - 500000000) * 0.005),
                status: "Sudah Lapor",
                dateReported: new Date().toISOString().split('T')[0],
                receiptToken: token
            };

            dbSpts.unshift(newSpt);
            
            // Wipe clean
            document.getElementById("spt-gross").value = "";
            document.getElementById("spt-otp").value = "";
            
            showToast("Sukses: SPT Tahunan " + yr + " Berhasil Diserahkan!");
            goSptStep(1);
            showReceiptFromSpt(newSpt);
            recalculateFullPortalMetrics();
        }

        function renderSptsTable() {
            const tbody = document.getElementById("spt-table-body");
            tbody.innerHTML = "";

            if (dbSpts.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6' class='py-4 text-center text-slate-400'>Belum ada berkas SPT Tahun berjalan dilaporkan.</td></tr>";
                return;
            }

            dbSpts.forEach(s => {
                const tr = document.createElement("tr");
                tr.className = "border-b border-slate-50 hover:bg-slate-50 transition";
                tr.innerHTML = 
                    '<td class="py-3 font-semibold text-slate-900">' + s.year + '</td>' +
                    '<td class="py-3 px-2 font-mono-tax">SPT Form ' + s.sptType + '</td>' +
                    '<td class="py-3 px-2 text-slate-500 font-semibold text-[11px]">UMKM Nihil</td>' +
                    '<td class="py-3 px-2 text-right font-medium">' + formatRupiah(s.grossIncome) + '</td>' +
                    '<td class="py-3 px-2">' +
                    '    <span class="inline-flex bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-100">' +
                    '        Terlapor' +
                    '    </span>' +
                    '</td>' +
                    '<td class="py-3 pl-2 text-right">' +
                    '    <button onclick="viewHistoricalSptBpe(\'' + s.id + '\')" class="text-blue-600 font-bold hover:underline">' +
                    '        Unduh BPE' +
                    '    </button>' +
                    '</td>';
                tbody.appendChild(tr);
            });
        }


        // 6. MONTHLY UMKM CALC CONTROLLERS
        function handleUmkmCalcSubmit() {
            const gross = parseFloat(document.getElementById("umkm-gross").value);
            if (isNaN(gross) || gross <= 0) {
                showToast("Keberatan: Masukkan nominal omzet bernilai positif!");
                return false;
            }

            // Sum previous period turnover
            let accum = 0;
            dbUmkmRecords.forEach(r => accum += r.turnover);

            let dpp = 0;
            if (accum >= TAX_FREE_LIMIT_VAL) {
                dpp = gross;
            } else if (accum + gross > TAX_FREE_LIMIT_VAL) {
                dpp = (accum + gross) - TAX_FREE_LIMIT_VAL;
            } else {
                dpp = 0;
            }

            const tax = Math.round(dpp * 0.005);

            document.getElementById("umkm-res-dpp").innerText = formatRupiah(dpp);
            document.getElementById("umkm-res-tax").innerText = formatRupiah(tax);
            document.getElementById("umkm-result-panel").classList.remove("hidden");
            return false;
        }

        function commitUmkmTaxDue() {
            const gross = parseFloat(document.getElementById("umkm-gross").value);
            const period = document.getElementById("umkm-period").value;
            
            // Check duplicates as safeguard
            const indexFound = dbUmkmRecords.findIndex(r => r.period === period);

            let accum = 0;
            dbUmkmRecords.forEach(r => accum += r.turnover);

            let dpp = 0;
            if (accum >= TAX_FREE_LIMIT_VAL) {
                dpp = gross;
            } else if (accum + gross > TAX_FREE_LIMIT_VAL) {
                dpp = (accum + gross) - TAX_FREE_LIMIT_VAL;
            } else {
                dpp = 0;
            }

            const tax = Math.round(dpp * 0.005);
            const billCode = Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000) + "-500";

            const newRecord = {
                id: "u_" + Math.random(),
                date: new Date().toISOString().split('T')[0],
                period: period,
                turnover: gross,
                taxableAmount: dpp,
                taxDue: tax,
                status: tax === 0 ? "Lunas" : "Belum Bayar",
                billingCode: billCode,
                paymentMethod: tax === 0 ? "Fasilitas Bebas Pajak" : "",
                paymentDate: tax === 0 ? new Date().toISOString().split('T')[0] : ""
            };

            if (indexFound !== -1) {
                dbUmkmRecords[indexFound] = newRecord;
            } else {
                dbUmkmRecords.push(newRecord);
            }

            showToast("Tindakan Berhasil: Masa Pajak " + period + " berhasil didaftarkan.");
            
            // Clean up panel
            document.getElementById("umkm-gross").value = "";
            document.getElementById("umkm-result-panel").classList.add("hidden");

            recalculateFullPortalMetrics();

            if (tax > 0) {
                // Instantly open setoran billing code
                openPaymentDialog(newRecord);
            }
        }

        function renderUmkmTable() {
            const tbody = document.getElementById("umkm-table-body");
            tbody.innerHTML = "";

            if (dbUmkmRecords.length === 0) {
                tbody.innerHTML = "<tr><td colspan='5' class='py-4 text-center text-slate-400'>Belum ada tagihan terdaftar.</td></tr>";
                return;
            }

            dbUmkmRecords.forEach(item => {
                const tr = document.createElement("tr");
                tr.className = "border-b border-slate-50 hover:bg-slate-50/70 transition";
                
                let badge = "";
                if (item.status === "Lunas") {
                    badge = '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Lunas</span>';
                } else {
                    badge = '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-750 border border-amber-100">Belum Bayar</span>';
                }

                let action = "";
                if (item.status === "Lunas") {
                    action = '<button onclick="viewHistoricalUmkmBpe(\'' + item.id + '\')" class="text-blue-600 font-bold hover:underline">Sertifikat BPE</button>';
                } else {
                    action = '<button onclick="openPaymentDialogById(\'' + item.id + '\')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded shadow-xs">Bayar</button>';
                }

                tr.innerHTML = 
                    '<td class="py-3 font-semibold text-slate-900">' + item.period + '</td>' +
                    '<td class="py-3 px-2 text-right font-medium text-slate-500">' + formatRupiah(item.turnover) + '</td>' +
                    '<td class="py-3 px-2 text-right font-bold text-slate-900">' + formatRupiah(item.taxDue) + '</td>' +
                    '<td class="py-3 px-2 text-center">' + badge + '</td>' +
                    '<td class="py-3 pl-2 text-right space-x-2">' +
                        action +
                        ' <button onclick="deleteUmkmRecord(\'' + item.id + '\')" class="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition" title="Delete">' +
                        '     <svg class="w-3.5 h-3.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>' +
                        ' </button>' +
                    '</td>';
                tbody.appendChild(tr);
            });
        }

        function deleteUmkmRecord(id) {
            dbUmkmRecords = dbUmkmRecords.filter(r => r.id !== id);
            showToast("Catatan masa terpilih berhasil dihapus.");
            recalculateFullPortalMetrics();
        }


        // 7. PAYMENT BILLING MODAL CONTROLLER
        function openPaymentDialog(record) {
            currentPayingRecord = record;
            document.getElementById("pay-modal-billing").innerText = record.billingCode;
            document.getElementById("pay-modal-tax").innerText = formatRupiah(record.taxDue);

            const modal = document.getElementById("pay-modal");
            const card = document.getElementById("pay-modal-card");

            modal.classList.remove("hidden");
            setTimeout(() => {
                card.classList.remove("scale-95", "opacity-0");
                card.classList.add("scale-100", "opacity-100");
            }, 10);
        }

        function openPaymentDialogById(id) {
            const index = dbUmkmRecords.find(r => r.id === id);
            if (index) {
                openPaymentDialog(index);
            }
        }

        function selectPayChoice(choice) {
            selectedPayMethodValue = choice;
            const btnQris = document.getElementById("pchoice-qris");
            const btnVa = document.getElementById("pchoice-va");
            const visual = document.getElementById("pay-method-display");

            if (choice === "QRIS") {
                btnQris.className = "p-3 rounded-xl border text-center transition flex justify-center items-center space-x-2 font-bold border-blue-600 bg-blue-50/40 text-blue-900";
                btnVa.className = "p-3 rounded-xl border text-center transition flex justify-center items-center space-x-2 font-bold border-slate-200 text-slate-600 hover:bg-slate-50";
                
                visual.innerHTML = 
                    '<div class="w-32 h-32 bg-white border border-slate-200 p-2.5 rounded-lg flex items-center justify-center relative">' +
                    '    <div class="grid grid-cols-3 gap-2 w-full h-full opacity-60">' +
                    '        <div class="bg-indigo-950 rounded-sm"></div>' +
                    '        <div class="bg-indigo-950 rounded-sm"></div>' +
                    '        <div class="bg-slate-50"></div>' +
                    '        <div class="bg-slate-50"></div>' +
                    '        <div class="bg-indigo-950 rounded-sm"></div>' +
                    '        <div class="bg-indigo-950 rounded-sm"></div>' +
                    '        <div class="bg-indigo-950 rounded-sm"></div>' +
                    '        <div class="bg-slate-50"></div>' +
                    '        <div class="bg-indigo-950 rounded-sm"></div>' +
                    '    </div>' +
                    '    <div class="absolute inset-x-0 bottom-1 flex justify-center">' +
                    '        <span class="bg-blue-600 text-[8px] text-white font-black px-1.5 py-0.5 rounded">QRIS Pajak</span>' +
                    '    </div>' +
                    '</div>' +
                    '<span class="text-[9.5px] text-slate-400 mt-2">Pindai kode QRIS simulator untuk membayar tanpa pulsa</span>';
            } else {
                btnVa.className = "p-3 rounded-xl border text-center transition flex justify-center items-center space-x-2 font-bold border-blue-600 bg-blue-50/40 text-blue-900";
                btnQris.className = "p-3 rounded-xl border text-center transition flex justify-center items-center space-x-2 font-bold border-slate-200 text-slate-600 hover:bg-slate-50";
                
                visual.innerHTML = 
                    '<div class="flex flex-col items-center py-4 space-y-1">' +
                    '    <span class="text-[8.5px] text-slate-400 uppercase tracking-widest font-extrabold">Virtual Account Bank Mandiri / BNI</span>' +
                    '    <span class="text-base font-black text-slate-900 font-mono-tax tracking-widest">8801 8293 8410 9321</span>' +
                    '    <span class="text-[9px] text-slate-400">Pastikan nominal transfer tertera Rp 300.000</span>' +
                    '</div>';
            }
        }

        function closePayModal() {
            const modal = document.getElementById("pay-modal");
            const card = document.getElementById("pay-modal-card");

            card.classList.remove("scale-100", "opacity-100");
            card.classList.add("scale-95", "opacity-0");
            setTimeout(() => {
                modal.classList.add("hidden");
            }, 300);
        }

        function confirmBillPayment() {
            if (!currentPayingRecord) return;

            // Mark paid
            const index = dbUmkmRecords.findIndex(r => r.id === currentPayingRecord.id);
            if (index !== -1) {
                dbUmkmRecords[index].status = "Lunas";
                dbUmkmRecords[index].paymentMethod = selectedPayMethodValue === "QRIS" ? "QRIS Mandiri" : "Virtual Account Bank";
                dbUmkmRecords[index].paymentDate = new Date().toISOString().split('T')[0];
            }

            closePayModal();
            showToast("Setoran lunas dikonfirmasi otomatis! Membuka Dokumen BPE...");
            
            // Instantly display receipt model
            const paidRecord = dbUmkmRecords[index];
            setTimeout(() => {
                showReceiptFromUmkm(paidRecord);
            }, 400);

            recalculateFullPortalMetrics();
        }


        // 8. BPE RECEIPT MODAL DISPLAY
        function showReceiptFromUmkm(item) {
            document.getElementById("rec-token").innerText = "BPE-" + Math.floor(10000000 + Math.random() * 90000000);
            document.getElementById("rec-service-name").innerText = "Penyetoran Pajak PPh Final Masa " + item.period;
            document.getElementById("rec-period").innerText = "Masa " + item.period;
            document.getElementById("rec-method").innerText = item.paymentMethod || "Metode Elektronik";
            document.getElementById("rec-gross").innerText = formatRupiah(item.turnover);
            document.getElementById("rec-tax").innerText = formatRupiah(item.taxDue);

            openReceiptModal();
        }

        function showReceiptFromSpt(item) {
            document.getElementById("rec-token").innerText = item.receiptToken;
            document.getElementById("rec-service-name").innerText = "Penyampaian SPT SPT Tahunan Form " + item.sptType;
            document.getElementById("rec-period").innerText = "Tahun Pajak " + item.year;
            document.getElementById("rec-method").innerText = item.paymentMethod || "Coretax E-Filer";
            document.getElementById("rec-gross").innerText = formatRupiah(item.grossIncome);
            document.getElementById("rec-tax").innerText = formatRupiah(item.taxPaid);

            openReceiptModal();
        }

        function viewHistoricalSptBpe(id) {
            const index = dbSpts.find(s => s.id === id);
            if (index) {
                showReceiptFromSpt(index);
            }
        }

        function viewHistoricalUmkmBpe(id) {
            const index = dbUmkmRecords.find(u => u.id === id);
            if (index) {
                showReceiptFromUmkm(index);
            }
        }

        function openReceiptModal() {
            const modal = document.getElementById("receipt-modal");
            const card = document.getElementById("receipt-modal-card");

            modal.classList.remove("hidden");
            setTimeout(() => {
                card.classList.remove("scale-95", "opacity-0");
                card.classList.add("scale-100", "opacity-100");
            }, 10);
        }

        function closeReceiptModal() {
            const modal = document.getElementById("receipt-modal");
            const card = document.getElementById("receipt-modal-card");

            card.classList.remove("scale-100", "opacity-100");
            card.classList.add("scale-95", "opacity-0");
            setTimeout(() => {
                modal.classList.add("hidden");
            }, 300);
        }


        // 9. HELPER GENERAL FORMATTERS
        function formatRupiah(num) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0
            }).format(num);
        }

        function showToast(message) {
            const toast = document.getElementById("toast-floater");
            document.getElementById("toast-floater-text").innerText = message;
            
            toast.classList.remove("translate-y-12", "opacity-0", "pointer-events-none");
            toast.classList.add("translate-y-0", "opacity-100");

            setTimeout(() => {
                toast.classList.remove("translate-y-0", "opacity-100");
                toast.classList.add("translate-y-12", "opacity-0", "pointer-events-none");
            }, 3500);
        }
    </script>
</body>
</html>`;
}
