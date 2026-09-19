import mongoose, { Schema, Document } from "mongoose";

// 1. User
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["student", "parent", "admin"] },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  grade: { type: String },
  stream: { type: String, enum: ["foundations", "commerce", "arts", "science"] },
  parentPhone: { type: String },
  parent_id: { type: Schema.Types.ObjectId, ref: "User" }
});

// 2. Faculty
const FacultySchema = new Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  subject: { type: String, required: true },
  bio: { type: String, required: true },
  image_url: { type: String }
});

// 3. Lecture (Demo Videos)
const LectureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  video_url: { type: String, required: true },
  subject: { type: String, required: true }
});

// 4. Scholarship Test Registry
const ScholarshipSchema = new Schema({
  student_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  grade: { type: String, required: true },
  score: { type: Number, required: true },
  age: { type: Number },
  academic_achievements: { type: String },
  why_join: { type: String },
  preferred_stream: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  created_at: { type: Date, default: Date.now }
});

// 5. Contact Inquiries
const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// 6. Material (Notes, DPPs, Test Papers)
const MaterialSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ["notes", "dpp", "test_paper"] },
  stream: { type: String, required: true, enum: ["foundations", "commerce", "arts", "science"] },
  subject: { type: String, required: true },
  file_url: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now }
});

// 7. Attendance Logs
const AttendanceSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  status: { type: String, required: true, enum: ["present", "absent", "late"] }
});
AttendanceSchema.index({ student_id: 1, date: 1 }, { unique: true });

// 8. Fees
const FeeSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  amount_due: { type: Number, required: true },
  amount_paid: { type: Number, default: 0 },
  status: { type: String, enum: ["paid", "pending", "overdue"], default: "pending" }
});

// 9. Schedules (Batch Calendar)
const ScheduleSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  subject: { type: String, required: true },
  batch: { type: String, required: true }
});

// 10. Test Performance
const PerformanceSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  testName: { type: String, required: true },
  maxMarks: { type: Number, required: true },
  marksObtained: { type: Number, required: true },
  remarks: { type: String }
});

// 11. Simple Direct Enrollment Form Schema
const EnrollmentSchema = new Schema({
  student_name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  stream: { type: String, required: true },
  school_or_city: { type: String },
  status: { type: String, enum: ["pending", "contacted", "enrolled"], default: "pending" },
  created_at: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
export const Lecture = mongoose.models.Lecture || mongoose.model("Lecture", LectureSchema);
export const Scholarship = mongoose.models.Scholarship || mongoose.model("Scholarship", ScholarshipSchema);
export const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
export const Material = mongoose.models.Material || mongoose.model("Material", MaterialSchema);
export const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
export const Fee = mongoose.models.Fee || mongoose.model("Fee", FeeSchema);
export const Schedule = mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);
export const Performance = mongoose.models.Performance || mongoose.model("Performance", PerformanceSchema);
export const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);

// 11. Customer/Student Reviews
const ReviewSchema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true, enum: ["pending", "approved", "rejected"], default: "pending" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  approved_at: { type: Date },
  submit_ip: { type: String },
  moderation_token: { type: String, required: true, unique: true }
});

export const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

// 12. Broadcast Notifications Schema
const NotificationSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  sender: { type: String, default: "Faculty / Admin" },
  stream: { type: String, default: "all" }, // "all", "foundations", "science", "commerce", "arts"
  priority: { type: String, enum: ["info", "important", "urgent"], default: "info" },
  image_url: { type: String },
  date: { type: String },
  created_at: { type: Date, default: Date.now }
});

export const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);

