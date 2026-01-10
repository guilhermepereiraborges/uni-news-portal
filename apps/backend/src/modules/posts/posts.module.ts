import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsRepository } from './repositories/posts.repository';
import { PostsService } from './services/posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsRepository, PostsService],
})
export class PostsModule {}
