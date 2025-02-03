import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { RequiredRoles } from "../decorators/required-roles";
import { AuthGuard } from "../guards/auth.guard";
import { CreateMotorcycleMaintenanceDto } from "../dtos/motorcycle-maintenance/create";
import { CreateMotorcycleMaintenanceCommand } from "@application/command/definitions/create-motorcycle-maintenance";
import { Response } from "express";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { DriverNotFoundHttpException } from "../exceptions/driver/driver-not-found";
import { InvalidMotorcycleLicensePlateError } from "@domain/errors/motorcycle/invalid-license-plate";
import { InvalidLicensePlateHttpException } from "../exceptions/motorcycle/invalid-license-plate";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { MotorcycleNotFoundHttpException } from "../exceptions/motorcycle/motorcycle-not-found";
import { UpdateMotorcycleMaintenanceDto } from "../dtos/motorcycle-maintenance/update";
import { UpdateMotorcycleMaintenanceCommand } from "@application/command/definitions/update-motorcycle-maintenance";
import { MotorcycleMaintenanceNotFoundError } from "@domain/errors/motorcycle-maintenance/motorcycle-maintenance-not-found";
import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { InsufficientSparePartStockError } from "@domain/errors/spare-part/insufficient-spare-part-stock";
import { MotorcycleMaintenanceNotFoundHttpException } from "../exceptions/motorcycle-maintenance/motorcycle-maintenance-not-found";
import { SparePartNotFoundHttpException } from "../exceptions/spare-part/spare-part-not-found";
import { InsufficientSparePartStockHttpException } from "../exceptions/spare-part/insufficient-spare-part-stock";
import { InvalidMotorcycleMaintenanceStatusError } from "@domain/errors/motorcycle-maintenance/invalid-motorcycle-maintenance-status";
import { CloseMotorcycleMaintenanceCommand } from "@application/command/definitions/close-motorcycle-maintenance";
import { InvalidMotorcycleMaintenanceStatusHttpException } from "../exceptions/motorcycle-maintenance/invalid-motorcycle-maintenance-status";
import { MissingLaborPriceError } from "@domain/errors/motorcycle-maintenance/missing-labor-price";
import { MissingLaborPriceHttpException } from "../exceptions/motorcycle-maintenance/missing-labor-price";
import { GetMotorcycleMaintenancesInProgressQuery } from "@application/queries/definitions/get-motorcycle-maintenances-in-progress";
import { GetMotorcycleMaintenancesClosedQuery } from "@application/queries/definitions/get-motorcycle-maintenances-closed";
import { MotorcycleMaintenanceAlreadyExistsError } from "@domain/errors/motorcycle-maintenance/motorcycle-maintenance-already-exists";
import { MotorcycleMaintenanceAlreadyExistsHttpException } from "../exceptions/motorcycle-maintenance/motorycle-maintenance-already-exists";
import { MotorcycleDoesNotBelongToDriverHttpException } from "../exceptions/motorcycle-maintenance/motorcycle-does-not-belong-to-driver";
import { MotorcycleDoesNotBelongToDriverError } from "@domain/errors/motorcycle-maintenance/motorcycle-does-not-belong-to-driver";
import { GetMotorcycleMaintenanceQuery } from "@application/queries/definitions/get-motorcycle-maintenance";

@Controller()
export class MotorcycleMaintenanceController {
	public constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Post("/motorcycle-maintenance")
	public async create(@Res() res: Response, @Body() createMotorcycleMaintenanceDto: CreateMotorcycleMaintenanceDto) {
		const {
			motorcycleId,
			driverId,
		} = createMotorcycleMaintenanceDto;

		const commandResult = await this.commandBus.execute(new CreateMotorcycleMaintenanceCommand(
			driverId,
			motorcycleId,
		));

		if (commandResult instanceof DriverNotFoundError) {
			throw new DriverNotFoundHttpException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcycleLicensePlateError) {
			throw new InvalidLicensePlateHttpException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleNotFoundError) {
			throw new MotorcycleNotFoundHttpException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleMaintenanceAlreadyExistsError) {
			throw new MotorcycleMaintenanceAlreadyExistsHttpException(commandResult.message);
		}

		if (commandResult instanceof MotorcycleDoesNotBelongToDriverError) {
			throw new MotorcycleDoesNotBelongToDriverHttpException(commandResult.message);
		}

		return res.status(HttpStatus.CREATED).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Patch("/motorcycle-maintenance/:maintenanceId")
	public async update(@Res() res: Response, @Param("maintenanceId") maintenanceId: string, @Body() updateMotorcycleMaintenanceDto: UpdateMotorcycleMaintenanceDto) {
		const {
			technicalRecommendations,
			usedSpareParts,
			laborPrice,
		} = updateMotorcycleMaintenanceDto;

		const commandResult = await this.commandBus.execute(new UpdateMotorcycleMaintenanceCommand(
			maintenanceId,
			technicalRecommendations,
			usedSpareParts,
			laborPrice,
		));

		if (commandResult instanceof MotorcycleMaintenanceNotFoundError) {
			throw new MotorcycleMaintenanceNotFoundHttpException(commandResult.message);
		}

		if (commandResult instanceof SparePartNotFoundError) {
			throw new SparePartNotFoundHttpException(commandResult.message);
		}

		if (commandResult instanceof InsufficientSparePartStockError) {
			throw new InsufficientSparePartStockHttpException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcycleMaintenanceStatusError) {
			throw new InvalidMotorcycleMaintenanceStatusHttpException(commandResult.message);
		}

		return res.status(HttpStatus.OK).send();
	}

	//TODO problème quand je close à voir !!!
	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Patch("/motorcycle-maintenance/:maintenanceId/close")
	public async close(@Res() res: Response, @Param("maintenanceId") maintenanceId: string) {
		const commandResult = await this.commandBus.execute(new CloseMotorcycleMaintenanceCommand(maintenanceId));

		if (commandResult instanceof MotorcycleMaintenanceNotFoundError) {
			throw new MotorcycleMaintenanceNotFoundHttpException(commandResult.message);
		}

		if (commandResult instanceof InvalidMotorcycleMaintenanceStatusError) {
			throw new InvalidMotorcycleMaintenanceStatusHttpException(commandResult.message);
		}

		if (commandResult instanceof MissingLaborPriceError) {
			throw new MissingLaborPriceHttpException(commandResult.message);
		}

		return res.status(HttpStatus.OK).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/motorcycle-maintenances-in-progress")
	public async getMotorcycleMaintenancesInProgress(@Res() res: Response) {
		const motorcycleMaintenancesInProgress = await this.queryBus.execute(
			new GetMotorcycleMaintenancesInProgressQuery(),
		);
		return res.status(HttpStatus.OK).send(motorcycleMaintenancesInProgress);
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/motorcycle-maintenances-closed")
	public async getMotorcycleMaintenancesClosed(@Res() res: Response) {
		const motorcycleMaintenancesClosed = await this.queryBus.execute(
			new GetMotorcycleMaintenancesClosedQuery(),
		);
		return res.status(HttpStatus.OK).send(motorcycleMaintenancesClosed);
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/motorcycle-maintenance/:maintenanceId")
	public async getMotorcycleMaintenance(@Res() res: Response, @Param("maintenanceId") maintenanceId: string) {
		const motorcycleMaintenance = await this.queryBus.execute(
			new GetMotorcycleMaintenanceQuery(maintenanceId),
		);

		if (motorcycleMaintenance instanceof MotorcycleMaintenanceNotFoundError) {
			throw new MotorcycleMaintenanceNotFoundHttpException(motorcycleMaintenance.message);
		}

		return res.status(HttpStatus.OK).send(motorcycleMaintenance);
	}
}
