"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

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
          title="Pomodoro Technique Timer"
          whatIsIt={
            <>
              <p>
                The <strong>Pomodoro Timer</strong> is a world-renowned
                productivity methodology designed to weaponize your attention
                span by breaking large workloads into intense, hyper-focused
                25-minute intervals separated by short breaks.
              </p>
              <p>
                Invented in the late 1980s by Francesco Cirillo (who used a
                literal tomato-shaped kitchen timer), this system prevents
                burnout and eliminates the friction of starting difficult tasks.
                By forcing you to stop working before you are entirely
                exhausted, it maintains a remarkably high mental baseline across
                an entire workday.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The standard Pomodoro cycle relies on strict chronological
                intervals and mandatory rest ratios:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Sprint (25 Mins):</strong> Absolute, uninterrupted
                  focus on a single task. Zero phone checking, no email, no
                  context switching.
                </li>
                <li>
                  <strong>The Short Break (5 Mins):</strong> A required
                  micro-rest. You must physically step away from the work
                  context to reset mental fatigue.
                </li>
                <li>
                  <strong>The Long Break (15-30 Mins):</strong> After completing
                  exactly four 25-minute sprints (one "Cycle"), an extended
                  decompression break is authorized before restarting the entire
                  process.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                You have a massive, overwhelming 50-page thesis to write. The
                scale of the work makes you procrastinate.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Shift:</strong> Instead of thinking "I need to
                  write 50 pages today", you reframe the goal to "I will
                  complete exactly four 25-minute Pomodoros of typing."
                </li>
                <li>
                  <strong>The Execution:</strong> You write intensely for 25
                  minutes, ignoring your phone. The timer rings. You take five
                  minutes to stretch. You repeat this four times.
                </li>
                <li>
                  <strong>The Result:</strong> You have accidentally achieved
                  nearly 2 continuous hours of absolute deep work, generating
                  massive output without ever experiencing the dread of an
                  unstructured "workday."
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Academic Studying:</strong> College students cramming
                for final exams using intervals to deliberately prevent the "law
                of diminishing returns" where studying past hour 3 yields zero
                memory retention.
              </li>
              <li>
                <strong>Software Development:</strong> Programmers using short
                sprints to dive deeply into a single complex algorithm without
                being derailed by Slack messages or incoming emails.
              </li>
              <li>
                <strong>Household Chores:</strong> Using a single 25-minute
                sprint to competitively speed-clean a messy house, eliminating
                the emotional friction of "wasting an entire Saturday cleaning."
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "What happens if I finish my task before the 25 minutes are up?",
              answer:
                "Cirillo’s original rule states: 'A Pomodoro is indivisible.' If you finish early, you spend the remaining minutes reviewing what you did, checking for errors, or doing micro-planning for the next task. Never pause the timer halfway.",
            },
            {
              question:
                "Do I have to strictly use 25 minutes? What if my attention span is longer?",
              answer:
                "While 25/5 is the scientifically optimal default for most humans, many advanced users (especially programmers) switch to a 50/10 ratio to allow more time to engage deep context. However, the core rule remains: the break is mandatory, regardless of interval length.",
            },
            {
              question: "What if someone interrupts me during a focus sprint?",
              answer:
                "You must use the 'Inform, Negotiate, Call back' strategy. Tell them you are in the middle of a sprint, negotiate a time to talk during your upcoming break, and return to the timer. Only true emergencies should break an active Pomodoro.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Time Card Calculator",
              path: "/time-card-calculator",
              desc: "Track how many total billable hours you generated across all your daily Pomodoro sprints.",
            },
            {
              name: "Pomodoro Converter (Days)",
              path: "/days-calculator",
              desc: "Calculate what date a massive project will be finished if you only complete 4 sprints a day.",
            },
            {
              name: "Word Count Calculator",
              path: "/word-count-calculator",
              desc: "Check exactly how many words you successfully wrote during a 25-minute sprint session.",
            },
            {
              name: "Age Calculator",
              path: "/age-calculator",
              desc: "Calculate your exact age in years, months, and days.",
            }]}
        />
      </div>
    </div>
  );
}
