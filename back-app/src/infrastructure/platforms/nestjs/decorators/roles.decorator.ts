import { SetMetadata } from "@nestjs/common";
import { type Role } from "@prisma/client";

export function RequiredRoles(...roles: Role[]): MethodDecorator {
	return SetMetadata(RequiredRoles, roles);
}
