import { Body, Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from "express";
import { QueryBus } from "@nestjs/cqrs";
import { UserNotFound } from "@domain/errors/user-not-found";
import { InvalidPassword } from "@domain/errors/invalid-password";
import { UserUnauthorized } from "@domain/errors/user-unauthorized";
import { LoginQuery } from "@application/queries/definitions/login-query";
import { UserNotFoundHttpException } from "../exceptions/user-not-found.exception";
import { UserUnauthorizedHttpException } from "../exceptions/user-unauthorized.exception";
import { InvalidPasswordHttpException } from "../exceptions/invalid-password.exception";
import { UserLoginDto } from "../dtos/user-login.dto";

@Controller("/auth")
export class AuthController {
	private readonly ACCESS_TOKEN_KEY = "accessToken";

	public constructor(private readonly queryBus: QueryBus) {}

	@Get("/login")
	public async login(@Res() res: Response, @Body() userLoginDto: UserLoginDto) {
		const { email, password } = userLoginDto;

		const result = await this.queryBus.execute(new LoginQuery(email, password));

		if (result instanceof UserNotFound) {
			throw new UserNotFoundHttpException();
		}
		if (result instanceof UserUnauthorized) {
			throw new UserUnauthorizedHttpException();
		}
		if (result instanceof InvalidPassword) {
			throw new InvalidPasswordHttpException();
		}

		res.cookie(
			this.ACCESS_TOKEN_KEY,
			result,
			{ httpOnly: true },
		);
		res.status(HttpStatus.OK).json(
			{ accessToken: result },
		);
	}

	@Get("/logout")
	public logout(@Res() res: Response) {
		res.clearCookie(this.ACCESS_TOKEN_KEY);
		res.status(HttpStatus.OK).send();
	}
}
