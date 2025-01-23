import { type IDriverRepository } from "@application/ports/repositories/driver";
import { type DriverSheetEntity } from "@domain/entities/driver-sheet";

export class GetDriversUseCase {
	public constructor(private readonly driverRepository: IDriverRepository) {
	}

	public async execute(): Promise<DriverSheetEntity[]> {
		return this.driverRepository.getDrivers();
	}
}
