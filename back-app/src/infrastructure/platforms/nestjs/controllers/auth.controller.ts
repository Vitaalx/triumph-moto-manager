import { Body, Controller, Get, HttpException, HttpStatus, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { QueryBus } from "@nestjs/cqrs";

import { UserNotFound } from "@domain/errors/user-not-found";
import { PasswordInvalid } from "@domain/errors/password-invalid";
import { LoginQuery } from "@application/queries/definitions/login-query";
import { UserNotFoundHttpException } from "../exceptions/user-not-found.exception";
import { PasswordInvalidHttpException } from "../exceptions/password-invalid.exception";
import { UserLoginDto } from "../dtos/user-login.dto";
import { RequiredRoles } from "../decorators/required-roles.decorator";
import { AuthGuard } from "../guards/auth.guard";

@Controller("/auth")
export class AuthController {
	private readonly ACCESS_TOKEN_KEY = "accessToken";

	public constructor(private readonly queryBus: QueryBus) {}

	@Get("/login")
	public async login(@Res() res: Response, @Body() userLoginDto: UserLoginDto) {
		const { email, password } = userLoginDto;

		try {
			const token = await this.queryBus.execute(new LoginQuery(email, password));

			res.cookie(
				this.ACCESS_TOKEN_KEY,
				token,
				{ httpOnly: true },
			);
			res.status(HttpStatus.OK).json(
				{ accessToken: token },
			);
		} catch (error) {
			if (error instanceof UserNotFound) {
				throw new UserNotFoundHttpException();
			}
			if (error instanceof PasswordInvalid) {
				throw new PasswordInvalidHttpException();
			}
			throw new HttpException(error as Error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
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
