import path from "path";
import { PrismaClient } from "@/app/generated/prisma/client";

// Resolve relative SQLite paths so they work correctly in both development
// and production, regardless of where the Next.js server's CWD is.
// Prisma CLI places the database relative to the schema file (prisma/),
// so we resolve relative to that directory at runtime too.
function getDatasourceUrl(): string {
  const envUrl = process.env.DATABASE_URL ?? "";
  if (!envUrl.startsWith("file:./") && !envUrl.startsWith("file:../")) {
    // Already absolute or uses a URI scheme — pass through unchanged.
    return envUrl;
  }
  const relativePath = envUrl.replace(/^file:/, "");
  // Resolve relative to <project_root>/prisma/, matching Prisma CLI's convention.
  const prismaDir = path.join(process.cwd(), "prisma");
  const absolutePath = path.resolve(prismaDir, relativePath);
  return `file:${absolutePath}`;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: { db: { url: getDatasourceUrl() } },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
