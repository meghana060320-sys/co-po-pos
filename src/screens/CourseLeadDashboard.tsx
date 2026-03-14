import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  Target, 
  AlertCircle,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronRight,
  FileText,
  TrendingUp,
  Clock,
  Download,
  Users,
  ShieldCheck
} from 'lucide-react';

interface CourseLeadDashboardProps {
  onLogout: () => void;
}

type LeadView = 'overview' | 'approvals' | 'attainment' | 'reports';

export default function CourseLeadDashboard({ onLogout }: CourseLeadDashboardProps) {
  const [activeView, setActiveView] = useState<LeadView>('overview');

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'approvals', label: 'Marks Approval', icon: CheckSquare },
    { id: 'attainment', label: 'CO/PO Attainment', icon: Target },
    { id: 'reports', label: 'NBA Reports', icon: FileText },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-green-100 bg-white hidden lg:flex flex-col p-4 gap-6 shadow-sm">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-100">
            <span className="font-black text-xl">L</span>
          </div>
          <div>
            <h2 className="text-slate-900 text-base font-bold leading-none">Lead Portal</h2>
            <p className="text-green-600 text-[10px] font-bold uppercase tracking-wider mt-1">Course Management</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as LeadView)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeView === item.id 
                  ? 'bg-green-50 text-green-700 font-bold shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <item.icon className={`h-5 w-5 ${activeView === item.id ? 'text-green-600' : ''}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-green-700 uppercase">System Status</p>
              <ShieldCheck className="h-3 w-3 text-green-600" />
            </div>
            <p className="text-[10px] text-green-600 font-medium">All course mappings are synchronized with NBA standards.</p>
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
              <input className="bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-green-500" placeholder="Search courses, faculty..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-green-600 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-green-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-700 font-bold shadow-sm">
              SL
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeView === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Course Lead Dashboard</h1>
                  <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" /> Overseeing 4 Courses | Computer Science Department
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                    <Download className="h-4 w-4" /> Export Data
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-100">
                    <CheckSquare className="h-4 w-4" /> Bulk Approve
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Pending Approvals', value: '3', icon: CheckSquare, color: 'text-orange-600', bg: 'bg-orange-50' },
                  { label: 'Avg PO Attainment', value: '72%', icon: Target, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'Level 1 POs', value: '2', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
                  { label: 'Active Courses', value: '4', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                    <div className={`h-12 w-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                      <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Approval Queue */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Marks Approval Queue</h3>
                    <span className="px-2 py-1 bg-orange-50 text-orange-700 text-[10px] font-black rounded-lg uppercase">3 PENDING</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {[
                      { faculty: 'Dr. Alan Smith', course: 'CS301: Algorithms', exam: 'T2 Marks', date: '2h ago' },
                      { faculty: 'Prof. Maria Lopez', course: 'CS305: Databases', exam: 'T1 Marks', date: '5h ago' },
                      { faculty: 'Dr. Raj Kumar', course: 'CS402: AI/ML', exam: 'SEE Marks', date: 'Yesterday' }
                    ].map((item, i) => (
                      <div key={i} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shadow-inner">
                            {item.faculty.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{item.course}</p>
                            <p className="text-xs text-slate-500 font-medium">{item.faculty} • {item.exam}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{item.date}</span>
                          <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm">Review</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PO Attainment Chart */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" /> PO Attainment
                  </h3>
                  <div className="space-y-6">
                    {[
                      { po: 'PO1', val: 85, color: 'bg-green-500' },
                      { po: 'PO2', val: 72, color: 'bg-green-500' },
                      { po: 'PO3', val: 45, color: 'bg-orange-500' },
                      { po: 'PO4', val: 38, color: 'bg-red-500' }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500 uppercase">{item.po}</span>
                          <span className="text-slate-900">{item.val}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-2 border border-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                    View Full PO Report <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Course Health Overview */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                  <h3 className="text-lg font-bold text-slate-900">Course CO Health Overview</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Course</th>
                        <th className="px-6 py-4">CO1</th>
                        <th className="px-6 py-4">CO2</th>
                        <th className="px-6 py-4">CO3</th>
                        <th className="px-6 py-4">CO4</th>
                        <th className="px-6 py-4">CO5</th>
                        <th className="px-6 py-4">Overall</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[
                        { name: 'Data Structures', values: [88, 76, 62, 82, 45] },
                        { name: 'Operating Systems', values: [91, 88, 84, 79, 74] },
                        { name: 'Database Mgmt', values: [58, 82, 94, 89, 70] },
                        { name: 'Compiler Design', values: [48, 41, 55, 52, 64] }
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.name}</td>
                          {row.values.map((val, j) => (
                            <td key={j} className="px-6 py-4">
                              <div className={`h-8 w-12 rounded-lg flex items-center justify-center text-xs font-black text-white shadow-sm ${val > 70 ? 'bg-green-500' : val > 50 ? 'bg-orange-500' : 'bg-red-500'}`}>
                                {val}%
                              </div>
                            </td>
                          ))}
                          <td className="px-6 py-4">
                            <span className="text-sm font-black text-slate-900">
                              {Math.round(row.values.reduce((a, b) => a + b, 0) / row.values.length)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeView === 'approvals' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Marks Approval Management</h2>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
                <div className="h-20 w-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Approval Workflow</h3>
                <p className="text-slate-500 text-sm mt-1">Select a course from the queue to start the verification process.</p>
              </div>
            </div>
          )}

          {activeView === 'attainment' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Attainment Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-6">CO Attainment Distribution</h3>
                  <div className="h-64 flex items-end justify-between gap-4">
                    {[65, 82, 45, 91, 74].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full bg-green-100 rounded-t-lg relative transition-all group-hover:bg-green-600" style={{ height: `${h}%` }}>
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100">{h}%</div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">CO{i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-6">PO Mapping Strength</h3>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-400 w-8">PO{n}</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-600" style={{ width: `${n * 15 + 20}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-700">{n * 15 + 20}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">NBA Reports & Documentation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['SAR Report', 'Course File', 'Attainment Summary'].map((report) => (
                  <div key={report} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-slate-900">{report}</h3>
                    <p className="text-xs text-slate-500 mt-1">Last generated: 2 days ago</p>
                    <button className="mt-4 w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors">Download PDF</button>
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
