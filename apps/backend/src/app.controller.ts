import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './shared/decorators/isPublic';

@IsPublic()
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'API is running...';
  }
}
