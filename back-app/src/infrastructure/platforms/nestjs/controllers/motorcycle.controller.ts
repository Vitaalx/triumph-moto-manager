import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateMotorcycleDto } from "../dtos/motorcycle/create";
import { CreateMotorcycleCommand } from "@application/command/definitions/create-motorcycle";
import { Response } from "express";
import { InvalidMotorcycleLicensePlateError } from "@domain/errors/motorcycle/invalid-license-plate";
import { InvalidLicensePlateHttpException } from "../exceptions/motorcycle/invalid-license-plate";
import { InvalidMotorcyclePriceError } from "@domain/errors/motorcycle/invalid-motorcycle-price";
import { InvalidMotorcycleYearError } from "@domain/errors/motorcycle/invalid-motorcycle-year";
import { MotorcycleAlreadyExistsError } from "@domain/errors/motorcycle/motorcycle-already-exists";
import { InvalidMotorcycleYearHttpException } from "../exceptions/motorcycle/invalid-motorcycle-year";
import { InvalidMotorcyclePriceHttpException } from "../exceptions/motorcycle/invalid-motorcycle-price";
import { MotorcycleAlreadyExistsHttpException } from "../exceptions/motorcycle/motorcycle-already-exists";
import { AuthGuard } from "../guards/auth.guard";
import { RequiredRoles } from "../decorators/required-roles";
import { GetMotorcycleQuery } from "@application/queries/definitions/get-motorcycle-query";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { MotorcycleNotFoundHttpException } from "../exceptions/motorcycle/motorcycle-not-found";
import { DeleteMotorcycleCommand } from "@application/command/definitions/delete-motorcycle";

@Controller()
export class MotorcycleController {
	public constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Post("/motorcycle")
	public async create(@Res() res: Response, @Body() createMotorcycleDto: CreateMotorcycleDto) {
		const { licensePlate, model, year, brand, price, maintenanceInterval } = createMotorcycleDto;

		const commandResult = await this.commandBus.execute(new CreateMotorcycleCommand(
			licensePlate,
			model,
			year,
			brand,
			price,
			maintenanceInterval,
		));

		if (commandResult instanceof InvalidMotorcycleLicensePlateError) {
			throw new InvalidLicensePlateHttpException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcyclePriceError) {
			throw new InvalidMotorcyclePriceHttpException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcycleYearError) {
			throw new InvalidMotorcycleYearHttpException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleAlreadyExistsError) {
			throw new MotorcycleAlreadyExistsHttpException(commandResult.message);
		}

		return res.status(HttpStatus.CREATED).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/motorcycle/:licensePlate")
	public async get(@Res() res: Response, @Param("licensePlate") licensePlate: string) {
		const motorcycle = await this.queryBus.execute(new GetMotorcycleQuery(licensePlate));

		if (motorcycle instanceof InvalidMotorcycleLicensePlateError) {
			throw new InvalidLicensePlateHttpException(motorcycle.message);
		}

		if (motorcycle instanceof MotorcycleNotFoundError) {
			throw new MotorcycleNotFoundHttpException(motorcycle.message);
		}

		return res.status(HttpStatus.OK).json({ motorcycle });
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Delete("/motorcycle/:licensePlate")
	public async delete(@Res() res: Response, @Param("licensePlate") licensePlate: string) {
		const motorcycle = await this.commandBus.execute(new DeleteMotorcycleCommand(licensePlate));

		if (motorcycle instanceof InvalidMotorcycleLicensePlateError) {
			throw new InvalidLicensePlateHttpException(motorcycle.message);
		}

		if (motorcycle instanceof MotorcycleNotFoundError) {
			throw new MotorcycleNotFoundHttpException(motorcycle.message);
		}

		return res.status(HttpStatus.NO_CONTENT).send();
	}
}
