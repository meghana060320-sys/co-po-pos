import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Bell, 
  User as UserIcon,
  Database,
  Terminal,
  Variable,
  ChevronRight,
  CheckCircle2,
  XCircle,
  TrendingUp,
  LogOut,
  FileText,
  HelpCircle
} from 'lucide-react';

interface StudentDashboardProps {
  onLogout: () => void;
}

type StudentView = 'overview' | 'courses' | 'attainment' | 'marks' | 'notifications';

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [activeView, setActiveView] = useState<StudentView>('overview');

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'attainment', label: 'CO Attainment', icon: BarChart3 },
    { id: 'marks', label: 'My Marks', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-teal-100 bg-white hidden md:flex flex-col p-4 gap-6 shadow-sm">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-10 w-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
            <UserIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-slate-900 text-base font-bold leading-none">Student</h1>
            <p className="text-teal-600 text-[10px] font-bold uppercase tracking-wider mt-1">Portal v2.0</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as StudentView)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeView === item.id 
                  ? 'bg-teal-50 text-teal-700 font-bold shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <item.icon className={`h-5 w-5 ${activeView === item.id ? 'text-teal-600' : ''}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
            <div className="flex items-center gap-2 text-teal-700 mb-2">
              <HelpCircle className="h-4 w-4" />
              <span className="text-xs font-bold">Need Help?</span>
            </div>
            <p className="text-[10px] text-teal-600 leading-relaxed">Contact your faculty or check the OBE manual for attainment queries.</p>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-100 bg-white px-8 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm font-medium">Academic Year 2024-25</span>
            <span className="text-slate-300">/</span>
            <span className="text-teal-600 text-sm font-bold capitalize">{activeView}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Meghana G</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Roll: 21CSE042</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-teal-100 border-2 border-white shadow-sm flex items-center justify-center text-teal-700 font-bold">
              MG
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeView === 'overview' && (
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-1"
              >
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, Meghana</h2>
                <p className="text-slate-500 font-medium">Here's your academic performance summary for this semester.</p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* My Courses */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-teal-600" />
                        Active Courses
                      </h3>
                      <button 
                        onClick={() => setActiveView('courses')}
                        className="text-xs font-bold text-teal-600 hover:underline uppercase tracking-wider"
                      >
                        View All
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { code: 'CS301', title: 'Data Structures', faculty: 'Dr. Aris Teal', icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' },
                        { code: 'CS302', title: 'Object Oriented Prog.', faculty: 'Prof. Sarah Chen', icon: Terminal, color: 'text-teal-500', bg: 'bg-teal-50' },
                        { code: 'MA201', title: 'Discrete Mathematics', faculty: 'Dr. James Wilson', icon: Variable, color: 'text-orange-500', bg: 'bg-orange-50' }
                      ].map((course, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all cursor-pointer group">
                          <div className={`flex items-center justify-center rounded-lg ${course.bg} ${course.color} shrink-0 h-12 w-12`}>
                            <course.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-900 text-sm font-bold truncate">{course.title}</p>
                            <p className="text-slate-500 text-[10px] font-medium">{course.code} • {course.faculty}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-teal-600 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Marks Summary */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-teal-600" />
                        Recent Marks
                      </h3>
                      <button 
                        onClick={() => setActiveView('marks')}
                        className="text-xs font-bold text-teal-600 hover:underline"
                      >
                        Full Report
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/50">
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Course</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">T1</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">T2</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">T3</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-teal-600 uppercase tracking-widest text-center">Final %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {[
                            { code: 'CS301', t1: '18/20', t2: '15/20', t3: '19/20', final: '86%' },
                            { code: 'CS302', t1: '14/20', t2: '12/20', t3: '16/20', final: '72%' },
                            { code: 'MA201', t1: '20/20', t2: '19/20', t3: '20/20', final: '98%' }
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.code}</td>
                              <td className="px-6 py-4 text-sm text-center text-slate-600">{row.t1}</td>
                              <td className="px-6 py-4 text-sm text-center text-slate-600">{row.t2}</td>
                              <td className="px-6 py-4 text-sm text-center text-slate-600">{row.t3}</td>
                              <td className="px-6 py-4 text-sm text-center font-black text-teal-600">{row.final}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* CO Attainment */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                      <CheckCircle2 className="h-5 w-5 text-teal-600" />
                      CO Attainment
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { label: 'CO1', status: 'attained' },
                        { label: 'CO2', status: 'attained' },
                        { label: 'CO3', status: 'below' },
                        { label: 'CO4', status: 'attained' },
                        { label: 'CO5', status: 'below' }
                      ].map((co, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all hover:scale-110 ${co.status === 'attained' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                            {co.status === 'attained' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                          </div>
                          <span className="text-[9px] font-black text-slate-400 uppercase">{co.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-600">Overall Progress</span>
                        <span className="text-xs font-black text-teal-600">74%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 w-[74%]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Areas to Improve */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                      <TrendingUp className="h-5 w-5 text-rose-500" />
                      Improvement Areas
                    </h3>
                    <div className="space-y-4">
                      {[
                        { co: 'CO3', topic: 'Graph Theory', suggestion: 'Practice adjacency list implementation.' },
                        { co: 'CO5', topic: 'Design Patterns', suggestion: 'Review structural pattern use cases.' }
                      ].map((item, i) => (
                        <div key={i} className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-black text-rose-600 uppercase">{item.co}</span>
                            <span className="text-[10px] font-bold text-rose-400">Action Required</span>
                          </div>
                          <p className="text-sm font-bold text-slate-800">{item.topic}</p>
                          <p className="text-xs text-slate-500 mt-1 italic leading-tight">{item.suggestion}</p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 py-3 rounded-xl bg-teal-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition-all shadow-lg shadow-teal-100">
                      <BarChart3 className="h-4 w-4" />
                      View Detailed Analysis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'courses' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">My Enrolled Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="h-12 w-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Course Name {n}</h3>
                    <p className="text-slate-500 text-sm mb-4">CS{300 + n} • Semester {n + 1}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <span className="text-xs font-bold text-slate-400 uppercase">Faculty</span>
                      <span className="text-xs font-bold text-teal-600">Dr. Professor</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'attainment' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Detailed CO Attainment Report</h2>
              <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-16 w-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Course Outcome Strength</h3>
                    <p className="text-slate-500">Visualizing your performance across all defined outcomes.</p>
                  </div>
                </div>
                <div className="h-80 flex items-end justify-around gap-4 border-b border-slate-100 pb-4">
                  {[85, 72, 45, 90, 58].map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 flex-1 max-w-[60px]">
                      <div className="w-full bg-slate-100 rounded-t-xl relative group overflow-hidden" style={{ height: `${val}%` }}>
                        <div className={`absolute inset-0 ${val > 60 ? 'bg-teal-500' : 'bg-rose-500'} group-hover:opacity-80 transition-all`}></div>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">{val}%</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400">CO{i+1}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800">Strengths</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" /> High proficiency in CO4 (Application)
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Consistent performance in CO1 (Knowledge)
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800">Weaknesses</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <XCircle className="h-4 w-4 text-rose-500" /> Critical gap in CO3 (Analysis)
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <XCircle className="h-4 w-4 text-rose-500" /> Marginal performance in CO5 (Evaluation)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'marks' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">My Marks Detail</h2>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                    <tr>
                      <th className="px-6 py-4">Assessment</th>
                      <th className="px-6 py-4">Max Marks</th>
                      <th className="px-6 py-4 text-center">Scored</th>
                      <th className="px-6 py-4 text-center">Percentage</th>
                      <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: 'Unit Test 1 (T1)', max: 20, scored: 18, status: 'Released' },
                      { name: 'Unit Test 2 (T2)', max: 20, scored: 15, status: 'Released' },
                      { name: 'Unit Test 3 (T3)', max: 20, scored: 19, status: 'Released' },
                      { name: 'Semester End Exam (SEE)', max: 50, scored: 42, status: 'Released' },
                      { name: 'Internal Assessment', max: 25, scored: 23, status: 'Released' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{row.max}</td>
                        <td className="px-6 py-4 text-sm text-center font-bold text-slate-900">{row.scored}</td>
                        <td className="px-6 py-4 text-sm text-center font-black text-teal-600">{Math.round((row.scored/row.max)*100)}%</td>
                        <td className="px-6 py-4 text-right">
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded">RELEASED</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'notifications' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
              <div className="space-y-4">
                {[
                  { title: 'Marks Released', msg: 'T3 marks for Data Structures have been released.', time: '2h ago', type: 'success' },
                  { title: 'CO Alert', msg: 'Your attainment for CO3 is below the 60% threshold.', time: '1d ago', type: 'warning' },
                  { title: 'Exam Schedule', msg: 'SEE schedule for Semester 4 has been updated.', time: '3d ago', type: 'info' }
                ].map((n, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                      n.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                      n.type === 'warning' ? 'bg-rose-50 text-rose-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      <Bell className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-900">{n.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{n.time}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{n.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
