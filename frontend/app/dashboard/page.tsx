'use client';
import { useEffect, useState } from 'react';
import api from '../../api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchMyPosts = async () => {
    // Check if token exists first
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (!token) {
      console.warn("No token found, redirecting to login...");
      router.push('/login');
      return;
    }

    try {
      const res = await api.get('/blogs/my-posts');
      setPosts(res.data);
    } catch (err: any) {
      console.error("Dashboard Fetch Error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        router.push('/login'); // Redirect if token is expired
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/blogs/${id}`);
        setPosts(posts.filter((p: any) => p.id !== id));
      } catch (err: any) {
        console.error("Delete Error:", err.response?.data || err.message);
        alert("Failed to delete the post. Check console for details.");
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen text-indigo-600 font-bold">
      Loading your dashboard...
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-8 text-black">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-slate-900">Manage Your Posts</h1>
        <Link href="/create" className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          + Create New
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 font-bold text-slate-600 uppercase text-xs tracking-wider">Title</th>
              <th className="p-6 font-bold text-slate-600 uppercase text-xs tracking-wider">Status</th>
              <th className="p-6 font-bold text-slate-600 uppercase text-xs tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {posts.map((post: any) => (
              <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6 font-semibold text-slate-800">{post.title}</td>
                <td className="p-6">
                  {post.isPublished ? (
                    <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-black">PUBLISHED</span>
                  ) : (
                    <span className="text-slate-400 bg-slate-100 px-3 py-1 rounded-full text-xs font-black">DRAFT</span>
                  )}
                </td>
                <td className="p-6 text-right">
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 px-4 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="p-20 text-center text-slate-400 font-medium">
            You haven't created any posts yet. Start writing!
          </div>
        )}
      </div>
    </div>
  );
}