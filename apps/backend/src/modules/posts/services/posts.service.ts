import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostsRepository } from '../repositories/posts.repository';
import { CreatePostDto } from '../dto/create-post.dto';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class PostsService {
  constructor(
    @Inject(PostsRepository) private readonly repository: PostsRepository,
  ) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async create(authorId: string, dto: CreatePostDto) {
    const slug = this.generateSlug(dto.title) + '-' + Date.now();

    const data: Prisma.PostCreateInput = {
      ...dto,
      slug,
      author: { connect: { id: authorId } },
      category: { connect: { id: dto.categoryId } },
    };

    return this.repository.create(data);
  }

  async findAllPublic() {
    return this.repository.findAll({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findAllAdmin() {
    return this.repository.findAll({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(slug: string) {
    const post = await this.repository.findBySlug(slug);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }
}
