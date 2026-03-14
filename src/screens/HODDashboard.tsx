import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Activity, 
  Users, 
  BarChart3, 
  AlertTriangle,
  Calendar,
  Download,
  ChevronRight,
  LogOut,
  Search,
  Bell,
  Settings,
  ShieldCheck,
  TrendingUp,
  FileText,
  Lock,
  CheckCircle2
} from 'lucide-react';

interface HODDashboardProps {
  onLogout: () => void;
}

type HODView = 'overview' | 'health' | 'faculty' | 'attainment' | 'history' | 'reports' | 'lock';

export default function HODDashboard({ onLogout }: HODDashboardProps) {
  const [activeView, setActiveView] = useState<HODView>('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'health', label: 'Dept. Health', icon: Activity },
    { id: 'faculty', label: 'Faculty Progress', icon: Users },
    { id: 'attainment', label: 'Attainment Matrix', icon: BarChart3 },
    { id: 'history', label: 'AY History', icon: Calendar },
    { id: 'reports', label: 'Reports & NBA', icon: FileText },
    { id: 'lock', label: 'Year-End Lock', icon: Lock },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-orange-100 bg-white hidden lg:flex flex-col p-4 gap-6 shadow-sm">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-10 w-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
            <span className="font-black text-xl">H</span>
          </div>
          <div>
            <h2 className="text-slate-900 text-base font-bold leading-none">HOD Portal</h2>
            <p className="text-orange-500 text-[10px] font-bold uppercase tracking-wider mt-1">CSE Department</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as HODView)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeView === item.id 
                  ? 'bg-orange-50 text-orange-700 font-bold shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <item.icon className={`h-5 w-5 ${activeView === item.id ? 'text-orange-500' : ''}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-[10px] font-bold text-orange-700 uppercase mb-2">AI Insights</p>
            <p className="text-[10px] text-orange-600 leading-relaxed mb-3">6 Course Outcomes are currently below target. Remedial actions pending for 2.</p>
            <button className="w-full py-2 bg-orange-500 text-white text-[10px] font-bold rounded-lg hover:bg-orange-600 transition-colors">Generate Analysis</button>
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
              <input className="bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-orange-500" placeholder="Search department data..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-orange-500 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center text-orange-700 font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeView === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Department Overview</h1>
                  <p className="text-slate-500 mt-1 font-medium">Academic Year 2024-25 | Computer Science & Engineering</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                    <Calendar className="h-4 w-4" /> Odd Semester
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
                    <Download className="h-4 w-4" /> Export Summary
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Courses', value: '24', change: 'All Active', positive: true, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Avg. CO Attainment', value: '78.5%', change: '+2.4%', positive: true, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Faculty Progress', value: '92%', change: 'Pending: 2', positive: false, icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
                  { label: 'NBA Gaps', value: '04', change: 'Action Needed', positive: false, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' }
                ].map((card, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`h-12 w-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center`}>
                        <card.icon className="h-6 w-6" />
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${card.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {card.change}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{card.label}</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">{card.value}</h3>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Heat Map Preview */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">CO Health Heat Map</h3>
                    <div className="flex gap-4 text-[10px] font-bold uppercase">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 bg-rose-500 rounded-sm"></span> L1</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-500 rounded-sm"></span> L2</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded-sm"></span> L3</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Data Structures', values: [88, 76, 62, 82, 45, 71] },
                      { name: 'Operating Systems', values: [91, 88, 84, 79, 74, 68] },
                      { name: 'Database Mgmt', values: [58, 82, 94, 89, 70, 78] },
                      { name: 'Compiler Design', values: [48, 41, 55, 52, 64, 72] }
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-7 gap-2 items-center">
                        <div className="text-xs font-bold text-slate-600 truncate">{row.name}</div>
                        {row.values.map((val, j) => {
                          let color = 'bg-emerald-500';
                          if (val < 50) color = 'bg-rose-500';
                          else if (val < 70) color = 'bg-orange-500';
                          return (
                            <div key={j} className={`h-8 ${color} rounded-lg flex items-center justify-center text-[10px] font-black text-white`}>
                              {val}%
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveView('health')}
                    className="w-full mt-6 py-2 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    View Full Department Health Matrix
                  </button>
                </div>

                {/* Quick Alerts */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-rose-500" />
                    Critical Alerts
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-rose-50 border-l-4 border-rose-500">
                      <p className="text-xs font-black text-rose-600 mb-1 uppercase">Curricular Gap: PO3</p>
                      <p className="text-sm text-slate-700 leading-snug font-medium">Low attainment in Design outcomes for 'Cloud Computing'.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-orange-50 border-l-4 border-orange-500">
                      <p className="text-xs font-black text-orange-600 mb-1 uppercase">Pending Approval</p>
                      <p className="text-sm text-slate-700 leading-snug font-medium">3 Course Leads have marks pending HOD final sign-off.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 border-l-4 border-blue-500">
                      <p className="text-xs font-black text-blue-600 mb-1 uppercase">NBA Prep</p>
                      <p className="text-sm text-slate-700 leading-snug font-medium">SAR report for Criterion 3 is 85% complete.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'health' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Department Health Matrix</h2>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Course Code</th>
                      <th className="px-6 py-4">Course Name</th>
                      <th className="px-6 py-4">CO1</th>
                      <th className="px-6 py-4">CO2</th>
                      <th className="px-6 py-4">CO3</th>
                      <th className="px-6 py-4">CO4</th>
                      <th className="px-6 py-4">CO5</th>
                      <th className="px-6 py-4">Overall</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <tr key={n} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-500">CS{300 + n}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">Subject Name {n}</td>
                        {[75, 82, 45, 90, 68].map((val, i) => (
                          <td key={i} className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-black ${val > 70 ? 'bg-emerald-50 text-emerald-600' : val > 50 ? 'bg-orange-50 text-orange-600' : 'bg-rose-50 text-rose-600'}`}>
                              {val}%
                            </span>
                          </td>
                        ))}
                        <td className="px-6 py-4">
                          <span className="text-sm font-black text-slate-900">72%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'faculty' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Faculty Progress Tracking</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">F{n}</div>
                      <div>
                        <h3 className="font-bold text-slate-900">Dr. Faculty {n}</h3>
                        <p className="text-xs text-slate-500">Associate Professor</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                          <span className="text-slate-400">CO Generation</span>
                          <span className="text-emerald-600">100%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                          <span className="text-slate-400">Marks Upload</span>
                          <span className="text-orange-600">65%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 w-[65%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'attainment' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Program Outcome (PO) Attainment</h2>
              <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { po: 'PO1', name: 'Engineering Knowledge', val: 84, target: 70 },
                    { po: 'PO2', name: 'Problem Analysis', val: 76, target: 70 },
                    { po: 'PO3', name: 'Design/Development', val: 62, target: 75 },
                    { po: 'PO4', name: 'Conduct Investigations', val: 91, target: 70 },
                    { po: 'PO5', name: 'Modern Tool Usage', val: 88, target: 80 },
                    { po: 'PO6', name: 'Engineer & Society', val: 74, target: 70 }
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-xs font-black text-orange-500 uppercase">{item.po}</span>
                          <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-slate-900">{item.val}%</span>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Target: {item.target}%</p>
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
                        <div className={`h-full ${item.val >= item.target ? 'bg-emerald-500' : 'bg-rose-500'} transition-all`} style={{ width: `${item.val}%` }}></div>
                        <div className="absolute top-0 bottom-0 border-l-2 border-slate-900/20 z-10" style={{ left: `${item.target}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'history' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">3-Year Trend Analysis</h2>
              <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                <div className="h-80 flex items-end justify-around gap-8 border-b border-slate-100 pb-4">
                  {[
                    { year: '2022-23', val: 68, label: '68%' },
                    { year: '2023-24', val: 74, label: '74%' },
                    { year: '2024-25', val: 78.5, label: '78.5%', active: true }
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 flex-1 max-w-[120px]">
                      <div className="w-full bg-slate-50 rounded-t-2xl relative group overflow-hidden" style={{ height: `${bar.val}%` }}>
                        <div className={`absolute inset-0 ${bar.active ? 'bg-orange-500' : 'bg-orange-200'} transition-all`}></div>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-black text-orange-600">{bar.label}</span>
                      </div>
                      <span className={`text-xs font-bold ${bar.active ? 'text-orange-600' : 'text-slate-400'}`}>{bar.year}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-orange-50 rounded-2xl border border-orange-100">
                  <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Trend Insight
                  </h4>
                  <p className="text-sm text-orange-700 leading-relaxed">
                    Department-wide attainment has shown a consistent upward trend of ~5% annually. 
                    The introduction of AI-assisted CO generation in 2024-25 has improved mapping accuracy by 22%.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeView === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Reports & Accreditation Exports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'NBA Tier 2 Report', desc: 'Full CO-PO attainment matrix in NBA format.', icon: ShieldCheck },
                  { title: 'NAAC SSR Data', desc: 'Program-wise attainment for Criterion 2.6.2.', icon: FileText },
                  { title: 'Dept. Summary', desc: 'Consolidated report of all courses and faculty.', icon: BarChart3 },
                  { title: 'Curricular Gaps', desc: 'Analysis of persistent low-attainment areas.', icon: AlertTriangle }
                ].map((report, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-orange-200 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                        <report.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{report.title}</h3>
                        <p className="text-xs text-slate-500">{report.desc}</p>
                      </div>
                    </div>
                    <button className="h-10 w-10 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'lock' && (
            <div className="max-w-2xl mx-auto space-y-8 py-12">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Year-End Lock & Sign-Off</h2>
                <p className="text-slate-500">Finalize all department data for Academic Year 2024-25. This action is irreversible.</p>
              </div>
              
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Pre-Lock Checklist</h4>
                  {[
                    { label: 'All course marks approved', status: true },
                    { label: 'All Level 1 remedial actions filed', status: true },
                    { label: 'PO/PSO attainment computed', status: true },
                    { label: 'NBA/NAAC reports generated', status: false }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      {item.status ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">PENDING</span>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-slate-50">
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    Digitally Sign & Lock AY 2024-25
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-4">
                    By signing, you confirm that all data is accurate and follows university OBE policy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
