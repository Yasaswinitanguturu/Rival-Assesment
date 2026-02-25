# Rival Blog Platform
**Live Demo:** [https://rival-assesment.vercel.app](https://rival-assesment.vercel.app)
**Backend:** [https://rival-assesment.onrender.com](https://rival-assesment.onrender.com)

# Full-Stack Personal Blog Platform

A robust, full-stack blogging application featuring secure authentication, dynamic routing, and real-time social interactions. Built as a technical assessment, this project demonstrates proficiency in modern web architecture and performance optimization.

## 🌟 Key Features

### 🔓 Public Access (SEO Optimized)
- **Global Feed**: A paginated list of all published blogs.
- **Dynamic Routing**: Individual blog posts are accessible via unique, SEO-friendly slugs (e.g., `/blog/my-first-post`).
- **Search & Filter**: Users can filter the feed by keywords in titles or content.

### 🔐 Private Dashboard (User Management)
- **CRUD Operations**: Logged-in users can create, read, and delete their own posts.
- **State Management**: Dashboard allows users to toggle between drafts and published content.

### 💬 Social System
- **Engagement**: Authenticated users can "Like" posts and leave "Comments."
- **Counts**: Publicly visible counters for likes and comments on every post.

---

## 🚀 Scaling Strategy (Handling 1M+ Users)

To ensure the platform remains performant at a massive scale, the following architectural improvements are proposed:

1. **Caching Layer (Redis)**: 
   Implementing Redis for `GET /public/feed` and `GET /public/blogs/:slug`. Since blog content is read-heavy and changes infrequently, caching responses reduces database load by up to 90%.
   
2. **Database Performance**:
   Adding B-Tree indexes to the `slug`, `isPublished`, and `authorId` columns in PostgreSQL to ensure $O(\log n)$ lookup times even with millions of records.

3. **Horizontal Scaling**: 
   Containerizing the NestJS backend using Docker and deploying via Kubernetes (K8s) with an Auto-Scaling Group (ASG) to handle traffic spikes.

4. **Edge Delivery (CDN)**: 
   Using a CDN (like Cloudflare or Vercel Edge) to serve the Next.js frontend and static assets, reducing latency for global users.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Axios.
- **Backend**: NestJS, TypeScript, JWT (Passport.js).
- **ORM**: Prisma.
- **Database**: PostgreSQL.

---

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL instance

### 2. Backend Setup
```bash
cd backend
npm install
# Configure your .env file (DATABASE_URL, JWT_SECRET)
npx prisma migrate dev
npm run start:dev
