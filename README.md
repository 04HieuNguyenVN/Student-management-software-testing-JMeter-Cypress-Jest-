# Hệ thống Quản lý Sinh viên (Student Management System)

## 📋 Giới thiệu

Hệ thống quản lý sinh viên được xây dựng bằng React, cung cấp đầy đủ các chức năng quản lý sinh viên, môn học, lớp học, điểm số, đăng ký học phần và báo cáo thống kê.

## 🚀 Công nghệ sử dụng

- **React 18.2** - Thư viện UI
- **Vite 4.4.0** - Build tool
- **React Router DOM** - Routing
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **React Hook Form** - Form validation
- **Axios** - HTTP client

## 📦 Cài đặt

### Yêu cầu hệ thống

- Node.js >= 18.x
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository hoặc giải nén source code

2. Di chuyển vào thư mục dự án:

```bash
cd student-management-system
```

3. Cài đặt dependencies:

```bash
npm install
```

4. Chạy ứng dụng ở chế độ development:

```bash
npm run dev
```

5. Mở trình duyệt và truy cập: `http://localhost:5173`

## 👥 Tài khoản đăng nhập

Hệ thống có 3 loại tài khoản với quyền hạn khác nhau:

### Admin

- **Username:** admin
- **Password:** admin123
- **Quyền:** Toàn quyền truy cập mọi chức năng

### Giảng viên (Teacher)

- **Username:** teacher
- **Password:** teacher123
- **Quyền:** Quản lý sinh viên, môn học, lớp học, điểm, báo cáo

### Sinh viên (Student)

- **Username:** student
- **Password:** student123
- **Quyền:** Xem dashboard, đăng ký học phần

## 🎯 Chức năng chính

### 1. Xác thực và phân quyền

- ✅ Đăng nhập với username/password
- ✅ Phân quyền theo vai trò (Admin, Teacher, Student)
- ✅ Bảo vệ routes theo quyền hạn
- ✅ Lưu trạng thái đăng nhập (localStorage)

### 2. Quản lý sinh viên (Admin/Teacher)

- ✅ Thêm, sửa, xóa sinh viên
- ✅ Tìm kiếm theo tên, mã SV, email
- ✅ Lọc theo lớp, khoa
- ✅ Quản lý thông tin: mã SV, họ tên, email, SĐT, ngày sinh, giới tính, địa chỉ, lớp, khoa
- ✅ Validation form đầy đủ

### 3. Quản lý môn học (Admin/Teacher)

- ✅ Thêm, sửa, xóa môn học
- ✅ Quản lý: mã môn, tên môn, số tín chỉ, khoa, mô tả
- ✅ Hiển thị dạng card với thông tin chi tiết

### 4. Quản lý lớp học (Admin/Teacher)

- ✅ Thêm, sửa, xóa lớp học
- ✅ Quản lý: mã lớp, tên lớp, khoa, năm học, sĩ số
- ✅ Hiển thị dạng card trực quan

### 5. Quản lý điểm (Admin/Teacher)

- ✅ Nhập/sửa điểm giữa kỳ, cuối kỳ
- ✅ Tính điểm trung bình tự động (30% giữa kỳ + 70% cuối kỳ)
- ✅ Xếp loại tự động: Xuất sắc, Giỏi, Khá, Trung bình, Yếu
- ✅ Lọc theo sinh viên, môn học
- ✅ Thống kê số lượng theo từng xếp loại

### 6. Đăng ký học phần (All users)

- ✅ Đăng ký môn học cho sinh viên
- ✅ Hiển thị tổng tín chỉ hiện tại và sau khi đăng ký
- ✅ Kiểm tra trùng lặp đăng ký
- ✅ Hủy đăng ký
- ✅ Thống kê: tổng đăng ký, đang hoạt động, số sinh viên tham gia

### 7. Báo cáo & Thống kê (Admin/Teacher)

- ✅ **Báo cáo sinh viên:**
  - Danh sách sinh viên theo lớp/khoa
  - Số môn đã đăng ký
  - Điểm trung bình
- ✅ **Thống kê điểm:**
  - Phân bố theo xếp loại
  - Biểu đồ trực quan
  - Tỷ lệ phần trăm
- ✅ **Thống kê đăng ký:**
  - Số lượng SV đăng ký từng môn
  - Mức độ phổ biến của môn học

### 8. Xuất dữ liệu

- 🔄 Chức năng xuất Excel/PDF (dự kiến phát triển tiếp)

## 🗂️ Cấu trúc thư mục

```
student-management-system/
├── src/
│   ├── components/          # React components
│   │   ├── Layout.jsx       # Layout chính với sidebar
│   │   └── PrivateRoute.jsx # Bảo vệ routes
│   ├── contexts/            # Context API
│   │   └── AuthContext.jsx  # Authentication context
│   ├── data/               # Mock data
│   │   └── mockData.js     # Dữ liệu mẫu
│   ├── pages/              # Các trang chính
│   │   ├── Login.jsx       # Trang đăng nhập
│   │   ├── Dashboard.jsx   # Trang chủ
│   │   ├── Students.jsx    # Quản lý sinh viên
│   │   ├── Courses.jsx     # Quản lý môn học
│   │   ├── Classes.jsx     # Quản lý lớp học
│   │   ├── Grades.jsx      # Quản lý điểm
│   │   ├── Enrollment.jsx  # Đăng ký học phần
│   │   └── Reports.jsx     # Báo cáo & thống kê
│   ├── App.jsx             # Root component với routes
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind styles
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🧪 Kiểm thử

Hệ thống được xây dựng theo kế hoạch kiểm thử chi tiết, bao gồm:

### Các kịch bản kiểm thử đã triển khai:

1. **Kiểm thử đăng nhập:**

   - Đăng nhập thành công với tài khoản hợp lệ
   - Thông báo lỗi với tài khoản không hợp lệ
   - Validation form

2. **Kiểm thử CRUD sinh viên:**

   - Thêm sinh viên mới với đầy đủ thông tin
   - Sửa thông tin sinh viên
   - Xóa sinh viên (có confirm)
   - Tìm kiếm và lọc

3. **Kiểm thử quản lý điểm:**

   - Nhập điểm hợp lệ (0-10)
   - Tính toán điểm TB tự động
   - Xếp loại tự động

4. **Kiểm thử đăng ký học phần:**

   - Đăng ký môn học thành công
   - Kiểm tra trùng lặp
   - Tính tín chỉ tự động

5. **Kiểm thử phân quyền:**
   - Admin: full access
   - Teacher: quản lý và báo cáo
   - Student: chỉ xem dashboard và đăng ký HP

## 📱 Giao diện

- Responsive design với Tailwind CSS
- Sidebar navigation với menu theo role
- Card-based UI cho danh sách
- Table view cho dữ liệu chi tiết
- Modal popup cho form thêm/sửa
- Toast notifications cho actions

## 🔐 Bảo mật

- Authentication với localStorage
- Route protection theo role
- Form validation
- Confirm dialogs cho delete actions

## 🛠️ Scripts

```bash
# Development
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Lưu ý

- Dữ liệu hiện tại sử dụng mock data (lưu trong memory)
- Refresh trang sẽ reset dữ liệu về trạng thái ban đầu (trừ auth state)
- Phiên bản hiện tại chưa tích hợp backend API
- Chức năng xuất Excel/PDF sẽ được bổ sung trong version tiếp theo

## 🚧 Phát triển tiếp theo

- [ ] Tích hợp backend API (JSON Server hoặc REST API)
- [ ] Xuất dữ liệu ra Excel/PDF
- [ ] Persistent storage (IndexedDB/LocalStorage)
- [ ] Advanced search và filtering
- [ ] Pagination cho danh sách
- [ ] Upload ảnh đại diện sinh viên
- [ ] Email notifications
- [ ] Dark mode
- [ ] Unit tests và E2E tests

## 📄 License

MIT License

---
**Ngày cập nhật:** 2024  
**Phiên bản:** 1.0.0
