// Quick test script for Google login action flow
const { loginWithGoogleAction } = require('../app/lib/coaching-actions');

async function testGoogleLogin() {
  console.log("Testing Google login server action...");
  try {
    const res = await loginWithGoogleAction({
      name: "Aryan Jha",
      email: "jharozy24@gmail.com"
    });
    console.log("RESULT:", res);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

testGoogleLogin();
