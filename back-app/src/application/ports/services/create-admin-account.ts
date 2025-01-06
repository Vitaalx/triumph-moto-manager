export interface ICreateAdminAccount {
	createAdminAccount(email: string, password: string): Promise<void>;
}
