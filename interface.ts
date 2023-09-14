import { TokenData, User } from "./types";

export interface AuthQuery {
    register(userInfo: User): Promise<User>;
	login(
		userInfo: Pick<User, 'phoneNumber' | 'password'>,
	): Promise<{ tokenData: TokenData; roles: Array<string> }>;
	authMiddleware(
		req: any,
		checkPermission?: boolean,
	): Promise<{ phoneNumber: string; roles: string[] }>;
}