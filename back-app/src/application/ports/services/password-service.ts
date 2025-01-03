export interface PasswordService {
	compare(password: string, hash: string): Promise<boolean>;
	hash(password: string): Promise<string>;
}

export const PASSWORD_SERVICE_INTERFACE = Symbol("PasswordService");
