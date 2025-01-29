import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { RequiredRoles } from "../decorators/required-roles";
import { AuthGuard } from "../guards/auth.guard";
import { Response } from "express";
import { CreateMotorcycleIncidentDto } from "../dtos/motorcycle-incident/create";
import { CreateMotorcycleIncidentCommand } from "@application/command/definitions/create-motorcycle-incident";
import { InvalidIncidentTypeError } from "@domain/errors/motorcycle-incident/invalid-incident-type";
import { InvalidMotorcycleLicensePlateError } from "@domain/errors/motorcycle/invalid-license-plate";
import { InvalidLicensePlateHttpException } from "../exceptions/motorcycle/invalid-license-plate";
import { MotorcycleIncidentAlreadyExistsError } from "@domain/errors/motorcycle-incident/motorcycle-incident-already-exists";
import { InvalidIncidentTypeHttpException } from "../exceptions/motorcycle-incident/invalid-incident-type";
import { MotorcycleIncidentAlreadyExistsHttpException } from "../exceptions/motorcycle-incident/motorcycle-incident-already-exists";
import { DeleteMotorcycleIncidentCommand } from "@application/command/definitions/delete-motorcycle-incident";
import { MotorcycleIncidentNotFoundHttpException } from "../exceptions/motorcycle-incident/motorcycle-incident-not-found";
import { MotorcycleIncidentNotFoundError } from "@domain/errors/motorcycle-incident/motorcycle-incident-not-found";
import { GetMotorcycleIncidentsQuery } from "@application/queries/definitions/get-motorcycle-incidents";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { DriverNotFoundHttpException } from "../exceptions/driver/driver-not-found";
import { UpdateMotorcycleIncidentDto } from "../dtos/motorcycle-incident/update";
import { UpdateMotorcycleIncidentCommand } from "@application/command/definitions/update-motorcycle-incident";

@Controller()
export class MotorcycleIncidentController {
	public constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Post("/motorcycle-incident")
	public async create(@Res() res: Response, @Body() createMotorcycleIncidentDto: CreateMotorcycleIncidentDto) {
		const {
			type,
			description,
			motorcycleId,
			driverId,
			incidentDate,
			incidentTime,
			location,
		} = createMotorcycleIncidentDto;

		const commandResult = await this.commandBus.execute(new CreateMotorcycleIncidentCommand(
			type,
			description,
			motorcycleId,
			driverId,
			incidentDate,
			incidentTime,
			location,
		));

		if (commandResult instanceof InvalidIncidentTypeError) {
			throw new InvalidIncidentTypeHttpException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcycleLicensePlateError) {
			throw new InvalidLicensePlateHttpException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleIncidentAlreadyExistsError) {
			throw new MotorcycleIncidentAlreadyExistsHttpException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleNotFoundError) {
			throw new MotorcycleIncidentNotFoundHttpException(commandResult.message);
		}

		if (commandResult instanceof DriverNotFoundError) {
			throw new DriverNotFoundHttpException(commandResult.message);
		}

		return res.status(HttpStatus.CREATED).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Patch("/motorcycle-incident/:motorcycleIncidentId")
	public async update(
		@Res() res: Response,
		@Param("motorcycleIncidentId") motorcycleIncidentId: string,
		@Body() updateMotorcycleIncidentDto: UpdateMotorcycleIncidentDto,
	) {
		const {
			type,
			description,
			incidentDate,
			incidentTime,
			location,
		} = updateMotorcycleIncidentDto;

		const commandResult = await this.commandBus.execute(new UpdateMotorcycleIncidentCommand(
			motorcycleIncidentId,
			type,
			description,
			incidentDate,
			incidentTime,
			location,
		));

		if (commandResult instanceof MotorcycleIncidentNotFoundError) {
			throw new MotorcycleIncidentNotFoundHttpException(commandResult.message);
		}

		if (commandResult instanceof InvalidIncidentTypeError) {
			throw new InvalidIncidentTypeHttpException(commandResult.message);
		}

		return res.status(HttpStatus.OK).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Delete("/motorcycle-incident/:motorcycleIncidentId")
	public async delete(@Res() res: Response, @Param("motorcycleIncidentId") motorcycleIncidentId: string) {
		const commandResult = await this.commandBus.execute(new DeleteMotorcycleIncidentCommand(motorcycleIncidentId));

		if (commandResult instanceof MotorcycleIncidentNotFoundError) {
			throw new MotorcycleIncidentNotFoundHttpException(commandResult.message);
		}

		return res.status(HttpStatus.NO_CONTENT).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/motorcycle-incidents")
	public async getMotorcycleIncidents(@Res() res: Response) {
		const queryResult = await this.queryBus.execute(new GetMotorcycleIncidentsQuery());

		return res.status(HttpStatus.OK).send(queryResult);
	}
}
