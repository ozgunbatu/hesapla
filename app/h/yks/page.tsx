'use client';
import {useState} from 'react';

// 2025 ÖSYM Katsayıları (ertansinansahin.com'dan doğrulandı)
const KATSAYILAR_2025={
  tyt:{base:145.47,turkce:2.83,sosyal:2.99,matematik:3.28,fen:2.53},
  say:{base:132.87,turkce:1.20,sosyal:1.27,temelMat:1.39,fen:1.07,matematik:2.89,fizik:2.46,kimya:2.53,biyoloji:2.61}
};

export default function YKS(){
  const [tytTurkce,setTytTurkce]=useState({dogru:0,yanlis:0});
  const [tytSosyal,setTytSosyal]=useState({dogru:0,yanlis:0});
  const [tytMatematik,setTytMatematik]=useState({dogru:0,yanlis:0});
  const [tytFen,setTytFen]=useState({dogru:0,yanlis:0});
  const [aytMatematik,setAytMatematik]=useState({dogru:0,yanlis:0});
  const [aytFizik,setAytFizik]=useState({dogru:0,yanlis:0});
  const [aytKimya,setAytKimya]=useState({dogru:0,yanlis:0});
  const [aytBiyoloji,setAytBiyoloji]=useState({dogru:0,yanlis:0});
  const [diplomaNotu,setDiplomaNotu]=useState(80);
  const [aktifSekme,setAktifSekme]=useState<'TYT'|'SAY'>('TYT');
  
  const hesaplaNet=(d:number,y:number)=>Math.max(0,d-(y*0.25));
  const hesaplaOBP=(nota:number)=>{
    if(nota>=50&&nota<=100)return Math.max(250,nota*0.6*10);
    if(nota>=250&&nota<=500)return nota;
    return 250;
  };
  
  const hesapla=()=>{
    // TYT Netleri
    const netTytTurkce=hesaplaNet(tytTurkce.dogru,tytTurkce.yanlis);
    const netTytSosyal=hesaplaNet(tytSosyal.dogru,tytSosyal.yanlis);
    const netTytMatematik=hesaplaNet(tytMatematik.dogru,tytMatematik.yanlis);
    const netTytFen=hesaplaNet(tytFen.dogru,tytFen.yanlis);
    
    // TYT Ham Puan
    const tytHam=KATSAYILAR_2025.tyt.base+
      (netTytTurkce*KATSAYILAR_2025.tyt.turkce)+
      (netTytSosyal*KATSAYILAR_2025.tyt.sosyal)+
      (netTytMatematik*KATSAYILAR_2025.tyt.matematik)+
      (netTytFen*KATSAYILAR_2025.tyt.fen);
    
    // AYT SAY Ham Puan
    const netAytMat=hesaplaNet(aytMatematik.dogru,aytMatematik.yanlis);
    const netAytFiz=hesaplaNet(aytFizik.dogru,aytFizik.yanlis);
    const netAytKim=hesaplaNet(aytKimya.dogru,aytKimya.yanlis);
    const netAytBiy=hesaplaNet(aytBiyoloji.dogru,aytBiyoloji.yanlis);
    
    const sayHam=KATSAYILAR_2025.say.base+
      (netTytTurkce*KATSAYILAR_2025.say.turkce)+
      (netTytSosyal*KATSAYILAR_2025.say.sosyal)+
      (netTytMatematik*KATSAYILAR_2025.say.temelMat)+
      (netTytFen*KATSAYILAR_2025.say.fen)+
      (netAytMat*KATSAYILAR_2025.say.matematik)+
      (netAytFiz*KATSAYILAR_2025.say.fizik)+
      (netAytKim*KATSAYILAR_2025.say.kimya)+
      (netAytBiy*KATSAYILAR_2025.say.biyoloji);
    
    // OBP
    const obp=hesaplaOBP(diplomaNotu);
    const obpEkPuan=obp*0.12;
    
    return {
      tytHam:tytHam.toFixed(3),
      sayHam:sayHam.toFixed(3),
      obp:obp.toFixed(2),
      obpEkPuan:obpEkPuan.toFixed(3),
      yTyt:(tytHam+obpEkPuan).toFixed(3),
      ySay:(sayHam+obpEkPuan).toFixed(3),
      netler:{
        tytTurkce:netTytTurkce.toFixed(2),
        tytSosyal:netTytSosyal.toFixed(2),
        tytMatematik:netTytMatematik.toFixed(2),
        tytFen:netTytFen.toFixed(2),
        aytMatematik:netAytMat.toFixed(2),
        aytFizik:netAytFiz.toFixed(2),
        aytKimya:netAytKim.toFixed(2),
        aytBiyoloji:netAytBiy.toFixed(2),
        toplamTyt:(netTytTurkce+netTytSosyal+netTytMatematik+netTytFen).toFixed(2),
        toplamAyt:(netAytMat+netAytFiz+netAytKim+netAytBiy).toFixed(2)
      }
    };
  };
  
  const sonuc=hesapla();
  
  const DersInput=({label,state,setState,max}:any)=>(
    <div>
      <label className="block mb-2 text-sm font-medium">{label} ({max} soru)</label>
      <div className="grid grid-cols-2 gap-2">
        <input type="number" min="0" max={max} placeholder="Doğru" value={state.dogru||''} onChange={e=>setState({...state,dogru:parseInt(e.target.value)||0})} className="w-full px-3 py-2 border-2 rounded-lg text-sm focus:border-primary-500 outline-none"/>
        <input type="number" min="0" max={max} placeholder="Yanlış" value={state.yanlis||''} onChange={e=>setState({...state,yanlis:parseInt(e.target.value)||0})} className="w-full px-3 py-2 border-2 rounded-lg text-sm focus:border-primary-500 outline-none"/>
      </div>
    </div>
  );
  
  return(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">🎓 YKS Puan Hesaplama 2025</h1>
          <p className="text-lg text-gray-600">ÖSYM resmi formülleriyle hesaplanmıştır</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {(['TYT','SAY']as const).map(sekme=>(
                  <button key={sekme} onClick={()=>setAktifSekme(sekme)} className={`py-3 rounded-lg font-bold transition-all ${aktifSekme===sekme?'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg':'bg-gray-100'}`}>{sekme}</button>
                ))}
              </div>
              
              {aktifSekme==='TYT'&&(
                <div className="grid md:grid-cols-2 gap-4">
                  <DersInput label="Türkçe" state={tytTurkce} setState={setTytTurkce} max={40}/>
                  <DersInput label="Sosyal Bilimler" state={tytSosyal} setState={setTytSosyal} max={20}/>
                  <DersInput label="Temel Matematik" state={tytMatematik} setState={setTytMatematik} max={40}/>
                  <DersInput label="Fen Bilimleri" state={tytFen} setState={setTytFen} max={20}/>
                </div>
              )}
              
              {aktifSekme==='SAY'&&(
                <div className="grid md:grid-cols-2 gap-4">
                  <DersInput label="Matematik" state={aytMatematik} setState={setAytMatematik} max={40}/>
                  <DersInput label="Fizik" state={aytFizik} setState={setAytFizik} max={14}/>
                  <DersInput label="Kimya" state={aytKimya} setState={setAytKimya} max={13}/>
                  <DersInput label="Biyoloji" state={aytBiyoloji} setState={setAytBiyoloji} max={13}/>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t">
                <label className="block mb-2 font-medium">Diploma Notu (50-100) veya OBP (250-500)</label>
                <input type="number" min="50" max="500" value={diplomaNotu} onChange={e=>setDiplomaNotu(parseFloat(e.target.value))} className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"/>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary-600 to-blue-600 text-white rounded-xl shadow-2xl p-6">
              <h3 className="text-2xl font-bold mb-6">🎯 Sonuçlar</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <div className="text-sm opacity-90 mb-1">TYT Ham Puan</div>
                  <div className="text-3xl font-bold">{sonuc.tytHam}</div>
                  <div className="text-sm opacity-75 mt-1">Net: {sonuc.netler.toplamTyt}</div>
                </div>
                {parseFloat(sonuc.sayHam)>0&&(
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                    <div className="text-sm opacity-90 mb-1">SAY Ham Puan</div>
                    <div className="text-3xl font-bold">{sonuc.sayHam}</div>
                    <div className="text-sm opacity-75 mt-1">Net: {sonuc.netler.toplamAyt}</div>
                  </div>
                )}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <div className="text-sm opacity-90 mb-1">OBP Ek Puan</div>
                  <div className="text-2xl font-bold">{sonuc.obpEkPuan}</div>
                  <div className="text-xs opacity-75">OBP: {sonuc.obp}</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4 backdrop-blur border-2 border-green-300">
                  <div className="text-sm opacity-90 mb-1">Y-TYT Yerleştirme</div>
                  <div className="text-4xl font-bold">{sonuc.yTyt}</div>
                </div>
                {parseFloat(sonuc.ySay)>KATSAYILAR_2025.say.base&&(
                  <div className="bg-green-500/20 rounded-lg p-4 backdrop-blur border-2 border-green-300">
                    <div className="text-sm opacity-90 mb-1">Y-SAY Yerleştirme</div>
                    <div className="text-4xl font-bold">{sonuc.ySay}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-bold mb-3">📚 Net Detayları</h4>
              <div className="space-y-2 text-sm">
                <div className="font-semibold text-primary-600 mb-2">TYT:</div>
                {Object.entries({Türkçe:sonuc.netler.tytTurkce,Sosyal:sonuc.netler.tytSosyal,Matematik:sonuc.netler.tytMatematik,Fen:sonuc.netler.tytFen}).map(([k,v])=>(
                  <div key={k} className="flex justify-between"><span>{k}:</span><span className="font-bold">{v}</span></div>
                ))}
                {parseFloat(sonuc.netler.toplamAyt)>0&&(<><div className="font-semibold text-primary-600 mt-3 mb-2">AYT:</div>
                {Object.entries({Matematik:sonuc.netler.aytMatematik,Fizik:sonuc.netler.aytFizik,Kimya:sonuc.netler.aytKimya,Biyoloji:sonuc.netler.aytBiyoloji}).map(([k,v])=>(
                  <div key={k} className="flex justify-between"><span>{k}:</span><span className="font-bold">{v}</span></div>
                ))}</>)}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700">
              <strong>✅ 2025 ÖSYM Katsayıları</strong><br/>
              Net = Doğru - (Yanlış × 0.25)<br/>
              OBP = Diploma × 0.6 × 10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
