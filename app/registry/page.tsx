import { prisma } from "@/lib/prisma";
import KnowledgeList from "@/components/KnowledgeList";
import Link from "next/link";

export const metadata = {
  title: "Knowledge Registry | BabyDay Registry",
};

export const dynamic = "force-dynamic";

export default async function RegistryPage() {
  const entries = await prisma.knowledge.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      contributor: true,
      contentHash: true,
      txHash: true,
      createdAt: true,
    },
  });

  // Serialize dates to strings for client components
  const serialized = entries.map((e) => ({
    ...e,
    createdAt: e.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Knowledge Registry
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {entries.length} registered{" "}
            {entries.length === 1 ? "entry" : "entries"}
          </p>
        </div>
        <Link
          href="/submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Submit New
        </Link>
      </div>

      <KnowledgeList entries={serialized} />
    </div>
  );
}
