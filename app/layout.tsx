import type {Metadata} from "next";
import "./globals.css";
import Link from "next/link";

export const metadata:Metadata={
  title:"Hesapla.com - Ücretsiz Hesaplama Araçları",
  description:"YKS, kredi, KDV, BMI ve daha fazlası"
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="tr">
      <body>
        <header className="bg-white border-b sticky top-0 z-50 shadow">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-600">Hesapla.com</Link>
            <nav className="flex gap-6">
              <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
              <Link href="/h/yks" className="hover:text-primary-600">YKS</Link>
              <Link href="/h/kredi" className="hover:text-primary-600">Kredi</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>© 2025 Hesapla.com - Tüm hesaplama araçları ücretsiz</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
