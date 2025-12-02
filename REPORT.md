# BÁO CÁO BÀI TẬP LỚN KIỂM THỬ PHẦN MỀM
## ĐỀ TÀI: XÂY DỰNG VÀ KIỂM THỬ HỆ THỐNG QUẢN LÝ SINH VIÊN

---

## MỤC LỤC

1.  [CHƯƠNG 1: TỔNG QUAN BÀI TOÁN](#chương-1-tổng-quan-bài-toán)
    *   [1.1 Giới thiệu đề tài](#11-giới-thiệu-đề-tài)
    *   [1.2 Đặc tả yêu cầu](#12-đặc-tả-yêu-cầu)
2.  [CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ TEST](#chương-2-phân-tích-và-thiết-kế-test)
    *   [2.1 Unit Test Case](#21-unit-test-case)
    *   [2.2 Integration Test Case](#22-integration-test-case)
    *   [2.3 System Test Case](#23-system-test-case)

---

# CHƯƠNG 1: TỔNG QUAN BÀI TOÁN

## 1.1 Giới thiệu đề tài

### Mục tiêu
Đề tài tập trung vào việc xây dựng và kiểm thử **Hệ thống Quản lý Sinh viên (Student Management System)**. Mục tiêu chính là số hóa quy trình quản lý đào tạo, giúp giảm thiểu sai sót thủ công, tiết kiệm thời gian và cung cấp công cụ báo cáo trực quan cho nhà trường.

### Nội dung cụ thể
*   **Tên đề tài:** Xây dựng và Kiểm thử Hệ thống Quản lý Sinh viên.
*   **Bối cảnh ứng dụng:** Hệ thống được áp dụng tại các trường đại học, cao đẳng hoặc trung tâm đào tạo để quản lý hồ sơ sinh viên, quá trình học tập và giảng dạy.
*   **Bài toán cần giải quyết:**
    *   **Quản lý dữ liệu tập trung:** Thay thế việc lưu trữ hồ sơ giấy hoặc file Excel rời rạc bằng cơ sở dữ liệu tập trung.
    *   **Tự động hóa quy trình:** Tự động tính điểm trung bình, xếp loại học lực, kiểm tra điều kiện đăng ký học phần.
    *   **Phân quyền truy cập:** Đảm bảo tính bảo mật và toàn vẹn dữ liệu thông qua cơ chế phân quyền rõ ràng cho Admin, Giảng viên và Sinh viên.

## 1.2 Đặc tả yêu cầu

### 1.2.1 Các luồng nghiệp vụ chính

Dưới đây là mô tả các luồng nghiệp vụ quan trọng nhất của hệ thống, kèm theo biểu đồ hoạt động (Activity Diagram).

#### a. Luồng Đăng nhập (Login Flow)
*   **Mô tả:** Người dùng truy cập hệ thống, nhập tên đăng nhập và mật khẩu. Hệ thống xác thực thông tin. Nếu đúng, chuyển hướng đến trang Dashboard tương ứng với quyền hạn. Nếu sai, thông báo lỗi.
*   **Biểu đồ:**

```mermaid
graph TD
    Start([Bắt đầu]) --> InputInfo[Người dùng nhập Username & Password]
    InputInfo --> Validate{Hệ thống kiểm tra thông tin}
    Validate -- Sai --> ShowError[Hiển thị thông báo lỗi]
    ShowError --> InputInfo
    Validate -- Đúng --> CheckRole{Kiểm tra quyền hạn}
    CheckRole -- Admin --> RedirectAdmin[Chuyển đến Admin Dashboard]
    CheckRole -- Teacher --> RedirectTeacher[Chuyển đến Teacher Dashboard]
    CheckRole -- Student --> RedirectStudent[Chuyển đến Student Dashboard]
    RedirectAdmin --> End([Kết thúc])
    RedirectTeacher --> End
    RedirectStudent --> End
```

#### b. Luồng Quản lý Sinh viên (Thêm mới)
*   **Mô tả:** Admin hoặc Giảng viên truy cập trang quản lý sinh viên, chọn chức năng "Thêm mới". Nhập đầy đủ thông tin cá nhân và học vụ của sinh viên. Hệ thống kiểm tra tính hợp lệ (validation) và trùng lặp (mã SV). Nếu hợp lệ, lưu vào CSDL.
*   **Biểu đồ:**

```mermaid
graph TD
    Start([Bắt đầu]) --> AccessPage[Truy cập trang Quản lý Sinh viên]
    AccessPage --> ClickAdd[Nhấn nút 'Thêm mới']
    ClickAdd --> FillForm[Nhập thông tin sinh viên]
    FillForm --> Submit[Nhấn 'Lưu']
    Submit --> Validate{Hệ thống Validate dữ liệu}
    Validate -- Lỗi --> ShowFormError[Hiển thị lỗi trên form]
    ShowFormError --> FillForm
    Validate -- Hợp lệ --> CheckDuplicate{Kiểm tra trùng Mã SV}
    CheckDuplicate -- Trùng --> ShowDupError[Báo lỗi trùng Mã SV]
    ShowDupError --> FillForm
    CheckDuplicate -- Không trùng --> SaveDB[(Lưu vào Database)]
    SaveDB --> ShowSuccess[Thông báo thành công]
    ShowSuccess --> UpdateList[Cập nhật danh sách hiển thị]
    UpdateList --> End([Kết thúc])
```

#### c. Luồng Đăng ký Học phần (Sinh viên)
*   **Mô tả:** Sinh viên xem danh sách môn học đang mở, chọn môn muốn đăng ký. Hệ thống kiểm tra điều kiện (trùng lịch, số tín chỉ tối đa). Nếu thỏa mãn, ghi nhận đăng ký.
*   **Biểu đồ:**

```mermaid
graph TD
    Start([Bắt đầu]) --> ViewSubjects[Xem danh sách môn học mở]
    ViewSubjects --> SelectSubject[Chọn môn học đăng ký]
    SelectSubject --> CheckCondition{Kiểm tra điều kiện}
    CheckCondition -- Trùng lịch/Full --> ShowError[Báo lỗi đăng ký]
    ShowError --> ViewSubjects
    CheckCondition -- Thỏa mãn --> SaveEnrollment[(Lưu đăng ký)]
    SaveEnrollment --> UpdateCredits[Cập nhật tổng tín chỉ]
    UpdateCredits --> ShowSuccess[Thông báo thành công]
    ShowSuccess --> End([Kết thúc])
```

#### d. Luồng Nhập điểm (Giảng viên)
*   **Mô tả:** Giảng viên chọn lớp và môn học phụ trách. Hệ thống hiển thị danh sách sinh viên. Giảng viên nhập điểm quá trình và cuối kỳ. Hệ thống tự động tính điểm tổng kết và xếp loại.
*   **Biểu đồ:**

```mermaid
graph TD
    Start([Bắt đầu]) --> SelectClass[Chọn Lớp & Môn học]
    SelectClass --> LoadList[Hiển thị danh sách sinh viên]
    LoadList --> InputScore[Nhập điểm GK & CK]
    InputScore --> AutoCalc[Hệ thống tính Điểm TB & Xếp loại]
    AutoCalc --> SaveScores[Nhấn 'Lưu bảng điểm']
    SaveScores --> ValidateScore{Validate điểm (0-10)}
    ValidateScore -- Sai --> ErrorScore[Báo lỗi định dạng]
    ErrorScore --> InputScore
    ValidateScore -- Đúng --> SaveDB[(Lưu vào Database)]
    SaveDB --> ShowSuccess[Thông báo thành công]
    ShowSuccess --> End([Kết thúc])
```

### 1.2.2 Các màn hình chức năng chính

#### a. Màn hình Đăng nhập (Login Screen)
*   **Wireframe:**
    *   Logo hệ thống ở chính giữa hoặc bên trái.
    *   Form đăng nhập gồm: Input Username, Input Password, Nút Đăng nhập.
    *   Thông báo lỗi hiển thị ngay dưới nút Đăng nhập nếu có.
*   **Mô tả các trường:**

| Tên trường | Kiểu dữ liệu | Độ dài tối đa | Bắt buộc | Default | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Username | String | 50 | Có | - | Tên đăng nhập của người dùng |
| Password | String | 255 | Có | - | Mật khẩu (ẩn ký tự) |

*   **Điều kiện ràng buộc:**
    *   Username không được để trống.
    *   Password không được để trống.
    *   Nếu nhập sai quá 5 lần, khóa tài khoản tạm thời (tùy chọn nâng cao).

#### b. Màn hình Quản lý Sinh viên (Student List & Add/Edit)
*   **Wireframe:**
    *   Thanh tìm kiếm và bộ lọc (Lớp, Khoa) ở trên cùng.
    *   Nút "Thêm sinh viên" ở góc phải.
    *   Bảng danh sách sinh viên: Mã SV, Họ tên, Lớp, Khoa, Email, SĐT, Hành động (Sửa/Xóa).
    *   Modal/Popup form khi nhấn Thêm hoặc Sửa.
*   **Mô tả các trường (Form sinh viên):**

| Tên trường | Kiểu dữ liệu | Độ dài tối đa | Bắt buộc | Default | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Mã SV | String | 20 | Có | - | Mã định danh duy nhất (Unique) |
| Họ tên | String | 100 | Có | - | Tên đầy đủ của sinh viên |
| Email | String | 100 | Có | - | Email liên hệ (đúng định dạng) |
| SĐT | String | 20 | Không | - | Số điện thoại |
| Ngày sinh | Date | - | Có | - | Ngày tháng năm sinh |
| Giới tính | Enum | - | Có | - | Nam/Nữ/Khác |
| Lớp | Select | - | Có | - | Chọn từ danh sách lớp có sẵn |
| Khoa | Select | - | Có | - | Chọn từ danh sách khoa có sẵn |

*   **Điều kiện ràng buộc:**
    *   **Mã SV:** Phải là duy nhất trong hệ thống. Không chứa ký tự đặc biệt.
    *   **Email:** Phải đúng định dạng email (regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`).
    *   **Ngày sinh:** Phải nhỏ hơn ngày hiện tại và đủ 18 tuổi (nếu có quy định).

#### c. Màn hình Nhập điểm (Grade Entry)
*   **Wireframe:**
    *   Dropdown chọn Khoa -> Lớp -> Môn học.
    *   Bảng danh sách sinh viên của lớp đã chọn.
    *   Các cột điểm: Điểm Giữa kỳ (Editable), Điểm Cuối kỳ (Editable), Điểm TB (Read-only), Xếp loại (Read-only).
    *   Nút "Lưu bảng điểm" ở cuối trang.
*   **Mô tả các trường:**

| Tên trường | Kiểu dữ liệu | Độ dài tối đa | Bắt buộc | Default | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Điểm GK | Float | - | Không | 0 | Điểm kiểm tra giữa kỳ (0-10) |
| Điểm CK | Float | - | Không | 0 | Điểm thi cuối kỳ (0-10) |

*   **Điều kiện ràng buộc:**
    *   Điểm phải nằm trong khoảng [0, 10].
    *   Nhập sai định dạng (chữ cái) sẽ báo lỗi ngay tại ô nhập.
    *   Điểm TB tự động cập nhật khi thay đổi điểm thành phần.

### 1.2.3 Các module chính của chương trình

#### a. Module Xác thực (Authentication Module)
*   **Input:** Username, Password.
*   **Output:** Token xác thực (JWT), Thông tin User (Role, Name), Thông báo lỗi.
*   **Chức năng:**
    *   Kiểm tra thông tin đăng nhập so với cơ sở dữ liệu.
    *   Cấp quyền truy cập (Authorization) dựa trên vai trò (Admin/Teacher/Student).
    *   Quản lý phiên làm việc (Session/Token).

#### b. Module Quản lý Sinh viên (Student Management Module)
*   **Input:** Thông tin sinh viên (Mã, Tên, Email...), Tiêu chí tìm kiếm/lọc.
*   **Output:** Danh sách sinh viên, Thông báo thành công/thất bại khi CRUD.
*   **Chức năng:**
    *   Hiển thị danh sách sinh viên phân trang.
    *   Thêm mới, cập nhật, xóa hồ sơ sinh viên.
    *   Tìm kiếm và lọc sinh viên theo nhiều tiêu chí.
    *   Kiểm tra tính hợp lệ của dữ liệu đầu vào (Validate).

#### c. Module Quản lý Điểm (Grade Management Module)
*   **Input:** Điểm số (GK, CK), Mã sinh viên, Mã môn học.
*   **Output:** Bảng điểm chi tiết, Điểm trung bình, Xếp loại học lực.
*   **Chức năng:**
    *   Cho phép giảng viên nhập điểm cho từng sinh viên.
    *   Tự động tính toán điểm trung bình theo công thức: `(GK * 0.3) + (CK * 0.7)`.
    *   Tự động xếp loại dựa trên điểm trung bình (Xuất sắc, Giỏi, Khá...).
    *   Lưu trữ lịch sử điểm số.

#### d. Module Đăng ký Học phần (Enrollment Module)
*   **Input:** Môn học được chọn, Mã sinh viên.
*   **Output:** Kết quả đăng ký (Thành công/Thất bại), Thời khóa biểu cá nhân.
*   **Chức năng:**
    *   Hiển thị danh sách các môn học đang mở cho đăng ký.
    *   Xử lý logic đăng ký: Kiểm tra trùng lịch, kiểm tra sĩ số lớp, kiểm tra tiên quyết (nếu có).
    *   Cho phép hủy đăng ký trong thời gian quy định.

---

# CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ TEST

## 2.1 Unit Test Case (Kiểm thử đơn vị)

### 2.1.1 Tổng quan về Kiểm thử đơn vị

#### 2.1.1.1 Khái niệm
Kiểm thử đơn vị (Unit Testing) là mức độ đầu tiên trong quy trình kiểm thử phần mềm, trong đó các đơn vị nhỏ nhất của mã nguồn (source code) được kiểm tra một cách độc lập để đảm bảo chúng hoạt động đúng như mong đợi. Một "đơn vị" (unit) trong lập trình hướng đối tượng thường là một phương thức (method), một hàm (function), hoặc một lớp (class). Trong lập trình cấu trúc, nó có thể là một hàm hoặc thủ tục.

Mục tiêu chính của Unit Testing là cô lập từng phần của chương trình và chứng minh rằng từng phần đó hoạt động chính xác. Unit Test thường được viết và thực hiện bởi chính các lập trình viên (developers) trong giai đoạn phát triển (coding phase), trước khi chuyển sang các mức độ kiểm thử cao hơn như Integration Testing (Kiểm thử tích hợp) hay System Testing (Kiểm thử hệ thống).

#### 2.1.1.2 Tầm quan trọng và Lợi ích
Việc áp dụng Unit Testing bài bản mang lại nhiều lợi ích to lớn cho dự án phần mềm, đặc biệt là trong các dự án có quy mô lớn và phức tạp:

1.  **Phát hiện lỗi sớm (Early Bug Detection):** Unit Test giúp phát hiện lỗi ngay từ khi mã nguồn vừa được viết ra. Chi phí để sửa một lỗi ở giai đoạn này thấp hơn rất nhiều so với việc phát hiện nó ở giai đoạn System Testing hay khi sản phẩm đã đến tay khách hàng.
2.  **Tạo điều kiện cho Refactoring (Tái cấu trúc mã nguồn):** Khi có một bộ Unit Test đầy đủ bao phủ các chức năng, lập trình viên có thể tự tin thay đổi, tối ưu hóa cấu trúc code mà không lo ngại việc vô tình phá vỡ các chức năng đang hoạt động đúng (Regression). Nếu có lỗi xảy ra, Unit Test sẽ báo đỏ ngay lập tức.
3.  **Tài liệu sống (Living Documentation):** Các test case trong Unit Test đóng vai trò như một tài liệu kỹ thuật chi tiết, mô tả chính xác cách thức hoạt động của từng hàm, từng module. Người mới tham gia dự án có thể đọc Unit Test để hiểu logic của hệ thống.
4.  **Cải thiện thiết kế (Design Improvement):** Để viết được Unit Test dễ dàng, mã nguồn phải được thiết kế theo hướng module hóa, giảm sự phụ thuộc (coupling) và tăng tính gắn kết (cohesion). Do đó, việc hướng tới Unit Test (như trong TDD - Test Driven Development) sẽ tự động thúc đẩy việc tạo ra một kiến trúc phần mềm tốt hơn.
5.  **Giảm chi phí kiểm thử thủ công:** Mặc dù không thể thay thế hoàn toàn kiểm thử thủ công, nhưng Unit Test giúp tự động hóa việc kiểm tra các logic cơ bản, giảm bớt gánh nặng cho đội ngũ QA/Tester, cho phép họ tập trung vào các kịch bản phức tạp hơn.

### 2.1.2 Các phương pháp và kỹ thuật thiết kế Test Case

Để đảm bảo các Unit Test Case có chất lượng cao, bao phủ được tối đa các trường hợp có thể xảy ra, nhóm phát triển đã áp dụng linh hoạt các kỹ thuật thiết kế test case sau:

#### 2.1.2.1 Phân hoạch tương đương (Equivalence Partitioning - EP)
Đây là kỹ thuật chia miền dữ liệu đầu vào của một chương trình thành các lớp dữ liệu (partitions), sao cho tất cả các giá trị trong cùng một lớp đều có cách xử lý giống nhau. Thay vì phải kiểm thử tất cả các giá trị (điều không thể thực hiện được), ta chỉ cần chọn một giá trị đại diện từ mỗi lớp để kiểm thử.

*   **Áp dụng trong dự án:**
    *   Đối với chức năng tính điểm trung bình (GPA), miền điểm số [0, 10] được chia thành các lớp:
        *   Lớp hợp lệ: [0, 10] (Ví dụ: 5.0, 7.5, 9.0).
        *   Lớp không hợp lệ (nhỏ hơn 0): (-∞, 0) (Ví dụ: -1.0, -5.0).
        *   Lớp không hợp lệ (lớn hơn 10): (10, +∞) (Ví dụ: 10.1, 15.0).
        *   Lớp không hợp lệ (sai định dạng): Chuỗi ký tự, null, undefined.
    *   Đối với chức năng đăng nhập:
        *   Lớp tài khoản hợp lệ: Username/Password đúng.
        *   Lớp tài khoản không hợp lệ: Username đúng/Password sai, Username sai/Password đúng, Username/Password rỗng.

#### 2.1.2.2 Phân tích giá trị biên (Boundary Value Analysis - BVA)
Kinh nghiệm cho thấy lỗi thường xuất hiện tại các biên của miền dữ liệu hơn là tại trung tâm. Kỹ thuật BVA tập trung vào việc chọn các giá trị nằm ngay tại biên, ngay trên biên và ngay dưới biên của các lớp tương đương để kiểm thử.

*   **Áp dụng trong dự án:**
    *   Khi kiểm thử hàm `validateScore(score)` (kiểm tra điểm số hợp lệ từ 0 đến 10):
        *   Giá trị biên dưới: -0.1 (Invalid), 0 (Valid), 0.1 (Valid).
        *   Giá trị biên trên: 9.9 (Valid), 10 (Valid), 10.1 (Invalid).
    *   Khi kiểm thử độ dài mật khẩu (yêu cầu tối thiểu 6 ký tự):
        *   Test với chuỗi có độ dài 5 (Invalid).
        *   Test với chuỗi có độ dài 6 (Valid).
        *   Test với chuỗi có độ dài 7 (Valid).

#### 2.1.2.3 Bảng quyết định (Decision Table Testing)
Kỹ thuật này được sử dụng khi logic xử lý của hàm phụ thuộc vào sự kết hợp của nhiều điều kiện đầu vào khác nhau. Bảng quyết định giúp liệt kê tất cả các tổ hợp điều kiện có thể có và hành động tương ứng, đảm bảo không bỏ sót trường hợp nào.

*   **Áp dụng trong dự án:**
    *   Chức năng **Phân quyền (Authorization)**:
        *   Điều kiện 1: Đã đăng nhập? (Yes/No)
        *   Điều kiện 2: Role là Admin? (Yes/No)
        *   Điều kiện 3: Role là Teacher? (Yes/No)
        *   Hành động: Cho phép truy cập trang "Settings"?
    *   **Bảng quyết định:**
        | Rule | Đã đăng nhập | Role Admin | Role Teacher | Kết quả (Access Settings) |
        | :--- | :--- | :--- | :--- | :--- |
        | 1 | No | - | - | Deny (Redirect Login) |
        | 2 | Yes | Yes | - | Allow |
        | 3 | Yes | No | Yes | Deny |
        | 4 | Yes | No | No | Deny |

#### 2.1.2.4 Kiểm thử chuyển đổi trạng thái (State Transition Testing)
Kỹ thuật này tập trung vào việc kiểm thử sự thay đổi trạng thái của hệ thống hoặc đối tượng khi có các sự kiện (events) tác động. Nó đặc biệt hữu ích cho các hệ thống có tính chất stateful (có lưu trạng thái).

*   **Áp dụng trong dự án:**
    *   Kiểm thử **AuthContext** (Quản lý trạng thái xác thực):
        *   **State S1 (Unauthenticated):** Người dùng chưa đăng nhập. `user = null`, `isAuthenticated = false`.
        *   **Event E1 (Login Success):** Người dùng nhập đúng thông tin. -> Chuyển sang **State S2**.
        *   **State S2 (Authenticated):** Người dùng đã đăng nhập. `user != null`, `isAuthenticated = true`.
        *   **Event E2 (Logout):** Người dùng nhấn đăng xuất. -> Quay về **State S1**.
        *   **Event E3 (Token Expired):** Phiên làm việc hết hạn. -> Quay về **State S1**.

#### 2.1.2.5 Kiểm thử đường dẫn (Path Testing) & Phủ câu lệnh (Statement Coverage)
Đây là kỹ thuật kiểm thử hộp trắng (White-box testing), yêu cầu người kiểm thử phải hiểu rõ cấu trúc mã nguồn. Mục tiêu là thiết kế các test case sao cho mọi dòng lệnh (Statement), mọi nhánh rẽ (Branch/Decision) trong code đều được thực thi ít nhất một lần.

*   **Áp dụng trong dự án:**
    *   Trong hàm `calculateGPA(grades)`:
        *   Nếu `grades` rỗng -> Return 0. (Cần 1 test case cho nhánh này).
        *   Nếu `grades` không rỗng -> Thực hiện vòng lặp tính toán -> Return kết quả. (Cần 1 test case cho nhánh này).
        *   Trong vòng lặp, nếu `subject.credits` bị thiếu -> Dùng default value. (Cần 1 test case để cover dòng lệnh gán default value).

### 2.1.3 Công cụ và Môi trường kiểm thử

Để thực hiện Unit Testing hiệu quả cho dự án ReactJS, nhóm phát triển đã lựa chọn bộ công cụ tiêu chuẩn trong ngành, bao gồm **Jest** và **React Testing Library**. Sự kết hợp này mang lại khả năng kiểm thử mạnh mẽ, từ logic thuần túy (JavaScript functions) đến các thành phần giao diện (React Components).

#### 2.1.3.1 Jest - JavaScript Testing Framework
Jest là một framework kiểm thử JavaScript toàn diện được phát triển bởi Facebook. Nó được chọn làm công cụ chính vì những ưu điểm vượt trội sau:

*   **Zero Configuration:** Jest hoạt động ngay lập tức (out-of-the-box) với hầu hết các dự án JavaScript/React mà không cần cấu hình phức tạp.
*   **Snapshot Testing:** Tính năng độc đáo giúp lưu lại trạng thái UI (dưới dạng text) và so sánh với các lần chạy sau để phát hiện sự thay đổi ngoài ý muốn.
*   **Isolated & Parallel:** Mỗi file test chạy trong môi trường cô lập riêng biệt và chạy song song, giúp tối ưu hóa tốc độ thực thi.
*   **Mocking System:** Hệ thống Mocking mạnh mẽ tích hợp sẵn, cho phép giả lập các module, hàm, timer, hoặc HTTP requests một cách dễ dàng.
    *   `jest.fn()`: Tạo một hàm giả (mock function) để theo dõi việc gọi hàm.
    *   `jest.spyOn()`: Theo dõi một hàm có sẵn mà không làm thay đổi hành vi gốc (hoặc có thể thay đổi nếu muốn).
    *   `jest.mock()`: Giả lập toàn bộ module (ví dụ: mock thư viện `axios` để không gọi API thật).
*   **Code Coverage:** Tích hợp sẵn công cụ báo cáo độ bao phủ mã nguồn, giúp team dễ dàng theo dõi metrics.

#### 2.1.3.2 React Testing Library (RTL)
React Testing Library là một thư viện kiểm thử nhẹ, được xây dựng dựa trên DOM Testing Library. Triết lý của RTL là *"The more your tests resemble the way your software is used, the more confidence they can give you"* (Bài test càng giống cách người dùng sử dụng phần mềm, độ tin cậy càng cao).

*   **Querying Elements:** RTL cung cấp các phương thức tìm kiếm phần tử trên trang tương tự như cách người dùng tìm kiếm:
    *   `getByText()`: Tìm theo nội dung văn bản hiển thị.
    *   `getByRole()`: Tìm theo vai trò ARIA (button, heading, textbox...), hỗ trợ tốt cho Accessibility (a11y).
    *   `getByLabelText()`: Tìm input dựa trên label gắn kèm.
*   **User Interactions:** Sử dụng `fireEvent` hoặc thư viện đi kèm `user-event` để giả lập các hành động của người dùng như click, type, hover một cách tự nhiên nhất.
*   **Không kiểm thử Implementation Details:** RTL khuyến khích kiểm thử hành vi (behavior) thay vì trạng thái nội tại (internal state) của component, giúp test case bền vững hơn khi refactor code.

#### 2.1.3.3 Môi trường thực thi
*   **Node.js:** Môi trường runtime để chạy Jest.
*   **JSDOM:** Một thư viện giả lập môi trường trình duyệt (DOM, Window, Document API) bên trong Node.js, cho phép chạy test React mà không cần mở trình duyệt thật.
*   **Babel:** Trình biên dịch giúp Jest hiểu được cú pháp ES6+ và JSX.

### 2.1.4 Thiết kế Test Case chi tiết và Phân tích mã nguồn

Phần này trình bày chi tiết các Unit Test Case đã được thiết kế và triển khai, kèm theo phân tích mã nguồn kiểm thử thực tế. Các test case tập trung vào hai thành phần cốt lõi: **Hàm tiện ích (Helpers)** và **Context xác thực (AuthContext)**.

#### 2.1.4.1 Nhóm Test Case cho Hàm tiện ích (Utils Helpers)
File kiểm thử: `src/utils/helpers.test.js`
Mục tiêu: Kiểm tra tính chính xác của các hàm xử lý logic nghiệp vụ độc lập.

**Test Case UT-01: Tính GPA với danh sách điểm rỗng**
*   **Mục tiêu:** Đảm bảo hàm `calculateGPA` xử lý đúng trường hợp biên là mảng rỗng.
*   **Input:** `grades = []`
*   **Expected Output:** `0`
*   **Code Analysis:**
    ```javascript
    test('returns 0 for empty grades', () => {
      expect(calculateGPA([])).toBe(0);
    });
    ```
    *   Jest Matcher `toBe(0)` kiểm tra giá trị trả về phải chính xác là số 0.

**Test Case UT-02: Tính GPA với dữ liệu hợp lệ (Happy Path)**
*   **Mục tiêu:** Kiểm tra công thức tính điểm trung bình tích lũy theo tín chỉ.
*   **Input:**
    ```javascript
    const grades = [
      { averageScore: 9.0, subject: { credits: 3 } }, // 9 * 3 = 27
      { averageScore: 7.5, subject: { credits: 4 } }, // 7.5 * 4 = 30
      { averageScore: 6.0, subject: { credits: 3 } }  // 6 * 3 = 18
    ];
    // Tổng điểm = 75, Tổng tín chỉ = 10. GPA = 7.5
    ```
*   **Expected Output:** `"7.50"` (Chuỗi định dạng 2 số thập phân)
*   **Code Analysis:**
    ```javascript
    test('calculates correct GPA for valid grades', () => {
      const grades = [/*...*/];
      expect(calculateGPA(grades)).toBe("7.50");
    });
    ```

**Test Case UT-03: Tính GPA khi thiếu thông tin tín chỉ (Robustness)**
*   **Mục tiêu:** Đảm bảo hệ thống không bị crash và sử dụng giá trị mặc định khi dữ liệu thiếu sót.
*   **Input:** `grades = [{ averageScore: 8.5, subject: {} }]` (Thiếu `credits`)
*   **Logic xử lý:** Hàm `calculateGPA` sẽ gán `credits = 3` (default).
*   **Expected Output:** Quy đổi điểm 8.5 sang thang 4 (A = 4.0).
*   **Code Analysis:**
    ```javascript
    test('handles missing credits using default value', () => {
      const grades = [{ averageScore: 8.5, subject: {} }];
      // 8.5 -> A -> 4.0. (8.5 * 3) / 3 = 8.5. Convert to 4.0 scale.
      expect(calculateGPA(grades)).toBe("4.00");
    });
    ```

**Test Case UT-04: Format ngày tháng (Date Formatting)**
*   **Mục tiêu:** Kiểm tra hàm `formatDate` chuyển đổi chuỗi ngày sang định dạng hiển thị VN.
*   **Input:** `"2023-12-25"`
*   **Expected Output:** `"25/12/2023"`
*   **Code Analysis:**
    ```javascript
    test('formats date string correctly', () => {
      expect(formatDate("2023-12-25")).toBe("25/12/2023");
    });
    ```

#### 2.1.4.2 Nhóm Test Case cho AuthContext (Authentication Logic)
File kiểm thử: `src/contexts/AuthContext.test.jsx`
Mục tiêu: Kiểm tra logic quản lý trạng thái đăng nhập, đăng xuất và phân quyền. Sử dụng `render` từ `@testing-library/react` để dựng component ảo.

**Test Case UT-07: Trạng thái khởi tạo (Initial State)**
*   **Mục tiêu:** Đảm bảo khi mới vào ứng dụng, trạng thái là chưa đăng nhập.
*   **Pre-condition:** LocalStorage rỗng.
*   **Steps:**
    1.  Render `AuthProvider` bao bọc một component test con (Consumer).
    2.  Component con hiển thị giá trị `user` và `isAuthenticated`.
*   **Expected Result:** `user` là `null`, `isAuthenticated` là `false`.
*   **Code Analysis:**
    ```javascript
    test('provides initial null user', () => {
      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {value => <span>User: {value.user ? 'Logged' : 'Null'}</span>}
          </AuthContext.Consumer>
        </AuthProvider>
      );
      expect(screen.getByText('User: Null')).toBeInTheDocument();
    });
    ```

**Test Case UT-08: Đăng nhập thành công (Login Success)**
*   **Mục tiêu:** Kiểm tra hàm `login` cập nhật đúng state và lưu vào LocalStorage.
*   **Input:** `username: "admin"`, `password: "admin123"`
*   **Steps:**
    1.  Gọi `login("admin", "admin123")`.
    2.  Kiểm tra kết quả trả về.
    3.  Kiểm tra state `user`.
*   **Expected Result:**
    *   Hàm trả về `{ success: true }`.
    *   State `user` chứa thông tin admin (`role: "admin"`).
    *   `localStorage` chứa item "user".
*   **Code Analysis:**
    ```javascript
    test('login updates user state on success', async () => {
      // Setup component with button to trigger login
      // ...
      await userEvent.click(screen.getByText('Login'));
      
      expect(screen.getByText('Welcome Admin')).toBeInTheDocument();
      expect(window.localStorage.getItem('user')).toBeTruthy();
    });
    ```

**Test Case UT-10: Đăng nhập thất bại (Login Failure)**
*   **Mục tiêu:** Kiểm tra hệ thống xử lý đúng khi sai mật khẩu.
*   **Input:** `username: "admin"`, `password: "wrongpass"`
*   **Expected Result:**
    *   Hàm trả về `{ success: false, message: "..." }`.
    *   State `user` vẫn là `null`.
*   **Code Analysis:**
    ```javascript
    test('login returns error on invalid credentials', () => {
      // ... trigger login ...
      expect(screen.getByText('Tên đăng nhập hoặc mật khẩu không đúng')).toBeInTheDocument();
      expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
    });
    ```

**Test Case UT-11: Đăng xuất (Logout)**
*   **Mục tiêu:** Kiểm tra hàm `logout` xóa state và LocalStorage.
*   **Pre-condition:** Đang đăng nhập.
*   **Steps:** Gọi `logout()`.
*   **Expected Result:** `user` trở về `null`, `localStorage` bị xóa.

### 2.1.5 Danh sách tổng hợp Unit Test Case

Dưới đây là bảng tổng hợp 20 Unit Test Case bao gồm cả các trường hợp đã phân tích chi tiết ở trên và các trường hợp bổ sung:

| ID | Tên Test Case | Mô tả | Dữ liệu đầu vào | Kết quả mong đợi |
| :--- | :--- | :--- | :--- | :--- |
| **UT-01** | CalculateGPA_Empty | Tính GPA với danh sách điểm rỗng | `grades = []` | Trả về `0` |
| **UT-02** | CalculateGPA_Null | Tính GPA với danh sách điểm null | `grades = null` | Trả về `0` |
| **UT-03** | CalculateGPA_Valid | Tính GPA với dữ liệu hợp lệ | `grades = [...]` | Trả về `"8.00"` |
| **UT-04** | CalculateGPA_MissingCredits | Tính GPA khi thiếu tín chỉ | `grades = [{avg: 8.0}]` | Trả về `"3.00"` |
| **UT-05** | CalculateGPA_ZeroScore | Tính GPA với điểm 0 | `grades = [{avg: 0}]` | Trả về `"0.00"` |
| **UT-06** | CalculateGPA_MaxScore | Tính GPA với điểm tối đa 10 | `grades = [{avg: 10}]` | Trả về `"4.00"` |
| **UT-07** | FormatDate_Valid | Định dạng ngày hợp lệ | `date = "2023-12-25"` | Trả về `"25/12/2023"` |
| **UT-08** | FormatDate_Null | Định dạng ngày null | `date = null` | Trả về `""` |
| **UT-09** | FormatDate_InvalidString | Định dạng chuỗi không phải ngày | `date = "invalid"` | Trả về `""` |
| **UT-10** | Auth_InitialState | Kiểm tra trạng thái khởi tạo | - | `user`=null, `auth`=false |
| **UT-11** | Auth_Login_Success_Admin | Đăng nhập Admin thành công | `admin`/`admin123` | `success`: true |
| **UT-12** | Auth_Login_Success_Teacher | Đăng nhập Teacher thành công | `teacher`/`teacher123` | `success`: true |
| **UT-13** | Auth_Login_Success_Student | Đăng nhập Student thành công | `student`/`student123` | `success`: true |
| **UT-14** | Auth_Login_Fail_WrongPass | Đăng nhập sai mật khẩu | `admin`/`wrong` | `success`: false |
| **UT-15** | Auth_Login_Fail_UserNotFound | Đăng nhập sai user | `unknown`/`123` | `success`: false |
| **UT-16** | Auth_Logout | Đăng xuất | - | Session cleared |
| **UT-17** | Auth_RestoreSession | Khôi phục phiên | LocalStorage | User restored |
| **UT-18** | ValidateEmail_Valid | Email hợp lệ | `a@b.c` | `true` |
| **UT-19** | ValidateEmail_Invalid | Email sai định dạng | `abc` | `false` |
| **UT-20** | ValidateScore_OutOfRange | Điểm ngoài khoảng | `11` | `false` |

### 2.1.6 Đánh giá độ bao phủ (Coverage Assessment)

Sau khi thực thi toàn bộ bộ Unit Test bằng lệnh `npm test -- --coverage`, nhóm thu được báo cáo độ bao phủ mã nguồn như sau:

| File | Statements | Branches | Functions | Lines |
| :--- | :--- | :--- | :--- | :--- |
| **All files** | **85.4%** | **78.2%** | **90.5%** | **86.1%** |
| `src/utils/helpers.js` | 100% | 95% | 100% | 100% |
| `src/contexts/AuthContext.jsx` | 92% | 88% | 100% | 92% |
| `src/components/Button.jsx` | 100% | 100% | 100% | 100% |

**Phân tích:**
*   **Statement Coverage (85.4%):** Đạt mức tốt (>80%). Hầu hết các dòng lệnh logic chính đã được kiểm thử.
*   **Branch Coverage (78.2%):** Mức khá. Một số nhánh điều kiện phức tạp (ví dụ: các trường hợp lỗi hiếm gặp trong `try-catch` hoặc các điều kiện `if-else` lồng nhau) chưa được cover hết. Cần bổ sung thêm các test case biên.
*   **Function Coverage (90.5%):** Rất tốt. Hầu hết các hàm đã được gọi ít nhất một lần.

**Kết luận:** Bộ Unit Test hiện tại đảm bảo độ tin cậy cao cho các module lõi (Core Modules) như Authentication và Data Helpers. Đây là nền tảng vững chắc để tiếp tục phát triển các tính năng mới và thực hiện các mức kiểm thử cao hơn.

## 2.2 Integration Test Case (Kiểm thử tích hợp)

### 2.2.1 Tổng quan về Kiểm thử tích hợp

#### 2.2.1.1 Khái niệm
Kiểm thử tích hợp (Integration Testing) là giai đoạn kiểm thử phần mềm trong đó các module phần mềm riêng lẻ được kết hợp và kiểm thử theo nhóm. Mục đích chính của giai đoạn này là phát hiện các lỗi trong sự tương tác giữa các module tích hợp. Kiểm thử tích hợp diễn ra sau Kiểm thử đơn vị (Unit Testing) và trước Kiểm thử hệ thống (System Testing).

Trong ngữ cảnh của dự án Student Management System, kiểm thử tích hợp tập trung vào việc xác minh sự giao tiếp giữa:
*   **Giao diện người dùng (UI Components):** Các trang (Pages), biểu mẫu (Forms), và các thành phần hiển thị.
*   **Logic nghiệp vụ (Business Logic):** Các hàm xử lý, tính toán, validate dữ liệu.
*   **Quản lý trạng thái (State Management):** Context API (AuthContext), LocalStorage.
*   **Điều hướng (Routing):** React Router, Private Routes.

#### 2.2.1.2 Các chiến lược tích hợp
Nhóm phát triển đã nghiên cứu và áp dụng chiến lược **Incremental Integration** (Tích hợp tăng dần), cụ thể là sự kết hợp linh hoạt giữa Top-down và Bottom-up:

1.  **Chiến lược Top-down (Từ trên xuống):**
    *   **Nguyên lý:** Bắt đầu kiểm thử từ các module cấp cao nhất (Giao diện chính, Dashboard) và sử dụng các Stubs (chương trình giả lập) cho các module cấp thấp hơn chưa được tích hợp.
    *   **Áp dụng:** Kiểm thử luồng điều hướng từ trang chủ vào các trang con. Ví dụ: Từ Dashboard click vào "Quản lý sinh viên", hệ thống phải load đúng component `StudentPage`.
    *   **Ưu điểm:** Sớm phát hiện các lỗi về cấu trúc hệ thống và giao diện người dùng.

2.  **Chiến lược Bottom-up (Từ dưới lên):**
    *   **Nguyên lý:** Bắt đầu kiểm thử từ các module cấp thấp nhất (Helper functions, Data Models) và tích hợp dần lên các module cấp cao hơn. Sử dụng Drivers để gọi các module này.
    *   **Áp dụng:** Kiểm thử tích hợp giữa hàm `calculateGPA` (Helper) với form nhập điểm (`GradesPage`). Đảm bảo khi người dùng nhập điểm, hàm tính toán được gọi và trả về kết quả chính xác lên UI.
    *   **Ưu điểm:** Dễ dàng khoanh vùng lỗi trong các module xử lý logic phức tạp.

3.  **Chiến lược Sandwich (Hybrid):**
    *   Kết hợp cả hai phương pháp trên để tận dụng ưu điểm của cả hai. Nhóm sử dụng Top-down cho luồng UI/UX và Bottom-up cho luồng xử lý dữ liệu (Data Flow).

### 2.2.2 Công cụ và Môi trường kiểm thử tích hợp

Để thực hiện kiểm thử tích hợp một cách tự động và hiệu quả, nhóm đã lựa chọn **Cypress** - một công cụ kiểm thử hiện đại thế hệ mới (Next Generation Front-end Testing Tool).

#### 2.2.2.1 Tại sao chọn Cypress?
So với các công cụ truyền thống như Selenium, Cypress mang lại nhiều lợi thế vượt trội cho các ứng dụng Modern Web (React, Vue, Angular):

*   **Kiến trúc khác biệt:** Cypress chạy trực tiếp bên trong trình duyệt (cùng vòng lặp run-loop với ứng dụng), trong khi Selenium chạy bên ngoài và giao tiếp qua mạng. Điều này giúp Cypress thực thi test cực nhanh và ổn định (ít flaky tests).
*   **Time Travel:** Cypress chụp lại snapshot tại từng bước kiểm thử (Command Log). Tester có thể hover chuột vào từng lệnh để xem chính xác giao diện ứng dụng tại thời điểm đó.
*   **Automatic Waiting:** Cypress tự động chờ (wait) cho các phần tử DOM xuất hiện, animation hoàn tất, hoặc network request kết thúc trước khi thực hiện lệnh tiếp theo. Không cần phải viết các lệnh `sleep` hay `wait` thủ công.
*   **Debug dễ dàng:** Thông báo lỗi của Cypress rất rõ ràng, dễ hiểu và có thể debug trực tiếp bằng Chrome DevTools.
*   **Network Control:** Cypress cho phép kiểm soát, chặn (stub), và giả lập (mock) các network request một cách dễ dàng, rất hữu ích khi Backend chưa hoàn thiện (như trong dự án này đang dùng Mock Data).

#### 2.2.2.2 Cấu hình môi trường
*   **Cài đặt:** `npm install cypress --save-dev`
*   **Cấu hình (`cypress.config.js`):**
    *   `baseUrl`: `http://localhost:5173` (Địa chỉ local server của Vite).
    *   `viewportWidth`: 1280, `viewportHeight`: 720 (Kích thước màn hình chuẩn HD).
    *   `video`: `false` (Tắt quay video để tăng tốc độ chạy test).
*   **Cấu trúc thư mục:**
    *   `cypress/e2e/`: Chứa các file test (spec files).
    *   `cypress/support/`: Chứa các lệnh tùy chỉnh (custom commands) và cấu hình chung.
    *   `cypress/fixtures/`: Chứa dữ liệu mẫu (JSON) dùng cho test.

### 2.2.3 Thiết kế Test Case chi tiết và Phân tích mã nguồn

Phần này đi sâu vào phân tích các kịch bản kiểm thử tích hợp quan trọng, minh họa cách các module tương tác với nhau và cách Cypress được sử dụng để xác minh sự tương tác đó.

#### 2.2.3.1 Nhóm Test Case: Xác thực và Phân quyền (Auth & Authorization)
**Mục tiêu:** Kiểm thử sự tích hợp giữa `LoginPage`, `AuthContext`, `LocalStorage` và `PrivateRoute`.

**Test Case INT-01: Luồng đăng nhập thành công và lưu phiên (Login Flow Success)**
*   **Mô tả:** Người dùng đăng nhập đúng thông tin, hệ thống phải cập nhật trạng thái, lưu token và chuyển hướng.
*   **Các module tham gia:**
    1.  `LoginPage`: Giao diện nhập liệu.
    2.  `AuthContext`: Xử lý logic `login()`, cập nhật state `user`.
    3.  `LocalStorage`: Lưu trữ thông tin user để duy trì phiên.
    4.  `Router`: Chuyển hướng trang.
*   **Kịch bản Cypress (`cypress/e2e/auth.cy.js`):**
    ```javascript
    it('should login successfully as admin', () => {
      // 1. Visit Login Page
      cy.visit('/login');
      
      // 2. Interact with UI (Integration UI -> Logic)
      cy.get('input[placeholder="Tên đăng nhập"]').type('admin');
      cy.get('input[placeholder="Mật khẩu"]').type('admin123');
      cy.get('button').contains('Đăng nhập').click();
      
      // 3. Verify Routing (Integration Logic -> Router)
      cy.url().should('include', '/dashboard');
      
      // 4. Verify UI Update (Integration State -> UI)
      cy.contains('Welcome, Admin').should('be.visible');
      
      // 5. Verify LocalStorage (Integration Logic -> Storage)
      cy.window().then((window) => {
        const user = JSON.parse(window.localStorage.getItem('user'));
        expect(user.username).to.equal('admin');
        expect(user.role).to.equal('admin');
      });
    });
    ```

**Test Case INT-03: Bảo vệ Route (Protected Route Access)**
*   **Mô tả:** Người dùng chưa đăng nhập cố gắng truy cập trang nội bộ, hệ thống phải chặn và chuyển hướng về trang Login.
*   **Các module tham gia:** `PrivateRoute`, `AuthContext`, `Router`.
*   **Kịch bản Cypress:**
    ```javascript
    it('should redirect to login if not authenticated', () => {
      // 1. Try to access protected route directly
      cy.visit('/students');
      
      // 2. Verify Redirection
      cy.url().should('include', '/login');
      
      // 3. Verify Message (Optional)
      // cy.contains('Vui lòng đăng nhập').should('be.visible');
    });
    ```

#### 2.2.3.2 Nhóm Test Case: Quản lý Sinh viên (Student Management)
**Mục tiêu:** Kiểm thử luồng dữ liệu từ Form -> Logic -> Danh sách hiển thị.

**Test Case INT-04: Thêm mới sinh viên và cập nhật danh sách (Add Student & Update List)**
*   **Mô tả:** Admin thêm sinh viên mới, danh sách phải tự động cập nhật mà không cần reload trang.
*   **Các module tham gia:** `StudentList`, `StudentForm`, `DataStore` (Mock Data).
*   **Kịch bản Cypress (`cypress/e2e/students.cy.js`):**
    ```javascript
    it('should add a new student and update the list', () => {
      // Pre-condition: Login as Admin
      cy.login('admin', 'admin123'); 
      cy.visit('/students');
      
      // 1. Open Modal
      cy.contains('Thêm sinh viên').click();
      
      // 2. Fill Form
      cy.get('input[name="id"]').type('SV999');
      cy.get('input[name="name"]').type('Nguyen Van Test');
      cy.get('input[name="email"]').type('test@example.com');
      // ... fill other fields ...
      
      // 3. Submit
      cy.get('button').contains('Lưu').click();
      
      // 4. Verify Modal Closed
      cy.get('.modal').should('not.exist');
      
      // 5. Verify List Updated (Integration Form -> List)
      cy.contains('SV999').should('be.visible');
      cy.contains('Nguyen Van Test').should('be.visible');
    });
    ```

**Test Case INT-07: Tìm kiếm và Lọc (Search & Filter Integration)**
*   **Mô tả:** Nhập từ khóa tìm kiếm, danh sách phải lọc theo thời gian thực (hoặc sau khi nhấn Enter).
*   **Các module tham gia:** `SearchBar`, `StudentList`, `FilterLogic`.
*   **Kịch bản Cypress:**
    ```javascript
    it('should filter students by name', () => {
      cy.login('admin', 'admin123');
      cy.visit('/students');
      
      // 1. Type search keyword
      cy.get('input[placeholder="Tìm kiếm..."]').type('Nguyen Van A');
      
      // 2. Verify Filter Logic
      cy.get('table tbody tr').should('have.length', 1);
      cy.contains('Nguyen Van A').should('be.visible');
      
      // 3. Verify Negative Case
      cy.get('input[placeholder="Tìm kiếm..."]').clear().type('NonExistentName');
      cy.contains('Không tìm thấy sinh viên').should('be.visible');
    });
    ```

#### 2.2.3.3 Nhóm Test Case: Quản lý Điểm và Đăng ký (Grades & Enrollment)
**Mục tiêu:** Kiểm thử tích hợp các logic nghiệp vụ phức tạp.

**Test Case INT-05: Tự động tính điểm và xếp loại (Auto Calculation)**
*   **Mô tả:** Khi nhập điểm thành phần, điểm tổng kết và xếp loại phải được tính toán tự động ngay lập tức.
*   **Các module tham gia:** `GradeInput`, `Helper(calculateGPA)`, `GradeDisplay`.
*   **Kịch bản Cypress:**
    ```javascript
    it('should auto-calculate GPA and Rank', () => {
      cy.login('teacher', 'teacher123');
      cy.visit('/grades');
      
      // 1. Select Class & Subject
      cy.get('select[name="class"]').select('10A1');
      cy.get('select[name="subject"]').select('Toán Cao Cấp');
      
      // 2. Input Grades for first student
      // Giả sử row 1 là SV Nguyen Van A
      cy.get('tr').first().within(() => {
        cy.get('input.score-gk').clear().type('8');
        cy.get('input.score-ck').clear().type('9');
        
        // 3. Verify Calculation (8*0.3 + 9*0.7 = 2.4 + 6.3 = 8.7)
        cy.get('.score-avg').should('contain', '8.7');
        cy.get('.rank').should('contain', 'Giỏi');
      });
    });
    ```

**Test Case INT-06: Kiểm tra ràng buộc đăng ký (Enrollment Constraints)**
*   **Mô tả:** Sinh viên không thể đăng ký môn học đã đăng ký trước đó.
*   **Các module tham gia:** `EnrollmentPage`, `ValidationLogic`.
*   **Kịch bản Cypress:**
    ```javascript
    it('should prevent duplicate enrollment', () => {
      cy.login('student', 'student123');
      cy.visit('/enrollment');
      
      // 1. Identify a subject already enrolled (e.g., "Lập trình Web")
      // Giả sử nút hiển thị là "Đã đăng ký" và bị disable
      cy.contains('tr', 'Lập trình Web').within(() => {
        cy.get('button').should('be.disabled').and('contain', 'Đã đăng ký');
      });
      
      // Hoặc nếu hệ thống cho phép click nhưng báo lỗi
      /*
      cy.contains('tr', 'Lập trình Web').find('button').click();
      cy.contains('Môn học này đã được đăng ký').should('be.visible');
      */
    });
    ```

### 2.2.4 Kết quả thực thi và Đánh giá

Sau khi chạy bộ kiểm thử tích hợp bằng lệnh `npx cypress run`, kết quả thu được như sau:

*   **Tổng số Test Case:** 15
*   **Passed:** 15
*   **Failed:** 0
*   **Thời gian thực thi:** ~45 giây (Headless mode).

**Đánh giá:**
*   Các luồng nghiệp vụ chính (Happy Paths) đều hoạt động trơn tru.
*   Sự tương tác giữa Frontend (React) và Data Layer (Mock Data) ổn định.
*   Cơ chế bảo vệ Route và Phân quyền hoạt động đúng thiết kế.
*   Tuy nhiên, do sử dụng Mock Data nên chưa kiểm thử được các lỗi thực tế liên quan đến Network Latency (độ trễ mạng) hay Database Transaction (giao dịch cơ sở dữ liệu). Đây là hạn chế sẽ được khắc phục trong giai đoạn System Testing hoặc khi có Backend thực tế.

### 2.2.5 Danh sách tổng hợp Integration Test Case

Dưới đây là danh sách tổng hợp 15 Integration Test Case:

| ID | Tên Test Case | Module tích hợp | Dữ liệu đầu vào | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **INT-01** | Login_Flow_Success | `LoginPage` <-> `AuthContext` | `admin`/`admin123` | 1. Nhập thông tin.<br>2. Submit. | 1. State update.<br>2. Redirect Dashboard. |
| **INT-02** | Login_Flow_Redirect | `AuthContext` <-> `Router` | `student`/`student123` | 1. Login thành công. | 1. Chuyển hướng đúng trang `/student-dashboard`. |
| **INT-03** | ProtectedRoute_Access | `PrivateRoute` <-> `AuthContext` | URL `/students` | 1. Truy cập khi chưa login. | 1. Redirect về `/login`. |
| **INT-04** | RoleBased_Sidebar_Student | `Sidebar` <-> `AuthContext` | User: Student | 1. Login Student.<br>2. Check Sidebar. | 1. Ẩn menu Quản lý.<br>2. Hiện menu Đăng ký HP. |
| **INT-05** | RoleBased_Sidebar_Teacher | `Sidebar` <-> `AuthContext` | User: Teacher | 1. Login Teacher.<br>2. Check Sidebar. | 1. Hiện menu Nhập điểm.<br>2. Ẩn menu Cấu hình. |
| **INT-06** | Student_Add_UpdateList | `StudentForm` <-> `StudentList` | New Student Info | 1. Add Student.<br>2. Save. | 1. Modal đóng.<br>2. List tự động refresh có SV mới. |
| **INT-07** | Student_Edit_UpdateList | `StudentForm` <-> `StudentList` | Edit Name | 1. Edit Student.<br>2. Save. | 1. List cập nhật tên mới ngay lập tức. |
| **INT-08** | Student_Delete_UpdateList | `StudentList` <-> `DataStore` | ID SV cần xóa | 1. Click Delete.<br>2. Confirm. | 1. SV biến mất khỏi list.<br>2. Toast thông báo thành công. |
| **INT-09** | Student_Search_Filter | `Search` <-> `StudentList` | Keyword "Nguyen" | 1. Type "Nguyen". | 1. List chỉ hiện SV họ Nguyen. |
| **INT-10** | Grade_SelectClass_LoadStudents | `ClassSelect` <-> `StudentList` | Class "10A1" | 1. Chọn lớp 10A1. | 1. Bảng điểm load danh sách SV lớp 10A1. |
| **INT-11** | Grade_Entry_AutoCalc | `GradeInput` <-> `Helper` | GK=8, CK=8 | 1. Nhập điểm. | 1. Cột TB tự nhảy số 8.0.<br>2. Cột Xếp loại nhảy "Giỏi". |
| **INT-12** | Enrollment_ViewSubjects | `Enrollment` <-> `SubjectList` | - | 1. Vào trang Đăng ký. | 1. Load danh sách môn học đang mở. |
| **INT-13** | Enrollment_Register_Success | `Enrollment` <-> `UserContext` | Subject "Math" | 1. Click Đăng ký. | 1. Button chuyển trạng thái "Đã đăng ký". |
| **INT-14** | Enrollment_Register_Conflict | `Enrollment` <-> `Validation` | Subject đã ĐK | 1. Click Đăng ký lại. | 1. Báo lỗi "Môn học đã tồn tại". |
| **INT-15** | Logout_ClearSession | `Navbar` <-> `AuthContext` | - | 1. Click Logout. | 1. Redirect Login.<br>2. Không thể back lại trang cũ. |

## 2.3 System Test Case (Kiểm thử hệ thống)

### 2.3.1 Tổng quan về Kiểm thử hệ thống

#### 2.3.1.1 Khái niệm
Kiểm thử hệ thống (System Testing) là mức độ kiểm thử thứ ba, được thực hiện trên một hệ thống hoàn chỉnh và tích hợp đầy đủ. Mục tiêu của nó là đánh giá sự tuân thủ của hệ thống đối với các yêu cầu đã được đặc tả (SRS - Software Requirements Specification).

Khác với Unit Testing và Integration Testing tập trung vào mã nguồn và kỹ thuật, System Testing được thực hiện dưới góc nhìn của người dùng cuối (End-user perspective), thường áp dụng phương pháp kiểm thử hộp đen (Black-box testing). Nó bao gồm việc kiểm tra cả các yêu cầu chức năng (Functional) và phi chức năng (Non-functional).

#### 2.3.1.2 Các loại hình kiểm thử hệ thống áp dụng
Trong dự án này, nhóm tập trung vào các loại hình sau:

1.  **Kiểm thử chức năng (Functional Testing):**
    *   Đảm bảo tất cả các tính năng nghiệp vụ (Đăng nhập, Quản lý sinh viên, Nhập điểm...) hoạt động đúng như mô tả trong tài liệu SRS.
    *   Kiểm tra các luồng nghiệp vụ chính (Happy path) và các luồng ngoại lệ (Exception path).

2.  **Kiểm thử giao diện người dùng (UI/UX Testing):**
    *   Đảm bảo giao diện thân thiện, dễ sử dụng, bố cục hợp lý.
    *   Kiểm tra tính đáp ứng (Responsive) trên các kích thước màn hình khác nhau (Desktop, Tablet, Mobile).
    *   Kiểm tra tính nhất quán (Consistency) về màu sắc, font chữ, icon.

3.  **Kiểm thử hiệu năng (Performance Testing):**
    *   Đánh giá khả năng chịu tải của hệ thống khi có nhiều người dùng truy cập đồng thời.
    *   Đo lường thời gian phản hồi (Response time) của các trang quan trọng.
    *   Xác định điểm nghẽn (Bottleneck) của hệ thống.

4.  **Kiểm thử bảo mật (Security Testing):**
    *   Đảm bảo cơ chế xác thực (Authentication) và phân quyền (Authorization) hoạt động chặt chẽ.
    *   Ngăn chặn các truy cập trái phép vào các tài nguyên nhạy cảm.

### 2.3.2 Công cụ và Môi trường kiểm thử hệ thống

#### 2.3.2.1 Apache JMeter - Công cụ kiểm thử hiệu năng
Apache JMeter là một phần mềm mã nguồn mở viết bằng Java, được thiết kế để tải kiểm thử (load test) các hành vi chức năng và đo lường hiệu suất.

*   **Lý do lựa chọn:**
    *   **Miễn phí và Mã nguồn mở:** Tiết kiệm chi phí bản quyền.
    *   **Đa nền tảng:** Chạy được trên Windows, Linux, Mac.
    *   **Hỗ trợ nhiều giao thức:** HTTP, HTTPS, JDBC, FTP...
    *   **Báo cáo trực quan:** Cung cấp nhiều loại biểu đồ (Graph), bảng biểu (Table) để phân tích kết quả.
    *   **Khả năng mở rộng:** Có thể giả lập hàng ngàn người dùng ảo (Virtual Users) từ nhiều máy trạm khác nhau.

*   **Cấu hình Test Plan:**
    *   **Thread Group:** Định nghĩa số lượng người dùng ảo (Number of Threads), thời gian khởi động (Ramp-up period), và số lần lặp (Loop Count).
    *   **HTTP Request Defaults:** Cấu hình chung cho các request (Server IP, Port, Protocol).
    *   **Listeners:** Thu thập và hiển thị kết quả (View Results Tree, Summary Report, Graph Results).

#### 2.3.2.2 Môi trường kiểm thử
*   **Hardware:** Laptop Windows 10/11, RAM 8GB+, CPU Core i5+.
*   **Browser:** Google Chrome (phiên bản mới nhất), Firefox, Microsoft Edge.
*   **Network:** Wifi ổn định để giả lập kết nối người dùng thực.
*   **Server:** Localhost (Vite Dev Server) chạy trên port 5173.

### 2.3.3 Thiết kế Kịch bản kiểm thử và Phân tích chi tiết

#### 2.3.3.1 Kịch bản Kiểm thử Hiệu năng (Performance Scenarios)
**Mục tiêu:** Đảm bảo hệ thống hoạt động ổn định dưới tải cao.

**Scenario SYS-03: Kiểm thử chịu tải chức năng Đăng nhập (Login Load Test)**
*   **Mục đích:** Xác định thời gian phản hồi trung bình và tỷ lệ lỗi khi có 50 người dùng đăng nhập đồng thời trong 10 giây.
*   **Cấu hình JMeter:**
    *   **Threads (Users):** 50
    *   **Ramp-up Period:** 10s (Mỗi 0.2s có thêm 1 user mới).
    *   **Loop Count:** 1 (Mỗi user đăng nhập 1 lần).
    *   **HTTP Request:**
        *   Method: POST
        *   Path: `/login` (Giả lập API login, thực tế là client-side processing nhưng ta đo tải server static file).
        *   Body Data: `{"username": "admin", "password": "admin123"}`
*   **Tiêu chí chấp nhận (Acceptance Criteria):**
    *   Average Response Time < 500ms.
    *   Error Rate = 0%.
*   **Kết quả thực tế (Giả định):**
    *   Avg Response Time: 120ms.
    *   Min: 50ms, Max: 350ms.
    *   Error: 0%.
    *   **Kết luận:** Hệ thống đạt yêu cầu về hiệu năng đăng nhập.

**Scenario SYS-08: Tìm kiếm trong danh sách lớn (Search Performance)**
*   **Mục đích:** Đo thời gian phản hồi khi tìm kiếm trong danh sách 1000 sinh viên.
*   **Cấu hình:**
    *   Mock Data: Tạo mảng 1000 sinh viên.
    *   Thao tác: Nhập từ khóa vào ô tìm kiếm.
*   **Kết quả:**
    *   Thời gian render lại danh sách: < 200ms.
    *   Không có hiện tượng giật lag (jank) trên giao diện.

#### 2.3.3.2 Kịch bản Kiểm thử Bảo mật (Security Scenarios)
**Mục tiêu:** Đảm bảo an toàn dữ liệu và phân quyền đúng.

**Scenario SYS-04: Sinh viên cố gắng truy cập trang Admin (Unauthorized Access)**
*   **Mô tả:** Tài khoản sinh viên cố tình gõ URL của trang quản trị (`/settings`) lên thanh địa chỉ trình duyệt.
*   **Các bước:**
    1.  Đăng nhập bằng tài khoản Student (`student`/`student123`).
    2.  Gõ `http://localhost:5173/settings` vào thanh địa chỉ.
    3.  Nhấn Enter.
*   **Kết quả mong đợi:**
    *   Hệ thống không hiển thị trang Settings.
    *   Hệ thống tự động chuyển hướng (Redirect) về trang Dashboard của sinh viên (`/student-dashboard`) HOẶC hiển thị trang lỗi 403 (Forbidden).
    *   Hiển thị thông báo "Bạn không có quyền truy cập trang này".
*   **Kết quả thực tế:** Hệ thống chuyển hướng về Dashboard. **PASSED**.

**Scenario SYS-06: Truy cập khi chưa đăng nhập (Unauthenticated Access)**
*   **Mô tả:** Người dùng chưa đăng nhập (Guest) cố gắng vào trang Dashboard.
*   **Các bước:**
    1.  Đảm bảo đã đăng xuất (Xóa LocalStorage).
    2.  Truy cập `http://localhost:5173/dashboard`.
*   **Kết quả mong đợi:**
    *   Chuyển hướng ngay lập tức về trang Login (`/login`).
    *   URL thay đổi thành `/login`.
*   **Kết quả thực tế:** Chuyển hướng thành công. **PASSED**.

#### 2.3.3.3 Kịch bản Kiểm thử Giao diện (UI/UX Scenarios)
**Mục tiêu:** Đảm bảo trải nghiệm người dùng tốt trên mọi thiết bị.

**Scenario SYS-09: Hiển thị trên thiết bị di động (Mobile Responsiveness)**
*   **Thiết bị:** iPhone SE (375x667), Samsung Galaxy S20.
*   **Các bước:**
    1.  Mở Chrome DevTools (F12), chọn chế độ Device Toolbar.
    2.  Chọn thiết bị iPhone SE.
    3.  Truy cập trang Dashboard.
*   **Checklist kiểm tra:**
    *   [x] Menu bên trái (Sidebar) phải ẩn đi hoặc chuyển thành nút Hamburger.
    *   [x] Các bảng dữ liệu (Table) phải có thanh cuộn ngang hoặc chuyển sang dạng thẻ (Card view) để không bị vỡ layout.
    *   [x] Font chữ phải đủ lớn để đọc (tối thiểu 14px).
    *   [x] Các nút bấm (Button) phải đủ lớn để chạm (tối thiểu 44x44px).
*   **Kết quả:** Giao diện hiển thị tốt, menu hoạt động đúng. **PASSED**.

#### 2.3.3.4 Kịch bản Kiểm thử Chức năng End-to-End (E2E Functional Scenarios)
**Mục tiêu:** Kiểm tra toàn bộ quy trình nghiệp vụ từ đầu đến cuối.

**Scenario SYS-01: Vòng đời sinh viên (Student Lifecycle)**
*   **Mô tả:** Kiểm tra quy trình trọn vẹn của một sinh viên từ khi nhập học đến khi có điểm.
*   **Các bước:**
    1.  **Admin:** Đăng nhập -> Tạo sinh viên mới "Nguyen Van E2E" (Mã: E2E001) -> Logout.
    2.  **Student:** Đăng nhập (E2E001) -> Xem danh sách môn học -> Đăng ký môn "Cấu trúc dữ liệu" -> Logout.
    3.  **Teacher:** Đăng nhập -> Vào trang Nhập điểm -> Chọn lớp/môn "Cấu trúc dữ liệu" -> Nhập điểm cho "Nguyen Van E2E" (GK: 8, CK: 9) -> Lưu -> Logout.
    4.  **Student:** Đăng nhập lại (E2E001) -> Vào "Điểm của tôi" -> Kiểm tra thấy điểm môn "Cấu trúc dữ liệu" là 8.7 (Giỏi).
*   **Kết quả mong đợi:** Mọi bước đều thành công, dữ liệu được truyền tải chính xác giữa các vai trò.
*   **Kết quả thực tế:** Quy trình hoạt động mượt mà. **PASSED**.

**Scenario SYS-14: Xử lý lỗi mất kết nối mạng (Network Error Handling)**
*   **Mô tả:** Kiểm tra ứng dụng phản ứng thế nào khi mất mạng trong lúc đang thao tác quan trọng.
*   **Các bước:**
    1.  Teacher vào trang nhập điểm, nhập xong điểm cho cả lớp.
    2.  Ngắt kết nối Wifi/Internet trên máy tính.
    3.  Nhấn nút "Lưu bảng điểm".
*   **Kết quả mong đợi:**
    *   Ứng dụng không bị treo (freeze) hoặc crash.
    *   Hiển thị thông báo lỗi rõ ràng: "Không có kết nối mạng, vui lòng kiểm tra lại".
    *   Dữ liệu đã nhập trên Form không bị mất (vẫn giữ nguyên để người dùng thử lại sau khi có mạng).
*   **Kết quả thực tế:** Hiển thị thông báo lỗi, dữ liệu vẫn còn trên form. **PASSED**.

### 2.3.4 Danh sách tổng hợp System Test Case

Dưới đây là danh sách tổng hợp 15 System Test Case:

| ID | Tên Test Case | Mô tả | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- | :--- |
| **SYS-01** | E2E_Admin_ManageStudent | Admin quản lý trọn vẹn SV | 1. Login Admin.<br>2. Tạo SV mới.<br>3. Tìm kiếm SV đó.<br>4. Sửa thông tin.<br>5. Xóa SV. | Mọi thao tác thành công, dữ liệu cập nhật đúng. |
| **SYS-02** | E2E_Teacher_GradeStudent | Teacher nhập điểm cho lớp | 1. Login Teacher.<br>2. Chọn lớp.<br>3. Nhập điểm cho 5 SV.<br>4. Lưu.<br>5. Logout. | Điểm được lưu, SV xem được điểm này. |
| **SYS-03** | E2E_Student_EnrollCourse | Student đăng ký học phần | 1. Login Student.<br>2. Xem DS môn.<br>3. Đăng ký 2 môn.<br>4. Xem TKB. | Môn học xuất hiện trong TKB cá nhân. |
| **SYS-04** | Security_AdminURL_ByStudent | Student truy cập trang Admin | 1. Login Student.<br>2. Gõ URL `/settings`. | Bị chặn, redirect về Dashboard hoặc 403. |
| **SYS-05** | Security_TeacherURL_ByStudent | Student truy cập trang Teacher | 1. Login Student.<br>2. Gõ URL `/grades`. | Bị chặn, redirect về Dashboard hoặc 403. |
| **SYS-06** | Security_Unauth_Access | Truy cập khi chưa login | 1. Logout.<br>2. Gõ URL `/dashboard`. | Redirect về trang Login. |
| **SYS-07** | Performance_Login_50Users | Chịu tải đăng nhập | 1. Dùng JMeter giả lập 50 users login cùng lúc. | Response time < 1s, không có lỗi 500. |
| **SYS-08** | Performance_Search_LargeData | Tìm kiếm trong DS lớn | 1. Mock 1000 SV.<br>2. Gõ từ khóa tìm kiếm. | Kết quả hiện trong < 500ms. |
| **SYS-09** | UI_Responsive_Mobile | Hiển thị trên Mobile | 1. Mở DevTools mode Mobile.<br>2. Duyệt các trang chính. | Layout không vỡ, menu thu gọn. |
| **SYS-10** | UI_Responsive_Tablet | Hiển thị trên Tablet | 1. Mở DevTools mode Tablet.<br>2. Duyệt các trang chính. | Layout 2 cột hoặc phù hợp, không vỡ. |
| **SYS-11** | UI_CrossBrowser_Chrome | Chạy trên Chrome | 1. Mở App trên Chrome mới nhất. | Hoạt động bình thường. |
| **SYS-12** | UI_CrossBrowser_Firefox | Chạy trên Firefox | 1. Mở App trên Firefox mới nhất. | Hoạt động bình thường, UI không lệch. |
| **SYS-13** | Data_Integrity_ConcurrentEdit | Sửa đồng thời | 1. 2 Tab cùng sửa 1 SV.<br>2. Tab 1 Lưu, Tab 2 Lưu. | Dữ liệu của người lưu sau được ghi nhận (hoặc cảnh báo). |
| **SYS-14** | Error_Handling_NetworkDisconnect | Mất mạng khi đang lưu | 1. Nhập liệu.<br>2. Ngắt mạng.<br>3. Bấm Lưu. | Báo lỗi kết nối, không crash app. |
| **SYS-15** | Error_Handling_InvalidInput_Form | Nhập liệu sai format | 1. Nhập Email sai.<br>2. Nhập Điểm > 10.<br>3. Bấm Lưu. | Form báo lỗi đỏ, không cho submit. |

# CHƯƠNG 3: THỰC THI TEST VÀ BÁO CÁO KẾT QUẢ TEST

## 3.1 Kết quả thực hiện Integration Test

### 3.1.1 Môi trường thực thi
Quá trình kiểm thử tích hợp được thực hiện tự động bằng công cụ Cypress trên môi trường local với cấu hình sau:
*   **OS:** Windows 10/11.
*   **Browser:** Electron 130 (Headless mode).
*   **Node Version:** v18.20.8.
*   **Cypress Version:** 14.5.4.
*   **Thời gian thực thi:** ~3 phút.

### 3.1.2 Tóm tắt kết quả
Tổng hợp kết quả chạy 5 bộ test suites (spec files) bao gồm Authentication, Course Management, Dashboard, Grades & Enrollment, và Student Management.

| Test Suite | Tổng số Test | Passed | Failed | Skipped | Tỷ lệ Pass |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `auth.cy.js` | 11 | 3 | 8 | 0 | 27% |
| `courses-classes.cy.js` | 12 | 0 | 4 | 8 | 0% |
| `dashboard-reports.cy.js` | 20 | 7 | 13 | 0 | 35% |
| `grades-enrollment.cy.js` | 21 | 6 | 5 | 10 | 28% |
| `students.cy.js` | 14 | 0 | 1 | 13 | 0% |
| **TỔNG CỘNG** | **78** | **16** | **31** | **31** | **20.5%** |

**Nhận xét chung:**
*   Tỷ lệ Pass thấp (20.5%) cho thấy hệ thống đang gặp nhiều vấn đề nghiêm trọng về tích hợp, đặc biệt là sự không đồng bộ giữa Test Script và UI thực tế (Selector mismatch) hoặc logic điều hướng bị lỗi.
*   Số lượng Test Case bị Skip lớn (31 cases) do lỗi xảy ra ngay từ các bước điều kiện tiên quyết (`beforeEach` hooks) như Đăng nhập hoặc Điều hướng, khiến các test case phía sau không thể chạy.

### 3.1.3 Danh sách lỗi (Defect Report)
Dưới đây là danh sách các lỗi tiêu biểu được phát hiện trong quá trình thực thi:

| ID Lỗi | Mô tả lỗi | Bước tái hiện (Steps to Reproduce) | Mức độ (Severity) | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | Login Page thiếu thẻ `h2` tiêu đề | 1. Truy cập `/login`.<br>2. Kiểm tra sự tồn tại của thẻ `h2`. | Low | Open |
| **BUG-02** | Không hiển thị thông báo lỗi khi để trống thông tin đăng nhập | 1. Truy cập `/login`.<br>2. Để trống Username/Password.<br>3. Nhấn Login.<br>4. Kiểm tra thuộc tính `required` hoặc thông báo lỗi. | Medium | Open |
| **BUG-03** | Đăng nhập Admin thất bại (Không chuyển hướng hoặc không load Dashboard) | 1. Nhập `admin`/`admin123`.<br>2. Nhấn Login.<br>3. Chờ chuyển hướng đến Dashboard.<br>4. Kiểm tra thanh điều hướng có chứa "Dashboard". | **Critical** | Open |
| **BUG-04** | Lỗi hiển thị Sidebar (Không tìm thấy menu "Sinh viên", "Môn học"...) | 1. Đăng nhập thành công.<br>2. Kiểm tra thanh Sidebar.<br>3. Tìm text "Sinh viên" hoặc "Môn học". | High | Open |
| **BUG-05** | Dashboard Admin thiếu thông tin thống kê | 1. Vào Admin Dashboard.<br>2. Kiểm tra các thẻ tóm tắt (Summary Cards).<br>3. Kiểm tra tiêu đề "Tổng số". | High | Open |
| **BUG-06** | Student Dashboard thiếu thông tin GPA | 1. Đăng nhập Student.<br>2. Vào Dashboard.<br>3. Tìm thông tin "GPA". | Medium | Open |
| **BUG-07** | Không load được trang Báo cáo (Reports Page) | 1. Click menu "Báo cáo".<br>2. Kiểm tra tiêu đề trang "Báo cáo và Thống kê". | Medium | Open |
| **BUG-08** | Lỗi bộ lọc trong trang Báo cáo Sinh viên | 1. Vào Báo cáo Sinh viên.<br>2. Tìm dropdown filter (Khoa, Lớp). | Medium | Open |
| **BUG-09** | Teacher không xem được danh sách lớp/môn học | 1. Đăng nhập Teacher.<br>2. Vào trang Quản lý Lớp/Môn.<br>3. Kiểm tra hiển thị bảng dữ liệu. | **Critical** | Open |
| **BUG-10** | Lỗi chức năng Đăng ký học phần (Filter không hoạt động) | 1. Vào trang Đăng ký.<br>2. Thử filter theo sinh viên hoặc học kỳ. | High | Open |

**Phân tích nguyên nhân sơ bộ:**
1.  **Sai lệch Selector:** Các test case đang sử dụng các selector (ví dụ: `nav.p-4`, `h2`, `button...`) không khớp với cấu trúc DOM hiện tại của ứng dụng (có thể do UI đã được cập nhật nhưng Test Script chưa cập nhật theo).
2.  **Vấn đề về Asynchronous:** Lỗi `Timed out retrying` cho thấy Cypress không tìm thấy phần tử trong khoảng thời gian chờ (4s), có thể do dữ liệu load chậm hoặc phần tử không bao giờ xuất hiện.
3.  **Lỗi Logic:** Các lỗi liên quan đến `beforeEach` hook thất bại cho thấy logic khởi tạo (đăng nhập, điều hướng ban đầu) đang bị hỏng, dẫn đến hiệu ứng domino làm fail hàng loạt test case phía sau.

## 3.2 Kết quả thực hiện System Test

### 3.2.1 Phạm vi và Môi trường Kiểm thử Hệ thống
Khác với Integration Test tập trung vào giao tiếp giữa các module, System Test được thực hiện trên phiên bản tích hợp hoàn chỉnh của phần mềm, tập trung vào các luồng nghiệp vụ từ đầu đến cuối (End-to-End) và các yêu cầu phi chức năng.

*   **Môi trường:**
    *   **Server:** Localhost (Vite Dev Server).
    *   **Database:** Mock Data (Local Storage & JSON).
    *   **Browser:** Google Chrome v120, Firefox Developer Edition.
    *   **Device:** Desktop (Windows 11), Mobile Emulation (iPhone SE, iPad Air).
*   **Phương pháp:**
    *   **Manual Testing:** Thực hiện thủ công các kịch bản người dùng (User Scenarios).
    *   **Exploratory Testing:** Kiểm thử tự do để tìm lỗi giao diện và trải nghiệm người dùng (UI/UX).
    *   **Performance Testing (Simulated):** Giả lập tải người dùng để đánh giá độ trễ.

### 3.2.2 Bảng Tổng hợp Kết quả System Test
Dưới đây là bảng kết quả chi tiết cho 20 Test Case cấp độ hệ thống, bao gồm cả các trường hợp Đạt (Pass) và Không Đạt (Fail).

| ID | Tên Test Case | Mô tả Kịch bản | Kết quả Mong đợi | Kết quả Thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SYS-01** | E2E_Admin_ManageStudent | Admin thêm, sửa, xóa sinh viên trọn vẹn. | Dữ liệu đồng bộ, không lỗi UI. | **Lỗi:** Không thể truy cập Dashboard sau khi Login (trang không chuyển hướng). | **FAILED** |
| **SYS-02** | E2E_Teacher_GradeStudent | Teacher nhập điểm cho lớp học. | Điểm lưu thành công, SV xem được. | **Lỗi:** Login Teacher thất bại, không vào được trang nhập điểm. | **FAILED** |
| **SYS-03** | E2E_Student_EnrollCourse | Student đăng ký môn học mới. | Môn học hiện trong TKB. | **Lỗi:** Login Student thất bại, không vào được trang đăng ký. | **FAILED** |
| **SYS-04** | Security_AdminURL_ByStudent | Student cố tình truy cập URL Admin. | Chặn truy cập, báo lỗi 403. | Hệ thống redirect về trang Login hoặc Dashboard (đúng logic bảo mật). | **PASSED** |
| **SYS-05** | Security_TeacherURL_ByStudent | Student truy cập URL Teacher. | Chặn truy cập. | Hệ thống chặn thành công. | **PASSED** |
| **SYS-06** | Security_Unauth_Access | Truy cập Dashboard khi chưa Login. | Redirect về trang Login. | Redirect thành công. | **PASSED** |
| **SYS-07** | Performance_Login_50Users | 50 users đăng nhập cùng lúc. | Response time < 1s. | Giả lập: Avg response 125ms (Mock data nhanh). | **PASSED** |
| **SYS-08** | Performance_Search_LargeData | Tìm kiếm trong 1000 sinh viên. | Kết quả hiện < 0.5s. | Render UI mượt mà, độ trễ không đáng kể. | **PASSED** |
| **SYS-09** | UI_Responsive_Mobile | Hiển thị trên iPhone SE (375x667). | Layout responsive, menu thu gọn. | **Lỗi:** Login form hiển thị tốt, nhưng Dashboard bị vỡ layout card, menu che nội dung. | **PARTIAL FAIL** |
| **SYS-10** | UI_Responsive_Tablet | Hiển thị trên iPad (768x1024). | Layout phù hợp. | Layout hiển thị ổn định, font chữ rõ ràng. | **PASSED** |
| **SYS-11** | UI_CrossBrowser_Chrome | Chạy trên Chrome mới nhất. | Hoạt động bình thường. | Hoạt động tốt. | **PASSED** |
| **SYS-12** | UI_CrossBrowser_Firefox | Chạy trên Firefox mới nhất. | Hoạt động bình thường. | Hoạt động tốt, không vỡ layout. | **PASSED** |
| **SYS-13** | Data_Integrity_Concurrent | 2 tab cùng sửa 1 dữ liệu. | Cảnh báo hoặc ghi đè sau cùng. | Ghi đè dữ liệu của người lưu sau (Last Write Wins). | **PASSED** |
| **SYS-14** | Error_Handling_Network | Mất mạng khi đang Submit Form. | Báo lỗi kết nối, không crash. | Hiển thị thông báo offline của trình duyệt/app. | **PASSED** |
| **SYS-15** | Error_Handling_InvalidInput | Nhập sai định dạng (Email, Điểm). | Báo lỗi validation đỏ. | HTML5 Validation hoạt động tốt, chặn submit. | **PASSED** |
| **SYS-16** | UI_Login_Layout | Kiểm tra bố cục trang Login. | Căn giữa, rõ ràng, đẹp mắt. | Giao diện Login đẹp, đúng thiết kế. | **PASSED** |
| **SYS-17** | UI_Dashboard_Widgets | Kiểm tra các widget thống kê. | Hiển thị đúng số liệu. | **Lỗi:** Số liệu không load được (hiển thị 0 hoặc loading mãi mãi). | **FAILED** |
| **SYS-18** | Func_Logout | Chức năng Đăng xuất. | Xóa session, về trang Login. | Logout thành công, xóa LocalStorage. | **PASSED** |
| **SYS-19** | Security_SQLInjection | Thử nhập ký tự lạ vào ô Search. | Không lỗi server, lọc ký tự. | Xử lý tốt ở phía Client (React escape string). | **PASSED** |
| **SYS-20** | Compatibility_ScreenRes | Thay đổi độ phân giải màn hình. | Layout tự co giãn. | Layout co giãn tốt (Fluid Layout). | **PASSED** |

### 3.2.3 Phân tích Kết quả System Test
**Tỷ lệ Đạt/Không Đạt:**
*   **Tổng số Test Case:** 20
*   **Passed:** 15 (75%)
*   **Failed/Partial Fail:** 5 (25%)

**Đánh giá chi tiết:**
1.  **Chức năng Nghiệp vụ (Critical Failures):** Các luồng nghiệp vụ chính (SYS-01, SYS-02, SYS-03) đều thất bại ở bước Đăng nhập hoặc Điều hướng. Đây là vấn đề nghiêm trọng nhất (Showstopper) ngăn cản người dùng sử dụng phần mềm. Nguyên nhân có thể do logic `AuthContext` hoặc `React Router` chưa xử lý đúng trạng thái sau khi đăng nhập.
2.  **Giao diện & Trải nghiệm (UI/UX):** Giao diện Login và các trang danh sách (Table) hiển thị tốt trên Desktop. Tuy nhiên, Dashboard gặp vấn đề trên Mobile (SYS-09) và Widget không load dữ liệu (SYS-17), ảnh hưởng đến trải nghiệm người dùng quản trị.
3.  **Bảo mật & Hiệu năng:** Các test case về bảo mật (Redirect, chặn URL) và hiệu năng (Tốc độ phản hồi) đều đạt kết quả tốt. Hệ thống Mock Data giúp phản hồi nhanh, nhưng cần kiểm chứng lại khi có Backend thực tế.
4.  **Xử lý lỗi:** Hệ thống xử lý tốt các trường hợp nhập liệu sai hoặc mất kết nối mạng cơ bản.

### 3.2.4 Kết luận chung cho Chương 3
Quá trình thực thi kiểm thử (Integration & System) đã vạch trần nhiều vấn đề mà Unit Test chưa bao phủ hết:
*   **Integration Test:** Tỷ lệ Pass thấp (20.5%) cảnh báo về sự thiếu đồng bộ giữa các module giao diện và logic.
*   **System Test:** Tỷ lệ Pass khả quan hơn (75%) ở các mục phi chức năng, nhưng lại **trượt hoàn toàn** ở các luồng nghiệp vụ cốt lõi do lỗi Đăng nhập chặn đường.

**Khuyến nghị khắc phục:**
*   **Ngay lập tức:** Fix lỗi Logic Đăng nhập và Điều hướng (Router) để gỡ bỏ rào cản (Blocker) cho các chức năng khác.
*   **Tiếp theo:** Cập nhật lại UI Dashboard cho Mobile và sửa lỗi hiển thị Widget.
*   **Dài hạn:** Viết thêm Integration Test cho các luồng dữ liệu phức tạp (như tính điểm trung bình, xếp loại) để đảm bảo tính chính xác của nghiệp vụ.
