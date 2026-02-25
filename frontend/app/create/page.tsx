'use client';
import { useState } from 'react';
import api from '../../api';
import { useRouter } from 'next/navigation';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/blogs', { title, content, isPublished });
      router.push('/dashboard');
    } catch (err) { alert("Login required"); }
  };

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-black text-slate-900 mb-8">Draft a New Story</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          className="text-4xl font-bold w-full outline-none border-b border-transparent focus:border-indigo-100 pb-4 placeholder:text-slate-300 text-black"
          placeholder="Enter Title..." 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          className="w-full h-64 text-lg outline-none text-slate-700 placeholder:text-slate-300 resize-none"
          placeholder="Tell your story..." 
          onChange={(e) => setContent(e.target.value)} 
        />
        <div className="flex items-center justify-between pt-8 border-t">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)} className="w-5 h-5 accent-indigo-600" />
            <span className="text-slate-600 font-medium">Publish Immediately</span>
          </label>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-100">
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}