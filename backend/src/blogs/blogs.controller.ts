import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, Query, NotFoundException, ForbiddenException } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get('public/feed')
  async getFeed(@Query('page') page: string, @Query('search') search: string) {
    return this.blogsService.getPublishedFeed(parseInt(page) || 1, search);
  }

  @Get('public/blogs/:slug')
  async getBySlug(@Param('slug') slug: string) {
    const blog = await this.blogsService.findBySlug(slug);
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  async getMyPosts(@Request() req) {
    return this.blogsService.findManyByUser(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any, @Request() req) {
    return this.blogsService.create({ ...body, authorId: req.user.sub });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async like(@Param('id') id: string, @Request() req) {
    return this.blogsService.toggleLike(id, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comment')
  async comment(@Param('id') id: string, @Body('content') content: string, @Request() req) {
    return this.blogsService.addComment(id, req.user.sub, content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.blogsService.deleteBlog(id, req.user.sub);
  }
}