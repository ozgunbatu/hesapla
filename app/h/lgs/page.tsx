'use client';
import {useState} from 'react';

export default function LGS(){
  const [turkce,setTurkce]=useState({dogru:0,yanlis:0});
  const [matematik,setMatematik]=useState({dogru:0,yanlis:0});
  const [fen,setFen]=useState({dogru:0,yanlis:0});
  const [sosyal,setSosyal]=useState({dogru:0,yanlis:0});
  const [inkilap,setInkilap]=useState({dogru:0,yanlis:0});
  const [yabanci,setYabanci]=useState({dogru:0,yanlis:0});
  const [din,setDin]=useState({dogru:0,yanlis:0});
  
  const hesaplaNet=(d:number,y:number)=>Math.max(0,d-(y/3));
  
  const hesapla=()=>{
    const netler={
      turkce:hesaplaNet(turkce.dogru,turkce.yanlis),
      matematik:hesaplaNet(matematik.dogru,matematik.yanlis),
      fen:hesaplaNet(fen.dogru,fen.yanlis),
      sosyal:hesaplaNet(sosyal.dogru,sosyal.yanlis),
      inkilap:hesaplaNet(inkilap.dogru,inkilap.yanlis),
      yabanci:hesaplaNet(yabanci.dogru,yabanci.yanlis),
      din:hesaplaNet(din.dogru,din.yanlis)
    };
    
    // 2024 LGS katsayıları (yaklaşık)
    const puan=150+
      (netler.turkce*3.5)+
      (netler.matematik*3.8)+
      (netler.fen*3.3)+
      (netler.sosyal*3.1)+
      (netler.inkilap*3.0)+
      (netler.yabanci*2.8)+
      (netler.din*2.5);
    
    const toplamNet=Object.values(netler).reduce((a,b)=>a+b,0);
    
    return {puan:Math.min(500,puan).toFixed(2),netler,toplamNet:toplamNet.toFixed(2)};
  };
  
  const sonuc=hesapla();
  
  const DersInput=({label,state,setState,max}:any)=>(
    <div>
      <label className="block mb-2 text-sm font-medium">{label} ({max} soru)</label>
      <div className="grid grid-cols-2 gap-2">
        <input type="number" min="0" max={max} placeholder="Doğru" value={state.dogru||''} onChange={e=>setState({...state,dogru:parseInt(e.target.value)||0})} className="w-full px-3 py-2 border rounded-lg text-sm focus:border-primary-500 outline-none"/>
        <input type="number" min="0" max={max} placeholder="Yanlış" value={state.yanlis||''} onChange={e=>setState({...state,yanlis:parseInt(e.target.value)||0})} className="w-full px-3 py-2 border rounded-lg text-sm focus:border-primary-500 outline-none"/>
      </div>
    </div>
  );
  
  return(
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">🏫 LGS Puan Hesaplama</h1>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-4">
              <DersInput label="Türkçe" state={turkce} setState={setTurkce} max={20}/>
              <DersInput label="Matematik" state={matematik} setState={setMatematik} max={20}/>
              <DersInput label="Fen Bilimleri" state={fen} setState={setFen} max={20}/>
              <DersInput label="Sosyal Bilgiler" state={sosyal} setState={setSosyal} max={10}/>
              <DersInput label="İnkılap Tarihi" state={inkilap} setState={setInkilap} max={10}/>
              <DersInput label="Yabancı Dil" state={yabanci} setState={setYabanci} max={10}/>
              <DersInput label="Din Kültürü" state={din} setState={setDin} max={10}/>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary-600 to-blue-600 text-white rounded-xl shadow-2xl p-6 text-center">
              <div className="text-sm opacity-90 mb-2">LGS Puanınız</div>
              <div className="text-6xl font-bold mb-2">{sonuc.puan}</div>
              <div className="text-lg opacity-90">/ 500</div>
              <div className="mt-6 pt-6 border-t border-white/30">
                <div className="text-sm opacity-90 mb-1">Toplam Net</div>
                <div className="text-3xl font-bold">{sonuc.toplamNet}</div>
                <div className="text-sm opacity-75">/ 100</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-3">📚 Net Detayları</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(sonuc.netler).map(([ders,net])=>(
                  <div key={ders} className="flex justify-between">
                    <span className="capitalize">{ders}:</span>
                    <span className="font-bold">{(net as number).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 rounded-xl p-4 text-sm text-gray-700">
          <strong>Not:</strong> LGS'de 3 yanlış 1 doğruyu götürür. Bu hesaplama tahmini katsayılara göre yapılmıştır.
        </div>
      </div>
    </div>
  );
}
