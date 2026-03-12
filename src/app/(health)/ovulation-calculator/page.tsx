"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function OvulationCalculator() {
  const [lmpDate, setLmpDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [lutealPhase, setLutealPhase] = useState("14"); // Standard luteal phase is 14 days

  const [result, setResult] = useState<{
    fertileWindowStart: Date;
    fertileWindowEnd: Date;
    ovulationDate: Date;
    nextPeriodDate: Date;
    pregnancyTestDate: Date;
    months: any[];
  } | null>(null);

  useEffect(() => {
    const d = new Date();
    setLmpDate(d.toISOString().split("T")[0]);
  }, []);

  const calculate = () => {
    if (!lmpDate) return;

    const lmp = new Date(lmpDate);
    const cycle = parseInt(cycleLength);
    const luteal = parseInt(lutealPhase);

    if (isNaN(cycle) || isNaN(luteal)) return;

    // Ovulation is roughly (Cycle Length - Luteal Phase) days after LMP
    const daysToOvulation = cycle - luteal;

    const generateMonth = (startLmp: Date) => {
      const ovulation = new Date(startLmp);
      ovulation.setDate(startLmp.getDate() + daysToOvulation);

      const fertileStart = new Date(ovulation);
      fertileStart.setDate(ovulation.getDate() - 5);

      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(ovulation.getDate() + 1); // Egg lives 12-24 hours

      const nextPeriod = new Date(startLmp);
      nextPeriod.setDate(startLmp.getDate() + cycle);

      const testDate = new Date(nextPeriod); // Usually can test on the day of missed period

      return { fertileStart, fertileEnd, ovulation, nextPeriod, testDate };
    };

    const currentMonth = generateMonth(new Date(lmp));

    // Generate next 3 cycles
    const months = [];
    let nextLmp = new Date(lmp);
    for (let i = 0; i < 3; i++) {
      months.push(generateMonth(new Date(nextLmp)));
      nextLmp.setDate(nextLmp.getDate() + cycle);
    }

    setResult({
      fertileWindowStart: currentMonth.fertileStart,
      fertileWindowEnd: currentMonth.fertileEnd,
      ovulationDate: currentMonth.ovulation,
      nextPeriodDate: currentMonth.nextPeriod,
      pregnancyTestDate: currentMonth.testDate,
      months: months,
    });
  };

  const formatDateRange = (start: Date, end: Date) => {
    const startStr = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center font-serif">
          <span className="mr-3">🌺</span> Ovulation Calculator
        </h1>
        <p className="text-rose-700 text-lg max-w-2xl mx-auto">
          Track your most fertile days. Discover your predicted ovulation date
          and fertile window to maximize your chances of pregnancy.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              First Day of Last Period (LMP)
            </label>
            <input
              type="date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                Average Cycle Length
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="20"
                  max="45"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50"
                />
                <span className="absolute right-4 top-4 text-zinc-500 font-bold text-sm">
                  Days
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                Luteal Phase{" "}
                <span className="text-zinc-400 font-normal text-xs">
                  (Usually 14)
                </span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="10"
                  max="16"
                  value={lutealPhase}
                  onChange={(e) => setLutealPhase(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50"
                />
                <span className="absolute right-4 top-4 text-zinc-500 font-bold text-sm">
                  Days
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-rose-600/30 uppercase tracking-widest text-lg"
          >
            Calculate My Fertile Window
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="space-y-6">
          <div className="bg-rose-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

            <h2 className="text-rose-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
              Your Current Cycle
            </h2>

            <div className="w-full max-w-2xl bg-black/40 p-8 rounded-2xl border border-rose-500/30 z-10 relative mb-6">
              <span className="text-white/80 text-sm font-bold uppercase tracking-widest text-center block mb-2">
                Prime Fertile Window
              </span>
              <div className="text-center font-bold text-3xl md:text-5xl text-white mb-6 drop-shadow-md">
                {formatDateRange(
                  result.fertileWindowStart,
                  result.fertileWindowEnd,
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6 pt-6 border-t border-rose-800/50">
                <div className="text-center">
                  <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-1 block">
                    Expected Ovulation
                  </span>
                  <span className="text-rose-100 font-bold text-xl">
                    {result.ovulationDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="hidden md:block w-px h-10 bg-rose-800/50"></div>
                <div className="text-center">
                  <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-1 block">
                    Next Period
                  </span>
                  <span className="text-rose-100 font-bold text-xl">
                    {result.nextPeriodDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="hidden md:block w-px h-10 bg-rose-800/50"></div>
                <div className="text-center">
                  <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-1 block">
                    Pregnancy Test
                  </span>
                  <span className="text-rose-100 font-bold text-xl">
                    {result.pregnancyTestDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
            <h3 className="font-bold text-zinc-800 text-lg mb-4 border-b pb-2">
              Upcoming Cycles
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200">
                    <th className="p-3 font-bold text-zinc-600 text-sm">
                      Month
                    </th>
                    <th className="p-3 font-bold text-zinc-600 text-sm">
                      Fertile Window
                    </th>
                    <th className="p-3 font-bold text-zinc-600 text-sm">
                      Ovulation Day
                    </th>
                    <th className="p-3 font-bold text-zinc-600 text-sm">
                      Next Period
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.months.slice(1).map((month, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-zinc-100 last:border-0 hover:bg-rose-50/30 transition-colors"
                    >
                      <td className="p-3 font-bold text-zinc-800">
                        {month.fertileStart.toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-3 font-medium text-rose-600 bg-rose-50/50">
                        {formatDateRange(month.fertileStart, month.fertileEnd)}
                      </td>
                      <td className="p-3 font-medium text-zinc-700">
                        {month.ovulation.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="p-3 font-medium text-zinc-700">
                        {month.nextPeriod.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Ovulation Calculator",
            operatingSystem: "All",
            applicationCategory: "HealthApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Ovulation Calculator & Fertility Tracker"
          whatIsIt={
            <>
              <p>
                Our <strong>Ovulation Calculator</strong> helps you pinpoint
                your most fertile days of the month by tracking your menstrual
                cycle. By calculating your exact ovulation date, it identifies
                your "fertile window"—the brief period each month when
                intercourse is highly likely to result in pregnancy.
              </p>
              <p>
                Because the human egg survives for merely 12 to 24 hours
                post-ovulation, while sperm can survive inside the female
                reproductive tract for up to 5 days, accurately predicting
                ovulation is the single most important factor in natural family
                planning.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The standard medical formula relies on subtracting the length of
                the luteal phase from the total cycle length.
              </p>
              <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
                <strong>Estimated Ovulation Day</strong> = Cycle Length - Luteal
                Phase Length
                <br />
                <br />
                <strong>Fertile Window</strong> = (Ovulation Day minus 5 days) +
                (Ovulation Day plus 1 day)
              </div>
            </>
          }
          example={
            <>
              <p>
                Here is how a perfectly average menstrual cycle calculation
                works:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  You have an average cycle length of exactly{" "}
                  <strong>28 days</strong>, and the standard luteal phase length
                  of exactly <strong>14 days</strong>.
                </li>
                <li>
                  The math is simple: 28 - 14 = 14. Therefore, you ovulate
                  precisely on <strong>Day 14</strong> of your cycle (counting
                  from the first day you started bleeding).
                </li>
                <li>
                  Your <strong>Fertile Window</strong> officially opens on Day 9
                  of your cycle, peaks strongly on Day 13 and Day 14, and firmly
                  closes tight by Day 15.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Conception Planning:</strong> Maximizing the
                mathematical probability of getting pregnant by intentionally
                timing intercourse to occur deeply within the 5-day window
                immediately preceding ovulation.
              </li>
              <li>
                <strong>Natural Contraception (Rhythm Method):</strong>{" "}
                Conversely, determining exactly when to absolutely avoid
                unprotected intercourse if you are rigorously attempting to
                prevent pregnancy without the use of hormonal birth control.
              </li>
              <li>
                <strong>Early Pregnancy Detection:</strong> Mathematically
                calculating the absolute earliest date a standard home pregnancy
                test (HPT) could logically detect human chorionic gonadotropin
                (hCG) in your urine, which is usually 12 to 14 days strictly
                post-ovulation.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What exactly is the Luteal Phase?",
              answer:
                "The luteal phase is the strictly timed second half of your menstrual cycle. It begins immediately after ovulation and rigidly ends the single day before your next period starts. Unlike the highly variable first half of a woman's cycle, a healthy luteal phase is almost always rigidly locked at exactly 12, 13, or 14 days, regardless of the woman.",
            },
            {
              question:
                "Why is the fertile window 6 days long if an egg only lives for 24 hours?",
              answer:
                "The biological window is driven entirely by the lifespan of sperm, not the egg. Healthy sperm can survive stubbornly in fertile cervical mucus for up to 5 whole days waiting for an egg to be released. If you have intercourse 4 days prior to ovulation, you can absolutely still get pregnant.",
            },
            {
              question:
                "Is this calculator medically accurate for irregular cycles?",
              answer:
                "No. If your cycle randomly fluctuates between 24 and 35 days, standard mathematical calendar predictors are fundamentally useless. Women with highly irregular cycles must rely on clinical basal body temperature (BBT) tracking or pharmaceutical ovulation predictor kits (OPKs) testing luteinizing hormone (LH).",
            },
          ]}
          relatedCalculators={[
            {
              name: "Due Date Calculator",
              path: "/due-date-calculator",
              desc: "Calculate when your baby will arrive if you conceived.",
            },
            {
              name: "Time Calculator",
              path: "/time-calculator",
              desc: "Easily add or subtract time intervals.",
            },
            {
              name: "BMI Calculator",
              path: "/bmi-calculator",
              desc: "Analyze your Body Mass Index (BMI).",
            },
            {
              name: "Calorie Calculator",
              path: "/calorie-calculator",
              desc: "Estimate the number of calories you need to maintain or lose weight.",
            }]}
        />
      </div>
    </div>
  );
}
