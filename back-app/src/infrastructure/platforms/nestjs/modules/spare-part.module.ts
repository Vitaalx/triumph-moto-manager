import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "./auth.module";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { SparePartController } from "../controllers/spare-part.controller";
import { CreateSparePartUsecase } from "@application/usecases/spare-part/create-spare-part-usecase";
import { EventStoreRepository } from "../adapters/repositories/event-store";
import { SparePartRepository } from "../adapters/repositories/spare-part";
import { EVENT_STORE_REPOSITORY_INTERFACE, SPARE_PART_REPOSITORY_INTERFACE } from "@application/ports/symbols";
import { UpdateSparePartUsecase } from "@application/usecases/spare-part/update-spare-part-usecase";
import { DeleteSparePartUsecase } from "@application/usecases/spare-part/delete-spare-part-usecase";
import { GetSparePartUsecase } from "@application/usecases/spare-part/get-spare-part-usecase";
import { GetSparePartsUsecase } from "@application/usecases/spare-part/get-spare-parts-usecase";
import { CreateSparePartCommandHandler } from "@application/command/handlers/create-spare-part.command-handler";
import { UpdateSparePartCommandHandler } from "@application/command/handlers/update-spare-part.command-handler";
import { DeleteSparePartCommandHandler } from "@application/command/handlers/delete-spare-part.command-handler";
import { GetSparePartQueryHandler } from "@application/queries/handlers/get-spare-part.query-handler";
import { GetSparePartsQueryHandler } from "@application/queries/handlers/get-spare-parts.query-handler";

const sparePartInjectionUsecases: Provider[] = [
	{
		provide: CreateSparePartUsecase,
		useFactory: (
			sparePartRepository: SparePartRepository,
			eventStoreRepository: EventStoreRepository,
		) => new CreateSparePartUsecase(
			sparePartRepository,
			eventStoreRepository,
		),
		inject: [SPARE_PART_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE],
	},
	{
		provide: UpdateSparePartUsecase,
		useFactory: (
			sparePartRepository: SparePartRepository,
			eventStoreRepository: EventStoreRepository,
		) => new UpdateSparePartUsecase(
			sparePartRepository,
			eventStoreRepository,
		),
		inject: [SPARE_PART_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE],
	},
	{
		provide: DeleteSparePartUsecase,
		useFactory: (
			sparePartRepository: SparePartRepository,
			eventStoreRepository: EventStoreRepository,
		) => new DeleteSparePartUsecase(
			sparePartRepository,
			eventStoreRepository,
		),
		inject: [SPARE_PART_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE],
	},
	{
		provide: GetSparePartUsecase,
		useFactory: (sparePartRepository: SparePartRepository) => new GetSparePartUsecase(sparePartRepository),
		inject: [SPARE_PART_REPOSITORY_INTERFACE],
	},
	{
		provide: GetSparePartsUsecase,
		useFactory: (sparePartRepository: SparePartRepository) => new GetSparePartsUsecase(sparePartRepository),
		inject: [SPARE_PART_REPOSITORY_INTERFACE],
	},
];

const commandHandlers: Provider[] = [
	CreateSparePartCommandHandler,
	UpdateSparePartCommandHandler,
	DeleteSparePartCommandHandler,
];

const queryHandlers: Provider[] = [
	GetSparePartQueryHandler,
	GetSparePartsQueryHandler,
];

@Module({
	imports: [
		CqrsModule,
		AuthModule,
		InterfaceInjectionModule,
	],
	controllers: [SparePartController],
	providers: [
		...sparePartInjectionUsecases,
		...commandHandlers,
		...queryHandlers,
	],
})
export class SparePartModule {}
