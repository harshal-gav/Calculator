"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function BmiCalculator() {
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [weightLbs, setWeightLbs] = useState("160");
  
  const [heightCm, setHeightCm] = useState("178");
  const [weightKg, setWeightKg] = useState("72.5");

  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    minHealthyWeightDesc: string;
    maxHealthyWeightDesc: string;
  } | null>(null);

  const calculateBmi = () => {
    let bmiValue = 0;
    let minHealthyWeight = 0;
    let maxHealthyWeight = 0;
    let isMetric = unitSystem === "metric";

    if (!isMetric) {
      const ft = parseFloat(heightFeet) || 0;
      const inch = parseFloat(heightInches) || 0;
      const lbs = parseFloat(weightLbs) || 0;
      
      const totalInches = (ft * 12) + inch;
      
      if (totalInches > 0 && lbs > 0) {
        // Imperial BMI formula: 703 * (lbs / inches^2)
        bmiValue = 703 * (lbs / (totalInches * totalInches));
        
        // Healthy BMI range is 18.5 to 24.9
        // Weight = BMI * (inches^2) / 703
        minHealthyWeight = 18.5 * (totalInches * totalInches) / 703;
        maxHealthyWeight = 24.9 * (totalInches * totalInches) / 703;
      }
    } else {
      const cm = parseFloat(heightCm) || 0;
      const kg = parseFloat(weightKg) || 0;
      const meters = cm / 100;
      
      if (meters > 0 && kg > 0) {
        // Metric BMI formula: kg / m^2
        bmiValue = kg / (meters * meters);
        
        minHealthyWeight = 18.5 * (meters * meters);
        maxHealthyWeight = 24.9 * (meters * meters);
      }
    }

    if (bmiValue > 0) {
      let category = "";
      let color = "";
      
      if (bmiValue < 18.5) {
        category = "Underweight";
        color = "text-blue-500 border-blue-200 bg-blue-50";
      } else if (bmiValue < 25) {
        category = "Normal Weight";
        color = "text-green-600 border-green-200 bg-green-50";
      } else if (bmiValue < 30) {
        category = "Overweight";
        color = "text-yellow-600 border-yellow-200 bg-yellow-50";
      } else if (bmiValue < 35) {
        category = "Obese (Class I)";
        color = "text-orange-500 border-orange-200 bg-orange-50";
      } else if (bmiValue < 40) {
        category = "Obese (Class II)";
        color = "text-red-500 border-red-200 bg-red-50";
      } else {
        category = "Severe Obesity (Class III)";
        color = "text-red-700 border-red-300 bg-red-100";
      }

      setResult({
        bmi: bmiValue,
        category,
        color,
        minHealthyWeightDesc: `${minHealthyWeight.toFixed(1)} ${isMetric ? "kg" : "lbs"}`,
        maxHealthyWeightDesc: `${maxHealthyWeight.toFixed(1)} ${isMetric ? "kg" : "lbs"}`,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-rose-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-rose-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-nowrap">BMI Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Assess your weight status and find your healthy range.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-full border border-rose-100 shrink-0">
          <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">Health Metrics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                className={`flex-1 py-3 text-sm font-bold transition-all ${unitSystem === "imperial" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-slate-600"}`}
                onClick={() => setUnitSystem("imperial")}
              >
                Imperial (ft / lbs)
              </button>
              <button
                className={`flex-1 py-3 text-sm font-bold transition ${unitSystem === "metric" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                onClick={() => setUnitSystem("metric")}
              >
                Metric (cm / kg)
              </button>
            </div>

            {unitSystem === "imperial" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Feet</label>
                    <input
                      type="number"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Inches</label>
                    <input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={calculateBmi}
            className="mt-8 w-full bg-indigo-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate BMI
          </button>
        </div>

        <div className="lg:col-span-7 bg-indigo-50 rounded-xl p-8 border border-indigo-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-indigo-900 mb-2 text-center uppercase tracking-wider">
                Your BMI Score
              </h2>
              <div className="text-6xl md:text-7xl font-black text-center text-indigo-700 mb-6 pb-6 border-b border-indigo-200">
                {result.bmi.toFixed(1)}
              </div>
              
              <div className={`text-center py-4 px-6 rounded-lg border border-opacity-50 font-bold text-xl md:text-2xl mb-6 ${result.color}`}>
                {result.category}
              </div>

              <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm">
                 <h3 className="font-bold text-gray-800 mb-3 text-center">Your Healthy Weight Range</h3>
                 <p className="text-center text-gray-600 mb-2">Based on a healthy BMI of 18.5 - 24.9:</p>
                 <div className="text-2xl font-black text-center text-indigo-600">
                    {result.minHealthyWeightDesc} - {result.maxHealthyWeightDesc}
                 </div>
              </div>
            </div>
          ) : (
             <div className="text-center text-indigo-800 opacity-60 font-medium p-8">
                Enter your height and weight to visualize your Body Mass Index ratio.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="BMI Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>BMI (Body Mass Index) Calculator</strong> is a global standard for assessing physical health based on the Relationship between body mass and stature. Originally developed by Adolphe Quetelet in the mid-19th century, Body Mass Index provides a numerical value that categorizes individuals into specific weight status groups: underweight, normal weight, overweight, and obese.
            </p>
            <p>
              While BMI does not directly measure body fat percentage, it acts as a reliable surrogate for more expensive and invasive clinical measurements. For the majority of adults, BMI provides an accurate reflection of weight-related health risks. By analyzing the ratio of your height to your weight, medical professionals can screen for potential health issues such as Type 2 diabetes, high blood pressure, and cardiovascular complications before they become critical.
            </p>
            <p>
              Our calculator provides instant classification based on both Imperial and Metric systems, ensuring accuracy whether you use pounds and inches or kilograms and centimeters. It is designed to be the first step in a comprehensive wellness audit.
            </p>
          </>
        }
        comparisonTable={{
          title: "WHO Adult BMI Classifications",
          headers: ["Weight Category", "BMI Range", "Health Implications"],
          rows: [
            ["Underweight", "< 18.5", "Increased risk for nutritional deficiencies and osteoporosis."],
            ["Normal Weight", "18.5 – 24.9", "Lowest health risk; maintain current lifestyle and diet."],
            ["Overweight", "25.0 – 29.9", "Increased risk for cardiovascular disease and type 2 diabetes."],
            ["Obesity (Class I)", "30.0 – 34.9", "Significant risk for chronic health conditions; consultation advised."],
            ["Obesity (Class II)", "35.0 – 39.9", "High risk for heart disease, stroke, and sleep apnea."],
            ["Severe Obesity (Class III)", "40.0+", "Extremely high risk for severe morbidity and quality of life issues."],
          ]
        }}
        formula={
          <div className="space-y-6">
            <p>
              The Body Mass Index is a simple mathematical ratio. Depending on your preference for measurement systems, we use one of the two following formulas:
            </p>
            <div className="bg-white/10 p-6 rounded-2xl font-mono text-center text-2xl border border-white/20 shadow-inner my-6">
              Metric: BMI = kg / m²
            </div>
            <p className="text-sm opacity-80">
              Where <strong>kg</strong> is weight in kilograms and <strong>m²</strong> is height in meters squared.
            </p>
            <div className="bg-white/10 p-6 rounded-2xl font-mono text-center text-2xl border border-white/20 shadow-inner my-6">
              Imperial: BMI = 703 × (lbs / inches²)
            </div>
            <p className="text-sm opacity-80 italic">
              *The conversion factor of 703 is required to align the result with the standard metric scale used worldwide.
            </p>
          </div>
        }
        deepDive={
          <>
            <h4 className="text-2xl font-black text-gray-900 mb-6">Part I: The Limitations of BMI</h4>
            <p>
              While BMI is a globally recognized metric, it is important to understand its constraints. BMI is a "crude" instrument because it does not distinguish between muscle mass, bone density, and fat distribution. A professional athlete with high muscle density may register as "overweight" or "obese" despite having very low body fat percentages.
            </p>
            <p>
              Furthermore, BMI does not account for <strong>waist circumference</strong>, which is often a more accurate predictor of visceral fat—the dangerous fat stored around internal organs. For this reason, medical practitioners often use BMI in conjunction with other metrics like the Waist-to-Hip ratio and blood lipid panels to get a complete picture of an individual's metabolic health.
            </p>

            <h4 className="text-2xl font-black text-gray-900 mt-12 mb-6">Part II: Ethnic and Age Variations</h4>
            <p>
              Recent medical research suggests that the "Standard" BMI ranges (18.5–24.9) may not be universally applicable across all ethnicities. For example, some populations may experience increased health risks at lower BMI levels than others due to different body compositions and genetic predispositions toward certain metabolic conditions.
            </p>
            <p>
              Similarly, for older adults, having a slightly higher BMI (towards the upper end of the normal range or lower end of overweight) has been associated with better health outcomes and protection against frailty. If you are over the age of 65, your "optimal" BMI target may differ from that of a 25-year-old.
            </p>

            <h4 className="text-2xl font-black text-gray-900 mt-12 mb-6">Part III: From Screening to Action</h4>
            <p>
              If your BMI falls outside the "normal" range, it should be viewed as a signal for further investigation rather than a definitive diagnosis. Transitioning into a healthier BMI category is most effectively achieved through a combination of progressive resistance training (to preserve lean mass) and a sustainable caloric deficit or surplus depending on your starting point. Our calculator helps you identify your "Healthy Weight Range," providing a tangible target for your fitness journey.
            </p>
          </>
        }
        example={
          <div className="space-y-6">
            <p className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-4">Case Study: Understanding the Scale</p>
            <p>
              Consider <strong>Alex</strong>, who stands at <strong>5 feet 10 inches</strong> (70 inches) and weighs <strong>190 lbs</strong>. Let's calculate Alex's BMI using the imperial formula:
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-200">
              <ul className="space-y-4 text-gray-700">
                <li className="flex justify-between">
                  <span>Step 1: Square Height (70 × 70)</span>
                  <span className="font-bold">4,900</span>
                </li>
                <li className="flex justify-between">
                  <span>Step 2: Divide Weight by Squared Height (190 / 4,900)</span>
                  <span className="font-bold underline">0.03877</span>
                </li>
                <li className="flex justify-between border-t pt-4">
                  <span className="text-rose-900 font-bold uppercase text-sm">Step 3: Multiply by 703 conversion factor</span>
                  <span className="text-rose-700 font-black">27.3 BMI</span>
                </li>
                <li className="flex justify-between border-t-2 border-rose-200 pt-4 text-2xl">
                  <span className="text-rose-950 font-black">Result:</span>
                  <span className="text-rose-800 font-black">Overweight</span>
                </li>
              </ul>
            </div>
            <p className="text-sm italic text-gray-500 mt-6">
              Observation: Alex's BMI of 27.3 indicates that he is currently above the healthy range. To reach a "Normal Weight" BMI of 24.9, Alex would need to reach a weight of roughly <strong>173 lbs</strong>.
            </p>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <h5 className="font-bold text-rose-900 mb-3 uppercase text-sm tracking-wide">Public Health Screening</h5>
              <p className="text-sm text-gray-600 leading-relaxed">Epidemiologists use BMI to track obesity trends within cities and countries, helping governments allocate resources for health initiatives and preventative care.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <h5 className="font-bold text-rose-900 mb-3 uppercase text-sm tracking-wide">Insurance Underwriting</h5>
              <p className="text-sm text-gray-600 leading-relaxed">Life insurance companies often use BMI as one of many factors to assess long-term risk and determine policy premiums for applicants.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <h5 className="font-bold text-rose-900 mb-3 uppercase text-sm tracking-wide">Fitness Goal Setting</h5>
              <p className="text-sm text-gray-600 leading-relaxed">Individuals starting a weight loss journey use BMI as a baseline metric to set realistic, long-term targets for their physical transformation.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "Adipose Tissue", definition: "A specialized connective tissue that functions as the major storage site for fat in the form of triglycerides." },
          { term: "Visceral Fat", definition: "Body fat that is stored within the abdominal cavity and is therefore stored around a number of important internal organs such as the liver, pancreas and intestines." },
          { term: "Basal Metabolic Rate (BMR)", definition: "The number of calories your body needs to accomplish its most basic (basal) life-sustaining functions." },
          { term: "Metabolic Syndrome", definition: "A cluster of conditions that occur together, increasing your risk of heart disease, stroke and type 2 diabetes." },
          { term: "Lean Body Mass", definition: "The amount of weight you carry on your body that isn't fat. It includes your bones, muscles, ligaments, and water." },
          { term: "Bone Density", definition: "A measure of the amount of minerals (mostly calcium and phosphorous) contained in a certain amount of bone." },
          { term: "Hypertrophy", definition: "The enlargement of an organ or tissue from the increase in size of its cells, common in muscle growth through resistance training." },
          { term: "Skinfold Caliper", definition: "A device which measures the thickness of a fold of your skin with its underlying layer of fat." },
          { term: "Dexa Scan", definition: "A non-invasive test that measures bone mineral density to assess if a person is at risk of osteoporosis or fracture, also used for body fat percentage." },
          { term: "Type 2 Diabetes", definition: "A chronic condition that affects the way the body processes blood sugar (glucose)." },
        ]}
        faqs={[
          {
            question: "Is BMI accurate for bodybuilders?",
            answer: "No. BMI does not differentiate between fat mass and muscle mass. A highly muscular athlete with 8% body fat could register as 'Obese' on a BMI scale simply due to their sheer density and mass. In these cases, body fat percentage tests (like DEXA or displacement) are more appropriate."
          },
          {
            question: "What is the difference between BMI and Body Fat Percentage?",
            answer: "BMI is a ratio of height to weight, whereas body fat percentage is the literal proportion of your weight that is adipose tissue versus lean mass. BMI is a screening tool; body fat percentage is a diagnostic tool."
          },
          {
            question: "Why is visceral fat more dangerous than subcutaneous fat?",
            answer: "Subcutaneous fat is just below the skin, while visceral fat wraps around your organs. Visceral fat is more metabolically active and secretes inflammatory markers into the bloodstream, significantly increasing the risk of chronic disease even if your overall BMI is normal."
          },
          {
            question: "Does BMI increase with age?",
            answer: "Not necessarily, but body composition often shifts as we age (sarcopenia), where muscle mass is replaced by fat mass. This means you could maintain the same BMI over 20 years but have a much higher body fat percentage in your 60s than in your 40s."
          },
          {
            question: "Is there a specific BMI for children and teens?",
            answer: "Yes. For children and adolescents (ages 2-19), BMI is calculated differently using 'BMI-for-age percentiles.' Because children grow at different rates, they are compared to other children of the same age and biological sex."
          },
          {
            question: "Can I be 'Skinny Fat' and have a normal BMI?",
            answer: "Yes. This is clinically known as MONW (Metabolically Obese Normal Weight). An individual can have a 'normal' BMI but high levels of body fat and low muscle mass, leading to the same metabolic risks as someone who is clinically obese."
          }
        ]}
        relatedCalculators={[
          {
            name: "Calorie Calculator",
            path: "/calorie-calculator",
            desc: "Estimate the exact number of daily calories required to reach your target BMI through a controlled caloric deficit or surplus.",
          },
          {
            name: "BMR Calculator",
            path: "/bmr-calculator",
            desc: "Discover your Basal Metabolic Rate—the calories you burn at rest—to better inform your weight management strategy.",
          },
          {
            name: "Body Fat Calculator",
            path: "/body-fat-calculator",
            desc: "Go beyond BMI by estimating your actual body fat percentage using the Navy Tape method or other anthropometric data.",
          },
          {
            name: "Ideal Weight Calculator",
            path: "/ideal-weight-calculator",
            desc: "Find the weight range where you are projected to experience the best longevity and health outcomes based on your height.",
          }
        ]}
      />
    </div>
  );
}
