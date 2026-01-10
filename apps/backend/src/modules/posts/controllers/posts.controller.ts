import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { IsPublic } from 'src/shared/decorators/isPublic';
import { ActiveUserId } from 'src/shared/decorators/activeUserId';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @IsPublic()
  @Get()
  findAll() {
    return this.postsService.findAllPublic();
  }

  @IsPublic()
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postsService.findOne(slug);
  }

  @Get('admin/all')
  findAllAdmin() {
    return this.postsService.findAllAdmin();
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto, @ActiveUserId() userId: string) {
    return this.postsService.create(userId, createPostDto);
  }
}
