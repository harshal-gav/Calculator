'use client';

import { useState } from 'react';

type Course = {
    id: number;
    name: string;
    credits: string;
    grade: string;
};

const GRADE_POINTS = [
    { label: 'A+ (4.0)', value: 4.0 },
    { label: 'A (4.0)', value: 4.0 },
    { label: 'A- (3.7)', value: 3.7 },
    { label: 'B+ (3.3)', value: 3.3 },
    { label: 'B (3.0)', value: 3.0 },
    { label: 'B- (2.7)', value: 2.7 },
    { label: 'C+ (2.3)', value: 2.3 },
    { label: 'C (2.0)', value: 2.0 },
    { label: 'C- (1.7)', value: 1.7 },
    { label: 'D+ (1.3)', value: 1.3 },
    { label: 'D (1.0)', value: 1.0 },
    { label: 'F (0.0)', value: 0.0 },
];

export default function GPACalculator() {
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, name: 'Calculus 1', credits: '3', grade: '4.0' },
        { id: 2, name: 'Physics 101', credits: '4', grade: '3.0' },
        { id: 3, name: 'English 101', credits: '3', grade: '3.7' },
        { id: 4, name: 'History', credits: '3', grade: '' },
    ]);

    const addCourse = () => {
        setCourses([
            ...courses,
            { id: Date.now(), name: `Course ${courses.length + 1}`, credits: '3', grade: '' }
        ]);
    };

    const removeCourse = (id: number) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id: number, field: keyof Course, value: string) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    let totalPoints = 0;
    let totalCredits = 0;

    // Calculate GPA based only on provided grades
    const gradedCourses = courses.filter(c => c.grade !== '' && c.credits !== '' && !isNaN(parseFloat(c.credits)));

    gradedCourses.forEach(c => {
        const gradeValue = parseFloat(c.grade);
        const credits = parseFloat(c.credits);

        totalPoints += gradeValue * credits;
        totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-amber-50 rounded-xl shadow-lg border border-amber-200">
            <h1 className="text-4xl font-extrabold mb-4 text-amber-900 border-b pb-4 flex items-center">
                <span className="mr-3">🎓</span> College / High School GPA Calculator
            </h1>
            <p className="mb-8 text-amber-800 text-lg">
                Enter your course list, credits, and expected grades to instantly calculate your cumulative Grade Point Average (GPA).
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Inputs List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm">
                        <div className="grid grid-cols-12 gap-4 mb-4 font-bold text-xs uppercase tracking-widest text-amber-700 border-b border-amber-100 pb-2 hidden md:grid">
                            <div className="col-span-1 border-amber-100"></div>
                            <div className="col-span-5 border-amber-100">Course Name</div>
                            <div className="col-span-2 text-center border-amber-100">Credits</div>
                            <div className="col-span-3 text-center border-amber-100">Letter Grade</div>
                        </div>

                        {courses.map((course, index) => (
                            <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 mb-4 items-center bg-amber-50 p-3 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors">
                                <div className="col-span-1 flex justify-center text-amber-400 font-bold hidden md:flex">
                                    {index + 1}.
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <input
                                        type="text"
                                        value={course.name}
                                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                        className="w-full rounded outline-none bg-transparent p-2 font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all border border-transparent focus:border-amber-300"
                                        placeholder="Course Name"
                                    />
                                </div>
                                <div className="col-span-5 md:col-span-2">
                                    <input
                                        type="number" step="0.5" min="0"
                                        value={course.credits}
                                        onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                                        className="w-full rounded border-amber-300 p-2 text-center font-bold text-amber-900 shadow-inner bg-white"
                                        placeholder="3"
                                    />
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <select
                                        value={course.grade}
                                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                                        className={`w-full rounded border p-2 font-bold shadow-inner cursor-pointer appearance-none transition-colors text-center ${course.grade !== '' ? 'bg-amber-600 text-white border-amber-700' : 'bg-white border-amber-300 text-amber-800'}`}
                                    >
                                        <option value="" disabled>Select Grade</option>
                                        {GRADE_POINTS.map((gp, i) => (
                                            <option key={i} value={gp.value.toString()}>{gp.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    <button
                                        onClick={() => removeCourse(course.id)}
                                        className="text-amber-300 hover:text-red-500 transition-colors p-2"
                                        title="Remove Course"
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
                                onClick={addCourse}
                                className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold py-2 px-6 rounded-lg transition shadow-sm border border-amber-200 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Course
                            </button>
                            <button
                                onClick={() => setCourses([])}
                                className="text-amber-500 hover:text-red-600 font-bold py-2 px-4 transition text-sm"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status Column */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl p-8 text-white shadow-xl relative overflow-hidden border border-amber-800 h-full flex flex-col justify-center text-center">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </div>

                        <div className="relative z-10 text-center">
                            <h2 className="text-amber-200 font-bold uppercase tracking-widest text-xs mb-6">Cumulative GPA</h2>

                            <div className="flex flex-col justify-center items-center py-6 mb-8">
                                <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-amber-300 drop-shadow-sm mb-2">
                                    {totalCredits > 0 ? gpa.toFixed(2) : '0.00'}
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto border-t border-amber-600/50 pt-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-amber-300 font-bold uppercase tracking-widest text-[10px] mb-1">Total Points</div>
                                    <div className="text-xl font-bold">{totalPoints.toFixed(1)}</div>
                                </div>
                                <div>
                                    <div className="text-amber-300 font-bold uppercase tracking-widest text-[10px] mb-1">Total Credits</div>
                                    <div className="text-xl font-bold">{totalCredits.toFixed(1)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "GPA Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
