import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (_data, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<{ user: { id: string } }>();

    const userId = request.user.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    return userId;
  },
);
