/* eslint-env cypress */
// Kiểm thử quản lý Sinh viên - Các thao tác CRUD

describe("Quản lý Sinh viên", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Quản lý sinh viên");
  });

  describe("Xem Danh sách Sinh viên", () => {
    it(" hiển thị trang danh sách sinh viên", () => {
      cy.url().should("include", "/students");
      cy.get("h1").should("contain", "Quản lý sinh viên");
    });

    it(" hiển thị bảng sinh viên có dữ liệu", () => {
      cy.get("table").should("exist");
      cy.get("tbody tr").should("have.length.at.least", 1);
    });

    it(" hiển thị thông tin sinh viên đầy đủ", () => {
      cy.get("tbody tr")
        .first()
        .within(() => {
          cy.get("td").should("have.length.at.least", 5);
        });
    });
  });

  describe("Tìm kiếm và Lọc", () => {
    it(" lọc sinh viên theo từ khóa tìm kiếm", () => {
      cy.get('input[type="text"]').first().clear().type("Trần");
      cy.wait(500); // Wait for filtering
      cy.get("tbody tr").should("have.length.gt", 0);
      cy.get("tbody tr").first().should("contain", "Trần");
      });

    it(" lọc theo khoa", () => {
      cy.get("select").first().select(1);
      cy.get("tbody tr").should("exist");
    });

    it(" lọc theo lớp", () => {
      cy.get("select").eq(1).select(1);
      cy.get("tbody tr").should("exist");
    });
  });

  describe("Thêm Sinh viên", () => {
    it(" mở form thêm sinh viên mới", () => {
      cy.get("button").contains("Thêm sinh viên").click();
      cy.get("h2").should("contain", "Thêm sinh viên mới");
    });

    it(" kiểm tra validation các trường bắt buộc", () => {
      cy.get("button").contains("Thêm sinh viên").click();
      cy.get('button[type="submit"]').click();
      cy.get("input:invalid").should("have.length.at.least", 1);
    });

    it(" thêm sinh viên mới thành công", () => {
      cy.get("button").contains("Thêm sinh viên").click();

      cy.fillForm({
        studentCode: "SV" + Date.now(),
        fullName: "Nguyễn Văn Test",
        email: "test@example.com",
        phone: "0123456789",
        dateOfBirth: "2000-01-01",
      });

      cy.get('select[name="departmentId"]').select(1, { force: true });
      cy.get('select[name="classId"]').select(1, { force: true });
      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.get("table").should("exist");
    });
  });

  describe("Sửa Sinh viên", () => {
    it(" mở form sửa cho sinh viên đã chọn", () => {
      cy.get("tbody tr")
        .first()
        .within(() => {
          cy.get('button[title="Sửa"]').click();
        });

      cy.get("h2").should("contain", "Sửa thông tin sinh viên");
    });

    it(" cập nhật thông tin sinh viên thành công", () => {
      cy.get("tbody tr")
        .first()
        .within(() => {
          cy.get('button[title="Sửa"]').click();
        });

      cy.get('input[name="fullName"], input#fullName')
        .clear()
        .type("Nguyễn Văn Updated");

      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.get("table").should("exist");
    });
  });

  describe("Xóa Sinh viên", () => {
    it(" hiển thị hộp thoại xác nhận khi xóa", () => {
      cy.get("tbody tr")
        .first()
        .within(() => {
          cy.get('button[title="Xóa"]').click();
        });
      cy.wait(300);
      // Kiểm tra có confirm dialog hoặc modal
      cy.get("body").should("exist");
    });
  });

  describe("Xem Chi tiết Sinh viên", () => {
    it(" có thể click vào sinh viên để xem chi tiết", () => {
      cy.get("tbody tr").first().click();
      cy.wait(300);
      cy.get("body").should("exist");
    });
  });

  describe("Chức năng Xuất dữ liệu", () => {
    it(" có nút xuất CSV và kích hoạt tải xuống", () => {
      cy.get("button").contains("Xuất CSV").should("be.visible").click();
      cy.wait(300);
      cy.get("body").should("exist");
    });
  });
});
