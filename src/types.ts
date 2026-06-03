export interface TaxRecord {
  id: string;
  date: string;
  period: string; // e.g., "Mei 2026"
  turnover: number;
  taxableAmount: number;
  taxDue: number;
  status: 'Belum Bayar' | 'Lunas';
  billingCode?: string;
  paymentMethod?: string;
  paymentDate?: string;
}

export type TaxCategory = 'Orang Pribadi' | 'Badan Usaha';

export interface FakturPajak {
  id: string;
  fakturNumber: string; // e.g., "010.000-26.00000101"
  date: string;
  buyerName: string;
  buyerNpwp: string;
  productDescription: string;
  amount: number;
  ppnAmount: number; // 11% PPN
  status: 'Draft' | 'Terbit';
}

export interface SptReport {
  id: string;
  year: string;
  sptType: string;
  grossIncome: number;
  netIncome: number;
  taxPaid: number;
  status: string;
  pembetulanKe?: number; // 0 = Normal, 1 = Pembetulan ke-1, etc.
  dateReported?: string;
  receiptToken?: string;
}

export interface BuktiPotong {
  id: string;
  bupotType: string; // e.g., "BPPU", "BPNR", "BP 21", "BP 26", "BP A1", "BP A2"
  bupotNumber: string; // e.g., "21-100-00021"
  date: string;
  recipientName: string;
  recipientNpwp: string;
  objekPajak: string; // e.g., "Imbalan Kepada Tenaga Ahli"
  grossAmount: number;
  taxRate: number; // e.g., 5% or 2.5%
  taxAmount: number;
  status: 'Draft' | 'Terbit';
}

export interface BillingRecord {
  id: string;
  kapCode: string; // e.g., "411128"
  kapName: string; // e.g., "PPh Final"
  kjsCode: string; // e.g., "411"
  kjsName: string; // e.g., "UMKM PP 55"
  amount: number;
  period: string; // e.g., "Mei 2026"
  year: string; // e.g., "2026"
  billingCode: string; // 15-digit ID Billing
  status: 'Belum Bayar' | 'Lunas';
  dateCreated: string;
  ntpn?: string;
  datePaid?: string;
}

export interface LedgerRecord {
  id: string;
  date: string;
  type: 'DEBET' | 'KREDIT';
  category: string; // e.g., "PPh Pasal 21", "PPh Final UMKM", "PPN"
  description: string;
  reference: string; // e.g., "SPT-1770-DE89", "NTPN-A1B2C3D4", "BUPOT-10029"
  debet: number;
  kredit: number;
  balance: number;
}

