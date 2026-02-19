'use client';
import {useState} from 'react';

export default function KDV(){
  const [tutar,setTutar]=useState('1000');
  const [kdvOrani,setKdvOrani]=useState(20);
  const [mod,setMod]=useState<'dahil'|'haric'>('haric');
  
  const hesapla=()=>{
    const t=parseFloat(tutar)||0;
    if(mod==='haric'){
      const kdv=t*(kdvOrani/100);
      return {kdv:kdv.toFixed(2),toplam:(t+kdv).toFixed(2),matrah:t.toFixed(2)};
    }else{
      const matrah=t/(1+kdvOrani/100);
      const kdv=t-matrah;
      return {kdv:kdv.toFixed(2),toplam:t.toFixed(2),matrah:matrah.toFixed(2)};
    }
  };
  
  const sonuc=hesapla();
  
  return(
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">🧾 KDV Hesaplama</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <label className="block mb-2 font-medium">Tutar (₺)</label>
            <input 
              type="number" 
              value={tutar} 
              onChange={e=>setTutar(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">KDV Oranı</label>
            <div className="flex gap-3">
              {[1,10,20].map(oran=>(
                <button 
                  key={oran}
                  onClick={()=>setKdvOrani(oran)}
                  className={`flex-1 py-3 rounded-lg font-semibold ${kdvOrani===oran?'bg-primary-600 text-white':'bg-gray-100'}`}
                >
                  %{oran}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">Hesaplama Türü</label>
            <div className="flex gap-4">
              {(['haric','dahil']as const).map(m=>(
                <button 
                  key={m}
                  onClick={()=>setMod(m)}
                  className={`flex-1 py-3 rounded-lg font-semibold ${mod===m?'bg-primary-600 text-white':'bg-gray-100'}`}
                >
                  KDV {m==='haric'?'Hariç':'Dahil'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span>Matrah:</span>
              <span className="text-2xl font-bold">{sonuc.matrah} ₺</span>
            </div>
            <div className="flex justify-between items-center">
              <span>KDV (%{kdvOrani}):</span>
              <span className="text-2xl font-bold text-yellow-300">{sonuc.kdv} ₺</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/30 pt-3">
              <span>Toplam:</span>
              <span className="text-3xl font-bold">{sonuc.toplam} ₺</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
