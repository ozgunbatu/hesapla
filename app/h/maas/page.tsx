'use client';
import {useState} from 'react';

export default function Maas(){
  const [brut,setBrut]=useState('20000');
  const [tip,setTip]=useState<'brut'|'net'>('brut');
  
  const hesapla=()=>{
    const maas=parseFloat(brut)||0;
    
    if(tip==='brut'){
      // Brüt'ten Net'e
      const sgkIsci=maas*0.14; // SGK işçi payı %14
      const issizlikIsci=maas*0.01; // İşsizlik işçi payı %1
      const matrah=maas-sgkIsci-issizlikIsci;
      
      // Gelir vergisi dilimleri 2025
      let gelirVergisi=0;
      if(matrah<=110000){
        gelirVergisi=matrah*0.15;
      }else if(matrah<=230000){
        gelirVergisi=110000*0.15+(matrah-110000)*0.20;
      }else if(matrah<=870000){
        gelirVergisi=110000*0.15+120000*0.20+(matrah-230000)*0.27;
      }else if(matrah<=3000000){
        gelirVergisi=110000*0.15+120000*0.20+640000*0.27+(matrah-870000)*0.35;
      }else{
        gelirVergisi=110000*0.15+120000*0.20+640000*0.27+2130000*0.35+(matrah-3000000)*0.40;
      }
      
      const damgaVergisi=maas*0.00759; // Damga vergisi %0.759
      const toplamKesinti=sgkIsci+issizlikIsci+gelirVergisi+damgaVergisi;
      const net=maas-toplamKesinti;
      
      return {
        brut:maas.toFixed(2),
        net:net.toFixed(2),
        sgkIsci:sgkIsci.toFixed(2),
        issizlikIsci:issizlikIsci.toFixed(2),
        gelirVergisi:gelirVergisi.toFixed(2),
        damgaVergisi:damgaVergisi.toFixed(2),
        toplamKesinti:toplamKesinti.toFixed(2)
      };
    }else{
      // Net'ten Brüt'e (yaklaşık)
      const brutTahmini=maas/0.72; // Ortalama %28 kesinti varsayımı
      return hesapla(); // Recursive call with brutTahmini
    }
  };
  
  const sonuc=hesapla();
  
  return(
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">💼 Maaş Hesaplama</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <label className="block mb-2 font-medium">Hesaplama Türü</label>
            <div className="flex gap-4">
              {(['brut','net']as const).map(t=>(
                <button 
                  key={t}
                  onClick={()=>setTip(t)}
                  className={`flex-1 py-3 rounded-lg font-semibold ${tip===t?'bg-primary-600 text-white':'bg-gray-100'}`}
                >
                  {t==='brut'?'Brüt → Net':'Net → Brüt'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">{tip==='brut'?'Brüt':'Net'} Maaş (₺)</label>
            <input 
              type="number" 
              value={brut} 
              onChange={e=>setBrut(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-primary-600 to-blue-600 text-white rounded-xl p-6">
              <div className="text-sm opacity-90 mb-2">Brüt Maaş</div>
              <div className="text-4xl font-bold">{parseFloat(sonuc.brut).toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-xl p-6">
              <div className="text-sm opacity-90 mb-2">Net Maaş</div>
              <div className="text-4xl font-bold">{parseFloat(sonuc.net).toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4">📊 Kesinti Detayları</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">SGK İşçi Payı (%14)</span>
                <span className="font-semibold">{parseFloat(sonuc.sgkIsci).toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">İşsizlik İşçi Payı (%1)</span>
                <span className="font-semibold">{parseFloat(sonuc.issizlikIsci).toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gelir Vergisi</span>
                <span className="font-semibold">{parseFloat(sonuc.gelirVergisi).toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Damga Vergisi (%0.759)</span>
                <span className="font-semibold">{parseFloat(sonuc.damgaVergisi).toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</span>
              </div>
              <div className="flex justify-between font-bold text-red-600 border-t pt-3">
                <span>Toplam Kesinti</span>
                <span>{parseFloat(sonuc.toplamKesinti).toLocaleString('tr-TR',{minimumFractionDigits:2})} ₺</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
