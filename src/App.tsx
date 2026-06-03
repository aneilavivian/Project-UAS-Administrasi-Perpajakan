import React, { useState, useEffect } from 'react';
import { 
  Building,
  KeyRound,
  ShieldAlert,
  Sparkles,
  FileText,
  PlusCircle,
  Briefcase,
  Layers,
  ArrowRight,
  Send,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Copy,
  User,
  QrCode,
  X,
  CreditCard,
  Printer,
  ChevronRight,
  ChevronDown,
  LogOut,
  Sliders,
  DollarSign,
  Undo2,
  FileCheck2,
  Lock,
  FileSpreadsheet,
  Trash,
  Edit,
  FileCheck,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TaxRecord, TaxCategory, FakturPajak, SptReport, BuktiPotong, BillingRecord, LedgerRecord } from './types.ts';
import { generateSingleFileHtml } from './htmlGenerator.ts';

const OBJ_PAJAK_MAP: Record<string, {
  code: string;
  name: string;
  jenisPajak: string;
  sifat: string;
  deemedRate: number;
  tarif: number;
  kap: string;
}[]> = {
  'BPPU': [
    { code: '23-104-01', name: '23-104-01 | Jasa Teknik, IT, Manajemen, Konstruksi, atau Desain', jenisPajak: 'PPh Pasal 23', sifat: 'Tidak Final', deemedRate: 100, tarif: 2, kap: '411124' },
    { code: '23-104-09', name: '23-104-09 | Jasa Percetakan/Produksi Atribut Media & Percetakan', jenisPajak: 'PPh Pasal 23', sifat: 'Tidak Final', deemedRate: 100, tarif: 2, kap: '411124' },
  ],
  'BPNR': [
    { code: '26-100-01', name: '26-100-01 | Dividen, Bunga, Royalti Luar Negeri', jenisPajak: 'PPh Pasal 26', sifat: 'Final', deemedRate: 100, tarif: 20, kap: '411127' },
    { code: '26-100-02', name: '26-100-02 | Imbalan Jasa/Pekerjaan Ahli Luar Negeri', jenisPajak: 'PPh Pasal 26', sifat: 'Final', deemedRate: 100, tarif: 20, kap: '411127' },
  ],
  'Penyetoran Sendiri': [
    { code: '411128-411', name: '411128-411 | PPh Final Terutang atas Sewa Tanah & Bangunan', jenisPajak: 'PPh Pasal 4 Ayat 2', sifat: 'Final', deemedRate: 100, tarif: 10, kap: '411128' },
    { code: '411128-412', name: '411128-412 | PPh Final Pengalihan Hak Atas Tanah & Bangunan', jenisPajak: 'PPh Pasal 4 Ayat 2', sifat: 'Final', deemedRate: 100, tarif: 5, kap: '411128' },
  ],
  'Pemotongan Secara Digunggung': [
    { code: 'PP-55-UMKM', name: 'PP-55-UMKM | PPh Final UMKM Disetor Sendiri / Secara Digunggung', jenisPajak: 'PPh Final PP 55', sifat: 'Final', deemedRate: 100, tarif: 0.5, kap: '411128' }
  ],
  'BP 21 - Bukti Pemotongan Selain Pegawai Tetap': [
    { code: '21-100-02', name: '21-100-02 | Imbalan Jasa Tenaga Ahli Perpajakan (Consultancy)', jenisPajak: 'PPh Pasal 21', sifat: 'Tidak Final', deemedRate: 50, tarif: 5, kap: '411121' },
    { code: '21-100-05', name: '21-100-05 | Upah Bukan Pegawai Tetap (Upah Harian/Borongan/Bulanan)', jenisPajak: 'PPh Pasal 21', sifat: 'Tidak Final', deemedRate: 100, tarif: 5, kap: '411121' },
    { code: '21-100-07', name: '21-100-07 | Imbalan Komisi Keagenan / Penjualan Terkait', jenisPajak: 'PPh Pasal 21', sifat: 'Tidak Final', deemedRate: 100, tarif: 5, kap: '411121' },
  ],
  'BP 26 - Bukti Pemotongan Wajib Pajak Luar Negeri': [
    { code: '26-100-99', name: '26-100-99 | Penghasilan Konsultan / Pekerjaan Lain PPh Pasal 26', jenisPajak: 'PPh Pasal 26', sifat: 'Final', deemedRate: 100, tarif: 20, kap: '411127' }
  ],
  'BP A1 - Bukti Pemotongan A1 Masa Pajak Terakhir': [
    { code: '21-100-01', name: '21-100-01 | Penghasilan Pegawai Swasta Masa Pajak Terakhir (Tahunan)', jenisPajak: 'PPh Pasal 21', sifat: 'Tidak Final', deemedRate: 100, tarif: 5, kap: '411121' }
  ],
  'BP A2 - Bukti Pemotongan A2 Masa Pajak Terakhir': [
    { code: '21-100-01', name: '21-100-01-PNS | Penghasilan PNS / Anggota TNI / POLRI Masa Terakhir', jenisPajak: 'PPh Pasal 21', sifat: 'Tidak Final', deemedRate: 100, tarif: 5, kap: '411121' }
  ],
  'Bukti Pemotongan Bulanan Pegawai Tetap': [
    { code: '21-100-01', name: '21-100-01-Masa | Gaji & Tunjangan Pegawai Tetap Bulanan (TER)', jenisPajak: 'PPh Pasal 21', sifat: 'Tidak Final', deemedRate: 100, tarif: 1.5, kap: '411121' }
  ],
  'Unggah Dokumen Yang Dipersamakan Dengan Bukti Pemotongan/Pemungutan': [
    { code: 'UNGGAH-DOK', name: 'UNGGAH-DOK | Dokumen Impor / PIB / JSP / SSP Setoran Lain', jenisPajak: 'Dokumen Pajak Lain', sifat: 'Tidak Final', deemedRate: 100, tarif: 1.0, kap: '411121' }
  ]
};

const getObjekPajakOptions = (type: string) => {
  return OBJ_PAJAK_MAP[type] || OBJ_PAJAK_MAP['BP 14 - Bukti Pemotongan Lainnya'] || OBJ_PAJAK_MAP['BP 21 - Bukti Pemotongan Selain Pegawai Tetap'];
};

const TAX_FREE_LIMIT = 500000000;

const KAP_LIST = [
  { code: '411121', name: 'PPh Pasal 21' },
  { code: '411122', name: 'PPh Pasal 22' },
  { code: '411124', name: 'PPh Pasal 23' },
  { code: '411128', name: 'PPh Final' },
  { code: '411126', name: 'PPh Pasal 26' },
  { code: '411211', name: 'PPN Dalam Negeri' },
];

const KJS_LIST = [
  { code: '100', name: 'Setoran Masa' },
  { code: '200', name: 'Tahunan / SKP' },
  { code: '411', name: 'UMKM PP 55 (0.5%)' },
  { code: '105', name: 'Sewa Tanah/Bangunan' },
  { code: '300', name: 'STP (Surat Tagihan Pajak)' },
];

export default function App() {
  // Global States
  const [activeTab, setActiveTab] = useState<'interactive' | 'html-source'>('interactive');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [portalTab, setPortalTab] = useState<'dashboard' | 'faktur' | 'bupot' | 'spt' | 'umkm' | 'profil' | 'pembayaran' | 'bukubesar'>('dashboard');

  // Registered Taxpayer Accounts
  const [accounts, setAccounts] = useState<{
    npwp: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  }[]>(() => {
    const defaultAcc = {
      npwp: '9988660000005153',
      name: 'VIVIAN ANEILA MARCHY ASSHAFARY',
      email: 'aneilavivian@gmail.com',
      phone: '+628568658602',
      address: 'Jl. Merdeka No.10 Blok B/15, RT 001/RW 005, Kecamatan PALMERAH, DKI JAKARTA, 3171020',
      password: 'pajak123'
    };

    const saved = localStorage.getItem('mypajak_accounts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const sanitized = parsed.map(acc => ({
            ...acc,
            password: acc.password || 'pajak123'
          }));
          if (!sanitized.some(acc => acc.npwp === defaultAcc.npwp)) {
            sanitized.unshift(defaultAcc);
          }
          return sanitized;
        }
      } catch (e) {}
    }
    return [defaultAcc];
  });

  // Save accounts when changed
  useEffect(() => {
    localStorage.setItem('mypajak_accounts', JSON.stringify(accounts));
  }, [accounts]);

  // Personal Info States matching selected account
  const [loginNpwp, setLoginNpwp] = useState<string>('9988660000005153');
  const [loginPassword, setLoginPassword] = useState<string>('pajak123');
  const [wpName, setWpName] = useState<string>('VIVIAN ANEILA MARCHY ASSHAFARY');
  const [wpEmail, setWpEmail] = useState<string>('aneilavivian@gmail.com');
  const [wpPhone, setWpPhone] = useState<string>('+628568658602');
  const [wpAddress, setWpAddress] = useState<string>('Jl. Merdeka No.10 Blok B/15, RT 001/RW 005, Kecamatan PALMERAH, DKI JAKARTA, 3171020');

  // Registration Mode
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [regNpwp, setRegNpwp] = useState<string>('');
  const [regName, setRegName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regAddress, setRegAddress] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');

  // Profile Taxpayer Creation Form States
  const [profNpwp, setProfNpwp] = useState<string>('');
  const [profName, setProfName] = useState<string>('');
  const [profEmail, setProfEmail] = useState<string>('');
  const [profPhone, setProfPhone] = useState<string>('');
  const [profAddress, setProfAddress] = useState<string>('');
  const [profPassword, setProfPassword] = useState<string>('pajak123');

  // Period choices extended
  const [umkmDay, setUmkmDay] = useState<string>('03');
  const [umkmMonth, setUmkmMonth] = useState<string>('Juni');
  const [umkmYear, setUmkmYear] = useState<string>('2026');

  // Edit / Revision States for CRUD
  const [editingFaktur, setEditingFaktur] = useState<FakturPajak | null>(null);
  const [editingSpt, setEditingSpt] = useState<SptReport | null>(null);
  const [editingUmkm, setEditingUmkm] = useState<TaxRecord | null>(null);
  const [editingBupot, setEditingBupot] = useState<BuktiPotong | null>(null);

  // Captcha Code States
  const [captchaValue, setCaptchaValue] = useState<string>('');
  const [displayCaptcha, setDisplayCaptcha] = useState<string>('GZ4B');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Database States
  const [fakturs, setFakturs] = useState<FakturPajak[]>([
    { 
      id: 'f1', 
      fakturNumber: '010.000-26.00000524', 
      date: '2026-05-10', 
      buyerName: 'PT Sukses Global Digital', 
      buyerNpwp: '0132456789012000', 
      productDescription: 'Kontrak Maintenance Jasa Server', 
      amount: 20000000, 
      ppnAmount: 2200000, 
      status: 'Terbit' 
    },
    { 
      id: 'f2', 
      fakturNumber: '010.000-26.00000525', 
      date: '2026-05-24', 
      buyerName: 'PT Bintang Cakra Niaga', 
      buyerNpwp: '4412356711200021', 
      productDescription: 'Pengadaan Lisensi Software Database', 
      amount: 12000000, 
      ppnAmount: 1320000, 
      status: 'Terbit' 
    }
  ]);

  const [spts, setSpts] = useState<SptReport[]>([
    { 
      id: 's1', 
      year: '2024', 
      sptType: '1770', 
      grossIncome: 410000000, 
      netIncome: 140000000, 
      taxPaid: 0, 
      status: 'Sudah Lapor', 
      pembetulanKe: 0,
      dateReported: '2025-03-24', 
      receiptToken: 'BPE-98213890' 
    },
    { 
      id: 's2', 
      year: '2023', 
      sptType: '1770', 
      grossIncome: 350000000, 
      netIncome: 120000000, 
      taxPaid: 0, 
      status: 'Sudah Lapor', 
      pembetulanKe: 0,
      dateReported: '2024-03-12', 
      receiptToken: 'BPE-55423190' 
    }
  ]);

  const [umkmRecords, setUmkmRecords] = useState<TaxRecord[]>([
    { 
      id: 'u1', 
      date: '2026-02-10', 
      period: 'Januari 2026', 
      turnover: 40000000, 
      taxableAmount: 0, 
      taxDue: 0, 
      status: 'Lunas', 
      billingCode: '7182-3921-20', 
      paymentMethod: 'Virtual Account', 
      paymentDate: '2026-02-10' 
    },
    { 
      id: 'u2', 
      date: '2026-03-12', 
      period: 'Februari 2026', 
      turnover: 30000000, 
      taxableAmount: 0, 
      taxDue: 0, 
      status: 'Lunas', 
      billingCode: '5123-1123-45', 
      paymentMethod: 'QRIS Pajak', 
      paymentDate: '2026-03-12' 
    },
    { 
      id: 'u3', 
      date: '2026-04-14', 
      period: 'Maret 2026', 
      turnover: 50000000, 
      taxableAmount: 0, 
      taxDue: 0, 
      status: 'Lunas', 
      billingCode: '9912-3201-99', 
      paymentMethod: 'QRIS Pajak', 
      paymentDate: '2026-04-14' 
    },
    { 
      id: 'u4', 
      date: '2026-05-18', 
      period: 'April 2026', 
      turnover: 60000000, 
      taxableAmount: 60000000, 
      taxDue: 300000, 
      status: 'Belum Bayar', 
      billingCode: '4622-1923-08' 
    }
  ]);

  // Bukti Potong Database States
  const [bupots, setBupots] = useState<BuktiPotong[]>([
    {
      id: 'bp1',
      bupotType: 'BP 21-Bukti Pemotongan Selain Pegawai Tetap',
      bupotNumber: '53-211-100-0000105',
      date: '2026-05-15',
      recipientName: 'PT Mandiri Konsultan Utama',
      recipientNpwp: '018239451007000',
      objekPajak: 'Imbalan Jasa Ahli Perpajakan (Consultancy)',
      grossAmount: 25000000,
      taxRate: 2.5,
      taxAmount: 625000,
      status: 'Terbit'
    },
    {
      id: 'bp2',
      bupotType: 'BPPU',
      bupotNumber: '53-100-00-0000189',
      date: '2026-05-20',
      recipientName: 'CV Sinar Souvenir Indonesia',
      recipientNpwp: '023194851082000',
      objekPajak: 'Pemotongan PPN/PPh Jasa Percetakan Souvenir',
      grossAmount: 18000000,
      taxRate: 2.0,
      taxAmount: 360000,
      status: 'Terbit'
    }
  ]);

  // Bukti Potong entry form
  const [bupotFormOpen, setBupotFormOpen] = useState<boolean>(false);
  const [bupotTypeSel, setBupotTypeSel] = useState<string>('BP 21 - Bukti Pemotongan Selain Pegawai Tetap');
  const [bupotRecipientName, setBupotRecipientName] = useState<string>('');
  const [bupotRecipientNpwp, setBupotRecipientNpwp] = useState<string>('');
  const [bupotObjekPajak, setBupotObjekPajak] = useState<string>('21-100-02 | Imbalan Jasa Tenaga Ahli Perpajakan (Consultancy)');
  const [bupotGross, setBupotGross] = useState<string>('');
  const [bupotRate, setBupotRate] = useState<string>('2.5');
  const [bupotCalcTax, setBupotCalcTax] = useState<number>(0);

  // Detailed e-Bupot extra variables mapping to screenshots
  const [bupotMasaPajak, setBupotMasaPajak] = useState<string>('Mei 2026');
  const [bupotNitku, setBupotNitku] = useState<string>('0000000000000000');
  const [bupotPtkp, setBupotPtkp] = useState<string>('TK/0');
  const [bupotFasilitas, setBupotFasilitas] = useState<string>('Tanpa Fasilitas');
  const [bupotRefDocType, setBupotRefDocType] = useState<string>('Invoice');
  const [bupotRefDocNo, setBupotRefDocNo] = useState<string>('INV-2026-00344');
  const [bupotRefDocDate, setBupotRefDocDate] = useState<string>('2026-06-03');
  const [bupotRefDocNitku, setBupotRefDocNitku] = useState<string>('0000000000000000');

  // Accordion states for form sections
  const [bupotAccordionOpen, setBupotAccordionOpen] = useState({
    infoUmum: true,
    perhitunganPajak: true,
    dokumenRef: true
  });

  // State to manage top navigation menu bar dropdowns
  const [activeDropdown, setActiveDropdown] = useState<'bupot' | 'spt' | 'pembayaran' | null>(null);

  // Billings and Ledger states
  const [billings, setBillings] = useState<BillingRecord[]>([
    {
      id: 'bill-1',
      kapCode: '411121',
      kapName: 'PPh Pasal 21',
      kjsCode: '100',
      kjsName: 'Setoran Masa',
      amount: 1250000,
      period: 'April',
      year: '2026',
      billingCode: '718229381029482',
      status: 'Lunas',
      dateCreated: '2026-04-15',
      ntpn: 'NTPN8A7F2D54',
      datePaid: '2026-04-18'
    },
    {
      id: 'bill-2',
      kapCode: '411128',
      kapName: 'PPh Final',
      kjsCode: '411',
      kjsName: 'UMKM PP 55',
      amount: 350000,
      period: 'Mei',
      year: '2026',
      billingCode: '512311234567890',
      status: 'Belum Bayar',
      dateCreated: '2026-05-10'
    }
  ]);

  const [ledger, setLedger] = useState<LedgerRecord[]>([
    {
      id: 'led-1',
      date: '2026-04-15',
      type: 'DEBET',
      category: 'PPh Pasal 21',
      description: 'Timbul Kewajiban Masa Pajak April 2026 (Efaktur Lapor)',
      reference: 'SPT-21-APR26',
      debet: 1250000,
      kredit: 0,
      balance: 1250000
    },
    {
      id: 'led-2',
      date: '2026-04-18',
      type: 'KREDIT',
      category: 'PPh Pasal 21',
      description: 'Penyetoran PPh Pasal 21 Masa April 2026',
      reference: 'NTPN-8A7F2D54',
      debet: 0,
      kredit: 1250000,
      balance: 0
    },
    {
      id: 'led-3',
      date: '2026-05-10',
      type: 'DEBET',
      category: 'PPh Final UMKM',
      description: 'Kewajiban Pembayaran PPh Final UMKM Mei 2026',
      reference: 'BILL-51231123',
      debet: 350000,
      kredit: 0,
      balance: 350000
    }
  ]);

  const [pembayaranSubTab, setPembayaranSubTab] = useState<'create' | 'list'>('create');
  const [billingKap, setBillingKap] = useState<string>('411121');
  const [billingKjs, setBillingKjs] = useState<string>('100');
  const [billingAmount, setBillingAmount] = useState<string>('');
  const [billingPeriod, setBillingPeriod] = useState<string>('Mei');
  const [billingYear, setBillingYear] = useState<string>('2026');
  const [payingBilling, setPayingBilling] = useState<BillingRecord | null>(null);

  // E-Faktur Form Inputs
  const [fFormOpen, setFFormOpen] = useState<boolean>(false);
  const [fBuyerName, setFBuyerName] = useState<string>('');
  const [fBuyerNpwp, setFBuyerNpwp] = useState<string>('');
  const [fDesc, setFDesc] = useState<string>('');
  const [fAmount, setFAmount] = useState<string>('');
  const [fPpn, setFPpn] = useState<number>(0);

  // E-Filing Wizard Steps
  const [sptStep, setSptStep] = useState<number>(1);
  const [sFormYear, setSFormYear] = useState<string>('2025');
  const [sFormType, setSFormType] = useState<string>('1770');
  const [sGross, setSGross] = useState<string>('');
  const [sOtpCode, setSOtpCode] = useState<string>('');
  const [sptPreviewData, setSptPreviewData] = useState<{ gross: number; taxable: number; due: number } | null>(null);

  // Concept SPT Builder (3-Step Wizard) States
  const [sptSubTab, setSptSubTab] = useState<'create' | 'draft' | 'unpaid' | 'reported'>('create');
  const [conceptSptStep, setConceptSptStep] = useState<number>(1);
  const [conceptSptType, setConceptSptType] = useState<string>('PPN');
  const [conceptSptMonth, setConceptSptMonth] = useState<string>('Januari');
  const [conceptSptYear, setConceptSptYear] = useState<string>('2025');
  const [conceptPembetulan, setConceptPembetulan] = useState<number>(0);
  const [conceptGross, setConceptGross] = useState<string>('');
  const [conceptNet, setConceptNet] = useState<string>('');
  const [conceptOtpCode, setConceptOtpCode] = useState<string>('');

  // Kalkulator Masa Form States
  const [umkmPeriod, setUmkmPeriod] = useState<string>('Mei 2026');
  const [umkmGross, setUmkmGross] = useState<string>('');
  const [umkmCalcResult, setUmkmCalcResult] = useState<TaxRecord | null>(null);

  // Modal Handlers
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);
  const [payingRecord, setPayingRecord] = useState<TaxRecord | null>(null);
  const [payMethod, setPayMethod] = useState<'QRIS' | 'VA'>('QRIS');

  // BPE Document Receipt Modals
  const [bpeModalOpen, setBpeModalOpen] = useState<boolean>(false);
  const [receiptModel, setReceiptModel] = useState<{
    tokenId: string;
    wpName: string;
    wpNpwp: string;
    serviceName: string;
    periodText: string;
    reportedAmount: number;
    finalTax: number;
    methodText: string;
  } | null>(null);

  // Clipboard Copied Status
  const [copied, setCopied] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string | null>(null);

  // Initializing & Random Captcha Issuer
  useEffect(() => {
    generateNewCheckCode();
  }, []);

  const generateNewCheckCode = () => {
    const sequence = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += sequence.charAt(Math.floor(Math.random() * sequence.length));
    }
    setDisplayCaptcha(code);
    setCaptchaValue(code);
  };

  const showSystemToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => {
      setToastText(null);
    }, 3500);
  };

  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginNpwp.length < 15) {
      setLoginError('Format NPWP/NIK tidak valid! Harus bernilai minimal 15 Digit.');
      return;
    }
    if (captchaValue.trim().toUpperCase() !== displayCaptcha) {
      setLoginError('Kode Keamanan (Captcha) yang Anda masukkan keliru!');
      generateNewCheckCode();
      return;
    }

    // Find registered account or fallback
    const matched = accounts.find(acc => acc.npwp === loginNpwp);
    if (matched) {
      if (matched.password !== loginPassword) {
        setLoginError('Kata Sandi yang Anda masukkan keliru!');
        return;
      }
      setWpName(matched.name);
      setWpEmail(matched.email);
      setWpPhone(matched.phone);
      setWpAddress(matched.address);
    } else {
      // Dynamic provisioning for testing non-registered inputs
      const guestName = loginNpwp === '9988660000005153' ? 'VIVIAN ANEILA MARCHY ASSHAFARY' : 'WAJIB PAJAK SIMULASI BARU';
      const guestEmail = loginNpwp === '9988660000005153' ? 'aneilavivian@gmail.com' : 'simulasi@pajak.go.id';
      const guestPhone = loginNpwp === '9988660000005153' ? '+628568658602' : '+628123456789';
      const guestAddress = loginNpwp === '9988660000005153' ? 'Jl. Merdeka No.10 Blok B/15, RT 001/RW 005, Kecamatan PALMERAH, DKI JAKARTA, 3171020' : 'Kantor Pelayanan Pajak Pratama Simpel';
      
      setWpName(guestName);
      setWpEmail(guestEmail);
      setWpPhone(guestPhone);
      setWpAddress(guestAddress);

      // Save to list
      const fallbackAcc = {
        npwp: loginNpwp,
        name: guestName,
        email: guestEmail,
        phone: guestPhone,
        address: guestAddress,
        password: loginPassword || 'pajak123'
      };
      setAccounts(prev => [...prev, fallbackAcc]);
    }

    setLoginError(null);
    setIsLoggedIn(true);
    setPortalTab('dashboard');
    showSystemToast('Sukses Masuk PalakOnline Indonesia!');
  };

  const handleSimulatedRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNpwp.length < 15) {
      setLoginError('Format NPWP/NIK pendaftaran tidak valid (minimal 15 Digit).');
      return;
    }
    if (accounts.some(a => a.npwp === regNpwp)) {
      setLoginError('Kombinasi NPWP tersebut sudah terdaftar di database.');
      return;
    }

    const newWpAcc = {
      npwp: regNpwp,
      name: regName.trim().toUpperCase(),
      email: regEmail.trim().toLowerCase() || 'user@pajak.go.id',
      phone: regPhone.trim() || '+62811111111',
      address: regAddress.trim() || 'Alamat Kepatuhan Perpajakan, Indonesia',
      password: regPassword || 'pajak123'
    };

    setAccounts(prev => {
      const exists = prev.some(acc => acc.npwp === newWpAcc.npwp);
      if (exists) return prev;
      return [...prev, newWpAcc];
    });
    
    // Auto fill credentials
    setLoginNpwp(regNpwp);
    setLoginPassword(newWpAcc.password);

    // Auto login
    setWpName(newWpAcc.name);
    setWpEmail(newWpAcc.email);
    setWpPhone(newWpAcc.phone);
    setWpAddress(newWpAcc.address);
    setIsRegistering(false);
    setLoginError(null);
    setIsLoggedIn(true);
    setPortalTab('dashboard');
    generateNewCheckCode();
    showSystemToast(`Akun Wajib Pajak "${newWpAcc.name}" Berhasil Terdaftar & Masuk!`);
  };

  const downloadFaktur = (f: FakturPajak) => {
    const htmlString = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Sertifikat_Faktur_Pajak_${f.fakturNumber}.html</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #ffffff; }
        @media print { .no-print { display: none !important; } }
    </style>
</head>
<body class="p-8 max-w-4xl mx-auto border border-slate-300 my-8 shadow-md">
    <div class="flex items-center justify-between border-b-4 border-blue-900 pb-4 mb-6">
        <div>
            <h1 class="text-2xl font-black text-blue-900 tracking-tight">FAKTUR PAJAK ELEKTRONIK</h1>
            <p class="text-xs font-mono font-bold text-yellow-600 mt-1">KODE & NO. SERI FAKTUR: ${f.fakturNumber}</p>
        </div>
        <div class="text-right">
            <h2 class="text-lg font-black text-slate-900">PalakOnline</h2>
            <p class="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Direktorat Jenderal Pajak</p>
        </div>
    </div>
    
    <div class="space-y-6 text-xs text-slate-800 leading-relaxed">
        <div class="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
            <h3 class="font-extrabold text-blue-800 mb-3 uppercase tracking-wider text-[11px] flex items-center">
                <span class="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span>
                Pengusaha Kena Pajak (Penjual)
            </h3>
            <table class="w-full text-left font-medium">
                <tr><td class="w-1/3 py-1 text-slate-500 font-bold">Nama KLU Penjual:</td><td class="py-1 text-slate-900 font-bold">${wpName}</td></tr>
                <tr><td class="w-1/3 py-1 text-slate-500 font-bold">NPWP / NIK:</td><td class="py-1 text-slate-900 font-mono font-bold">${loginNpwp}</td></tr>
                <tr><td class="w-1/3 py-1 text-slate-500 font-bold">Alamat Terdaftar:</td><td class="py-1 text-slate-600">${wpAddress}</td></tr>
            </table>
        </div>

        <div class="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
            <h3 class="font-extrabold text-blue-800 mb-3 uppercase tracking-wider text-[11px] flex items-center">
                <span class="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span>
                Penerima Barang / Jasa (Pembeli)
            </h3>
            <table class="w-full text-left font-medium">
                <tr><td class="w-1/3 py-1 text-slate-500 font-bold">Nama Pembeli:</td><td class="py-1 text-slate-900 font-bold">${f.buyerName}</td></tr>
                <tr><td class="w-1/3 py-1 text-slate-500 font-bold">NPWP / NIK Pembeli:</td><td class="py-1 text-slate-900 font-mono font-bold">${f.buyerNpwp}</td></tr>
            </table>
        </div>

        <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div class="bg-blue-900 text-white px-5 py-3 font-bold text-xs flex justify-between tracking-wide">
                <span>DESKRIPSI BARANG atau JASA KENAPAJAK (BKP/JKP)</span>
                <span>NILAI DPP LAJU</span>
            </div>
            <div class="p-5 flex justify-between items-center bg-white border-b border-slate-150">
                <div>
                    <p class="font-extrabold text-slate-900 text-sm">${f.productDescription}</p>
                    <p class="text-[10px] text-zinc-400 font-semibold mt-1 font-mono">ID TRANSAKSI: TX-${f.id.toUpperCase()} | TANGGAL: ${f.date}</p>
                </div>
                <div class="font-black text-slate-900 text-base">${formatRupiah(f.amount)}</div>
            </div>
            <div class="p-5 bg-yellow-50/40 space-y-2 border-t border-slate-100 font-semibold text-slate-700">
                <div class="flex justify-between">
                    <span class="text-zinc-500">Dasar Pengenaan Pajak (DPP):</span>
                    <span>${formatRupiah(f.amount)}</span>
                </div>
                <div class="flex justify-between font-black text-blue-900 border-t border-slate-200 pt-3 text-sm">
                    <span>PPN Terutang Terunggul (11%):</span>
                    <span class="text-lg text-blue-900 font-black">${formatRupiah(f.ppnAmount)}</span>
                </div>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-blue-50 border border-blue-100 p-5 rounded-2xl mt-6 gap-4">
            <div>
                <p class="font-extrabold text-blue-900 text-[12px] uppercase tracking-wider">Metode e-Faktur Sah</p>
                <p class="text-[10px] text-slate-600 mt-1">Dokumen faktur ini telah sah terkirim, tervalidasi, dan diarsipkan di jaringan PalakOnline Indonesia.</p>
            </div>
            <div class="text-center font-black px-4 py-2 bg-yellow-400 rounded-xl text-slate-950 text-xs tracking-widest shadow-xs uppercase shrink-0">
                FAKTUR AKTIF
            </div>
        </div>
    </div>
    
    <div class="text-center mt-8 no-print pb-6">
        <button onclick="window.print()" class="bg-blue-900 hover:bg-indigo-950 text-white font-extrabold text-xs py-3 px-8 rounded-xl shadow-md transition-all flex items-center space-x-2 mx-auto">
            <span>Cetak / Ekspor PDF Sekarang</span>
        </button>
    </div>
    <script>
        window.onload = function() {
            setTimeout(function() { window.print(); }, 600);
        }
    </script>
</body>
</html>`;
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `E-Faktur_${f.fakturNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSystemToast(`E-Faktur ${f.fakturNumber} sukses diunduh sebagai berkas cetak!`);
  };

  const downloadSpt = (s: SptReport) => {
    const htmlString = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Sertifikat_BPE_SPT_${s.year}.html</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #ffffff; }
        @media print { .no-print { display: none !important; } }
    </style>
</head>
<body class="p-8 max-w-4xl mx-auto border border-slate-300 my-8 shadow-md">
    <div class="flex items-center justify-between border-b-4 border-blue-900 pb-4 mb-6">
        <div>
            <h1 class="text-2xl font-black text-blue-900 tracking-tight">BUKTI PENERIMAAN ELEKTRONIK (BPE)</h1>
            <p class="text-xs font-bold text-yellow-600 mt-1 uppercase tracking-wide">PELAPORAN SPT MASA & TAHUNAN WAJIB PAJAK</p>
        </div>
        <div class="text-right">
            <h2 class="text-lg font-black text-slate-900">PalakOnline</h2>
            <p class="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Kementerian Keuangan RI</p>
        </div>
    </div>
    
    <div class="space-y-6 text-xs text-slate-800 leading-relaxed">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
                <span class="text-[9px] text-slate-400 font-extrabold block uppercase tracking-wider mb-2">Identitas Kepatuhan Wajib Pajak</span>
                <p class="font-extrabold text-sm text-slate-900 leading-tight">${wpName}</p>
                <p class="font-mono text-blue-900 font-bold mt-1 text-xs">NPWP: ${loginNpwp}</p>
                <p class="text-zinc-500 mt-1 font-semibold">${wpEmail}</p>
                <p class="text-zinc-400 mt-0.5 text-[10px]">${wpPhone}</p>
            </div>
            <div class="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
                <span class="text-[9px] text-slate-400 font-extrabold block uppercase tracking-wider mb-2">Arsip Dokumen Pelaporan</span>
                <p class="font-extrabold text-sm text-slate-900">Tahun Pajak Lapor: ${s.year}</p>
                <p class="font-bold text-blue-900 mt-1">Jenis Form / Konsep: <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10.5px]">${s.sptType}</span></p>
                <p class="text-zinc-500 font-semibold mt-1">Status Laporan: ${s.pembetulanKe && s.pembetulanKe > 0 ? 'Pembetulan ke-' + s.pembetulanKe : 'Normal - Nihil'}</p>
            </div>
        </div>

        <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div class="bg-blue-900 text-white px-5 py-3 font-bold text-xs tracking-wider">
                RINCIAN ANGKA KEUANGAN SPT YANG DILAPORKAN
            </div>
            <div class="p-5 space-y-3 font-semibold text-slate-700">
                <div class="flex justify-between border-b border-slate-100 pb-2">
                    <span class="text-zinc-500">Peredaran Bruto Setahun (Omzet):</span>
                    <span class="font-extrabold text-slate-900">${formatRupiah(s.grossIncome)}</span>
                </div>
                <div class="flex justify-between border-b border-slate-100 pb-2">
                    <span class="text-zinc-500">Penghasilan Neto Fiskal Terhitung:</span>
                    <span class="text-slate-900">${formatRupiah(s.netIncome)}</span>
                </div>
                <div class="flex justify-between font-black text-blue-900 pt-2 text-sm">
                    <span>Jumlah Pajak Terbayar Lunas:</span>
                    <span class="text-lg text-blue-900 font-black">${formatRupiah(s.taxPaid)}</span>
                </div>
            </div>
        </div>

        <div class="border border-amber-200 bg-amber-50/60 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <p class="font-extrabold text-amber-900 text-xs uppercase tracking-wider">Tanda Terima &amp; Verifikasi Digital</p>
                <p class="text-[10px] text-zinc-650 mt-1">Laporan SPT ini telah diserahkan lewat sistem PalakOnline dan sah diakui oleh Ditjen Pajak.</p>
                <p class="text-[11px] font-mono font-black text-blue-900 mt-2 block tracking-wider">NAMA REKENING TOKEN: ${s.receiptToken || 'BPE-' + Math.floor(10000000 + Math.random() * 90000000)}</p>
            </div>
            <div class="text-center bg-blue-950 text-white rounded-xl p-3 px-5 font-black text-xs shrink-0 select-none uppercase tracking-widest border border-blue-900 shadow-xs">
                STATUS:<br/><span class="text-yellow-400 font-black">SUDAH LAPOR</span>
            </div>
        </div>
    </div>
    
    <div class="text-center mt-8 no-print pb-6">
        <button onclick="window.print()" class="bg-blue-900 hover:bg-indigo-950 text-white font-extrabold text-xs py-3 px-8 rounded-xl shadow-md transition-all flex items-center space-x-2 mx-auto">
            <span>Cetak / Ekspor PDF Sekarang</span>
        </button>
    </div>
    <script>
        window.onload = function() {
            setTimeout(function() { window.print(); }, 600);
        }
    </script>
</body>
</html>`;
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `E-SPT_Laporan_${s.year}_${s.sptType.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSystemToast(`E-SPT Laporan perpajakan ${s.sptType} Tahun ${s.year} berhasil diunduh!`);
  };

  const downloadBupot = (b: BuktiPotong) => {
    const htmlString = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Sertifikat_Bupot_${b.bupotNumber}.html</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #ffffff; }
        @media print { .no-print { display: none !important; } }
    </style>
</head>
<body class="p-8 max-w-4xl mx-auto border border-slate-300 my-8 shadow-md">
    <div class="flex items-center justify-between border-b-4 border-blue-900 pb-4 mb-6">
        <div>
            <h1 class="text-2xl font-black text-blue-900 tracking-tight">BUKTI PEMOTONGAN PAJAK PENGHASILAN (BUPOT)</h1>
            <p class="text-xs font-mono font-bold text-yellow-600 mt-1">NOMOR TRANSAKSI BUPOT: ${b.bupotNumber}</p>
        </div>
        <div class="text-right">
            <h2 class="text-lg font-black text-slate-900">PalakOnline</h2>
            <p class="text-[9px] text-zinc-500 uppercase tracking-widest font-black">e-Bupot Unifikasi Terpadu</p>
        </div>
    </div>
    
    <div class="space-y-6 text-xs text-slate-800 leading-relaxed">
        <div class="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
            <h3 class="font-extrabold text-blue-800 mb-3 uppercase tracking-wider text-[11px] flex items-center">
                <span class="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span>
                Agen Pemotong Pajak / Instansi Penyetor
            </h3>
            <table class="w-full text-left font-medium">
                <tr><td class="w-1/3 py-1 text-slate-500 font-bold">Nama Pemegang Usaha:</td><td class="py-1 text-slate-900 font-bold">${wpName}</td></tr>
                <tr><td class="w-1/3 py-1 text-slate-500 font-bold">NPWP / NIK Pemotong:</td><td class="py-1 text-slate-900 font-mono font-bold">${loginNpwp}</td></tr>
                <tr><td class="w-1/3 py-1 text-slate-500 font-bold">Alamat Resmi:</td><td class="py-1 text-slate-600">${wpAddress}</td></tr>
            </table>
        </div>

        <div class="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
            <h3 class="font-extrabold text-blue-800 mb-3 uppercase tracking-wider text-[11px] flex items-center">
                <span class="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span>
                Daftar Wajib Pajak Penerima Pemotongan
            </h3>
            <table class="w-full text-left font-medium">
                <tr><td class="w-1/3 py-1 text-slate-500 font-bold">Nama Penerima Penghasilan:</td><td class="py-1 text-slate-900 font-bold">${b.recipientName}</td></tr>
                <tr><td class="w-1/3 py-1 text-slate-500 font-bold">NPWP / NIK Penerima:</td><td class="py-1 text-slate-900 font-mono font-bold">${b.recipientNpwp}</td></tr>
            </table>
        </div>

        <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div class="bg-blue-900 text-white px-5 py-3 font-bold text-xs tracking-wider">
                RINCIAN OBJEK PAJAK & JUMLAH PENYETORAN PPh
            </div>
            <div class="p-5 space-y-3 font-semibold text-slate-700 bg-white">
                <div class="flex justify-between border-b border-slate-100 pb-2">
                    <span class="text-zinc-500">Kode Objek Pajak / Keterangan Jasa:</span>
                    <span class="text-slate-900 font-bold">${b.objekPajak}</span>
                </div>
                <div class="flex justify-between border-b border-slate-100 pb-2">
                    <span class="text-zinc-500">Jumlah Pendapatan Bruto (DPP):</span>
                    <span class="text-slate-900">${formatRupiah(b.grossAmount)}</span>
                </div>
                <div class="flex justify-between border-b border-slate-100 pb-2">
                    <span class="text-zinc-500">Tarif Efektif PPh Dipotong:</span>
                    <span class="text-slate-950 font-mono">${b.taxRate}%</span>
                </div>
                <div class="flex justify-between font-black text-blue-900 pt-2 text-sm">
                    <span>Jumlah PPh Dipotong / Dipungut:</span>
                    <span class="text-lg text-blue-900 font-black">${formatRupiah(b.taxAmount)}</span>
                </div>
            </div>
        </div>

        <div class="bg-blue-50 border border-blue-105 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <p class="font-extrabold text-blue-900 text-[12px] uppercase tracking-wider">Sertifikasi e-Bupot Terbit</p>
                <p class="text-[10px] text-zinc-650 mt-1">Dokumen ini adalah salinan resmi bukti potong wajib pajak yang sah terbukti dalam ekosistem PalakOnline.</p>
                <p class="text-[10px] font-bold text-slate-650 mt-2">DITERBITKAN TANGGAL: ${b.date} | KATEGORI: ${b.bupotType}</p>
            </div>
            <span class="bg-yellow-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs tracking-widest shrink-0 uppercase shadow-xs">
                POTONGAN NEGARA
            </span>
        </div>
    </div>
    
    <div class="text-center mt-8 no-print pb-6">
        <button onclick="window.print()" class="bg-blue-900 hover:bg-indigo-950 text-white font-extrabold text-xs py-3 px-8 rounded-xl shadow-md transition-all flex items-center space-x-2 mx-auto">
            <span>Cetak / Ekspor PDF Sekarang</span>
        </button>
    </div>
    <script>
        window.onload = function() {
            setTimeout(function() { window.print(); }, 600);
        }
    </script>
</body>
</html>`;
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `E-Bupot_${b.bupotNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSystemToast(`E-Bupot ${b.bupotNumber} berhasil diunduh sebagai formulir resmi!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCaptchaValue('');
    generateNewCheckCode();
    showSystemToast('Telah keluar dengan aman dari sesi Coretax.');
  };

  const switchActiveAccount = (npwp: string) => {
    const target = accounts.find(acc => acc.npwp === npwp);
    if (target) {
      setLoginNpwp(target.npwp);
      setWpName(target.name);
      setWpEmail(target.email);
      setWpPhone(target.phone);
      setWpAddress(target.address);
      setLoginPassword(target.password);
      showSystemToast(`Berhasil beralih akun ke Wajib Pajak: "${target.name}"`);
    }
  };

  const handleProfileCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNpwp = profNpwp.replace(/\D/g, '');
    if (cleanNpwp.length < 15) {
      showSystemToast('Format NIK/NPWP tidak valid (minimal 15 Digit)!');
      return;
    }
    if (accounts.some(a => a.npwp === cleanNpwp)) {
      showSystemToast('NPWP tersebut sudah terdaftar!');
      return;
    }
    if (!profName.trim()) {
      showSystemToast('Nama Wajib Pajak tidak boleh kosong.');
      return;
    }

    const newWpAcc = {
      npwp: cleanNpwp,
      name: profName.trim().toUpperCase(),
      email: profEmail.trim().toLowerCase() || 'user@pajak.go.id',
      phone: profPhone.trim() || '+62811111111',
      address: profAddress.trim() || 'Alamat Kepatuhan Perpajakan, Indonesia',
      password: profPassword || 'pajak123'
    };

    setAccounts(prev => [...prev, newWpAcc]);

    // Instantly switch context to the newly created account!
    setLoginNpwp(newWpAcc.npwp);
    setWpName(newWpAcc.name);
    setWpEmail(newWpAcc.email);
    setWpPhone(newWpAcc.phone);
    setWpAddress(newWpAcc.address);
    setLoginPassword(newWpAcc.password);

    // Reset local form states
    setProfNpwp('');
    setProfName('');
    setProfEmail('');
    setProfPhone('');
    setProfAddress('');
    setProfPassword('pajak123');

    showSystemToast(`Akun Baru Berhasil Dibuat & Diaktifkan: "${newWpAcc.name}"`);
  };

  const deleteAccountFromProfile = (npwp: string) => {
    if (npwp === '9988660000005153') {
      showSystemToast('Akun bawaan sistem Vivian tidak dapat dihapus!');
      return;
    }
    setAccounts(prev => prev.filter(acc => acc.npwp !== npwp));
    showSystemToast('Akun wajib pajak berhasil dihapus.');
    
    // Switch to Vivian's account if the active account is deleted
    if (loginNpwp === npwp) {
      const match = '9988660000005153';
      const target = accounts.find(acc => acc.npwp === match);
      if (target) {
        setLoginNpwp(target.npwp);
        setWpName(target.name);
        setWpEmail(target.email);
        setWpPhone(target.phone);
        setWpAddress(target.address);
        setLoginPassword(target.password);
      }
    }
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Calculations
  const getAccumulatedTurnover = () => {
    return umkmRecords.reduce((total, item) => total + item.turnover, 0);
  };

  const getUnpaidTaxTotal = () => {
    return umkmRecords
      .filter(item => item.status === 'Belum Bayar')
      .reduce((total, item) => total + item.taxDue, 0);
  };

  const getPaidTaxTotal = () => {
    return umkmRecords
      .filter(item => item.status === 'Lunas')
      .reduce((total, item) => total + item.taxDue, 0);
  };

  // Create / Update Faktur Submit
  const handleFakturSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(fAmount);
    if (!fBuyerName || fBuyerNpwp.length < 15 || isNaN(amount) || amount <= 0) {
      showSystemToast('Mohon periksa kembali kelengkapan data Faktur!');
      return;
    }

    const computedPpn = Math.round(amount * 0.11);

    if (editingFaktur) {
      setFakturs(prev => prev.map(f => f.id === editingFaktur.id ? {
        ...f,
        buyerName: fBuyerName,
        buyerNpwp: fBuyerNpwp,
        productDescription: fDesc,
        amount: amount,
        ppnAmount: computedPpn,
      } : f));
      showSystemToast(`Faktur Pajak ${editingFaktur.fakturNumber} berhasil diperbarui!`);
      setEditingFaktur(null);
    } else {
      const newNo = `010.000-26.${String(526 + fakturs.length).padStart(8, '0')}`;
      const newFaktur: FakturPajak = {
        id: `f_${Date.now()}`,
        fakturNumber: newNo,
        date: new Date().toISOString().split('T')[0],
        buyerName: fBuyerName,
        buyerNpwp: fBuyerNpwp,
        productDescription: fDesc,
        amount: amount,
        ppnAmount: computedPpn,
        status: 'Terbit'
      };
      setFakturs([newFaktur, ...fakturs]);
      showSystemToast(`Faktur Pajak ${newNo} berhasil diterbitkan & divalidasi!`);
    }

    setFBuyerName('');
    setFBuyerNpwp('');
    setFDesc('');
    setFAmount('');
    setFPpn(0);
    setFFormOpen(false);
  };

  const deleteFaktur = (id: string, no: string) => {
    setFakturs(prev => prev.filter(f => f.id !== id));
    showSystemToast(`Faktur Pajak ${no} berhasil dihapus.`);
  };

  const startEditFaktur = (f: FakturPajak) => {
    setEditingFaktur(f);
    setFBuyerName(f.buyerName);
    setFBuyerNpwp(f.buyerNpwp);
    setFDesc(f.productDescription);
    setFAmount(f.amount.toString());
    setFPpn(f.ppnAmount);
    setFFormOpen(true);
    setPortalTab('faktur');
  };

  const onFakturAmountChange = (val: string) => {
    setFAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setFPpn(Math.round(parsed * 0.11));
    } else {
      setFPpn(0);
    }
  };

  // E-Filing calculations
  const calculateSptWizard = () => {
    const grossVal = parseFloat(sGross);
    if (isNaN(grossVal) || grossVal <= 0) {
      showSystemToast('Silakan isi nominal penghasilan kotor terlebih dahulu!');
      return;
    }

    // Usahawan: has Rp 500 Million non-taxable (NPT) for WPOP 
    const taxableTotal = Math.max(0, grossVal - 500000000);
    const taxComputed = Math.round(taxableTotal * 0.005);

    setSptPreviewData({
      gross: grossVal,
      taxable: taxableTotal,
      due: taxComputed
    });
    setSptStep(3);
  };

  const requestSptCodeCode = () => {
    const randomCode = String(Math.floor(1000 + Math.random() * 9000));
    setSOtpCode(randomCode);
    showSystemToast(`Kode Verifikasi Pajak terkirim otomatis: ${randomCode}`);
  };

  const submitSptForm = () => {
    if (!sOtpCode) {
      showSystemToast('Keberatan: Silakan minta dan input kode verifikasi OTP!');
      return;
    }

    const bpeToken = `BPE-${Math.floor(10000000 + Math.random() * 90000000)}`;

    if (editingSpt) {
      const currentPembetulan = (editingSpt.pembetulanKe || 0) + 1;
      const updatedSpt: SptReport = {
        ...editingSpt,
        year: sFormYear,
        sptType: sFormType,
        grossIncome: sptPreviewData?.gross || 0,
        netIncome: Math.round((sptPreviewData?.gross || 0) * 0.4),
        taxPaid: sptPreviewData?.due || 0,
        pembetulanKe: currentPembetulan,
        dateReported: new Date().toISOString().split('T')[0],
        receiptToken: bpeToken
      };

      setSpts(prev => prev.map(s => s.id === editingSpt.id ? updatedSpt : s));
      setEditingSpt(null);
      setSptStep(1);
      setSGross('');
      setSOtpCode('');
      setSptPreviewData(null);
      showSystemToast(`Sukses Lapor! SPT Tahunan ${sFormYear} Pembetulan ke-${currentPembetulan} Berhasil.`);

      setReceiptModel({
        tokenId: bpeToken,
        wpName: wpName,
        wpNpwp: loginNpwp,
        serviceName: `Penyampaian SPT Tahunan Form ${updatedSpt.sptType} Pembetulan ke-${currentPembetulan}`,
        periodText: `Tahun Buku ${updatedSpt.year}`,
        reportedAmount: updatedSpt.grossIncome,
        finalTax: updatedSpt.taxPaid,
        methodText: 'DJP Coretax E-Filer Engine'
      });
      setBpeModalOpen(true);
    } else {
      if (spts.some(s => s.year === sFormYear)) {
        showSystemToast(`Informasi: SPT Tahun ${sFormYear} sudah pernah dilaporkan.`);
      }

      const newReport: SptReport = {
        id: `spt_${Date.now()}`,
        year: sFormYear,
        sptType: sFormType,
        grossIncome: sptPreviewData?.gross || 0,
        netIncome: Math.round((sptPreviewData?.gross || 0) * 0.4),
        taxPaid: sptPreviewData?.due || 0,
        status: 'Sudah Lapor',
        pembetulanKe: 0,
        dateReported: new Date().toISOString().split('T')[0],
        receiptToken: bpeToken
      };

      setSpts([newReport, ...spts]);
      setSptStep(1);
      setSGross('');
      setSOtpCode('');
      setSptPreviewData(null);
      showSystemToast(`Sukses Lapor! SPT Tahunan ${sFormYear} berhasil diproses!`);

      setReceiptModel({
        tokenId: bpeToken,
        wpName: wpName,
        wpNpwp: loginNpwp,
        serviceName: `Penyampaian SPT SPT Tahunan Form ${newReport.sptType} Normal`,
        periodText: `Tahun Buku ${newReport.year}`,
        reportedAmount: newReport.grossIncome,
        finalTax: newReport.taxPaid,
        methodText: 'DJP Coretax E-Filer Engine'
      });
      setBpeModalOpen(true);
    }
  };

  const deleteSpt = (id: string, year: string) => {
    setSpts(prev => prev.filter(s => s.id !== id));
    showSystemToast(`Laporan SPT Tahunan ${year} berhasil dihapus.`);
  };

  const getEstimatedTaxForType = (type: string, gross: number, net: number): number => {
    switch (type) {
      case 'PPN':
        return Math.round(gross * 0.11);
      case 'PPN Bagi PKP yang Menggunakan Pedoman Penghitungan Pengkreditan Pajak Masukan':
        return Math.round(gross * 0.022);
      case 'PPh Badan':
      case 'PPh Badan Dolar Amerika Serikat':
        return Math.round(net * 0.22);
      case 'PPh Final Pengungkapan Harta Bersih':
        return Math.round(gross * 0.12);
      case 'PPh Pasal 21/26':
        return Math.round(gross * 0.05);
      case 'PPh Pasal 25 bagi BUMN/BUMD':
        return Math.round(net * 0.02);
      case 'PPh Pasal 25 bagi Bank':
        return Math.round(net * 0.025);
      case 'PPh Pasal 25 bagi Wajib Pajak Masuk Bursa atau Wajib Pajak Lainnya':
        return Math.round(net * 0.015);
      case 'PPh Unifikasi':
        return Math.round(gross * 0.02);
      default:
        return Math.round(gross * 0.005);
    }
  };

  const saveAsConceptSpt = (draftStatus: string) => {
    const grossVal = parseFloat(conceptGross) || 0;
    const netVal = parseFloat(conceptNet) || 0;
    const computedTax = getEstimatedTaxForType(conceptSptType, grossVal, netVal);
    const bpeToken = draftStatus === 'Sudah Lapor' ? `BPE-${Math.floor(10000000 + Math.random() * 90000000)}` : undefined;

    const newSpt: SptReport = {
      id: `spt_concept_${Date.now()}`,
      year: conceptSptYear,
      sptType: conceptSptType,
      grossIncome: grossVal,
      netIncome: netVal,
      taxPaid: computedTax,
      status: draftStatus, // 'Draft', 'Menunggu Pembayaran', 'Sudah Lapor'
      pembetulanKe: conceptPembetulan,
      dateReported: draftStatus === 'Sudah Lapor' ? new Date().toISOString().split('T')[0] : undefined,
      receiptToken: bpeToken
    };

    setSpts([newSpt, ...spts]);
    setConceptSptStep(1);
    setConceptGross('');
    setConceptNet('');
    setConceptOtpCode('');
    
    if (draftStatus === 'Draft') {
      showSystemToast(`Konsep SPT "${conceptSptType}" berhasil disimpan ke Draft!`);
      setSptSubTab('draft');
    } else if (draftStatus === 'Menunggu Pembayaran') {
      showSystemToast(`Billing Code Terbit! SPT "${conceptSptType}" dipindahkan ke Menunggu Pembayaran.`);
      setSptSubTab('unpaid');
    } else {
      showSystemToast(`SPT "${conceptSptType}" berhasil dilaporkan langsung.`);
      setSptSubTab('reported');
      if (bpeToken) {
        setReceiptModel({
          tokenId: bpeToken,
          wpName: wpName,
          wpNpwp: loginNpwp,
          serviceName: `Penyampaian SPT ${newSpt.sptType} Normal`,
          periodText: `${conceptSptMonth} ${newSpt.year}`,
          reportedAmount: newSpt.grossIncome,
          finalTax: newSpt.taxPaid,
          methodText: 'DJP Coretax E-Filer Engine'
        });
        setBpeModalOpen(true);
      }
    }
  };

  const processUnpaidSptPayment = (spt: SptReport) => {
    const bpeToken = `BPE-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setSpts(prev => prev.map(item => item.id === spt.id ? {
      ...item,
      status: 'Sudah Lapor',
      dateReported: new Date().toISOString().split('T')[0],
      receiptToken: bpeToken
    } : item));

    showSystemToast(`Pembayaran Sukses! SPT "${spt.sptType}" berhasil dilaporkan.`);
    setSptSubTab('reported');
    setReceiptModel({
      tokenId: bpeToken,
      wpName: wpName,
      wpNpwp: loginNpwp,
      serviceName: `Penyampaian SPT ${spt.sptType} Normal`,
      periodText: `Masa/Tahun Buku ${spt.year}`,
      reportedAmount: spt.grossIncome,
      finalTax: spt.taxPaid,
      methodText: 'Pembayaran Billing NTPN DJP'
    });
    setBpeModalOpen(true);
  };

  const promoteDraftToBillingOrReport = (spt: SptReport, newStatus: string) => {
    const bpeToken = newStatus === 'Sudah Lapor' ? `BPE-${Math.floor(10000000 + Math.random() * 90000000)}` : undefined;
    setSpts(prev => prev.map(item => item.id === spt.id ? {
      ...item,
      status: newStatus,
      dateReported: newStatus === 'Sudah Lapor' ? new Date().toISOString().split('T')[0] : undefined,
      receiptToken: bpeToken
    } : item));

    if (newStatus === 'Menunggu Pembayaran') {
      showSystemToast(`Konsep SPT berhasil diterbitkan kode billing-nya.`);
      setSptSubTab('unpaid');
    } else if (newStatus === 'Sudah Lapor') {
      showSystemToast(`Konsep SPT berhasil dilaporkan.`);
      setSptSubTab('reported');
      if (bpeToken) {
        setReceiptModel({
          tokenId: bpeToken,
          wpName: wpName,
          wpNpwp: loginNpwp,
          serviceName: `Penyampaian SPT ${spt.sptType} Normal`,
          periodText: `Tahun Buku ${spt.year}`,
          reportedAmount: spt.grossIncome,
          finalTax: spt.taxPaid,
          methodText: 'DJP Coretax E-Filer Engine'
        });
        setBpeModalOpen(true);
      }
    }
  };

  const startPembetulanSpt = (s: SptReport) => {
    setEditingSpt(s);
    setSFormYear(s.year);
    setSFormType(s.sptType);
    setSGross(s.grossIncome.toString());
    const taxableTotal = Math.max(0, s.grossIncome - 500000000);
    const taxComputed = Math.round(taxableTotal * 0.005);
    setSptPreviewData({
      gross: s.grossIncome,
      taxable: taxableTotal,
      due: taxComputed
    });
    setSptStep(1);
    setPortalTab('spt');
    showSystemToast(`Mengedit SPT Tahun ${s.year} - Modus Pembetulan.`);
  };

  // DELETE & EDIT Bupot
  const deleteBupot = (id: string, num: string) => {
    setBupots(prev => prev.filter(b => b.id !== id));
    showSystemToast(`Bukti Pemotongan No ${num} berhasil dihapus.`);
  };

  const startEditBupot = (b: BuktiPotong) => {
    setEditingBupot(b);
    setBupotTypeSel(b.bupotType);
    setBupotRecipientName(b.recipientName);
    setBupotRecipientNpwp(b.recipientNpwp);
    setBupotObjekPajak(b.objekPajak);
    setBupotGross(b.grossAmount.toString());
    
    // Map existing or generate dummy reference document data when editing
    setBupotRefDocNo(`REF-${b.bupotNumber}`);
    setBupotRefDocDate(b.date);
    
    // Re-trigger calculation
    const currentOptions = OBJ_PAJAK_MAP[b.bupotType] || OBJ_PAJAK_MAP['BP 21 - Bukti Pemotongan Selain Pegawai Tetap'];
    const activeOption = currentOptions.find(o => o.name === b.objekPajak) || currentOptions[0];
    const computedTax = Math.round(b.grossAmount * (activeOption.deemedRate / 100) * (activeOption.tarif / 100));
    setBupotCalcTax(computedTax);
    
    setBupotFormOpen(true);
    setPortalTab('bupot');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBupotSelectFromNav = (selectedType: string) => {
    setPortalTab('bupot');
    setBupotTypeSel(selectedType);
    setBupotFormOpen(true);
    
    // Automatically select the first option of Objek Pajak options for this selected type!
    const options = OBJ_PAJAK_MAP[selectedType] || OBJ_PAJAK_MAP['BP 21 - Bukti Pemotongan Selain Pegawai Tetap'];
    if (options && options.length > 0) {
      setBupotObjekPajak(options[0].name);
      
      // Reset details based on initial choice
      const parsedGross = parseFloat(bupotGross);
      if (!isNaN(parsedGross) && parsedGross > 0) {
        const computedTax = Math.round(parsedGross * (options[0].deemedRate / 100) * (options[0].tarif / 100));
        setBupotCalcTax(computedTax);
      } else {
        setBupotCalcTax(0);
      }
    }
    
    // Smooth scroll to form if needed
    window.scrollTo({ top: 120, behavior: 'smooth' });
    showSystemToast(`Membuka formulir Perekaman e-Bupot: ${selectedType}`);
  };

  const handleSearchLawanTransaksi = () => {
    if (!bupotRecipientNpwp || bupotRecipientNpwp.length < 15) {
      showSystemToast('Masukkan NPWP Lawan Transaksi minimal 15 digit!');
      return;
    }
    
    // List of mock company names
    const companies = [
      'PT Sinergi Mandiri Utama',
      'PT Makmur Cipta Sentosa',
      'CV Global Solusindo Nusantara',
      'PT Kharisma Graha Kreatif',
      'PT Indo Pratama Digital',
      'CV Mega Karya Persada',
      'PT Sinar Abadi Logistics',
      'PT Astra Multi Industri'
    ];
    
    // Consistently resolve NPWP to a company index
    const sum = bupotRecipientNpwp.split('').reduce((acc, char) => acc + (parseInt(char) || 0), 0);
    const index = sum % companies.length;
    const resolvedName = companies[index];
    
    setBupotRecipientName(resolvedName);
    showSystemToast(`Lawan Transaksi ditemukan: ${resolvedName} (Kredensial Valid)`);
  };

  const handleBupotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleBupotSubmitCustom(e, 'Terbit');
  };

  const handleBupotSubmitCustom = (e: React.FormEvent, submitStatus: 'Terbit' | 'Draft' = 'Terbit') => {
    if (e) e.preventDefault();
    const grossVal = parseFloat(bupotGross);
    if (!bupotRecipientName || bupotRecipientNpwp.length < 15 || isNaN(grossVal) || grossVal <= 0) {
      showSystemToast('Mohon periksa kembali kelengkapan data Bukti Potong!');
      return;
    }

    // Capture currently computed active tax
    const currentOptions = OBJ_PAJAK_MAP[bupotTypeSel] || OBJ_PAJAK_MAP['BP 21 - Bukti Pemotongan Selain Pegawai Tetap'];
    const activeOption = currentOptions.find(o => o.name === bupotObjekPajak) || currentOptions[0];
    const computedTax = Math.round(grossVal * (activeOption.deemedRate / 100) * (activeOption.tarif / 100));

    if (editingBupot) {
      setBupots(prev => prev.map(b => b.id === editingBupot.id ? {
        ...b,
        bupotType: bupotTypeSel,
        recipientName: bupotRecipientName,
        recipientNpwp: bupotRecipientNpwp,
        objekPajak: bupotObjekPajak,
        grossAmount: grossVal,
        taxRate: activeOption.tarif,
        taxAmount: computedTax,
        status: submitStatus
      } : b));
      showSystemToast(`Bukti Potong ${editingBupot.bupotNumber} berhasil diperbarui sebagai ${submitStatus}!`);
      setEditingBupot(null);
    } else {
      const abbreviation = bupotTypeSel.split(' ')[0] || 'BP';
      const nextNo = `${abbreviation}-${String(100 + bupots.length).padStart(3, '0')}-${String(26).padStart(2, '0')}-${String(100000 + bupots.length).padStart(6, '0')}`;
      const newBupot: BuktiPotong = {
        id: `bp_${Date.now()}`,
        bupotType: bupotTypeSel,
        bupotNumber: nextNo,
        date: new Date().toISOString().split('T')[0],
        recipientName: bupotRecipientName,
        recipientNpwp: bupotRecipientNpwp,
        objekPajak: bupotObjekPajak,
        grossAmount: grossVal,
        taxRate: activeOption.tarif,
        taxAmount: computedTax,
        status: submitStatus
      };
      setBupots([newBupot, ...bupots]);
      showSystemToast(`Bukti Potong ${nextNo} berhasil disimpan sebagai ${submitStatus}!`);
    }

    // Reset Form
    setBupotRecipientName('');
    setBupotRecipientNpwp('');
    setBupotGross('');
    setBupotCalcTax(0);
    setBupotFormOpen(false);
  };

  const onBupotGrossChange = (val: string, rateStr: string) => {
    setBupotGross(val);
    const parsedGross = parseFloat(val);
    const parsedRate = parseFloat(rateStr);
    if (!isNaN(parsedGross) && !isNaN(parsedRate)) {
      setBupotCalcTax(Math.round(parsedGross * (parsedRate / 100)));
    } else {
      setBupotCalcTax(0);
    }
  };

  const onBupotRateChange = (rateStr: string, grossStr: string) => {
    setBupotRate(rateStr);
    const parsedGross = parseFloat(grossStr);
    const parsedRate = parseFloat(rateStr);
    if (!isNaN(parsedGross) && !isNaN(parsedRate)) {
      setBupotCalcTax(Math.round(parsedGross * (parsedRate / 100)));
    } else {
      setBupotCalcTax(0);
    }
  };

  // Monthly 0.5% calculation handles
  const computeMonthlyUmkmPph = (e: React.FormEvent) => {
    e.preventDefault();
    const gross = parseFloat(umkmGross);
    if (isNaN(gross) || gross <= 0) {
      showSystemToast('Masukkan nominal omset kotor bulanan bernilai positif!');
      return;
    }

    const currentAccum = getAccumulatedTurnover();
    let dpp = 0;

    if (currentAccum >= TAX_FREE_LIMIT) {
      dpp = gross;
    } else if (currentAccum + gross > TAX_FREE_LIMIT) {
      dpp = (currentAccum + gross) - TAX_FREE_LIMIT;
    } else {
      dpp = 0;
    }

    const rawTaxDue = Math.round(dpp * 0.005);

    const mockupRecord: TaxRecord = {
      id: editingUmkm ? editingUmkm.id : `u_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      period: `${umkmDay} ${umkmMonth} ${umkmYear}`,
      turnover: gross,
      taxableAmount: dpp,
      taxDue: rawTaxDue,
      status: 'Belum Bayar',
      billingCode: editingUmkm?.billingCode || `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9050)}-500`
    };

    setUmkmCalcResult(mockupRecord);
  };

  const startEditUmkm = (rec: TaxRecord) => {
    setEditingUmkm(rec);
    const parts = rec.period.split(' ');
    if (parts.length === 3) {
      setUmkmDay(parts[0]);
      setUmkmMonth(parts[1]);
      setUmkmYear(parts[2]);
    } else if (parts.length === 2) {
      setUmkmDay('01');
      setUmkmMonth(parts[0]);
      setUmkmYear(parts[1]);
    }
    setUmkmGross(rec.turnover.toString());
    const mockupRecord: TaxRecord = {
      ...rec,
      turnover: rec.turnover,
      taxableAmount: rec.taxableAmount,
      taxDue: rec.taxDue,
    };
    setUmkmCalcResult(mockupRecord);
    setPortalTab('umkm');
    showSystemToast(`Mengedit Catatan UMKM Masa ${rec.period}.`);
  };

  const laporAndEnrollUmkmRecord = () => {
    if (!umkmCalcResult) return;

    let updated = [...umkmRecords];
    const isTaxFree = umkmCalcResult.taxDue === 0;

    if (editingUmkm) {
      updated = updated.map(r => r.id === editingUmkm.id ? {
        ...r,
        turnover: umkmCalcResult.turnover,
        taxableAmount: umkmCalcResult.taxableAmount,
        taxDue: umkmCalcResult.taxDue,
        status: isTaxFree ? 'Lunas' : r.status,
        paymentMethod: isTaxFree ? 'Fasilitas Pajak (PP 55)' : r.paymentMethod,
        paymentDate: isTaxFree ? new Date().toISOString().split('T')[0] : r.paymentDate
      } : r);
      setUmkmRecords(updated);
      showSystemToast(`Catatan Masa ${umkmCalcResult.period} berhasil diperbarui!`);
      setEditingUmkm(null);
    } else {
      const index = umkmRecords.findIndex(r => r.period === umkmCalcResult.period);
      const finalRec: TaxRecord = {
        ...umkmCalcResult,
        status: isTaxFree ? 'Lunas' : 'Belum Bayar',
        paymentMethod: isTaxFree ? 'Fasilitas Pajak (PP 55)' : undefined,
        paymentDate: isTaxFree ? new Date().toISOString().split('T')[0] : undefined
      };

      if (index !== -1) {
        updated[index] = finalRec;
      } else {
        updated.push(finalRec);
      }

      setUmkmRecords(updated);
      showSystemToast(`Masa Lapor ${finalRec.period} terdaftar dengan status ${finalRec.status}!`);

      if (!isTaxFree) {
        setPayingRecord(finalRec);
        setPayMethod('QRIS');
        setQrModalOpen(true);
      }
    }

    setUmkmCalcResult(null);
    setUmkmGross('');
  };

  // Paying action
  const openPaymentForId = (rec: TaxRecord) => {
    setPayingRecord(rec);
    setPayMethod('QRIS');
    setQrModalOpen(true);
  };

  const confirmPayingBillPayment = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const ntpnGen = `NTPN${Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;

    if (payingBilling) {
      // Settle custom billing
      setBillings(prev => prev.map(item => {
        if (item.id === payingBilling.id) {
          return {
            ...item,
            status: 'Lunas' as const,
            ntpn: ntpnGen,
            datePaid: todayStr
          };
        }
        return item;
      }));

      // Add a KREDIT entry to Buku Besar (Ledger)
      setLedger(prev => {
        const lastEntry = prev[prev.length - 1];
        const prevBalance = lastEntry ? lastEntry.balance : 0;
        const newEntry: LedgerRecord = {
          id: `led-${Date.now()}`,
          date: todayStr,
          type: 'KREDIT',
          category: payingBilling.kapName,
          description: `Pelunasan ${payingBilling.kapName} Masa ${payingBilling.period} ${payingBilling.year} via ${payMethod}`,
          reference: `NTPN-${ntpnGen}`,
          debet: 0,
          kredit: payingBilling.amount,
          balance: prevBalance - payingBilling.amount
        };
        return [...prev, newEntry];
      });

      setQrModalOpen(false);
      const billingRef = payingBilling;
      setPayingBilling(null);

      showSystemToast(`Sukses! Pembayaran Billing ID ${billingRef.billingCode} senilai ${formatRupiah(billingRef.amount)} Berhasil.`);

      setReceiptModel({
        tokenId: `BPE-${Math.floor(10000000 + Math.random() * 90000000)}`,
        wpName: wpName,
        wpNpwp: loginNpwp,
        serviceName: `Penyetoran Pajak Surat Setoran ${billingRef.kapName}`,
        periodText: `${billingRef.period} ${billingRef.year}`,
        reportedAmount: billingRef.amount * 200, // representational gross turnover
        finalTax: billingRef.amount,
        methodText: payMethod === 'QRIS' ? 'Scan QRIS Instan' : 'Transfer Virtual Account Coretax'
      });
      
      setTimeout(() => {
        setBpeModalOpen(true);
      }, 400);

      return;
    }

    if (!payingRecord) return;

    // Standard UMKM records pay path
    setUmkmRecords(prev => prev.map(item => {
      if (item.id === payingRecord.id) {
        return {
          ...item,
          status: 'Lunas' as const,
          paymentMethod: payMethod === 'QRIS' ? 'QRIS Mandiri' : 'Virtual Account bank',
          paymentDate: todayStr
        };
      }
      return item;
    }));

    // Add a KREDIT entry to Buku Besar (Ledger) for PPh Final UMKM
    setLedger(prev => {
      const lastEntry = prev[prev.length - 1];
      const prevBalance = lastEntry ? lastEntry.balance : 0;
      const newEntry: LedgerRecord = {
        id: `led-${Date.now()}`,
        date: todayStr,
        type: 'KREDIT',
        category: 'PPh Final UMKM',
        description: `Penyetoran PPh Final Masa ${payingRecord.period}`,
        reference: `NTPN-${ntpnGen}`,
        debet: 0,
        kredit: payingRecord.taxDue,
        balance: prevBalance - payingRecord.taxDue
      };
      return [...prev, newEntry];
    });

    setQrModalOpen(false);
    showSystemToast(`Sukses! Pembayaran Masa Pajak ${payingRecord.period} telah Selesai.`);

    setReceiptModel({
      tokenId: `BPE-${Math.floor(10000000 + Math.random() * 90000000)}`,
      wpName: wpName,
      wpNpwp: loginNpwp,
      serviceName: `Penyetoran PPh Final Masa Pajak ${payingRecord.period}`,
      periodText: `Masa ${payingRecord.period}`,
      reportedAmount: payingRecord.turnover,
      finalTax: payingRecord.taxDue,
      methodText: payMethod === 'QRIS' ? 'Scan QRIS Instan' : 'Transfer Virtual Account Coretax'
    });
    
    setTimeout(() => {
      setBpeModalOpen(true);
    }, 400);
  };

  const deleteUmkmRecord = (id: string, name: string) => {
    setUmkmRecords(prev => prev.filter(r => r.id !== id));
    showSystemToast(`Catatan Masa ${name} berhasil dibuang.`);
  };

  // Historic displays
  const openHistoricalBpeFromUmkm = (rec: TaxRecord) => {
    setReceiptModel({
      tokenId: `BPE-${Math.floor(10000000 + Math.random() * 90000000)}`,
      wpName: wpName,
      wpNpwp: loginNpwp,
      serviceName: `Penyetoran PPh Final Masa Pajak ${rec.period}`,
      periodText: `Masa ${rec.period}`,
      reportedAmount: rec.turnover,
      finalTax: rec.taxDue,
      methodText: rec.paymentMethod || 'Metode PalakOnline Coretax'
    });
    setBpeModalOpen(true);
  };

  const openHistoricalBpeFromSpt = (rec: SptReport) => {
    setReceiptModel({
      tokenId: rec.receiptToken || 'BPE-DEFAULT',
      wpName: wpName,
      wpNpwp: loginNpwp,
      serviceName: `Penyampaian SPT SPT Tahunan Form ${rec.sptType} ${rec.pembetulanKe && rec.pembetulanKe > 0 ? 'Pembetulan ke-' + rec.pembetulanKe : 'Normal'}`,
      periodText: `Tahun Buku ${rec.year}`,
      reportedAmount: rec.grossIncome,
      finalTax: rec.taxPaid,
      methodText: 'DJP Coretax E-Filer Engine'
    });
    setBpeModalOpen(true);
  };

  // single file handles
  const downloadSingleHtml = () => {
    const finalName = isRegistering && regName ? regName : wpName;
    const finalNpwp = isRegistering ? (regNpwp || loginNpwp) : loginNpwp;
    const finalEmail = isRegistering && regEmail ? regEmail : wpEmail;
    const finalPhone = isRegistering && regPhone ? regPhone : wpPhone;
    const finalAddress = isRegistering && regAddress ? regAddress : wpAddress;

    const htmlString = generateSingleFileHtml(finalName, finalNpwp, finalEmail, finalPhone, finalAddress);
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `palakonline_coretax_${finalNpwp || 'simulasi'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSystemToast(`File HTML Coretax kustom siap diunduh!`);
  };

  const copyHtmlCodeString = () => {
    const finalName = isRegistering && regName ? regName : wpName;
    const finalNpwp = isRegistering ? (regNpwp || loginNpwp) : loginNpwp;
    const finalEmail = isRegistering && regEmail ? regEmail : wpEmail;
    const finalPhone = isRegistering && regPhone ? regPhone : wpPhone;
    const finalAddress = isRegistering && regAddress ? regAddress : wpAddress;

    const htmlString = generateSingleFileHtml(finalName, finalNpwp, finalEmail, finalPhone, finalAddress);
    navigator.clipboard.writeText(htmlString)
      .then(() => {
        setCopied(true);
        showSystemToast('Kode HTML berhasil disalin ke clipboard!');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        showSystemToast('Error: Gagal menyalin kode HTML.');
      });
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col font-sans select-none antialiased">
      
      {/* Absolute floating toast */}
      <AnimatePresence>
        {toastText && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-850 text-white rounded-2xl py-3.5 px-5 shadow-2xl flex items-center space-x-3 text-xs"
          >
            <div className="bg-emerald-500 rounded-full p-0.5 text-white">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-100">{toastText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar Switch Preview vs Code Downloader */}
      <div className="bg-slate-950 text-white py-2.5 px-4 text-[11.5px] border-b border-white/5 shadow-xs sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-500 text-white font-extrabold px-2 py-0.5 rounded text-[9.5px]">REFORM</span>
            <span className="font-medium text-slate-350">PalakOnline Simulasi Pajak Indonesia Simpel (Inspirasi Modern Coretax)</span>
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-auto">
            <button 
              onClick={() => setActiveTab('interactive')}
              className={`p-1.5 px-4 rounded-full transition-colors font-extrabold uppercase text-[10px] tracking-wider ${activeTab === 'interactive' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Simulasi Coretax
            </button>
            <button 
              onClick={() => setActiveTab('html-source')}
              className={`p-1.5 px-4 rounded-full transition-colors font-extrabold uppercase text-[10px] tracking-wider ${activeTab === 'html-source' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Download File HTML Tunggal
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ACTIVE SCREEN: INTERACTIVE PORTAL SIMULATION        */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'interactive' && (
        <div className="flex-grow flex flex-col">
          
          {/* LOGIN SCREEN IF NOT LOGGED IN */}
          {!isLoggedIn ? (
            <div className="flex-grow flex items-center justify-center py-10 md:py-16 px-4 bg-[#0f172a] relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
              
              <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative z-10">
                
                {/* LEFT COLUMN: THE LOGIN/REGISTER BOX (Col span 7 on md) */}
                <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-150 flex flex-col justify-between">
                  <div>
                    <div className="text-center space-y-2 mb-6">
                      <div className="mx-auto w-12 h-12 bg-blue-800 text-white rounded-2xl flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                        <Building className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">PalakOnline</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Edu-Simulasi Pajak Mandiri</p>
                      
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-yellow-100 text-yellow-850 border border-yellow-200">
                        {isRegistering ? 'Registrasi Akun Wajib Pajak Baru' : 'Akses PalakOnline Terintegrasi'}
                      </div>
                    </div>

                    {loginError && (
                      <div className="p-3 bg-rose-50 text-rose-800 rounded-xl border border-rose-100 flex items-start space-x-2 text-xs mb-4">
                        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    {isRegistering ? (
                      /* INDEPENDENT REGISTRATION FORM */
                      <form onSubmit={handleSimulatedRegister} className="space-y-4 text-xs font-semibold text-slate-700">
                        <p className="text-[10.5px] text-slate-400 text-center leading-relaxed">
                          Silakan daftarkan akun baru agar tidak otomatis memakai data Vivian.
                        </p>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">NPWP / NIK Baru (16 Digit)</label>
                          <input 
                            type="text" 
                            maxLength={16}
                            required 
                            value={regNpwp}
                            onChange={(e) => setRegNpwp(e.target.value.replace(/\D/g, ''))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-950 font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Contoh: 1200340056007890" 
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Nama Lengkap Wajib Pajak</label>
                          <input 
                            type="text" 
                            required 
                            value={regName}
                            onChange={(e) => setRegName(e.target.value.toUpperCase())}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-950 font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Nama dan Gelar Lengkap Anda" 
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Email Kepatuhan</label>
                            <input 
                              type="email" 
                              required
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-950"
                              placeholder="email@pajak.id" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">No. Handphone / WA</label>
                            <input 
                              type="text" 
                              required
                              value={regPhone}
                              onChange={(e) => setRegPhone(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-955"
                              placeholder="+62812345678" 
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Alamat Lengkap Terdaftar</label>
                          <textarea 
                            required
                            value={regAddress}
                            onChange={(e) => setRegAddress(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-950 font-medium h-14 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Nama jalan, RT/RW, kecamatan, kabupaten/kota, provinsi"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Kunci Sandi (Password)</label>
                          <input 
                            type="password" 
                            required 
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-950 font-black"
                            placeholder="pajak123" 
                          />
                        </div>

                        <div className="pt-2 flex gap-3">
                          <button 
                            type="button"
                            onClick={() => { setIsRegistering(false); setLoginError(null); }}
                            className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition"
                          >
                            Kembali
                          </button>
                          <button 
                            type="submit"
                            className="w-2/3 bg-blue-800 hover:bg-blue-900 border border-blue-950 font-extrabold py-2.5 rounded-xl text-xs text-white transition flex items-center justify-center space-x-1.5 shadow-sm"
                          >
                            <span>Daftar Akun</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* LOGIN FORM LAYOUT */
                      <form onSubmit={handleSimulatedLogin} className="space-y-4 text-xs font-medium">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">NPWP / NIK (16 Digit)</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                              <span className="text-[10px] font-extrabold font-mono text-slate-400">ID</span>
                            </div>
                            <input 
                              type="text" 
                              maxLength={16}
                              required 
                              value={loginNpwp}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setLoginNpwp(val);
                                const matchedAcc = accounts.find(a => a.npwp === val);
                                if (matchedAcc) {
                                  setLoginPassword(matchedAcc.password);
                                }
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 font-semibold text-slate-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="NIK / NPWP 16 Digit" 
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Kata Sandi</label>
                          <input 
                            type="password" 
                            required 
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-950 focus:bg-white focus:outline-none"
                            placeholder="•••••••••" 
                          />
                        </div>

                        {/* Security Captcha */}
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150 flex items-center justify-between gap-4">
                          <div className="space-y-1 shrink-0">
                            <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block font-sans">Kode Keamanan</span>
                            <div className="bg-blue-100 text-blue-800 text-xs font-black tracking-widest px-3 py-1 rounded select-none font-mono">
                              {displayCaptcha}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <input 
                              type="text" 
                              required 
                              value={captchaValue} 
                              onChange={(e) => setCaptchaValue(e.target.value)}
                              placeholder="Ketik kode..." 
                              className="w-full bg-white border border-slate-200 rounded-lg px-2 text-xs font-bold uppercase py-2 focus:ring-1 focus:ring-blue-500"
                            />
                            <p className="text-[8.5px] text-emerald-600 font-bold mt-0.5">✓ Kode aman otomatis terisi</p>
                          </div>
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-blue-800 hover:bg-blue-900 border border-blue-950 text-white font-extrabold rounded-xl py-2.5 text-xs tracking-wider uppercase transition shadow-md shadow-blue-500/10 flex items-center justify-center space-x-1.5 font-sans"
                        >
                          <span>Masuk PalakOnline</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        
                        <button 
                          type="button"
                          onClick={() => { setIsRegistering(true); setLoginError(null); }}
                          className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold rounded-xl py-2.5 text-xs tracking-wider uppercase transition mt-2 flex items-center justify-center space-x-1.5"
                        >
                          <User className="w-4 h-4 text-slate-900" />
                          <span>Belum punya akun? Buat Akun Baru</span>
                        </button>
                      </form>
                    )}
                  </div>

                  <div className="text-center pt-4 border-t border-slate-100 mt-6">
                    <p className="text-[10.5px] text-slate-400 leading-snug">
                      Sesuaikan identitas Anda secara mandiri agar tidak menduplikat nama Vivian saat demo simulasi berlangsung.
                    </p>
                  </div>
                </div>

                {/* RIGHT COLUMN: DIRECT DOWNLOAD FILE HTML & INSTRUCTION PANEL (Col span 5 on md) */}
                <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-800 flex flex-col justify-between text-white animate-fade-in">
                  <div className="space-y-5">
                    <div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500 text-slate-950 uppercase tracking-wider mb-2">
                        Tugas &amp; UAS Mandiri
                      </span>
                      <h3 className="text-sm md:text-base font-extrabold text-yellow-400 tracking-tight flex items-center">
                        <Download className="w-5 h-5 mr-1.5 text-yellow-400 shrink-0" />
                        Download File HTML Tunggal
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Dosen meminta file simulasi mandiri untuk dikumpulkan? Unduh langsung file HTML siap pakai di sini!
                      </p>
                    </div>

                    <div className="bg-slate-900 shadow-inner p-4 rounded-2xl border border-slate-800/80 space-y-3 text-[11px]">
                      <div className="flex items-start space-x-2">
                        <span className="bg-blue-600 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5 w-5 h-5">1</span>
                        <div>
                          <strong className="text-slate-100 block">Kualitas Premium &amp; Interaktif</strong>
                          <span className="text-slate-400 leading-normal block">Hasil unduh berupa satu file HTML mandiri dan bisa dibuka offline, persis seperti simulasi online.</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <span className="bg-blue-600 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5 w-5 h-5">2</span>
                        <div>
                          <strong className="text-slate-100 block">Identitas Kustom</strong>
                          <span className="text-slate-400 leading-normal block">Nama, NPWP, Email, No. HP, dan Alamat terunduh akan otomatis mengikuti data yang sedang Anda isi di aplikasi/form.</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <button
                        onClick={downloadSingleHtml}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl py-3 text-xs tracking-wide uppercase transition shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 hover:scale-[1.01]"
                      >
                        <Download className="w-5 h-5 text-slate-950" />
                        <span>Unduh File HTML Sekarang</span>
                      </button>

                      <button
                        onClick={copyHtmlCodeString}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl py-2.5 text-xs transition flex items-center justify-center space-x-2"
                      >
                        <Copy className="w-4 h-4 text-slate-300" />
                        <span>{copied ? 'Tersalin!' : 'Salin Seluruh Kode HTML'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-center md:text-left pt-6 border-t border-slate-850 mt-6 md:mt-0">
                    <p className="text-[10px] text-slate-400 leading-normal flex items-center justify-center md:justify-start gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Sistem Coretax PalakOnline Offline Terintegrasi</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            // LOGGED IN VIEW SCHEMA
            <div className="flex-grow flex flex-col">
              
              {/* Modern PalakOnline Header navbar */}
              <header className="bg-[#1e3a8a] text-white border-b border-yellow-400 sticky top-12 z-30 shadow-md no-print">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-400 text-slate-900 p-2 rounded-xl">
                      <FileText className="w-5 h-5 text-blue-900 font-extrabold" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold tracking-tight flex items-center text-white">
                        <span className="text-yellow-400 font-black tracking-wide">PalakOnline</span>
                        <span className="ml-1.5 bg-yellow-400 text-slate-900 text-[9px] font-black px-1 rounded">V2</span>
                      </h3>
                      <p className="text-[9.5px] text-zinc-300 font-bold uppercase tracking-widest leading-none mt-0.5">Reformasi &amp; Edukasi Fiskal Baru</p>
                    </div>
                  </div>
 
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white flex items-center space-x-2">
                      <User className="w-3.5 h-3.5 text-yellow-400" />
                      <span className="font-bold whitespace-nowrap" id="header-user-text">{wpName} ({loginNpwp})</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-zinc-300 hover:text-red-400 transition p-1 bg-white/5 hover:bg-white/10 rounded-lg"
                      title="Log out dari PalakOnline"
                    >
                      <LogOut className="w-4 h-4 pointer-events-none" />
                    </button>
                  </div>
                </div>
              </header>

              {/* Outside Click Trap for drop downs */}
              {activeDropdown && (
                <div 
                  className="fixed inset-0 z-35 bg-transparent" 
                  onClick={() => setActiveDropdown(null)}
                />
              )}

              {/* Coretax Official Blue & Yellow Top Navigation Menu Bar */}
              <nav className="bg-[#112d72] text-white border-b-2 border-yellow-400 sticky top-16 z-30 shadow-md no-print text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
                  <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-1">
                    
                    {/* Bupot ∨ */}
                    <div className="relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === 'bupot' ? null : 'bupot')}
                        className={`px-4 py-3 font-bold transition-all duration-150 flex items-center space-x-1.5 focus:outline-hidden ${
                          portalTab === 'bupot' 
                            ? 'bg-[#ea580c] text-white font-black rounded-t-md shadow-inner' 
                            : 'hover:bg-[#1e4499] text-white/90 hover:text-white'
                        }`}
                      >
                        <span className="uppercase tracking-wider">Bupot</span>
                        <ChevronDown className="w-3.5 h-3.5 animate-pulse" />
                      </button>

                      {/* Dropdown Menu matching the user screenshot */}
                      {activeDropdown === 'bupot' && (
                        <div className="absolute left-0 mt-0 w-80 bg-[#122549] border border-yellow-400/40 rounded-b-xl shadow-2xl z-50 py-1 divide-y divide-blue-800/35 text-left">
                          {Object.keys(OBJ_PAJAK_MAP).map((category, idx) => {
                            // First list item BPPU is orange as in screenshot, or highlight currently selected!
                            const isFirst = idx === 0;
                            const isSelected = bupotTypeSel === category;
                            return (
                              <button 
                                key={category}
                                onClick={() => {
                                  handleBupotSelectFromNav(category);
                                  setActiveDropdown(null);
                                }}
                                className={`w-full text-left px-4 py-2.5 transition-colors text-[11px] font-bold flex items-center justify-between ${
                                  isSelected 
                                    ? 'bg-[#ea580c] text-white font-black' 
                                    : isFirst 
                                      ? 'bg-amber-500 hover:bg-amber-600 text-white font-black' 
                                      : 'hover:bg-[#1e4499] text-zinc-100 hover:text-white'
                                }`}
                              >
                                <span className="leading-snug">{category}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* SPT ∨ */}
                    <div className="relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === 'spt' ? null : 'spt')}
                        className={`px-4 py-3 font-bold transition-all duration-150 flex items-center space-x-1.5 focus:outline-hidden ${
                          portalTab === 'spt' 
                            ? 'bg-[#ea580c] text-white font-black rounded-t-md shadow-inner' 
                            : 'hover:bg-[#1e4499] text-white/90 hover:text-white'
                        }`}
                      >
                        <span className="uppercase tracking-wider">SPT</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Dropdown Menu for SPT */}
                      {activeDropdown === 'spt' && (
                        <div className="absolute left-0 mt-0 w-72 bg-[#122549] border border-yellow-400/40 rounded-b-xl shadow-2xl z-50 py-1 text-left">
                          <button 
                            onClick={() => {
                              setPortalTab('spt');
                              setSFormType('1770');
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1e4499] text-zinc-100 font-bold hover:text-white"
                          >
                            SPT Tahunan Orang Pribadi 1770 (Bisnis/UMKM)
                          </button>
                          <button 
                            onClick={() => {
                              setPortalTab('spt');
                              setSFormType('1770 S');
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1e4499] text-zinc-100 font-bold hover:text-white"
                          >
                            SPT Tahunan Orang Pribadi 1770 S (Pegawai Swasta)
                          </button>
                          <button 
                            onClick={() => {
                              setPortalTab('spt');
                              setSFormType('1770 SS');
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1e4499] text-zinc-100 font-bold hover:text-white"
                          >
                            SPT Tahunan Orang Pribadi 1770 SS (Sangat Sederhana)
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Pembayaran ∨ */}
                    <div className="relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === 'pembayaran' ? null : 'pembayaran')}
                        className={`px-4 py-3 font-bold transition-all duration-150 flex items-center space-x-1.5 focus:outline-hidden ${
                          (portalTab === 'pembayaran' || portalTab === 'umkm')
                            ? 'bg-[#ea580c] text-white font-black rounded-t-md shadow-inner' 
                            : 'hover:bg-[#1e4499] text-white/90 hover:text-white'
                        }`}
                      >
                        <span className="uppercase tracking-wider">Pembayaran</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Dropdown Menu for Pembayaran */}
                      {activeDropdown === 'pembayaran' && (
                        <div className="absolute left-0 mt-0 w-64 bg-[#122549] border border-yellow-400/40 rounded-b-xl shadow-2xl z-50 py-1 text-left">
                          <button 
                            onClick={() => {
                              setPortalTab('pembayaran');
                              setPembayaranSubTab('create');
                              setActiveDropdown(null);
                              showSystemToast('Mengisi form Surat Setoran Pajak & Pembuatan Billing Coretax');
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1e4499] text-zinc-100 font-bold hover:text-white border-b border-blue-900/40"
                          >
                            Buat ID Billing Baru (Surat Setoran)
                          </button>
                          <button 
                            onClick={() => {
                              setPortalTab('pembayaran');
                              setPembayaranSubTab('list');
                              setActiveDropdown(null);
                              showSystemToast('Membuka Daftar Tagihan Billing Aktif & NTPN');
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1e4499] text-zinc-100 font-bold hover:text-white border-b border-blue-900/40"
                          >
                            Daftar Tagihan & Riwayat Pembayaran
                          </button>
                          <button 
                            onClick={() => {
                              setPortalTab('umkm');
                              setActiveDropdown(null);
                              showSystemToast('Membuka simulasi perhitungan Pajak UMKM PP 55 (0.5%)');
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1e4499] text-zinc-100 font-bold hover:text-white"
                          >
                            Penyetoran Sendiri PPh Final (Pajak UMKM 0.5%)
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Buku Besar */}
                    <button 
                      onClick={() => {
                        setActiveDropdown(null);
                        setPortalTab('bukubesar');
                        showSystemToast('Buku Besar (Ledger) Keuangan Wajib Pajak Tersinkronisasi!');
                      }}
                      className={`px-4 py-3 font-bold uppercase tracking-wider transition-all duration-150 ${
                        portalTab === 'bukubesar' 
                          ? 'bg-[#ea580c] text-white font-black rounded-t-md shadow-inner' 
                          : 'text-white/95 hover:text-white hover:bg-[#1e4499]'
                      }`}
                    >
                      Buku Besar
                    </button>

                    {/* Layanan Wajib Pajak */}
                    <button 
                      onClick={() => {
                        setActiveDropdown(null);
                        setPortalTab('profil');
                        showSystemToast('Membuka Layanan data profil & NITKU Wajib Pajak');
                      }}
                      className={`px-4 py-3 font-bold transition-all duration-150 uppercase tracking-wider ${
                        portalTab === 'profil' ? 'bg-[#ea580c] text-white' : 'hover:bg-[#1e4499] text-white/95 hover:text-white'
                      }`}
                    >
                      Layanan Wajib Pajak
                    </button>

                  </div>

                </div>
              </nav>

              {/* Central Desktop Sidebar Grid */}
              <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
                
                {/* Navigation Menu Sidebar Panel */}
                <aside className="w-full lg:w-64 shrink-0 space-y-1.5 no-print">
                  <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-2">Layanan PalakOnline DJP</p>
                  
                  <button 
                    onClick={() => setPortalTab('dashboard')}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-bold rounded-xl transition ${portalTab === 'dashboard' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <Layers className="w-4 h-4 text-blue-900" />
                    <span>Dashboard PalakOnline</span>
                  </button>

                  <button 
                    onClick={() => setPortalTab('faktur')}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-bold rounded-xl transition ${portalTab === 'faktur' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                    <span>E-Faktur (Faktur Pajak)</span>
                    <span className="ml-auto bg-blue-50 text-blue-850 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                      {fakturs.length}
                    </span>
                  </button>

                  <button 
                    onClick={() => setPortalTab('bupot')}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-bold rounded-xl transition ${portalTab === 'bupot' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <FileCheck className="w-4 h-4 text-amber-500" />
                    <span>Bukti Potong (Bupot)</span>
                    <span className="ml-auto bg-yellow-50 text-yellow-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                      {bupots.length}
                    </span>
                  </button>

                  <button 
                    onClick={() => setPortalTab('spt')}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-bold rounded-xl transition ${portalTab === 'spt' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <FileText className="w-4 h-4 text-sky-500" />
                    <span>E-Filing (Lapor SPT)</span>
                    <span className="ml-auto bg-yellow-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded animate-pulse">
                      Wajib
                    </span>
                  </button>

                  <button 
                    onClick={() => setPortalTab('umkm')}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-bold rounded-xl transition ${portalTab === 'umkm' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <Sliders className="w-4 h-4 text-rose-500" />
                    <span>Simulasi PPh UMKM</span>
                  </button>

                  <button 
                    onClick={() => { setPortalTab('pembayaran'); setPembayaranSubTab('create'); }}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-bold rounded-xl transition ${portalTab === 'pembayaran' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <CreditCard className="w-4 h-4 text-orange-500 font-bold" />
                    <span>Pembayaran &amp; Billing</span>
                    {billings.filter(b => b.status === 'Belum Bayar').length > 0 && (
                      <span className="ml-auto bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse">
                        {billings.filter(b => b.status === 'Belum Bayar').length}
                      </span>
                    )}
                  </button>

                  <button 
                    onClick={() => setPortalTab('bukubesar')}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-bold rounded-xl transition ${portalTab === 'bukubesar' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <FileCheck2 className="w-4 h-4 text-indigo-500 font-bold" />
                    <span>Buku Besar WP</span>
                  </button>

                  <button 
                    onClick={() => setPortalTab('profil')}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-bold rounded-xl transition ${portalTab === 'profil' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <User className="w-4 h-4 text-teal-500" />
                    <span>Profil Saya</span>
                  </button>

                  <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl text-[11px] leading-relaxed text-slate-500 mt-4 space-y-1.5">
                    <p className="font-extrabold text-blue-900">PalakOnline Simulator:</p>
                    <p>Sistem ini menyimulasikan fitur perpajakan modern secara utuh. Anda dapat mencetak Bukti Penerimaan Elektronik (BPE), membuat &amp; merevisi SPT/Faktur/Bupot secara instan.</p>
                  </div>
                </aside>


                {/* Central Workspace Panel */}
                <div className="flex-grow">
                  
                  {/* TAB 1: DASHBOARD PORTAL */}
                  {portalTab === 'dashboard' && (
                    <div className="space-y-6">
                      
                      {/* Jumbotron banner */}
                      <div className="bg-gradient-to-r from-blue-800 to-blue-600 border-l-4 border-yellow-400 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                        <h2 className="text-xl md:text-2xl font-black tracking-tight">Selamat Datang di PalakOnline, {wpName}!</h2>
                        <p class="text-blue-100 text-xs mt-1.5 leading-relaxed max-w-2xl">
                          Sistem perpajakan Indonesia terpadu dan modern. Anda dapat mencatatkan omzet bulanan, membuat faktur penjualan elektronik (e-Faktur), dan melaporkan kewajiban tahunan secara online dengan perlindungan data kelas dunia.
                        </p>
                        
                        <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-extrabold">
                          <span className="bg-white/15 text-white px-2.5 py-1 rounded-md">NPWP: {loginNpwp}</span>
                          <span className="bg-white/15 text-white px-2.5 py-1 rounded-md">Regulasi: PP 55/2022 Insentif Usaha</span>
                          <span className="bg-emerald-500 text-white px-3 py-1 rounded-md shadow-xs flex items-center">
                            Bebas Pajak s.d Rp 500 Juta Akumulatif
                          </span>
                        </div>
                      </div>

                      {/* KPI Key widgets */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                          <div className="space-y-1">
                            <span class="text-[9px] text-slate-400 font-extrabold block uppercase tracking-widest">Tagihan Masa PPh</span>
                            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                              {formatRupiah(getUnpaidTaxTotal())}
                            </span>
                            <span className="text-[10px] text-rose-600 font-semibold block flex items-center">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5 animate-pulse"></span>
                              Menunggu Pelunasan
                            </span>
                          </div>
                          <div className="bg-rose-50 text-rose-600 p-3 rounded-xl">
                            <CreditCard className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                          <div className="space-y-1">
                            <span class="text-[9px] text-slate-400 font-extrabold block uppercase tracking-widest">E-Faktur PPN Terbit</span>
                            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                              {fakturs.length} Dokumen
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold block">
                              Terintegrasi langsung
                            </span>
                          </div>
                          <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                            <FileSpreadsheet className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                          <div className="space-y-1">
                            <span class="text-[9px] text-slate-400 font-extrabold block uppercase tracking-widest">Status Tahunan SPT</span>
                            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                              {spts.length > 0 ? `Lapor (${spts[0].year})` : 'Belum Terlapor'}
                            </span>
                            <span className="text-[10px] text-emerald-600 font-bold block">
                              Sembelih Nihil
                            </span>
                          </div>
                          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
                            <FileText className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Quick access cards */}
                      <div className="space-y-3 pt-2">
                        <p class="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-widest">Pilihan Layanan Cepat</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button 
                            onClick={() => setPortalTab('faktur')} 
                            className="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl text-left transition group shadow-xs"
                          >
                            <span className="bg-blue-50 text-blue-800 text-[9px] font-extrabold px-2 py-0.5 rounded mb-2.5 inline-block">E-FAKTUR</span>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">Pengisian Faktur Keluaran</h4>
                            <p class="text-[10.5px] text-slate-500 mt-1 leading-snug">Buat faktur komersial klien & partner, otomatis terapkan PPN 11%.</p>
                          </button>

                          <button 
                            onClick={() => setPortalTab('spt')} 
                            className="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl text-left transition group shadow-xs"
                          >
                            <span className="bg-rose-50 text-rose-800 text-[9px] font-extrabold px-2 py-0.5 rounded mb-2.5 inline-block">E-FILING</span>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition">Annual SPT 1770 / S</h4>
                            <p class="text-[10.5px] text-slate-500 mt-1 leading-snug">Laporan SPT berkala tahunan step-by-step dalam sisa menit.</p>
                          </button>

                          <button 
                            onClick={() => setPortalTab('umkm')} 
                            className="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl text-left transition group shadow-xs"
                          >
                            <span className="bg-emerald-50 text-emerald-850 text-[9px] font-extrabold px-2 py-0.5 rounded mb-2.5 inline-block">CALCULATOR</span>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition">PPh Massa Usaha 0.5%</h4>
                            <p class="text-[10.5px] text-slate-500 mt-1 leading-snug">Rangkuman omzet tiap periode dan download kode billing lunas.</p>
                          </button>
                        </div>
                      </div>

                      {/* Calendar announcement */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-extrabold text-slate-900 text-sm pb-3 border-b border-slate-100">Kalender Fiskal &amp; Pengumuman</h4>
                        
                        <div className="mt-4 space-y-4 text-xs font-medium text-slate-700">
                          <div className="flex items-start space-x-4">
                            <div className="bg-blue-50 text-blue-700 p-2 rounded-xl text-center font-bold min-w-[50px]">
                              15<br/><span className="text-[9px] uppercase">Jun</span>
                            </div>
                            <div className="space-y-0.5">
                              <h5 className="font-bold text-slate-900">Batas Akhir Penyetoran PPh Final Bulanan Mei 2026</h5>
                              <p className="text-slate-500 leading-snug">Pastikan pembayaran billing diselesaikan untuk menghindari denda denda keterlambatan.</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-4">
                            <div className="bg-indigo-50 text-indigo-700 p-2 rounded-xl text-center font-bold min-w-[50px]">
                              30<br/><span className="text-[9px] uppercase">Jun</span>
                            </div>
                            <div className="space-y-0.5">
                              <h5 className="font-bold text-slate-900">Batas Pelaporan SPT Tahunan Masa Perpanjangan</h5>
                              <p className="text-slate-500 leading-snug">Gunakan fasilitas digital wizard menu e-Filing kami untuk menyelesaikan deklarasi nihil Anda.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 2: E-FAKTUR SERVICES */}
                  {portalTab === 'faktur' && (
                    <div className="space-y-6">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                        <div>
                          <h2 className="text-lg font-black text-slate-900 tracking-tight">E-Faktur Pajak Elektronik</h2>
                          <p className="text-xs text-slate-500">Penerbitan dan pengadministrasian Faktur Pajak Keluaran atas penjualan BKP/JKP secara otomatis.</p>
                        </div>

                        {!fFormOpen && (
                          <button 
                            onClick={() => setFFormOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-2 px-4 rounded-xl transition flex items-center space-x-1.5 shadow-sm"
                          >
                            <PlusCircle className="w-4 h-4" />
                            <span>Buat Faktur Keluaran Baru</span>
                          </button>
                        )}
                      </div>

                      {/* Interactive form for manual invoice creation */}
                      {fFormOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-widest">Aktivasi e-Faktur Pajak Baru</h4>
                            <button 
                              onClick={() => setFFormOpen(false)}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <form onSubmit={handleFakturSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-700">
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase">Nama Pembeli Barang/Jasa</label>
                                <input 
                                  type="text" 
                                  required
                                  value={fBuyerName}
                                  onChange={(e) => setFBuyerName(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-950 focus:bg-white"
                                  placeholder="Contoh: PT Harapan Sukses Sentosa"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase">NPWP Pembeli (15 atau 16 Digit)</label>
                                <input 
                                  type="text" 
                                  maxLength={16}
                                  required
                                  value={fBuyerNpwp}
                                  onChange={(e) => setFBuyerNpwp(e.target.value.replace(/\D/g, ''))}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono text-slate-950 focus:bg-white"
                                  placeholder="Contoh: 0132456789012000"
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase">Deskripsi Transaksi Jasa / Barang</label>
                                <input 
                                  type="text" 
                                  required
                                  value={fDesc}
                                  onChange={(e) => setFDesc(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-950 focus:bg-white"
                                  placeholder="Contoh: Software Licenses Database Enterprise"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase">Nilai DPP (Dasar Pengenaan Pajak)</label>
                                <div className="relative rounded-xl">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <span class="font-bold">Rp</span>
                                  </div>
                                  <input 
                                    type="number" 
                                    required
                                    value={fAmount}
                                    onChange={(e) => onFakturAmountChange(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 font-bold text-slate-950"
                                    placeholder="Contoh: 15000000"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* PPN Auto evaluation display */}
                            <div className="md:col-span-2 bg-slate-50 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                              <div>
                                <span class="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">Estimasi PPN Masukan</span>
                                <div className="text-slate-700 mt-0.5">Besaran tarif: <strong>PPN 11%</strong></div>
                                <div className="text-slate-950">Jumlah PPN Pihak Kedua: <strong className="text-slate-900">{formatRupiah(fPpn)}</strong></div>
                              </div>

                              <div className="space-x-2 shrink-0 self-end">
                                <button 
                                  type="button" 
                                  onClick={() => setFFormOpen(false)}
                                  className="bg-slate-200 hover:bg-slate-250 text-slate-700 py-2.5 px-4 font-bold rounded-xl transition"
                                >
                                  Batal
                                </button>
                                <button 
                                  type="submit" 
                                  className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 font-bold rounded-xl transition shadow-xs"
                                >
                                  Terbitkan Faktur Pajak
                                </button>
                              </div>
                            </div>
                          </form>
                        </motion.div>
                      )}

                      {/* Display historic invoices issued */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h3 class="font-extrabold text-slate-950 text-sm mb-4">Arsip Faktur Pajak Terbit</h3>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                                <th className="pb-3 text-left">Nomor Seri Faktur</th>
                                <th className="pb-3 px-3">Tanggal Terbit</th>
                                <th className="pb-3 px-3">Pembeli</th>
                                <th className="pb-3 px-3 text-right">Nilai DPP</th>
                                <th className="pb-3 px-3 text-right">PPN Terunggul (11%)</th>
                                <th className="pb-3 pl-3 text-center">Status</th>
                                <th className="pb-3 pl-3 text-center">Aksi</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-700 leading-relaxed font-semibold">
                              {fakturs.map(f => (
                                <tr key={f.id} className="hover:bg-slate-50 transition">
                                  <td className="py-3.5 font-bold text-slate-900 font-mono">{f.fakturNumber}</td>
                                  <td className="py-3.5 px-3 text-slate-500">{f.date}</td>
                                  <td className="py-3.5 px-3">
                                    <div className="text-slate-900">{f.buyerName}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">{f.buyerNpwp}</div>
                                  </td>
                                  <td className="py-3.5 px-3 text-right text-slate-800">{formatRupiah(f.amount)}</td>
                                  <td className="py-3.5 px-3 text-right text-rose-650 font-bold">{formatRupiah(f.ppnAmount)}</td>
                                  <td className="py-3.5 pl-3 text-center">
                                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded px-2.5 py-0.5 text-[9.5px] font-bold">
                                      Terbit
                                    </span>
                                  </td>
                                  <td className="py-3.5 pl-3 text-center">
                                    <div className="flex items-center justify-center space-x-1">
                                      <button 
                                        onClick={() => downloadFaktur(f)}
                                        className="text-yellow-600 hover:text-white bg-yellow-50 hover:bg-yellow-500 p-1.5 rounded-lg transition"
                                        title="Download Berkas E-Faktur (.html)"
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                      </button>
                                      <button 
                                        onClick={() => startEditFaktur(f)}
                                        className="text-blue-600 hover:text-white bg-blue-50 hover:bg-[#1e3a8a] p-1.5 rounded-lg transition"
                                        title="Edit Faktur"
                                      >
                                        <Edit className="w-3.5 h-3.5" />
                                      </button>
                                      <button 
                                        onClick={() => {
                                          if (confirm(`Apakah Anda yakin ingin menghapus Faktur ${f.fakturNumber}?`)) {
                                            deleteFaktur(f.id, f.fakturNumber);
                                          }
                                        }}
                                        className="text-red-600 hover:text-white bg-rose-50 hover:bg-red-650 p-1.5 rounded-lg transition"
                                        title="Hapus Faktur"
                                      >
                                        <Trash className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 2.5: BUKTI POTONG (BUPOT) SERVICES */}
                  {portalTab === 'bupot' && (
                    <div className="space-y-6">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                        <div>
                          <h2 className="text-lg font-black text-slate-900 tracking-tight">E-Bupot (Bukti Pemotongan Pajak)</h2>
                          <p className="text-xs text-slate-500">Pembuatan, penerbitan, dan pengadministrasian Bukti Pemotongan PPh Pasal 21, 22, 23, 26 atau Final.</p>
                        </div>
                      </div>

                      {/* Buat Konsep e-Bupot Dashboard Category Board */}
                      {!bupotFormOpen && (
                        <div className="bg-[#461a5e]/5 border border-[#461a5e]/15 rounded-3xl p-6 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#461a5e]/10 pb-3">
                            <div>
                              <h3 className="font-extrabold text-[#461a5e] text-sm uppercase tracking-wide">Perekaman Baru: Buat Konsep e-Bupot</h3>
                              <p className="text-[11px] text-slate-500">Pilih salah satu klasifikasi Coretax Reform di bawah ini untuk menginisiasi dokumen dan konsep draf bukti pemotongan Anda.</p>
                            </div>
                            <span className="bg-[#461a5e] text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-lg">10 Kategori Aktif</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            {[
                              {
                                key: 'BPPU',
                                title: 'BPPU (e-Bupot Unifikasi)',
                                desc: 'Pemotongan PPh Pasal 22, 23 (Jasa Konstruksi, IT, Teknik, Percetakan, Souvenir, Jasa Lainnya).',
                                badge: 'Unifikasi PPh 22/23',
                                iconColor: 'bg-emerald-500'
                              },
                              {
                                key: 'BPNR',
                                title: 'BPNR (Suku Pajak Luar Negeri)',
                                desc: 'Pemotongan unifikasi untuk wajib pajak luar negeri PPh Pasal 26 (Dividen, Royalti, Bunga, Premi).',
                                badge: 'Unifikasi PPh 26',
                                iconColor: 'bg-indigo-500'
                              },
                              {
                                key: 'Penyetoran Sendiri',
                                title: 'Penyetoran Sendiri',
                                desc: 'Penyetoran PPh Final secara mandiri oleh pemotong atas transaksi khusus sewa atau kontraktor.',
                                badge: 'Setoran Sendiri',
                                iconColor: 'bg-sky-500'
                              },
                              {
                                key: 'Pemotongan Secara Digunggung',
                                title: 'Pemotongan Digunggung',
                                desc: 'Laporan gabungan transaksi UMKM PP 55 masal secara terpadu tanpa mewajibkan rincian identitas.',
                                badge: 'Pajak Digunggung',
                                iconColor: 'bg-amber-500'
                              },
                              {
                                key: 'BP 21 - Bukti Pemotongan Selain Pegawai Tetap',
                                title: 'BP 21 Selain Pegawai Tetap',
                                desc: 'Pemberian komisi, pendidik lepas, distributor, dan tenaga ahli (Konsultan Perpajakan, Pengacara).',
                                badge: 'Pasal 21 Ahli',
                                iconColor: 'bg-[#ea580c]'
                              },
                              {
                                key: 'BP 26 - Bukti Pemotongan Wajib Pajak Luar Negeri',
                                title: 'BP 26 Pegawai Luar Negeri',
                                desc: 'Bukti potong khusus orang pribadi non-residen asing yang memperoleh imbalan pekerjaan di DN.',
                                badge: 'Pasal 26 Pegawai',
                                iconColor: 'bg-pink-500'
                              },
                              {
                                key: 'BP A1 - Bukti Pemotongan A1 Masa Pajak Terakhir',
                                title: 'BP A1 Pegawai Swasta',
                                desc: 'Rincian penghitungan PPh Pasal 21 tahunan masa Desember untuk pekerja swasta devisi tetap.',
                                badge: 'Formulir A1 Swasta',
                                iconColor: 'bg-teal-500'
                              },
                              {
                                key: 'BP A2 - Bukti Pemotongan A2 Masa Pajak Terakhir',
                                title: 'BP A2 PNS / TNI / POLRI',
                                desc: 'Format rincian penghitungan PPh Pasal 21 tahunan wajib pajak aparatur negara, dosen, TNI/POLRI.',
                                badge: 'Formulir A2 PNS',
                                iconColor: 'bg-blue-600'
                              },
                              {
                                key: 'Bukti Pemotongan Bulanan Pegawai Tetap',
                                title: 'Bulanan Pegawai Tetap (TER)',
                                desc: 'Pemotongan bulanan terpadu mengikuti Tarif Efektif Rata-rata (Kategori A, B, C) untuk staf utama.',
                                badge: 'TER Bulanan',
                                iconColor: 'bg-purple-600'
                              },
                              {
                                key: 'Unggah Dokumen Yang Dipersamakan Dengan Bukti Pemotongan/Pemungutan',
                                title: 'Unggah Dokumen Eksternal',
                                desc: 'Kompilasi impor, SSP (Surat Setoran Pajak) manual, kepabeanan PIB, atau Bill of Lading.',
                                badge: 'Kolektif Impor/SSP',
                                iconColor: 'bg-slate-600'
                              }
                            ].map((card) => (
                              <div 
                                key={card.key}
                                className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:border-[#461a5e]/50 hover:shadow-md transition group text-left"
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-extrabold text-[#461a5e] bg-purple-50 px-2 py-0.5 rounded-md uppercase">
                                      {card.badge}
                                    </span>
                                    <span className={`w-2 h-2 rounded-full ${card.iconColor}`}></span>
                                  </div>
                                  <h4 className="font-extrabold text-slate-900 group-hover:text-[#461a5e] text-xs transition leading-tight">
                                    {card.title}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 leading-snug">
                                    {card.desc}
                                  </p>
                                </div>

                                <button 
                                  type="button"
                                  onClick={() => handleBupotSelectFromNav(card.key)}
                                  className="mt-3 w-full bg-slate-50 hover:bg-[#461a5e] hover:text-white border border-slate-200 hover:border-[#461a5e] text-slate-700 font-extrabold text-[10.5px] py-2 rounded-xl transition flex items-center justify-center space-x-1"
                                >
                                  <span>Buat Konsep e-Bupot</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Interactive form for manual Bupot creation/editing */}
                      {bupotFormOpen && (() => {
                        const options = getObjekPajakOptions(bupotTypeSel);
                        const activeOption = options.find(o => o.name === bupotObjekPajak) || options[0];
                        
                        const handleGrossChange = (val: string, activeOpt: typeof options[0]) => {
                          setBupotGross(val);
                          const parsedGross = parseFloat(val);
                          if (!isNaN(parsedGross) && parsedGross > 0) {
                            const computedTax = Math.round(parsedGross * (activeOpt.deemedRate / 100) * (activeOpt.tarif / 100));
                            setBupotCalcTax(computedTax);
                          } else {
                            setBupotCalcTax(0);
                          }
                        };

                        const handleObjekPajakChange = (fullName: string, opts: typeof options) => {
                          const found = opts.find(o => o.name === fullName) || opts[0];
                          setBupotObjekPajak(found.name);
                          const parsedGross = parseFloat(bupotGross);
                          if (!isNaN(parsedGross) && parsedGross > 0) {
                            const computedTax = Math.round(parsedGross * (found.deemedRate / 100) * (found.tarif / 100));
                            setBupotCalcTax(computedTax);
                          } else {
                            setBupotCalcTax(0);
                          }
                        };

                        return (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs text-slate-700"
                          >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                              <div>
                                <h4 className="font-extrabold text-[#461a5e] text-sm uppercase tracking-wider">
                                  {editingBupot ? `Edit Bukti Pemotongan Pajak ${editingBupot.bupotNumber}` : 'Perekaman Bukti Pemotongan Baru'}
                                </h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Jenis Form: {bupotTypeSel}</p>
                              </div>
                              <button 
                                onClick={() => setBupotFormOpen(false)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <form onSubmit={handleBupotSubmit} className="space-y-4">
                              {/* Accordion 1: Informasi Umum */}
                              <div>
                                <div 
                                  type="button"
                                  onClick={() => setBupotAccordionOpen(prev => ({ ...prev, infoUmum: !prev.infoUmum }))}
                                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-3 cursor-pointer flex justify-between items-center rounded-xl font-extrabold text-xs text-slate-800 transition"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="bg-[#461a5e] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
                                    <span>Informasi Umum</span>
                                  </span>
                                  <span className="text-[#461a5e] font-black">{bupotAccordionOpen.infoUmum ? '▲' : '▼'}</span>
                                </div>
                                <AnimatePresence>
                                  {bupotAccordionOpen.infoUmum && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="border-x border-b border-slate-200 p-5 rounded-b-xl -mt-2 bg-white space-y-4"
                                    >
                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <div className="text-slate-500 font-bold block md:col-span-1">Masa Pajak</div>
                                        <div className="md:col-span-3">
                                          <select 
                                            value={bupotMasaPajak}
                                            onChange={(e) => setBupotMasaPajak(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 font-bold text-slate-700 focus:bg-white"
                                          >
                                            <option value="Januari 2026">Januari 2026</option>
                                            <option value="Februari 2026">Februari 2026</option>
                                            <option value="Maret 2026">Maret 2026</option>
                                            <option value="April 2026">April 2026</option>
                                            <option value="Mei 2026">Mei 2026</option>
                                            <option value="Juni 2026">Juni 2026</option>
                                            <option value="Juli 2026">Juli 2026</option>
                                            <option value="Agustus 2026">Agustus 2026</option>
                                            <option value="September 2026">September 2026</option>
                                            <option value="Oktober 2026">Oktober 2026</option>
                                            <option value="November 2026">November 2026</option>
                                            <option value="Desember 2026">Desember 2026</option>
                                          </select>
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Status</div>
                                        <div className="md:col-span-3">
                                          <input 
                                            type="text" 
                                            readOnly 
                                            value="NORMAL" 
                                            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-500 font-mono font-bold"
                                          />
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">NPWP Penerima</div>
                                        <div className="md:col-span-3 flex gap-2">
                                          <div className="relative flex-grow">
                                            <input 
                                              type="text" 
                                              maxLength={16}
                                              value={bupotRecipientNpwp}
                                              onChange={(e) => setBupotRecipientNpwp(e.target.value.replace(/\D/g, ''))}
                                              placeholder="Contoh: 0132456789012000" 
                                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 font-mono font-bold focus:bg-white"
                                            />
                                            <span className="absolute right-3 top-2.5 text-slate-400">🔍</span>
                                          </div>
                                          <button 
                                            type="button" 
                                            onClick={handleSearchLawanTransaksi}
                                            className="bg-[#461a5e] hover:bg-[#301242] text-white text-xs font-bold px-4 py-2 rounded-lg transition shrink-0 shadow-xs"
                                          >
                                            Periksa NPWP
                                          </button>
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Nama Penerima</div>
                                        <div className="md:col-span-3">
                                          <input 
                                            type="text" 
                                            value={bupotRecipientName || ''}
                                            onChange={(e) => setBupotRecipientName(e.target.value)}
                                            placeholder="Masukkan Nama Lengkap Wajib Pajak Penerima Maslahat"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 font-bold focus:bg-white"
                                          />
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">NITKU Kantor</div>
                                        <div className="md:col-span-3">
                                          <select 
                                            value={bupotNitku}
                                            onChange={(e) => setBupotNitku(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-700 font-bold focus:bg-white"
                                          >
                                            <option value="0000000000000000">0000000000000000 | Kantor Pusat Utama</option>
                                            <option value="9988770000010001">9988770000010001 | Sub Unit Regional 1</option>
                                            <option value="0123456789012345">0123456789012345 | Sub Unit Regional Barat</option>
                                          </select>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Accordion 2: Penghitungan Pajak Penghasilan */}
                              <div>
                                <div 
                                  type="button"
                                  onClick={() => setBupotAccordionOpen(prev => ({ ...prev, perhitunganPajak: !prev.perhitunganPajak }))}
                                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-3 cursor-pointer flex justify-between items-center rounded-xl font-extrabold text-xs text-slate-800 transition"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="bg-[#461a5e] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span>
                                    <span>Penghitungan Pajak Penghasilan</span>
                                  </span>
                                  <span className="text-[#461a5e] font-black">{bupotAccordionOpen.perhitunganPajak ? '▲' : '▼'}</span>
                                </div>
                                <AnimatePresence>
                                  {bupotAccordionOpen.perhitunganPajak && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="border-x border-b border-slate-200 p-5 rounded-b-xl -mt-2 bg-white space-y-4"
                                    >
                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <div className="text-slate-500 font-bold block md:col-span-1">Status PTKP</div>
                                        <div className="md:col-span-3">
                                          <select 
                                            value={bupotPtkp}
                                            onChange={(e) => setBupotPtkp(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-700 font-bold focus:bg-white"
                                          >
                                            <option value="TK/0">TK/0 (Belum Menikah, 0 Tanggungan)</option>
                                            <option value="TK/1">TK/1 (Belum Menikah, 1 Tanggungan)</option>
                                            <option value="TK/2">TK/2 (Belum Menikah, 2 Tanggungan)</option>
                                            <option value="TK/3">TK/3 (Belum Menikah, 3 Tanggungan)</option>
                                            <option value="K/0">K/0 (Menikah, 0 Tanggungan)</option>
                                            <option value="K/1">K/1 (Menikah, 1 Tanggungan)</option>
                                            <option value="K/2">K/2 (Menikah, 2 Tanggungan)</option>
                                            <option value="K/3">K/3 (Menikah, 3 Tanggungan)</option>
                                          </select>
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Fasilitas Pajak</div>
                                        <div className="md:col-span-3">
                                          <select 
                                            value={bupotFasilitas}
                                            onChange={(e) => setBupotFasilitas(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-700 font-bold focus:bg-white"
                                          >
                                            <option value="Tanpa Fasilitas">Tanpa Fasilitas</option>
                                            <option value="Fasilitas PPh DTP">Fasilitas PPh Pasal 21 ditanggung Pemerintah (DTP)</option>
                                            <option value="Fasilitas SKB">Fasilitas Surat Keterangan Bebas (SKB) PPh</option>
                                          </select>
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Objek Pajak</div>
                                        <div className="md:col-span-3">
                                          <select 
                                            value={activeOption.name}
                                            onChange={(e) => handleObjekPajakChange(e.target.value, options)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 font-bold focus:bg-white"
                                          >
                                            {options.map(opt => (
                                              <option key={opt.code} value={opt.name}>{opt.name}</option>
                                            ))}
                                          </select>
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Jenis Pajak</div>
                                        <div className="md:col-span-3">
                                          <input 
                                            type="text" 
                                            readOnly 
                                            value={activeOption.jenisPajak} 
                                            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-500 font-bold"
                                          />
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Kode Objek Pajak</div>
                                        <div className="md:col-span-3">
                                          <input 
                                            type="text" 
                                            readOnly 
                                            value={activeOption.code} 
                                            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-500 font-mono font-bold"
                                          />
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Sifat PPh</div>
                                        <div className="md:col-span-3">
                                          <input 
                                            type="text" 
                                            readOnly 
                                            value={activeOption.sifat} 
                                            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-500 font-bold"
                                          />
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Penghasilan Bruto (DPP)</div>
                                        <div className="md:col-span-3 relative">
                                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                                            Rp
                                          </div>
                                          <input 
                                            type="text"
                                            value={bupotGross}
                                            onChange={(e) => handleGrossChange(e.target.value.replace(/\D/g, ''), activeOption)}
                                            placeholder="0,00" 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 font-black text-right text-slate-800 focus:bg-white"
                                          />
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">DPP Deemed Rate (%)</div>
                                        <div className="md:col-span-3 text-right font-bold text-slate-600 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2">
                                          {activeOption.deemedRate} %
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Tarif Efektif (%)</div>
                                        <div className="md:col-span-3 text-right font-extrabold text-[#ea580c] bg-slate-100 border border-slate-200 rounded-lg px-4 py-2">
                                          {activeOption.tarif} %
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">KAP</div>
                                        <div className="md:col-span-3">
                                          <input 
                                            type="text" 
                                            readOnly 
                                            value={activeOption.kap} 
                                            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-500 font-mono font-bold"
                                          />
                                        </div>

                                        <div className="text-slate-500 font-extrabold block md:col-span-1">Estimasi PPh Terutang</div>
                                        <div className="md:col-span-3 text-right font-black text-white bg-[#461a5e] border border-[#301242] rounded-lg px-4 py-2.5 text-sm shadow-inner transition animate-pulse">
                                          {formatRupiah(bupotCalcTax)}
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Accordion 3: Dokumen Referensi */}
                              <div>
                                <div 
                                  type="button"
                                  onClick={() => setBupotAccordionOpen(prev => ({ ...prev, dokumenRef: !prev.dokumenRef }))}
                                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-3 cursor-pointer flex justify-between items-center rounded-xl font-extrabold text-xs text-slate-800 transition"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="bg-[#461a5e] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">3</span>
                                    <span>Dokumen Referensi / Dasar Pemotongan</span>
                                  </span>
                                  <span className="text-[#461a5e] font-black">{bupotAccordionOpen.dokumenRef ? '▲' : '▼'}</span>
                                </div>
                                <AnimatePresence>
                                  {bupotAccordionOpen.dokumenRef && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="border-x border-b border-slate-200 p-5 rounded-b-xl -mt-2 bg-white space-y-4"
                                    >
                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <div className="text-slate-500 font-bold block md:col-span-1">Jenis Dokumen</div>
                                        <div className="md:col-span-3">
                                          <select 
                                            value={bupotRefDocType}
                                            onChange={(e) => setBupotRefDocType(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-700 font-bold focus:bg-white"
                                          >
                                            <option value="Invoice">Invoice / Kwitansi Penagihan Jasa</option>
                                            <option value="Faktur Pajak">Faktur Pajak Pertambahan Nilai (PPN)</option>
                                            <option value="Surat Perjanjian">Surat Kontrak Kerja / Perjanjian Proyek</option>
                                            <option value="Nota Penjualan">Nota Penjualan Barang Dagang</option>
                                          </select>
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Nomor Dokumen</div>
                                        <div className="md:col-span-3">
                                          <input 
                                            type="text"
                                            required
                                            value={bupotRefDocNo}
                                            onChange={(e) => setBupotRefDocNo(e.target.value)}
                                            placeholder="Contoh: INV-2026/DJP-00223" 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 font-bold focus:bg-white"
                                          />
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">Tanggal Dokumen</div>
                                        <div className="md:col-span-3">
                                          <input 
                                            type="date"
                                            required
                                            value={bupotRefDocDate}
                                            onChange={(e) => setBupotRefDocDate(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 font-bold focus:bg-white"
                                          />
                                        </div>

                                        <div className="text-slate-500 font-bold block md:col-span-1">NITKU Sumber Dokumen</div>
                                        <div className="md:col-span-3">
                                          <select 
                                            value={bupotRefDocNitku}
                                            onChange={(e) => setBupotRefDocNitku(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-700 font-bold focus:bg-white"
                                          >
                                            <option value="0000000000000000">0000000000000000 | Kantor Pusat</option>
                                            <option value="9988770000010001">9988770000010001 | Sub Unit Regional 1</option>
                                          </select>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Form Footer Controls */}
                              <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-3.5 border-t border-slate-100">
                                <button 
                                  type="button" 
                                  onClick={() => setBupotFormOpen(false)}
                                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-5 rounded-xl transition"
                                >
                                  Batal
                                </button>
                                <button 
                                  type="button" 
                                  onClick={(e) => handleBupotSubmitCustom(e, 'Draft')}
                                  className="w-full sm:w-auto border border-[#461a5e] hover:bg-purple-50 text-[#461a5e] font-bold py-2.5 px-5 rounded-xl transition"
                                >
                                  Simpan Konsep
                                </button>
                                <button 
                                  type="submit" 
                                  className="w-full sm:w-auto bg-[#461a5e] hover:bg-[#301242] text-white font-extrabold py-2.5 px-6 rounded-xl transition shadow-sm"
                                >
                                  {editingBupot ? 'Perbarui & Terbitkan' : 'Kirim Data'}
                                </button>
                              </div>
                            </form>
                          </motion.div>
                        );
                      })()}

                      {/* Display historic Bupot records */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-extrabold text-slate-950 text-sm mb-4">Arsip Bukti Pemotongan (Bupot) Terbit</h3>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                                <th className="pb-3 text-left">Nomor Bukti Potong</th>
                                <th className="pb-3 px-3">Tanggal / Jenis</th>
                                <th className="pb-3 px-3">Penerima Pemotongan</th>
                                <th className="pb-3 px-3">Keterangan Objek Pajak</th>
                                <th className="pb-3 px-3 text-right">Potongan Bruto</th>
                                <th className="pb-3 px-3 text-right">PPh Dipotong</th>
                                <th className="pb-3 pl-3 text-center">Aksi</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-700 leading-relaxed font-semibold">
                              {bupots.map(b => (
                                <tr key={b.id} className="hover:bg-slate-50 transition">
                                  <td className="py-3.5 font-bold text-[#512D6d] font-mono">{b.bupotNumber}</td>
                                  <td className="py-3.5 px-3">
                                    <div className="text-slate-900">{b.date}</div>
                                    <div className="text-[9px] text-[#512D6d] bg-purple-50 inline-block px-1 rounded font-bold uppercase mt-0.5">{b.bupotType}</div>
                                  </td>
                                  <td className="py-3.5 px-3">
                                    <div className="text-slate-900">{b.recipientName}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">{b.recipientNpwp}</div>
                                  </td>
                                  <td className="py-3.5 px-3 max-w-[180px] truncate text-slate-600" title={b.objekPajak}>{b.objekPajak}</td>
                                  <td className="py-3.5 px-3 text-right text-slate-800">{formatRupiah(b.grossAmount)}</td>
                                  <td className="py-3.5 px-3 text-right text-purple-700 font-black">{formatRupiah(b.taxAmount)} <span className="text-[9px] text-slate-400 font-normal">({b.taxRate}%)</span></td>
                                  <td className="py-3.5 pl-3 text-center">
                                    <div className="flex items-center justify-center space-x-1 font-semibold">
                                      <button 
                                        onClick={() => downloadBupot(b)}
                                        className="text-yellow-600 hover:text-white bg-yellow-50 hover:bg-yellow-500 p-1.5 rounded-lg transition"
                                        title="Download Berkas E-Bupot (.html)"
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                      </button>
                                      <button 
                                        onClick={() => startEditBupot(b)}
                                        className="text-blue-600 hover:text-white bg-blue-50 hover:bg-[#1e3a8a] p-1.5 rounded-lg transition"
                                        title="Edit Bukti Potong"
                                      >
                                        <Edit className="w-3.5 h-3.5" />
                                      </button>
                                      <button 
                                        onClick={() => {
                                          if (confirm(`Apakah Anda yakin ingin menghapus Bukti Potong ${b.bupotNumber}?`)) {
                                            deleteBupot(b.id, b.bupotNumber);
                                          }
                                        }}
                                        className="text-red-600 hover:text-white bg-rose-50 hover:bg-red-650 p-1.5 rounded-lg transition"
                                        title="Hapus Bukti Potong"
                                      >
                                        <Trash className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: E-FILING WIZARD PORTAL */}
                  {portalTab === 'spt' && (
                    <div className="space-y-6">
                      
                      <div className="pb-4 border-b border-slate-200">
                        <h2 className="text-lg font-black text-slate-900 tracking-tight">E-Filing SPT &amp; Pelaporan Perpajakan</h2>
                        <p className="text-xs text-slate-500">Buat konsep formulir langsung, terbitkan kode billing setoran, kelola pembayaran aktif, dan cek arsip tanda terima elektronik BPE.</p>
                      </div>

                      {/* MODERN SPT SUB-TABS ROW */}
                      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
                        <button
                          type="button"
                          onClick={() => setSptSubTab('create')}
                          className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                            sptSubTab === 'create'
                              ? 'bg-blue-800 text-white shadow-sm'
                              : 'bg-white text-slate-750 hover:bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                          <span>Buat Konsep SPT</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setSptSubTab('draft')}
                          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                            sptSubTab === 'draft'
                              ? 'bg-blue-800 text-white shadow-sm'
                              : 'bg-white text-slate-750 hover:bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <span>Konsep / Draft SPT</span>
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black shrink-0 ${
                            sptSubTab === 'draft' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-650'
                          }`}>
                            {spts.filter(s => s.status === 'Draft').length}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSptSubTab('unpaid')}
                          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                            sptSubTab === 'unpaid'
                              ? 'bg-blue-800 text-white shadow-sm'
                              : 'bg-white text-slate-755 hover:bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <span>SPT Menunggu Pembayaran</span>
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black shrink-0 ${
                            sptSubTab === 'unpaid' ? 'bg-amber-100 text-amber-805' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {spts.filter(s => s.status === 'Menunggu Pembayaran').length}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSptSubTab('reported')}
                          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                            sptSubTab === 'reported'
                              ? 'bg-blue-800 text-white shadow-sm'
                              : 'bg-white text-slate-750 hover:bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <span>SPT Dilaporkan / Arsip</span>
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black shrink-0 ${
                            sptSubTab === 'reported' ? 'bg-emerald-900 text-emerald-100' : 'bg-slate-100 text-slate-650'
                          }`}>
                            {spts.filter(s => s.status !== 'Draft' && s.status !== 'Menunggu Pembayaran').length}
                          </span>
                        </button>
                      </div>

                      {/* --- SUBTAB VIEW: CREATE CONCEPT WIZARD --- */}
                      {sptSubTab === 'create' && (
                        <div className="space-y-6">
                          
                          {/* Visual Step Progress (Matching exact image alignment & step name tags) */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                            <div className="relative flex items-center justify-between max-w-2xl mx-auto py-2">
                              {/* Horizontal connector bar behind steps */}
                              <div className="absolute left-6 right-6 top-5 h-0.5 bg-slate-150 z-0"></div>
                              
                              {/* Step 1 */}
                              <div className="relative z-10 flex flex-col items-center bg-white px-2.5">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                                  conceptSptStep >= 1 ? 'bg-yellow-400 text-slate-950 border-2 border-yellow-300 shadow-xs' : 'bg-slate-100 text-slate-400'
                                }`}>
                                  1
                                </div>
                                <span className={`text-[10px] font-black mt-2.5 ${conceptSptStep >= 1 ? 'text-slate-900' : 'text-slate-450'}`}>Pilih Jenis Pajak</span>
                              </div>

                              {/* Step 2 */}
                              <div className="relative z-10 flex flex-col items-center bg-white px-2.5">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                                  conceptSptStep >= 2 ? 'bg-yellow-400 text-slate-950 border-2 border-yellow-300 shadow-xs' : 'bg-slate-100 text-slate-400'
                                }`}>
                                  2
                                </div>
                                <span className={`text-[10px] font-black mt-2.5 ${conceptSptStep >= 2 ? 'text-slate-900' : 'text-slate-450'}`}>Pilih periode pelaporan SPT</span>
                              </div>

                              {/* Step 3 */}
                              <div className="relative z-10 flex flex-col items-center bg-white px-2.5">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                                  conceptSptStep >= 3 ? 'bg-yellow-400 text-slate-950 border-2 border-yellow-300 shadow-xs' : 'bg-slate-100 text-slate-400'
                                }`}>
                                  3
                                </div>
                                <span className={`text-[10px] font-black mt-2.5 ${conceptSptStep >= 3 ? 'text-slate-900' : 'text-slate-450'}`}>Pilih Jenis SPT</span>
                              </div>
                            </div>
                          </div>

                          {/* STEP 1 CONTROLLER */}
                          {conceptSptStep === 1 && (
                            <div className="space-y-4">
                              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 text-[11px] font-semibold text-slate-700">
                                <span className="text-yellow-600 font-extrabold block mb-0.5">Langkah 1.</span>
                                Pilih jenis SPT yang akan dilaporkan:
                              </div>

                              {/* Beautiful choice cards aligned EXACTLY with the uploaded photo */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 pt-1">
                                {[
                                  {
                                    name: 'PPN',
                                    desc: 'Surat Pemberitahuan Masa Pajak Pertambahan Nilai (BKP & JKP)'
                                  },
                                  {
                                    name: 'PPN Bagi PKP yang Menggunakan Pedoman Penghitungan Pengkreditan Pajak Masukan',
                                    desc: 'Pedoman Deemed Pajak Masukan khusus Pengusaha Kena Pajak'
                                  },
                                  {
                                    name: 'PPh Badan',
                                    desc: 'Pajak Penghasilan wajib pajak badan usaha dalam rupiah'
                                  },
                                  {
                                    name: 'PPh Badan Dolar Amerika Serikat',
                                    desc: 'Corporate Income Tax using USD primary bookkeeping'
                                  },
                                  {
                                    name: 'PPh Final Pengungkapan Harta Bersih',
                                    desc: 'PPS deklarasi harta bersih & administrasi amnesti'
                                  },
                                  {
                                    name: 'PPh Pasal 21/26',
                                    desc: 'Pemotongan pajak atas gaji, upah kerja, dan remunerasi'
                                  },
                                  {
                                    name: 'PPh Pasal 25 bagi BUMN/BUMD',
                                    desc: 'Angsuran bulanan korporasi milik nasional/daerah'
                                  },
                                  {
                                    name: 'PPh Pasal 25 bagi Bank',
                                    desc: 'Kewajiban setoran bulanan khusus lembaga perbankan'
                                  },
                                  {
                                    name: 'PPh Pasal 25 bagi Wajib Pajak Masuk Bursa atau Wajib Pajak Lainnya',
                                    desc: 'Kewajiban setoran emiten bursa efek (Tbk) dsb'
                                  },
                                  {
                                    name: 'PPh Unifikasi',
                                    desc: 'Penyatuan beberapa objek PPh potong/pungut masa'
                                  }
                                ].map((card) => {
                                  const isSelected = conceptSptType === card.name;
                                  return (
                                    <div
                                      key={card.name}
                                      onClick={() => setConceptSptType(card.name)}
                                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer select-none min-h-[140px] relative ${
                                        isSelected
                                          ? 'border-yellow-400 bg-blue-50/20 shadow-md ring-2 ring-yellow-400/40'
                                          : 'border-slate-200 hover:border-yellow-400/80 bg-white hover:bg-slate-50'
                                      }`}
                                    >
                                      <div>
                                        <h5 className="font-extrabold text-[11px] text-slate-900 leading-snug mb-1.5 uppercase">
                                          {card.name}
                                        </h5>
                                        <p className="text-[10px] text-slate-450 leading-relaxed font-semibold">
                                          {card.desc}
                                        </p>
                                      </div>
                                      
                                      {isSelected && (
                                        <span className="absolute bottom-2.5 right-2.5 bg-yellow-400 text-slate-950 px-1.5 py-0.5 rounded-md text-[8.5px] font-black uppercase tracking-wider leading-none shadow-sm">
                                          Terpilih
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="pt-4 border-t border-slate-100 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => setConceptSptStep(2)}
                                  className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition flex items-center space-x-1 shadow-sm"
                                >
                                  <span>Selanjutnya (Pilih Periode)</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* STEP 2 CONTROLLER */}
                          {conceptSptStep === 2 && (
                            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 text-xs text-slate-700 font-semibold">
                              <div>
                                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4 text-yellow-500" />
                                  Langkah 2. Tentukan Periode Pelaporan Buku
                                </h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">Definisikan tahun dan bulan pelaporan untuk jenis SPT: <strong>{conceptSptType}</strong></p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-semibold">
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Tahun Pajak Laporan</label>
                                  <select
                                    value={conceptSptYear}
                                    onChange={(e) => setConceptSptYear(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none focus:bg-white"
                                  >
                                    <option value="2025">2025 (Tahun Berjalan)</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2026">2026</option>
                                  </select>
                                </div>

                                <div className="space-y-1">
                                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Masa / Bulan Buku</label>
                                  <select
                                    value={conceptSptMonth}
                                    onChange={(e) => setConceptSptMonth(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none focus:bg-white"
                                  >
                                    <option value="Tahunan">Tahunan (Januari - Desember)</option>
                                    {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map(m => (
                                      <option key={m} value={m}>{m}</option>
                                    ))}
                                  </select>
                                </div>

                                <div className="space-y-1">
                                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Status Pembetulan SPT</label>
                                  <select
                                    value={conceptPembetulan}
                                    onChange={(e) => setConceptPembetulan(parseInt(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none focus:bg-white"
                                  >
                                    <option value="0">SPT Normal (Normal - Pembetulan ke-0)</option>
                                    <option value="1">Revisi / Pembetulan ke-1</option>
                                    <option value="2">Revisi / Pembetulan ke-2</option>
                                    <option value="3">Revisi / Pembetulan ke-3</option>
                                  </select>
                                </div>
                              </div>

                              <div className="pt-4 border-t border-slate-100 flex justify-between">
                                <button
                                  type="button"
                                  onClick={() => setConceptSptStep(1)}
                                  className="bg-slate-100 hover:bg-slate-150 text-slate-700 font-bold py-2 px-4 rounded-xl transition"
                                >
                                  Kembali ke Pilih Jenis Pajak
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!conceptGross) {
                                      setConceptGross('150000000');
                                      setConceptNet('60000000');
                                    }
                                    setConceptSptStep(3);
                                  }}
                                  className="bg-blue-800 hover:bg-blue-900 text-white font-extrabold py-2.5 px-5 rounded-xl transition flex items-center space-x-1"
                                >
                                  <span>Selanjutnya (Input Nominal)</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* STEP 3 CONTROLLER */}
                          {conceptSptStep === 3 && (
                            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-xs text-slate-700 font-semibold">
                              <div>
                                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                                  <FileText className="w-4 h-4 text-blue-900" />
                                  Langkah 3. Pilih Jenis / Detail Pelaporan Keuangan
                                </h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">Tentukan nilai omzet kotor wajib pajak guna mendefinisikan pembagian PPh terutang untuk: <strong>{conceptSptType}</strong></p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <div className="space-y-4">
                                  <div className="space-y-1">
                                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Perputaran Bruto / Peredaran Bruto Setahun (Omzet)</label>
                                    <div className="relative rounded-xl">
                                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-extrabold text-[10px]">
                                        Rp
                                      </div>
                                      <input
                                        type="number"
                                        required
                                        value={conceptGross}
                                        onChange={(e) => setConceptGross(e.target.value)}
                                        placeholder="Contoh: 150000000"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 font-bold text-slate-900 focus:bg-white focus:outline-none"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Estimasi Penghasilan Neto Fiskal</label>
                                    <div className="relative rounded-xl">
                                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-extrabold text-[10px]">
                                        Rp
                                      </div>
                                      <input
                                        type="number"
                                        required
                                        value={conceptNet}
                                        onChange={(e) => setConceptNet(e.target.value)}
                                        placeholder="Contoh: 60000000"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 font-bold text-slate-900 focus:bg-white focus:outline-none"
                                      />
                                    </div>
                                    <p className="text-[9.5px] text-slate-400 leading-relaxed font-semibold mt-0.5">Kekayaan objek bersih setelah dikurangi operasional.</p>
                                  </div>
                                </div>

                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                                  <div>
                                    <span className="block text-[9px] font-extrabold text-slate-450 uppercase tracking-wider mb-2">Simulasi Hasil Kalkulator SPT</span>
                                    <div className="space-y-2 text-[11px] text-slate-600 font-semibold leading-relaxed">
                                      <div className="flex justify-between">
                                        <span>Jenis Pajak:</span>
                                        <strong className="text-slate-900 uppercase">{conceptSptType}</strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Peredaran Bruto:</span>
                                        <strong className="text-slate-900">{formatRupiah(parseFloat(conceptGross) || 0)}</strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Masa Buku Laporan:</span>
                                        <strong className="text-slate-900">{conceptSptMonth} {conceptSptYear}</strong>
                                      </div>
                                      <div className="flex justify-between border-t border-slate-200 pt-2 text-[11.5px] font-extrabold text-slate-950">
                                        <span>Estimasi Pajak Terutang:</span>
                                        <span className="text-blue-700 font-black">
                                          {formatRupiah(getEstimatedTaxForType(conceptSptType, parseFloat(conceptGross) || 0, parseFloat(conceptNet) || 0))}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-[9.5px] bg-[#f9f9fb] text-slate-500 p-2.5 rounded-lg border border-slate-150 font-semibold">
                                    Catatan: Simulasi ini didasarkan pada perincian Coretax Reform. Wajib Pajak dapat menyimpan konsep langsung, menerbitkan ID billing untuk antrian pembayaran, atau kirim seketika.
                                  </div>
                                </div>
                              </div>

                              {/* Multi-action confirmation box */}
                              <div className="bg-slate-100/60 p-4 rounded-xl border border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-4 mt-3">
                                <div className="text-left font-semibold">
                                  <p className="text-[11.5px] text-slate-900 font-extrabold leading-tight">Konsep Siap Diterbitkan</p>
                                  <p className="text-[10px] text-slate-450 mt-0.5">Silakan pilih destinasi status proses data perpajakan baru di bawah.</p>
                                </div>

                                <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0 font-extrabold">
                                  <button
                                    type="button"
                                    onClick={() => saveAsConceptSpt('Draft')}
                                    className="flex-grow sm:flex-none bg-slate-200 hover:bg-slate-250 text-slate-800 text-[10px] px-3.5 py-2.5 rounded-xl transition"
                                  >
                                    Simpan sebagai Draft
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => saveAsConceptSpt('Menunggu Pembayaran')}
                                    className="flex-grow sm:flex-none bg-yellow-400 hover:bg-yellow-550 text-slate-955 text-[10px] px-3.5 py-2.5 rounded-xl transition border border-yellow-350"
                                  >
                                    Terbitkan ID Billing
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const randomVal = String(Math.floor(1000 + Math.random() * 9000));
                                      const ansVal = prompt(`Masukkan Kode OTP untuk validasi pelaporan langsung. Kode OTP: ${randomVal}`);
                                      if (ansVal === randomVal) {
                                        saveAsConceptSpt('Sudah Lapor');
                                      } else {
                                        showSystemToast('Gagal: OTP tidak sesuai!');
                                      }
                                    }}
                                    className="flex-grow sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] px-3.5 py-2.5 rounded-xl transition flex items-center justify-center gap-1 shadow-sm"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Laporkan Serta Merta</span>
                                  </button>
                                </div>
                              </div>

                              <div className="pt-4 border-t border-slate-100 flex justify-between">
                                <button
                                  type="button"
                                  onClick={() => setConceptSptStep(2)}
                                  className="bg-slate-100 hover:bg-slate-155 text-slate-700 font-bold py-2 px-4 rounded-xl transition"
                                >
                                  Kembali ke Periode
                                </button>
                                <span className="text-[10px] text-slate-400 self-center">PalakOnline DJP Coretax Simulasi</span>
                              </div>
                            </div>
                          )}

                        </div>
                      )}

                      {/* --- SUBTAB VIEW: DRAFTS LIST --- */}
                      {sptSubTab === 'draft' && (
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                            <h3 className="font-extrabold text-slate-900 text-sm">Folder Konsep / Draft SPT</h3>
                            <p className="text-[11px] text-slate-450 mt-0.5">Daftar konsep draf SPT Anda yang belum diproses ke antrian pembayaran billing maupun dikirim.</p>
                          </div>

                          {spts.filter(s => s.status === 'Draft').length === 0 ? (
                            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-xs text-slate-450">
                              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                              <p className="font-bold text-slate-500">Tidak ada konsep draf SPT tersimpan</p>
                              <p className="mt-1 leading-relaxed max-w-xs mx-auto">Silakan klik tab <strong className="text-blue-800">"Buat Konsep SPT"</strong> di atas untuk mendaftarkan formulir perpajakan baru.</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {spts.filter(s => s.status === 'Draft').map((s) => (
                                <div key={s.id} className="bg-white border border-slate-250 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-slate-350 transition gap-4">
                                  <div className="text-xs font-semibold space-y-2">
                                    <div className="flex justify-between items-start gap-2">
                                      <h4 className="font-black text-slate-900 break-words leading-tight">{s.sptType}</h4>
                                      <span className="bg-slate-100 text-slate-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg shrink-0 border border-slate-200/50">
                                        Draft
                                      </span>
                                    </div>
                                    <div className="space-y-1 text-slate-500 leading-snug">
                                      <p>Tahun Pajak: <strong className="text-slate-800">{s.year}</strong></p>
                                      <p>Omzet Bruto: <strong className="text-slate-800">{formatRupiah(s.grossIncome)}</strong></p>
                                      <p>Estimasi Pajak: <strong className="text-blue-700 font-bold">{formatRupiah(s.taxPaid)}</strong></p>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-1 font-extrabold text-[10.5px]">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (confirm('Apakah Anda yakin ingin menghapus draf konsep ini?')) {
                                          deleteSpt(s.id, s.year);
                                        }
                                      }}
                                      className="text-red-650 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition"
                                    >
                                      Hapus
                                    </button>

                                    <div className="flex space-x-1.5">
                                      <button
                                        type="button"
                                        onClick={() => promoteDraftToBillingOrReport(s, 'Menunggu Pembayaran')}
                                        className="bg-yellow-405 hover:bg-yellow-500 text-slate-950 px-3 py-1.5 rounded-lg transition border border-yellow-300"
                                      >
                                        Terbitkan Billing
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const rand = String(Math.floor(1000 + Math.random() * 9000));
                                          if (prompt(`Masukkan OTP berikut demi pelaporan aman: ${rand}`) === rand) {
                                            promoteDraftToBillingOrReport(s, 'Sudah Lapor');
                                          } else {
                                            showSystemToast('Konfirmasi gagal!');
                                          }
                                        }}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition"
                                      >
                                        Laporkan
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* --- SUBTAB VIEW: UNPAID BILLING WAITING PAYMENT --- */}
                      {sptSubTab === 'unpaid' && (
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 border border-slate-205 rounded-2xl flex items-center justify-between gap-4">
                            <div>
                              <h3 className="font-extrabold text-slate-900 text-sm">Antrian SPT Menunggu Pembayaran</h3>
                              <p className="text-[11px] text-slate-450 mt-0.5">Segera selesaikan pembayaran setoran pajak sesuai kode billing aktif agar pelaporan tanda bukti penerimaan BPE dapat diterbitkan.</p>
                            </div>
                            <span className="bg-amber-100 text-amber-805 text-xs px-2.5 py-1 rounded-xl font-extrabold shrink-0 border border-amber-200">
                              Kode Billing Aktif
                            </span>
                          </div>

                          {spts.filter(s => s.status === 'Menunggu Pembayaran').length === 0 ? (
                            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-xs text-slate-450">
                              <CreditCard className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                              <p className="font-bold text-slate-500">Tidak ada tagihan billing SPT aktif</p>
                              <p className="mt-1 leading-relaxed max-w-xs mx-auto">Silakan buat konsep SPT atau upgrade konsep draft yang ada untuk menerbitkan billing tagihan otomatis.</p>
                            </div>
                          ) : (
                            <div className="space-y-3.5">
                              {spts.filter(s => s.status === 'Menunggu Pembayaran').map((s) => {
                                // generate stable pseudo payment code
                                const pseudoBillingCode = `3245${s.year.slice(2)}09${String(s.grossIncome).slice(1, 5) || '1234'}${String(Math.abs(s.taxPaid)).slice(0, 4) || '8800'}`;
                                return (
                                  <div key={s.id} className="bg-white border border-slate-250 p-5 rounded-2xl shadow-sm hover:border-slate-300 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                                    <div className="space-y-1.5 text-xs font-semibold leading-relaxed">
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-black text-slate-900 text-[12.5px] uppercase">{s.sptType}</h4>
                                        <span className="bg-amber-100 text-amber-805 text-[9px] font-black uppercase px-2 py-0.5 rounded-md border border-amber-180 shrink-0">
                                          Menunggu Pembayaran
                                        </span>
                                      </div>
                                      
                                      <div className="text-slate-500 space-y-0.5 font-semibold">
                                        <p>Kode ID Billing: <strong className="text-slate-800 font-mono tracking-wider">{pseudoBillingCode} (Masa Aktif 30 Hari)</strong></p>
                                        <p>Tahun Laporan: <strong className="text-slate-800">{s.year}</strong></p>
                                        <p>Perputaran Bruto / Omzet: <strong className="text-slate-850">{formatRupiah(s.grossIncome)}</strong></p>
                                      </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2.5 self-stretch justify-between md:justify-center shrink-0 min-w-0 md:min-w-[180px]">
                                      <div className="text-right text-xs font-semibold">
                                        <span className="text-[9.5px] text-slate-400 block uppercase font-bold">Pajak Terutang (NTPN Due)</span>
                                        <strong className="text-amber-805 text-sm font-black">{formatRupiah(s.taxPaid)}</strong>
                                      </div>

                                      <div className="flex space-x-2 w-full font-extrabold text-[10.5px]">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (confirm('Batal billing? Data yang dibatalkan akan dibuang kembali.')) {
                                              deleteSpt(s.id, s.year);
                                            }
                                          }}
                                          className="flex-grow text-center text-red-655 hover:bg-rose-50 px-3 py-2 rounded-lg transition border border-transparent"
                                        >
                                          Batalkan Tagihan
                                        </button>
                                        
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (confirm(`Apakah Anda yakin ingin melakukan pembayaran setoran SPT senilai ${formatRupiah(s.taxPaid)} menggunakan Deposit Cash Balance DJP Anda?`)) {
                                              processUnpaidSptPayment(s);
                                            }
                                          }}
                                          className="flex-grow bg-blue-800 hover:bg-blue-900 border border-blue-750 text-white text-center px-4.5 py-2 rounded-lg transition font-black shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                                        >
                                          <CreditCard className="w-3.5 h-3.5" />
                                          <span>Bayar &amp; Lapor</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {/* --- SUBTAB VIEW: REPORTED LIST --- */}
                      {sptSubTab === 'reported' && (
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                          <h3 className="font-extrabold text-slate-900 text-sm mb-4">Riwayat Laporan SPT Tahunan &amp; Masa Wajib Pajak</h3>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                                  <th className="pb-3 text-left">Tahun Pajak Laporan</th>
                                  <th className="pb-3 px-3">Jenis Formulir</th>
                                  <th className="pb-3 px-3">Kategori Status</th>
                                  <th className="pb-3 px-3 text-right">Omzet Dilaporkan</th>
                                  <th className="pb-3 px-3">Status Dokumen</th>
                                  <th className="pb-3 px-3 text-center">Sertifikat</th>
                                  <th className="pb-3 pl-3 text-center">Aksi</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-150 text-slate-705 font-semibold leading-relaxed">
                                {spts.filter(s => s.status !== 'Draft' && s.status !== 'Menunggu Pembayaran').map(s => (
                                  <tr key={s.id} className="hover:bg-slate-50 transition">
                                    <td className="py-3.5 font-bold text-slate-900">{s.year}</td>
                                    <td className="py-3.5 px-3 font-mono">{s.sptType}</td>
                                    <td className="py-3.5 px-3">
                                      <div className="font-bold text-slate-800">
                                        {s.pembetulanKe && s.pembetulanKe > 0 ? `Pembetulan ke-${s.pembetulanKe}` : 'Normal'}
                                      </div>
                                      <div className="text-[10px] text-slate-400">Nihil / Selesai</div>
                                    </td>
                                    <td className="py-3.5 px-3 text-right text-slate-900">{formatRupiah(s.grossIncome)}</td>
                                    <td className="py-3.5 px-3">
                                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded px-2.5 py-0.5 text-[9.5px]">
                                        Sudah Lapor
                                      </span>
                                    </td>
                                    <td className="py-3.5 px-3 text-center">
                                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 font-semibold">
                                        <button 
                                          onClick={() => openHistoricalBpeFromSpt(s)}
                                          className="bg-blue-50 text-blue-700 hover:bg-[#1e3a8a] hover:text-white border border-blue-100 px-2.5 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 shrink-0"
                                          title="Buka Tanda Terima BPE"
                                        >
                                          <span>BPE Token</span>
                                        </button>
                                        <button 
                                          onClick={() => downloadSpt(s)}
                                          className="bg-yellow-50 text-yellow-800 hover:bg-yellow-405 hover:text-slate-950 border border-yellow-200 px-2.5 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 shrink-0"
                                          title="Download Berkas Lunas E-SPT (.html)"
                                        >
                                          <Download className="w-3 h-3" />
                                          <span>Download</span>
                                        </button>
                                      </div>
                                    </td>
                                    <td className="py-3.5 pl-3 text-center">
                                      <div className="flex items-center justify-center space-x-1">
                                        <button 
                                          onClick={() => startPembetulanSpt(s)}
                                          className="text-indigo-650 hover:text-white bg-indigo-50 hover:bg-indigo-600 p-1.5 rounded-lg transition"
                                          title="Lakukan Pembetulan SPT (Revisi)"
                                        >
                                          <Sliders className="w-3.5 h-3.5" />
                                        </button>
                                        <button 
                                          onClick={() => {
                                            if (confirm(`Apakah Anda yakin ingin menghapus Laporan SPT Tahun ${s.year}?`)) {
                                              deleteSpt(s.id, s.year);
                                            }
                                          }}
                                          className="text-red-650 hover:text-white bg-rose-50 hover:bg-red-650 p-1.5 rounded-lg transition"
                                          title="Hapus Laporan Pajak"
                                        >
                                          <Trash className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* TAB 4: SIMULASI PPh UMKM MANAJEMEN */}
                  {portalTab === 'umkm' && (
                    <div className="space-y-6">
                      
                      <div className="pb-4 border-b border-slate-200">
                        <h2 className="text-lg font-black text-slate-900 tracking-tight">Kalkulator Pajak Masa Bulanan (PP 55)</h2>
                        <p className="text-xs text-slate-500">Mendaftarkan masa omzet bulanan dan penyetoran kode billing pajak secara otomatis.</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Input block (5 cols) */}
                        <div className="lg:col-span-12 xl:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                          <h4 className="font-extrabold text-slate-950 text-xs uppercase tracking-widest pb-2 border-b border-slate-100">Registrasi Masa Omzet</h4>
                          
                          <form onSubmit={computeMonthlyUmkmPph} className="space-y-4 text-xs font-semibold text-slate-700">
                            <div className="space-y-1 pb-1">
                              <label className="block text-[10px] font-extrabold text-slate-500 mb-1">Masa Periode Pajak (Tanggal, Bulan, Tahun)</label>
                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Tanggal</label>
                                  <select 
                                    value={umkmDay}
                                    onChange={(e) => setUmkmDay(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  >
                                    {Array.from({ length: 31 }, (_, i) => {
                                      const d = String(i + 1).padStart(2, '0');
                                      return <option key={d} value={d}>{d}</option>;
                                    })}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Bulan</label>
                                  <select 
                                    value={umkmMonth}
                                    onChange={(e) => setUmkmMonth(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  >
                                    {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map(m => (
                                      <option key={m} value={m}>{m}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Tahun</label>
                                  <select 
                                    value={umkmYear}
                                    onChange={(e) => setUmkmYear(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  >
                                    {["2023", "2024", "2025", "2026", "2027", "2028"].map(yr => (
                                      <option key={yr} value={yr}>{yr}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-extrabold text-slate-500">Jumlah Omzet Kotor Bulan Ini (Rupiah)</label>
                              <div className="relative rounded-xl">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <span class="font-bold">Rp</span>
                                </div>
                                <input 
                                  type="number"
                                  required
                                  value={umkmGross}
                                  onChange={(e) => setUmkmGross(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-205 rounded-xl pl-9 pr-3 py-2.5 font-bold text-slate-950"
                                  placeholder="Contoh: 20000000"
                                />
                              </div>
                            </div>

                            <button 
                              type="submit"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 font-bold rounded-xl transition"
                            >
                              Hitung PPh Final Bulanan (PP 55)
                            </button>
                          </form>

                          {/* Computed output banner */}
                          {umkmCalcResult && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-xs text-slate-700"
                            >
                              <div className="flex justify-between font-semibold">
                                <span className="text-slate-400">Klasifikasi Wajib Pajak:</span>
                                <span className="text-slate-800">Orang Pribadi (PP 55)</span>
                              </div>
                              <div className="flex justify-between font-semibold">
                                <span className="text-slate-400">Dasar Pengenaan Pajak (DPP):</span>
                                <span className="text-slate-900 font-bold">{formatRupiah(umkmCalcResult.taxableAmount)}</span>
                              </div>
                              
                              <div className="bg-blue-50 border border-blue-50 p-3 rounded-xl flex justify-between items-center">
                                <div>
                                  <span className="text-[8px] font-extrabold uppercase text-slate-450 block">Tagihan Pajak Disetor</span>
                                  <div className="text-base text-blue-900 font-black">{formatRupiah(umkmCalcResult.taxDue)}</div>
                                </div>

                                <button 
                                  onClick={laporAndEnrollUmkmRecord}
                                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] py-1.5 px-3 rounded-lg transition"
                                >
                                  Lapor &amp; Dapatkan Billing
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* List block (7 cols) */}
                        <div className="lg:col-span-12 xl:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
                          <h4 className="font-extrabold text-slate-950 text-xs uppercase tracking-widest pb-1">Daftar Tagihan &amp; Pembayaran Pajak Masa</h4>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                                  <th className="pb-3 text-left">Periode Masa</th>
                                  <th className="pb-3 px-2 text-right">Omzet Kotor</th>
                                  <th className="pb-3 px-2 text-right">Pajak Setor (0.5%)</th>
                                  <th className="pb-3 px-2 text-center">Status</th>
                                  <th className="pb-3 pl-2 text-right">Tindakan</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-150 text-slate-700 font-semibold leading-relaxed">
                                {umkmRecords.map(item => (
                                  <tr key={item.id} className="hover:bg-slate-50 transition">
                                    <td className="py-3 font-extrabold text-slate-900">{item.period}</td>
                                    <td className="py-3 px-2 text-right text-slate-550">{formatRupiah(item.turnover)}</td>
                                    <td className="py-3 px-2 text-right text-slate-950">{formatRupiah(item.taxDue)}</td>
                                    <td className="py-3 px-2 text-center">
                                      {item.status === 'Lunas' ? (
                                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded px-2.5 py-0.5 text-[9px] font-bold">Lunas</span>
                                      ) : (
                                        <span className="bg-amber-50 text-amber-750 border border-amber-100 rounded px-2.5 py-0.5 text-[9px] font-bold">Belum Bayar</span>
                                      )}
                                    </td>
                                    <td className="py-3 pl-2 text-right">
                                      <div className="flex items-center justify-end space-x-1.5">
                                        {item.status === 'Lunas' ? (
                                          <button 
                                            onClick={() => openHistoricalBpeFromUmkm(item)}
                                            className="text-emerald-750 hover:text-white bg-emerald-50 hover:bg-emerald-600 px-2 py-1 rounded text-[10px] font-bold transition flex items-center gap-1"
                                          >
                                            <Download className="w-3" />
                                            <span>BPE Lunas</span>
                                          </button>
                                        ) : (
                                          <button 
                                            onClick={() => openPaymentForId(item)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] py-1 px-3 rounded shadow-xs"
                                          >
                                            Bayar
                                          </button>
                                        )}

                                        <button 
                                          onClick={() => startEditUmkm(item)}
                                          className="text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 p-1 rounded-lg transition"
                                          title="Edit Catatan"
                                        >
                                          <Edit className="w-3.5 h-3.5" />
                                        </button>
                                        <button 
                                          onClick={() => {
                                            if (confirm(`Apakah Anda yakin ingin menghapus catatan Masa ${item.period}?`)) {
                                              deleteUmkmRecord(item.id, item.period);
                                            }
                                          }}
                                          className="text-red-600 hover:text-white bg-rose-50 hover:bg-red-650 p-1 rounded-lg transition"
                                          title="Hapus Catatan"
                                        >
                                          <Trash className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* TAB: PEMBAYARAN & E-BILLING */}
                  {portalTab === 'pembayaran' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                        <div>
                          <h2 className="text-lg font-extrabold text-blue-950 flex items-center space-x-2">
                            <CreditCard className="w-5 h-5 text-[#1e3a8a] font-extrabold" />
                            <span>Penyetoran &amp; E-Billing Pajak Terpadu</span>
                          </h2>
                          <p className="text-[10.5px] text-slate-505 font-medium">Buat kode billing (Surat Setoran Pajak) dan bayar setoran Anda secara instan menggunakan simulator aman DJP.</p>
                        </div>
                        
                        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 h-9 items-center self-start">
                          <button
                            onClick={() => setPembayaranSubTab('create')}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${pembayaranSubTab === 'create' ? 'bg-[#1e3a8a] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}`}
                          >
                            Buat Kode Billing
                          </button>
                          <button
                            onClick={() => setPembayaranSubTab('list')}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1 ${pembayaranSubTab === 'list' ? 'bg-[#1e3a8a] text-white shadow-xs' : 'text-slate-650 hover:bg-slate-200'}`}
                          >
                            <span>Tagihan &amp; Riwayat</span>
                            {billings.filter(b => b.status === 'Belum Bayar').length > 0 && (
                              <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                                {billings.filter(b => b.status === 'Belum Bayar').length}
                              </span>
                            )}
                          </button>
                        </div>
                      </div>

                      {pembayaranSubTab === 'create' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                          
                          {/* Form Section */}
                          <div className="lg:col-span-12 xl:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 text-xs">
                            <div className="border-b border-slate-100 pb-3">
                              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">Formulir Surat Setoran Elektronik (SSE)</h3>
                              <p className="text-[10px] text-slate-400">Silakan isi jenis pajak, masa/tahun penyetoran, dan nominal.</p>
                            </div>

                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const parsedAmount = parseInt(billingAmount.replace(/\D/g, ''));
                              if (!billingAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
                                showSystemToast('Gagal: Jumlah nominal setoran harus lebih besar dari Rp 0!');
                                return;
                              }
                              
                              const numAm = parsedAmount;
                              const selectedKap = KAP_LIST.find(k => k.code === billingKap);
                              const selectedKjs = KJS_LIST.find(k => k.code === billingKjs);
                              const bCode = `51${Math.floor(1000000000000 + Math.random() * 9000000000000)}`;
                              const createdDate = new Date().toISOString().split('T')[0];

                              const newBill: BillingRecord = {
                                id: `bill-${Date.now()}`,
                                kapCode: billingKap,
                                kapName: selectedKap ? selectedKap.name : 'PPh Final',
                                kjsCode: billingKjs,
                                kjsName: selectedKjs ? selectedKjs.name : 'Setoran Masa',
                                amount: numAm,
                                period: billingPeriod,
                                year: billingYear,
                                billingCode: bCode,
                                status: 'Belum Bayar',
                                dateCreated: createdDate
                              };

                              setBillings(prev => [newBill, ...prev]);

                              // Record a DEBET (Accrued tax liabilities) entry in Buku Besar
                              setLedger(prev => {
                                const lastEntry = prev[prev.length - 1];
                                const prevBalance = lastEntry ? lastEntry.balance : 0;
                                const newLedgerItem: LedgerRecord = {
                                  id: `led-${Date.now()}`,
                                  date: createdDate,
                                  type: 'DEBET',
                                  category: newBill.kapName,
                                  description: `Timbul Kewajiban Pajak ${newBill.kapName} (${newBill.period} ${newBill.year}) - Penerbitan Billing`,
                                  reference: `BILL-${bCode.slice(0, 8)}`,
                                  debet: numAm,
                                  kredit: 0,
                                  balance: prevBalance + numAm
                                };
                                return [...prev, newLedgerItem];
                              });

                              showSystemToast(`Sukses! Kode E-Billing ${bCode} berhasil diterbitkan.`);
                              setBillingAmount('');
                              setPembayaranSubTab('list');
                            }} className="space-y-4">
                              
                              <div>
                                <label className="block font-bold text-slate-650 mb-1">Mata Anggaran Pajak (KAP)</label>
                                <select
                                  value={billingKap}
                                  onChange={(e) => setBillingKap(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-900"
                                >
                                  {KAP_LIST.map(kap => (
                                    <option key={kap.code} value={kap.code}>{kap.code} - {kap.name}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block font-bold text-slate-650 mb-1">Jenis Setoran Pajak (KJS)</label>
                                <select
                                  value={billingKjs}
                                  onChange={(e) => setBillingKjs(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-900"
                                >
                                  {KJS_LIST.map(kjs => (
                                    <option key={kjs.code} value={kjs.code}>{kjs.code} - {kjs.name}</option>
                                  ))}
                                </select>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block font-bold text-slate-650 mb-1">Masa Pajak / Bulan</label>
                                  <select
                                    value={billingPeriod}
                                    onChange={(e) => setBillingPeriod(e.target.value)}
                                    className="w-full bg-slate-55 bg-slate-50 border border-slate-150 rounded-xl px-3 py-2.5 font-bold text-slate-900"
                                  >
                                    {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map(m => (
                                      <option key={m} value={m}>{m}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block font-bold text-slate-650 mb-1">Tahun Anggaran</label>
                                  <select
                                    value={billingYear}
                                    onChange={(e) => setBillingYear(e.target.value)}
                                    className="w-full bg-slate-55 bg-slate-50 border border-slate-150 rounded-xl px-3 py-2.5 font-bold text-slate-900"
                                  >
                                    {['2025', '2026', '2027'].map(y => (
                                      <option key={y} value={y}>{y}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block font-bold text-slate-650 mb-1">Jumlah Setoran (Rupiah)</label>
                                <div className="relative">
                                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-extrabold text-slate-400">Rp</span>
                                  <input
                                    type="text"
                                    required
                                    value={billingAmount}
                                    onChange={(e) => {
                                      const clean = e.target.value.replace(/\D/g, '');
                                      if (!clean) {
                                        setBillingAmount('');
                                      } else {
                                        setBillingAmount(parseInt(clean).toLocaleString('id-ID'));
                                      }
                                    }}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 font-black text-slate-950 text-xs"
                                    placeholder="Contoh: 500,000"
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="w-full bg-[#1e3a8a] hover:bg-blue-800 text-white py-2.5 rounded-xl font-bold transition flex items-center justify-center space-x-1.5 uppercase hover:shadow-md tracking-wider shadow-blue-500/10 cursor-pointer"
                              >
                                <Plus className="w-4 h-4 text-white font-black" />
                                <span>Terbitkan Kode Billing SSE</span>
                              </button>

                            </form>
                          </div>

                          {/* Quick Guide & Info Cards */}
                          <div className="lg:col-span-12 xl:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                            <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-widest border-b border-slate-150 pb-2 flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                              <span>Informasi Pengenal Pembayaran Pajak</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-1.5">
                                <span className="font-extrabold text-slate-850">Langkah 1: Terbitkan Billing</span>
                                <p className="text-slate-500 leading-relaxed text-[11px]">Masukkan KAP (misal PPh Final PP 55 / PPh Pasal 21) dan KJS yang sesuai. Kode Billing valid sepanjang 15 digit angka unik akan diterbitkan dalam tempo kurang dari 1 detik.</p>
                              </div>
                              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-1.5">
                                <span className="font-extrabold text-slate-850">Langkah 2: Selesaikan Penyetoran</span>
                                <p className="text-slate-500 leading-relaxed text-[11px]">Metode penyetoran modern didukung secara penuh (Scan QRIS Pajak &amp; Transfer Virtual Account). Penyetoran sukses akan diakui secara instan sebagai kredit di buku besar perpajakan Anda.</p>
                              </div>
                            </div>

                            <div className="bg-yellow-50/50 border border-yellow-250/50 rounded-2xl p-4 text-[11px] leading-relaxed text-slate-600 flex space-x-2.5">
                              <span className="text-amber-500 font-extrabold text-lg shrink-0">⚠️</span>
                              <p><strong>Amanah Undang-Undang Perpajakan:</strong> Kode billing yang diterbitkan berlaku selama 30 hari kalender sejak tanggal penerbitan. Pembatalan billing draft tidak dipungut denda fiskal apapun seandainya terjadi kekeliruan ketik nominal setor.</p>
                            </div>
                          </div>

                        </div>
                      ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-xs text-slate-700 space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                            <h3 className="font-extrabold text-slate-950 uppercase tracking-widest text-[11.5px]">Arsip Tagihan &amp; Resi Penyetoran SSP</h3>
                            <div className="text-slate-500 font-bold flex items-center space-x-1 sm:self-end">
                              <span>Total Tagihan Outstanding: </span>
                              <span className="text-sm font-black text-rose-600 font-mono ml-1">
                                {formatRupiah(billings.filter(b => b.status === 'Belum Bayar').reduce((acc, curr) => acc + curr.amount, 0))}
                              </span>
                            </div>
                          </div>

                          <div className="overflow-x-auto border border-slate-150 rounded-xl">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50">
                                  <th className="py-3 px-4 font-bold">KODE BILLING</th>
                                  <th className="py-3 px-4 font-bold">KAP / KJS</th>
                                  <th className="py-3 px-4 font-bold">MASA / TAHUN</th>
                                  <th className="py-3 px-4 font-bold text-right font-mono">TOTAL SETORAN</th>
                                  <th className="py-3 px-4 font-bold text-center">STATUS</th>
                                  <th className="py-3 px-4 font-bold">NTPN RESI</th>
                                  <th className="py-3 px-4 font-bold text-right">AKSI OPERASIONAL</th>
                                </tr>
                              </thead>
                              <tbody>
                                {billings.length === 0 ? (
                                  <tr>
                                    <td colSpan={7} className="text-center py-8 text-slate-400 font-medium">Belum ada transaksi billing terdaftar. Temukan / buat billing SSE baru di sub-tab sebelah kiri.</td>
                                  </tr>
                                ) : (
                                  billings.map(item => (
                                    <tr key={item.id} className="border-b border-slate-100 font-medium hover:bg-slate-50 text-[11.5px]">
                                      <td className="py-3 px-4 font-mono font-bold text-slate-900 select-all">{item.billingCode}</td>
                                      <td className="py-3 px-4 leading-snug">
                                        <div className="font-bold text-slate-800">{item.kapName}</div>
                                        <div className="text-[10px] text-zinc-400 font-mono">{item.kapCode} | {item.kjsCode} - {item.kjsName}</div>
                                      </td>
                                      <td className="py-3 px-4">{item.period} {item.year}</td>
                                      <td className="py-3 px-4 font-mono font-black text-slate-900 text-right">{formatRupiah(item.amount)}</td>
                                      <td className="py-3 px-4 text-center">
                                        {item.status === 'Lunas' ? (
                                          <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded text-[10px]">LUNAS</span>
                                        ) : (
                                          <span className="bg-rose-100 text-rose-800 font-extrabold px-2 py-0.5 rounded text-[10px] animate-pulse">BELUM BAYAR</span>
                                        )}
                                      </td>
                                      <td className="py-3 px-4 font-mono font-bold text-slate-800 text-blue-900">
                                        {item.ntpn ? (
                                          <span className="bg-blue-50 border border-blue-150 px-2 pl-2.5 py-0.5 rounded text-blue-800 select-all block text-center uppercase text-[10px] font-mono tracking-wider">{item.ntpn}</span>
                                        ) : (
                                          <span className="text-slate-350 italic text-[10px]">-</span>
                                        )}
                                      </td>
                                      <td className="py-3 px-4 text-right">
                                        {item.status === 'Belum Bayar' ? (
                                          <button
                                            onClick={() => {
                                              setPayingBilling(item);
                                              setPayMethod('QRIS');
                                              setQrModalOpen(true);
                                            }}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-[10.5px] font-extrabold transition uppercase shadow-xs cursor-pointer"
                                          >
                                            Bayar Sekarang
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => {
                                              setReceiptModel({
                                                tokenId: item.ntpn!,
                                                wpName: wpName,
                                                wpNpwp: loginNpwp,
                                                serviceName: `Penyetoran Pajak Surat Setoran ${item.kapName}`,
                                                periodText: `${item.period} ${item.year}`,
                                                reportedAmount: item.amount * 200,
                                                finalTax: item.amount,
                                                methodText: 'Identitas NTPN Terbayar Buku Besar'
                                              });
                                              setBpeModalOpen(true);
                                            }}
                                            className="bg-blue-50 text-[#1e3a8a] border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-[10.5px] font-extrabold transition uppercase cursor-pointer"
                                          >
                                            Cetak Resi
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB: BUKU BESAR WP (LEDGER) */}
                  {portalTab === 'bukubesar' && (
                    <div className="space-y-6">
                      <div className="pb-4 border-b border-slate-200">
                        <h2 className="text-lg font-extrabold text-blue-950 flex items-center space-x-2">
                          <FileCheck2 className="w-5 h-5 text-[#1e3a8a] font-extrabold" />
                          <span>Buku Besar (General Ledger) Pembukuan Fiskal</span>
                        </h2>
                        <p className="text-[10.5px] text-slate-505 font-medium">Catatan riwayat akrual perpajakan Anda. Debet mencerminkan pengakuan utang/faktur/SPT, Kredit mencerminkan penyetoran/pelunasan billing.</p>
                      </div>

                      {/* Summary cards on top */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-705">
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                          <span className="text-slate-400 block uppercase font-bold text-[9px] tracking-wider">Total Debet (Pengakuan Utang)</span>
                          <strong className="text-sm font-black text-rose-600 font-mono mt-1 block">
                            {formatRupiah(ledger.reduce((acc, curr) => acc + curr.debet, 0))}
                          </strong>
                          <span className="text-[9.5px] text-rose-500 mt-1 block font-medium">Beban Fiskal Terdaftar</span>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                          <span className="text-slate-400 block uppercase font-bold text-[9px] tracking-wider">Total Kredit (Pelunasan Setoran)</span>
                          <strong className="text-sm font-black text-emerald-600 font-mono mt-1 block">
                            {formatRupiah(ledger.reduce((acc, curr) => acc + curr.kredit, 0))}
                          </strong>
                          <span className="text-[9.5px] text-emerald-600 mt-1 block font-medium">Pemberian Dana NTPN Terverifikasi</span>
                        </div>
                        <div className="bg-[#112d72] border border-blue-950 text-white rounded-2xl p-4 shadow-xs relative overflow-hidden">
                          <span className="text-slate-300 block uppercase font-bold text-[9px] tracking-wider">Saldo Outstanding berjalan</span>
                          <strong className="text-base font-black text-yellow-400 font-mono mt-1 block">
                            {formatRupiah(ledger.reduce((acc, curr) => acc + curr.debet - curr.kredit, 0))}
                          </strong>
                          <span className="text-[9.5px] text-zinc-350 mt-1 block font-medium">Wajib Disetor (Unpaid Liabilities)</span>
                          <div className="absolute top-1/2 right-4 -translate-y-1/2 scale-150 rotate-12 opacity-10">
                            <FileCheck2 className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Ledger Records Table */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-xs text-slate-705 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                          <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[11.5px]">Kronologi Laporan Posisi Mutasi Pajak</h3>
                          <span className="bg-blue-50 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-blue-150 w-max sm:self-end">Coretax Real-Time Audit Trail</span>
                        </div>

                        <div className="overflow-x-auto border border-slate-150 rounded-xl">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50">
                                <th className="py-3 px-4 font-bold">TANGGAL</th>
                                <th className="py-3 px-4 font-bold">REFERENSI</th>
                                <th className="py-3 px-4 font-bold">KATEGORI PERPAJAKAN</th>
                                <th className="py-3 px-4 font-bold">DESKRIPSI TRANSAKSI</th>
                                <th className="py-3 px-4 font-bold text-right">MUTASI DEBET (+)</th>
                                <th className="py-3 px-4 font-bold text-right">MUTASI KREDIT (-)</th>
                                <th className="py-3 px-4 font-bold text-right font-mono">SALDO KUMULATIF</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Calculate running balance dynamically to avoid indexing/stale-state mismatch! */}
                              {(() => {
                                let running = 0;
                                return ledger.map((item, idx) => {
                                  running += (item.debet - item.kredit);
                                  return (
                                    <tr key={item.id} className="border-b border-slate-100 font-medium hover:bg-slate-50 text-[11.5px]">
                                      <td className="py-3 px-4 text-slate-500 font-mono select-all font-bold">{item.date}</td>
                                      <td className="py-3 px-4 font-mono font-bold text-indigo-900 uppercase tracking-wide">{item.reference}</td>
                                      <td className="py-3 px-4 font-bold text-slate-800">{item.category}</td>
                                      <td className="py-3 px-4 text-slate-500 leading-relaxed max-w-xs">{item.description}</td>
                                      <td className="py-3 px-4 font-mono text-right text-rose-600 font-extrabold">
                                        {item.debet > 0 ? `+ ${formatRupiah(item.debet)}` : '-'}
                                      </td>
                                      <td className="py-3 px-4 font-mono text-right text-emerald-600 font-extrabold">
                                        {item.kredit > 0 ? `- ${formatRupiah(item.kredit)}` : '-'}
                                      </td>
                                      <td className="py-3 px-4 font-mono text-right text-slate-900 font-black">
                                        {formatRupiah(running)}
                                      </td>
                                    </tr>
                                  );
                                });
                              })()}
                            </tbody>
                          </table>
                        </div>

                        <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl text-[11px] leading-relaxed text-slate-500 space-y-1 mt-4">
                          <p className="font-extrabold text-[#112d72]">Petunjuk Rekonsiliasi Auditor Buku Besar:</p>
                          <p>Waktu perekaman mengikuti zona waktu WITA/WIB DJP Core-Server secara terpusat. Untuk pelaporan tahunan, dipersilakan melakukan ekspor data ledger di panel setelan sebagai lampiran pelaporan akuntansi eksternal resmi.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: MY PROFILE CREDENTIALS */}
                  {portalTab === 'profil' && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-xs text-slate-700">
                      
                      {/* Top Profile Header Info */}
                      <div className="flex items-center space-x-4 border-b border-slate-100 pb-5">
                        <div className="w-14 h-14 bg-gradient-to-tr from-blue-700 to-yellow-500 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold shadow-sm">
                          {wpName ? wpName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'WP'}
                        </div>
                        <div>
                          <h3 className="text-base font-black text-slate-900 tracking-tight">{wpName}</h3>
                          <p className="text-[10.5px] text-slate-450 font-semibold uppercase tracking-wider">Perdagangan Retail &amp; Layanan Souvenir</p>
                        </div>
                      </div>

                      {/* Info Kredensial Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-semibold pb-5 border-b border-slate-100">
                        <div className="space-y-2">
                          <h4 className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            NPWP Kredensial Baru
                          </h4>
                          
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-slate-400">NPWP 16 Digit (NIK):</span>
                              <strong className="text-slate-900 font-mono text-sm">{loginNpwp}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">NPWP 15 Digit (Lama):</span>
                              <strong className="text-slate-900 font-mono">12.034.005.6-007.000</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">KLU Usaha UTama:</span>
                              <strong className="text-slate-800 text-right">47111 - Minimarket Retail Mainan</strong>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            Batas Insentif Bebas Pajak
                          </h4>
                          
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Fasilitas NPT 500 Juta:</span>
                              <strong className="text-emerald-700 bg-emerald-50 border border-emerald-110 px-2 py-0.5 rounded text-[10px]">AKTIF (PP 55)</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Uang Omset Terlaporkan:</span>
                              <strong className="text-slate-900">{formatRupiah(getAccumulatedTurnover())}</strong>
                            </div>
                            <div className="flex justify-between items-center text-[10.5px] pt-1">
                              <span className="text-slate-400">Sertifikat Wajib:</span>
                              <span className="text-blue-600 hover:underline cursor-pointer">Unduh Suket PP 55 PDF</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Section for Multi-account switching & new registration */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                        
                        {/* LIST & SWITCHER */}
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                              <User className="w-4 h-4 text-blue-900" />
                              Beralih Akun Wajib Pajak ({accounts.length})
                            </h4>
                            <p className="text-[10.5px] text-slate-450 mt-1 leading-relaxed">
                              Pilih profil terdaftar di bawah untuk beralih modul demonstrasi tanpa keluar sesi.
                            </p>
                          </div>

                          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                            {accounts.map((acc) => {
                              const isActive = acc.npwp === loginNpwp;
                              return (
                                <div 
                                  key={acc.npwp} 
                                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                                    isActive 
                                      ? 'border-blue-300 bg-blue-50/50 shadow-sm shadow-blue-50/10' 
                                      : 'border-slate-200 hover:border-slate-300 bg-white'
                                  }`}
                                >
                                  <div className="flex items-center space-x-3 min-w-0">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                                      isActive 
                                        ? 'bg-blue-800 text-white' 
                                        : 'bg-slate-100 text-slate-700'
                                    }`}>
                                      {acc.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 text-[11px] leading-tight font-semibold">
                                      <p className="text-slate-905 font-bold truncate">{acc.name}</p>
                                      <p className="text-slate-400 font-mono text-[9.5px] mt-0.5">{acc.npwp}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2 shrink-0">
                                    {isActive ? (
                                      <span className="bg-emerald-100 text-emerald-800 text-[9.5px] px-2 py-1 rounded-lg font-black uppercase tracking-wider flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Aktif
                                      </span>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => switchActiveAccount(acc.npwp)}
                                        className="bg-blue-800 hover:bg-blue-900 text-white text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg transition"
                                      >
                                        Beralih
                                      </button>
                                    )}

                                    {/* Vivian cannot be deleted, custom-made accounts can be */}
                                    {acc.npwp !== '9988660000005153' && (
                                      <button
                                        type="button"
                                        onClick={() => deleteAccountFromProfile(acc.npwp)}
                                        className="text-slate-400 hover:text-red-650 bg-slate-50 hover:bg-red-50 p-1.5 rounded-lg border border-slate-150 transition"
                                        title="Hapus Akun Kustom"
                                      >
                                        <Trash className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* CREATE ACCOUNT IN-PROFILE FORM */}
                        <div className="bg-slate-50/50 border border-slate-205 rounded-3xl p-5 space-y-4">
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                              <PlusCircle className="w-4 h-4 text-yellow-600" />
                              Registrasi Akun Baru
                            </h4>
                            <p className="text-[10.5px] text-slate-450 mt-1 leading-relaxed">
                              Buat akun wajib pajak simulasi lainnya dan langsung beralih ke identitas tersebut.
                            </p>
                          </div>

                          <form onSubmit={handleProfileCreateAccount} className="space-y-3 font-semibold">
                            <div className="space-y-1">
                              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">NPWP / NIK 16 Digit Baru</label>
                              <input 
                                type="text"
                                maxLength={16}
                                required
                                value={profNpwp}
                                onChange={(e) => setProfNpwp(e.target.value.replace(/\D/g, ''))}
                                placeholder="Contoh: 1200340056007890"
                                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-950 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Nama Lengkap Wajib Pajak</label>
                              <input 
                                type="text"
                                required
                                value={profName}
                                onChange={(e) => setProfName(e.target.value.toUpperCase())}
                                placeholder="Masukkan nama dan gelar baru"
                                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-950 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Email</label>
                                <input 
                                  type="email"
                                  required
                                  value={profEmail}
                                  onChange={(e) => setProfEmail(e.target.value)}
                                  placeholder="nama@email.com"
                                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-extrabold text-slate-500 uppercase">No. Handphone</label>
                                <input 
                                  type="text"
                                  required
                                  value={profPhone}
                                  onChange={(e) => setProfPhone(e.target.value)}
                                  placeholder="+628..."
                                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-955 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Alamat Terdaftar</label>
                              <textarea 
                                required
                                value={profAddress}
                                onChange={(e) => setProfAddress(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-950 font-medium h-12 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Nama jalan, RT/RW, kelurahan, kecamatan, kota/provinsi"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Kunci Sandi (Password)</label>
                              <input 
                                type="password"
                                required
                                value={profPassword}
                                onChange={(e) => setProfPassword(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-950 font-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>

                            <button 
                              type="submit"
                              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-extrabold rounded-xl py-2.5 text-xs tracking-wider uppercase transition flex items-center justify-center space-x-1.5 shadow-sm"
                            >
                              <span>Daftar &amp; Aktifkan Sesi Akun Baru</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </form>
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              </div>

            </div>
          )}

        </div>
      )}


      {/* ---------------------------------------------------- */}
      {/* ACTIVE SCREEN: DOWNLOAD CODE TEMPLATE                */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'html-source' && (
        <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-5">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="bg-blue-50 text-blue-800 mx-auto w-12 h-12 rounded-2xl flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Unduh Prototype HTML Utama</h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                Anda dapat menyalin atau mengunduh seluruh fungsionalitas PalakOnline ini ke dalam <strong>satu file .html mandiri</strong>. Cukup simpan file dan buka langsung di browser laptop manapun tanpa perlu instalasi node.js atau server.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button 
                onClick={copyHtmlCodeString}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold py-3.5 px-6 rounded-2xl text-xs transition flex items-center justify-center space-x-2"
              >
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Salin Teks Kode HTML</span>
              </button>

              <button 
                onClick={downloadSingleHtml}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs transition flex items-center justify-center space-x-2 shadow-md shadow-blue-500/15"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Unduh File HTML Simpel</span>
              </button>
            </div>

            {/* Quick Preview of the HTML code structure */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-850 space-y-2.5">
              <div className="flex justify-between items-center text-[10.5px] text-slate-500 font-mono font-extrabold tracking-wider uppercase border-b border-slate-800 pb-2">
                <span>pajak_coretax_simpel.html</span>
                <span className="text-emerald-400">KODE SIAP EKSPOR</span>
              </div>
              <pre className="text-[11px] text-slate-300 font-mono overflow-x-auto p-2 leading-relaxed">
{`<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>PalakOnline - Simulasi Pajak</title>
    <!-- Tailwind CSS Play CDN -->`}
              </pre>
              <div className="text-slate-500 text-[10.5px] italic text-center py-1">
                ... 850 lines of combined modern HTML5, Tailwind CSS visual styling, and pure JavaScript logics ...
              </div>
            </div>
          </div>
        </main>
      )}


      {/* ---------------------------------------------------- */}
      {/* POPUP MODAL: PAYMENT QRIS / VA CODE SIMULATION       */}
      {/* ---------------------------------------------------- */}
      {qrModalOpen && (payingRecord || payingBilling) && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden border border-slate-200 shadow-2xl">
            
            <div className="bg-slate-100 border-b border-slate-200 py-3.5 px-5 flex items-center justify-between text-xs">
              <span className="bg-blue-100 text-blue-800 font-black px-2 py-0.5 rounded text-[8.5px]">SIMULATOR</span>
              <h4 className="font-extrabold text-slate-900">
                {payingBilling ? `Setoran ${payingBilling.kapName}` : 'Pembayaran Elektronik Billing Pajak'}
              </h4>
              <button 
                onClick={() => {
                  setQrModalOpen(false);
                  setPayingBilling(null);
                }} 
                className="text-slate-400 hover:text-slate-600 focus:outline-hidden"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
 
            <div className="p-6 space-y-5 text-xs text-slate-700">
              <div className="bg-blue-50 text-blue-900 p-4 rounded-xl border border-blue-50/50 flex justify-between items-center">
                <div>
                  <span className="text-[8.5px] text-slate-400 block uppercase font-bold">KODE BILLING</span>
                  <strong className="text-slate-900 font-mono">
                    {payingBilling ? payingBilling.billingCode : (payingRecord?.billingCode || '4622-1923-08')}
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-[8.5px] text-slate-400 block uppercase font-bold">TOTAL SETOR</span>
                  <strong className="text-blue-950 font-black text-sm">
                    {formatRupiah(payingBilling ? payingBilling.amount : (payingRecord?.taxDue || 0))}
                  </strong>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">PILILAH SALURAN METODE</label>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <button 
                    onClick={() => setPayMethod('QRIS')}
                    className={`py-2 px-3 rounded-lg border text-[11px] font-bold transition ${payMethod === 'QRIS' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 text-slate-605 hold:bg-slate-50'}`}
                  >
                    Scan QRIS Pajak
                  </button>
                  <button 
                    onClick={() => setPayMethod('VA')}
                    aria-label="VA"
                    className={`py-2 px-3 rounded-lg border text-[11px] font-bold transition ${payMethod === 'VA' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 text-slate-605 hold:bg-slate-50'}`}
                  >
                    Virtual Account
                  </button>
                </div>
              </div>

              {/* Dynamic visual representation */}
              <div className="bg-slate-50 p-4 rounded-xl text-center flex flex-col items-center">
                {payMethod === 'QRIS' ? (
                  <>
                    <div className="w-32 h-32 bg-white border border-slate-200 p-2 rounded-lg flex items-center justify-center relative">
                      <div className="grid grid-cols-3 gap-2 w-full h-full opacity-65">
                        <div className="bg-slate-900 rounded-sm"></div>
                        <div className="bg-slate-900 rounded-sm"></div>
                        <div className="bg-slate-50"></div>
                        <div className="bg-slate-50"></div>
                        <div className="bg-slate-900 rounded-sm"></div>
                        <div className="bg-slate-900 rounded-sm"></div>
                        <div className="bg-slate-900 rounded-sm"></div>
                        <div className="bg-slate-50"></div>
                        <div className="bg-slate-900 rounded-sm"></div>
                      </div>
                      <div className="absolute inset-x-0 bottom-1 flex justify-center">
                        <span className="bg-blue-600 text-[8px] text-white font-extrabold px-1.5 py-0.5 rounded">QRIS Pajak</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 font-medium">Pindai kode QRIS simulator untuk membayar tanpa pulsa</span>
                  </>
                ) : (
                  <div className="py-2 space-y-1">
                    <span className="text-[8.5px] text-slate-400 font-extrabold uppercase block tracking-wider">Nomor Mandiri Pajak Billing</span>
                    <strong className="text-sm font-bold text-slate-900 tracking-wider font-mono">8801 8293 8410 9321</strong>
                    <span className="text-[9.5px] text-slate-400 block font-medium">Pindahkan saldo secara virtual sesuai nominal</span>
                  </div>
                )}
              </div>

              <button 
                onClick={confirmPayingBillPayment}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold transition shadow-md shadow-emerald-500/10 text-xs tracking-wider uppercase"
              >
                Selesaikan Pembayaran (Lapor Lunas)
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ---------------------------------------------------- */}
      {/* POPUP MODAL: OFFICIAL BPE BUKTI ELEKTRONIK (RECEIPT)  */}
      {/* ---------------------------------------------------- */}
      {bpeModalOpen && receiptModel && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden border border-slate-150 shadow-2xl relative">
            
            <div className="p-6 space-y-5 text-slate-700">
              
              <div className="text-center pb-4 border-b border-dashed border-slate-200">
                <div className="inline-flex bg-emerald-50 text-emerald-600 p-2 rounded-full mb-2">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-extrabold text-slate-950 text-sm tracking-wide">BUKTI PENERIMAAN ELEKTRONIK</h3>
                <p className="text-[8.5px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">DJP KEMENTERIAN KEUANGAN - REPUBLIK INDONESIA</p>
              </div>

              <div className="space-y-2.5 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-400">Token ID Terdaftar:</span>
                  <strong className="font-mono text-slate-900">{receiptModel.tokenId}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nama Pengisi (WP):</span>
                  <strong className="text-slate-900">{receiptModel.wpName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">KLU / NPWP Pajak:</span>
                  <strong className="text-slate-900">{receiptModel.wpNpwp}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jenis Dokumen Layanan:</span>
                  <strong className="text-slate-900 text-right">{receiptModel.serviceName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Masa / Periode Buku:</span>
                  <strong className="text-slate-900">{receiptModel.periodText}</strong>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2.5">
                  <span className="text-slate-400">Peredaran Bruto Diperiksa:</span>
                  <strong className="text-slate-900">{formatRupiah(receiptModel.reportedAmount)}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-150 pb-2.5 font-extrabold">
                  <span className="text-slate-900">Pembayaran Pajak Setor (0.5%):</span>
                  <strong className="text-emerald-600 font-black text-sm">{formatRupiah(receiptModel.finalTax)}</strong>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[9.5px] leading-relaxed text-slate-400">
                *Dokumen BPE digital simulator ini sah diakui legalitas administrasinya untuk pengarsipan mandiri pembayar pajak.
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 no-print">
                <button 
                  onClick={() => setBpeModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl transition font-extrabold text-xs text-center"
                >
                  Tutup Dokumen
                </button>
                <button 
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition font-extrabold text-xs text-center flex items-center justify-center space-x-1 shadow-sm shadow-blue-500/10"
                >
                  <Printer className="w-4 h-4 text-white" />
                  <span>Cetak / Cetak PDF</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
