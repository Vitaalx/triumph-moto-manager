export class MotorcycleIncidentNotFoundError extends Error {
	public constructor() {
		super("motorcycleIncident.notFound");
	}
}
