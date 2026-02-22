import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type ReviewRow = {
  id: number;
  name: string;
  message: string;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
  submit_ip: string | null;
  moderation_token: string;
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "reviews.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('pending','approved','rejected')) DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  approved_at TEXT,
  submit_ip TEXT,
  moderation_token TEXT NOT NULL UNIQUE
);

CREATE INDEX IF NOT EXISTS idx_reviews_status_created
ON reviews(status, created_at DESC);
`);

export function createPendingReview(input: {
  name: string;
  message: string;
  submitIp?: string | null;
  moderationToken: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO reviews (name, message, status, submit_ip, moderation_token)
    VALUES (?, ?, 'pending', ?, ?)
  `);

  const info = stmt.run(
    input.name.trim(),
    input.message.trim(),
    input.submitIp ?? null,
    input.moderationToken,
  );

  return Number(info.lastInsertRowid);
}

export function getApprovedReviews(limit = 50): ReviewRow[] {
  const stmt = db.prepare(`
    SELECT id, name, message, status, created_at, updated_at, approved_at, submit_ip, moderation_token
    FROM reviews
    WHERE status = 'approved'
    ORDER BY approved_at DESC, created_at DESC
    LIMIT ?
  `);

  return stmt.all(limit) as ReviewRow[];
}

export function moderateReviewByToken(params: { token: string; action: "approve" | "reject" }) {
  const status: ReviewStatus = params.action === "approve" ? "approved" : "rejected";
  const stmt = db.prepare(`
    UPDATE reviews
    SET status = ?,
        approved_at = CASE WHEN ? = 'approved' THEN datetime('now') ELSE approved_at END,
        updated_at = datetime('now')
    WHERE moderation_token = ?
  `);

  const info = stmt.run(status, status, params.token);
  return info.changes > 0;
}

export function findRecentPendingByIp(ip: string, withinSeconds: number): boolean {
  const stmt = db.prepare(`
    SELECT id
    FROM reviews
    WHERE submit_ip = ?
      AND created_at >= datetime('now', ?)
    LIMIT 1
  `);

  const row = stmt.get(ip, `-${withinSeconds} seconds`) as { id: number } | undefined;
  return Boolean(row);
}
