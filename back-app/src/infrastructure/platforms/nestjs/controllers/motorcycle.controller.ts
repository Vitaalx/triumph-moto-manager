import { BadRequestException, Body, ConflictException, Controller, Get, HttpStatus, NotFoundException, Param, Patch, Post, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateMotorcycleDto } from "../dtos/motorcycle/create";
import { CreateMotorcycleCommand } from "@application/command/definitions/create-motorcycle";
import { Response } from "express";
import { InvalidMotorcycleLicensePlateError } from "@domain/errors/motorcycle/invalid-license-plate";
import { InvalidMotorcyclePriceError } from "@domain/errors/motorcycle/invalid-motorcycle-price";
import { InvalidMotorcycleYearError } from "@domain/errors/motorcycle/invalid-motorcycle-year";
import { MotorcycleAlreadyExistsError } from "@domain/errors/motorcycle/motorcycle-already-exists";
import { AuthGuard } from "../guards/auth.guard";
import { RequiredRoles } from "../decorators/required-roles";
import { GetMotorcycleQuery } from "@application/queries/definitions/get-motorcycle-query";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { UpdateMotorcycleCommand } from "@application/command/definitions/update-motorcycle";
import { UpdateMotorcycleDto } from "../dtos/motorcycle/update";
import { GetMotorcyclesQuery } from "@application/queries/definitions/get-motorcycles-query";
import { AddMotorcycleToDriverCommand } from "@application/command/definitions/add-motorcycle-to-driver";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { MotorcycleAlreadyAssignedError } from "@domain/errors/motorcycle/motorcycle-already-assigned";
import { DeleteMotorcycleFromDriverCommand } from "@application/command/definitions/delete-motorcycle-from-driver";

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
		const { licensePlate, model, year, brand, price, maintenanceInterval, warrantyEndDate } = createMotorcycleDto;

		const commandResult = await this.commandBus.execute(new CreateMotorcycleCommand(
			licensePlate,
			model,
			year,
			brand,
			price,
			maintenanceInterval,
			warrantyEndDate,
		));

		if (commandResult instanceof InvalidMotorcycleLicensePlateError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcyclePriceError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcycleYearError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleAlreadyExistsError) {
			throw new ConflictException(commandResult.message);
		}

		return res.status(HttpStatus.CREATED).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Patch("/motorcycle/:licensePlate")
	public async update(@Res() res: Response, @Param("licensePlate") licensePlate: string, @Body() updateMotorcycleDto: UpdateMotorcycleDto) {
		const { model, year, brand, price, maintenanceInterval, warrantyEndDate } = updateMotorcycleDto;

		const commandResult = await this.commandBus.execute(new UpdateMotorcycleCommand(
			licensePlate,
			model,
			year,
			brand,
			price,
			maintenanceInterval,
			warrantyEndDate,
		));

		if (commandResult instanceof InvalidMotorcycleLicensePlateError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcyclePriceError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcycleYearError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		return res.status(HttpStatus.OK).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Post("/driver/:driverId/motorcycle/:licensePlate")
	public async addMotorcycleToDriver(@Res() res: Response, @Param("licensePlate") licensePlate: string, @Param("driverId") driverId: string) {
		const commandResult = await this.commandBus.execute(
			new AddMotorcycleToDriverCommand(
				driverId,
				licensePlate,
			),
		);

		if (commandResult instanceof InvalidMotorcycleLicensePlateError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		if (commandResult instanceof DriverNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleAlreadyAssignedError) {
			throw new UnauthorizedException(commandResult.message);
		}

		return res.status(HttpStatus.OK).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Patch("/driver/:driverId/motorcycle/:licensePlate")
	public async removeMotorcycleFromDriver(@Res() res: Response, @Param("licensePlate") licensePlate: string, @Param("driverId") driverId: string) {
		const commandResult = await this.commandBus.execute(
			new DeleteMotorcycleFromDriverCommand(
				driverId,
				licensePlate,
			),
		);

		if (commandResult instanceof InvalidMotorcycleLicensePlateError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		if (commandResult instanceof DriverNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		return res.status(HttpStatus.OK).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/motorcycles")
	public async getAll(@Res() res: Response) {
		const motorcycles = await this.queryBus.execute(new GetMotorcyclesQuery());

		return res.status(HttpStatus.OK).json({ motorcycles });
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/motorcycle/:licensePlate")
	public async get(@Res() res: Response, @Param("licensePlate") licensePlate: string) {
		const motorcycle = await this.queryBus.execute(new GetMotorcycleQuery(licensePlate));

		if (motorcycle instanceof InvalidMotorcycleLicensePlateError) {
			throw new BadRequestException(motorcycle.message);
		}

		if (motorcycle instanceof MotorcycleNotFoundError) {
			throw new NotFoundException(motorcycle.message);
		}

		return res.status(HttpStatus.OK).json({ motorcycle });
	}
}
