import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [AuthModule, UsersModule, BlogsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}