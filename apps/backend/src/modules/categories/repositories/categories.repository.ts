import { Injectable, Inject } from '@nestjs/common';
import { Category, Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { slug } });
  }

  async update(
    id: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
