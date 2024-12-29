export class UpdateMaintenanceIntervalCommand {
	public constructor(
		public motorcycleId: string,
		public maintenanceInterval: string,
	) {}
}
