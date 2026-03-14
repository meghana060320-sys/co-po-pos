import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap,
  Bell, 
  Settings,
  Download,
  Zap,
  CheckCircle2,
  Clock,
  MoreVertical,
  BarChart3,
  TrendingUp,
  AlertCircle,
  LogOut,
  Search,
  ChevronRight,
  FileText,
  Upload,
  PieChart
} from 'lucide-react';
import COGeneration from './COGeneration';

interface FacultyDashboardProps {
  onLogout: () => void;
}

type FacultyView = 'overview' | 'co-gen' | 'exam-config' | 'marks-upload' | 'analytics';

export default function FacultyDashboard({ onLogout }: FacultyDashboardProps) {
  const [activeView, setActiveView] = useState<FacultyView>('overview');

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'co-gen', label: 'AI CO Generation', icon: Zap },
    { id: 'exam-config', label: 'Exam Config', icon: GraduationCap },
    { id: 'marks-upload', label: 'Marks Upload', icon: Upload },
    { id: 'analytics', label: 'Course Analytics', icon: PieChart },
  ];

  if (activeView === 'co-gen') {
    return <COGeneration onBack={() => setActiveView('overview')} />;
  }

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-blue-100 bg-white hidden lg:flex flex-col p-4 gap-6 shadow-sm">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <span className="font-black text-xl">F</span>
          </div>
          <div>
            <h2 className="text-slate-900 text-base font-bold leading-none">Faculty Portal</h2>
            <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider mt-1">Academic Unit</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as FacultyView)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeView === item.id 
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <item.icon className={`h-5 w-5 ${activeView === item.id ? 'text-blue-600' : ''}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-blue-700 uppercase">AI Credits</p>
              <Zap className="h-3 w-3 text-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-blue-600">
                <span>Usage</span>
                <span>85/100</span>
              </div>
              <div className="h-1 w-full bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[85%]"></div>
              </div>
            </div>
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
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input className="bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500" placeholder="Search courses, COs..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">Dr. Aris Purwanto</p>
                <p className="text-xs text-slate-500 mt-1">Senior Faculty</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-700 font-bold overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQDmj4Fc7zQ5P5tDewfbot9DwGL5Jsn_uTCQ4Ci_WeL80tg37RaHB3niy8K3eLmnRCjQDHyv1Tf8GsswJdajFG5hAHqsd_E3fMKNRJ0UnmNIp3qmWT5PHSibhF3oLki6rYbddaCBnz_3H_bpUoYXnJGJxkphDgPiYB4eQhvT470T7SlxJ0zgSHVOzCVXUwjdI1wj6yoy8VVPEvB0it3gJsQkQPafyuQbF8Rcr1139phNAlcXbfe2Bh22LIpvXKphpHqpKDvXJW1Lln" 
                  alt="Faculty"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeView === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Faculty Dashboard</h1>
                  <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Academic Year 2023-24 | Semester: Odd
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                    <Download className="h-4 w-4" /> Export Reports
                  </button>
                  <button 
                    onClick={() => setActiveView('co-gen')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    <Zap className="h-4 w-4" /> AI CO Generation
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total COs Map', value: '120', change: '100% Active', positive: true, icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Generated', value: '98', change: '81.6% Completion', positive: true, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Pending Review', value: '22', change: 'Requires Action', positive: false, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' }
                ].map((card, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`h-12 w-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center`}>
                        <card.icon className="h-6 w-6" />
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${card.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {card.change}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{card.label}</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">{card.value}</h3>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* My Courses */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">My Courses</h3>
                    <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-[10px] text-slate-400 uppercase font-bold bg-slate-50">
                        <tr>
                          <th className="px-6 py-4">Course</th>
                          <th className="px-6 py-4">Students</th>
                          <th className="px-6 py-4">Attainment</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { name: 'CS401: Data Structures', details: 'Sem 3 | Sec A', attainment: 78, status: 'attained' },
                          { name: 'CS405: Artificial Intelligence', details: 'Sem 7 | Sec B', attainment: 45, status: 'warning' }
                        ].map((course, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900">{course.name}</span>
                                <span className="text-xs text-slate-500">{course.details}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex -space-x-2">
                                {[1, 2, 3].map(j => (
                                  <img 
                                    key={j}
                                    className="h-6 w-6 rounded-full border-2 border-white" 
                                    src={`https://picsum.photos/seed/student${i}${j}/32/32`} 
                                    alt="Student"
                                    referrerPolicy="no-referrer"
                                  />
                                ))}
                                <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+58</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                                <div className={`h-full ${course.status === 'attained' ? 'bg-emerald-500' : 'bg-amber-500'} w-[${course.attainment}%]`}></div>
                              </div>
                              <span className={`text-[10px] font-bold ${course.status === 'attained' ? 'text-emerald-500' : 'text-amber-500'}`}>{course.attainment}% Attained</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${course.status === 'attained' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                {course.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                                <MoreVertical className="h-4 w-4 text-slate-400" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pending Actions */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" /> Pending Actions
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                        <p className="text-sm font-bold text-amber-900">Map CO-PO for CS405</p>
                        <p className="text-xs text-amber-700 mt-1">3 COs added via AI require manual validation.</p>
                        <button className="mt-3 w-full py-2 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-600 transition-colors">Validate Now</button>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <p className="text-sm font-bold text-blue-900">Upload T2 Marks for CS401</p>
                        <p className="text-xs text-blue-700 mt-1">Deadline: 24th Oct 2023</p>
                        <button className="mt-3 w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">Go to Marks Entry</button>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform scale-150 group-hover:scale-175 transition-transform duration-500">
                      <Zap className="h-24 w-24" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2 py-1 rounded bg-white/20 text-[10px] font-bold backdrop-blur-md">AI POWERED</span>
                        <Zap className="h-4 w-4" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">OBE AI Insights</h4>
                      <p className="text-sm text-blue-100 mb-6 leading-relaxed">"Course CS401 shows 15% lower attainment in CO3 compared to last year. Would you like me to analyze the question paper alignment?"</p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-white text-blue-600 text-xs font-black rounded-lg hover:bg-blue-50 transition-colors">Analyze</button>
                        <button className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs font-bold hover:bg-white/20">Dismiss</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'exam-config' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Exam Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4">Active Assessments</h3>
                  <div className="space-y-4">
                    {['T1 - Unit Test', 'T2 - Mid Term', 'SEE - Semester End'].map((exam) => (
                      <div key={exam} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{exam}</span>
                        </div>
                        <button className="text-blue-600 text-xs font-bold hover:underline">Configure</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4">CO Weightage</h3>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-400 w-8">CO{n}</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600" style={{ width: `${20 * (n % 3 + 1)}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-700">{20 * (n % 3 + 1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'marks-upload' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Marks Upload</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Bulk Upload (Excel)
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-50 flex gap-4">
                  <select className="bg-slate-50 border-none rounded-lg px-4 py-2 text-xs font-bold">
                    <option>Select Course</option>
                    <option>CS401: Data Structures</option>
                    <option>CS405: AI</option>
                  </select>
                  <select className="bg-slate-50 border-none rounded-lg px-4 py-2 text-xs font-bold">
                    <option>Select Assessment</option>
                    <option>T1 - Unit Test</option>
                    <option>T2 - Mid Term</option>
                  </select>
                </div>
                <div className="p-12 text-center">
                  <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-10 w-10" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No Assessment Selected</h3>
                  <p className="text-slate-500 text-sm mt-1">Please select a course and assessment to begin marks entry.</p>
                </div>
              </div>
            </div>
          )}

          {activeView === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Course Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-6">CO Attainment Trend</h3>
                  <div className="h-64 flex items-end justify-between gap-4">
                    {[45, 78, 62, 89, 55, 92].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full bg-blue-100 rounded-t-lg relative transition-all group-hover:bg-blue-600" style={{ height: `${h}%` }}>
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100">{h}%</div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold">CO{i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-6">PO Contribution</h3>
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500 uppercase">PO{n}</span>
                          <span className="text-slate-900">{70 + n * 5}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600" style={{ width: `${70 + n * 5}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
