// Mock user data
export const MOCK_USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Quản trị viên",
  },
  {
    id: 2,
    username: "gv001",
    password: "gv123",
    role: "teacher",
    name: "Teacher User",
  },
  {
    id: 3,
    username: "sv001",
    password: "sv123",
    role: "student",
    name: "Student User",
    studentCode: "SV001",
    classId: 1,
    departmentId: 1,
  },
];

// Mock departments
export const MOCK_DEPARTMENTS = [
  { id: 1, name: "Khoa Công nghệ thông tin", code: "CNTT" },
  { id: 2, name: "Khoa Điện tử viễn thông", code: "DTVT" },
  { id: 3, name: "Khoa Kinh tế", code: "KT" },
];

// Mock classes
export const MOCK_CLASSES = [
  {
    id: 1,
    name: "Lớp CNTT 01",
    code: "CNTT01",
    departmentId: 1,
    academicYear: "2023-2024",
    capacity: 40,
  },
  {
    id: 2,
    name: "Lớp CNTT 02",
    code: "CNTT02",
    departmentId: 1,
    academicYear: "2023-2024",
    capacity: 35,
  },
  {
    id: 3,
    name: "Lớp DTVT 01",
    code: "DTVT01",
    departmentId: 2,
    academicYear: "2023-2024",
    capacity: 30,
  },
  {
    id: 4,
    name: "Lớp KT 01",
    code: "KT01",
    departmentId: 3,
    academicYear: "2023-2024",
    capacity: 45,
  },
];

// Mock subjects
export const MOCK_SUBJECTS = [
  { id: 1, name: "Lập trình Web", code: "CS101", credits: 3, departmentId: 1 },
  { id: 2, name: "Cơ sở dữ liệu", code: "CS102", credits: 4, departmentId: 1 },
  {
    id: 3,
    name: "Kiểm thử phần mềm",
    code: "CS103",
    credits: 3,
    departmentId: 1,
  },
  { id: 4, name: "Mạng máy tính", code: "CS104", credits: 3, departmentId: 1 },
  {
    id: 5,
    name: "Xử lý tín hiệu số",
    code: "ET101",
    credits: 3,
    departmentId: 2,
  },
  { id: 6, name: "Kinh tế vi mô", code: "EC101", credits: 3, departmentId: 3 },
];

// Mock students
export const MOCK_STUDENTS = [
  {
    id: 1,
    studentCode: "SV001",
    fullName: "Trần Thị B",
    email: "tranb@example.com",
    phone: "0123456789",
    dateOfBirth: "2003-05-15",
    gender: "Nữ",
    address: "Hà Nội",
    classId: 1,
    departmentId: 1,
    status: "active",
  },
  {
    id: 2,
    studentCode: "SV002",
    fullName: "Lê Văn C",
    email: "lec@example.com",
    phone: "0987654321",
    dateOfBirth: "2003-08-20",
    gender: "Nam",
    address: "TP HCM",
    classId: 1,
    departmentId: 1,
    status: "active",
  },
  {
    id: 3,
    studentCode: "SV003",
    fullName: "Phạm Thị D",
    email: "phamd@example.com",
    phone: "0912345678",
    dateOfBirth: "2003-03-10",
    gender: "Nữ",
    address: "Đà Nẵng",
    classId: 2,
    departmentId: 1,
    status: "active",
  },
];

// Mock grades
export const MOCK_GRADES = [
  {
    id: 1,
    studentId: 1,
    subjectId: 1,
    midtermScore: 8.5,
    finalScore: 9.0,
    averageScore: 8.8,
    semester: "1",
    year: "2024",
  },
  {
    id: 2,
    studentId: 1,
    subjectId: 2,
    midtermScore: 7.5,
    finalScore: 8.5,
    averageScore: 8.1,
    semester: "1",
    year: "2024",
  },
  {
    id: 3,
    studentId: 2,
    subjectId: 1,
    midtermScore: 9.0,
    finalScore: 9.5,
    averageScore: 9.3,
    semester: "1",
    year: "2024",
  },
];

// Mock enrollments
export const MOCK_ENROLLMENTS = [
  {
    id: 1,
    studentId: 1,
    subjectId: 1,
    semester: "1",
    year: "2024",
    status: "enrolled",
  },
  {
    id: 2,
    studentId: 1,
    subjectId: 2,
    semester: "1",
    year: "2024",
    status: "enrolled",
  },
  {
    id: 3,
    studentId: 2,
    subjectId: 1,
    semester: "1",
    year: "2024",
    status: "enrolled",
  },
];
