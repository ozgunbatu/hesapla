'use client';
import {useState} from 'react';

export default function BMI(){
  const [kilo,setKilo]=useState('70');
  const [boy,setBoy]=useState('175');
  
  const k=parseFloat(kilo)||0;
  const b=parseFloat(boy)||0;
  const bmi=b>0?k/((b/100)**2):0;
  
  let durum='',renk='',bgColor='';
  if(bmi<18.5){durum='Zayıf';renk='text-blue-600';bgColor='bg-blue-50';}
  else if(bmi<25){durum='Normal Kilo';renk='text-green-600';bgColor='bg-green-50';}
  else if(bmi<30){durum='Fazla Kilolu';renk='text-orange-600';bgColor='bg-orange-50';}
  else if(bmi>=30){durum='Obez';renk='text-red-600';bgColor='bg-red-50';}
  
  return(
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">⚖️ BMI Hesaplama</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <label className="block mb-2 font-medium">Kilo (kg)</label>
            <input 
              type="number" 
              value={kilo} 
              onChange={e=>setKilo(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">Boy (cm)</label>
            <input 
              type="number" 
              value={boy} 
              onChange={e=>setBoy(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 outline-none"
            />
          </div>
          
          {bmi>0&&(
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl p-6 text-center">
              <div className="text-sm opacity-90 mb-2">Vücut Kitle Endeksi</div>
              <div className="text-8xl font-bold mb-6">{bmi.toFixed(1)}</div>
              <div className={`text-3xl font-bold ${renk} ${bgColor} px-8 py-4 rounded-lg inline-block shadow-lg`}>
                {durum}
              </div>
              <div className="mt-6 text-sm opacity-90">
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className={bmi<18.5?'font-bold':'opacity-60'}>{'<18.5 Zayıf'}</div>
                  <div className={bmi>=18.5&&bmi<25?'font-bold':'opacity-60'}>18.5-24.9 Normal</div>
                  <div className={bmi>=25&&bmi<30?'font-bold':'opacity-60'}>25-29.9 Fazla</div>
                  <div className={bmi>=30?'font-bold':'opacity-60'}>{'≥30 Obez'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
