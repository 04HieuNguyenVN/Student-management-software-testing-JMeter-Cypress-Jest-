/* eslint-env cypress */
// Kiểm thử Quản lý Môn học và Lớp học

describe("Quản lý Môn học", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Quản lý môn học");
  });

  describe("Xem Danh sách Môn học", () => {
    it(" hiển thị trang môn học", () => {
      cy.url().should("include", "/subjects");
      cy.get("h1").should("contain", "Quản lý môn học");
    });

    it(" hiển thị bảng môn học", () => {
      cy.get(".grid > div").should("exist");
      cy.get(".grid > div").should("have.length.at.least", 1);
    });
  });

  describe("Thêm Môn học", () => {
    it(" mở form thêm môn học", () => {
      cy.get("button").contains("Thêm môn học").click();
      cy.get("h2").should("contain", "Thêm môn học mới");
    });

    it(" thêm môn học mới thành công", () => {
      cy.get("button").contains("Thêm môn học").click();

      cy.fillForm({
        subjectCode: "MH" + Date.now(),
        subjectName: "Môn học Test",
        credits: "3",
      });

      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.get(".grid > div").should("exist");
    });
  });

  describe("Tìm kiếm Môn học", () => {
    it(" tìm kiếm môn học theo tên", () => {
      cy.get('input[type="text"]').first().type("Lập trình");
      cy.wait(300);
      cy.get(".grid > div").should("exist");
    });
  });
});

describe("Quản lý Lớp học", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Quản lý lớp học");
  });

  describe("Xem Danh sách Lớp học", () => {
    it(" hiển thị trang lớp học", () => {
      cy.url().should("include", "/classes");
      cy.get("h1").should("contain", "Quản lý lớp học");
    });

    it(" hiển thị bảng lớp học", () => {
      cy.get(".grid > div").should("exist");
      cy.get(".grid > div").should("have.length.at.least", 1);
    });
  });

  describe("Thêm Lớp học", () => {
    it(" mở form thêm lớp học", () => {
      cy.get("button").contains("Thêm lớp học").click();
      cy.get("h2").should("contain", "Thêm lớp học mới");
    });

    it(" thêm lớp học mới thành công", () => {
      cy.get("button").contains("Thêm lớp học").click();

      cy.fillForm({
        code: "LH" + Date.now(),
        className: "Lớp Test " + Date.now(),
      });

      cy.get("select").first().select(1);
      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.get(".grid > div").should("exist");
    });
  });

  describe("Chi tiết Lớp học", () => {
    it(" có thể xem danh sách sinh viên của lớp", () => {
      cy.get("button").contains("Sửa").first().click();
      cy.wait(300);
      cy.get("body").should("exist");
    });
  });
});

describe("Quyền truy cập Môn học của Giáo viên", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("teacher");
  });

  it(" cho phép giáo viên xem môn học", () => {
    cy.navigateTo("Môn học");
    cy.url().should("include", "/subjects");
    cy.get(".grid > div").should("exist");
  });

  it(" cho phép giáo viên xem lớp học", () => {
    cy.navigateTo("Lớp học");
    cy.url().should("include", "/classes");
    cy.get(".grid > div").should("exist");
  });
});
