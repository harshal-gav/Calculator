"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import gpaData from "@/data/seo-content/official/gpa-calculator.json";

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
  type: string;
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Physics", grade: "A", credits: "4", type: "standard" },
    { id: 2, name: "English", grade: "B", credits: "3", type: "standard" },
    { id: 3, name: "Lab", grade: "C", credits: "1", type: "standard" }
  ]);

  const [gpa, setGpa] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState(0);

  const gradeValues: Record<string, number> = {
    "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0
  };

  useEffect(() => {
    calculateGPA();
  }, [courses]);

  const calculateGPA = () => {
    let qPoints = 0;
    let credits = 0;

    courses.forEach(c => {
      const gVal = gradeValues[c.grade] || 0;
      const cred = parseFloat(c.credits) || 0;
      
      let bonus = 0;
      if (c.type === "ap" || c.type === "ib") bonus = 1.0;
      else if (c.type === "honors") bonus = 0.5;

      qPoints += (gVal + bonus) * cred;
      credits += cred;
    });

    setGpa(credits > 0 ? qPoints / credits : null);
    setTotalCredits(credits);
  };

  const addCourse = () => {
    setCourses([...courses, { 
      id: Date.now(), 
      name: `Course ${courses.length + 1}`, 
      grade: "A", 
      credits: "3", 
      type: "standard" 
    }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">Σ</div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Scholar <span className="text-indigo-600 font-black">Grade Matrix</span>
            </h1>
          </div>
          <p className="text-slate-400 font-bold mt-1 tracking-tight text-sm uppercase italic">Academic Performance Profiler</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-indigo-900 px-4 py-2 rounded-xl border border-indigo-700 mb-1 shadow-lg">
            <span className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em]">Registrar Protocol 5.2</span>
          </div>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter italic">Standardized Transcript Audit</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar / Course List */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-4">
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-inner">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Course Enrollment</span>
                <button onClick={addCourse} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-100">+ Add Row</button>
             </div>
             
             <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.id} className="grid grid-cols-12 gap-3 items-center bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm transition-all group hover:border-indigo-200">
                     <div className="col-span-12 md:col-span-4">
                        <input 
                          type="text" 
                          value={course.name} 
                          onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                          className="w-full bg-slate-50 border-0 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-indigo-100"
                        />
                     </div>
                     <div className="col-span-4 md:col-span-2">
                        <select 
                          value={course.grade} 
                          onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                          className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-sm font-black text-slate-900 appearance-none text-center"
                        >
                           {Object.keys(gradeValues).map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                     </div>
                     <div className="col-span-4 md:col-span-2">
                        <input 
                          type="number" 
                          value={course.credits} 
                          onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                          placeholder="Creds"
                          className="w-full bg-slate-50 border-0 rounded-xl px-4 py-2 text-sm font-black text-slate-900 text-center"
                        />
                     </div>
                     <div className="col-span-4 md:col-span-3">
                        <select 
                          value={course.type} 
                          onChange={(e) => updateCourse(course.id, "type", e.target.value)}
                          className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 appearance-none text-center"
                        >
                           <option value="standard">Standard</option>
                           <option value="honors">Honors (+0.5)</option>
                           <option value="ap">AP (+1.0)</option>
                           <option value="ib">IB (+1.0)</option>
                        </select>
                     </div>
                     <div className="col-span-12 md:col-span-1 flex justify-center">
                        <button onClick={() => removeCourse(course.id)} className="text-slate-300 hover:text-rose-500 transition-colors">×</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-6">
           <div className="grow bg-indigo-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center border border-indigo-800">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
              <div className="relative z-10 w-full">
                 <span className="inline-block px-4 py-1.5 bg-indigo-800 border border-indigo-700 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 italic">Cumulative Score</span>
                 <div className="text-8xl md:text-9xl font-black tracking-tighter italic leading-none mb-4 whitespace-nowrap">
                    {gpa !== null ? gpa.toFixed(2) : "0.00"}
                 </div>
                 <div className="flex items-center justify-center gap-4">
                    <div className="px-5 py-2 rounded-xl bg-white text-indigo-900 text-[10px] font-black uppercase tracking-widest shadow-lg italic">
                       {totalCredits} Total Credits
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col justify-center italic-headings">
              <div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Academic Standing</div>
              <div className="flex flex-col gap-4">
                 <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">Honors Tier</span>
                    <span className={`font-black uppercase text-xs italic ${gpa && gpa >= 3.9 ? "text-indigo-600" : "text-slate-400"}`}>
                       {gpa && gpa >= 3.9 ? "Summa Cum Laude" : (gpa && gpa >= 3.7 ? "Magna Cum Laude" : (gpa && gpa >= 3.5 ? "Cum Laude" : "Standard"))}
                    </span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">Status</span>
                    <span className={`font-black uppercase text-xs italic ${gpa && gpa < 2.0 ? "text-rose-500" : "text-emerald-500"}`}>
                       {gpa && gpa < 2.0 ? "Probation Risk" : "Good Standing"}
                    </span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <CalculatorSEO
        title={gpaData.title}
        whatIsIt={gpaData.whatIsIt}
        formula={gpaData.formula}
        example={gpaData.example}
        useCases={gpaData.useCases}
        faqs={gpaData.faqs}
        deepDive={gpaData.deepDive}
        glossary={gpaData.glossary}
        relatedCalculators={[
          {
            name: "Grade Calculator",
            path: "/grade-calculator/",
            desc: "Determine current class standings and final exam percentage requirements.",
          },
          {
            name: "Percentage",
            path: "/percentage-calculator/",
            desc: "Convert raw test scores and numerical data into standardized proportions.",
          },
          {
            name: "Scientific",
            path: "/scientific-calculator/",
            desc: "Perform advanced logarithmic and statistical academic operations.",
          },
          {
            name: "Time",
            path: "/time-calculator/",
            desc: "Analyze study schedules and duration-based academic benchmarks.",
          }
        ]}
      />
    </div>
  );
}
