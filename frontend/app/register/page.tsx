'use client';
import { useState } from 'react';
import api from '../../api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      router.push('/login');
    } catch (err) { alert("Registration failed"); }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100 p-10 border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800">Create Account</h1>
          <p className="text-slate-500 mt-2">Join our community of writers</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" placeholder="name@company.com" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-black"
              onChange={(e) => setEmail(e.target.value)} required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input 
              type="password" placeholder="••••••••" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-black"
              onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>
          <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:opacity-90 transition-all">
            Get Started
          </button>
        </form>
        
        <p className="text-center mt-8 text-slate-600 text-sm">
          Already have an account? <Link href="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}