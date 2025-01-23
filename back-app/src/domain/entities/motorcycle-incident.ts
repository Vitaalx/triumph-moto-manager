export class MotorcycleIncidentEntity {
	public constructor(
		public id: string,
		public description: string,
		public motorcycleId: string,
		public driverId: string,
	) {
	}
}
