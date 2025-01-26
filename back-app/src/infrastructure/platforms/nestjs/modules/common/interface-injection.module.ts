import { Module, Provider } from "@nestjs/common";

import { DRIVER_REPOSITORY_INTERFACE, EVENT_STORE_REPOSITORY_INTERFACE, MOTORCYCLE_REPOSITORY_INTERFACE, MOTORCYCLE_TRY_REPOSITORY_INTERFACE } from "@application/ports/symbols";
import { MotorcycleRepository } from "@nestjs@repositories/motorcycle";
import { MotorcycleMapper } from "../../mappers/motorcycle";
import { EventStoreRepository } from "../../adapters/repositories/event-store";
import { DriverRepository } from "../../adapters/repositories/driver-sheet";
import { DriverSheetMapper } from "../../mappers/driver-sheet";
import { DriverSheetWithDetailsMapper } from "../../mappers/driver-sheet-with-details";
import { MotorcycleTryRepository } from "../../adapters/repositories/motorcycle-try";
import { MotorcycleTryMapper } from "../../mappers/motorcycle-try";

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
];

const entityMappers = [
	MotorcycleMapper,
	DriverSheetMapper,
	DriverSheetWithDetailsMapper,
	MotorcycleTryMapper,
];

@Module({
	providers: [
		...interfaceInjectionMap,
		...entityMappers,
	],
	exports: [...interfaceInjectionMap],
})
export class InterfaceInjectionModule {
}
