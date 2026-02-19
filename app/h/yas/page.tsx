'use client';
import {useState} from 'react';
export default function Yas(){
  const [tarih,setTarih]=useState('2000-01-01');
  const dogum=new Date(tarih);
  const bugun=new Date();
  let yas=bugun.getFullYear()-dogum.getFullYear();
  let ay=bugun.getMonth()-dogum.getMonth();
  let gun=bugun.getDate()-dogum.getDate();
  if(ay<0){yas--;ay+=12;}
  if(gun<0&&ay>0){ay--;gun+=30;}
  const toplamGun=Math.floor((bugun.getTime()-dogum.getTime())/(1000*60*60*24));
  return(<div className="min-h-screen bg-gray-50 py-12"><div className="max-w-2xl mx-auto px-4"><h1 className="text-4xl font-bold mb-8">🎂 Yaş Hesaplama</h1><div className="bg-white rounded-xl shadow-lg p-8"><div className="mb-6"><label className="block mb-2 font-medium">Doğum Tarihi</label><input type="date" value={tarih} onChange={e=>setTarih(e.target.value)} max={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"/></div><div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 text-center"><div className="text-9xl font-bold mb-4">{yas}</div><div className="text-4xl mb-6">Yaşındasınız</div><div className="text-2xl opacity-90">{ay} ay, {gun} gün</div><div className="text-lg opacity-75 mt-4">(Toplam {toplamGun.toLocaleString()} gün)</div></div></div></div></div>);
}
