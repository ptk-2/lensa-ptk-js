// File: app/dashboard/layout.jsx
import Sidebar from '@/components/Sidebar'; // Impor Sidebar kita

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Tampilkan Sidebar di Kiri */}
      <Sidebar />
      {/* Area Konten Utama di Kanan (Fleksibel) */}
      <main className="flex-1 bg-gray-900"> 
        {/* 'children' di sini adalah halaman dashboard kita (page.jsx) */}
        {children}
      </main>
    </div>
  );
}