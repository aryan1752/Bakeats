const nodemailer = require("nodemailer");

async function testGmail() {
  const user = "aryan.sleek@gmail.com";
  const pass = "zhvzpykygxziyhne";

  console.log("Testing Gmail SMTP connection for:", user);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"KVI Test" <${user}>`,
      to: "aryan.sleek@gmail.com",
      subject: "Test Verification Code 123456",
      text: "Test email from Knowledge Venture Institute"
    });
    console.log("SUCCESS! Message sent. ID:", info.messageId);
  } catch (err) {
    console.error("GMAIL SMTP ERROR DETAIL:", err.message);
    console.error("FULL ERROR OBJECT:", err);
  }
}

testGmail();
