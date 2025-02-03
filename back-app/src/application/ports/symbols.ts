/**
 * Symbols permettant l'injection des interfaces dans une plateforme.
 */
export const USER_REPOSITORY_INTERFACE = Symbol("IUserRepository");
export const CREATE_ADMIN_ACCOUNT_INTERFACE = Symbol("ICreateAdminAccount");
export const MOTORCYCLE_REPOSITORY_INTERFACE = Symbol("IMotorcycleRepository");
export const EVENT_STORE_REPOSITORY_INTERFACE = Symbol("IEventStoreRepository");
export const DRIVER_REPOSITORY_INTERFACE = Symbol("IDriverRepository");
export const MOTORCYCLE_TRY_REPOSITORY_INTERFACE = Symbol("IMotorcycleTryRepository");
export const MOTORCYCLE_INCIDENT_REPOSITORY_INTERFACE = Symbol("IMotorcycleIncidentRepository");
export const MOTORCYCLE_MAINTENANCE_REPOSITORY_INTERFACE = Symbol("IMotorcycleMaintenanceRepository");
export const SPARE_PART_REPOSITORY_INTERFACE = Symbol("ISparePartRepository");
export const MAINTENANCE_SPARE_PART_REPOSITORY_INTERFACE = Symbol("IMaintenanceSparePartRepository");
