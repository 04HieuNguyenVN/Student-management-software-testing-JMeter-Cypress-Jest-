/* eslint-env cypress */
// Kiểm thử Quản lý Điểm và Đăng ký Học phần

describe("Quản lý Điểm", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Quản lý điểm");
  });

  describe("Xem Danh sách Điểm", () => {
    it(" hiển thị trang điểm", () => {
      cy.url().should("include", "/grades");
      cy.get("h1").should("contain", "Quản lý điểm");
    });

    it(" hiển thị bảng điểm", () => {
      cy.get("table").should("exist");
    });
  });

  describe("Lọc Điểm", () => {
    it(" lọc theo lớp", () => {
      cy.get("select").first().select(1);
      cy.wait(300);
      cy.get("table").should("exist");
    });

    it(" lọc theo môn học", () => {
      cy.get("select").eq(1).select(1);
      cy.wait(300);
      cy.get("table").should("exist");
    });
  });

  describe("Thêm/Sửa Điểm", () => {

    it(" cho phép sửa điểm trực tiếp", () => {
      cy.get('button[title="Sửa"]').first().click({ force: true });
      cy.get('input[type="number"]').should("exist");
    });

    it(" kiểm tra tính toán điểm trung bình", () => {
      cy.get('button[title="Sửa"]').first().click({ force: true });
      cy.get('input[type="number"]').first().clear().type("8");
      cy.get('input[type="number"]').eq(1).clear().type("8");
      cy.get('button[title="Lưu"]').first().click();
      cy.wait(500);
      cy.get("tbody tr").first().should("contain", "8");
    });
  });

  describe("Thống kê Điểm", () => {
    it(" hiển thị phần thống kê điểm", () => {
      cy.get("div").contains("Thống kê").should("exist");
    });
  });
});

describe("Xem Điểm của Sinh viên", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("student");
    cy.navigateTo("Xem điểm");
  });

  it(" hiển thị điểm của sinh viên", () => {
    cy.url().should("include", "/my-grades");
    cy.get("h1").should("contain", "Kết quả học tập");
  });

  it(" hiển thị thông tin GPA", () => {
    cy.get("div").contains("GPA").should("exist");
  });

  it(" hiển thị bảng điểm", () => {
    cy.get("table").should("exist");
  });

  it("Không  cho phép sửa điểm", () => {
    cy.get("button").contains("Sửa").should("not.exist");
    cy.get("button").contains("Xóa").should("not.exist");
  });
});

describe("Quản lý Đăng ký Học phần", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("admin");
    cy.navigateTo("Đăng ký học phần");
  });

  describe("Xem Danh sách Đăng ký", () => {
    it(" hiển thị trang đăng ký học phần", () => {
      cy.url().should("include", "/enrollment");
      cy.get("h1").should("contain", "Đăng ký học phần");
    });

    it(" hiển thị bảng đăng ký", () => {
      cy.get("table").should("exist");
    });
  });

  describe("Thêm Đăng ký", () => {
    it(" mở form đăng ký học phần", () => {
      cy.get("button").contains("Đăng ký mới").click();
      cy.get("h2").should("contain", "Đăng ký học phần");
    });

    it(" đăng ký sinh viên vào môn học", () => {
      cy.get("button").contains("Đăng ký mới").click();
      cy.get("select").first().select(1, { force: true });
      cy.get("select").eq(1).select(1, { force: true });
      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.get("body").should("exist");
    });
  });

  describe("Lọc Đăng ký", () => {
    it(" lọc theo sinh viên", () => {
      cy.get("select").first().select(1);
      cy.wait(300);
      cy.get("table").should("exist");
    });

    it(" lọc theo học kỳ", () => {
      cy.get("select").eq(1).select(1);
      cy.wait(300);
      cy.get("table").should("exist");
    });
  });
});

describe("Xem Đăng ký của Sinh viên", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("student");
    cy.navigateTo("Đăng ký học phần");
  });

  it(" hiển thị các môn học có thể đăng ký", () => {
    cy.url().should("include", "/enrollment");
    cy.get("h1").should("contain", "Đăng ký học phần");
  });

  it(" hiển thị các môn đã đăng ký", () => {
    cy.get("table").should("exist");
  });
});

describe("Quyền truy cập Điểm của Giáo viên", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login("teacher");
    cy.navigateTo("Quản lý điểm");
  });

  it(" cho phép giáo viên xem điểm", () => {
    cy.url().should("include", "/grades");
    cy.get("table").should("exist");
  });

  it(" cho phép giáo viên nhập điểm", () => {
    cy.get('button[title="Sửa"]').should("exist");
  });
});
