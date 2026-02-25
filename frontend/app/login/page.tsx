'use client';
import { useState } from 'react';
import api from '../../api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      router.push('/');
    } catch (err) { alert("Invalid credentials"); }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100 p-10 border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Log in to manage your posts</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" placeholder="Email" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          New here? <Link href="/register" className="text-indigo-600 font-bold">Register</Link>
        </p>
      </div>
    </div>
  );
}