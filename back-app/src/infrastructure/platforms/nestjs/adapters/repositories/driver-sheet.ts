import { type IDriverRepository } from "@application/ports/repositories/driver";
import { type DriverSheetEntity } from "@domain/entities/driver-sheet";
import { DriverSheetMapper } from "../../mappers/driver-sheet";
import { Injectable } from "@nestjs/common";
import { DriverSheetWithDetailsMapper } from "../../mappers/driver-sheet-with-details";
import { Email } from "@domain/types/email";

@Injectable()
export class DriverRepository implements IDriverRepository {
	public constructor(
		private readonly driverSheetMapper: DriverSheetMapper,
		private readonly driverSheetWithDetailsMapper: DriverSheetWithDetailsMapper,
	) {}

	public async updateById(id: string, driver: DriverSheetEntity): Promise<void> {
		await prisma.driverSheet.update({
			where: {
				id,
			},
			data: {
				age: driver.age.value,
				email: driver.email.value,
				motorcycleLicenseType: driver.motorcycleLicenseType.value,
				drivingExperience: driver.drivingExperience,
			},
		});
	}

	public async findByEmail(email: Email): Promise<DriverSheetEntity | null> {
		const driver = await prisma.driverSheet.findUnique({
			where: {
				email: email.value,
			},
		});
		if (driver === null) {
			return null;
		}
		return this.driverSheetMapper.toDomainEntity(driver);
	}

	public async save(driver: DriverSheetEntity): Promise<void> {
		await prisma.driverSheet.create({
			data: {
				id: driver.id,
				fullName: driver.fullName.value,
				age: driver.age.value,
				email: driver.email.value,
				motorcycleLicenseType: driver.motorcycleLicenseType.value,
				drivingExperience: driver.drivingExperience,
			},
		});
	}

	public async findById(id: string): Promise<DriverSheetEntity | null> {
		const driver = await prisma.driverSheet.findUnique({
			where: {
				id,
			},
			include: {
				motorcycles: true,
				motorcycleTries: true,
				motorcycleIncidents: true,
			},
		});

		if (driver === null) {
			return null;
		}
		return this.driverSheetWithDetailsMapper.toDomainEntity(driver);
	}

	public async getDrivers(): Promise<DriverSheetEntity[]> {
		const drivers = await prisma.driverSheet.findMany({
			include: {
				motorcycles: true,
				motorcycleTries: true,
				motorcycleIncidents: true,
			},
		});
		return drivers.map((driver) => this.driverSheetWithDetailsMapper.toDomainEntity(driver));
	}

	public async delete(driver: DriverSheetEntity): Promise<void> {
		await prisma.driverSheet.delete({
			where: {
				id: driver.id,
			},
		});
	}
}
