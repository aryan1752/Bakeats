"use client";

import { useMemo, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function AddReviewModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const words = useMemo(() => countWords(message), [message]);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !message.trim()) {
      setError("Please fill all fields.");
      return;
    }

    if (words > 30) {
      setError("Review must be 30 words or less.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, website }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to submit");
        return;
      }

      setSuccess("Review submitted! It will appear after admin approval.");
      setName("");
      setMessage("");
      setWebsite("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-black p-5 text-white shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Add Review</h3>
          <button onClick={onClose} className="rounded bg-white/10 px-2 py-1 text-sm">✕</button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-white/80">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 outline-none focus:border-white/50"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/80">Review Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 outline-none focus:border-white/50"
              placeholder="Write your review (max 30 words)"
            />
            <div className={`mt-1 text-right text-xs ${words > 30 ? "text-red-400" : "text-white/60"}`}>
              {words}/30 words
            </div>
          </div>

          <input
            type="text"
            autoComplete="off"
            tabIndex={-1}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-white px-4 py-2 font-medium text-black disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
