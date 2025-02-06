import { Module, Provider } from "@nestjs/common";

import { DRIVER_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE, MAINTENANCE_SPARE_PART_REPOSITORY_INTERFACE, MOTORCYCLE_INCIDENT_REPOSITORY_INTERFACE, MOTORCYCLE_MAINTENANCE_REPOSITORY_INTERFACE, MOTORCYCLE_REPOSITORY_INTERFACE, MOTORCYCLE_TRY_REPOSITORY_INTERFACE, PARTS_ORDER_REPOSITORY_INTERFACE, PARTS_ORDER_SPARE_PARTS_REPOSITORY_INTERFACE, SPARE_PART_REPOSITORY_INTERFACE } from "@application/ports/symbols";
import { MotorcycleRepository } from "@nestjs@repositories/motorcycle";
import { MotorcycleMapper } from "../../mappers/motorcycle";
import { EventStoreRepository } from "../../adapters/repositories/event-store";
import { DriverRepository } from "../../adapters/repositories/driver-sheet";
import { DriverSheetMapper } from "../../mappers/driver-sheet";
import { DriverSheetWithDetailsMapper } from "../../mappers/driver-sheet-with-details";
import { MotorcycleTryRepository } from "../../adapters/repositories/motorcycle-try";
import { MotorcycleTryMapper } from "../../mappers/motorcycle-try";
import mongoose from "mongoose";
import { MotorcycleIncidentRepository } from "../../adapters/repositories/motorcycle-incident";
import { MotorcycleIncidentMapper } from "../../mappers/motorcycle-incident";
import { SparePartRepository } from "../../adapters/repositories/spare-part";
import { MotorcycleMaintenanceRepository } from "../../adapters/repositories/motorcycle-maintenance";
import { MotorcycleMaintenanceMapper } from "../../mappers/motorcycle-maintenance";
import { SparePartMapper } from "../../mappers/spare-part";
import { MaintenanceSparePartRepository } from "../../adapters/repositories/maintenance-spare-part";
import { PartsOrderRepository } from "../../adapters/repositories/parts-order";
import { PartsOrderSparePartsRepository } from "../../adapters/repositories/parts-order-spare-parts";
import { PartsOrderMapper } from "../../mappers/parts-order";

/**
 * Map permettant de lier les interfaces des services et des repositories avec leurs réelles implémentations.
 */
const interfaceInjectionMap: Provider[] = [
	{
		provide: MOTORCYCLE_REPOSITORY_INTERFACE,
		useClass: MotorcycleRepository,
	},
	{
		provide: EVENT_STORE_REPOSITORY_INTERFACE,
		useClass: EventStoreRepository,
	},
	{
		provide: DRIVER_REPOSITORY_INTERFACE,
		useClass: DriverRepository,
	},
	{
		provide: MOTORCYCLE_TRY_REPOSITORY_INTERFACE,
		useClass: MotorcycleTryRepository,
	},
	{
		provide: MOTORCYCLE_INCIDENT_REPOSITORY_INTERFACE,
		useClass: MotorcycleIncidentRepository,
	},
	{
		provide: SPARE_PART_REPOSITORY_INTERFACE,
		useClass: SparePartRepository,
	},
	{
		provide: MOTORCYCLE_MAINTENANCE_REPOSITORY_INTERFACE,
		useClass: MotorcycleMaintenanceRepository,
	},
	{
		provide: MAINTENANCE_SPARE_PART_REPOSITORY_INTERFACE,
		useClass: MaintenanceSparePartRepository,
	},
	{
		provide: PARTS_ORDER_REPOSITORY_INTERFACE,
		useClass: PartsOrderRepository,
	},
	{
		provide: PARTS_ORDER_SPARE_PARTS_REPOSITORY_INTERFACE,
		useClass: PartsOrderSparePartsRepository,
	},
];

const mongooseProvider: Provider = {
	provide: "MONGOOSE_CONNECTION",
	useFactory: async() => {
		const mongooseConnection = await mongoose.connect(
			ENV.MONGO_DATABASE_URL,
			{
				dbName: "mongo",
			},
		);
		//@ts-expect-error var 'global' cause type error.
		global.mongoose = mongooseConnection;
		return mongooseConnection;
	},
};

const entityMappers = [
	MotorcycleMapper,
	DriverSheetMapper,
	DriverSheetWithDetailsMapper,
	MotorcycleTryMapper,
	MotorcycleIncidentMapper,
	MotorcycleMaintenanceMapper,
	SparePartMapper,
	PartsOrderMapper,
];

@Module({
	providers: [
		...interfaceInjectionMap,
		...entityMappers,
		mongooseProvider,
	],
	exports: [...interfaceInjectionMap],
})
export class InterfaceInjectionModule {
}
