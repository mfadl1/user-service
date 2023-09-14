import { TokenData, User } from "./types";

export interface AuthQuery {
    register(userInfo: User): Promise<User>;
	login(
		userInfo: Pick<User, 'phoneNumber' | 'password'>,
	): Promise<{ userData: User; tokenData: TokenData  }>;
	authMiddleware(
		req: any,
		checkPermission?: boolean,
	): Promise<{ phoneNumber: string; roles: string[] }>;
}