export class MotorcycleTryEntity {
	public constructor(
		public id: string,
		public driverId: string,
		public motorcycleId: string,
		public startDate: Date,
		public endDate: Date,
	) {
	}
}
