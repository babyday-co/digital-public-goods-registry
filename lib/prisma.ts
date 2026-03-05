import path from "path";
import { PrismaClient } from "@/app/generated/prisma/client";

// Resolve the database path to an absolute path so Prisma can find it
// regardless of the working directory when the server starts.
function getDatasourceUrl(): string {
  const envUrl = process.env.DATABASE_URL ?? "";
  // If the URL is already absolute (starts with file:/) or uses a custom
  // scheme, pass it through unchanged.
  if (!envUrl.startsWith("file:./") && !envUrl.startsWith("file:../")) {
    return envUrl;
  }
  // Resolve the relative part against the project root (one level above /app)
  const relativePath = envUrl.replace(/^file:/, "");
  const absolutePath = path.resolve(process.cwd(), relativePath);
  return `file:${absolutePath}`;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: { db: { url: getDatasourceUrl() } },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
