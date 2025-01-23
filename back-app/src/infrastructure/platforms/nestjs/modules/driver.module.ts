import { Module, Provider } from "@nestjs/common";
import { DriverController } from "../controllers/driver.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "./auth.module";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { CreateDriverUsecase } from "@application/usecases/driver/create-driver-usecase";
import { DriverRepository } from "../adapters/repositories/driver-sheet";
import { EventStoreRepository } from "../adapters/repositories/event-store";
import { DRIVER_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE } from "@application/ports/symbols";
import { CreateDriverSheetCommandHandler } from "@application/command/handlers/create-driver-sheet.command-handler";
import { GetDriverQueryHandler } from "@application/queries/handlers/get-driver.query-handler";
import { GetDriverUseCase } from "@application/usecases/driver/get-driver-usecase";
import { GetDriversQueryHandler } from "@application/queries/handlers/get-drivers.query-handler";
import { GetDriversUseCase } from "@application/usecases/driver/get-drivers-usecase";
import { UpdateDriverUsecase } from "@application/usecases/driver/update-driver-usecase";
import { UpdateDriverCommandHandler } from "@application/command/handlers/update-driver.command-handler";
import { DeleteDriverUsecase } from "@application/usecases/driver/delete-driver-usecase";
import { DeleteDriverCommandHandler } from "@application/command/handlers/delete-driver.command-handler";

const driverInjectionUsecases: Provider[] = [
	{
		provide: CreateDriverUsecase,
		useFactory: (
			driverRepository: DriverRepository,
			eventStoreRepository: EventStoreRepository,
		) => new CreateDriverUsecase(driverRepository, eventStoreRepository),
		inject: [DRIVER_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE],
	},
	{
		provide: GetDriverUseCase,
		useFactory: (driverRepository: DriverRepository) => new GetDriverUseCase(driverRepository),
		inject: [DRIVER_REPOSITORY_INTERFACE],
	},
	{
		provide: GetDriversUseCase,
		useFactory: (driverRepository: DriverRepository) => new GetDriversUseCase(driverRepository),
		inject: [DRIVER_REPOSITORY_INTERFACE],
	},
	{
		provide: UpdateDriverUsecase,
		useFactory: (
			driverRepository: DriverRepository,
			eventStoreRepository: EventStoreRepository,
		) => new UpdateDriverUsecase(driverRepository, eventStoreRepository),
		inject: [DRIVER_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE],
	},
	{
		provide: DeleteDriverUsecase,
		useFactory: (
			driverRepository: DriverRepository,
			eventStoreRepository: EventStoreRepository,
		) => new DeleteDriverUsecase(driverRepository, eventStoreRepository),
		inject: [DRIVER_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE],
	},
];
const commandHandlers: Provider[] = [
	CreateDriverSheetCommandHandler,
	UpdateDriverCommandHandler,
	DeleteDriverCommandHandler,
];
const queryHandlers: Provider[] = [
	GetDriverQueryHandler,
	GetDriversQueryHandler,
];

@Module({
	imports: [
		CqrsModule,
		AuthModule,
		InterfaceInjectionModule,
	],
	controllers: [DriverController],
	providers: [
		...commandHandlers,
		...queryHandlers,
		...driverInjectionUsecases,
	],
})
export class DriverModule {}
