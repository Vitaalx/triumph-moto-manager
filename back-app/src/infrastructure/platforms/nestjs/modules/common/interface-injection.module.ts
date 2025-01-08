import { Module } from "@nestjs/common";

/**
 * Map permettant de lier les interfaces des services et des repositories avec leurs réelles implémentations.
 */
export const interfaceInjectionMap = [];

@Module({
	imports: [],
	providers: [...interfaceInjectionMap],
	exports: [...interfaceInjectionMap],
})
export class InterfaceInjectionModule {
}
