# TỔNG HỢP DANH SÁCH TEST CASE (Chi tiết từ Source Code)

Tài liệu này tổng hợp **113** Test Case hiện có trong hệ thống, được trích xuất trực tiếp từ mã nguồn Unit Test (Jest) và Kịch bản Kiểm thử (Cypress), cùng các kịch bản kiểm thử hệ thống (Manual).

## 1. Unit Test (Jest)
**Nguồn:** `src/utils/helpers.test.js`, `src/contexts/AuthContext.test.jsx`

| STT | ID | Tên Test Case | Mô tả / Kịch bản | Pre-Condition | Các bước thực hiện (Logic trong Code) | Kết quả Mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **UT-01** | `calculateGPA_Empty` | Tính GPA với mảng rỗng | Không | Gọi `calculateGPA([])` | Trả về `0` | Automated |
| 2 | **UT-02** | `calculateGPA_Null` | Tính GPA với null | Không | Gọi `calculateGPA(null)` | Trả về `0` | Automated |
| 3 | **UT-03** | `calculateGPA_Valid` | Tính GPA hợp lệ (chuẩn) | Không | Gọi với mảng điểm hợp lệ | Trả về chuỗi GPA đúng (VD: "3.00") | Automated |
| 4 | **UT-04** | `calculateGPA_DefaultCredits`| Tính GPA thiếu tín chỉ | Không | Gọi object thiếu `credits` | Dùng default (3), tính đúng | Automated |
| 5 | **UT-05** | `calculateGPA_Fail` | Tính GPA khi rớt (điểm thấp) | Không | Gọi với điểm < 4.0 | Trả về "0.00" (hoặc giá trị thấp tương ứng) | Automated |
| 6 | **UT-06** | `formatDate_Valid` | Format ngày chuẩn | Không | Gọi `formatDate("2023-01-01")` | Trả về "01/01/2023" | Automated |
| 7 | **UT-07** | `formatDate_Null` | Format ngày null/undefined | Không | Gọi `formatDate(null)` | Trả về chuỗi rỗng | Automated |
| 8 | **UT-08** | `exportCSV_Empty` | Xuất CSV dữ liệu rỗng | Console mocked | Gọi `exportToCSV([])` | Log warn "No data", không tạo thẻ `<a>` | **Skipped** |
| 9 | **UT-09** | `exportCSV_Valid` | Xuất CSV dữ liệu chuẩn | DOM mocked | Gọi `exportToCSV(data)` | Tạo link blob, click download, remove link | **Skipped** |
| 10 | **UT-10** | `exportCSV_Comma` | Xuất CSV data chứa dấu phẩy | DOM mocked | Gọi `exportToCSV` với string có `,` | Xử lý đúng format CSV | **Skipped** |
| 11 | **UT-11** | `Auth_Initial` | State khởi tạo ban đầu | LocalStorage trống | Render `AuthProvider`, check hook | `user`=null, `isAuthenticated`=false | Automated |
| 12 | **UT-12** | `Auth_Login_Admin` | Login thành công (Admin) | Mock API | Gọi `login("admin", "admin123")` | State: `isAdmin`=true, `isAuthenticated`=true | Automated |
| 13 | **UT-13** | `Auth_Login_Student` | Login thành công (Student) | Mock API | Gọi `login("student", "student123")` | State: `isStudent`=true, user updated | Automated |
| 14 | **UT-14** | `Auth_Login_Fail` | Login sai mật khẩu | Mock API | Gọi `login` với pass sai | Return error, state null | Automated |
| 15 | **UT-15** | `Auth_Logout` | Đăng xuất thành công | Đã login | Gọi `logout()` | `user`=null, Clear LocalStorage | Automated |
| 16 | **UT-16** | `Auth_Restore` | Khôi phục session | LocalStorage có user | Render lại `AuthProvider` | State tự động load user từ storage | Automated |

## 2. Integration Test (Cypress)
**Nguồn:** `cypress/e2e/*.cy.js`

### 2.1 Authentication (`auth.cy.js`)
| STT | ID | Tên Test Case | Mô tả / Kịch bản | Pre-Condition | Các bước thực hiện | Kết quả Mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 17 | **INT-01** | `UI_Login_Display` | Hiển thị form Login | Trang Login | Check `h1`, `input`, `button` | Hiển thị đầy đủ element | Automated |
| 18 | **INT-02** | `UI_Login_Empty` | Validate form rỗng | Trang Login | Click Submit (trống) | Input hiện `required` | Automated |
| 19 | **INT-03** | `UI_Login_Wrong` | Xử lý nhập sai | Trang Login | Nhập sai pass -> Submit | URL giữ nguyên `/login` | Automated |
| 20 | **INT-04** | `Flow_Login_Admin` | Luồng login Admin | Trang Login | Login "admin" -> Check Nav | Redirect `/dashboard`, hiện menu Admin | Automated |
| 21 | **INT-05** | `Flow_Logout` | Luồng đăng xuất | Đã login Admin | Click Logout | Redirect về `/login` | Automated |
| 22 | **INT-06** | `Flow_Login_Teacher` | Luồng login Giáo viên | Trang Login | Login "teacher" | Hiện menu Giáo viên (Lớp, Môn, Điểm) | Automated |
| 23 | **INT-07** | `Flow_Login_Student` | Luồng login Sinh viên | Trang Login | Login "student" | Hiện menu SV (Xem điểm, ĐKHP), ẩn menu Admin | Automated |
| 24 | **INT-08** | `Session_Persist` | Duy trì phiên khi Reload | Đã login Admin | `cy.reload()` | Vẫn ở Dashboard, còn session | Automated |
| 25 | **INT-09** | `Route_Anon` | Chặn truy cập nặc danh | Chưa login | Access `/students` | Redirect `/login` | Automated |
| 26 | **INT-10** | `Route_Student_Admin`| Chặn Student vào trang Admin | Login Student | Access `/students` | Báo lỗi quyền truy cập | Automated |
| 27 | **INT-11** | `Route_Teacher_Admin`| Chặn Teacher vào trang Admin | Login Teacher | Access `/settings` | Báo lỗi quyền truy cập | Automated |

### 2.2 Student Management (`students.cy.js`)
| STT | ID | Tên Test Case | Mô tả / Kịch bản | Pre-Condition | Các bước thực hiện | Kết quả Mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 28 | **INT-12** | `Stu_ViewList` | Xem danh sách SV | Login Admin | Vào trang QLSV | Hiển thị bảng, có dữ liệu | Automated |
| 29 | **INT-13** | `Stu_TableData` | Dữ liệu bảng đúng | Trang QLSV | Check `tbody tr` | Có ít nhất 1 dòng | Automated |
| 30 | **INT-14** | `Stu_RowDetail` | Đủ cột thông tin | Trang QLSV | Check row first | Có đủ 5 cột thông tin | Automated |
| 31 | **INT-15** | `Stu_Search` | Tìm kiếm theo tên | Trang QLSV | Type "Trần" | Lọc row có tên "Trần" | Automated |
| 32 | **INT-16** | `Stu_Filter_Dept` | Lọc theo Khoa | Trang QLSV | Select Khoa | Bảng update dữ liệu | Automated |
| 33 | **INT-17** | `Stu_Filter_Class` | Lọc theo Lớp | Trang QLSV | Select Lớp | Bảng update dữ liệu | Automated |
| 34 | **INT-18** | `Stu_Add_Open` | Mở form Thêm | Trang QLSV | Click "Thêm SV" | Hiện Modal/Form title đúng | Automated |
| 35 | **INT-19** | `Stu_Add_Valid` | Validate form Thêm | Form Thêm | Submit form trống | Báo lỗi invalid input | Automated |
| 36 | **INT-20** | `Stu_Add_Success` | Thêm SV thành công | Trang QLSV | Fill info -> Submit | Modal đóng, Bảng có SV mới | Automated |
| 37 | **INT-21** | `Stu_Edit_Open` | Mở form Sửa | Trang QLSV | Click icon Sửa | Hiện modal Sửa | Automated |
| 38 | **INT-22** | `Stu_Edit_Success` | Sửa SV thành công | Form Sửa | Đổi tên -> Submit | Tên cập nhật trên bảng | Automated |
| 39 | **INT-23** | `Stu_Delete` | Xóa sinh viên | Trang QLSV | Click icon Xóa | Hiện Confirm Dialog | Automated |
| 40 | **INT-24** | `Stu_Detail_Click` | Xem chi tiết (Click row) | Trang QLSV | Click vào row | Hiện thông tin chi tiết | Automated |
| 41 | **INT-25** | `Stu_Export` | Xuất CSV | Trang QLSV | Click "Xuất CSV" | Trigger download file | Automated |

### 2.3 Grades & Enrollment (`grades-enrollment.cy.js`)
| STT | ID | Tên Test Case | Mô tả / Kịch bản | Pre-Condition | Các bước thực hiện | Kết quả Mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 42 | **INT-26** | `Grd_Page_Display` | Trang QL Điểm | Login Admin | Vào QL Điểm | Hiện URL `/grades`, Title đúng | Automated |
| 43 | **INT-27** | `Grd_Table` | Bảng điểm | Trang QL Điểm | Check `table` | Bảng tồn tại | Automated |
| 44 | **INT-28** | `Grd_Filter_Class` | Lọc điểm theo Lớp | Trang QL Điểm | Select Class | Bảng load lại | Automated |
| 45 | **INT-29** | `Grd_Filter_Subj` | Lọc điểm theo Môn | Trang QL Điểm | Select Subject | Bảng load lại | Automated |
| 46 | **INT-30** | `Grd_Edit_UI` | UI Sửa điểm | Trang QL Điểm | Click icon Sửa | Input number hiện ra | Automated |
| 47 | **INT-31** | `Grd_Edit_Calc` | Tính điểm TB khi sửa | UI Sửa điểm | Nhập 8, 8 -> Lưu | Cập nhật điểm trên dòng | Automated |
| 48 | **INT-32** | `Grd_Stats` | Thống kê điểm | Trang QL Điểm | Check div Stats | Hiện box thống kê | Automated |
| 49 | **INT-33** | `MyGrd_Page` | Trang Xem điểm (SV) | Login Student | Vào `/my-grades` | Title "Kết quả học tập" | Automated |
| 50 | **INT-34** | `MyGrd_GPA` | Hiển thị GPA | Trang Xem điểm | Check GPA Box | Hiện GPA | Automated |
| 51 | **INT-35** | `MyGrd_Table` | Bảng điểm cá nhân | Trang Xem điểm | Check Table | Hiện bảng điểm | Automated |
| 52 | **INT-36** | `MyGrd_ReadOnly` | Không được sửa điểm | Trang Xem điểm | Tìm nút Sửa/Xóa | Không tồn tại | Automated |
| 53 | **INT-37** | `Enr_Page` | Trang ĐKHP (Admin) | Login Admin | Vào `/enrollment` | Title "Đăng ký học phần" | Automated |
| 54 | **INT-38** | `Enr_Table` | Bảng Đăng ký | Trang ĐKHP | Check Table | Bảng tồn tại | Automated |
| 55 | **INT-39** | `Enr_Add_Open` | Mở form ĐKHP | Trang ĐKHP | Click "Đăng ký mới" | Hiện Modal Form | Automated |
| 56 | **INT-40** | `Enr_Add_Exec` | Thực hiện ĐKHP | Form ĐKHP | Chọn SV & Môn -> Submit | Đăng ký thành công | Automated |
| 57 | **INT-41** | `Enr_Filter_Stu` | Lọc ĐKHP theo SV | Trang ĐKHP | Select Student | Table update | Automated |
| 58 | **INT-42** | `Enr_Filter_Sem` | Lọc ĐKHP theo Kỳ | Trang ĐKHP | Select Semester | Table update | Automated |
| 59 | **INT-43** | `MyEnr_List` | Trang ĐKHP (SV) | Login Student | Vào `/enrollment` | List môn Available | Automated |
| 60 | **INT-44** | `MyEnr_Enrolled` | List môn đã ĐK | Trang ĐKHP (SV) | Check section đã ĐK | Hiện môn đã ĐK | Automated |
| 61 | **INT-45** | `Teach_ViewGrd` | Quyền xem điểm (Teacher) | Login Teacher | Vào QL Điểm | Xem được bảng điểm | Automated |
| 62 | **INT-46** | `Teach_EditGrd` | Quyền nhập điểm (Teacher)| Trang QL Điểm | Check nút Sửa | Button Sửa tồn tại | Automated |

### 2.4 Courses & Classes (`courses-classes.cy.js`)
| STT | ID | Tên Test Case | Mô tả / Kịch bản | Pre-Condition | Các bước thực hiện | Kết quả Mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 63 | **INT-47** | `Subj_Page` | Trang QL Môn học | Login Admin | Vào `/subjects` | Title "Quản lý môn học" | Automated |
| 64 | **INT-48** | `Subj_List` | Danh sách Môn | Trang QL Môn | Check Grid/Table | Items tồn tại | Automated |
| 65 | **INT-49** | `Subj_Add_Open` | Form Thêm Môn | Trang QL Môn | Click Thêm Môn | Hiện Modal | Automated |
| 66 | **INT-50** | `Subj_Add_Exec` | Thêm Môn thành công | Form Thêm Môn | Điền Form -> Submit | Item mới xuất hiện | Automated |
| 67 | **INT-51** | `Subj_Search` | Tìm kiếm Môn | Trang QL Môn | Type Search | Update list | Automated |
| 68 | **INT-52** | `Class_Page` | Trang QL Lớp | Login Admin | Vào `/classes` | Title "Quản lý lớp học" | Automated |
| 69 | **INT-53** | `Class_List` | Danh sách Lớp | Trang QL Lớp | Check Grid/Table | Items tồn tại | Automated |
| 70 | **INT-54** | `Class_Add_Open` | Form Thêm Lớp | Trang QL Lớp | Click Thêm Lớp | Hiện Modal | Automated |
| 71 | **INT-55** | `Class_Add_Exec` | Thêm Lớp thành công | Form Thêm Lớp | Điền Form -> Submit | Item mới xuất hiện | Automated |
| 72 | **INT-56** | `Class_Detail` | Chi tiết Lớp | Trang QL Lớp | Click Sửa/Chi tiết | Hiện Body/Detail | Automated |
| 73 | **INT-57** | `Teach_ViewSubj` | Teacher xem Môn | Login Teacher | Vào Môn học | Xem được List | Automated |
| 74 | **INT-58** | `Teach_ViewClass` | Teacher xem Lớp | Login Teacher | Vào Lớp học | Xem được List | Automated |

### 2.5 Dashboard & Reports (`dashboard-reports.cy.js`)
| STT | ID | Tên Test Case | Mô tả / Kịch bản | Pre-Condition | Các bước thực hiện | Kết quả Mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 75 | **INT-59** | `Dash_Admin_UI` | UI Dashboard Admin | Login Admin | Check Title, Cards | Hiển thị đầy đủ | Automated |
| 76 | **INT-60** | `Dash_Admin_Stats`| Widget Thống kê | Dashboard Admin | Check "Tổng sinh viên" | Card tồn tại | Automated |
| 77 | **INT-61** | `Dash_Admin_Main` | Main Content | Dashboard Admin | Check Main Area | Visible | Automated |
| 78 | **INT-62** | `Dash_Teach_UI` | UI Dashboard Teacher | Login Teacher | Check Title | Hiển thị đúng | Automated |
| 79 | **INT-63** | `Dash_Teach_Stats`| Widget Teacher | Dashboard Teacher | Check "Tổng lớp học" | Card tồn tại | Automated |
| 80 | **INT-64** | `Dash_Stu_UI` | UI Dashboard Student | Login Student | Check Title | Hiển thị đúng | Automated |
| 81 | **INT-65** | `Dash_Stu_GPA` | Widget GPA | Dashboard Student | Check "Điểm TB" | Card tồn tại | Automated |
| 82 | **INT-66** | `Rpt_Page` | Trang Báo cáo | Login Admin | Vào `/reports` | Title "Báo cáo" | Automated |
| 83 | **INT-67** | `Rpt_Selector` | Chọn loại Báo cáo | Trang Báo cáo | Check Select/Button | Controls tồn tại | Automated |
| 84 | **INT-68** | `Rpt_Stu_List` | Bảng Báo cáo SV | Trang Báo cáo | Click "Báo cáo SV" | Table hiện | Automated |
| 85 | **INT-69** | `Rpt_Filter_Dept` | Lọc Báo cáo Khoa | Báo cáo SV | Select Khoa | Grid update | Automated |
| 86 | **INT-70** | `Rpt_Filter_Class`| Lọc Báo cáo Lớp | Báo cáo SV | Select Lớp | Grid update | Automated |
| 87 | **INT-71** | `Rpt_Grade_Gen` | Tạo Báo cáo Điểm | Trang Báo cáo | Click "Thống kê điểm" | Body content hiện | Automated |
| 88 | **INT-72** | `Rpt_Grade_Chart` | Biểu đồ Điểm | Báo cáo Điểm | Check Chart Container | Biểu đồ tồn tại | Automated |
| 89 | **INT-73** | `Rpt_Export_Btn` | Nút Xuất Báo cáo | Trang Báo cáo | Check Button | Tồn tại | Automated |
| 90 | **INT-74** | `Set_Page` | Trang Cài đặt | Login Admin | Vào `/settings` | Title "Cài đặt" | Automated |
| 91 | **INT-75** | `Set_Tabs` | Các Tabs Cài đặt | Trang Cài đặt | Check Tab "Chung" | Tồn tại | Automated |
| 92 | **INT-76** | `Set_Save` | Lưu Cài đặt | Trang Cài đặt | Check Button Lưu | Tồn tại | Automated |
| 93 | **INT-77** | `Nav_Links` | Điều hướng Sidebar | Login Admin | Click lần lượt các menu | URL thay đổi đúng | Automated |
| 94 | **INT-78** | `Nav_Active` | Active State Menu | Dashboard | Nav đến 1 trang | Menu item có class active | Automated |

## 3. System Test (Manual / JMeter)
**Nguồn:** Kịch bản kiểm thử hiệu năng và tương thích hệ thống.

| STT | ID | Tên Test Case | Mô tả / Kịch bản | Pre-Condition | Các bước thực hiện | Kết quả Mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 95 | **SYS-01** | `Mobile_View` | Responsive Mobile | Giả lập Mobile | Mở DevTools iPhone | Menu thu gọn, không vỡ UI | Manual |
| 96 | **SYS-02** | `Tablet_View` | Responsive Tablet | Giả lập Tablet | Mở DevTools iPad | Layout 2 cột đẹp | Manual |
| 97 | **SYS-03** | `Cross_Chrome` | Chạy trên Chrome | Cài Chrome | Test APP trên Chrome | Hoạt động tốt | Manual |
| 98 | **SYS-04** | `Cross_Firefox` | Chạy trên Firefox | Cài Firefox | Test APP trên Firefox | Hoạt động tốt | Manual |
| 99 | **SYS-05** | `Network_Loss` | Mất mạng khi save | Form Input | Tắt Wifi -> Save | Báo lỗi, không crash | Manual |
| 100 | **SYS-06** | `Input_Valid` | Validate HTML5 | Form Input | Nhập mail sai format | Báo lỗi đỏ | Manual |
| 101 | **SYS-07** | `Auth_Logout_All` | Logout toàn bộ | Đã login | Click Logout | Clear Session storage | Manual |
| 102 | **SYS-08** | `SQL_Inject` | Test SQL Injection | Search Field | Nhập `' OR 1=1` | Không lỗi server | Manual |
| 103 | **SYS-09** | `Perf_Login` | Load Test Login | JMeter | 50 Users concurrent | Response < 1s | JMeter |
| 104 | **SYS-10** | `Perf_Search` | Load Test Search | JMeter | Search 1000 items | Response < 0.5s | JMeter |
| 105 | **SYS-11** | `Concurrent_Edit` | Sửa đồng thời | 2 Tabs | Cùng sửa 1 SV | Last write wins | Manual |
| 106 | **SYS-12** | `UI_Consistency` | Nhất quán UI | Toàn app | Check Font, Color | Đồng bộ theo Design | Manual |
| 107 | **SYS-13** | `Role_Guard_URL` | Chặn truy cập URL | User thường | Gõ URL Admin | Redirect/Block | Manual |
| 108 | **SYS-14** | `Data_Export_CSV` | Xuất dữ liệu thật | Page có Table | Click Export | File tải về đúng format | Manual |
| 109 | **SYS-15** | `Print_Report` | In báo cáo | Page Báo cáo | Click In/Print | Cửa sổ in hiển thị đúng | Manual |
| 110 | **SYS-16** | `Dark_Mode` | Chế độ tối (nếu có) | Settings | Toggle Dark Mode | Giao diện chuyển màu | Manual |
| 111 | **SYS-17** | `Notif_Toast` | Thông báo Toast | Action | Thực hiện Save | Toast hiện góc màn hình | Manual |
| 112 | **SYS-18** | `Modal_Close` | Đóng Modal | Modal Open | Click Outside/X | Modal đóng | Manual |
| 113 | **SYS-19** | `Tab_Order` | Thứ tự Tab | Form | Nhấn Tab key | Focus đi đúng thứ tự | Manual |
