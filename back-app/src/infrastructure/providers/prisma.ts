/* eslint-disable no-multi-assign */
import { PrismaClient } from "@prisma/client";

declare global {
	const prisma: PrismaClient;
}

//@ts-expect-error var 'global' cause type error.
export const prisma = global.prisma = new PrismaClient();
