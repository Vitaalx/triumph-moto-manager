import { CreateDriverSheetCommand } from "@application/command/definitions/create-driver-sheet";
import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Response } from "express";
import { CreateDriverDto } from "../dtos/driver/create";
import { InvalidDriverMotorcycleLicenseTypeError } from "@domain/errors/driver/invalid-driver-motorcycle-license-type";
import { InvalidDriverAgeError } from "@domain/errors/driver/invalid-driver-age";
import { AuthGuard } from "../guards/auth.guard";
import { RequiredRoles } from "../decorators/required-roles";
import { DriverAlreadyExistError } from "@domain/errors/driver/driver-already-exist";
import { GetDriverQuery } from "@application/queries/definitions/get-driver-query";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { GetDriversQuery } from "@application/queries/definitions/get-drivers-query";
import { UpdateDriverDto } from "../dtos/driver/update";
import { UpdateDriverCommand } from "@application/command/definitions/update-driver";
import { DeleteDriverCommand } from "@application/command/definitions/delete-driver";
import { InvalidEmailError } from "@domain/errors/invalid-email-error";
import { FirstNameTooShortError } from "@domain/errors/driver/first-name-too-short";
import { LastNameTooShortError } from "@domain/errors/driver/last-name-too-short";

@Controller()
export class DriverController {
	public constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Post("/driver")
	public async createDriver(@Res() res: Response, @Body() createDriverDto: CreateDriverDto) {
		const { name, firstname, age, email, motorcycleLicenseType, drivingExperience } = createDriverDto;
		const commandResult = await this.commandBus.execute(new CreateDriverSheetCommand(
			name,
			firstname,
			age,
			email,
			motorcycleLicenseType,
			drivingExperience,
		));

		if (commandResult instanceof InvalidDriverMotorcycleLicenseTypeError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof InvalidDriverAgeError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof DriverAlreadyExistError) {
			throw new ConflictException(commandResult.message);
		}

		if (commandResult instanceof InvalidEmailError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof FirstNameTooShortError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof LastNameTooShortError) {
			throw new BadRequestException(commandResult.message);
		}

		return res.status(HttpStatus.CREATED).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Patch("/driver/:driverId")
	public async updateDriver(@Res() res: Response, @Body() updateDriverDto: UpdateDriverDto, @Param("driverId") driverId: string) {
		const { age, email, motorcycleLicenseType, drivingExperience } = updateDriverDto;
		const commandResult = await this.commandBus.execute(new UpdateDriverCommand(
			driverId,
			age,
			email,
			motorcycleLicenseType,
			drivingExperience,
		));

		if (commandResult instanceof InvalidDriverMotorcycleLicenseTypeError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof InvalidDriverAgeError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof DriverNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		if (commandResult instanceof InvalidEmailError) {
			throw new BadRequestException(commandResult.message);
		}

		return res.status(HttpStatus.OK).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/driver/:driverId")
	public async getDriver(@Res() res: Response, @Param("driverId") driverId: string) {
		const driver = await this.queryBus.execute(new GetDriverQuery(driverId));

		if (driver instanceof DriverNotFoundError) {
			throw new NotFoundException(driver.message);
		}

		return res.status(HttpStatus.OK).send({ driver });
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/drivers")
	public async getDrivers(@Res() res: Response) {
		const drivers = await this.queryBus.execute(new GetDriversQuery());

		return res.status(HttpStatus.OK).send({ drivers });
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Delete("/driver/:driverId")
	public async delete(@Res() res: Response, @Param("driverId") driverId: string) {
		const driver = await this.commandBus.execute(new DeleteDriverCommand(driverId));

		if (driver instanceof DriverNotFoundError) {
			throw new NotFoundException(driver.message);
		}

		return res.status(HttpStatus.NO_CONTENT).send();
	}
}
