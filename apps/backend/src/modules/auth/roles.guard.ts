import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/generated/prisma/enums';
import { Request } from 'express';
import { ROLES_KEY } from 'src/shared/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<Request>();

    if (!user) {
      return false;
    }

    const userRole = user.role as UserRole | undefined;

    if (!userRole || !requiredRoles.includes(userRole)) {
      throw new ForbiddenException('Acesso negado: Perfil sem permissão.');
    }

    return true;
  }
}
