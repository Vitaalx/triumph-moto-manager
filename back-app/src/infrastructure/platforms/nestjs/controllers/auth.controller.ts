import { Body, Controller, Get, HttpStatus, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { QueryBus } from "@nestjs/cqrs";

import { UserNotFound } from "@domain/errors/user-not-found";
import { PasswordInvalid } from "@domain/errors/password-invalid";
import { LoginQuery } from "@application/queries/definitions/login-query";
import { UserNotFoundHttpException } from "../exceptions/user-not-found";
import { PasswordInvalidHttpException } from "../exceptions/password-invalid";
import { UserLoginDto } from "../dtos/user-login";
import { RequiredRoles } from "../decorators/required-roles";
import { AuthGuard } from "../guards/auth.guard";

@Controller("/auth")
export class AuthController {
	private readonly ACCESS_TOKEN_KEY = "accessToken";

	public constructor(private readonly queryBus: QueryBus) {}

	@Get("/login")
	public async login(@Res() res: Response, @Body() userLoginDto: UserLoginDto) {
		const { email, password } = userLoginDto;

		const token = await this.queryBus.execute(new LoginQuery(email, password));

		if (token instanceof UserNotFound) {
			throw new UserNotFoundHttpException();
		}

		if (token instanceof PasswordInvalid) {
			throw new PasswordInvalidHttpException();
		}

		res.cookie(
			this.ACCESS_TOKEN_KEY,
			token,
			{ httpOnly: true },
		);
		res.status(HttpStatus.OK).json(
			{ accessToken: token },
		);
	}

	@Get("/logout")
	public logout(@Res() res: Response) {
		res.clearCookie(this.ACCESS_TOKEN_KEY);
		res.status(HttpStatus.OK).send();
	}

	@Get("/test")
	@RequiredRoles("ADMIN", "FLEET_MANAGER")
	@UseGuards(AuthGuard)
	public test() {
		return "test";
	}
}
