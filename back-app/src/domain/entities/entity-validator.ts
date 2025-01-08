import { InvalidGenericEntity } from "@domain/errors/invalid-generic-entity";
import { type ZodType, type infer as ZodInfer, ZodError } from "zod";

export class GenericEntity<
	GenericName extends string,
	GenericValue extends unknown,
> {
	public constructor(
		public readonly name: GenericName,
		public readonly value: GenericValue,
	) {}

	public static validate<GenericName extends string, GenericZodType extends ZodType>(
		name: GenericName,
		zodSchema: GenericZodType,
		value: unknown,
	) {
		const { success, data, error } = zodSchema.safeParse(value);

		if (!success) {
			const { path, message } = error.errors.shift()!;
			const inputError = path.join(".");
			return new InvalidGenericEntity(inputError, message);
		}

		return new GenericEntity<
			GenericName,
			ZodInfer<GenericZodType>
		>(name, <never>data);
	}
}

export function inputValidation<
	GenericName extends string,
	GenericZodType extends ZodType,
>(
	name: GenericName,
	zodSchema: GenericZodType,
) {
	return {
		name,
		zodSchema,
		create(value: unknown) {
			return GenericEntity.validate(name, zodSchema, value);
		},
		createOrThrow(value: unknown) {
			const valueObject = GenericEntity.validate(name, zodSchema, value);

			if (valueObject instanceof ZodError) {
				throw valueObject;
			}

			return valueObject;
		},
	};
}
