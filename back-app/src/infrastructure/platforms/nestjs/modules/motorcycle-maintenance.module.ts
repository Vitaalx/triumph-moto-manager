import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { AuthModule } from "./auth.module";
import { MotorcycleMaintenanceController } from "../controllers/motorcycle-maintenance.controller";
import { CreateMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/create-motorcycle-maintenance-usecase";
import { MotorcycleRepository } from "../adapters/repositories/motorcycle";
import { DriverRepository } from "../adapters/repositories/driver-sheet";
import { EventStoreRepository } from "../adapters/repositories/event-store";
import { MotorcycleMaintenanceRepository } from "../adapters/repositories/motorcycle-maintenance";
import {
	DRIVER_REPOSITORY_INTERFACE,
	EVENT_STORE_REPOSITORY_INTERFACE,
	MAINTENANCE_SPARE_PART_REPOSITORY_INTERFACE,
	MOTORCYCLE_MAINTENANCE_REPOSITORY_INTERFACE,
	MOTORCYCLE_REPOSITORY_INTERFACE,
	SPARE_PART_REPOSITORY_INTERFACE,
} from "@application/ports/symbols";
import { UpdateMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/update-motorcycle-maintenance-usecase";
import { SparePartRepository } from "../adapters/repositories/spare-part";
import { CloseMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/close-motorcycle-maintenance-usecase";
import { GetMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/get-motorcycle-maintenance-usecase";
import { GetMotorcycleMaintenancesInProgressUsecase } from "@application/usecases/motorcycle-maintenance/get-motorcycle-maintenances-in-progress-usecase";
import { GetMotorcycleMaintenancesClosedUsecase } from "@application/usecases/motorcycle-maintenance/get-motorcycle-maintenances-closed-usecase";
import { CreateMotorcycleMaintenanceCommandHandler } from "@application/command/handlers/create-motorcycle-maintenance.command-handler";
import { UpdateMotorcycleMaintenanceCommandHandler } from "@application/command/handlers/update-motorcycle-maintenance.command-handler";
import { CloseMotorcycleMaintenanceCommandHandler } from "@application/command/handlers/close-motorcycle-maintenance.command-handler";
import { GetMotorcycleMaintenanceQueryHandler } from "@application/queries/handlers/get-motorcycle-maintenance.query-handler";
import { GetMotorcycleMaintenancesInProgressQueryHandler } from "@application/queries/handlers/get-motorcycle-maintenances-in-progress.query-handler";
import { GetMotorcycleMaintenancesClosedQueryHandler } from "@application/queries/handlers/get-motorcycle-maintenances-closed.query-handler";
import { MaintenanceSparePartRepository } from "../adapters/repositories/maintenance-spare-part";

const motorcycleMaintenanceInjectionUsecases: Provider[] = [
	{
		provide: CreateMotorcycleMaintenanceUsecase,
		useFactory: (
			motorcycleMaintenanceRepository: MotorcycleMaintenanceRepository,
			driverRepository: DriverRepository,
			motorcycleRepository: MotorcycleRepository,
			eventStoreRepository: EventStoreRepository,
		) => new CreateMotorcycleMaintenanceUsecase(
			motorcycleMaintenanceRepository,
			driverRepository,
			motorcycleRepository,
			eventStoreRepository,
		),
		inject: [
			MOTORCYCLE_MAINTENANCE_REPOSITORY_INTERFACE,
			DRIVER_REPOSITORY_INTERFACE,
			MOTORCYCLE_REPOSITORY_INTERFACE,
			EVENT_STORE_REPOSITORY_INTERFACE,
		],
	},
	{
		provide: UpdateMotorcycleMaintenanceUsecase,
		useFactory: (
			motorcycleMaintenanceRepository: MotorcycleMaintenanceRepository,
			maintenanceSparePartRepository: MaintenanceSparePartRepository,
			eventStoreRepository: EventStoreRepository,
			sparePartRepository: SparePartRepository,
		) => new UpdateMotorcycleMaintenanceUsecase(
			motorcycleMaintenanceRepository,
			maintenanceSparePartRepository,
			eventStoreRepository,
			sparePartRepository,
		),
		inject: [
			MOTORCYCLE_MAINTENANCE_REPOSITORY_INTERFACE,
			MAINTENANCE_SPARE_PART_REPOSITORY_INTERFACE,
			EVENT_STORE_REPOSITORY_INTERFACE,
			SPARE_PART_REPOSITORY_INTERFACE,
		],
	},
	{
		provide: CloseMotorcycleMaintenanceUsecase,
		useFactory: (
			motorcycleMaintenanceRepository: MotorcycleMaintenanceRepository,
			sparePartRepository: SparePartRepository,
			eventStoreRepository: EventStoreRepository,
		) => new CloseMotorcycleMaintenanceUsecase(
			motorcycleMaintenanceRepository,
			sparePartRepository,
			eventStoreRepository,
		),
		inject: [
			MOTORCYCLE_MAINTENANCE_REPOSITORY_INTERFACE,
			SPARE_PART_REPOSITORY_INTERFACE,
			EVENT_STORE_REPOSITORY_INTERFACE,
		],
	},
	{
		provide: GetMotorcycleMaintenanceUsecase,
		useFactory: (
			motorcycleMaintenanceRepository: MotorcycleMaintenanceRepository,
		) => new GetMotorcycleMaintenanceUsecase(
			motorcycleMaintenanceRepository,
		),
		inject: [MOTORCYCLE_MAINTENANCE_REPOSITORY_INTERFACE],
	},
	{
		provide: GetMotorcycleMaintenancesInProgressUsecase,
		useFactory: (
			motorcycleMaintenanceRepository: MotorcycleMaintenanceRepository,
		) => new GetMotorcycleMaintenancesInProgressUsecase(
			motorcycleMaintenanceRepository,
		),
		inject: [MOTORCYCLE_MAINTENANCE_REPOSITORY_INTERFACE],
	},
	{
		provide: GetMotorcycleMaintenancesClosedUsecase,
		useFactory: (
			motorcycleMaintenanceRepository: MotorcycleMaintenanceRepository,
		) => new GetMotorcycleMaintenancesClosedUsecase(
			motorcycleMaintenanceRepository,
		),
		inject: [MOTORCYCLE_MAINTENANCE_REPOSITORY_INTERFACE],
	},
];
const commandHandlers: Provider[] = [
	CreateMotorcycleMaintenanceCommandHandler,
	UpdateMotorcycleMaintenanceCommandHandler,
	CloseMotorcycleMaintenanceCommandHandler,
];
const queryHandlers: Provider[] = [
	GetMotorcycleMaintenanceQueryHandler,
	GetMotorcycleMaintenancesInProgressQueryHandler,
	GetMotorcycleMaintenancesClosedQueryHandler,
];

@Module({
	imports: [
		CqrsModule,
		InterfaceInjectionModule,
		AuthModule,
	],
	controllers: [MotorcycleMaintenanceController],
	providers: [
		...motorcycleMaintenanceInjectionUsecases,
		...commandHandlers,
		...queryHandlers,
	],
})
export class MotorcycleMaintenanceModule {}
