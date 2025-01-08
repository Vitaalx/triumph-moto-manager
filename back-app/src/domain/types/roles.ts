const Role: {
	ADMIN: "ADMIN";
	FLEET_MANAGER: "FLEET_MANAGER";
} = {
	ADMIN: "ADMIN",
	FLEET_MANAGER: "FLEET_MANAGER",
};

export type Role = (typeof Role)[keyof typeof Role];
