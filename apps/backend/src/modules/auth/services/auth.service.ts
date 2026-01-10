import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthRepository } from '../repositories/auth.repository';
import { UserResponseDto } from '../dto/user-response.dto';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export interface LoginResponse {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(input: LoginDto): Promise<LoginResponse> {
    const user = await this.authRepository.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async register(input: RegisterDto): Promise<UserResponseDto> {
    const userExists = await this.authRepository.findByEmail(input.email);

    if (userExists) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const newUser = await this.authRepository.create({
      name: input.name,
      email: input.email,
      passwordHash: passwordHash,
    });

    return UserResponseDto.fromEntity(newUser);
  }
}
