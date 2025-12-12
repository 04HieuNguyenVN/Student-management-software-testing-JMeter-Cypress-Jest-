/* eslint-env cypress */
// Kiểm thử luồng Xác thực cho Hệ thống Quản lý Sinh viên

describe("Kiểm thử Xác thực (Authentication)", () => {
  beforeEach(() => {
    // Xóa localStorage trước mỗi test
    cy.clearLocalStorage();
    cy.visit("/login");
  });

  describe("Trang Đăng nhập", () => {
    it(" hiển thị form đăng nhập", () => {
      cy.get("h1").should("contain", "Đăng nhập");
      cy.get('input[type="text"]').should("exist");
      cy.get('input[type="password"]').should("exist");
      cy.get('button[type="submit"]').should("exist");
    });

    it(" báo lỗi khi để trống thông tin đăng nhập", () => {
      cy.get('button[type="submit"]').click();
      cy.get('input[type="text"]').should("have.attr", "required");
      cy.get('input[type="password"]').should("have.attr", "required");
    });

    it(" báo lỗi khi nhập thông tin đăng nhập sai", () => {
      cy.get('input[type="text"]').type("wronguser");
      cy.get('input[type="password"]').type("wrongpass");
      cy.get('button[type="submit"]').click();

      // Vẫn ở trang login hoặc hiển thị lỗi
      cy.url().should("include", "/login");
    });
  });

  describe("Đăng nhập Admin", () => {
    it(" đăng nhập thành công với tài khoản Admin", () => {
      cy.login("admin");

      //  chuyển hướng đến dashboard
      cy.url().should("include", "/dashboard");

      //  hiển thị các mục menu dành cho admin
      cy.get("nav").should("contain", "Trang chủ");
      cy.get("nav").should("contain", "Quản lý sinh viên");
      cy.get("nav").should("contain", "Quản lý môn học");
      cy.get("nav").should("contain", "Quản lý lớp học");
      cy.get("nav").should("contain", "Quản lý điểm");
      cy.get("nav").should("contain", "Đăng ký học phần");
      cy.get("nav").should("contain", "Báo cáo & Thống kê");
      cy.get("nav").should("contain", "Cài đặt");
    });

    it(" đăng xuất thành công", () => {
      cy.login("admin");
      cy.logout();
      cy.url().should("include", "/login");
    });
  });

  describe("Đăng nhập Giáo viên", () => {
    it(" đăng nhập thành công với tài khoản Giáo viên", () => {
      cy.login("teacher");

      cy.url().should("include", "/dashboard");

      // Các mục menu dành cho giáo viên
      cy.get("nav").should("contain", "Trang chủ");
      cy.get("nav").should("contain", "Lớp học");
      cy.get("nav").should("contain", "Môn học");
      cy.get("nav").should("contain", "Quản lý điểm");
      cy.get("nav").should("contain", "Đăng ký học phần");

      // KHÔNG  thấy các mục chỉ dành cho admin
      cy.get("nav").should("not.contain", "Quản lý sinh viên");
      cy.get("nav").should("not.contain", "Cài đặt");
    });
  });

  describe("Đăng nhập Sinh viên", () => {
    it(" đăng nhập thành công với tài khoản Sinh viên", () => {
      cy.login("student");

      cy.url().should("include", "/dashboard");

      // Các mục menu dành cho sinh viên
      cy.get("nav").should("contain", "Trang chủ");
      cy.get("nav").should("contain", "Xem điểm");
      cy.get("nav").should("contain", "Đăng ký học phần");

      // KHÔNG  thấy các mục dành cho admin/giáo viên
      cy.get("nav").should("not.contain", "Quản lý sinh viên");
      cy.get("nav").should("not.contain", "Môn học");
      cy.get("nav").should("not.contain", "Lớp học");
      cy.get("nav").should("not.contain", "Điểm");
      cy.get("nav").should("not.contain", "Báo cáo");
      cy.get("nav").should("not.contain", "Cài đặt");
    });
  });

  describe("Duy trì Phiên đăng nhập", () => {
    it(" giữ phiên đăng nhập sau khi tải lại trang", () => {
      cy.login("admin");
      cy.url().should("include", "/dashboard");

      // Tải lại trang
      cy.reload();

      // Vẫn đăng nhập
      cy.url().should("include", "/dashboard");
      cy.get("nav").should("contain", "Quản lý sinh viên");
    });
  });

  describe("Bảo vệ Route", () => {
    it(" chuyển hướng về login khi truy cập route bảo vệ mà chưa đăng nhập", () => {
      cy.visit("/students");
      cy.url().should("include", "/login");
    });

    it(" chặn sinh viên truy cập route dành cho admin", () => {
      cy.login("student");

      // Thử truy cập route admin
      cy.visit("/students");

      //  hiển thị từ chối hoặc chuyển hướng
      cy.contains("Bạn không có quyền truy cập trang này").should("be.visible");
    });

    it(" chặn giáo viên truy cập route chỉ dành cho admin", () => {
      cy.login("teacher");

      // Thử truy cập route admin
      cy.visit("/settings");

      //  hiển thị từ chối hoặc chuyển hướng
      cy.contains("Bạn không có quyền truy cập trang này").should("be.visible");
    });
  });
});
