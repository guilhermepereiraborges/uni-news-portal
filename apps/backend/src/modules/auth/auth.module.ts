import { Module } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller.js';
import { AuthService } from './services/auth.service.js';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService],
})
export class AuthModule {}
