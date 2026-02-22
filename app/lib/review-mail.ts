import nodemailer from "nodemailer";

export async function sendReviewModerationMail(input: {
  name: string;
  message: string;
  approveUrl: string;
  rejectUrl: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.REVIEW_ADMIN_EMAIL;
  const from = process.env.REVIEW_FROM_EMAIL || user;

  if (!host || !user || !pass || !to || !from) {
    console.warn("[reviews] SMTP not fully configured. Skipping admin email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `New review pending approval - ${input.name}`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h2>New testimonial review submitted</h2>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(input.message)}</p>
      <p>
        <a href="${input.approveUrl}" style="display:inline-block;padding:10px 14px;background:#16a34a;color:#fff;text-decoration:none;border-radius:6px;margin-right:8px;">Approve</a>
        <a href="${input.rejectUrl}" style="display:inline-block;padding:10px 14px;background:#dc2626;color:#fff;text-decoration:none;border-radius:6px;">Reject</a>
      </p>
      <p style="font-size:12px;color:#666">These links are token-protected moderation actions.</p>
    </div>
  `;

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
