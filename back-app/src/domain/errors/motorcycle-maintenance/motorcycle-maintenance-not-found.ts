export class MotorcycleMaintenanceNotFoundError extends Error {
	public constructor() {
		super("motorcycleMaintenance.notFound");
	}
}
