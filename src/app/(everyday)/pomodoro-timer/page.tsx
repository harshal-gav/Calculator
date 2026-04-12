"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

import pomodoroSeoData from "@/data/seo-content/official/pomodoro-timer.json";

export default function PomodoroTimer() {
  // Modes: focus = 25m, shortBreak = 5m, longBreak = 15m
  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">(
    "focus",
  );
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  const timeMap = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer expired
      alert(`${mode === "focus" ? "Focus session" : "Break"} complete!`);
      handleCycleCompletion();
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, timeLeft, mode]);

  const handleCycleCompletion = () => {
    setIsRunning(false);
    if (mode === "focus") {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      if (newCycles % 4 === 0) {
        switchMode("longBreak");
      } else {
        switchMode("shortBreak");
      }
    } else {
      switchMode("focus");
    }
  };

  const switchMode = (newMode: "focus" | "shortBreak" | "longBreak") => {
    setMode(newMode);
    setTimeLeft(timeMap[newMode]);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timeMap[mode]);
  };

  const resetSession = () => {
    setIsRunning(false);
    setMode("focus");
    setCycles(0);
    setTimeLeft(timeMap["focus"]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // UI Colors based on mode
  const colorMap = {
    focus: {
      bg: "bg-red-500",
      text: "text-red-500",
      shadow: "shadow-red-500/50",
      border: "border-red-600",
      hover: "hover:bg-red-600",
      ring: "ring-red-500",
    },
    shortBreak: {
      bg: "bg-teal-500",
      text: "text-teal-500",
      shadow: "shadow-teal-500/50",
      border: "border-teal-600",
      hover: "hover:bg-teal-600",
      ring: "ring-teal-500",
    },
    longBreak: {
      bg: "bg-blue-500",
      text: "text-blue-500",
      shadow: "shadow-blue-500/50",
      border: "border-blue-600",
      hover: "hover:bg-blue-600",
      ring: "ring-blue-500",
    },
  };
  const c = colorMap[mode];

  // Progress
  const totalCurrentModeTime = timeMap[mode];
  const progressPercent =
    ((totalCurrentModeTime - timeLeft) / totalCurrentModeTime) * 100;

  return (
    <div
      className={`max-w-3xl mx-auto p-4 md:p-8 rounded-3xl shadow-2xl transition-all duration-500 ${c.bg} text-white`}
    >
      <div className="flex justify-between items-center mb-8 px-4">
        <h1 className="text-2xl font-black tracking-tight flex items-center">
          <span className="mr-2">🍅</span> Pomodoro Timer
        </h1>
        <button
          onClick={resetSession}
          className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest transition-colors backdrop-blur-sm"
        >
          Reset All
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-white/20 mb-8 max-w-lg mx-auto shadow-inner">
        {/* Mode Selectors */}
        <div className="flex justify-center gap-2 mb-10 bg-black/20 p-1.5 rounded-full overflow-hidden">
          {(["focus", "shortBreak", "longBreak"] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 px-3 text-xs md:text-sm font-bold rounded-full transition-all ${mode === m ? "bg-white text-gray-900 shadow-md" : "text-white/60 hover:text-white hover:bg-white/10"}`}
            >
              {m === "focus"
                ? "Focus (25)"
                : m === "shortBreak"
                  ? "Short Break (5)"
                  : "Long Break (15)"}
            </button>
          ))}
        </div>

        {/* Main Timer Display */}
        <div className="relative w-64 h-64 mx-auto mb-10 flex items-center justify-center">
          {/* SVG Circle for Progress */}
          <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="116"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-black/10"
            />
            <circle
              cx="128"
              cy="128"
              r="116"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white drop-shadow-lg transition-all duration-1000 ease-linear"
              strokeDasharray={2 * Math.PI * 116}
              strokeDashoffset={2 * Math.PI * 116 * (1 - progressPercent / 100)}
              strokeLinecap="round"
            />
          </svg>

          <div className="z-10 text-center flex flex-col items-center mt-2">
            <div
              className="font-mono font-black text-6xl md:text-7xl tracking-tighter drop-shadow-md cursor-pointer hover:scale-105 transition-transform"
              onClick={toggleTimer}
            >
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={toggleTimer}
            className={`w-32 h-16 bg-white ${c.text} font-black uppercase text-xl rounded-2xl shadow-lg border-b-4 ${c.border} active:border-b-0 active:translate-y-1 transition-all hover:bg-gray-50 flex items-center justify-center gap-2`}
          >
            {isRunning ? (
              <>
                <span>⏸</span> Pause
              </>
            ) : (
              <>
                <span>▶</span> Start
              </>
            )}
          </button>
          <button
            onClick={resetTimer}
            className="w-16 h-16 bg-black/20 text-white font-black text-2xl rounded-2xl shadow-lg hover:bg-black/30 transition-all flex items-center justify-center border-b-4 border-black/40 active:border-b-0 active:translate-y-1"
            title="Reset Current Timer"
          >
            ↺
          </button>
        </div>
      </div>

      <div className="text-center font-bold text-white/80 uppercase tracking-widest text-sm flex items-center justify-center gap-3">
        <span>Completed Cycles:</span>
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-lg">
          {cycles}
        </span>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Pomodoro Timer",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8 text-black">
      <CalculatorSEO
        title={pomodoroSeoData.title}
        whatIsIt={pomodoroSeoData.whatIsIt}
        formula={pomodoroSeoData.formula}
        example={pomodoroSeoData.example}
        useCases={pomodoroSeoData.useCases}
        faqs={pomodoroSeoData.faqs}
        deepDive={pomodoroSeoData.deepDive}
        glossary={pomodoroSeoData.glossary}
        relatedCalculators={[
          {
            name: "Time Card Calculator",
            path: "/time-card-calculator/",
            desc: "Track total billable hours generated across all your daily Pomodoro sprints.",
          },
          {
            name: "Days Calculator",
            path: "/days-calculator/",
            desc: "Calculate project completion dates based on a fixed daily sprint count.",
          },
          {
            name: "Word Count Calculator",
            path: "/word-count-calculator/",
            desc: "Check how many words you successfully wrote during a focus session.",
          },
          {
            name: "Stopwatch",
            path: "/stopwatch/",
            desc: "Use a precision stopwatch for timing individual tasks or exercises.",
          }]}
      />
      </div>
    </div>
  );
}
