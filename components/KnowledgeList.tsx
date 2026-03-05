interface KnowledgeEntry {
  id: number;
  title: string;
  contributor: string;
  contentHash: string;
  txHash: string | null;
  createdAt: string;
}

interface KnowledgeListProps {
  entries: KnowledgeEntry[];
}

export default function KnowledgeList({ entries }: KnowledgeListProps) {
  if (entries.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No knowledge entries registered yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">{entry.title}</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                By {entry.contributor}
              </p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {new Date(entry.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-3 space-y-1">
            <p className="text-xs text-gray-500">
              <span className="font-medium text-gray-700">Content Hash:</span>{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded break-all">
                {entry.contentHash}
              </code>
            </p>

            {entry.txHash ? (
              <p className="text-xs text-gray-500">
                <span className="font-medium text-gray-700">Tx Hash:</span>{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${entry.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {entry.txHash.slice(0, 18)}…
                </a>
              </p>
            ) : (
              <p className="text-xs text-gray-400 italic">
                Blockchain registration pending / demo mode
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
