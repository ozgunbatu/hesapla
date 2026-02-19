'use client';
import {useState} from 'react';
export default function Alan(){
  const [sekil,setSekil]=useState('kare');
  const [a,setA]=useState('10');
  const [b,setB]=useState('5');
  const hesapla=()=>{
    const x=parseFloat(a)||0;
    const y=parseFloat(b)||0;
    switch(sekil){
      case 'kare':return x*x;
      case 'dikdortgen':return x*y;
      case 'ucgen':return (x*y)/2;
      case 'daire':return Math.PI*x*x;
      default:return 0;
    }
  };
  const alan=hesapla();
  return(<div className="min-h-screen bg-gray-50 py-12"><div className="max-w-2xl mx-auto px-4"><h1 className="text-4xl font-bold mb-8">📐 Alan Hesaplama</h1><div className="bg-white rounded-xl shadow-lg p-8"><div className="mb-6"><label className="block mb-2 font-medium">Şekil Seçin</label><select value={sekil} onChange={e=>setSekil(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"><option value="kare">Kare</option><option value="dikdortgen">Dikdörtgen</option><option value="ucgen">Üçgen</option><option value="daire">Daire</option></select></div><div className="mb-6"><label className="block mb-2 font-medium">{sekil==='kare'?'Kenar':sekil==='daire'?'Yarıçap':'1. Kenar'} (cm)</label><input type="number" value={a} onChange={e=>setA(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"/></div>{(sekil==='dikdortgen'||sekil==='ucgen')&&(<div className="mb-6"><label className="block mb-2 font-medium">{sekil==='ucgen'?'Yükseklik':'2. Kenar'} (cm)</label><input type="number" value={b} onChange={e=>setB(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"/></div>)}<div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 text-center"><div className="text-sm opacity-90 mb-2">{sekil.charAt(0).toUpperCase()+sekil.slice(1)} Alanı</div><div className="text-6xl font-bold">{alan.toFixed(2)}</div><div className="text-2xl mt-2">cm²</div></div></div></div></div>);
}
