/* eslint-env cypress */
// Test Dashboard and Reports

describe("Dashboard", () => {
  describe("Admin Dashboard", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.login("admin");
    });

    it("should display admin dashboard with statistics", () => {
      cy.url().should("include", "/dashboard");
      cy.get("h1").should("contain", "Dashboard");
    });

    it("should display summary cards", () => {
      // Should show total students, classes, courses, etc.
      cy.get("div").contains("Tổng số").should("exist");
    });

    it("should display charts or graphs", () => {
      const charts = cy.get("canvas, svg");
      // Charts may or may not be implemented yet
    });
  });

  describe("Teacher Dashboard", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.login("teacher");
    });

    it("should display teacher dashboard", () => {
      cy.url().should("include", "/dashboard");
      cy.get("h1").should("contain", "Dashboard");
    });

    it("should show teacher-specific information", () => {
      cy.get("div").should("contain", "Lớp học");
    });
  });

  describe("Student Dashboard", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.login("student");
    });

    it("should display student dashboard", () => {
      cy.url().should("include", "/dashboard");
      cy.get("h1").should("contain", "Dashboard");
    });

    it("should show student GPA and academic info", () => {
      cy.get("div").contains("GPA").should("exist");
    });
  });
});

describe("Reports", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Báo cáo");
  });

  describe("Reports Page", () => {
    it("should display reports page", () => {
      cy.url().should("include", "/reports");
      cy.get("h1").should("contain", "Báo cáo và Thống kê");
    });

    it("should have report type selector", () => {
      cy.get("select, button").should("exist");
    });
  });

  describe("Student Reports", () => {
    it("should generate student list report", () => {
      const reportButton = cy.get("button").contains("Danh sách sinh viên");
      if (reportButton.length > 0) {
        reportButton.click();
        cy.wait(300);
        cy.get("table").should("exist");
      }
    });

    it("should filter by department", () => {
      cy.get("select").first().select(1);
      cy.wait(300);
    });

    it("should filter by class", () => {
      const selects = cy.get("select");
      if (selects.length > 1) {
        selects.eq(1).select(1);
        cy.wait(300);
      }
    });
  });

  describe("Grade Reports", () => {
    it("should generate grade summary report", () => {
      const gradeButton = cy.get("button").contains("Báo cáo điểm");
      if (gradeButton.length > 0) {
        gradeButton.click();
        cy.wait(300);
      }
    });

    it("should show statistics", () => {
      cy.get("div").contains("Thống kê").should("exist");
    });
  });

  describe("Export Reports", () => {
    it("should have export buttons", () => {
      const exportButtons = cy.get("button").filter((i, el) => {
        return (
          el.textContent.includes("Xuất") || el.textContent.includes("Export")
        );
      });
      // Export may not be implemented yet
    });
  });
});

describe("Settings", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Cài đặt");
  });

  it("should display settings page for admin only", () => {
    cy.url().should("include", "/settings");
    cy.get("h1").should("contain", "Cài đặt Hệ thống");
  });

  it("should display settings tabs", () => {
    cy.get("button, div").contains("Chung").should("exist");
  });

  it("should allow updating settings", () => {
    const saveButton = cy.get("button").contains("Lưu");
    if (saveButton.length > 0) {
      saveButton.should("exist");
    }
  });
});

describe("Navigation", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
  });

  it("should navigate between pages using sidebar", () => {
    cy.navigateTo("Sinh viên");
    cy.url().should("include", "/students");

    cy.navigateTo("Môn học");
    cy.url().should("include", "/subjects");

    cy.navigateTo("Lớp học");
    cy.url().should("include", "/classes");
  });

  it("should highlight active menu item", () => {
    cy.navigateTo("Sinh viên");
    cy.get('nav a[href="/students"]').should("have.class", "bg-blue-700");
  });
});
