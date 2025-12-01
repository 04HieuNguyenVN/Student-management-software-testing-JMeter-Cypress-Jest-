# TÀI LIỆU THIẾT KẾ HỆ THỐNG (SDD)
## HỆ THỐNG QUẢN LÝ SINH VIÊN (STUDENT MANAGEMENT SYSTEM)

**Phiên bản:** 1.0
**Ngày tạo:** 26/11/2025

---

## 1. GIỚI THIỆU

### 1.1. Mục đích
Tài liệu này mô tả chi tiết kiến trúc hệ thống, thiết kế cơ sở dữ liệu, và thiết kế giao diện lập trình ứng dụng (API) cho Hệ thống Quản lý Sinh viên. Tài liệu này hướng dẫn đội ngũ phát triển trong quá trình cài đặt và triển khai hệ thống.

### 1.2. Phạm vi
Tài liệu bao gồm:
- Kiến trúc tổng thể (High-level Architecture).
- Thiết kế cơ sở dữ liệu (Database Design).
- Thiết kế API (API Design).
- Thiết kế giao diện người dùng (UI Design Principles).

---

## 2. KIẾN TRÚC HỆ THỐNG

### 2.1. Mô hình kiến trúc
Hệ thống sử dụng mô hình **Client-Server** với kiến trúc **3-Tier** (3 lớp):

1.  **Presentation Layer (Frontend):**
    -   Xây dựng bằng **ReactJS**.
    -   Giao tiếp với Backend qua RESTful API.
    -   Xử lý logic hiển thị và tương tác người dùng.

2.  **Application Layer (Backend - Dự kiến):**
    -   Xây dựng bằng **Node.js (Express)** hoặc **Java (Spring Boot)**.
    -   Xử lý nghiệp vụ (Business Logic).
    -   Cung cấp RESTful API.
    -   Xác thực và phân quyền (Authentication & Authorization).

3.  **Data Layer (Database):**
    -   Sử dụng RDBMS (**MySQL** hoặc **PostgreSQL**).
    -   Lưu trữ dữ liệu bền vững.

### 2.2. Biểu đồ kiến trúc (Sơ lược)
```mermaid
graph TD
    Client[Client (Browser/React)] -->|HTTP/JSON| API[Backend API]
    API -->|Query| DB[(Database)]
    API -->|Auth| AuthProvider[Auth Service]
```

---

## 3. THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE DESIGN)

Dựa trên các thực thể đã xác định trong SRS, dưới đây là thiết kế lược đồ cơ sở dữ liệu quan hệ (Relational Schema).

### 3.1. Bảng `Users`
Lưu trữ thông tin tài khoản đăng nhập.

| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | ID người dùng |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL | Tên đăng nhập |
| `password` | VARCHAR(255) | NOT NULL | Mật khẩu (Hash) |
| `role` | ENUM | NOT NULL | 'admin', 'teacher', 'student' |
| `full_name` | VARCHAR(100) | NOT NULL | Họ tên hiển thị |
| `created_at` | DATETIME | DEFAULT NOW() | Ngày tạo |

### 3.2. Bảng `Departments` (Khoa)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | ID khoa |
| `name` | VARCHAR(100) | NOT NULL | Tên khoa |
| `code` | VARCHAR(20) | UNIQUE, NOT NULL | Mã khoa |

### 3.3. Bảng `Classes` (Lớp)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | ID lớp |
| `name` | VARCHAR(100) | NOT NULL | Tên lớp |
| `code` | VARCHAR(20) | UNIQUE, NOT NULL | Mã lớp |
| `department_id` | INT | FK -> Departments.id | Khoa trực thuộc |
| `academic_year` | VARCHAR(20) | NOT NULL | Năm học |
| `capacity` | INT | DEFAULT 40 | Sĩ số tối đa |

### 3.4. Bảng `Students` (Sinh viên)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | ID hồ sơ |
| `user_id` | INT | FK -> Users.id, UNIQUE | Liên kết tài khoản User |
| `student_code` | VARCHAR(20) | UNIQUE, NOT NULL | Mã sinh viên |
| `dob` | DATE | | Ngày sinh |
| `gender` | VARCHAR(10) | | Giới tính |
| `address` | VARCHAR(255) | | Địa chỉ |
| `phone` | VARCHAR(20) | | Số điện thoại |
| `email` | VARCHAR(100) | | Email liên hệ |
| `class_id` | INT | FK -> Classes.id | Lớp sinh hoạt |
| `department_id` | INT | FK -> Departments.id | Khoa quản lý |

### 3.5. Bảng `Subjects` (Môn học)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | ID môn học |
| `name` | VARCHAR(100) | NOT NULL | Tên môn học |
| `code` | VARCHAR(20) | UNIQUE, NOT NULL | Mã môn học |
| `credits` | INT | NOT NULL | Số tín chỉ |
| `department_id` | INT | FK -> Departments.id | Khoa phụ trách |

### 3.6. Bảng `Enrollments` (Đăng ký học phần)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | ID đăng ký |
| `student_id` | INT | FK -> Students.id | Sinh viên đăng ký |
| `subject_id` | INT | FK -> Subjects.id | Môn học |
| `semester` | VARCHAR(10) | NOT NULL | Học kỳ |
| `year` | VARCHAR(10) | NOT NULL | Năm học |
| `status` | ENUM | DEFAULT 'enrolled' | 'enrolled', 'dropped', 'completed' |

### 3.7. Bảng `Grades` (Điểm số)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | ID điểm |
| `enrollment_id` | INT | FK -> Enrollments.id | Liên kết đăng ký |
| `midterm_score` | FLOAT | CHECK (0-10) | Điểm giữa kỳ |
| `final_score` | FLOAT | CHECK (0-10) | Điểm cuối kỳ |
| `average_score` | FLOAT | Computed | Điểm tổng kết |

---

## 4. THIẾT KẾ API (API DESIGN)

Hệ thống cung cấp RESTful API với định dạng dữ liệu JSON.

### 4.1. Authentication
- `POST /api/auth/login`: Đăng nhập, trả về JWT Token.
- `POST /api/auth/logout`: Đăng xuất.
- `GET /api/auth/me`: Lấy thông tin user hiện tại.

### 4.2. Students
- `GET /api/students`: Lấy danh sách sinh viên (hỗ trợ filter, pagination).
- `GET /api/students/:id`: Lấy chi tiết sinh viên.
- `POST /api/students`: Tạo mới sinh viên.
- `PUT /api/students/:id`: Cập nhật sinh viên.
- `DELETE /api/students/:id`: Xóa sinh viên.

### 4.3. Classes & Departments
- `GET /api/classes`: Lấy danh sách lớp.
- `GET /api/departments`: Lấy danh sách khoa.

### 4.4. Subjects & Enrollments
- `GET /api/subjects`: Lấy danh sách môn học.
- `POST /api/enrollments`: Đăng ký môn học.
- `DELETE /api/enrollments/:id`: Hủy đăng ký.
- `GET /api/enrollments/my-enrollments`: Lấy danh sách môn đã đăng ký của user hiện tại.

### 4.5. Grades
- `GET /api/grades`: Lấy bảng điểm (theo lớp/môn).
- `POST /api/grades`: Nhập điểm.
- `PUT /api/grades/:id`: Sửa điểm.
- `GET /api/grades/my-grades`: Xem điểm cá nhân.

---

## 5. THIẾT KẾ GIAO DIỆN (FRONTEND DESIGN)

### 5.1. Cấu trúc thư mục (Hiện tại)
```
src/
├── components/          # Các thành phần tái sử dụng (Button, Input, Modal, Table)
├── contexts/            # Quản lý state toàn cục (AuthContext)
├── pages/               # Các trang màn hình chính
│   ├── Dashboard.jsx    # Tổng quan
│   ├── Students.jsx     # Quản lý sinh viên
│   ├── Grades.jsx       # Quản lý điểm
│   └── ...
├── utils/               # Các hàm tiện ích (Helpers)
└── App.jsx              # Routing và Layout chính
```

### 5.2. Design System
- **Framework:** TailwindCSS.
- **Color Palette:**
    -   Primary: Blue/Indigo (cho action chính).
    -   Success: Green (cho thông báo thành công, điểm cao).
    -   Danger: Red (cho nút xóa, lỗi, điểm thấp).
    -   Neutral: Gray (cho text, border).
- **Typography:** Sans-serif (Inter/Roboto).
- **Components:**
    -   **Card:** Dùng để hiển thị thông tin tóm tắt (Dashboard).
    -   **Table:** Hiển thị danh sách dữ liệu (Students, Grades).
    -   **Modal:** Dùng cho form thêm/sửa để không chuyển trang.

---

## 6. BẢO MẬT & HIỆU NĂNG

### 6.1. Bảo mật
- **Authentication:** Sử dụng JWT (JSON Web Token) gửi trong Header `Authorization: Bearer <token>`.
- **Authorization:** Middleware kiểm tra `role` trước khi xử lý request nhạy cảm (VD: chỉ Admin mới được xóa User).
- **Input Validation:** Validate dữ liệu ở cả Frontend và Backend để tránh SQL Injection/XSS.

### 6.2. Hiệu năng
- **Pagination:** API trả về dữ liệu phân trang cho các danh sách lớn (Students, Grades).
- **Caching:** Cache các dữ liệu ít thay đổi (Departments, Subjects) tại Client.
- **Lazy Loading:** Sử dụng `React.lazy` để tải các trang khi cần thiết, giảm kích thước bundle ban đầu.
