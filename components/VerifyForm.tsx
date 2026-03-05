"use client";

import { useState } from "react";

interface VerifyResult {
  verified: boolean;
  contentHash: string;
  entry?: {
    title: string;
    contributor: string;
    txHash: string | null;
    createdAt: string;
  };
}

export default function VerifyForm() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Verification failed.");
        return;
      }

      setResult(data);
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paste Knowledge Content to Verify
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            placeholder="Paste the exact content you want to verify…"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {status === "loading" ? "Verifying…" : "Verify Content"}
        </button>
      </form>

      {status === "error" && (
        <p className="text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-sm">
          ❌ {errorMsg}
        </p>
      )}

      {result && (
        <div
          className={`rounded-lg p-4 border ${
            result.verified
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          {result.verified ? (
            <div>
              <p className="font-semibold text-green-800 text-sm">
                ✅ Verified: content matches a registered blockchain record.
              </p>
              {result.entry && (
                <div className="mt-2 space-y-1 text-xs text-green-700">
                  <p>
                    <span className="font-medium">Title:</span>{" "}
                    {result.entry.title}
                  </p>
                  <p>
                    <span className="font-medium">Contributor:</span>{" "}
                    {result.entry.contributor}
                  </p>
                  <p>
                    <span className="font-medium">Registered:</span>{" "}
                    {new Date(result.entry.createdAt).toLocaleString()}
                  </p>
                  {result.entry.txHash && (
                    <p>
                      <span className="font-medium">Tx Hash:</span>{" "}
                      <a
                        href={`https://sepolia.etherscan.io/tx/${result.entry.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline break-all"
                      >
                        {result.entry.txHash}
                      </a>
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="font-semibold text-red-800 text-sm">
              ❌ Not Verified: content does not match any registered entry.
            </p>
          )}

          <p className="mt-2 text-xs text-gray-500 break-all">
            <span className="font-medium">SHA-256 Hash:</span>{" "}
            <code>{result.contentHash}</code>
          </p>
        </div>
      )}
    </div>
  );
}
