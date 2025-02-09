import { config as importEnvFile } from "dotenv";
import { expand as expandEnv } from "dotenv-expand";
import { z } from "zod";

const NEST_DEFAULT_PORT = 1506;
const FASTIFY_DEFAULT_PORT = 3000;
const DEFAULT_HOST = "0.0.0.0";
const DEFAULT_ENVIRONMENT = "DEV";

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	const ENV: (typeof import("./env"))["default"];
}

for (const pathEnv of [".env.local", ".env"]) {
	expandEnv(
		importEnvFile({ path: pathEnv }),
	);
}

//@ts-expect-error var 'global' cause type error.
export default global.ENV = z
	.object({
		NEST_PORT: z.coerce.number().default(NEST_DEFAULT_PORT),
		NEST_HOST: z.string().default(DEFAULT_HOST),
		FASTIFY_PORT: z.coerce.number().default(FASTIFY_DEFAULT_PORT),
		FASTIFY_HOST: z.string().default(DEFAULT_HOST),
		ENVIRONMENT: z.enum(["DEV", "PROD", "TEST"]).default(DEFAULT_ENVIRONMENT),
		JWT_KEY: z.string(),
		JWT_TIME: z.string(),
		ORIGIN: z.string().url(),
		APP_ADMIN_EMAIL: z.string().email(),
		APP_ADMIN_PASSWORD: z.string().default("admin"),
		MONGO_DATABASE_URL: z.string(),
		BREVO_API_MAIL_URL: z.string().url(),
		BREVO_API_KEY: z.string(),
	})
	.readonly()
	.parse(process.env);
