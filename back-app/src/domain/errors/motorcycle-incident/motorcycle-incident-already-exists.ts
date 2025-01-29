export class MotorcycleIncidentAlreadyExistsError extends Error {
	public constructor() {
		super("motorcycleIncident.alreadyExists");
	}
}
