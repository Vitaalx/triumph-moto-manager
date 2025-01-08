import { Injectable } from "@nestjs/common";

import { type UserEntity } from "@domain/entities/user";
import { type IUserRepository } from "@application/ports/repositories/user";

@Injectable()
export class UserRepository implements IUserRepository {
	public async findById(id: string): Promise<UserEntity | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	public async createAdminAccount(email: string, password: string): Promise<void> {
		const user = await prisma.user.findFirst(
			{
				where: {
					roles: {
						has: "ADMIN",
					},
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
					roles: ["ADMIN"],
				},
			});
		}
	}

	public async findByEmail(email: string): Promise<UserEntity | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		return user;
	}
}
