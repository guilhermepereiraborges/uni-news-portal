import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/isPublic';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @IsPublic()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }
}
