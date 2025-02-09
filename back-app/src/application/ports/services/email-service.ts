import { type ErrorSendingMail } from "@domain/errors/error-sending-mail";

export interface MaintenanceMailParams {
	id: string;
	driverFullName: string;
	motorcycleId: string;
	technicalRecommendations: string;
	usedSpareParts: {
		name: string;
		quantity: number;
		price: number;
	}[];
	totalSparePartsPrice: number;
	totalMaintenancePrice: number;
	laborPrice: number;
	date: string;
}

export interface SparePartMailParams {
	reference: string;
	name: string;
	stock: number;
}

export interface MaintenanceReminderMailParams {
	driverFullName: string;
	motorcycle: {
		licensePlate: string;
		model: string;
		year: number;
		brand: string;
		maintenanceInterval: number;
		currentMileage: number;
	};
}

export interface IEmailService {
	sendMotorcycleMaintenance(params: MaintenanceMailParams, email: string): Promise<"sent" | ErrorSendingMail>;
	sendMotorcycleMaintenanceReminder(maintenance: MaintenanceReminderMailParams, email: string): Promise<"sent" | ErrorSendingMail>;
	sendSparePartLowStock(sparePart: SparePartMailParams): Promise<"sent" | ErrorSendingMail>;
}
