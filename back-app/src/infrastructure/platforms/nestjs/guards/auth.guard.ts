import { type ExecutionContext, type CanActivate, Injectable } from "@nestjs/common";
import { type Request } from "express";
import { Reflector } from "@nestjs/core";

import { TokenService } from "@nestjs@services/token";
import { Role } from "@domain/types/roles";
import { RequiredRoles } from "../decorators/required-roles";
import { UserRepository } from "@nestjs@repositories/user";
import { TokenInvalidHttpException } from "../exceptions/user/token-invalid";
import { UserUnauthorizedHttpException } from "../exceptions/user/user-unauthorized";

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		private readonly tokenService: TokenService,
		private readonly userRepository: UserRepository,
		private readonly reflector: Reflector,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles: Role[] = this.reflector.get(RequiredRoles, context.getHandler());
		const request = context.switchToHttp().getRequest<Request>();
		const cookies = request.cookies;
		const token: string = cookies.accessToken;

		if (!token) {
			throw new TokenInvalidHttpException();
		}

		const decodedToken = this.tokenService.verify(token);

		if (decodedToken === null) {
			throw new TokenInvalidHttpException();
		}

		const { userId } = decodedToken;

		if (!userId) {
			throw new TokenInvalidHttpException();
		}

		const user = await this.userRepository.findById(userId);

		if (user === null) {
			throw new TokenInvalidHttpException();
		}

		const userRoles = user.roles;

		// Si je suis ADMIN alors pas de vérif de Role car j'ai accès à tout
		if (userRoles.includes("ADMIN")) {
			return true;
		}

		// Sinon on vérifie les roles
		if (requiredRoles && !this.checkRoles(requiredRoles, userRoles)) {
			throw new UserUnauthorizedHttpException();
		}

		return true;
	}

	private checkRoles(requiredRoles: Role[], userRoles: Role[]): boolean {
		for (const requiredRole of requiredRoles) {
			if (!userRoles.includes(requiredRole)) {
				return false;
			}
		}
		return true;
	}
}
