import Link from 'next/link';

const araclar=[
  {href:'/h/yks',icon:'🎓',baslik:'YKS Puan Hesaplama',aciklama:'2025 ÖSYM formülleri'},
  {href:'/h/kredi',icon:'💳',baslik:'Kredi Hesaplama',aciklama:'Aylık taksit ve toplam maliyet'},
  {href:'/h/kdv',icon:'🧾',baslik:'KDV Hesaplama',aciklama:'Dahil/Hariç hesaplama'},
  {href:'/h/bmi',icon:'⚖️',baslik:'BMI Hesaplama',aciklama:'Vücut kitle endeksi'},
  {href:'/h/faiz',icon:'💰',baslik:'Faiz Hesaplama',aciklama:'Bileşik faiz hesaplama'},
  {href:'/h/yuzde',icon:'%',baslik:'Yüzde Hesaplama',aciklama:'Yüzdelik işlemler'},
  {href:'/h/lgs',icon:'🏫',baslik:'LGS Puan',aciklama:'Liseye geçiş puanı'},
  {href:'/h/maas',icon:'💼',baslik:'Maaş Hesaplama',aciklama:'Brüt-Net dönüşüm'},
  {href:'/h/yas',icon:'🎂',baslik:'Yaş Hesaplama',aciklama:'Doğum tarihinden yaş'},
  {href:'/h/alan',icon:'📐',baslik:'Alan Hesaplama',aciklama:'Geometrik şekil alanları'}
];

export default function Home(){
  return(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Ücretsiz Hesaplama Araçları</h1>
          <p className="text-xl">Hızlı, kolay ve doğru hesaplamalar</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {araclar.map(a=>(
            <Link key={a.href} href={a.href} className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition-all border border-gray-100 hover:border-primary-500">
              <div className="text-4xl mb-3">{a.icon}</div>
              <h3 className="font-bold text-lg mb-2">{a.baslik}</h3>
              <p className="text-sm text-gray-600">{a.aciklama}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
