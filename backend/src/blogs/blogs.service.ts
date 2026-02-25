import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content: string; isPublished: boolean; authorId: string }) {
    // Requirement: Unique Slug
    const slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();
    return this.prisma.blog.create({ data: { ...data, slug } });
  }

  async getPublishedFeed(page: number = 1, search?: string) {
    const skip = (page - 1) * 10;
    return this.prisma.blog.findMany({
      where: { 
        isPublished: true,
        OR: search ? [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } }
        ] : undefined
      },
      include: {
        author: { select: { email: true } },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip, take: 10,
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.blog.findFirst({
      where: { slug, isPublished: true },
      include: { 
        author: { select: { email: true } },
        comments: { 
          include: { author: { select: { email: true } } }, 
          orderBy: { createdAt: 'desc' } 
        }
      },
    });
  }

  async findManyByUser(authorId: string) {
    return this.prisma.blog.findMany({ 
      where: { authorId }, 
      orderBy: { createdAt: 'desc' } 
    });
  }

  async toggleLike(blogId: string, userId: string) {
    const existing = await this.prisma.like.findUnique({ 
      where: { userId_blogId: { userId, blogId } } 
    });
    return existing 
      ? this.prisma.like.delete({ where: { id: existing.id } }) 
      : this.prisma.like.create({ data: { blogId, userId } });
  }

  async addComment(blogId: string, authorId: string, content: string) {
    return this.prisma.comment.create({ data: { content, blogId, authorId } });
  }

  async deleteBlog(id: string, authorId: string) {
  const blog = await this.prisma.blog.findUnique({ where: { id } });
  
  if (!blog) throw new NotFoundException('Blog not found');
  if (blog.authorId !== authorId) throw new ForbiddenException('Unauthorized');

  // 1. Delete all related records first
  await this.prisma.comment.deleteMany({ where: { blogId: id } });
  await this.prisma.like.deleteMany({ where: { blogId: id } });

  // 2. Now you can safely delete the blog
  return this.prisma.blog.delete({ where: { id } });
}
}