import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptPasswordService {
	private readonly SALT_ROUNDS = 10;

	public async compare(password: string, hash: string): Promise<boolean> {
		const matched = await bcrypt.compare(password, hash);
		if (!matched) {
			return false;
		}
		return true;
	}

	public hash(password: string): Promise<string> {
		return bcrypt.hash(password, this.SALT_ROUNDS);
	}
}
