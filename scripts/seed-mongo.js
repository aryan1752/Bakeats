const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kvi_coaching";

// Inline schemas for Node.js seeding script
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["student", "parent", "admin"] },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  stream: { type: String, enum: ["foundations", "commerce", "arts"] },
  parentPhone: { type: String },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  subject: { type: String, required: true },
  bio: { type: String, required: true },
  image_url: { type: String }
});

const LectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  video_url: { type: String, required: true },
  subject: { type: String, required: true }
});

const MaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ["notes", "dpp", "test_paper"] },
  stream: { type: String, required: true, enum: ["foundations", "commerce", "arts"] },
  subject: { type: String, required: true },
  file_url: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now }
});

const AttendanceSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  status: { type: String, required: true, enum: ["present", "absent", "late"] }
});

const FeeSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  amount_due: { type: Number, required: true },
  amount_paid: { type: Number, default: 0 },
  status: { type: String, enum: ["paid", "pending", "overdue"], default: "pending" }
});

const ScheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  subject: { type: String, required: true },
  batch: { type: String, required: true }
});

const PerformanceSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testName: { type: String, required: true },
  maxMarks: { type: Number, required: true },
  marksObtained: { type: Number, required: true },
  remarks: { type: String }
});

const User = mongoose.model("User", UserSchema);
const Faculty = mongoose.model("Faculty", FacultySchema);
const Lecture = mongoose.model("Lecture", LectureSchema);
const Material = mongoose.model("Material", MaterialSchema);
const Attendance = mongoose.model("Attendance", AttendanceSchema);
const Fee = mongoose.model("Fee", FeeSchema);
const Schedule = mongoose.model("Schedule", ScheduleSchema);
const Performance = mongoose.model("Performance", PerformanceSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding.");

    // Clear old data
    await User.deleteMany({});
    await Faculty.deleteMany({});
    await Lecture.deleteMany({});
    await Material.deleteMany({});
    await Attendance.deleteMany({});
    await Fee.deleteMany({});
    await Schedule.deleteMany({});
    await Performance.deleteMany({});
    console.log("Cleared existing collections.");

    // 1. Seed Users (Admin, Parents, Students)
    const admin = await User.create({
      username: "admin",
      password: "admin123",
      role: "admin",
      name: "KVI Admin Panel"
    });

    const parent1 = await User.create({
      username: "parent1",
      password: "parent123",
      role: "parent",
      name: "Rajesh Sharma",
      email: "parent1@gmail.com",
      phone: "9876543210"
    });

    const parent2 = await User.create({
      username: "parent2",
      password: "parent234",
      role: "parent",
      name: "Sunil Verma",
      email: "parent2@gmail.com",
      phone: "8765432109"
    });

    // Students (linked to parent IDs and with stream details)
    const student1 = await User.create({
      username: "student1",
      password: "student123",
      role: "student",
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      phone: "7011731649", // Student mobile for logging in
      stream: "foundations",
      parentPhone: "9876543210",
      parent_id: parent1._id
    });

    const student2 = await User.create({
      username: "student2",
      password: "student234",
      role: "student",
      name: "Diya Verma",
      email: "diya@gmail.com",
      phone: "8285575250", // Student mobile
      stream: "commerce",
      parentPhone: "8765432109",
      parent_id: parent2._id
    });

    console.log("Users seeded successfully.");

    // 2. Seed Faculty
    await Faculty.create([
      {
        name: "Vineet Verma",
        designation: "Head of Foundational Studies",
        subject: "Class 6-9th (All Subjects)",
        bio: "Experienced educator specializing in building strong fundamental logic and concept clarity across Hindi, English, Maths, Science, and SST.",
        image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300"
      },
      {
        name: "Er. Saurabh Singh",
        designation: "Aerospace Engineer & Math Lead",
        subject: "Class 9-10th (Science & Mathematics)",
        bio: "Aerospace engineering graduate focusing on Sunday conceptual classes, regular doubt sessions, and exam orientation.",
        image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300"
      },
      {
        name: "CS Sanjay Arya",
        designation: "Qualified Company Secretary",
        subject: "Class 11-12th (Commerce Stream)",
        bio: "10+ years of professional teaching experience focusing on Economics and Business Studies with a board-centric concept approach.",
        image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300"
      },
      {
        name: "Vimal Sharma",
        designation: "Senior Humanities Lecturer",
        subject: "Class 11-12th (Arts Stream)",
        bio: "Dedicated Arts teacher utilizing friendly study environments, maps, and timeline charts for History, Political Science, and Geography.",
        image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300"
      }
    ]);

    // 3. Seed Demo Lectures
    await Lecture.create([
      { title: "Chemical Reactions & Equations", description: "Class 10 Science Demo Class by Er. Saurabh Singh", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", subject: "Science" },
      { title: "Introduction to Microeconomics", description: "Class 11 Commerce Demo by CS Sanjay Arya", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", subject: "Economics" },
      { title: "Fractions and Decimals Basics", description: "Class 7 Foundations Math by Vineet Verma", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", subject: "Maths" }
    ]);

    // 4. Seed Materials (Assignments and Notes)
    await Material.create([
      { title: "Class 10 Quadratic Equations Practice Sheet", type: "dpp", stream: "foundations", subject: "Maths", file_url: "#" },
      { title: "Class 12 Macroeconomics National Income Notes", type: "notes", stream: "commerce", subject: "Economics", file_url: "#" },
      { title: "Class 9 Science Gravitation Chapter Notes", type: "notes", stream: "foundations", subject: "Science", file_url: "#" },
      { title: "Class 10 CBSE Math Mock Test Paper 2026", type: "test_paper", stream: "foundations", subject: "Maths", file_url: "#" },
      { title: "Class 11 Business Studies Board Sample Notes", type: "notes", stream: "commerce", subject: "Business Studies", file_url: "#" },
      { title: "Class 12 History Harappan Civilization Study Guide", type: "notes", stream: "arts", subject: "History", file_url: "#" }
    ]);

    // 5. Seed Attendance logs (Last 5 days)
    const dates = ["2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07", "2026-08-08"];
    for (const d of dates) {
      await Attendance.create({ student_id: student1._id, date: d, status: "present" });
      await Attendance.create({ student_id: student2._id, date: d, status: "present" });
    }
    // Seed some absents/lates
    await Attendance.create({ student_id: student1._id, date: "2026-08-03", status: "absent" });
    await Attendance.create({ student_id: student2._id, date: "2026-08-03", status: "late" });

    // 6. Seed Fees
    await Fee.create({ student_id: student1._id, amount_due: 15000, amount_paid: 10000, status: "pending" });
    await Fee.create({ student_id: student2._id, amount_due: 18000, amount_paid: 18000, status: "paid" });

    // 7. Seed Schedules
    await Schedule.create([
      { title: "Morning Batch Foundation Maths", date: "Monday - Saturday", time: "08:30 AM - 10:00 AM", subject: "Maths", batch: "foundations" },
      { title: "Special Science Conceptual Batch", date: "Sunday", time: "09:00 AM - 11:30 AM", subject: "Science", batch: "foundations" },
      { title: "Economics Core Structure Board Prep", date: "Mon, Wed, Fri", time: "04:30 PM - 06:00 PM", subject: "Economics", batch: "commerce" },
      { title: "Board Prep History & Polity", date: "Tue, Thu, Sat", time: "05:00 PM - 06:30 PM", subject: "History", batch: "arts" }
    ]);

    // 8. Seed Performance Reports
    await Performance.create([
      { student_id: student1._id, testName: "Weekly Algebra Test 1", maxMarks: 50, marksObtained: 42, remarks: "Good conceptual understanding." },
      { student_id: student1._id, testName: "Monthly General Science Test 1", maxMarks: 100, marksObtained: 81, remarks: "Active participator in Sunday doubt class." },
      { student_id: student2._id, testName: "Weekly Physics Test 1", maxMarks: 50, marksObtained: 48, remarks: "Excellent performance!" },
      { student_id: student2._id, testName: "Monthly Mathematics Test 1", maxMarks: 100, marksObtained: 94, remarks: "Excellent grasp on geometry formulas." }
    ]);

    console.log("Mock database seeding to MongoDB successful.");
  } catch (err) {
    console.error("Error during MongoDB seeding:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seed();
