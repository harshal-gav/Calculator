'use client';

import { useState } from 'react';

type Assignment = {
    id: number;
    name: string;
    grade: string;
    weight: string;
};

export default function GradeCalculator() {
    const [assignments, setAssignments] = useState<Assignment[]>([
        { id: 1, name: 'Homework 1', grade: '95', weight: '20' },
        { id: 2, name: 'Midterm', grade: '88', weight: '30' },
        { id: 3, name: 'Final Project', grade: '', weight: '50' },
    ]);

    const addAssignment = () => {
        setAssignments([
            ...assignments,
            { id: Date.now(), name: `Assignment ${assignments.length + 1}`, grade: '', weight: '' }
        ]);
    };

    const removeAssignment = (id: number) => {
        setAssignments(assignments.filter(a => a.id !== id));
    };

    const updateAssignment = (id: number, field: keyof Assignment, value: string) => {
        setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
    };

    let totalWeight = 0;
    let earnedPoints = 0;

    // Calculate current grade based only on graded assignments
    const gradedAssignments = assignments.filter(a => a.grade !== '' && !isNaN(parseFloat(a.grade)) && a.weight !== '' && !isNaN(parseFloat(a.weight)));
    const totalProvidedWeight = gradedAssignments.reduce((sum, a) => sum + parseFloat(a.weight), 0);

    gradedAssignments.forEach(a => {
        const grade = parseFloat(a.grade);
        const weight = parseFloat(a.weight);
        if (totalProvidedWeight > 0) {
            earnedPoints += grade * (weight / totalProvidedWeight);
        }
    });

    const currentGrade = totalProvidedWeight > 0 ? earnedPoints : 0;
    const letterGrade = getLetterGrade(currentGrade);

    function getLetterGrade(score: number) {
        if (score >= 97) return 'A+';
        if (score >= 93) return 'A';
        if (score >= 90) return 'A-';
        if (score >= 87) return 'B+';
        if (score >= 83) return 'B';
        if (score >= 80) return 'B-';
        if (score >= 77) return 'C+';
        if (score >= 73) return 'C';
        if (score >= 70) return 'C-';
        if (score >= 67) return 'D+';
        if (score >= 63) return 'D';
        if (score >= 60) return 'D-';
        if (score > 0) return 'F';
        return '-';
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-slate-50 rounded-xl shadow-lg border border-slate-200">
            <h1 className="text-4xl font-extrabold mb-4 text-indigo-800 border-b pb-4 flex items-center">
                <span className="mr-3">📝</span> Grade Calculator
            </h1>
            <p className="mb-8 text-slate-600 text-lg">
                Calculate your current class grade based on weighted assignments, and see what you need to score on your finals.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Inputs List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="grid grid-cols-12 gap-4 mb-4 font-bold text-xs uppercase tracking-widest text-slate-500 border-b border-slate-100 pb-2 hidden md:grid">
                            <div className="col-span-1 border-slate-100"></div>
                            <div className="col-span-5 border-slate-100">Assignment Name</div>
                            <div className="col-span-3 text-center border-slate-100">Grade (%)</div>
                            <div className="col-span-3 text-center border-slate-100">Weight (%)</div>
                        </div>

                        {assignments.map((assignment, index) => (
                            <div key={assignment.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 mb-4 items-center bg-slate-50 p-3 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors">
                                <div className="col-span-1 flex justify-center text-slate-400 font-bold hidden md:flex">
                                    {index + 1}.
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <input
                                        type="text"
                                        value={assignment.name}
                                        onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                                        className="w-full rounded outline-none bg-transparent p-2 font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all border border-transparent focus:border-indigo-300"
                                        placeholder="Assignment Name"
                                    />
                                </div>
                                <div className="col-span-6 md:col-span-3 relative flex items-center">
                                    <input
                                        type="number" step="0.5"
                                        value={assignment.grade}
                                        onChange={(e) => updateAssignment(assignment.id, 'grade', e.target.value)}
                                        className="w-full rounded border-slate-300 p-2 text-center font-bold text-indigo-700 shadow-inner bg-white"
                                        placeholder="100"
                                    />
                                    <span className="absolute right-3 text-slate-400 font-bold text-xs">%</span>
                                </div>
                                <div className="col-span-5 md:col-span-2 relative flex items-center">
                                    <input
                                        type="number" step="0.5"
                                        value={assignment.weight}
                                        onChange={(e) => updateAssignment(assignment.id, 'weight', e.target.value)}
                                        className="w-full rounded border-slate-300 p-2 text-center font-bold text-slate-700 shadow-inner bg-white"
                                        placeholder="20"
                                    />
                                    <span className="absolute right-3 text-slate-400 font-bold text-xs">%</span>
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    <button
                                        onClick={() => removeAssignment(assignment.id)}
                                        className="text-slate-300 hover:text-red-500 transition-colors p-2"
                                        title="Remove Assignment"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={addAssignment}
                                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-2 px-6 rounded-lg transition shadow-sm border border-indigo-200 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Coursework
                            </button>
                            <button
                                onClick={() => setAssignments([])}
                                className="text-slate-400 hover:text-red-600 font-bold py-2 px-4 transition text-sm"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status Column */}
                <div className="lg:col-span-1">
                    <div className="bg-indigo-900 rounded-xl p-8 text-white shadow-xl relative overflow-hidden border border-indigo-800">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <div className="relative z-10 text-center">
                            <h2 className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-2">Current Grade</h2>
                            <div className="flex flex-col justify-center items-center mb-6 py-8">
                                <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-indigo-300 drop-shadow-sm mb-2">
                                    {currentGrade > 0 ? currentGrade.toFixed(2) : '--'}
                                </div>
                                <div className="text-xl font-bold text-indigo-200">%</div>
                            </div>

                            <div className="bg-indigo-950 p-4 rounded-xl border border-indigo-800 shadow-inner inline-block min-w-[120px]">
                                <span className="block text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-1">Letter Grade</span>
                                <span className="text-4xl font-black text-white">{letterGrade}</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-indigo-800 text-sm">
                            <ul className="space-y-2 text-indigo-200">
                                <li className="flex justify-between">
                                    <span>Graded portions:</span>
                                    <span className="font-bold text-white">{gradedAssignments.length} / {assignments.length}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Provided Weight:</span>
                                    <span className="font-bold text-white">{totalProvidedWeight}%</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Grade Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
