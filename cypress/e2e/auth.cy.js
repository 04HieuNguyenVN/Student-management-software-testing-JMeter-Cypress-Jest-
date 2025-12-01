/* eslint-env cypress */
// Test Authentication flows for Student Management System

describe("Authentication", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    cy.visit("/login");
  });

  describe("Login Page", () => {
    it("should display login form", () => {
      cy.get("h2").should("contain", "Đăng nhập");
      cy.get('input[type="text"]').should("exist");
      cy.get('input[type="password"]').should("exist");
      cy.get('button[type="submit"]').should("exist");
    });

    it("should show error on empty credentials", () => {
      cy.get('button[type="submit"]').click();
      cy.get('input[type="text"]').should("have.attr", "required");
      cy.get('input[type="password"]').should("have.attr", "required");
    });

    it("should show error on invalid credentials", () => {
      cy.get('input[type="text"]').type("wronguser");
      cy.get('input[type="password"]').type("wrongpass");
      cy.get('button[type="submit"]').click();

      // Should stay on login page or show error
      cy.url().should("include", "/login");
    });
  });

  describe("Admin Login", () => {
    it("should login successfully as admin", () => {
      cy.login("admin");

      // Should redirect to dashboard
      cy.url().should("include", "/dashboard");

      // Should show admin menu items
      cy.get("nav").should("contain", "Dashboard");
      cy.get("nav").should("contain", "Sinh viên");
      cy.get("nav").should("contain", "Môn học");
      cy.get("nav").should("contain", "Lớp học");
      cy.get("nav").should("contain", "Điểm");
      cy.get("nav").should("contain", "Đăng ký học phần");
      cy.get("nav").should("contain", "Báo cáo");
      cy.get("nav").should("contain", "Cài đặt");
    });

    it("should logout successfully", () => {
      cy.login("admin");
      cy.logout();
      cy.url().should("include", "/login");
    });
  });

  describe("Teacher Login", () => {
    it("should login successfully as teacher", () => {
      cy.login("teacher");

      cy.url().should("include", "/dashboard");

      // Teacher menu items
      cy.get("nav").should("contain", "Dashboard");
      cy.get("nav").should("contain", "Lớp học");
      cy.get("nav").should("contain", "Môn học");
      cy.get("nav").should("contain", "Điểm");
      cy.get("nav").should("contain", "Đăng ký học phần");

      // Should NOT see admin-only items
      cy.get("nav").should("not.contain", "Sinh viên");
      cy.get("nav").should("not.contain", "Cài đặt");
    });
  });

  describe("Student Login", () => {
    it("should login successfully as student", () => {
      cy.login("student");

      cy.url().should("include", "/dashboard");

      // Student menu items
      cy.get("nav").should("contain", "Dashboard");
      cy.get("nav").should("contain", "Điểm của tôi");
      cy.get("nav").should("contain", "Đăng ký học phần");

      // Should NOT see admin/teacher items
      cy.get("nav").should("not.contain", "Sinh viên");
      cy.get("nav").should("not.contain", "Môn học");
      cy.get("nav").should("not.contain", "Lớp học");
      cy.get("nav").should("not.contain", "Điểm");
      cy.get("nav").should("not.contain", "Báo cáo");
      cy.get("nav").should("not.contain", "Cài đặt");
    });
  });

  describe("Session Persistence", () => {
    it("should persist login session after page reload", () => {
      cy.login("admin");
      cy.url().should("include", "/dashboard");

      // Reload page
      cy.reload();

      // Should still be logged in
      cy.url().should("include", "/dashboard");
      cy.get("nav").should("contain", "Sinh viên");
    });
  });

  describe("Protected Routes", () => {
    it("should redirect to login when accessing protected route without auth", () => {
      cy.visit("/students");
      cy.url().should("include", "/login");
    });

    it("should prevent student from accessing admin routes", () => {
      cy.login("student");

      // Try to access admin route
      cy.visit("/students");

      // Should show access denied or redirect
      cy.url().should("not.include", "/students");
    });

    it("should prevent teacher from accessing admin-only routes", () => {
      cy.login("teacher");

      // Try to access admin route
      cy.visit("/settings");

      // Should show access denied or redirect
      cy.url().should("not.include", "/settings");
    });
  });
});
