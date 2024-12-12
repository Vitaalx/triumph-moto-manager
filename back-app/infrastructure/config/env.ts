import { config as importEnvFile } from "dotenv";
import { expand as expandEnv } from "dotenv-expand";
import { z } from "zod";

const DEFAULT_PORT = 1506;
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
		PORT: z.coerce.number().default(DEFAULT_PORT),
		HOST: z.string().default(DEFAULT_HOST),
		ENVIRONMENT: z.enum(["DEV", "PROD", "TEST"]).default(DEFAULT_ENVIRONMENT),
		JWT_KEY: z.string(),
		JWT_TIME: z.string(),
		ORIGIN: z.string().url(),
	})
	.readonly()
	.parse(process.env);
