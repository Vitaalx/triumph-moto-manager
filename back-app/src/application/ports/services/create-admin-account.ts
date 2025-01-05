export interface ICreateAdminAccount {
	createAdminAccount(email: string, password: string): Promise<void>;
}

export const CREATE_ADMIN_ACCOUNT_INTERFACE = Symbol("ICreateAdminAccount");
