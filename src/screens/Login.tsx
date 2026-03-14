import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Role } from '../types';
import { LogIn, ChevronDown } from 'lucide-react';

interface LoginProps {
  onLogin: (role: Role) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<Role>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f4f7f9]">
      <main className="w-full max-w-md">
        <header className="text-center mb-8">
          <div className="mb-4 inline-block">
            <div className="h-24 w-24 bg-[#1a2e35] rounded-lg flex items-center justify-center p-4">
              <img 
                alt="University Logo" 
                className="h-full w-full object-contain invert" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRGulB6tYTrGjbxE4W4h22nKy8z8ImcjfgOngRMJJsooXKaJGZNQva7MngkwzMn9HbPBxRYW81P1xDd_fTTpnroJtUktxpx_Ab_c99nyWs_8Z9ffnD14JQ2pYNZHacy-Tdh433Dw9TsQhqPQYp4jZlfg0DqYXE5phn9bQWlxRXD7joR1dOMDrWxWKARuOp84jfPDHwjO45-f5uikv2vPUdU7qmXrunS9VbOK9SYym3bOhpfLt6RbMEm5N8Sv45irSDeR6hqtUgkerL"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">OBE AI Chatbot System</h1>
          <p className="text-gray-500 mt-2">Empowering Academic Excellence through AI</p>
        </header>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID / Roll Number</label>
              <input 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] transition-all outline-none" 
                placeholder="Enter your ID" 
                required 
                type="text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] transition-all outline-none" 
                placeholder="••••••••" 
                required 
                type="password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role (For Demo)</label>
              <div className="relative">
                <select 
                  value={selectedRole || ''}
                  onChange={(e) => setSelectedRole(e.target.value as Role)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] transition-all outline-none bg-white appearance-none"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="hod">HOD</option>
                  <option value="admin">Admin</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <div className="relative">
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3] transition-all outline-none bg-white appearance-none">
                  <option value="">Select Department</option>
                  <option value="cs">Computer Science & Engineering</option>
                  <option value="it">Information Technology</option>
                  <option value="ece">Electronics & Communication</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input className="rounded border-gray-300 text-[#0056b3] focus:ring-[#0056b3] h-4 w-4" type="checkbox" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a className="text-[#0056b3] hover:text-[#004494] font-medium transition-colors" href="#">Forgot password?</a>
            </div>

            <div className="pt-2">
              <button 
                className="w-full bg-[#0056b3] text-white font-semibold py-3 rounded-lg hover:bg-[#004494] focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2" 
                type="submit"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </button>
            </div>
          </form>
        </motion.section>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 University Academic Portal. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            <a className="hover:underline" href="#">Privacy Policy</a>
            <a className="hover:underline" href="#">Technical Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
