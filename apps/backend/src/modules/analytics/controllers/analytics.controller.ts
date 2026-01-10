import { Controller, Post, Param, Get } from '@nestjs/common';
import { AnalyticsRepository } from '../repository/analytics.repository';
import { IsPublic } from 'src/shared/decorators/isPublic';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly repo: AnalyticsRepository) {}

  @IsPublic()
  @Post('view/:postId')
  trackView(@Param('postId') postId: string) {
    return this.repo.incrementView(postId);
  }

  @Get('dashboard')
  getDashboardStats() {
    return this.repo.getWeeklyStats();
  }
}
