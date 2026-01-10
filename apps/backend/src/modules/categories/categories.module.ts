import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesRepository } from './repositories/categories.repository';
import { CategoriesService } from './services/categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesRepository, CategoriesService],
})
export class CategoriesModule {}
