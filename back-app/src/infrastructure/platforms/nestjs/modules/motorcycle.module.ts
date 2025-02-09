import { Module, Provider } from "@nestjs/common";
import { MotorcycleController } from "../controllers/motorcycle.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateMotorcycleCommandHandler } from "@application/command/handlers/create-motorcycle.command-handler";
import { CreateMotorcycleUsecase } from "@application/usecases/motorcycle/create-motorcycle-usecase";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { MotorcycleRepository } from "../adapters/repositories/motorcycle";
import { DRIVER_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE, MOTORCYCLE_REPOSITORY_INTERFACE } from "@application/ports/symbols";
import { AuthModule } from "./auth.module";
import { GetMotorcycleQueryHandler } from "@application/queries/handlers/get-motorcycle.query-handler";
import { GetMotorcycleUsecase } from "@application/usecases/motorcycle/get-motorcycle-usecase";
import { EventStoreRepository } from "../adapters/repositories/event-store";
import { UpdateMotorcycleUsecase } from "@application/usecases/motorcycle/update-motorcycle-usecase";
import { GetMotorcyclesUsecase } from "@application/usecases/motorcycle/get-motorcycles-usecase";
import { GetMotorcyclesQueryHandler } from "@application/queries/handlers/get-motorcycles.query-handler";
import { UpdateMotorcycleCommandHandler } from "@application/command/handlers/update-motorcycle.command-handler";
import { AddMotorcycleToDriverUsecase } from "@application/usecases/driver/add-motorcycle-to-driver-usecase";
import { DriverRepository } from "../adapters/repositories/driver-sheet";
import { AddMotorcycleToDriverCommandHandler } from "@application/command/handlers/add-motorcycle-to-driver.command-handler";
import { DeleteMotorcycleFromDriverCommandHandler } from "@application/command/handlers/delete-motorcycle-from-driver.command-handler";
import { DeleteMotorcycleFromDriverUsecase } from "@application/usecases/driver/delete-motorcycle-from-driver-usecase";
import { BrevoMailSender } from "@infrastructure/platforms/fastify/adapters/services/brevo-mail-sender";

const motorcycleInjectionUsecases: Provider[] = [
	{
		provide: CreateMotorcycleUsecase,
		useFactory: (
			motorcycleRepository: MotorcycleRepository,
			eventStoreRepository: EventStoreRepository,
		) => new CreateMotorcycleUsecase(motorcycleRepository, eventStoreRepository),
		inject: [MOTORCYCLE_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE],
	},
	{
		provide: UpdateMotorcycleUsecase,
		useFactory: (
			motorcycleRepository: MotorcycleRepository,
			eventStoreRepository: EventStoreRepository,
			emailService: BrevoMailSender,
		) => new UpdateMotorcycleUsecase(motorcycleRepository, eventStoreRepository, emailService),
		inject: [MOTORCYCLE_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE, BrevoMailSender],
	},
	{
		provide: GetMotorcycleUsecase,
		useFactory: (motorcycleRepository: MotorcycleRepository) => new GetMotorcycleUsecase(motorcycleRepository),
		inject: [MOTORCYCLE_REPOSITORY_INTERFACE],
	},
	{
		provide: GetMotorcyclesUsecase,
		useFactory: (motorcycleRepository: MotorcycleRepository) => new GetMotorcyclesUsecase(motorcycleRepository),
		inject: [MOTORCYCLE_REPOSITORY_INTERFACE],
	},
	{
		provide: AddMotorcycleToDriverUsecase,
		useFactory: (
			driverRepository: DriverRepository,
			motorcycleRepository: MotorcycleRepository,
		) => new AddMotorcycleToDriverUsecase(
			driverRepository,
			motorcycleRepository,
		),
		inject: [
			DRIVER_REPOSITORY_INTERFACE,
			MOTORCYCLE_REPOSITORY_INTERFACE,
		],
	},
	{
		provide: DeleteMotorcycleFromDriverUsecase,
		useFactory: (
			driverRepository: DriverRepository,
			motorcycleRepository: MotorcycleRepository,
		) => new DeleteMotorcycleFromDriverUsecase(
			driverRepository,
			motorcycleRepository,
		),
		inject: [
			DRIVER_REPOSITORY_INTERFACE,
			MOTORCYCLE_REPOSITORY_INTERFACE,
		],
	},
];

const commandHandlers: Provider[] = [
	CreateMotorcycleCommandHandler,
	UpdateMotorcycleCommandHandler,
	AddMotorcycleToDriverCommandHandler,
	DeleteMotorcycleFromDriverCommandHandler,
];

const queryHandlers: Provider[] = [
	GetMotorcycleQueryHandler,
	GetMotorcyclesQueryHandler,
];

const motorcycleInjectionServices: Provider[] = [BrevoMailSender];

@Module({
	imports: [
		CqrsModule,
		InterfaceInjectionModule,
		AuthModule,
	],
	controllers: [MotorcycleController],
	providers: [
		...commandHandlers,
		...queryHandlers,
		...motorcycleInjectionUsecases,
		...motorcycleInjectionServices,
	],
})
export class MotorcycleModule {}
