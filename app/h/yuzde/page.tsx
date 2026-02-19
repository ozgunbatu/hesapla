'use client';
import {useState} from 'react';

export default function Yuzde(){
  const [sayi,setSayi]=useState('1000');
  const [yuzde,setYuzde]=useState('20');
  
  const s=parseFloat(sayi)||0;
  const y=parseFloat(yuzde)||0;
  const hesap=s*(y/100);
  
  return(
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">% Yüzde Hesaplama</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <label className="block mb-2 font-medium">Sayı</label>
            <input 
              type="number" 
              value={sayi} 
              onChange={e=>setSayi(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">Yüzde (%)</label>
            <input 
              type="number" 
              value={yuzde} 
              onChange={e=>setYuzde(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"
            />
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6 space-y-3">
            <div className="text-sm opacity-90">{sayi} sayısının %{yuzde}'si:</div>
            <div className="text-6xl font-bold mb-6">{hesap.toFixed(2)}</div>
            <div className="border-t border-white/30 pt-4">
              <div className="text-sm opacity-90">Toplam ({sayi} + {hesap.toFixed(2)}):</div>
              <div className="text-3xl font-bold">{(s+hesap).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
