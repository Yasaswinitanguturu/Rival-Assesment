'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../api';
import Link from 'next/link';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [comment, setComment] = useState('');

  const loadBlog = async () => {
    try {
      const res = await api.get(`/blogs/public/blogs/${slug}`);
      setBlog(res.data);
    } catch (err) { console.error("Error loading blog"); }
  };

  useEffect(() => { if (slug) loadBlog(); }, [slug]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/blogs/${blog.id}/comment`, { content: comment });
      setComment('');
      loadBlog();
    } catch (err) { alert("Please login to comment"); }
  };

  if (!blog) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 text-black bg-white">
      <Link href="/" className="text-blue-500 mb-6 block">← Back to Feed</Link>
      <h1 className="text-4xl font-black mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-6 italic">By {blog.author.email}</p>
      <div className="prose mb-10 text-lg leading-relaxed whitespace-pre-wrap">{blog.content}</div>
      
      <div className="border-t pt-8">
        <h3 className="text-2xl font-bold mb-4">Comments ({blog.comments?.length || 0})</h3>
        <form onSubmit={handleComment} className="mb-8">
          <textarea value={comment} onChange={(e)=>setComment(e.target.value)} className="w-full border p-3 rounded-lg text-black" placeholder="Share your thoughts..." required />
          <button className="bg-blue-600 text-white px-6 py-2 mt-2 rounded-lg font-bold">Post Comment</button>
        </form>
        {blog.comments?.map((c: any) => (
          <div key={c.id} className="mb-4 p-4 bg-gray-50 rounded-lg border">
            <p className="text-sm font-bold text-blue-600">{c.author.email}</p>
            <p className="text-gray-800">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}