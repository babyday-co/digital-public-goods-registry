"use client";

import { useState } from "react";

interface FormState {
  title: string;
  contributor: string;
  content: string;
}

export default function KnowledgeForm() {
  const [form, setForm] = useState<FormState>({
    title: "",
    contributor: "",
    content: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Submission failed.");
        return;
      }

      setStatus("success");
      setMessage(
        `Knowledge registered! Content hash: ${data.entry.contentHash.slice(0, 16)}…`
      );
      setForm({ title: "", contributor: "", content: "" });
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="e.g. Safe Sleep Guidelines for Newborns"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contributor Name
        </label>
        <input
          type="text"
          name="contributor"
          value={form.contributor}
          onChange={handleChange}
          required
          placeholder="e.g. Dr. Amara Osei"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Knowledge Content
        </label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Enter the full knowledge content here…"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {status === "loading" ? "Registering…" : "Register Knowledge"}
      </button>

      {status === "success" && (
        <p className="text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2 text-sm">
          ✅ {message}
        </p>
      )}
      {status === "error" && (
        <p className="text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-sm">
          ❌ {message}
        </p>
      )}
    </form>
  );
}
