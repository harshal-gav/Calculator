"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import cryptoSeoData from "@/data/seo-content/official/crypto-profit-calculator.json";

export default function CryptoProfitCalculator() {
  const [investment, setInvestment] = useState("1000");
  const [buyPrice, setBuyPrice] = useState("40000");
  const [sellPrice, setSellPrice] = useState("65000");
  const [buyFee, setBuyFee] = useState("0.5");
  const [sellFee, setSellFee] = useState("0.5");

  const [result, setResult] = useState<{
    coinsPurchased: number;
    grossExit: number;
    netExit: number;
    netProfit: number;
    roi: number;
    totalFees: number;
  } | null>(null);

  useEffect(() => {
    calculateProfit();
  }, [investment, buyPrice, sellPrice, buyFee, sellFee]);

  const calculateProfit = () => {
    const inv = parseFloat(investment);
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const bFee = parseFloat(buyFee) / 100;
    const sFee = parseFloat(sellFee) / 100;

    if (inv > 0 && buy > 0 && sell > 0) {
      const actualInvestment = inv * (1 - bFee);
      const coins = actualInvestment / buy;
      const grossExit = coins * sell;
      const netExit = grossExit * (1 - sFee);
      const profit = netExit - inv;
      const roi = (profit / inv) * 100;
      const totalFees = (inv * bFee) + (grossExit * sFee);

      setResult({
        coinsPurchased: coins,
        grossExit,
        netExit,
        netProfit: profit,
        roi,
        totalFees,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-[#0a0a0c] rounded-3xl shadow-2xl border border-yellow-500/20 text-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-yellow-500/10 pb-8 mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
              Crypto <span className="text-yellow-500">Profit</span>
            </h1>
            <div className="px-2 py-1 rounded bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest leading-none rotate-2">
              PRO
            </div>
          </div>
          <p className="text-slate-400 font-medium italic text-base">Calculate your net Bitcoin & Altcoin returns after exchange fees.</p>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <div className="bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/30 mb-2">
            <span className="text-yellow-500 font-bold text-xs uppercase tracking-[0.2em]">Institutional Grade</span>
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Verified Multi-Exchange Logic</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        {/* Trading Dashboard Inputs */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
            
            <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.3em] mb-4 border-b border-white/10 pb-3">Trade Execution</h2>
            
            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">Investment Amount (USD)</label>
              <div className="relative group">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-yellow-500">$</span>
                 <input
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-2xl px-8 py-4 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all font-black text-xl text-white shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">Entry Price</label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-2xl px-4 py-4 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">Exit Price</label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-2xl px-4 py-4 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-lg text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">Buy Fee (%)</label>
                <input
                  type="number"
                  step="0.05"
                  value={buyFee}
                  onChange={(e) => setBuyFee(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-2xl px-4 py-4 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">Sell Fee (%)</label>
                <input
                  type="number"
                  step="0.05"
                  value={sellFee}
                  onChange={(e) => setSellFee(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-2xl px-4 py-4 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-lg text-white"
                />
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed text-center">Standard exchange fees range from 0.1% (Binance/Bybit) to 1.5% (Coinbase Retail).</p>
          </div>
        </div>

        {/* Dynamic Profit Canvas */}
        <div className="lg:col-span-12 xl:col-span-8">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="bg-gradient-to-br from-yellow-500 to-amber-700 rounded-3xl p-12 text-black shadow-2xl flex flex-col justify-center grow relative overflow-hidden group">
                {/* Tech elements */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white opacity-20 blur-[120px] rounded-full pointer-events-none group-hover:opacity-30 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                    <div className="text-black text-[10px] font-black uppercase tracking-[0.4em]">Net Trade Profit / Loss</div>
                  </div>
                  
                  <div className={`text-7xl md:text-9xl font-black mb-8 tracking-tighter drop-shadow-md ${result.netProfit >= 0 ? "text-black" : "text-red-900"}`}>
                    {result.netProfit >= 0 ? "+" : "-"}${Math.abs(result.netProfit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="inline-flex items-center px-5 py-3 rounded-2xl bg-black text-yellow-500 text-sm font-black border border-black/20 uppercase tracking-widest shadow-xl">
                      {result.roi >= 0 ? "🚀" : "🛑"} {result.roi.toFixed(2)}% ROI
                    </div>
                    <div className="inline-flex items-center px-5 py-3 rounded-2xl bg-white/30 backdrop-blur-md text-black text-sm font-black border border-white/20 uppercase tracking-widest">
                      🪙 {result.coinsPurchased.toFixed(6)} Units
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-center shadow-lg">
                  <div className="text-slate-500 text-[10px] font-black uppercase mb-3 tracking-widest leading-none">Gross Proceeds</div>
                  <div className="text-3xl font-black text-white">${result.grossExit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-center shadow-lg">
                  <div className="text-slate-500 text-[10px] font-black uppercase mb-3 tracking-widest leading-none">Exchange Fees Paid</div>
                  <div className="text-3xl font-black text-rose-500">${result.totalFees.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                  <p className="text-[10px] text-rose-400 font-bold mt-2">Deducted from final net.</p>
                </div>
                <div className="bg-white/5 border border-yellow-500/30 p-8 rounded-3xl flex flex-col justify-center shadow-lg group relative overflow-hidden">
                  <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-yellow-500 text-[10px] font-black uppercase mb-3 tracking-widest leading-none">Final Cash-Out</div>
                  <div className="text-3xl font-black text-white relative z-10">${result.netExit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                  <p className="text-[10px] text-yellow-500/60 font-bold mt-2 italic">Actual liquidity after exit.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center p-12 text-center bg-white/[0.02] shadow-inner">
              <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mb-8 border border-yellow-500/20 shadow-[0_0_50px_rgba(234,179,8,0.1)]">
                <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight uppercase italic">Awaiting Trade Signal</h3>
              <p className="text-slate-500 max-w-[360px] font-medium leading-relaxed text-lg">Input your entry and exit points to unlock high-precision institutional profit analysis.</p>
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-invert max-w-none border-t border-white/5 pt-12">
        <CalculatorSEO
          title={cryptoSeoData.title}
          whatIsIt={cryptoSeoData.whatIsIt}
          formula={cryptoSeoData.formula}
          example={cryptoSeoData.example}
          useCases={cryptoSeoData.useCases}
          faqs={cryptoSeoData.faqs}
          deepDive={cryptoSeoData.deepDive}
          glossary={cryptoSeoData.glossary}
          relatedCalculators={[
            {
              name: "Stock Return",
              path: "/stock-return-calculator/",
              desc: "Compare your crypto performance against traditional equity benchmarks.",
            },
            {
              name: "ROI",
              path: "/roi-calculator/",
              desc: "A simplified return on investment tool for any asset class.",
            },
            {
              name: "CAGR",
              path: "/cagr-calculator/",
              desc: "Determine the smoothed annual growth rate of your crypto portfolio.",
            },
            {
              name: "Profit",
              path: "/profit-calculator/",
              desc: "General business profit margin and markup analysis tool.",
            }
          ]}
        />
      </div>
    </div>
  );
}
