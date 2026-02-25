'use client';
import { useEffect, useState } from 'react';
import api from '../api';
import Link from 'next/link';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.get('/blogs/public/feed').then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-slate-50 min-h-screen">
      <header className="mb-12">
        <h1 className="text-5xl font-black text-slate-900 mb-4">Latest Stories</h1>
        <p className="text-slate-500 text-lg">Insights, thoughts, and discussions.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {blogs.map((blog: any) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:border-indigo-100 transition-all h-full flex flex-col justify-between">
              <div>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase">Article</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{blog.title}</h2>
                <p className="text-slate-500 mt-3 line-clamp-3 leading-relaxed">{blog.content}</p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-400">{blog.author.email}</span>
                <div className="flex gap-4">
                  <span className="text-sm">❤️ {blog._count.likes}</span>
                  <span className="text-sm">💬 {blog._count.comments}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}