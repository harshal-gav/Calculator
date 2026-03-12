"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CronJobGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dom, setDom] = useState("*");
  const [month, setMonth] = useState("*");
  const [dow, setDow] = useState("*");

  const cronString = `${minute} ${hour} ${dom} ${month} ${dow}`;

  // Extremely basic human readable parser for simple cron formats
  const generateDescription = () => {
    if (cronString === "* * * * *") return "Every minute, all the time.";
    if (cronString === "0 * * * *") return "At the start of every hour.";
    if (cronString === "0 0 * * *") return "Every day at midnight.";
    if (cronString === "0 0 * * 0") return "Every Sunday at midnight.";
    if (cronString === "0 0 1 * *")
      return "At Midnight on the 1st of every month.";

    let desc = "Runs";

    if (minute !== "*") desc += ` at minute ${minute}`;
    if (hour !== "*") desc += ` past hour ${hour}`;
    if (dom !== "*") desc += ` on day of month ${dom}`;
    if (month !== "*") desc += ` in month ${month}`;
    if (dow !== "*") desc += ` on day of week ${dow}`;

    if (desc === "Runs") return "Every minute of every day (Standard Default)";

    return desc + ".";
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronString).then(() => {
      alert("Cron expression copied to clipboard!");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 flex items-center justify-center font-mono">
          <span className="mr-3">⏱</span> Cron Job Generator
        </h1>
        <p className="text-slate-700 text-lg max-w-2xl mx-auto">
          Quickly generate and understand cron schedule expressions for your
          tasks.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="flex flex-col">
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">
              Minute
            </label>
            <input
              type="text"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full text-center rounded-xl border border-zinc-300 shadow-sm p-3 focus:border-slate-500 font-bold font-mono text-xl transition-all outline-none"
              placeholder="*"
            />
            <span className="text-center text-[10px] text-zinc-400 mt-2 font-bold uppercase">
              (0-59) or *
            </span>
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">
              Hour
            </label>
            <input
              type="text"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full text-center rounded-xl border border-zinc-300 shadow-sm p-3 focus:border-slate-500 font-bold font-mono text-xl transition-all outline-none"
              placeholder="*"
            />
            <span className="text-center text-[10px] text-zinc-400 mt-2 font-bold uppercase">
              (0-23) or *
            </span>
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">
              Day(Month)
            </label>
            <input
              type="text"
              value={dom}
              onChange={(e) => setDom(e.target.value)}
              className="w-full text-center rounded-xl border border-zinc-300 shadow-sm p-3 focus:border-slate-500 font-bold font-mono text-xl transition-all outline-none"
              placeholder="*"
            />
            <span className="text-center text-[10px] text-zinc-400 mt-2 font-bold uppercase">
              (1-31) or *
            </span>
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">
              Month
            </label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full text-center rounded-xl border border-zinc-300 shadow-sm p-3 focus:border-slate-500 font-bold font-mono text-xl transition-all outline-none"
              placeholder="*"
            />
            <span className="text-center text-[10px] text-zinc-400 mt-2 font-bold uppercase">
              (1-12) or *
            </span>
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">
              Day(Week)
            </label>
            <input
              type="text"
              value={dow}
              onChange={(e) => setDow(e.target.value)}
              className="w-full text-center rounded-xl border border-zinc-300 shadow-sm p-3 focus:border-slate-500 font-bold font-mono text-xl transition-all outline-none"
              placeholder="*"
            />
            <span className="text-center text-[10px] text-zinc-400 mt-2 font-bold uppercase">
              (0-6) [Sun-Sat]
            </span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
            Quick Presets
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setMinute("*");
                setHour("*");
                setDom("*");
                setMonth("*");
                setDow("*");
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-100 transition shadow-sm"
            >
              Every Minute
            </button>
            <button
              onClick={() => {
                setMinute("0");
                setHour("*");
                setDom("*");
                setMonth("*");
                setDow("*");
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-100 transition shadow-sm"
            >
              Every Hour
            </button>
            <button
              onClick={() => {
                setMinute("0");
                setHour("0");
                setDom("*");
                setMonth("*");
                setDow("*");
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-100 transition shadow-sm"
            >
              Every Midnight
            </button>
            <button
              onClick={() => {
                setMinute("0");
                setHour("0");
                setDom("*");
                setMonth("*");
                setDow("0");
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-100 transition shadow-sm"
            >
              Every Sunday
            </button>
            <button
              onClick={() => {
                setMinute("*/15");
                setHour("*");
                setDom("*");
                setMonth("*");
                setDow("*");
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-100 transition shadow-sm"
            >
              Every 15 Mins
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

        <h2 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
          Output Expression
        </h2>

        <div className="z-10 relative mb-8 w-full max-w-2xl group">
          <div className="flex bg-slate-800 rounded-xl overflow-hidden border border-slate-600 shadow-inner group-hover:border-slate-400 transition-colors">
            <div className="flex-1 p-6 flex justify-center items-center">
              <span className="font-mono font-black text-4xl md:text-6xl text-slate-200 tracking-widest drop-shadow-md">
                {cronString}
              </span>
            </div>
            <button
              onClick={copyToClipboard}
              className="bg-slate-700 hover:bg-slate-600 border-l border-slate-600 text-white font-bold px-6 flex flex-col items-center justify-center transition-colors"
            >
              <span className="text-2xl mb-1">📋</span>
              <span className="text-[10px] uppercase tracking-widest">
                Copy
              </span>
            </button>
          </div>
        </div>

        <div className="bg-black/30 w-full max-w-2xl rounded-xl border border-white/5 p-6 flex flex-col items-center text-center z-10">
          <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold mb-3">
            Friendly Description
          </span>
          <span className="text-slate-300 font-medium text-lg italic leading-relaxed">
            "{generateDescription()}"
          </span>
          <span className="text-white/20 text-xs mt-4">
            For fully precise timing, ensure your system timezone matches your
            expectations.
          </span>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Cron Job Generator",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Cron Job Expression Generator"
          whatIsIt={
            <>
              <p>
                The <strong>Cron Job Generator</strong> creates and translates
                standard cron schedule expressions. It converts simple English
                scheduling needs into the exact 5-part asterisk format required
                by Linux servers and cloud automation systems.
              </p>
              <p>
                Cron is the invisible timekeeper of the internet. It allows
                servers to automatically run scripts or programs at highly
                specific, recurring intervals without any human intervention.
              </p>
            </>
          }
          formula={
            <>
              <p>
                A standard cron expression consists of exactly 5 fields
                separated by spaces. The system checks this expression every
                single minute. If the current server time perfectly matches the
                expression, the task executes:
              </p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-[14px] shadow-sm my-4 text-slate-900 border border-slate-200 text-center">
                * * * * *
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Field 1 (Minute):</strong> 0-59. (e.g., '30' means
                  exactly on the half-hour).
                </li>
                <li>
                  <strong>Field 2 (Hour):</strong> 0-23. Uses 24-hour military
                  time.
                </li>
                <li>
                  <strong>Field 3 (Day of Month):</strong> 1-31.
                </li>
                <li>
                  <strong>Field 4 (Month):</strong> 1-12.
                </li>
                <li>
                  <strong>Field 5 (Day of Week):</strong> 0-6. (0 is Sunday, 6
                  is Saturday).
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                You need your server to generate and email a weekly financial
                report. You want this to happen strictly at{" "}
                <strong>4:15 AM every Monday</strong> morning so it is ready
                before the office opens.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Minute:</strong> 15
                </li>
                <li>
                  <strong>Hour:</strong> 4
                </li>
                <li>
                  <strong>Day of Month:</strong> * (Any day)
                </li>
                <li>
                  <strong>Month:</strong> * (Any month)
                </li>
                <li>
                  <strong>Day of Week:</strong> 1 (Monday)
                </li>
                <li>
                  <strong>The Result:</strong> The final cron string is exactly{" "}
                  <strong>15 4 * * 1</strong>. The server will ignore this job
                  24/7 until the clock strikes exactly 04:15 AM on a Monday.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Database Backups:</strong> System admins schedule heavy
                database dumps (e.g., "0 2 * * *") to run sequentially at 2:00
                AM every night when website traffic is at absolute zero.
              </li>
              <li>
                <strong>SaaS Billing:</strong> Subscription software relies on
                cron jobs to scan the database daily at midnight, identifying
                which users' 30-day trials have expired, and automatically
                charging their credit cards.
              </li>
              <li>
                <strong>Marketing Automation:</strong> E-commerce sites use cron
                jobs to trigger "abandoned cart" emails exactly 2 hours after a
                user leaves the website without checking out.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What does the * (Asterisk) mean?",
              answer:
                "The asterisk is a wildcard meaning 'Every'. If Field 1 is an asterisk, the job runs every single minute. If Field 4 is an asterisk, the job runs in every single month of the year.",
            },
            {
              question: "How do I make a task run 'every 15 minutes'?",
              answer:
                "You use the step operator (/). By putting '*/15' in the Minute field, you tell the server to execute the job any time the current minute is perfectly divisible by 15 (e.g., 00, 15, 30, 45).",
            },
            {
              question: "Why did my Cron job run at the wrong time?",
              answer:
                "Cron jobs rely entirely on the internal system clock of the server they live on. If you wrote a cron job for 5:00 PM EST, but your AWS server is set to UTC (London time), your job will execute 5 hours earlier than you intended.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Regex Tester",
              path: "/regex-tester",
              desc: "Test complex pattern matching syntax for your automation scripts.",
            },
            {
              name: "Time Zone Converter",
              path: "/time-zone-converter",
              desc: "Convert your local time to UTC to ensure your remote cron jobs execute accurately.",
            },
            {
              name: "Pomodoro Timer",
              path: "/pomodoro-timer",
              desc: "Manage your own human schedule with structured automation intervals.",
            },
            {
              name: "Bandwidth Calculator",
              path: "/bandwidth-calculator",
              desc: "Calculate download and upload times for various data sizes.",
            }]}
        />
      </div>
    </div>
  );
}
