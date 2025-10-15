import { PrismaClient } from "@/generated/prisma";

// Ensure a single Prisma client instance across hot-reloads in development.
// In production (serverless/edge), the module is cached per bundle instance.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
