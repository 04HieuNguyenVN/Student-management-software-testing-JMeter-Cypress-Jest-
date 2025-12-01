# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## HỆ THỐNG QUẢN LÝ SINH VIÊN (STUDENT MANAGEMENT SYSTEM)

**Phiên bản:** 1.0
**Ngày tạo:** 26/11/2025

---

## 1. GIỚI THIỆU

### 1.1. Mục đích
Tài liệu này mô tả chi tiết các yêu cầu chức năng và phi chức năng cho Hệ thống Quản lý Sinh viên. Tài liệu đóng vai trò là cơ sở cho việc phát triển, kiểm thử và nghiệm thu phần mềm.

### 1.2. Phạm vi
Hệ thống được xây dựng nhằm mục đích số hóa quy trình quản lý sinh viên, bao gồm:
- Quản lý thông tin sinh viên, lớp học, môn học, khoa.
- Quản lý điểm số và kết quả học tập.
- Quản lý đăng ký học phần.
- Cung cấp báo cáo và thống kê cho giảng viên và quản trị viên.

### 1.3. Đối tượng sử dụng
- **Admin (Quản trị viên):** Quản lý toàn bộ hệ thống, cấu hình và tài khoản người dùng.
- **Teacher (Giảng viên):** Quản lý lớp học, môn học, nhập điểm và xem báo cáo.
- **Student (Sinh viên):** Xem thông tin cá nhân, điểm số, đăng ký học phần.

---

## 2. TỔNG QUAN HỆ THỐNG

### 2.1. Kiến trúc hệ thống
Hệ thống được xây dựng trên nền tảng Web Application:
- **Frontend:** ReactJS, TailwindCSS.
- **Backend (Dự kiến):** RESTful API.
- **Database (Dự kiến):** SQL (MySQL/PostgreSQL) hoặc NoSQL.

### 2.2. Các tác nhân (Actors)
| Tác nhân | Mô tả |
| :--- | :--- |
| **Admin** | Người có quyền cao nhất, quản trị hệ thống. |
| **Teacher** | Giảng viên, chịu trách nhiệm giảng dạy và quản lý điểm. |
| **Student** | Sinh viên, người sử dụng dịch vụ đào tạo. |

---

## 3. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

### 3.1. Phân hệ Xác thực & Phân quyền
| ID | Tên chức năng | Mô tả | Actor |
| :--- | :--- | :--- | :--- |
| **AUTH-01** | Đăng nhập | Người dùng đăng nhập bằng username và password. | All |
| **AUTH-02** | Đăng xuất | Người dùng thoát khỏi hệ thống. | All |
| **AUTH-03** | Phân quyền | Hệ thống hiển thị menu và chức năng tương ứng với vai trò (Admin, Teacher, Student). | System |

### 3.2. Phân hệ Quản lý Sinh viên
| ID | Tên chức năng | Mô tả | Actor |
| :--- | :--- | :--- | :--- |
| **STU-01** | Xem danh sách sinh viên | Hiển thị danh sách sinh viên với các thông tin cơ bản. | Admin, Teacher |
| **STU-02** | Thêm sinh viên mới | Tạo mới hồ sơ sinh viên (Mã SV, Họ tên, Email, SĐT, Ngày sinh, Giới tính, Địa chỉ, Lớp, Khoa). | Admin, Teacher |
| **STU-03** | Cập nhật thông tin | Chỉnh sửa thông tin hồ sơ sinh viên. | Admin, Teacher |
| **STU-04** | Xóa sinh viên | Xóa hồ sơ sinh viên khỏi hệ thống (yêu cầu xác nhận). | Admin, Teacher |
| **STU-05** | Tìm kiếm sinh viên | Tìm kiếm theo Tên, Mã SV hoặc Email. | Admin, Teacher |
| **STU-06** | Lọc sinh viên | Lọc danh sách theo Lớp hoặc Khoa. | Admin, Teacher |

### 3.3. Phân hệ Quản lý Môn học & Lớp học
| ID | Tên chức năng | Mô tả | Actor |
| :--- | :--- | :--- | :--- |
| **COU-01** | Quản lý Môn học | Thêm, sửa, xóa môn học (Mã môn, Tên môn, Số tín chỉ, Khoa). | Admin, Teacher |
| **CLS-01** | Quản lý Lớp học | Thêm, sửa, xóa lớp học (Mã lớp, Tên lớp, Khoa, Năm học, Sĩ số). | Admin, Teacher |

### 3.4. Phân hệ Quản lý Điểm
| ID | Tên chức năng | Mô tả | Actor |
| :--- | :--- | :--- | :--- |
| **GRD-01** | Nhập điểm | Nhập điểm giữa kỳ và cuối kỳ cho sinh viên theo môn học. | Admin, Teacher |
| **GRD-02** | Tính điểm tổng kết | Hệ thống tự động tính điểm trung bình: `(Điểm GK * 0.3) + (Điểm CK * 0.7)`. | System |
| **GRD-03** | Xếp loại học lực | Hệ thống tự động xếp loại (Xuất sắc, Giỏi, Khá, TB, Yếu) dựa trên điểm TB. | System |
| **GRD-04** | Xem điểm cá nhân | Sinh viên xem bảng điểm của chính mình. | Student |

### 3.5. Phân hệ Đăng ký Học phần
| ID | Tên chức năng | Mô tả | Actor |
| :--- | :--- | :--- | :--- |
| **ENR-01** | Đăng ký môn học | Sinh viên chọn môn học để đăng ký trong học kỳ. | Student |
| **ENR-02** | Hủy đăng ký | Sinh viên hủy môn học đã đăng ký (nếu trong thời hạn cho phép). | Student |
| **ENR-03** | Kiểm tra trùng lịch | Hệ thống ngăn chặn đăng ký trùng môn hoặc vượt quá số tín chỉ (nếu có quy định). | System |

### 3.6. Phân hệ Báo cáo & Thống kê
| ID | Tên chức năng | Mô tả | Actor |
| :--- | :--- | :--- | :--- |
| **RPT-01** | Thống kê điểm số | Biểu đồ phân bố điểm số, tỷ lệ xếp loại học lực. | Admin, Teacher |
| **RPT-02** | Báo cáo sinh viên | Xuất danh sách sinh viên, tình trạng học tập. | Admin, Teacher |
| **RPT-03** | Thống kê đăng ký | Số lượng sinh viên đăng ký theo từng môn học. | Admin, Teacher |

---

## 4. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

### 4.1. Hiệu năng (Performance)
- Thời gian phản hồi cho các thao tác xem/tìm kiếm < 1 giây.
- Hỗ trợ đồng thời 50 người dùng (theo kịch bản JMeter).
- Tải trang Dashboard < 2 giây.

### 4.2. Bảo mật (Security)
- Mật khẩu người dùng phải được mã hóa (trong DB thực tế).
- API phải có cơ chế xác thực (JWT/Session).
- Phân quyền chặt chẽ, người dùng không thể truy cập chức năng không thuộc vai trò của mình.

### 4.3. Giao diện (UI/UX)
- Thiết kế Responsive, hiển thị tốt trên Desktop và Mobile.
- Giao diện thân thiện, dễ sử dụng, tuân thủ các nguyên tắc thiết kế hiện đại.
- Thông báo lỗi rõ ràng, dễ hiểu.

### 4.4. Khả năng bảo trì & Mở rộng
- Mã nguồn tuân thủ coding convention (ESLint).
- Kiến trúc module hóa, dễ dàng thêm mới tính năng (ví dụ: Xuất Excel, Tích hợp thanh toán).

---

## 5. MÔ HÌNH DỮ LIỆU (DATA MODEL)

Dựa trên thiết kế hiện tại (`mockData.js`), hệ thống quản lý các thực thể dữ liệu sau:

### 5.1. Users (Người dùng)
- `id`: ID duy nhất
- `username`: Tên đăng nhập
- `password`: Mật khẩu
- `role`: Vai trò (admin, teacher, student)
- `name`: Tên hiển thị
- `studentCode`: Mã sinh viên (chỉ áp dụng cho Student)
- `classId`: ID lớp (chỉ áp dụng cho Student)
- `departmentId`: ID khoa (chỉ áp dụng cho Student)

### 5.2. Departments (Khoa)
- `id`: ID khoa
- `name`: Tên khoa
- `code`: Mã khoa

### 5.3. Classes (Lớp học)
- `id`: ID lớp
- `name`: Tên lớp
- `code`: Mã lớp
- `departmentId`: ID khoa trực thuộc
- `academicYear`: Năm học
- `capacity`: Sĩ số tối đa

### 5.4. Subjects (Môn học)
- `id`: ID môn học
- `name`: Tên môn học
- `code`: Mã môn học
- `credits`: Số tín chỉ
- `departmentId`: ID khoa quản lý

### 5.5. Students (Hồ sơ Sinh viên)
- `id`: ID hồ sơ
- `studentCode`: Mã sinh viên
- `fullName`: Họ và tên
- `email`: Email
- `phone`: Số điện thoại
- `dateOfBirth`: Ngày sinh
- `gender`: Giới tính
- `address`: Địa chỉ
- `classId`: ID lớp
- `departmentId`: ID khoa
- `status`: Trạng thái (active, etc.)

### 5.6. Grades (Điểm số)
- `id`: ID điểm
- `studentId`: ID sinh viên
- `subjectId`: ID môn học
- `midtermScore`: Điểm giữa kỳ
- `finalScore`: Điểm cuối kỳ
- `averageScore`: Điểm trung bình
- `semester`: Học kỳ
- `year`: Năm học

### 5.7. Enrollments (Đăng ký học phần)
- `id`: ID đăng ký
- `studentId`: ID sinh viên
- `subjectId`: ID môn học
- `semester`: Học kỳ
- `year`: Năm học
- `status`: Trạng thái (enrolled, dropped, etc.)

---

## 6. PHỤ LỤC

### 6.1. Định nghĩa thuật ngữ
- **SRS:** Software Requirements Specification.
- **CRUD:** Create, Read, Update, Delete.
- **GPA:** Grade Point Average (Điểm trung bình).

### 6.2. Tài liệu tham khảo
- `README.md` của dự án.
- `JMETER_SCENARIOS.md` cho các kịch bản kiểm thử hiệu năng.
