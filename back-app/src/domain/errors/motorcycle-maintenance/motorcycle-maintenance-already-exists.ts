export class MotorcycleMaintenanceAlreadyExistsError extends Error {
	public constructor() {
		super("motorcycleMaintenance.alreadyExists");
	}
}
