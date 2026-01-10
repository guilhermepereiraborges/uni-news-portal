import 'express';
import { UserRole } from 'src/generated/prisma/enums';

declare global {
  namespace Express {
    interface Request {
      /** User information extracted from the JWT token */
      user: {
        id: string;
        role: UserRole;
      };
    }
  }
}
