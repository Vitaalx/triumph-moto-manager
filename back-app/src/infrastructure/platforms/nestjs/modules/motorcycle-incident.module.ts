import { Module, Provider } from "@nestjs/common";
import { MotorcycleIncidentController } from "../controllers/motorcycle-incident.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { AuthModule } from "./auth.module";
import { CreateMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/create-motorcycle-incident-usecase";
import { DRIVER_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE, MOTORCYCLE_INCIDENT_REPOSITORY_INTERFACE, MOTORCYCLE_REPOSITORY_INTERFACE } from "@application/ports/symbols";
import { MotorcycleIncidentRepository } from "../adapters/repositories/motorcycle-incident";
import { EventStoreRepository } from "../adapters/repositories/event-store";
import { GetMotorcycleIncidentsUsecase } from "@application/usecases/motorcycle-incident/get-motorcycle-incidents-usecase";
import { CreateMotorcycleIncidentCommandHandler } from "@application/command/handlers/create-motorcycle-incident.command-handler";
import { GetMotorcycleIncidentsQueryHandler } from "@application/queries/handlers/get-motorcycle-incidents.query-handler";
import { MotorcycleRepository } from "../adapters/repositories/motorcycle";
import { DriverRepository } from "../adapters/repositories/driver-sheet";
import { UpdateMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/update-motorcycle-incident-usecase";
import { UpdateMotorcycleIncidentCommandHandler } from "@application/command/handlers/update-motorcycle-incident.command-handler";
import { GetMotorcycleIncidentQueryHandler } from "@application/queries/handlers/get-motorcycle-incident.query-handler";
import { GetMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/get-motorcycle-incident-usecase";

const motorcycleIncidentInjectionUsecases: Provider[] = [
	{
		provide: CreateMotorcycleIncidentUsecase,
		useFactory: (
			motorcycleIncidentRepository: MotorcycleIncidentRepository,
			motorcycleRepository: MotorcycleRepository,
			driverRepository: DriverRepository,
			eventStoreRepository: EventStoreRepository,
		) => new CreateMotorcycleIncidentUsecase(
			motorcycleIncidentRepository,
			motorcycleRepository,
			driverRepository,
			eventStoreRepository,
		),
		inject: [
			MOTORCYCLE_INCIDENT_REPOSITORY_INTERFACE,
			MOTORCYCLE_REPOSITORY_INTERFACE,
			DRIVER_REPOSITORY_INTERFACE,
			EVENT_STORE_REPOSITORY_INTERFACE,
		],
	},
	{
		provide: UpdateMotorcycleIncidentUsecase,
		useFactory: (
			motorcycleIncidentRepository: MotorcycleIncidentRepository,
			eventStoreRepository: EventStoreRepository,
		) => new UpdateMotorcycleIncidentUsecase(motorcycleIncidentRepository, eventStoreRepository),
		inject: [MOTORCYCLE_INCIDENT_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE],
	},
	{
		provide: GetMotorcycleIncidentsUsecase,
		useFactory: (
			motorcycleIncidentRepository: MotorcycleIncidentRepository,
		) => new GetMotorcycleIncidentsUsecase(motorcycleIncidentRepository),
		inject: [MOTORCYCLE_INCIDENT_REPOSITORY_INTERFACE],
	},
	{
		provide: GetMotorcycleIncidentUsecase,
		useFactory: (
			motorcycleIncidentRepository: MotorcycleIncidentRepository,
		) => new GetMotorcycleIncidentUsecase(motorcycleIncidentRepository),
		inject: [MOTORCYCLE_INCIDENT_REPOSITORY_INTERFACE],
	},
];

const commandHandlers: Provider[] = [
	CreateMotorcycleIncidentCommandHandler,
	UpdateMotorcycleIncidentCommandHandler,
];

const queryHandlers: Provider[] = [
	GetMotorcycleIncidentsQueryHandler,
	GetMotorcycleIncidentQueryHandler,
];

@Module({
	imports: [
		CqrsModule,
		InterfaceInjectionModule,
		AuthModule,
	],
	controllers: [MotorcycleIncidentController],
	providers: [
		...commandHandlers,
		...queryHandlers,
		...motorcycleIncidentInjectionUsecases,
	],
})
export class MotorcycleIncidentModule {}
