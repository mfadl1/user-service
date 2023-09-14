import { TokenData, User } from "./types";
import { Request } from 'express';

export interface AuthQuery {
  register(userInfo: User): Promise<User>;
  login(
    userInfo: Pick<User, "phoneNumber" | "password">
  ): Promise<{ userData: User; tokenData: TokenData }>;
  authMiddleware(req: Request): Promise<boolean>;
}
