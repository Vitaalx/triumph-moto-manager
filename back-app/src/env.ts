import { config as importEnvFile } from "dotenv";
import { expand as expandEnv } from "dotenv-expand";
import { z } from "zod";

declare global {
	const ENV: (typeof import("./env"))["default"];
}

for (const pathEnv of [".env.local", ".env"]) {
	expandEnv(
		importEnvFile({ path: pathEnv })
	);
}

//@ts-expect-error var 'global' cause type error.
export default global.ENV = z
	.object({
		PORT: z.coerce.number().default(1506),
		HOST: z.string().default("0.0.0.0"),
		ENVIRONMENT: z.enum(["DEV", "PROD", "TEST"]).default("DEV"),
		MONGO_DATABASE_URL: z.string(),
		JWT_KEY: z.string(),
		JWT_TIME: z.string(),
		ORIGIN: z.string().url(),
	})
	.readonly()
	.parse(process.env);
