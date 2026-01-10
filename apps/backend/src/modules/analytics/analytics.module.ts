import { Module } from '@nestjs/common';
import { AnalyticsController } from './controllers/analytics.controller';
import { AnalyticsRepository } from './repository/analytics.repository';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsRepository],
})
export class AnalyticsModule {}
