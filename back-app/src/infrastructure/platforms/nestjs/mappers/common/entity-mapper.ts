export interface EntityMapper<
	T,
	U,
> {
	toDomainEntity(entity: T): U;
}
