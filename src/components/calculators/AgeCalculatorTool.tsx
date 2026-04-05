"use client";

import { useState, useEffect } from "react";

export default function AgeCalculatorTool() {
  const today = new Date().toISOString().split("T")[0];
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [targetDate, setTargetDate] = useState(today);

  const [result, setResult] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalMonths: 0,
    totalWeeks: 0,
    totalDays: 0,
    nextBirthdayDays: 0,
    isValid: true,
  });

  useEffect(() => {
    calculateAge();
  }, [birthDate, targetDate]);

  const calculateAge = () => {
    if (!birthDate || !targetDate) {
      setResult((prev) => ({ ...prev, isValid: false }));
      return;
    }

    const bDate = new Date(birthDate);
    const tDate = new Date(targetDate);

    if (bDate > tDate) {
      setResult((prev) => ({ ...prev, isValid: false }));
      return;
    }

    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0).getDate();
      days += prevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = Math.abs(tDate.getTime() - bDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    const nextBday = new Date(bDate);
    nextBday.setFullYear(tDate.getFullYear());
    if (nextBday < tDate || nextBday.getTime() === tDate.getTime()) {
      nextBday.setFullYear(tDate.getFullYear() + 1);
    }
    const nextBdayDiff = Math.ceil((nextBday.getTime() - tDate.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      nextBirthdayDays: nextBdayDiff,
      isValid: true,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 px-2">
      {/* Input Controls */}
      <div className="lg:col-span-5 bg-gray-50 p-10 rounded-[3rem] border border-gray-200 shadow-inner space-y-12">
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-sm font-black text-gray-400 uppercase tracking-[0.3em] ml-2">
            <span className="w-2 h-5 bg-pink-500 rounded-full shadow-lg shadow-pink-200"></span> Birth Date
          </label>
          <input 
            type="date" 
            value={birthDate} 
            max={targetDate} 
            onChange={(e) => setBirthDate(e.target.value)} 
            className="w-full rounded-2xl border-0 bg-white p-6 shadow-xl focus:ring-4 focus:ring-pink-100 transition-all font-black text-3xl text-gray-800 outline-none hover:translate-y-[-2px]"
          />
        </div>
        
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-sm font-black text-gray-400 uppercase tracking-[0.3em] ml-2">
            <span className="w-2 h-5 bg-indigo-500 rounded-full shadow-lg shadow-indigo-200"></span> Target Date
          </label>
          <input 
            type="date" 
            value={targetDate} 
            onChange={(e) => setTargetDate(e.target.value)} 
            className="w-full rounded-2xl border-0 bg-white p-6 shadow-xl focus:ring-4 focus:ring-indigo-100 transition-all font-black text-3xl text-gray-800 outline-none hover:translate-y-[-2px]"
          />
          <div className="flex justify-end pt-4">
            <button 
              onClick={() => setTargetDate(today)} 
              className="group flex items-center gap-3 text-xs font-black py-4 px-8 bg-gray-900 text-white rounded-full hover:bg-pink-600 transition-all shadow-xl active:scale-95 border-2 border-transparent hover:border-pink-300"
            >
              <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              RESET TO TODAY
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Display */}
      <div className="lg:col-span-7 bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.1)] flex flex-col justify-center transform transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.15)]">
        {result.isValid ? (
          <div className="w-full h-full flex flex-col">
            <div className="p-16 text-center bg-gray-900 border-b-8 border-pink-600 text-white relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              <h3 className="text-pink-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8 relative z-10 animate-fade-in">Precision Results</h3>
              <div className="text-7xl md:text-9xl font-black drop-shadow-2xl tracking-tighter flex items-baseline justify-center gap-6 relative z-10">
                <div className="flex flex-col items-center">
                  <span className="leading-none">{result.years}</span>
                  <span className="text-[10px] md:text-xs text-gray-500 font-black mt-4 uppercase tracking-widest">Years</span>
                </div>
                <div className="flex flex-col items-center opacity-30">
                  <span className="leading-none text-pink-500">:</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="leading-none">{result.months}</span>
                  <span className="text-[10px] md:text-xs text-gray-500 font-black mt-4 uppercase tracking-widest">Months</span>
                </div>
                <div className="flex flex-col items-center opacity-30">
                  <span className="leading-none text-pink-500">:</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="leading-none">{result.days}</span>
                  <span className="text-[10px] md:text-xs text-gray-500 font-black mt-4 uppercase tracking-widest">Days</span>
                </div>
              </div>
            </div>
            
            <div className="p-12 flex-grow bg-gray-50/50 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
                <div className="space-y-6 flex flex-col justify-center">
                  <div className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-lg flex items-center justify-between group hover:border-pink-500 transition-all hover:translate-x-2">
                    <div className="font-black text-gray-400 uppercase text-[9px] tracking-widest">Total Months</div>
                    <div className="font-black text-3xl text-gray-900 group-hover:text-pink-600 transition-colors">{result.totalMonths.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-lg flex items-center justify-between group hover:border-pink-500 transition-all hover:translate-x-2">
                    <div className="font-black text-gray-400 uppercase text-[9px] tracking-widest">Total Weeks</div>
                    <div className="font-black text-3xl text-gray-900 group-hover:text-pink-600 transition-colors">{result.totalWeeks.toLocaleString()}</div>
                  </div>
                  <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl flex items-center justify-between group hover:bg-pink-600 transition-colors">
                    <div className="font-black text-indigo-100 uppercase text-[9px] tracking-widest">Days Lived</div>
                    <div className="font-black text-4xl text-white tracking-widest leading-none">{result.totalDays.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden relative">
                  {result.nextBirthdayDays === 0 ? (
                    <div className="text-center animate-bounce">
                      <div className="text-7xl mb-6">🤟🎂🎸</div>
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600 tracking-tighter">ROCKSTAR DAY!</div>
                    </div>
                  ) : (
                    <>
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-indigo-500"></div>
                      <div className="text-gray-400 font-black text-[9px] uppercase tracking-[0.5em] mb-4">NEXT ANNIVERSARY</div>
                      <div className="text-8xl font-black text-gray-900 tracking-tighter mb-2 leading-none">{result.nextBirthdayDays}</div>
                      <div className="text-pink-600 font-black text-[10px] uppercase tracking-widest">Days to go</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center p-20 bg-rose-50 rounded-[3rem] m-10 border-4 border-white shadow-inner">
             <div className="space-y-8 max-w-sm">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-rose-100">
                  <svg className="w-12 h-12 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <h3 className="text-4xl font-black text-gray-900 tracking-tighter">Time Anomaly Detected</h3>
               <p className="text-gray-500 font-bold leading-relaxed">The birth date must occur *before* the target date to calculate your lifespan matrix.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
