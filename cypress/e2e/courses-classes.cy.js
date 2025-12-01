/* eslint-env cypress */
// Test Course and Class Management

describe("Course Management", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Môn học");
  });

  describe("Course List View", () => {
    it("should display courses page", () => {
      cy.url().should("include", "/subjects");
      cy.get("h1").should("contain", "Quản lý Môn học");
    });

    it("should display course table", () => {
      cy.get("table").should("exist");
      cy.get("tbody tr").should("have.length.at.least", 1);
    });
  });

  describe("Add Course", () => {
    it("should open add course form", () => {
      cy.get("button").contains("Thêm môn học").click();
      cy.get("h2").should("contain", "Thêm môn học mới");
    });

    it("should add new course", () => {
      cy.get("button").contains("Thêm môn học").click();

      cy.fillForm({
        subjectCode: "MH" + Date.now(),
        subjectName: "Môn học Test",
        credits: "3",
      });

      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.get("table").should("exist");
    });
  });

  describe("Search Courses", () => {
    it("should search courses by name", () => {
      cy.get('input[type="text"]').first().type("Lập trình");
      cy.wait(300);
      cy.get("tbody tr").should("exist");
    });
  });
});

describe("Class Management", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Lớp học");
  });

  describe("Class List View", () => {
    it("should display classes page", () => {
      cy.url().should("include", "/classes");
      cy.get("h1").should("contain", "Quản lý Lớp học");
    });

    it("should display class table", () => {
      cy.get("table").should("exist");
      cy.get("tbody tr").should("have.length.at.least", 1);
    });
  });

  describe("Add Class", () => {
    it("should open add class form", () => {
      cy.get("button").contains("Thêm lớp học").click();
      cy.get("h2").should("contain", "Thêm lớp học mới");
    });

    it("should add new class", () => {
      cy.get("button").contains("Thêm lớp học").click();

      cy.fillForm({
        className: "LH" + Date.now(),
      });

      // Select department
      cy.get("select").first().select(1);

      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.get("table").should("exist");
    });
  });

  describe("Class Details", () => {
    it("should view class student list", () => {
      cy.get("tbody tr")
        .first()
        .within(() => {
          const viewButton = cy.get("button").contains("Xem");
          if (viewButton.length > 0) {
            viewButton.click();
          }
        });
    });
  });
});

describe("Teacher Access to Courses", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("teacher");
  });

  it("should allow teacher to view courses", () => {
    cy.navigateTo("Môn học");
    cy.url().should("include", "/subjects");
    cy.get("table").should("exist");
  });

  it("should allow teacher to view classes", () => {
    cy.navigateTo("Lớp học");
    cy.url().should("include", "/classes");
    cy.get("table").should("exist");
  });
});
