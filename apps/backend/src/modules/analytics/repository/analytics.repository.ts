import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class AnalyticsRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async incrementView(postId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.postMetric.upsert({
      where: {
        postId_date: {
          postId,
          date: today,
        },
      },
      update: { views: { increment: 1 } },
      create: {
        postId,
        date: today,
        views: 1,
        uniqueVisitors: 1,
      },
    });
  }

  async getWeeklyStats() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return this.prisma.postMetric.groupBy({
      by: ['date'],
      where: { date: { gte: sevenDaysAgo } },
      _sum: { views: true },
      orderBy: { date: 'asc' },
    });
  }
}
