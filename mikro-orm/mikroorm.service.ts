import { EntityManager } from "@mikro-orm/core";
import { AuthQuery } from "../interface";
import { User, TokenData } from "../types";
import { UserModel } from "./entities/user.entity";
import { compare, genSaltSync, hashSync } from 'bcrypt';

export class AuthenticatorServiceMikroOrm implements AuthQuery {
  constructor(
    private entityManager: EntityManager,
    private jwtSecretKey: string,
    private jwtExpiresIn: string
  ) {}
    public async register(userInfo: User): Promise<User> {
        const em = this.entityManager.fork();
        const now = new Date()

        const isExist = await em.findOne(UserModel, {
			phoneNumber: userInfo.phoneNumber,
		});
		if (isExist) {
			throw new Error('Phone number already exist');
		}

		const salt = genSaltSync(10);
		const hashedPassword = hashSync(userInfo.password, salt);

		const createdUser = em.create(UserModel, {
            phoneNumber: userInfo.phoneNumber,
            password: hashedPassword,
            name: userInfo.name,
            email: userInfo.email,
            createdAt: now,
            updatedAt: now
        });
		await em.flush();

		return createdUser;
    }
    public async login(userInfo: Pick<User, "password" | "phoneNumber">): Promise<{ tokenData: TokenData; roles: string[]; }> {
        throw new Error("Method not implemented.");
    }
    public async authMiddleware(req: any, checkPermission?: boolean | undefined): Promise<{ phoneNumber: string; roles: string[]; }> {
        throw new Error("Method not implemented.");
    }
}