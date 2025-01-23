export class DriverFullName {
	public constructor(
		public readonly value: string,
	) {}

	public static from(
		firstName: string,
		lastName: string,
	) {
		return new DriverFullName(`${firstName} ${lastName}`);
	}
}
