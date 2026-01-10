import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Prisma } from 'src/generated/prisma/client';
@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CategoriesRepository)
    private readonly repository: CategoriesRepository,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async create(dto: CreateCategoryDto) {
    const slug = this.generateSlug(dto.name);

    const existingCategory = await this.repository.findBySlug(slug);
    if (existingCategory) {
      throw new ConflictException(
        `A categoria '${dto.name}' (slug: ${slug}) já existe.`,
      );
    }

    const data: Prisma.CategoryCreateInput = {
      name: dto.name,
      slug: slug,
      colorCode: dto.colorCode,
    };

    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const category = await this.repository.findById(id);
    if (!category) {
      throw new NotFoundException('Categoria não encontrada.');
    }
    return category;
  }
}
