import { connectToDatabase } from "./mongodb";
import { Review } from "./schemas";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type ReviewRow = {
  id: string;
  name: string;
  message: string;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
  submit_ip: string | null;
  moderation_token: string;
};

export async function createPendingReview(input: {
  name: string;
  message: string;
  submitIp?: string | null;
  moderationToken: string;
}): Promise<string> {
  await connectToDatabase();
  const review = new Review({
    name: input.name.trim(),
    message: input.message.trim(),
    submit_ip: input.submitIp ?? null,
    moderation_token: input.moderationToken,
    status: "pending",
  });
  const saved = await review.save();
  return saved._id.toString();
}

export async function getApprovedReviews(limit = 50): Promise<ReviewRow[]> {
  await connectToDatabase();
  const docs = await Review.find({ status: "approved" })
    .sort({ approved_at: -1, created_at: -1 })
    .limit(limit)
    .lean();

  return docs.map((doc: any) => ({
    id: doc._id.toString(),
    name: doc.name,
    message: doc.message,
    status: doc.status as ReviewStatus,
    created_at: doc.created_at ? doc.created_at.toISOString() : "",
    updated_at: doc.updated_at ? doc.updated_at.toISOString() : "",
    approved_at: doc.approved_at ? doc.approved_at.toISOString() : null,
    submit_ip: doc.submit_ip || null,
    moderation_token: doc.moderation_token,
  }));
}

export async function moderateReviewByToken(params: {
  token: string;
  action: "approve" | "reject";
}): Promise<boolean> {
  await connectToDatabase();
  const status: ReviewStatus = params.action === "approve" ? "approved" : "rejected";
  const update: any = {
    status,
    updated_at: new Date(),
  };
  if (status === "approved") {
    update.approved_at = new Date();
  }

  const result = await Review.updateOne(
    { moderation_token: params.token },
    { $set: update }
  );

  return result.modifiedCount > 0;
}

export async function findRecentPendingByIp(
  ip: string,
  withinSeconds: number
): Promise<boolean> {
  await connectToDatabase();
  const cutOff = new Date(Date.now() - withinSeconds * 1000);
  const count = await Review.countDocuments({
    submit_ip: ip,
    created_at: { $gte: cutOff },
  });

  return count > 0;
}
