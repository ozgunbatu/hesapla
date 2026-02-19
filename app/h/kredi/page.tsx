'use client';
import {useState} from 'react';

export default function Kredi(){
  const [anapara,setAnapara]=useState('100000');
  const [faiz,setFaiz]=useState('2.5');
  const [vade,setVade]=useState('36');
  
  const hesapla=()=>{
    const a=parseFloat(anapara)||0;
    const f=parseFloat(faiz)/100||0;
    const v=parseInt(vade)||1;
    
    const aylikFaiz=f;
    const taksit=a*(aylikFaiz*Math.pow(1+aylikFaiz,v))/(Math.pow(1+aylikFaiz,v)-1);
    const toplamOdeme=taksit*v;
    const toplamFaiz=toplamOdeme-a;
    
    // Taksit tablosu
    let kalanAnapara=a;
    const tablo=[];
    for(let i=1;i<=Math.min(v,12);i++){
      const faizTutari=kalanAnapara*aylikFaiz;
      const anaparaTutari=taksit-faizTutari;
      kalanAnapara-=anaparaTutari;
      tablo.push({
        ay:i,
        taksit:taksit.toFixed(2),
        anapara:anaparaTutari.toFixed(2),
        faiz:faizTutari.toFixed(2),
        kalan:Math.max(0,kalanAnapara).toFixed(2)
      });
    }
    
    return {
      aylikTaksit:taksit.toFixed(2),
      toplamOdeme:toplamOdeme.toFixed(2),
      toplamFaiz:toplamFaiz.toFixed(2),
      tablo
    };
  };
  
  const sonuc=hesapla();
  
  return(
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">💳 Kredi Hesaplama</h1>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <label className="block mb-2 font-medium">Kredi Tutarı (₺)</label>
              <input 
                type="number" 
                value={anapara} 
                onChange={e=>setAnapara(e.target.value)} 
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 font-medium">Aylık Faiz Oranı (%)</label>
              <input 
                type="number" 
                step="0.1"
                value={faiz} 
                onChange={e=>setFaiz(e.target.value)} 
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 font-medium">Vade (Ay)</label>
              <select 
                value={vade} 
                onChange={e=>setVade(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"
              >
                {[12,24,36,48,60,72].map(v=>(
                  <option key={v} value={v}>{v} Ay</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-600 to-blue-600 text-white rounded-xl shadow-2xl p-6 flex flex-col justify-center space-y-4">
            <div>
              <div className="text-sm opacity-90">Aylık Taksit</div>
              <div className="text-4xl font-bold">{sonuc.aylikTaksit} ₺</div>
            </div>
            <div className="border-t border-white/30 pt-4">
              <div className="text-sm opacity-90">Toplam Ödeme</div>
              <div className="text-2xl font-bold">{sonuc.toplamOdeme} ₺</div>
            </div>
            <div>
              <div className="text-sm opacity-90">Toplam Faiz</div>
              <div className="text-xl font-bold text-yellow-300">{sonuc.toplamFaiz} ₺</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">📊 Ödeme Planı (İlk 12 Ay)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Ay</th>
                  <th className="p-3 text-right">Taksit</th>
                  <th className="p-3 text-right">Anapara</th>
                  <th className="p-3 text-right">Faiz</th>
                  <th className="p-3 text-right">Kalan</th>
                </tr>
              </thead>
              <tbody>
                {sonuc.tablo.map(t=>(
                  <tr key={t.ay} className="border-b hover:bg-gray-50">
                    <td className="p-3">{t.ay}</td>
                    <td className="p-3 text-right font-semibold">{t.taksit} ₺</td>
                    <td className="p-3 text-right">{t.anapara} ₺</td>
                    <td className="p-3 text-right text-orange-600">{t.faiz} ₺</td>
                    <td className="p-3 text-right text-gray-600">{t.kalan} ₺</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
