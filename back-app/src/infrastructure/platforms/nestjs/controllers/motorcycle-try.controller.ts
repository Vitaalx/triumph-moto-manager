import { BadRequestException, Body, ConflictException, Controller, Get, HttpStatus, NotFoundException, Post, Res, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { RequiredRoles } from "../decorators/required-roles";
import { CreateMotorcycleTryDto } from "../dtos/motorcycle-try/create";
import { CreateMotorcycleTryCommand } from "@application/command/definitions/create-motorcycle-try";
import { AuthGuard } from "../guards/auth.guard";
import { MotorcycleTryAlreadyExistsError } from "@domain/errors/motorcycle-try/motorcyce-try-already-exists";
import { InvalidMotorcycleTryDatesError } from "@domain/errors/motorcycle-try/invalid-motorcycle-try-dates";
import { Response } from "express";
import { GetMotorcyclesInTrialQuery } from "@application/queries/definitions/get-motorcycles-in-trial";
import { GetMotorcyclesTrialPassedQuery } from "@application/queries/definitions/get-motorcycles-trial-passed";
import { GetMotorcyclesTrialCommingQuery } from "@application/queries/definitions/get-motorcycles-trial-comming";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { InvalidMotorcycleLicensePlateError } from "@domain/errors/motorcycle/invalid-license-plate";

@Controller()
export class MotorcycleTryController {
	public constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Post("/motorcycle-try")
	public async createMotorcycleTry(@Res() res: Response, @Body() createMotorcycleTryDto: CreateMotorcycleTryDto) {
		const { driverId, motorcycleId, startDate, endDate } = createMotorcycleTryDto;

		const commandResult = await this.commandBus.execute(new CreateMotorcycleTryCommand(
			driverId,
			motorcycleId,
			startDate,
			endDate,
		));

		if (commandResult instanceof MotorcycleTryAlreadyExistsError) {
			throw new ConflictException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcycleTryDatesError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		if (commandResult instanceof DriverNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcycleLicensePlateError) {
			throw new BadRequestException(commandResult.message);
		}

		return res.status(HttpStatus.CREATED).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/motorcycles-in-trial")
	public async getMotorcyclesInTrial(@Res() res: Response) {
		const motorcyclesTryInTrial = await this.queryBus.execute(new GetMotorcyclesInTrialQuery());

		return res.status(HttpStatus.OK).send(motorcyclesTryInTrial);
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/motorcycles-trial-passed")
	public async getMotorcyclesTrialPassed(@Res() res: Response) {
		const motorcyclesTrialPassed = await this.queryBus.execute(new GetMotorcyclesTrialPassedQuery());

		return res.status(HttpStatus.OK).send(motorcyclesTrialPassed);
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/motorcycles-trial-comming")
	public async getMotorcyclesTrialComming(@Res() res: Response) {
		const motorcyclesTrialComming = await this.queryBus.execute(new GetMotorcyclesTrialCommingQuery());

		return res.status(HttpStatus.OK).send(motorcyclesTrialComming);
	}
}
