import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Calendar, 
  ShieldAlert,
  Settings,
  Database,
  LogOut,
  Search,
  Bell,
  Activity,
  ChevronRight,
  UserPlus,
  FileText,
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Globe,
  Server,
  Key,
  History
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

type AdminView = 'overview' | 'users' | 'departments' | 'ay-config' | 'audit' | 'settings';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState<AdminView>('overview');

  const navItems = [
    { id: 'overview', label: 'System Overview', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'ay-config', label: 'AY Configuration', icon: Calendar },
    { id: 'audit', label: 'Audit Logs', icon: ShieldAlert },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-indigo-100 bg-white hidden lg:flex flex-col p-6 gap-8 shadow-sm">
        <div className="flex items-center gap-3 px-2">
          <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 transform -rotate-3">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-slate-900 text-lg font-black leading-none tracking-tight">Admin</h2>
            <p className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest mt-1">System Control</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1.5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-3">Main Menu</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as AdminView)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                activeView === item.id 
                  ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-5 w-5 transition-colors ${activeView === item.id ? 'text-indigo-600' : 'group-hover:text-indigo-500'}`} />
                <span className="text-sm">{item.label}</span>
              </div>
              {activeView === item.id && (
                <motion.div layoutId="active-pill" className="h-1.5 w-1.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
          <div className="bg-indigo-900 rounded-2xl p-5 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 h-24 w-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Server Status</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-emerald-400">LIVE</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-indigo-200">System Load</span>
                  <span className="font-bold">12.4%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '12.4%' }}
                    className="h-full bg-indigo-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all w-full group"
          >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold">Sign Out System</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md px-10 py-5 sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <div className="relative hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input 
                className="bg-slate-50 border-none rounded-2xl pl-12 pr-6 py-2.5 text-sm w-80 focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400 font-medium" 
                placeholder="Search global audit logs..." 
                type="text" 
              />
            </div>
            <div className="h-6 w-px bg-slate-100 hidden xl:block"></div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-indigo-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Region: Asia-South</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative group">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform"></span>
              </button>
              <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Server className="h-5 w-5" />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Key className="h-5 w-5" />
              </button>
            </div>
            <div className="h-8 w-px bg-slate-100"></div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-none">Super Admin</p>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter mt-1">Root Access</p>
              </div>
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 border-2 border-white shadow-lg flex items-center justify-center text-white font-black text-sm">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[#f8fafc]">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {activeView === 'overview' && (
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Overview</h1>
                    <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-indigo-500" />
                      Global OBE Management Infrastructure | v2.4.0 Stable
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 border border-slate-200 bg-white rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                      <RefreshCw className="h-4 w-4" /> Sync Data
                    </button>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                      <UserPlus className="h-4 w-4" /> Provision User
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { label: 'Total Users', value: '4,850', change: '+120 new', positive: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Depts', value: '12', change: 'All Online', positive: true, icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'System Uptime', value: '99.9%', change: 'Stable', positive: true, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Security Alerts', value: '00', change: 'No Threats', positive: true, icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50' }
                  ].map((card, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -5 }}
                      className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className={`h-14 w-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                          <card.icon className="h-7 w-7" />
                        </div>
                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-full ${card.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          {card.change}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{card.label}</p>
                      <h3 className="text-3xl font-black text-slate-900 mt-2">{card.value}</h3>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Recent Activity */}
                  <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <History className="h-6 w-6 text-indigo-600" />
                        Global Audit Feed
                      </h3>
                      <button className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest">Live Feed</button>
                    </div>
                    <div className="space-y-8">
                      {[
                        { user: 'HOD CSE', action: 'Locked AY 2023-24', time: '2 mins ago', icon: Lock, color: 'text-orange-500', bg: 'bg-orange-50' },
                        { user: 'Admin', action: 'Updated Global PO Targets', time: '15 mins ago', icon: Settings, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                        { user: 'Faculty 04', action: 'Bulk Marks Upload (CS301)', time: '1 hour ago', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
                        { user: 'System', action: 'Automatic DB Backup Completed', time: '3 hours ago', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                      ].map((log, i) => (
                        <div key={i} className="flex items-center gap-5 group cursor-default">
                          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${log.bg} ${log.color}`}>
                            <log.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-black text-slate-900">{log.user}</p>
                            <p className="text-xs text-slate-500 font-medium">{log.action}</p>
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{log.time}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-10 py-4 text-xs font-black text-indigo-600 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-all uppercase tracking-widest">
                      View Full System Audit Logs
                    </button>
                  </div>

                  {/* System Health */}
                  <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                      <Activity className="h-6 w-6 text-emerald-500" />
                      Service Health
                    </h3>
                    <div className="space-y-5">
                      {[
                        { name: 'Auth Service', status: 'Healthy', color: 'bg-emerald-500', uptime: '99.9%' },
                        { name: 'Firestore DB', status: 'Healthy', color: 'bg-emerald-500', uptime: '100%' },
                        { name: 'AI Generation API', status: 'Healthy', color: 'bg-emerald-500', uptime: '98.4%' },
                        { name: 'PDF Export Engine', status: 'Degraded', color: 'bg-orange-500', uptime: '85.2%' }
                      ].map((service, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-black text-slate-800">{service.name}</span>
                            <span className={`h-2.5 w-2.5 rounded-full ${service.color} shadow-[0_0_10px_rgba(16,185,129,0.4)]`}></span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{service.status}</span>
                            <span className="text-[10px] font-black text-indigo-600">{service.uptime} Uptime</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'users' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h2>
                    <p className="text-slate-500 font-medium mt-1">Manage system access and roles across all departments.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 border border-slate-200 bg-white rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all">Export CSV</button>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Bulk Import</button>
                  </div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <input className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs w-64 focus:ring-2 focus:ring-indigo-500" placeholder="Search by name or ID..." />
                    </div>
                    <div className="flex gap-2">
                      <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600">
                        <option>All Roles</option>
                        <option>Faculty</option>
                        <option>HOD</option>
                        <option>Admin</option>
                      </select>
                    </div>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">
                      <tr>
                        <th className="px-8 py-5">User ID</th>
                        <th className="px-8 py-5">Name</th>
                        <th className="px-8 py-5">Role</th>
                        <th className="px-8 py-5">Department</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <tr key={n} className="hover:bg-indigo-50/30 transition-colors group">
                          <td className="px-8 py-5 text-sm font-black text-slate-400">EMP{1000 + n}</td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                                {n}
                              </div>
                              <span className="text-sm font-bold text-slate-900">User Name {n}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                              {n % 3 === 0 ? 'HOD' : n % 2 === 0 ? 'ADMIN' : 'FACULTY'}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-sm font-bold text-slate-500">CSE</td>
                          <td className="px-8 py-5">
                            <span className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                              <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></div>
                              Active
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button className="text-indigo-600 text-xs font-black hover:underline uppercase tracking-widest group-hover:scale-110 transition-transform">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView === 'departments' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Departments</h2>
                    <p className="text-slate-500 font-medium mt-1">Configure and monitor departmental performance metrics.</p>
                  </div>
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Add Department</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT'].map((dept) => (
                    <motion.div 
                      key={dept} 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="h-14 w-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-lg shadow-inner">
                            {dept}
                          </div>
                          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                            <Settings className="h-5 w-5" />
                          </button>
                        </div>
                        <h3 className="font-black text-xl text-slate-900 tracking-tight">Dept. of {dept}</h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">Engineering & Technology</p>
                        <div className="mt-8 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Faculty</span>
                            <span className="text-lg font-black text-slate-900">42</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students</span>
                            <span className="text-lg font-black text-slate-900">850</span>
                          </div>
                        </div>
                        <button className="w-full mt-8 py-3 text-xs font-black text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-widest">
                          Manage Department
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'ay-config' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">AY Configuration</h2>
                  <p className="text-slate-500 font-medium mt-1">Manage academic cycles and system-wide date constraints.</p>
                </div>
                <div className="bg-white rounded-[2rem] border border-slate-100 p-10 shadow-sm max-w-3xl">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-indigo-900">Active Academic Year</h4>
                        <p className="text-xs text-indigo-600 font-medium">Currently serving AY 2024-25. All data entries are synced to this cycle.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Active Year</label>
                        <select className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:bg-white transition-all outline-none">
                          <option>Academic Year 2024-25</option>
                          <option>Academic Year 2023-24</option>
                          <option>Academic Year 2022-23</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Semester Cycle</label>
                        <select className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:bg-white transition-all outline-none">
                          <option>Odd Semester (July - Dec)</option>
                          <option>Even Semester (Jan - June)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                        <input type="date" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:bg-white transition-all outline-none" defaultValue="2024-06-01" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                        <input type="date" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:bg-white transition-all outline-none" defaultValue="2025-05-31" />
                      </div>
                    </div>

                    <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 flex gap-4">
                      <AlertCircle className="h-6 w-6 text-orange-500 shrink-0" />
                      <div>
                        <p className="text-sm font-black text-orange-800 uppercase tracking-tight">Critical Warning</p>
                        <p className="text-xs text-orange-700 font-medium mt-1 leading-relaxed">
                          Changing the active year will affect all dashboards and data entry points globally. Please ensure all previous year data is locked and archived before proceeding.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest">
                        Save Configuration
                      </button>
                      <button className="px-8 py-4 border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all uppercase tracking-widest">
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'audit' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Audit Logs</h2>
                    <p className="text-slate-500 font-medium mt-1">Immutable record of all system-wide actions and security events.</p>
                  </div>
                  <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                    <FileText className="h-4 w-4" /> Export Audit Report
                  </button>
                </div>
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-wrap gap-4">
                    <div className="relative flex-1 min-w-[240px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <input className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs w-full focus:ring-2 focus:ring-indigo-500" placeholder="Filter by user or action..." />
                    </div>
                    <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600">
                      <option>All Event Types</option>
                      <option>Security</option>
                      <option>Data Modification</option>
                      <option>Configuration</option>
                    </select>
                    <input type="date" className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600" />
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">
                      <tr>
                        <th className="px-8 py-5">Timestamp</th>
                        <th className="px-8 py-5">User</th>
                        <th className="px-8 py-5">Action</th>
                        <th className="px-8 py-5">IP Address</th>
                        <th className="px-8 py-5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <tr key={n} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-5 text-xs font-medium text-slate-400">2024-03-14 12:45:0{n}</td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                              <span className="text-sm font-bold text-slate-900">Admin_User</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-sm text-slate-600 font-medium">Modified Global Thresholds</td>
                          <td className="px-8 py-5 text-xs text-slate-400 font-mono">192.168.1.{n}</td>
                          <td className="px-8 py-5 text-right">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">SUCCESS</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h2>
                  <p className="text-slate-500 font-medium mt-1">Global configuration for OBE logic and security protocols.</p>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <Activity className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">OBE Thresholds</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Attainment Level (%)</label>
                        <div className="flex items-center gap-4">
                          <input type="range" className="flex-1 accent-indigo-600" defaultValue="70" />
                          <span className="text-lg font-black text-indigo-600 w-12 text-right">70%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Low Attainment Alert (%)</label>
                        <div className="flex items-center gap-4">
                          <input type="range" className="flex-1 accent-rose-500" defaultValue="50" />
                          <span className="text-lg font-black text-rose-500 w-12 text-right">50%</span>
                        </div>
                      </div>
                      <div className="pt-4">
                        <button className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-widest">
                          Update Thresholds
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                        <Lock className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Security & Access</h3>
                    </div>
                    <div className="space-y-5">
                      {[
                        { name: 'Two-Factor Authentication', desc: 'Require 2FA for all faculty logins', active: true },
                        { name: 'Auto-Lock Inactive AYs', desc: 'Automatically lock data for previous years', active: false },
                        { name: 'IP Whitelisting', desc: 'Restrict admin access to campus network', active: true },
                        { name: 'Audit Log Retention', desc: 'Keep system logs for minimum 5 years', active: true }
                      ].map((setting, i) => (
                        <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:border-indigo-100">
                          <div>
                            <p className="text-sm font-black text-slate-800">{setting.name}</p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">{setting.desc}</p>
                          </div>
                          <button className={`h-7 w-12 rounded-full relative transition-colors ${setting.active ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 h-5 w-5 bg-white rounded-full transition-all ${setting.active ? 'right-1' : 'left-1'}`}></div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
