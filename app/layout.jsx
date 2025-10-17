// File: app/layout.jsx

import { Inter } from "next/font/google";
// Impor file CSS global baru kita
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lensa PTK",
  description: "Alat Bantu Analisis dan Visualisasi Data PTK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Ini adalah bagian terpenting: 
        Kita terapkan font Inter, latar belakang gelap, 
        teks putih, dan gradien futuristik ke seluruh body
      */}
      <body 
        className={`${inter.className} bg-gray-900 text-white`}
        style={{
          backgroundImage: 'radial-gradient(circle at top left, hsla(213, 72%, 28%, 0.5), transparent 40%), radial-gradient(circle at bottom right, hsla(333, 72%, 28%, 0.5), transparent 40%)',
          backgroundAttachment: 'fixed'
        }}
      >
        {children}
      </body>
    </html>
  );
}