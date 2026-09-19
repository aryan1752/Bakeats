const nodemailer = require("nodemailer");

async function testMail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "knowledgeventureinstitute@gmail.com",
      pass: "yykf dzai oaej famt"
    }
  });

  try {
    const info = await transporter.sendMail({
      from: '"Knowledge Venture Institute" <knowledgeventureinstitute@gmail.com>',
      to: "knowledgeventureinstitute@gmail.com",
      subject: "🔐 Test Verification OTP - Knowledge Venture Institute",
      html: "<h3>Your test OTP is: 123456</h3>"
    });
    console.log("SUCCESS! Message ID:", info.messageId);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

testMail();
