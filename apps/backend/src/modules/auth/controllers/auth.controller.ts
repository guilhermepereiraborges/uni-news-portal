import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';
import { IsPublic } from 'src/shared/decorators/isPublic';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @IsPublic()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
