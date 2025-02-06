import { Module, Provider } from "@nestjs/common";
import { MotorcycleController } from "../controllers/motorcycle.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateMotorcycleCommandHandler } from "@application/command/handlers/create-motorcycle.command-handler";
import { CreateMotorcycleUsecase } from "@application/usecases/motorcycle/create-motorcycle-usecase";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { MotorcycleRepository } from "../adapters/repositories/motorcycle";
import { EVENT_STORE_REPOSITORY_INTERFACE, MOTORCYCLE_REPOSITORY_INTERFACE } from "@application/ports/symbols";
import { AuthModule } from "./auth.module";
import { GetMotorcycleQueryHandler } from "@application/queries/handlers/get-motorcycle.query-handler";
import { GetMotorcycleUsecase } from "@application/usecases/motorcycle/get-motorcycle-usecase";
import { EventStoreRepository } from "../adapters/repositories/event-store";
import { UpdateMotorcycleUsecase } from "@application/usecases/motorcycle/update-motorcycle-usecase";
import { GetMotorcyclesUsecase } from "@application/usecases/motorcycle/get-motorcycles-usecase";
import { GetMotorcyclesQueryHandler } from "@application/queries/handlers/get-motorcycles.query-handler";
import { UpdateMotorcycleCommandHandler } from "@application/command/handlers/update-motorcycle.command-handler";

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
		) => new UpdateMotorcycleUsecase(motorcycleRepository, eventStoreRepository),
		inject: [MOTORCYCLE_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE],
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
];

const commandHandlers: Provider[] = [
	CreateMotorcycleCommandHandler,
	UpdateMotorcycleCommandHandler,
];

const queryHandlers: Provider[] = [
	GetMotorcycleQueryHandler,
	GetMotorcyclesQueryHandler,
];

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
	],
})
export class MotorcycleModule {}
