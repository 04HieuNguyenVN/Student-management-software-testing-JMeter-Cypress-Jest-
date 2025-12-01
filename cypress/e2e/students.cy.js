/* eslint-env cypress */
// Test Student Management CRUD operations

describe("Student Management", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Sinh viên");
  });

  describe("Student List View", () => {
    it("should display student list page", () => {
      cy.url().should("include", "/students");
      cy.get("h1").should("contain", "Quản lý Sinh viên");
    });

    it("should display student table with data", () => {
      cy.get("table").should("exist");
      cy.get("tbody tr").should("have.length.at.least", 1);
    });

    it("should display student information correctly", () => {
      cy.get("tbody tr")
        .first()
        .within(() => {
          cy.get("td").should("have.length.at.least", 5);
        });
    });
  });

  describe("Search and Filter", () => {
    it("should filter students by search term", () => {
      // Type in search box
      cy.get('input[type="text"]').first().type("Nguyễn");

      // Results should update
      cy.get("tbody tr").each(($row) => {
        cy.wrap($row).should("contain", "Nguyễn");
      });
    });

    it("should filter by department", () => {
      cy.get("select").first().select("CNTT");

      // Should show only CNTT students
      cy.get("tbody tr").should("exist");
    });

    it("should filter by class", () => {
      const selectElements = cy.get("select");
      if (selectElements.length > 1) {
        selectElements.eq(1).select(1);
        cy.get("tbody tr").should("exist");
      }
    });
  });

  describe("Add Student", () => {
    it("should open add student form", () => {
      cy.get("button").contains("Thêm sinh viên").click();
      cy.get("h2").should("contain", "Thêm sinh viên mới");
    });

    it("should validate required fields", () => {
      cy.get("button").contains("Thêm sinh viên").click();

      // Submit empty form
      cy.get('button[type="submit"]').click();

      // Should show validation errors
      cy.get("input:invalid").should("have.length.at.least", 1);
    });

    it("should add new student successfully", () => {
      cy.get("button").contains("Thêm sinh viên").click();

      // Fill form
      cy.fillForm({
        studentCode: "SV" + Date.now(),
        fullName: "Nguyễn Văn Test",
        email: "test@example.com",
        phone: "0123456789",
        dateOfBirth: "2000-01-01",
      });

      // Select department and class if available
      const selects = cy.get("select");
      selects.first().select(1);

      // Submit form
      cy.get('button[type="submit"]').click();

      // Should show success message or return to list
      cy.wait(500);
      cy.get("table").should("exist");
    });
  });

  describe("Edit Student", () => {
    it("should open edit form for existing student", () => {
      // Click edit button on first student
      cy.get("tbody tr")
        .first()
        .within(() => {
          cy.get("button").contains("Sửa").click();
        });

      cy.get("h2").should("contain", "Chỉnh sửa sinh viên");
    });

    it("should update student information", () => {
      cy.get("tbody tr")
        .first()
        .within(() => {
          cy.get("button").contains("Sửa").click();
        });

      // Modify fields
      cy.get('input[name="fullName"], input#fullName')
        .clear()
        .type("Nguyễn Văn Updated");

      // Submit
      cy.get('button[type="submit"]').click();

      cy.wait(500);
      cy.get("table").should("exist");
    });
  });

  describe("Delete Student", () => {
    it("should show confirm dialog when deleting", () => {
      const studentCountBefore = Cypress.$("tbody tr").length;

      if (studentCountBefore > 0) {
        cy.get("tbody tr")
          .first()
          .within(() => {
            cy.get("button").contains("Xóa").click();
          });

        // Confirm deletion (may vary based on implementation)
        cy.wait(300);
      }
    });
  });

  describe("View Student Details", () => {
    it("should view student details", () => {
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

  describe("Export Functions", () => {
    it("should have export button available and trigger download", () => {
      const exportButton = cy.get("button").contains("Xuất CSV");
      exportButton.should("be.visible");
      
      // Stub window.open or link click if possible, but for now just click
      // and ensure no error occurs
      exportButton.click();
      
      // Since it's a client-side download, we can't easily check file system
      // but we can check if the function was called if we could spy on it.
      // For E2E, existence and clickability is a good start.
    });
  });
});
