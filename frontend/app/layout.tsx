'use client'; // Add this to the top
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define which pages SHOULD NOT show the navbar
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased bg-slate-50`}>
        {/* Only show Navbar if we are NOT on Login or Register */}
        {!isAuthPage && (
          <nav className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BlogFlow
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Feed</Link>
                <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Dashboard</Link>
                <Link href="/create" className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg font-bold">New Post</Link>
              </div>
            </div>
          </nav>
        )}

        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}