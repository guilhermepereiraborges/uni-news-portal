import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { Post, Prisma } from 'src/generated/prisma/client';

@Injectable()
export class PostsRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    return this.prisma.post.findMany({
      ...params,
      include: { author: true, category: true },
    });
  }

  async findBySlug(slug: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { slug },
      include: { author: true, category: true },
    });
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    return this.prisma.post.update(params);
  }

  async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({ where });
  }
}
