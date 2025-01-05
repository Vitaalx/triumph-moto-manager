import { type ExecutionContext, UnauthorizedException, type CanActivate, Injectable } from "@nestjs/common";
import { type Observable } from "rxjs";
import { type Request } from "express";
import { Reflector } from "@nestjs/core";

import { TokenService } from "@nestjs@services/token.service-impl";
import { Role } from "@domain/types/roles";
import { RequiredRoles } from "../decorators/roles.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		private readonly tokenService: TokenService,
		private readonly reflector: Reflector,
	) {}

	public canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
		const requiredRoles: Role[] = this.reflector.get(RequiredRoles, context.getHandler());
		const request = context.switchToHttp().getRequest<Request>();
		const cookies = request.cookies;
		const token: string = cookies.accessToken;

		if (!token) {
			throw new UnauthorizedException("Token not provided");
		}

		const decodedToken = this.tokenService.verify(token);

		if (decodedToken === null) {
			throw new UnauthorizedException("Invalid token");
		}

		const userRoles = decodedToken.roles;

		// Si je suis ADMIN alors pas de vérif de Role car j'ai accès à tout
		if (userRoles.includes(Role.ADMIN)) {
			return true;
		}

		// Sinon on vérifie les roles
		if (requiredRoles && !this.checkRoles(requiredRoles, userRoles)) {
			throw new UnauthorizedException("User does not have the required role(s).");
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
