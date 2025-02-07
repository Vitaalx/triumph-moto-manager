import { CreatePartsOrderUsecase } from "@application/usecases/parts-order/create-parts-order-usecase";
import { Module, Provider } from "@nestjs/common";
import { SparePartRepository } from "../adapters/repositories/spare-part";
import { IPartsOrderRepository } from "@application/ports/repositories/parts-order";
import { IPartsOrderSparePartsRepository } from "@application/ports/repositories/parts-order-spare-parts";
import { EventStoreRepository } from "../adapters/repositories/event-store";
import { EVENT_STORE_REPOSITORY_INTERFACE, PARTS_ORDER_REPOSITORY_INTERFACE, PARTS_ORDER_SPARE_PARTS_REPOSITORY_INTERFACE, SPARE_PART_REPOSITORY_INTERFACE } from "@application/ports/symbols";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "./auth.module";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { PartsOrderController } from "../controllers/parts-order.controller";
import { UpdatePartsOrderUsecase } from "@application/usecases/parts-order/update-parts-order-usecase";
import { DeletePartsOrderUsecase } from "@application/usecases/parts-order/delete-parts-order-usecase";
import { DeliverPartsOrderUsecase } from "@application/usecases/parts-order/deliver-parts-order-usecase";
import { GetPartsOrderUsecase } from "@application/usecases/parts-order/get-parts-order-usecase";
import { GetPartsOrdersInDeliveryUsecase } from "@application/usecases/parts-order/get-parts-orders-in-delivery-usecase";
import { GetPartsOrdersDeliveredUsecase } from "@application/usecases/parts-order/get-parts-orders-delivered-usecase";
import { CreatePartsOrderCommandHandler } from "@application/command/handlers/create-parts-order.command-handler";
import { UpdatePartsOrderCommandHandler } from "@application/command/handlers/update-parts-order.command-handler";
import { DeliverPartsOrderCommandHandler } from "@application/command/handlers/deliver-parts-order.command-handler";
import { DeletePartsOrderCommandHandler } from "@application/command/handlers/delete-parts-order.command-handler";
import { GetPartsOrderQueryHandler } from "@application/queries/handlers/get-parts-order.query-handler";
import { GetPartsOrdersInDeliveryQueryHandler } from "@application/queries/handlers/get-parts-orders-in-delivery.query-handler";
import { GetPartsOrdersDeliveredQueryHandler } from "@application/queries/handlers/get-parts-orders-delivered.query-handler";

const partsOrderInjectionUsecases: Provider[] = [
	{
		provide: CreatePartsOrderUsecase,
		useFactory: (
			sparePartRepository: SparePartRepository,
			partsOrderRepository: IPartsOrderRepository,
			partsOrderSparePartsRepository: IPartsOrderSparePartsRepository,
			eventStoreRepository: EventStoreRepository,
		) => new CreatePartsOrderUsecase(
			sparePartRepository,
			partsOrderRepository,
			partsOrderSparePartsRepository,
			eventStoreRepository,
		),
		inject: [
			SPARE_PART_REPOSITORY_INTERFACE,
			PARTS_ORDER_REPOSITORY_INTERFACE,
			PARTS_ORDER_SPARE_PARTS_REPOSITORY_INTERFACE,
			EVENT_STORE_REPOSITORY_INTERFACE,
		],
	},
	{
		provide: UpdatePartsOrderUsecase,
		useFactory: (
			partsOrderRepository: IPartsOrderRepository,
			partsOrderSparePartsRepository: IPartsOrderSparePartsRepository,
			eventStoreRepository: EventStoreRepository,
			sparePartRepository: SparePartRepository,
		) => new UpdatePartsOrderUsecase(
			partsOrderRepository,
			partsOrderSparePartsRepository,
			eventStoreRepository,
			sparePartRepository,
		),
		inject: [
			PARTS_ORDER_REPOSITORY_INTERFACE,
			PARTS_ORDER_SPARE_PARTS_REPOSITORY_INTERFACE,
			EVENT_STORE_REPOSITORY_INTERFACE,
			SPARE_PART_REPOSITORY_INTERFACE,
		],
	},
	{
		provide: DeletePartsOrderUsecase,
		useFactory: (
			partsOrderRepository: IPartsOrderRepository,
			eventStoreRepository: EventStoreRepository,
		) => new DeletePartsOrderUsecase(
			partsOrderRepository,
			eventStoreRepository,
		),
		inject: [
			PARTS_ORDER_REPOSITORY_INTERFACE,
			EVENT_STORE_REPOSITORY_INTERFACE,
		],
	},
	{
		provide: DeliverPartsOrderUsecase,
		useFactory: (
			partsOrderRepository: IPartsOrderRepository,
			eventStoreRepository: EventStoreRepository,
			sparePartRepository: SparePartRepository,
		) => new DeliverPartsOrderUsecase(
			partsOrderRepository,
			eventStoreRepository,
			sparePartRepository,
		),
		inject: [
			PARTS_ORDER_REPOSITORY_INTERFACE,
			EVENT_STORE_REPOSITORY_INTERFACE,
			SPARE_PART_REPOSITORY_INTERFACE,
		],
	},
	{
		provide: GetPartsOrderUsecase,
		useFactory: (
			partsOrderRepository: IPartsOrderRepository,
		) => new GetPartsOrderUsecase(
			partsOrderRepository,
		),
		inject: [PARTS_ORDER_REPOSITORY_INTERFACE],
	},
	{
		provide: GetPartsOrdersInDeliveryUsecase,
		useFactory: (
			partsOrderRepository: IPartsOrderRepository,
		) => new GetPartsOrdersInDeliveryUsecase(
			partsOrderRepository,
		),
		inject: [PARTS_ORDER_REPOSITORY_INTERFACE],
	},
	{
		provide: GetPartsOrdersDeliveredUsecase,
		useFactory: (
			partsOrderRepository: IPartsOrderRepository,
		) => new GetPartsOrdersDeliveredUsecase(
			partsOrderRepository,
		),
		inject: [PARTS_ORDER_REPOSITORY_INTERFACE],
	},
];
const commandHandlers: Provider[] = [
	CreatePartsOrderCommandHandler,
	UpdatePartsOrderCommandHandler,
	DeliverPartsOrderCommandHandler,
	DeletePartsOrderCommandHandler,
];
const queryHandlers: Provider[] = [
	GetPartsOrderQueryHandler,
	GetPartsOrdersInDeliveryQueryHandler,
	GetPartsOrdersDeliveredQueryHandler,
];

@Module({
	imports: [
		CqrsModule,
		AuthModule,
		InterfaceInjectionModule,
	],
	controllers: [PartsOrderController],
	providers: [
		...partsOrderInjectionUsecases,
		...commandHandlers,
		...queryHandlers,
	],
})
export class PartsOrderModule {}
