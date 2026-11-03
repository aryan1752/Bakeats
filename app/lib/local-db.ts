import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "kvi_database.json");

export interface LocalDBData {
  students: any[];
  contacts: any[];
  scholarships: any[];
  enrollments: any[];
  materials: any[];
  notifications: any[];
  attendance: { [date: string]: { [studentId: string]: string } };
  fees: { [studentId: string]: { status: "paid" | "pending" | "overdue"; amount?: string; updatedAt?: string; stream?: string } };
}

const INITIAL_DATA: LocalDBData = {
  students: [
    {
      _id: "student_init_1",
      id: "student_init_1",
      name: "Aman Verma",
      email: "aman.verma@gmail.com",
      phone: "9811223344",
      parentPhone: "9811223344",
      address: "Hari Nagar, Jaitpur, Delhi",
      grade: "Class 10th",
      stream: "foundations",
      role: "student"
    },
    {
      _id: "student_init_2",
      id: "student_init_2",
      name: "Riya Sen",
      email: "riya.sen@gmail.com",
      phone: "9877665544",
      parentPhone: "9877665544",
      address: "Badarpur, New Delhi",
      grade: "Class 9th",
      stream: "foundations",
      role: "student"
    },
    {
      _id: "student_init_3",
      id: "student_init_3",
      name: "Piyush Sharma",
      email: "piyush.sharma@gmail.com",
      phone: "9812345678",
      parentPhone: "9812345678",
      address: "Jaitpur Part-2, Delhi",
      grade: "Class 12th",
      stream: "science",
      role: "student"
    },
    {
      _id: "student_init_4",
      id: "student_init_4",
      name: "Sneha Rajput",
      email: "sneha.rajput@gmail.com",
      phone: "9898765432",
      parentPhone: "9898765432",
      address: "Molarband, Badarpur, Delhi",
      grade: "Class 11th",
      stream: "science",
      role: "student"
    },
    {
      _id: "student_init_5",
      id: "student_init_5",
      name: "Abhishek Kumar",
      email: "abhishek.k@gmail.com",
      phone: "9876501234",
      parentPhone: "9876501234",
      address: "Hari Nagar, Delhi",
      grade: "Class 12th",
      stream: "commerce",
      role: "student"
    },
    {
      _id: "student_init_6",
      id: "student_init_6",
      name: "Shruti Gupta",
      email: "shruti.gupta@gmail.com",
      phone: "9811002233",
      parentPhone: "9811002233",
      address: "Tajpur, Badarpur, Delhi",
      grade: "Class 11th",
      stream: "commerce",
      role: "student"
    },
    {
      _id: "student_init_7",
      id: "student_init_7",
      name: "Karan Malhotra",
      email: "karan.m@gmail.com",
      phone: "9822334455",
      parentPhone: "9822334455",
      address: "Meethapur, Badarpur, Delhi",
      grade: "Class 12th",
      stream: "arts",
      role: "student"
    },
    {
      _id: "student_init_8",
      id: "student_init_8",
      name: "Kavita Joshi",
      email: "kavita.j@gmail.com",
      phone: "9833445566",
      parentPhone: "9833445566",
      address: "Jaitpur Extension, Delhi",
      grade: "Class 11th",
      stream: "arts",
      role: "student"
    }
  ],
  contacts: [
    {
      _id: "contact_init_1",
      name: "Rajesh Sharma",
      email: "rajesh@gmail.com",
      message: "Kindly share the morning batch fee schedule for class 9 foundational course.",
      created_at: new Date().toISOString()
    }
  ],
  scholarships: [
    {
      _id: "sch_init_1",
      student_name: "Priya Singh",
      email: "priya@gmail.com",
      phone: "9876543210",
      grade: "Class 10",
      score: 92,
      status: "approved",
      age: 15,
      academic_achievements: "School topper in 9th grade Science olympiad.",
      why_join: "Want strong conceptual base for 10th boards.",
      preferred_stream: "foundations",
      created_at: new Date().toISOString()
    }
  ],
  enrollments: [
    {
      _id: "enr_init_1",
      student_name: "Aakash Malhotra",
      phone: "9811223344",
      email: "aakash@gmail.com",
      stream: "Class 11-12th Science",
      school_or_city: "DPS Mathura Road / Delhi",
      status: "pending",
      created_at: new Date().toISOString()
    },
    {
      _id: "enr_init_2",
      student_name: "Sneha Kapoor",
      phone: "9877665544",
      email: "sneha@gmail.com",
      stream: "Class 9-10th Foundations",
      school_or_city: "KV Andrews Ganj / Delhi",
      status: "contacted",
      created_at: new Date().toISOString()
    }
  ],
  materials: [
    {
      _id: "mock-mat-1",
      title: "Class 10 Quadratic Equations Practice Sheet",
      type: "dpp",
      stream: "foundations",
      subject: "Maths",
      file_url: "#",
      uploaded_at: new Date().toISOString()
    },
    {
      _id: "mock-mat-2",
      title: "Class 9 Science Gravitation Chapter Notes",
      type: "notes",
      stream: "foundations",
      subject: "Science",
      file_url: "#",
      uploaded_at: new Date().toISOString()
    },
    {
      _id: "mock-mat-3",
      title: "Class 10 CBSE Math Mock Test Paper 2026",
      type: "test_paper",
      stream: "foundations",
      subject: "Maths",
      file_url: "#",
      uploaded_at: new Date().toISOString()
    }
  ],
  notifications: [],
  attendance: {},
  fees: {}
};

function ensureDataFile(): LocalDBData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), "utf8");
    return INITIAL_DATA;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      students: Array.isArray(parsed.students) ? parsed.students : INITIAL_DATA.students,
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : INITIAL_DATA.contacts,
      scholarships: Array.isArray(parsed.scholarships) ? parsed.scholarships : INITIAL_DATA.scholarships,
      enrollments: Array.isArray(parsed.enrollments) ? parsed.enrollments : INITIAL_DATA.enrollments,
      materials: Array.isArray(parsed.materials) ? parsed.materials : INITIAL_DATA.materials,
      notifications: Array.isArray(parsed.notifications) ? parsed.notifications : INITIAL_DATA.notifications,
      attendance: typeof parsed.attendance === "object" && parsed.attendance !== null ? parsed.attendance : {},
      fees: typeof parsed.fees === "object" && parsed.fees !== null ? parsed.fees : {}
    };
  } catch (err) {
    console.warn("Failed reading DB file, recreating with initial data:", err);
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), "utf8");
    return INITIAL_DATA;
  }
}

function writeDataFile(data: LocalDBData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to local database file:", err);
  }
}

// ── Students API ──
export function getLocalStudents(): any[] {
  const db = ensureDataFile();
  return db.students;
}

export function addLocalStudent(student: any): any {
  const db = ensureDataFile();
  const id = student._id || student.id || `student_${Date.now()}`;
  const record = { ...student, _id: id, id };
  db.students.unshift(record);
  writeDataFile(db);
  return record;
}

export function deleteLocalStudent(id: string): boolean {
  const db = ensureDataFile();
  const prevCount = db.students.length;
  db.students = db.students.filter(s => String(s._id) !== String(id) && String(s.id) !== String(id));
  writeDataFile(db);
  return db.students.length < prevCount;
}

// ── Attendance API ──
export function getLocalAttendance(date?: string, stream?: string): { [studentId: string]: string } {
  const db = ensureDataFile();
  const targetDate = date || new Date().toISOString().split("T")[0];
  const dateRecords = db.attendance[targetDate] || {};
  return dateRecords;
}

export function saveLocalAttendance(date: string, records: { [studentId: string]: string }): void {
  const db = ensureDataFile();
  const targetDate = date || new Date().toISOString().split("T")[0];
  db.attendance[targetDate] = {
    ...(db.attendance[targetDate] || {}),
    ...records
  };
  writeDataFile(db);
}

// ── Fees API ──
export function getLocalFees(): { [studentId: string]: { status: "paid" | "pending" | "overdue"; amount?: string; updatedAt?: string; stream?: string } } {
  const db = ensureDataFile();
  return db.fees || {};
}

export function saveLocalFees(records: { [studentId: string]: { status: "paid" | "pending" | "overdue"; amount?: string; stream?: string } }): void {
  const db = ensureDataFile();
  const now = new Date().toISOString();
  for (const [studentId, rec] of Object.entries(records)) {
    db.fees[studentId] = {
      ...rec,
      updatedAt: now
    };
  }
  writeDataFile(db);
}

// ── Materials / Notes API ──
export function getLocalMaterials(stream?: string): any[] {
  const db = ensureDataFile();
  if (!stream || stream === "all") {
    return db.materials;
  }
  return db.materials.filter(m => m.stream === stream || m.stream === "all" || !m.stream);
}

export function addLocalMaterial(material: any): any {
  const db = ensureDataFile();
  const id = material._id || `mat_${Date.now()}`;
  const record = {
    ...material,
    _id: id,
    id,
    uploaded_at: material.uploaded_at || new Date().toISOString()
  };
  db.materials.unshift(record);
  writeDataFile(db);
  return record;
}

export function deleteLocalMaterial(id: string): boolean {
  const db = ensureDataFile();
  const prevCount = db.materials.length;
  db.materials = db.materials.filter(m => String(m._id) !== String(id) && String(m.id) !== String(id));
  writeDataFile(db);
  return db.materials.length < prevCount;
}

// ── Enrollments API ──
export function getLocalEnrollments(): any[] {
  const db = ensureDataFile();
  return db.enrollments;
}

export function addLocalEnrollment(enrollment: any): any {
  const db = ensureDataFile();
  const id = enrollment._id || `enr_${Date.now()}`;
  const record = {
    ...enrollment,
    _id: id,
    id,
    status: enrollment.status || "pending",
    created_at: enrollment.created_at || new Date().toISOString()
  };
  db.enrollments.unshift(record);
  writeDataFile(db);
  return record;
}

export function updateLocalEnrollmentStatus(id: string, status: string): boolean {
  const db = ensureDataFile();
  let found = false;
  for (const item of db.enrollments) {
    if (String(item._id) === String(id) || String(item.id) === String(id)) {
      item.status = status;
      found = true;
      break;
    }
  }
  if (found) {
    writeDataFile(db);
  }
  return found;
}

// ── Scholarships API ──
export function getLocalScholarships(): any[] {
  const db = ensureDataFile();
  return db.scholarships;
}

export function addLocalScholarship(scholarship: any): any {
  const db = ensureDataFile();
  const id = scholarship._id || `sch_${Date.now()}`;
  const record = {
    ...scholarship,
    _id: id,
    id,
    status: scholarship.status || "pending",
    created_at: scholarship.created_at || new Date().toISOString()
  };
  db.scholarships.unshift(record);
  writeDataFile(db);
  return record;
}

export function updateLocalScholarshipStatus(id: string, status: string): boolean {
  const db = ensureDataFile();
  let found = false;
  for (const item of db.scholarships) {
    if (String(item._id) === String(id) || String(item.id) === String(id)) {
      item.status = status;
      found = true;
      break;
    }
  }
  if (found) {
    writeDataFile(db);
  }
  return found;
}

// ── Contacts / Enquiries API ──
export function getLocalContacts(): any[] {
  const db = ensureDataFile();
  return db.contacts;
}

export function addLocalContact(contact: any): any {
  const db = ensureDataFile();
  const id = contact._id || `contact_${Date.now()}`;
  const record = {
    ...contact,
    _id: id,
    id,
    created_at: contact.created_at || new Date().toISOString()
  };
  db.contacts.unshift(record);
  writeDataFile(db);
  return record;
}

// ── Notifications / Broadcasts API ──
export function getLocalNotifications(stream?: string): any[] {
  const db = ensureDataFile();
  if (!stream || stream === "all") {
    return db.notifications;
  }
  return db.notifications.filter(n => n.stream === stream || n.stream === "all" || !n.stream);
}

export function addLocalNotification(notification: any): any {
  const db = ensureDataFile();
  const id = notification._id || `notif_${Date.now()}`;
  const record = {
    ...notification,
    _id: id,
    id,
    created_at: notification.created_at || new Date().toISOString()
  };
  db.notifications.unshift(record);
  writeDataFile(db);
  return record;
}

export function deleteLocalNotification(id: string): boolean {
  const db = ensureDataFile();
  const prevCount = db.notifications.length;
  db.notifications = db.notifications.filter(n => String(n._id) !== String(id) && String(n.id) !== String(id));
  writeDataFile(db);
  return db.notifications.length < prevCount;
}
