'use client';
import {useState} from 'react';
export default function Faiz(){
  const [anapara,setAnapara]=useState('10000');
  const [faiz,setFaiz]=useState('10');
  const [sure,setSure]=useState('5');
  const a=parseFloat(anapara)||0;
  const f=parseFloat(faiz)||0;
  const s=parseFloat(sure)||0;
  const toplam=a*Math.pow(1+f/100,s);
  const kazanc=toplam-a;
  const yillikOrtalama=kazanc/s;
  return(<div className="min-h-screen bg-gray-50 py-12"><div className="max-w-2xl mx-auto px-4"><h1 className="text-4xl font-bold mb-8">💰 Bileşik Faiz Hesaplama</h1><div className="bg-white rounded-xl shadow-lg p-8"><div className="mb-6"><label className="block mb-2 font-medium">Anapara (₺)</label><input type="number" value={anapara} onChange={e=>setAnapara(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"/></div><div className="mb-6"><label className="block mb-2 font-medium">Yıllık Faiz Oranı (%)</label><input type="number" value={faiz} onChange={e=>setFaiz(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"/></div><div className="mb-6"><label className="block mb-2 font-medium">Süre (Yıl)</label><input type="number" value={sure} onChange={e=>setSure(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"/></div><div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6 space-y-4"><div className="flex justify-between items-center"><span>Anapara:</span><span className="text-2xl font-bold">{a.toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</span></div><div className="flex justify-between items-center"><span>Faiz Kazancı:</span><span className="text-2xl font-bold text-yellow-300">+{kazanc.toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</span></div><div className="flex justify-between items-center text-sm opacity-90"><span>Yıllık Ortalama:</span><span>{yillikOrtalama.toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</span></div><div className="flex justify-between items-center border-t border-white/30 pt-4"><span>Toplam:</span><span className="text-4xl font-bold">{toplam.toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</span></div></div></div></div></div>);
}
