import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PostsModule } from './modules/posts/posts.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { RolesGuard } from './modules/auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    AnalyticsModule,
    CategoriesModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
