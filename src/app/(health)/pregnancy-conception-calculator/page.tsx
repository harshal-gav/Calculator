"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PregnancyConceptionCalculator() {
  const [calculationMethod, setCalculationMethod] = useState<"lmp" | "edd">("lmp");
  const [inputDate, setInputDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");

  const [result, setResult] = useState<{
    conceptionMin: string;
    conceptionMax: string;
    estimatedDueDate: string;
    gestationalAge: string;
  } | null>(null);

  const calculateDates = () => {
    if (!inputDate) return;

    const baseDate = new Date(inputDate);
    // JS dates can be tricky with timezones, we'll assume valid local date parsing.
    if (isNaN(baseDate.getTime())) return;

    let edd = new Date(baseDate.getTime());
    let conceptionLmp = new Date(baseDate.getTime());

    const cLength = parseInt(cycleLength) || 28;

    if (calculationMethod === "lmp") {
      // EDD is LMP + 280 days + (cycleLength - 28)
      edd.setDate(edd.getDate() + 280 + (cLength - 28));
      
      // Approximate conception is LMP + 14 days + (cycleLength - 28)
      conceptionLmp.setDate(conceptionLmp.getDate() + 14 + (cLength - 28));
    } else {
      // Given EDD
      edd = new Date(baseDate.getTime());
      
      // Conception is exactly 266 days BEFORE the typical EDD
      conceptionLmp = new Date(edd.getTime());
      conceptionLmp.setDate(conceptionLmp.getDate() - 266);
    }

    // Conception window is usually 3-4 days surrounding ovulation
    const conceptionMinDate = new Date(conceptionLmp.getTime());
    conceptionMinDate.setDate(conceptionMinDate.getDate() - 2);
    
    const conceptionMaxDate = new Date(conceptionLmp.getTime());
    conceptionMaxDate.setDate(conceptionMaxDate.getDate() + 2);

    // Gestational age today
    const today = new Date();
    // A pregnancy starts standardly from the LMP date (14 days before conceptionLmp ideally)
    const trueLmp = new Date(conceptionLmp.getTime());
    trueLmp.setDate(trueLmp.getDate() - 14);
    
    const diffTime = Math.abs(today.getTime() - trueLmp.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    let gestAge = "";
    if (today > edd) {
        gestAge = "40+ Weeks (Overdue or Delivered)";
    } else if (today < conceptionLmp && calculationMethod === "lmp") {
        gestAge = "Not yet pregnant mathematically";
    } else {
        const weeks = Math.floor(totalDays / 7);
        const days = totalDays % 7;
        gestAge = `${weeks} Weeks, ${days} Days`;
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

    setResult({
      conceptionMin: conceptionMinDate.toLocaleDateString(undefined, options),
      conceptionMax: conceptionMaxDate.toLocaleDateString(undefined, options),
      estimatedDueDate: edd.toLocaleDateString(undefined, options),
      gestationalAge: gestAge
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Pregnancy Conception Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Reverse engineer your ultrasound Due Date to find out exactly when you conceived, or project it forward using your Last Menstrual Period.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Calculation Method</h2>
          
          <div className="space-y-6">
            
            <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
              <button
                className={`flex-1 py-3 text-sm font-bold transition ${calculationMethod === "lmp" ? "bg-rose-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setCalculationMethod("lmp")}
              >
                Use LMP
              </button>
              <button
                className={`flex-1 py-3 text-sm font-bold transition ${calculationMethod === "edd" ? "bg-rose-500 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                onClick={() => setCalculationMethod("edd")}
              >
                Use Due Date (EDD)
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {calculationMethod === "lmp" ? "First day of your Last Period (LMP)" : "Estimated Due Date (EDD)"}
              </label>
              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-3 border text-lg text-gray-700"
              />
            </div>

            {calculationMethod === "lmp" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Average Cycle Length (Days)
                </label>
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-3 border text-lg"
                />
                <p className="text-xs text-gray-500 mt-1">Average is 28 days.</p>
              </div>
            )}
          </div>

          <button
            onClick={calculateDates}
            disabled={!inputDate}
            className={`mt-8 w-full font-bold py-4 px-4 rounded-xl transition shadow-lg text-lg uppercase tracking-wide ${inputDate ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            Calculate Dates
          </button>
        </div>

        <div className="lg:col-span-7 bg-rose-50 rounded-xl p-8 border border-rose-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-sm font-bold text-rose-800 mb-1 text-center uppercase tracking-wider">
                Likely Conception Window
              </h2>
              <div className="text-2xl md:text-3xl font-black text-center text-rose-600 mb-6 pb-6 border-b border-rose-200">
                {result.conceptionMin} <br /><span className="text-lg text-rose-400">to</span><br />{result.conceptionMax}
              </div>

              <div className="bg-white p-5 rounded-xl border border-rose-100 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between md:items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-semibold mb-1 md:mb-0">Estimated Due Date:</span>
                  <span className="font-bold text-gray-900 text-lg">
                    {result.estimatedDueDate}
                  </span>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between md:items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-semibold mb-1 md:mb-0">Current Gestational Age:</span>
                  <span className="font-bold text-rose-700 text-lg">
                    {result.gestationalAge}
                  </span>
                </div>
              </div>
              
              <p className="text-xs text-center text-gray-500 mt-6 px-4">
                Note: These dates are mathematical estimates. Sperm can live inside the body for up to 5 days, making the exact day of intercourse decoupled from the exact day of fertilization.
              </p>
            </div>
          ) : (
             <div className="text-center text-rose-800 opacity-60 font-medium my-auto p-8">
                Select your calculation method and input a date to reveal your conception timeline.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Pregnancy Conception Calculator"
        whatIsIt={
          <>
            <p>
              A <strong>Pregnancy Conception Calculator</strong> reverse-engineers the standard 40-week human gestational cycle to pinpoint the 3-to-4 day window where intercourse led to fertilization. 
            </p>
          </>
        }
        formula={
          <>
            <p>Obstetricians mathematically base "Pregnancy Weeks" off the First Day of your Last Menstrual Period (LMP), meaning you mathematically "start" your pregnancy 2 weeks before you actually conceive.</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>If using LMP:</strong> Conception Date = LMP + 14 days (adjusted if cycle length != 28 days).</li>
              <li><strong>If using Ultrasound EDD:</strong> Conception Date = Estimated Due Date MINUS exactly 266 days (38 weeks).</li>
            </ul>
          </>
        }
        example={
          <>
            <p>If your doctor tells you your ultrasound Due Date is <strong>December 25th</strong>:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Subtract 266 days from December 25th.</li>
              <li>Your conception window sits squarely around <strong>April 3rd</strong>.</li>
              <li>The intercourse that led to this could have happened between March 30th and April 4th.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Paternity Timelines:</strong> Pinpointing exact intercourse dates when tracking cyclical fertility windows.</li></ul>}
        faqs={[
          {
            question: "Is Ultrasound more accurate than LMP?",
            answer: "Yes. Early first-trimester ultrasounds measure the exact millimeter length of the fetus (Crown-Rump Length) to dictate your Due Date regardless of when you think your last period was."
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            },
            {
              question: "Is this tool free to use?",
              answer: "Yes, all our calculators are 100% free to use. We do not require any registration, personal information, or subscriptions.",
            }]}
        relatedCalculators={[
            {
              name: "BMI Calculator",
              path: "/bmi-calculator",
              desc: "Calculate your Body Mass Index for a quick health assessment.",
            },
            {
              name: "Calorie Calculator",
              path: "/calorie-calculator",
              desc: "Estimate the number of calories you need to maintain or lose weight.",
            },
            {
              name: "BMR Calculator",
              path: "/bmr-calculator",
              desc: "Find your Basal Metabolic Rate to understand your calorie needs at rest.",
            },
            {
              name: "Ideal Weight Calculator",
              path: "/ideal-weight-calculator",
              desc: "Estimate your healthy weight range based on traditional formulas.",
            }]}
      />
    </div>
  );
}
