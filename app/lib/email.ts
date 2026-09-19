import nodemailer from "nodemailer";

export async function sendEmailOTP(toEmail: string, otp: string, userName?: string) {
  const smtpUser = process.env.SMTP_USER || "knowledgeventureinstitute@gmail.com";
  const smtpPass = process.env.SMTP_PASS || "yykfdzaioaejfamt";

  const mailOptions = {
    from: `"Knowledge Venture Institute" <${smtpUser}>`,
    to: toEmail,
    subject: `🔐 Your Verification Code: ${otp} - Knowledge Venture Institute`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; }
          .card { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e5e7eb; }
          .header { background: #0D2847; padding: 24px; text-align: center; }
          .header h2 { color: #F5BE18; margin: 0; font-size: 20px; letter-spacing: 1px; }
          .content { padding: 32px 24px; text-align: center; }
          .otp-box { font-size: 34px; font-weight: 900; letter-spacing: 12px; color: #0D2847; background: #FFF9E6; border: 2px dashed #F5BE18; border-radius: 12px; padding: 16px; margin: 24px 0; display: inline-block; width: 80%; }
          .footer { background: #f9fafb; padding: 16px; text-align: center; font-size: 11px; color: #6b7280; border-top: 1px solid #f3f4f6; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2>KNOWLEDGE VENTURE INSTITUTE</h2>
          </div>
          <div class="content">
            <h3 style="color: #111827; margin-top: 0;">Student Portal Verification</h3>
            <p style="color: #4b5563; font-size: 14px;">Hello ${userName || "Student"}, enter the 6-digit verification code below to access your account.</p>
            <div class="otp-box">${otp}</div>
            <p style="color: #9ca3af; font-size: 12px;">This code is valid for 5 minutes. If you did not request this email, please ignore it.</p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Knowledge Venture Institute. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    // Gmail Transport Service optimization
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const info = await transporter.sendMail(mailOptions);
    console.log(`[GMAIL SMTP DISPATCH SUCCESS] OTP ${otp} sent to ${toEmail}. Message ID: ${info.messageId}`);
    return { success: true, delivered: true };

  } catch (err: any) {
    console.error(`[GMAIL SMTP ERROR] Failed to deliver email to ${toEmail}:`, err);
    return { success: false, delivered: false, error: err.message || "Failed to deliver email" };
  }
}
