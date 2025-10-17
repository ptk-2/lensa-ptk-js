// File: app/dashboard/page.jsx
import { supabase } from '@/lib/supabaseClient';
import DashboardClient from '@/components/DashboardClient';
import Link from 'next/link';

const ITEMS_PER_PAGE = 10;

async function getUniqueKecamatan() {
  const { data, error } = await supabase.from('ptk_data').select('kecamatan');
  if (error || !data) return [];
  const uniqueKecamatan = [...new Set(data.map(item => item.kecamatan).filter(Boolean))];
  return uniqueKecamatan.sort();
}

export default async function DashboardPage({ searchParams }) {
  
  const selectedKecamatan = searchParams?.kecamatan;
  const searchTerm = searchParams?.search;
  const currentPage = parseInt(searchParams?.page) || 1;

  const kecamatanOptions = await getUniqueKecamatan();
  
  let statsQuery = supabase
    .from('ptk_data')
    .select('status_kepegawaian, pendidikan');

  if (selectedKecamatan && selectedKecamatan !== 'semua') {
    statsQuery = statsQuery.eq('kecamatan', selectedKecamatan);
  }

  const { data: statsData, error: statsError } = await statsQuery;

  let tableQuery = supabase
    .from('ptk_data')
    .select('*', { count: 'exact' });

  if (selectedKecamatan && selectedKecamatan !== 'semua') {
    tableQuery = tableQuery.eq('kecamatan', selectedKecamatan);
  }
  
  if (searchTerm) {
    tableQuery = tableQuery.or(`nama.ilike.%${searchTerm}%,nip.ilike.%${searchTerm}%`);
  }
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  tableQuery = tableQuery.range(offset, offset + ITEMS_PER_PAGE - 1);
  
  const { data: tableData, error: tableError, count: totalCount } = await tableQuery;

  if (statsError || tableError) {
    const errorMessage = statsError?.message || tableError?.message;
    return (
      <div className="p-8 text-center text-red-400">
        <p>Gagal mengambil data: {errorMessage}</p>
        <Link href="/" className="text-cyan-400 mt-4 inline-block">Kembali ke Halaman Unggah</Link>
      </div>
    );
  }
  
  if (!statsData || statsData.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-300">Belum ada data yang cocok dengan filter ini.</p>
        <Link href="/" className="text-cyan-400 mt-4 inline-block hover:underline">
          → Kembali ke Halaman Unggah
        </Link>
      </div>
    );
  }
  
  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE);

  return (
    <DashboardClient 
      statsData={statsData} 
      tableData={tableData || []}
      kecamatanOptions={kecamatanOptions}
      totalPages={totalPages}
    />
  );
}