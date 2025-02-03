import { CreateMotorcycleTryUsecase } from "@application/usecases/motorcycle-try/create-motorcycle-try-usecase";
import { Module, Provider } from "@nestjs/common";
import { MotorcycleTryRepository } from "../adapters/repositories/motorcycle-try";
import { EventStoreRepository } from "../adapters/repositories/event-store";
import { DRIVER_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE, MOTORCYCLE_REPOSITORY_INTERFACE, MOTORCYCLE_TRY_REPOSITORY_INTERFACE } from "@application/ports/symbols";
import { DeleteMotorcycleTryUsecase } from "@application/usecases/motorcycle-try/delete-motorcycle-try-usecase";
import { GetMotorcyclesInTrialUsecase } from "@application/usecases/motorcycle-try/get-motorcycles-in-trial-usecase";
import { CreateMotorcycleTryCommandHandler } from "@application/command/handlers/create-motorcycle-try.command-handler";
import { DeleteMotorcycleTryCommandHandler } from "@application/command/handlers/delete-motorcycle-try.command-handler";
import { GetMotorcyclesInTrialQueryHandler } from "@application/queries/handlers/get-motorcycles-in-trial.query-handler";
import { GetMotorcyclesTrialPassedQueryHandler } from "@application/queries/handlers/get-motorcycles-trial-passed.query-handler";
import { MotorcycleTryController } from "../controllers/motorcycle-try.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "./auth.module";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { GetMotorcyclesTrialPassedUsecase } from "@application/usecases/motorcycle-try/get-motorcycles-trial-passed-usecase";
import { GetMotorcyclesTrialCommingUsecase } from "@application/usecases/motorcycle-try/get-motorcycles-trial-comming-usecase";
import { GetMotorcyclesTrialCommingQueryHandler } from "@application/queries/handlers/get-motorcycles-trial-comming.query-handler";
import { MotorcycleRepository } from "../adapters/repositories/motorcycle";
import { DriverRepository } from "../adapters/repositories/driver-sheet";

const motorcycleInjectionUsecases: Provider[] = [
	{
		provide: CreateMotorcycleTryUsecase,
		useFactory: (
			motorcycleTryRepository: MotorcycleTryRepository,
			motorcycleRepository: MotorcycleRepository,
			driverRepository: DriverRepository,
			eventStoreRepository: EventStoreRepository,
		) => new CreateMotorcycleTryUsecase(
			motorcycleTryRepository,
			motorcycleRepository,
			driverRepository,
			eventStoreRepository,
		),
		inject: [
			MOTORCYCLE_TRY_REPOSITORY_INTERFACE,
			MOTORCYCLE_REPOSITORY_INTERFACE,
			DRIVER_REPOSITORY_INTERFACE,
			EVENT_STORE_REPOSITORY_INTERFACE,
		],
	},
	{
		provide: DeleteMotorcycleTryUsecase,
		useFactory: (
			motorcycleTryRepository: MotorcycleTryRepository,
			eventStoreRepository: EventStoreRepository,
		) => new DeleteMotorcycleTryUsecase(motorcycleTryRepository, eventStoreRepository),
		inject: [MOTORCYCLE_TRY_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE],
	},
	{
		provide: GetMotorcyclesInTrialUsecase,
		useFactory: (
			motorcycleTryRepository: MotorcycleTryRepository,
		) => new GetMotorcyclesInTrialUsecase(motorcycleTryRepository),
		inject: [MOTORCYCLE_TRY_REPOSITORY_INTERFACE],
	},
	{
		provide: GetMotorcyclesTrialPassedUsecase,
		useFactory: (
			motorcycleTryRepository: MotorcycleTryRepository,
		) => new GetMotorcyclesTrialPassedUsecase(motorcycleTryRepository),
		inject: [MOTORCYCLE_TRY_REPOSITORY_INTERFACE],
	},
	{
		provide: GetMotorcyclesTrialCommingUsecase,
		useFactory: (
			motorcycleTryRepository: MotorcycleTryRepository,
		) => new GetMotorcyclesTrialCommingUsecase(motorcycleTryRepository),
		inject: [MOTORCYCLE_TRY_REPOSITORY_INTERFACE],
	},
];
const commandHandlers: Provider[] = [
	CreateMotorcycleTryCommandHandler,
	DeleteMotorcycleTryCommandHandler,
];
const queryHandlers: Provider[] = [
	GetMotorcyclesInTrialQueryHandler,
	GetMotorcyclesTrialPassedQueryHandler,
	GetMotorcyclesTrialCommingQueryHandler,
];

@Module({
	imports: [
		CqrsModule,
		AuthModule,
		InterfaceInjectionModule,
	],
	controllers: [MotorcycleTryController],
	providers: [
		...motorcycleInjectionUsecases,
		...commandHandlers,
		...queryHandlers,
	],
})
export class MotorcycleTryModule {}
