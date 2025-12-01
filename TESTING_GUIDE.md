# HƯỚNG DẪN KIỂM THỬ HỆ THỐNG QUẢN LÝ SINH VIÊN

## 📋 Mục lục

1. [Chuẩn bị môi trường kiểm thử](#1-chuẩn-bị-môi-trường-kiểm-thử)
2. [Kiểm thử chức năng đăng nhập](#2-kiểm-thử-chức-năng-đăng-nhập)
3. [Kiểm thử quản lý sinh viên](#3-kiểm-thử-quản-lý-sinh-viên)
4. [Kiểm thử quản lý môn học](#4-kiểm-thử-quản-lý-môn-học)
5. [Kiểm thử quản lý lớp học](#5-kiểm-thử-quản-lý-lớp-học)
6. [Kiểm thử quản lý điểm](#6-kiểm-thử-quản-lý-điểm)
7. [Kiểm thử đăng ký học phần](#7-kiểm-thử-đăng-ký-học-phần)
8. [Kiểm thử báo cáo & thống kê](#8-kiểm-thử-báo-cáo--thống-kê)
9. [Kiểm thử phân quyền](#9-kiểm-thử-phân-quyền)
10. [Kiểm thử UI/UX](#10-kiểm-thử-uiux)

---

## 1. Chuẩn bị môi trường kiểm thử

### Yêu cầu

- ✅ Node.js v18.x trở lên
- ✅ Trình duyệt hiện đại (Chrome, Firefox, Edge)
- ✅ Source code đã cài đặt dependencies

### Khởi động ứng dụng

```bash
cd student-management-system
npm install
npm run dev
```

Truy cập: `http://localhost:5173`

### Dữ liệu mẫu có sẵn

- 3 users (admin, teacher, student)
- 3 departments (Công nghệ thông tin, Kinh tế, Ngoại ngữ)
- 4 classes
- 6 subjects
- 3 students
- 3 grade records
- 3 enrollments

---

## 2. Kiểm thử chức năng đăng nhập

### Test Case 2.1: Đăng nhập thành công với tài khoản Admin

**Mục đích:** Kiểm tra đăng nhập thành công với quyền Admin

**Bước thực hiện:**

1. Mở trang `http://localhost:5173`
2. Nhập username: `admin`
3. Nhập password: `admin123`
4. Click nút "Đăng nhập"

**Kết quả mong đợi:**

- ✅ Chuyển hướng đến trang Dashboard
- ✅ Hiển thị tên người dùng "Admin User" ở header
- ✅ Sidebar hiển thị đầy đủ menu: Dashboard, Sinh viên, Môn học, Lớp học, Điểm, Đăng ký HP, Báo cáo
- ✅ Dashboard hiển thị thống kê: Tổng sinh viên (3), Tổng môn học (6), Tổng lớp học (4), Tổng điểm (3)

---

### Test Case 2.2: Đăng nhập thất bại - Sai mật khẩu

**Mục đích:** Kiểm tra validation khi nhập sai mật khẩu

**Bước thực hiện:**

1. Mở trang login
2. Nhập username: `admin`
3. Nhập password: `wrongpassword`
4. Click "Đăng nhập"

**Kết quả mong đợi:**

- ✅ Hiển thị thông báo lỗi "Tên đăng nhập hoặc mật khẩu không đúng!"
- ✅ Không chuyển trang
- ✅ Form vẫn giữ nguyên

---

### Test Case 2.3: Đăng nhập với tài khoản Teacher

**Bước thực hiện:**

1. Username: `teacher`, Password: `teacher123`

**Kết quả mong đợi:**

- ✅ Đăng nhập thành công
- ✅ Hiển thị tên "Teacher User"
- ✅ Menu đầy đủ giống Admin

---

### Test Case 2.4: Đăng nhập với tài khoản Student

**Bước thực hiện:**

1. Username: `student`, Password: `student123`

**Kết quả mong đợi:**

- ✅ Đăng nhập thành công
- ✅ Hiển thị tên "Student User"
- ✅ Menu chỉ có: Dashboard và Đăng ký HP
- ✅ Dashboard hiển thị: Môn đã đăng ký (1), Điểm trung bình (8.5), Tổng tín chỉ (4)

---

### Test Case 2.5: Đăng xuất

**Bước thực hiện:**

1. Đăng nhập với bất kỳ tài khoản nào
2. Click nút "Đăng xuất" ở header

**Kết quả mong đợi:**

- ✅ Chuyển về trang login
- ✅ Không thể quay lại trang dashboard bằng nút back
- ✅ localStorage đã xóa thông tin user

---

## 3. Kiểm thử quản lý sinh viên

**Lưu ý:** Đăng nhập với tài khoản admin hoặc teacher để test

### Test Case 3.1: Xem danh sách sinh viên

**Bước thực hiện:**

1. Click menu "Sinh viên"

**Kết quả mong đợi:**

- ✅ Hiển thị tiêu đề "Quản lý sinh viên"
- ✅ Hiển thị nút "Thêm sinh viên"
- ✅ Hiển thị form tìm kiếm/lọc (Tìm kiếm, Lớp, Khoa, nút Tìm và Reset)
- ✅ Hiển thị bảng với 3 sinh viên:
  - SV001 - Nguyễn Văn A
  - SV002 - Trần Thị B
  - SV003 - Lê Văn C
- ✅ Mỗi dòng có nút Sửa và Xóa

---

### Test Case 3.2: Thêm sinh viên mới thành công

**Bước thực hiện:**

1. Click "Thêm sinh viên"
2. Nhập thông tin:
   - Mã SV: `SV004`
   - Họ tên: `Phạm Thị D`
   - Email: `phamthid@student.edu.vn`
   - SĐT: `0901234567`
   - Ngày sinh: `2003-05-15`
   - Giới tính: `Nữ`
   - Địa chỉ: `123 Đường ABC, TP.HCM`
   - Khoa: Công nghệ thông tin
   - Lớp: CNTT-K19
3. Click "Thêm mới"

**Kết quả mong đợi:**

- ✅ Hiển thị alert "Thêm sinh viên thành công!"
- ✅ Modal đóng lại
- ✅ Bảng hiển thị 4 sinh viên (thêm SV004 vào cuối)
- ✅ Thông tin hiển thị đầy đủ và chính xác

---

### Test Case 3.3: Thêm sinh viên - Validation thiếu thông tin bắt buộc

**Bước thực hiện:**

1. Click "Thêm sinh viên"
2. Để trống "Mã sinh viên"
3. Nhập họ tên: `Test User`
4. Để trống Email
5. Click "Thêm mới"

**Kết quả mong đợi:**

- ✅ Hiển thị alert "Vui lòng nhập đầy đủ thông tin bắt buộc!"
- ✅ Modal không đóng
- ✅ Không thêm vào danh sách

---

### Test Case 3.4: Sửa thông tin sinh viên

**Bước thực hiện:**

1. Click nút "Sửa" ở dòng SV001
2. Modal hiển thị thông tin cũ
3. Sửa họ tên thành: `Nguyễn Văn A - Updated`
4. Sửa SĐT thành: `0987654321`
5. Click "Cập nhật"

**Kết quả mong đợi:**

- ✅ Hiển thị alert "Cập nhật sinh viên thành công!"
- ✅ Modal đóng
- ✅ Bảng hiển thị thông tin mới của SV001
- ✅ Các thông tin khác không thay đổi

---

### Test Case 3.5: Xóa sinh viên

**Bước thực hiện:**

1. Click nút "Xóa" ở dòng SV003
2. Confirm dialog hiển thị
3. Click "OK"

**Kết quả mong đợi:**

- ✅ Hiển thị confirm "Bạn có chắc chắn muốn xóa sinh viên này?"
- ✅ Sau khi OK: hiển thị alert "Đã xóa sinh viên thành công!"
- ✅ SV003 biến mất khỏi bảng
- ✅ Chỉ còn 2 sinh viên (nếu chưa thêm mới)

---

### Test Case 3.6: Tìm kiếm sinh viên theo tên

**Bước thực hiện:**

1. Nhập vào ô "Tìm kiếm": `Nguyễn`
2. Click nút "Tìm"

**Kết quả mong đợi:**

- ✅ Chỉ hiển thị sinh viên có tên chứa "Nguyễn" (SV001)
- ✅ Các sinh viên khác bị ẩn

---

### Test Case 3.7: Lọc sinh viên theo lớp

**Bước thực hiện:**

1. Chọn dropdown "Lớp": `CNTT-K19`
2. Click "Tìm"

**Kết quả mong đợi:**

- ✅ Chỉ hiển thị sinh viên thuộc lớp CNTT-K19
- ✅ Sinh viên lớp khác bị ẩn

---

### Test Case 3.8: Reset bộ lọc

**Bước thực hiện:**

1. Sau khi đã lọc/tìm kiếm
2. Click nút "Reset"

**Kết quả mong đợi:**

- ✅ Các ô tìm kiếm và dropdown về trạng thái ban đầu (trống/"Tất cả")
- ✅ Hiển thị lại toàn bộ danh sách sinh viên

---

## 4. Kiểm thử quản lý môn học

**Đăng nhập:** admin hoặc teacher

### Test Case 4.1: Xem danh sách môn học

**Bước thực hiện:**

1. Click menu "Môn học"

**Kết quả mong đợi:**

- ✅ Hiển thị tiêu đề "Quản lý môn học"
- ✅ Hiển thị 6 cards môn học dạng grid
- ✅ Mỗi card hiển thị: icon, tên môn, mã môn, số tín chỉ, khoa, nút Sửa và Xóa

---

### Test Case 4.2: Thêm môn học mới

**Bước thực hiện:**

1. Click "Thêm môn học"
2. Nhập:
   - Mã: `CS107`
   - Tên: `Machine Learning`
   - Số tín chỉ: `4`
   - Khoa: Công nghệ thông tin
   - Mô tả: `Học máy và ứng dụng`
3. Click "Thêm mới"

**Kết quả mong đợi:**

- ✅ Alert "Thêm môn học thành công!"
- ✅ Danh sách có 7 cards
- ✅ Card mới hiển thị đúng thông tin

---

### Test Case 4.3: Sửa môn học

**Bước thực hiện:**

1. Click "Sửa" ở card bất kỳ
2. Sửa số tín chỉ từ 3 → 4
3. Sửa mô tả
4. Click "Cập nhật"

**Kết quả mong đợi:**

- ✅ Alert "Cập nhật môn học thành công!"
- ✅ Card hiển thị thông tin mới

---

### Test Case 4.4: Xóa môn học

**Bước thực hiện:**

1. Click "Xóa" ở một card
2. Confirm OK

**Kết quả mong đợi:**

- ✅ Confirm "Bạn có chắc chắn muốn xóa môn học này?"
- ✅ Alert "Đã xóa môn học thành công!"
- ✅ Card biến mất

---

## 5. Kiểm thử quản lý lớp học

### Test Case 5.1: Xem danh sách lớp

**Bước thực hiện:**

1. Click menu "Lớp học"

**Kết quả mong đợi:**

- ✅ Hiển thị 4 cards lớp học
- ✅ Mỗi card: icon Users, tên lớp, mã lớp, khoa, năm học, sĩ số

---

### Test Case 5.2: Thêm lớp học

**Bước thực hiện:**

1. Click "Thêm lớp học"
2. Nhập:
   - Mã: `CNTT-K20`
   - Tên: `Công nghệ thông tin K20`
   - Khoa: Công nghệ thông tin
   - Năm học: `2024-2025`
   - Sĩ số: `45`
3. Click "Thêm mới"

**Kết quả mong đợi:**

- ✅ Alert thành công
- ✅ Danh sách có 5 cards
- ✅ Thông tin chính xác

---

### Test Case 5.3: Sửa và xóa lớp học

- Tương tự Test Case 4.3 và 4.4

---

## 6. Kiểm thử quản lý điểm

### Test Case 6.1: Xem danh sách điểm

**Bước thực hiện:**

1. Click menu "Điểm"

**Kết quả mong đợi:**

- ✅ Hiển thị form lọc: Sinh viên, Môn học, nút Lọc và Reset
- ✅ Bảng điểm với cột: Sinh viên, Môn học, Điểm giữa kỳ, Điểm cuối kỳ, Điểm TB, Xếp loại, Thao tác
- ✅ Hiển thị 3 bản ghi điểm
- ✅ Xếp loại hiển thị badge màu (Giỏi=blue, Khá=green, TB=yellow, Yếu=red)
- ✅ Thống kê ở dưới: số lượng Xuất sắc, Giỏi, Khá, TB&Yếu

---

### Test Case 6.2: Sửa điểm

**Bước thực hiện:**

1. Click icon "Sửa" ở dòng đầu tiên
2. Cột Điểm GK và CK chuyển thành input
3. Sửa Điểm GK: `8.5`
4. Sửa Điểm CK: `9.0`
5. Click icon "Lưu" (Save)

**Kết quả mong đợi:**

- ✅ Điểm TB tự động tính: `8.5*0.3 + 9.0*0.7 = 8.85`
- ✅ Xếp loại tự động chuyển thành "Giỏi"
- ✅ Alert "Cập nhật điểm thành công!"
- ✅ Input chuyển về text

---

### Test Case 6.3: Hủy sửa điểm

**Bước thực hiện:**

1. Click "Sửa"
2. Thay đổi điểm
3. Click icon "X" (Hủy)

**Kết quả mong đợi:**

- ✅ Input đóng lại
- ✅ Điểm giữ nguyên không thay đổi

---

### Test Case 6.4: Lọc điểm theo sinh viên

**Bước thực hiện:**

1. Chọn dropdown "Sinh viên": `Nguyễn Văn A`
2. Click "Lọc"

**Kết quả mong đợi:**

- ✅ Chỉ hiển thị điểm của Nguyễn Văn A
- ✅ Thống kê cập nhật theo kết quả lọc

---

### Test Case 6.5: Validation nhập điểm

**Bước thực hiện:**

1. Click "Sửa"
2. Nhập Điểm GK: `15` (vượt quá 10)
3. Click "Lưu"

**Kết quả mong đợi:**

- ✅ HTML5 validation không cho nhập (do input có max="10")
- ✅ Nếu bypass được, điểm TB sẽ tính sai → cần xử lý validation

---

### Test Case 6.6: Kiểm tra công thức tính điểm

**Bước thực hiện:**

1. Sửa điểm: GK=6.0, CK=8.0
2. Lưu

**Kết quả mong đợi:**

- ✅ Điểm TB = 6.0*0.3 + 8.0*0.7 = 1.8 + 5.6 = 7.4
- ✅ Xếp loại: Khá (7-8)

---

## 7. Kiểm thử đăng ký học phần

**Lưu ý:** Tính năng này mở cho cả student

### Test Case 7.1: Xem danh sách đăng ký (Admin/Teacher)

**Bước thực hiện:**

1. Đăng nhập admin/teacher
2. Click "Đăng ký HP"

**Kết quả mong đợi:**

- ✅ 3 cards thống kê: Tổng đăng ký (3), Đang hoạt động (3), Sinh viên tham gia (3)
- ✅ Bảng với 3 bản ghi
- ✅ Cột: Sinh viên, Môn học, Số TC, Học kỳ, Ngày đăng ký, Trạng thái, Thao tác
- ✅ Nút "Đăng ký mới"

---

### Test Case 7.2: Đăng ký học phần mới

**Bước thực hiện:**

1. Click "Đăng ký mới"
2. Chọn Sinh viên: `Nguyễn Văn A`
3. Chọn Môn học: `Lập trình Java (CS102) - 4 TC`
4. Click "Đăng ký"

**Kết quả mong đợi:**

- ✅ Hiển thị tổng TC hiện tại của SV
- ✅ Hiển thị TC sau khi đăng ký
- ✅ Alert "Đăng ký học phần thành công!"
- ✅ Bảng thêm 1 dòng mới
- ✅ Thống kê cập nhật

---

### Test Case 7.3: Kiểm tra trùng lặp đăng ký

**Bước thực hiện:**

1. Click "Đăng ký mới"
2. Chọn Sinh viên và Môn học đã tồn tại trong danh sách
3. Click "Đăng ký"

**Kết quả mong đợi:**

- ✅ Alert "Sinh viên đã đăng ký môn học này!"
- ✅ Không thêm vào danh sách

---

### Test Case 7.4: Hủy đăng ký

**Bước thực hiện:**

1. Click icon "Xóa" (Trash) ở một dòng
2. Confirm OK

**Kết quả mong đợi:**

- ✅ Confirm "Bạn có chắc chắn muốn hủy đăng ký này?"
- ✅ Alert "Đã hủy đăng ký thành công!"
- ✅ Dòng bị xóa
- ✅ Thống kê cập nhật

---

## 8. Kiểm thử báo cáo & thống kê

### Test Case 8.1: Báo cáo sinh viên

**Bước thực hiện:**

1. Click "Báo cáo"
2. Tab "Báo cáo sinh viên" được chọn mặc định

**Kết quả mong đợi:**

- ✅ Form lọc: Lọc theo lớp, Lọc theo khoa
- ✅ Bảng hiển thị: Mã SV, Họ tên, Lớp, Khoa, Số môn đăng ký, Điểm TB
- ✅ Điểm TB tính từ tất cả môn của sinh viên
- ✅ Số môn đăng ký = số bản ghi enrollment của SV đó

---

### Test Case 8.2: Lọc báo cáo theo lớp

**Bước thực hiện:**

1. Chọn "Lọc theo lớp": `CNTT-K19`

**Kết quả mong đợi:**

- ✅ Chỉ hiển thị SV thuộc lớp CNTT-K19
- ✅ Thông tin chính xác

---

### Test Case 8.3: Thống kê điểm

**Bước thực hiện:**

1. Click tab "Thống kê điểm"

**Kết quả mong đợi:**

- ✅ 5 cards: Xuất sắc (≥9), Giỏi (8-9), Khá (7-8), TB (5-7), Yếu (<5)
- ✅ Hiển thị số lượng và %
- ✅ Biểu đồ thanh ngang (progress bar) cho mỗi xếp loại
- ✅ Màu sắc phù hợp

---

### Test Case 8.4: Thống kê đăng ký

**Bước thực hiện:**

1. Click tab "Thống kê đăng ký"

**Kết quả mong đợi:**

- ✅ Bảng hiển thị: Mã MH, Tên môn, Số TC, Số SV đăng ký, Mức độ phổ biến (progress bar)
- ✅ Sắp xếp theo số SV đăng ký giảm dần
- ✅ Progress bar tính % = (số SV đăng ký / tổng SV) \* 100

---

### Test Case 8.5: Xuất báo cáo

**Bước thực hiện:**

1. Click nút "Xuất báo cáo"

**Kết quả mong đợi:**

- ✅ Alert "Chức năng xuất báo cáo sẽ được triển khai trong phiên bản tiếp theo!"
- (Tính năng chưa hoàn thiện)

---

## 9. Kiểm thử phân quyền

### Test Case 9.1: Quyền Admin

**Bước thực hiện:**

1. Đăng nhập admin

**Kết quả mong đợi:**

- ✅ Truy cập được tất cả menu: Dashboard, Sinh viên, Môn học, Lớp học, Điểm, Đăng ký HP, Báo cáo
- ✅ Có thể thêm/sửa/xóa tất cả

---

### Test Case 9.2: Quyền Teacher

**Bước thực hiện:**

1. Đăng nhập teacher

**Kết quả mong đợi:**

- ✅ Giống Admin

---

### Test Case 9.3: Quyền Student

**Bước thực hiện:**

1. Đăng nhập student
2. Thử truy cập trực tiếp `http://localhost:5173/students` bằng URL

**Kết quả mong đợi:**

- ✅ Menu chỉ có: Dashboard, Đăng ký HP
- ✅ Khi truy cập /students → hiển thị "Bạn không có quyền truy cập trang này"
- ✅ Dashboard hiển thị thống kê cá nhân

---

### Test Case 9.4: Truy cập khi chưa đăng nhập

**Bước thực hiện:**

1. Đăng xuất (hoặc xóa localStorage)
2. Truy cập `http://localhost:5173/dashboard`

**Kết quả mong đợi:**

- ✅ Tự động redirect về /login
- ✅ Không hiển thị nội dung dashboard

---

## 10. Kiểm thử UI/UX

### Test Case 10.1: Responsive design

**Bước thực hiện:**

1. Mở DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Chọn Mobile (375px), Tablet (768px), Desktop (1920px)

**Kết quả mong đợi:**

- ✅ Mobile: Form và bảng responsive, sidebar có thể thu gọn
- ✅ Tablet: Grid 2 cột cho cards
- ✅ Desktop: Grid 3 cột, layout rộng rãi

---

### Test Case 10.2: Modal popup

**Bước thực hiện:**

1. Mở bất kỳ modal (Thêm SV, Thêm MH...)

**Kết quả mong đợi:**

- ✅ Overlay tối (backdrop)
- ✅ Modal căn giữa màn hình
- ✅ Responsive với mobile
- ✅ Có thể scroll nếu nội dung dài
- ✅ Click nút "Hủy" → đóng modal
- ✅ Click overlay → KHÔNG đóng (để tránh mất dữ liệu)

---

### Test Case 10.3: Form validation UI

**Bước thực hiện:**

1. Mở form thêm sinh viên
2. Click "Thêm mới" khi để trống field required

**Kết quả mong đợi:**

- ✅ HTML5 validation highlight field
- ✅ Hoặc hiển thị alert rõ ràng
- ✅ Focus vào field lỗi đầu tiên

---

### Test Case 10.4: Loading states

**Kết quả mong đợi:**

- ✅ Auth context kiểm tra loading trước khi render
- ✅ "Loading..." hiển thị khi đang xác thực

---

### Test Case 10.5: Consistency

**Kiểm tra:**

- ✅ Màu sắc nhất quán: blue cho primary, red cho delete, green cho success
- ✅ Font size và spacing đồng nhất
- ✅ Icon sử dụng từ lucide-react
- ✅ Button style giống nhau trên toàn app
- ✅ Table header style giống nhau

---

## 📊 Bảng tổng hợp kết quả kiểm thử

| Module                 | Tổng Test Cases | Pass | Fail | Note |
| ---------------------- | --------------- | ---- | ---- | ---- |
| Đăng nhập & Phân quyền | 9               | -    | -    |      |
| Quản lý sinh viên      | 8               | -    | -    |      |
| Quản lý môn học        | 4               | -    | -    |      |
| Quản lý lớp học        | 3               | -    | -    |      |
| Quản lý điểm           | 6               | -    | -    |      |
| Đăng ký học phần       | 4               | -    | -    |      |
| Báo cáo & Thống kê     | 5               | -    | -    |      |
| UI/UX                  | 5               | -    | -    |      |
| **TỔNG**               | **44**          | -    | -    |      |

---

## 🐛 Báo cáo lỗi

Nếu phát hiện lỗi trong quá trình kiểm thử, vui lòng ghi nhận theo mẫu:

**Bug ID:** BUG-001  
**Module:** Quản lý sinh viên  
**Mô tả:** Không validate email format  
**Bước tái hiện:**

1. Thêm SV
2. Nhập email: `test@`
3. Submit

**Kết quả thực tế:** Chấp nhận  
**Kết quả mong đợi:** Báo lỗi format email  
**Mức độ:** Medium  
**Screenshot:** (nếu có)

---

## ✅ Checklist tổng thể

- [ ] Tất cả test cases đã chạy
- [ ] Không có lỗi critical
- [ ] UI responsive trên các thiết bị
- [ ] Validation hoạt động đúng
- [ ] Phân quyền chính xác
- [ ] Dữ liệu tính toán chính xác (điểm TB, tổng TC...)
- [ ] Không có console errors
- [ ] Performance tốt (load < 3s)

---

**Người kiểm thử:** ******\_\_\_******  
**Ngày kiểm thử:** ******\_\_\_******  
**Phiên bản:** 1.0.0  
**Trạng thái:** [ ] Pass [ ] Fail [ ] Pending
