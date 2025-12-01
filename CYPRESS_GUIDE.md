# Cypress Testing Guide

## 📋 Giới thiệu

Dự án Student Management System đã được tích hợp Cypress để automated testing. Test suite bao gồm các test cases toàn diện cho tất cả các chức năng chính.

## 🚀 Cài đặt

Cypress đã được cài đặt sẵn. Nếu cần cài lại:

```bash
npm install -D cypress
```

## 🏃 Chạy Tests

### Mở Cypress Test Runner (Interactive Mode)

```bash
npm test
```

hoặc

```bash
npx cypress open
```

### Chạy Tests trong Headless Mode

```bash
npm run test:headless
```

### Chạy Tests trên trình duyệt cụ thể

```bash
npm run test:chrome
npm run test:firefox
```

## 📁 Cấu trúc Test Files

```
cypress/
├── e2e/
│   ├── auth.cy.js                 # Test đăng nhập và phân quyền
│   ├── students.cy.js             # Test quản lý sinh viên (CRUD)
│   ├── courses-classes.cy.js      # Test quản lý môn học & lớp học
│   ├── grades-enrollment.cy.js    # Test điểm & đăng ký học phần
│   └── dashboard-reports.cy.js    # Test dashboard & báo cáo
├── support/
│   ├── commands.js                # Custom Cypress commands
│   └── e2e.js                     # Global configuration
└── cypress.config.js              # Cypress configuration

```

## 🧪 Test Coverage

### 1. Authentication Tests (`auth.cy.js`)

- ✅ Hiển thị form đăng nhập
- ✅ Validation credentials
- ✅ Đăng nhập với 3 roles: Admin, Teacher, Student
- ✅ Phân quyền menu theo role
- ✅ Đăng xuất
- ✅ Session persistence
- ✅ Protected routes

**Test Cases:** 10 scenarios

### 2. Student Management Tests (`students.cy.js`)

- ✅ Hiển thị danh sách sinh viên
- ✅ Tìm kiếm và lọc
- ✅ Thêm sinh viên mới
- ✅ Validation form
- ✅ Sửa thông tin sinh viên
- ✅ Xóa sinh viên
- ✅ Xuất dữ liệu

**Test Cases:** 15+ scenarios

### 3. Course & Class Management Tests (`courses-classes.cy.js`)

- ✅ Quản lý môn học (CRUD)
- ✅ Quản lý lớp học (CRUD)
- ✅ Tìm kiếm môn học/lớp học
- ✅ Phân quyền teacher access

**Test Cases:** 12+ scenarios

### 4. Grades & Enrollment Tests (`grades-enrollment.cy.js`)

- ✅ Quản lý điểm
- ✅ Validation điểm (0-10)
- ✅ Lọc điểm theo lớp/môn
- ✅ Xem điểm cá nhân (student)
- ✅ Đăng ký học phần
- ✅ Kiểm tra điều kiện đăng ký

**Test Cases:** 15+ scenarios

### 5. Dashboard & Reports Tests (`dashboard-reports.cy.js`)

- ✅ Dashboard theo role
- ✅ Thống kê tổng quan
- ✅ Báo cáo sinh viên
- ✅ Báo cáo điểm
- ✅ Cài đặt hệ thống
- ✅ Navigation

**Test Cases:** 12+ scenarios

## 🔧 Custom Commands

### `cy.login(role)`

Đăng nhập với role cụ thể:

```javascript
cy.login("admin"); // Đăng nhập admin
cy.login("teacher"); // Đăng nhập giảng viên
cy.login("student"); // Đăng nhập sinh viên
```

### `cy.logout()`

Đăng xuất:

```javascript
cy.logout();
```

### `cy.navigateTo(menuItem)`

Điều hướng qua sidebar menu:

```javascript
cy.navigateTo("Sinh viên");
cy.navigateTo("Môn học");
```

### `cy.fillForm(formData)`

Điền form tự động:

```javascript
cy.fillForm({
  studentCode: "SV001",
  fullName: "Nguyễn Văn A",
  email: "test@example.com",
});
```

### `cy.verifyRolePermissions(role, expectedMenuItems)`

Kiểm tra quyền truy cập:

```javascript
cy.verifyRolePermissions("admin", ["Sinh viên", "Môn học", "Lớp học"]);
```

## 📊 Test Credentials

### Admin

- Username: `admin`
- Password: `admin123`

### Teacher

- Username: `teacher`
- Password: `teacher123`

### Student

- Username: `student`
- Password: `student123`

## ⚙️ Configuration

File `cypress.config.js`:

```javascript
{
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true
  }
}
```

## 📝 Best Practices

### 1. Chạy dev server trước khi test

```bash
npm run dev
```

Đảm bảo ứng dụng đang chạy tại `http://localhost:5173`

### 2. Clear localStorage giữa các tests

```javascript
beforeEach(() => {
  cy.clearLocalStorage();
});
```

### 3. Sử dụng data-testid cho stable selectors

Thay vì:

```javascript
cy.get(".btn-primary"); // ❌ Dễ thay đổi
```

Nên:

```javascript
cy.get('[data-testid="submit-button"]'); // ✅ Stable
```

### 4. Tránh hard-coded waits

Thay vì:

```javascript
cy.wait(1000); // ❌
```

Nên:

```javascript
cy.get(".loading").should("not.exist"); // ✅
```

## 🐛 Debugging

### 1. Sử dụng `.debug()`

```javascript
cy.get("table").debug();
```

### 2. Pause test

```javascript
cy.pause();
```

### 3. Take screenshots

```javascript
cy.screenshot("error-state");
```

### 4. Log to console

```javascript
cy.log("Testing login functionality");
```

## 📈 Running Specific Tests

### Chạy một file test cụ thể

```bash
npx cypress run --spec "cypress/e2e/auth.cy.js"
```

### Chạy tests có tag cụ thể

```bash
npx cypress run --spec "cypress/e2e/**/*auth*.cy.js"
```

## 🔄 CI/CD Integration

Để chạy tests trong CI/CD pipeline:

```yaml
# .github/workflows/test.yml
name: Cypress Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: cypress-io/github-action@v5
        with:
          build: npm run build
          start: npm run dev
          wait-on: "http://localhost:5173"
```

## 📚 Tài liệu tham khảo

- [Cypress Documentation](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)

## ⚠️ Lưu ý

1. **Mock Data**: Tests sử dụng mock data từ `src/data/mockData.js`
2. **State Isolation**: Mỗi test được reset về trạng thái ban đầu
3. **Browser Support**: Tests tương thích với Chrome, Firefox, Edge
4. **Parallel Execution**: Có thể chạy song song nhiều spec files

## 🎯 Test Execution Strategy

### Quick Smoke Test (5-10 phút)

```bash
npx cypress run --spec "cypress/e2e/auth.cy.js"
```

### Full Regression Test (20-30 phút)

```bash
npm run test:headless
```

### Interactive Development

```bash
npm test
```

## 🏆 Coverage Goals

- ✅ **Authentication**: 100%
- ✅ **CRUD Operations**: 90%+
- ✅ **Role Permissions**: 100%
- ✅ **Form Validations**: 85%+
- ⏳ **API Integration**: Pending (sau khi có backend)
- ⏳ **Export Functions**: Pending (sau khi implement)

## 🔮 Future Enhancements

1. [ ] Visual regression testing với Percy/Applitools
2. [ ] API mocking với cy.intercept()
3. [ ] Accessibility testing với cypress-axe
4. [ ] Performance testing
5. [ ] Load testing với Artillery
6. [ ] Component testing

---

**Happy Testing! 🚀**
