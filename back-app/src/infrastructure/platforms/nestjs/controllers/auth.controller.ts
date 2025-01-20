import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { LoginService } from "@nestjs@services/login";
import { InputLoginDto } from "../dtos/input-login";

@Controller("/auth")
export class AuthController {
	private readonly ACCESS_TOKEN_KEY = "accessToken";

	public constructor(private readonly loginService: LoginService) {}

	@Post("/login")
	public async login(@Res() res: Response, @Body() input: InputLoginDto) {
		const token = await this.loginService.login(input);

		res.cookie(
			this.ACCESS_TOKEN_KEY,
			token,
			{ httpOnly: true },
		);

		return res.status(HttpStatus.OK).json(
			{ token },
		);
	}

	@Post("/logout")
	public logout(@Res() res: Response) {
		res.clearCookie(this.ACCESS_TOKEN_KEY);
		return res.status(HttpStatus.OK).send();
	}
}
