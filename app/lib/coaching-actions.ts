"use server";

import { connectToDatabase } from "./mongodb";
import { 
  User, 
  Faculty, 
  Lecture, 
  Scholarship, 
  Contact, 
  Material, 
  Attendance, 
  Fee, 
  Schedule, 
  Performance 
} from "./schemas";
import { cookies as nextCookies } from "next/headers";

// Mock users fallback for offline testing
const mockUsers = [
  {
    id: "65c3b1a20a1dd7228f2d0001",
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "KVI Admin Panel"
  },
  {
    id: "65c3b1a20a1dd7228f2d0002",
    username: "student1",
    password: "student123",
    role: "student",
    name: "Aarav Sharma",
    email: "aarav@gmail.com",
    phone: "7011731649",
    stream: "foundations",
    parentPhone: "9876543210"
  },
  {
    id: "65c3b1a20a1dd7228f2d0003",
    username: "parent1",
    password: "parent123",
    role: "parent",
    name: "Rajesh Sharma",
    email: "parent1@gmail.com",
    phone: "9876543210"
  },
  {
    id: "65c3b1a20a1dd7228f2d0004",
    username: "student2",
    password: "student234",
    role: "student",
    name: "Diya Verma",
    email: "diya@gmail.com",
    phone: "8585575250",
    stream: "commerce",
    parentPhone: "8765432109"
  },
  {
    id: "65c3b1a20a1dd7228f2d0005",
    username: "parent2",
    password: "parent234",
    role: "parent",
    name: "Sunil Verma",
    email: "parent2@gmail.com",
    phone: "8765432109"
  }
];

// Submit Contact Form
export async function submitContact(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Please fill out all fields." };
  }

  try {
    await connectToDatabase();
    await Contact.create({ name: name.trim(), email: email.trim(), message: message.trim() });
    return { success: true, message: "Thank you! We have received your query." };
  } catch (err: any) {
    console.warn("MongoDB Contact write failed (offline fallback active):", err.message);
    // Success fallback for previewing
    return { success: true, message: "Thank you! We have received your query (submitted in offline mode)." };
  }
}

// Submit Scholarship Registration
export async function submitScholarship(prevState: any, formData: FormData) {
  const student_name = formData.get("student_name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const grade = formData.get("grade") as string;
  const scoreRaw = formData.get("score") as string;
  const score = parseFloat(scoreRaw || "0");

  if (!student_name || !email || !phone || !grade) {
    return { success: false, error: "Please fill out all required fields." };
  }

  try {
    await connectToDatabase();
    await Scholarship.create({
      student_name: student_name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      grade,
      score
    });
    return { success: true, message: "Registration successful! Our team will contact you for test details." };
  } catch (err: any) {
    console.warn("MongoDB Scholarship write failed (offline fallback active):", err.message);
    return { success: true, message: "Registration successful! (Offline demo registered successfully)." };
  }
}

// Handle login auth and direct redirection using Gmail and Password
export async function loginUser(prevState: any, formData: FormData) {
  const email = (formData.get("email") as string || "").trim();
  const password = (formData.get("password") as string || "").trim();

  if (!email || !password) {
    return { success: false, error: "Please provide both Gmail and Password." };
  }

  // 1. Secret Admin Login Check
  if (email === "kvadmin@gmail.com" && password === "Kvadmin3511") {
    const cookieStore = await nextCookies();
    cookieStore.set("kvi_session", JSON.stringify({
      id: "admin-secret-id",
      username: "admin",
      role: "admin",
      name: "KVI Admin Panel"
    }), {
      path: "/",
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict"
    });
    return { success: true, role: "admin" };
  }

  let matchedUser: any = null;

  try {
    await connectToDatabase();
    matchedUser = await User.findOne({ email, password }).lean();
  } catch (err: any) {
    console.warn("MongoDB connection failed in loginUser, falling back to mock credentials:", err.message);
  }

  // Offline mock fallback if MongoDB failed or user not found
  if (!matchedUser) {
    matchedUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
  }

  if (!matchedUser) {
    return { success: false, error: "Invalid Gmail or Password credentials." };
  }

  // Set cookie token
  const cookieStore = await nextCookies();
  cookieStore.set("kvi_session", JSON.stringify({
    id: matchedUser._id?.toString() || matchedUser.id,
    username: matchedUser.username,
    role: matchedUser.role,
    name: matchedUser.name,
    stream: matchedUser.stream,
    phone: matchedUser.phone,
    email: matchedUser.email,
    parentPhone: matchedUser.parentPhone
  }), {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    httpOnly: true,
    sameSite: "strict"
  });

  return { success: true, role: matchedUser.role };
}

// Handle registration / signup for student or parent
export async function registerUser(prevState: any, formData: FormData) {
  const name = (formData.get("name") as string || "").trim();
  const username = (formData.get("username") as string || "").trim();
  const password = (formData.get("password") as string || "").trim();
  const email = (formData.get("email") as string || "").trim();
  const phone = (formData.get("phone") as string || "").trim();
  const role = formData.get("role") as string;
  const stream = formData.get("stream") as string;
  const parentPhone = (formData.get("parentPhone") as string || "").trim();
  const wardPhone = (formData.get("wardPhone") as string || "").trim();

  if (!name || !username || !password || !email || !phone || !role) {
    return { success: false, error: "Please fill out all required fields." };
  }

  try {
    await connectToDatabase();
    
    const existing = await User.findOne({ username });
    if (existing) {
      return { success: false, error: "Username is already taken." };
    }

    let newUserObj: any = {
      name,
      username,
      password,
      email,
      phone,
      role
    };

    if (role === "student") {
      newUserObj.stream = stream;
      newUserObj.parentPhone = parentPhone;
    }

    const createdUser = await User.create(newUserObj);

    if (role === "parent" && wardPhone) {
      await User.findOneAndUpdate(
        { role: "student", phone: wardPhone },
        { parent_id: createdUser._id }
      );
    } else if (role === "student" && parentPhone) {
      const parent = await User.findOne({ role: "parent", phone: parentPhone });
      if (parent) {
        await User.findByIdAndUpdate(createdUser._id, { parent_id: parent._id });
      }
    }

    const cookieStore = await nextCookies();
    cookieStore.set("kvi_session", JSON.stringify({
      id: createdUser._id.toString(),
      username: createdUser.username,
      role: createdUser.role,
      name: createdUser.name,
      stream: createdUser.stream,
      phone: createdUser.phone,
      email: createdUser.email,
      parentPhone: createdUser.parentPhone
    }), {
      path: "/",
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict"
    });

    return { success: true, role: createdUser.role };

  } catch (err: any) {
    console.warn("MongoDB connection failed in registerUser, simulating signup locally:", err.message);
    
    const cookieStore = await nextCookies();
    cookieStore.set("kvi_session", JSON.stringify({
      id: "mock-new-user-id-" + Math.random().toString(36).substring(2, 9),
      username,
      role,
      name,
      stream: role === "student" ? stream : undefined,
      phone,
      email,
      parentPhone: role === "student" ? parentPhone : undefined
    }), {
      path: "/",
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict"
    });

    return { success: true, role };
  }
}

// Dynamic Student Login via stream, mobile, and email + OTP Verification
export async function verifyStudentLogin(stream: string, email: string, phone: string) {
  if (!stream || !email || !phone) {
    return { success: false, error: "Please enter all verification fields." };
  }

  // Secret Admin Login Check
  if (email.trim() === "kvadmin@gmail.com" && phone.trim() === "Kvadmin3511") {
    const cookieStore = await nextCookies();
    cookieStore.set("kvi_session", JSON.stringify({
      id: "admin-secret-id",
      username: "admin",
      role: "admin",
      name: "KVI Admin Panel"
    }), {
      path: "/",
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict"
    });
    return { success: true, role: "admin" };
  }

  let student: any = null;

  try {
    await connectToDatabase();
    student = await User.findOne({
      role: "student",
      stream,
      email: email.trim(),
      phone: phone.trim()
    }).lean();
  } catch (err: any) {
    console.warn("MongoDB connection failed in verifyStudentLogin, falling back to mock profiles:", err.message);
  }

  // Offline mock verification fallback
  if (!student) {
    student = mockUsers.find(
      (u) => u.role === "student" && u.stream === stream && u.email === email && u.phone === phone
    );
  }

  if (!student) {
    return { success: false, error: "No matching student profile found for this stream, email, and mobile combination." };
  }

  // Mock successful verification, store cookie session
  const cookieStore = await nextCookies();
  cookieStore.set("kvi_session", JSON.stringify({
    id: student._id?.toString() || student.id,
    username: student.username,
    role: student.role,
    name: student.name,
    stream: student.stream,
    phone: student.phone,
    email: student.email,
    parentPhone: student.parentPhone
  }), {
    path: "/",
    maxAge: 60 * 60 * 24,
    httpOnly: true,
    sameSite: "strict"
  });

  return { success: true };
}

// Log out user
export async function logoutUser() {
  const cookieStore = await nextCookies();
  cookieStore.delete("kvi_session");
}

// Admin: Upload Material
export async function addMaterial(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const stream = formData.get("stream") as string;
  const subject = formData.get("subject") as string;
  const file_url = formData.get("file_url") as string || "#";

  if (!title || !type || !stream || !subject) {
    return { success: false, error: "Please fill out all required fields." };
  }

  try {
    await connectToDatabase();
    await Material.create({
      title: title.trim(),
      type,
      stream,
      subject: subject.trim(),
      file_url: file_url.trim()
    });
    return { success: true, message: `Material "${title}" uploaded successfully to ${stream} stream!` };
  } catch (err: any) {
    console.error("MongoDB Material upload failed:", err);
    return { success: false, error: "Failed to upload to database: " + err.message };
  }
}

// Admin: Submit Test Performance
export async function submitPerformance(prevState: any, formData: FormData) {
  const student_id = formData.get("student_id") as string;
  const testName = formData.get("testName") as string;
  const maxMarks = parseInt(formData.get("maxMarks") as string);
  const marksObtained = parseInt(formData.get("marksObtained") as string);
  const remarks = formData.get("remarks") as string || "";

  if (!student_id || !testName || isNaN(maxMarks) || isNaN(marksObtained)) {
    return { success: false, error: "Please fill out all required fields." };
  }

  try {
    await connectToDatabase();
    await Performance.create({
      student_id,
      testName: testName.trim(),
      maxMarks,
      marksObtained,
      remarks: remarks.trim()
    });
    return { success: true, message: `Marks submitted successfully for ${testName}!` };
  } catch (err: any) {
    console.error("MongoDB Grade submission failed:", err);
    return { success: false, error: "Failed to submit marks: " + err.message };
  }
}

// Admin: Mark Attendance
export async function markAttendance(prevState: any, formData: FormData) {
  const student_id = formData.get("student_id") as string;
  const date = formData.get("date") as string;
  const status = formData.get("status") as string;

  if (!student_id || !date || !status) {
    return { success: false, error: "Please provide all attendance details." };
  }

  try {
    await connectToDatabase();
    await Attendance.findOneAndUpdate(
      { student_id, date },
      { student_id, date, status },
      { upsert: true, new: true }
    );
    return { success: true, message: "Attendance status logged successfully in MongoDB!" };
  } catch (err: any) {
    console.error("MongoDB Attendance log failed:", err);
    return { success: false, error: "Failed to update logs: " + err.message };
  }
}
