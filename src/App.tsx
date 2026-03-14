/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Role } from './types';
import Login from './screens/Login';
import StudentDashboard from './screens/StudentDashboard';
import FacultyDashboard from './screens/FacultyDashboard';
import CourseLeadDashboard from './screens/CourseLeadDashboard';
import HODDashboard from './screens/HODDashboard';
import AdminDashboard from './screens/AdminDashboard';

export default function App() {
  const [role, setRole] = useState<Role>(null);

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  // Simple role switcher for demo purposes (visible only when logged in)
  const RoleSwitcher = () => (
    <div className="fixed bottom-4 right-4 z-[9999] bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg shadow-2xl flex gap-2">
      <p className="text-[10px] font-bold text-white/50 uppercase self-center px-2">Switch Role (Demo)</p>
      {(['student', 'faculty', 'lead', 'hod', 'admin'] as Role[]).map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
            role === r 
              ? 'bg-white text-black' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );

  if (!role) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      {role === 'student' && <StudentDashboard onLogout={handleLogout} />}
      {role === 'faculty' && <FacultyDashboard onLogout={handleLogout} />}
      {role === 'lead' && <CourseLeadDashboard onLogout={handleLogout} />}
      {role === 'hod' && <HODDashboard onLogout={handleLogout} />}
      {role === 'admin' && <AdminDashboard onLogout={handleLogout} />}
      <RoleSwitcher />
    </>
  );
}

