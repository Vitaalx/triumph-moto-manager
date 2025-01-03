import { type User } from "@domain/models/user";
import { type UserRepository } from "@application/ports/repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
	public async createAdminAccount(email: string, password: string): Promise<void> {
		const user = await prisma.user.findFirst(
			{
				where: {
					role: Role.ADMIN,
				},
			},
		);
		if (user) {
			await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					email,
					password,
				},
			});
		} else {
			await prisma.user.create({
				data: {
					email,
					password,
					role: Role.ADMIN,
				},
			});
		}
	}

	public async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		}) as User | null;
		if (!user) {
			return null;
		}
		return user;
	}
}
