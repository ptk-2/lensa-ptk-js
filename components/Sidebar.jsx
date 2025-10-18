// File: components/Sidebar.jsx
import Link from 'next/link';
import { LayoutDashboard, Upload } from 'lucide-react'; // Impor ikon

export default function Sidebar() {
  return (
    // Sidebar dengan lebar tetap, latar belakang sedikit lebih gelap
    <aside className="w-64 min-h-screen bg-gray-900/80 p-6 flex flex-col border-r border-white/10">
      {/* Judul Aplikasi / Logo */}
      <div className="mb-10 text-center">
        <Link href="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:opacity-80 transition-opacity">
          Lensa PTK
        </Link>
      </div>

      {/* Menu Navigasi */}
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
          <Upload size={20} />
          <span>Unggah Data</span>
        </Link>
        {/* Tambahkan link lain di sini jika perlu */}
      </nav>

      {/* Footer Sidebar (Opsional) */}
      <div className="mt-auto text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Lensa PTK
      </div>
    </aside>
  );
}