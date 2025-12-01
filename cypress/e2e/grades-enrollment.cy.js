/* eslint-env cypress */
// Test Grades Management and Student Enrollment

describe("Grades Management", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Điểm");
  });

  describe("Grades List View", () => {
    it("should display grades page", () => {
      cy.url().should("include", "/grades");
      cy.get("h1").should("contain", "Quản lý Điểm");
    });

    it("should display grades table", () => {
      cy.get("table").should("exist");
    });
  });

  describe("Filter Grades", () => {
    it("should filter by class", () => {
      cy.get("select").first().select(1);
      cy.wait(300);
      cy.get("table").should("exist");
    });

    it("should filter by subject", () => {
      const selects = cy.get("select");
      if (selects.length > 1) {
        selects.eq(1).select(1);
        cy.wait(300);
      }
    });
  });

  describe("Add/Edit Grades", () => {
    it("should open grade entry form", () => {
      cy.get("button").contains("Nhập điểm").click();
      cy.get("h2").should("contain", "Nhập điểm");
    });

    it("should validate grade range", () => {
      cy.get("button").contains("Nhập điểm").click();

      // Try to enter invalid grade
      const gradeInputs = cy.get('input[type="number"]');
      if (gradeInputs.length > 0) {
        gradeInputs.first().clear().type("11"); // Invalid: > 10
        gradeInputs.first().should("have.attr", "max", "10");
      }
    });
  });

  describe("Grade Statistics", () => {
    it("should display grade statistics", () => {
      const statsSection = cy.get("div").contains("Thống kê");
      if (statsSection.length > 0) {
        statsSection.should("be.visible");
      }
    });
  });
});

describe("Student Grade View", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("student");
    cy.navigateTo("Điểm của tôi");
  });

  it("should display student grades", () => {
    cy.url().should("include", "/my-grades");
    cy.get("h1").should("contain", "Kết quả học tập");
  });

  it("should display GPA information", () => {
    cy.get("div").contains("GPA").should("exist");
  });

  it("should display grade table", () => {
    cy.get("table").should("exist");
  });

  it("should not allow editing grades", () => {
    cy.get("button").contains("Sửa").should("not.exist");
    cy.get("button").contains("Xóa").should("not.exist");
  });
});

describe("Enrollment Management", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Đăng ký học phần");
  });

  describe("Enrollment List View", () => {
    it("should display enrollment page", () => {
      cy.url().should("include", "/enrollment");
      cy.get("h1").should("contain", "Đăng ký học phần");
    });

    it("should display enrollment table", () => {
      cy.get("table").should("exist");
    });
  });

  describe("Add Enrollment", () => {
    it("should open enrollment form", () => {
      cy.get("button").contains("Đăng ký mới").click();
      cy.get("h2").should("contain", "Đăng ký học phần");
    });

    it("should register student for course", () => {
      cy.get("button").contains("Đăng ký mới").click();

      // Select student
      cy.get("select").first().select(1);

      // Select subject
      const selects = cy.get("select");
      if (selects.length > 1) {
        selects.eq(1).select(1);
      }

      cy.get('button[type="submit"]').click();
      cy.wait(500);
    });
  });

  describe("Filter Enrollments", () => {
    it("should filter by student", () => {
      cy.get("select").first().select(1);
      cy.wait(300);
      cy.get("table").should("exist");
    });

    it("should filter by semester", () => {
      const selects = cy.get("select");
      if (selects.length > 1) {
        selects.eq(1).select(1);
        cy.wait(300);
      }
    });
  });
});

describe("Student Enrollment View", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("student");
    cy.navigateTo("Đăng ký học phần");
  });

  it("should display available courses for enrollment", () => {
    cy.url().should("include", "/enrollment");
    cy.get("h1").should("contain", "Đăng ký học phần");
  });

  it("should display enrolled courses", () => {
    cy.get("table").should("exist");
  });
});

describe("Teacher Grades Access", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("teacher");
    cy.navigateTo("Điểm");
  });

  it("should allow teacher to view grades", () => {
    cy.url().should("include", "/grades");
    cy.get("table").should("exist");
  });

  it("should allow teacher to enter grades", () => {
    const addButton = cy.get("button").contains("Nhập điểm");
    if (addButton.length > 0) {
      addButton.should("be.visible");
    }
  });
});
