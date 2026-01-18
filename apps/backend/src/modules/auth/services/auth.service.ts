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
  user: UserResponseDto;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(input: LoginDto): Promise<LoginResponse> {
    const userEntity = await this.authRepository.findByEmail(input.email);

    if (!userEntity) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      input.password,
      userEntity.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
      role: userEntity.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const user = UserResponseDto.fromEntity(userEntity);
    return { accessToken, user };
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

  async me(userId: string): Promise<UserResponseDto> {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return UserResponseDto.fromEntity(user);
  }
}
